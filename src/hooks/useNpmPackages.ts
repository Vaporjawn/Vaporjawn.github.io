import { useCallback, useEffect, useRef, useState } from "react";

// ---------------- Types ----------------
export interface RawNpmSearchResultItem {
  package: {
    name: string;
    version: string;
    description?: string;
    date?: string; // publish date
    links: {
      npm?: string;
      homepage?: string;
      repository?: string;
      bugs?: string;
    };
    keywords?: string[];
    publisher?: {
      username: string;
    };
    maintainers?: { username: string }[];
  };
  score?: {
    final: number;
  };
  searchScore?: number;
}

export interface NpmPackageNormalized {
  name: string;
  version: string;
  description: string;
  publishedAt?: string;
  homepage?: string;
  repository?: string;
  npmUrl?: string;
  weeklyDownloads?: number; // optional enrichment
  keywords: string[];
}

interface UseNpmPackagesOptions {
  maintainer?: string; // default: vaporjawn
  size?: number; // limit results (npm search default 20). We'll default to 20 to capture new packages automatically.
  cacheTtlMs?: number; // default 12h
  fetchDownloads?: boolean; // default true - enrich with weekly downloads
}

interface UseNpmPackagesState {
  packages: NpmPackageNormalized[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

const DEFAULT_CACHE_KEY = "npm_packages_vaporjawn_v1";
const DEFAULT_TTL = 1000 * 60 * 60 * 12; // 12 hours

interface CachedData {
  fetchedAt: number;
  data: NpmPackageNormalized[];
}

/**
 * Fetch weekly downloads for a package using npm downloads API.
 * Non-critical; failures are swallowed (we return undefined).
 */
async function fetchWeeklyDownloads(pkgName: string): Promise<number | undefined> {
  try {
    const resp = await fetch(`https://api.npmjs.org/downloads/point/last-week/${encodeURIComponent(pkgName)}`);
    if (!resp.ok) return undefined;
    const json = await resp.json();
    if (typeof json.downloads === "number") return json.downloads;
  } catch {
    // ignore
  }
  return undefined;
}

/**
 * Normalize raw search item into our internal shape.
 */
function normalize(item: RawNpmSearchResultItem): NpmPackageNormalized {
  const p = item.package;
  return {
    name: p.name,
    version: p.version,
    description: p.description || "",
    publishedAt: p.date,
    homepage: p.links?.homepage,
    repository: p.links?.repository,
    npmUrl: p.links?.npm,
    keywords: p.keywords || [],
  };
}

/**
 * Hook to fetch & cache npm packages by maintainer. Implements stale-while-revalidate style:
 * - Returns cached data immediately if present & fresh
 * - Always triggers background revalidation (unless a fetch already running)
 */
export function useNpmPackages(options: UseNpmPackagesOptions = {}): UseNpmPackagesState {
  const {
    maintainer = "vaporjawn",
    size = 20,
    cacheTtlMs = DEFAULT_TTL,
    fetchDownloads = true,
  } = options;

  const [packages, setPackages] = useState<NpmPackageNormalized[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const inFlightRef = useRef<boolean>(false);

  const cacheKey = `${DEFAULT_CACHE_KEY}_${maintainer}_${size}`;

  const readCache = useCallback((): CachedData | null => {
    try {
      const raw = localStorage.getItem(cacheKey);
      if (!raw) return null;
      const parsed = JSON.parse(raw) as CachedData;
      if (!parsed.fetchedAt || !Array.isArray(parsed.data)) return null;
      return parsed;
  } catch {
      return null;
    }
  }, [cacheKey]);

  const writeCache = useCallback(
    (data: NpmPackageNormalized[]) => {
      try {
        const payload: CachedData = { fetchedAt: Date.now(), data };
        localStorage.setItem(cacheKey, JSON.stringify(payload));
  } catch {
        // ignore quota errors
      }
    },
    [cacheKey]
  );

  const enrichDownloads = useCallback(async (items: NpmPackageNormalized[]) => {
    if (!fetchDownloads) return items;
    // Limit concurrent fetches to avoid hammering API (max 10 packages)
    const slice = items.slice(0, 10);
    const enriched = await Promise.all(
      slice.map(async (p) => {
        const weeklyDownloads = await fetchWeeklyDownloads(p.name);
        return { ...p, weeklyDownloads };
      })
    );
    // Merge enriched slice back
    return items.map((p) => {
      const enrichedMatch = enriched.find((e) => e.name === p.name);
      return enrichedMatch || p;
    });
  }, [fetchDownloads]);

  const fetchData = useCallback(async (force = false) => {
    if (inFlightRef.current) return; // prevent duplicate fetches
    inFlightRef.current = true;
    setLoading(true);
    setError(null);
    try {
      const url = `https://registry.npmjs.org/-/v1/search?text=maintainer:${encodeURIComponent(
        maintainer
      )}&size=${size}`;
      const resp = await fetch(url);
      if (!resp.ok) throw new Error(`npm search failed (${resp.status})`);
      const json = await resp.json();
      const items: RawNpmSearchResultItem[] = json.objects || [];
      let normalized = items.map(normalize);

      // Sort newest first (by published date)
      normalized.sort((a, b) => {
        const da = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
        const db = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
        return db - da;
      });

      normalized = await enrichDownloads(normalized);

      setPackages(normalized);
      writeCache(normalized);
    } catch (e: unknown) {
      if (!force) {
        // Only set error if no usable cached data
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("Failed to load npm packages");
        }
      }
    } finally {
      setLoading(false);
      inFlightRef.current = false;
    }
  }, [maintainer, size, enrichDownloads, writeCache]);

  // Initial load (cache + revalidate)
  useEffect(() => {
    const cached = readCache();
    if (cached) {
      const isFresh = Date.now() - cached.fetchedAt < cacheTtlMs;
      setPackages(cached.data);
      // Revalidate if stale
      if (!isFresh) {
        fetchData();
      }
    } else {
      fetchData();
    }
  }, [cacheTtlMs, readCache, fetchData]);

  const refresh = useCallback(() => {
    // Force bypass cache and fetch fresh data
    fetchData(true);
  }, [fetchData]);

  return { packages, loading, error, refresh };
}

export default useNpmPackages;
