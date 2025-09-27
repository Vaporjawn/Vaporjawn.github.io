import { useCallback, useEffect, useRef, useState } from "react";

export interface GithubRepo {
  id: number;
  name: string;
  fullName: string;
  description?: string;
  htmlUrl: string;
  homepage?: string | null;
  stargazersCount: number;
  forksCount: number;
  language?: string | null;
  topics?: string[];
  updatedAt: string; // ISO timestamp
  pushedAt?: string; // last push
}

interface UseGithubReposOptions {
  username?: string;
  ttlMs?: number; // cache TTL
  cacheKey?: string;
  includeForks?: boolean; // default false
  perPage?: number; // default 100
}

interface GithubReposState {
  repos: GithubRepo[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
  lastUpdated: number | null;
}

// 3h TTL default
const DEFAULT_TTL = 1000 * 60 * 60 * 3;
const DEFAULT_USERNAME = "vaporjawn";

interface CacheEnvelope {
  fetchedAt: number;
  repos: GithubRepo[];
  version: number;
}
const CACHE_VERSION = 1;

export function useGithubRepos(options: UseGithubReposOptions = {}): GithubReposState {
  const {
    username = DEFAULT_USERNAME,
    ttlMs = DEFAULT_TTL,
    cacheKey = `github_repos_${username}`,
    includeForks = false,
    perPage = 100,
  } = options;

  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);
  const inFlightRef = useRef<boolean>(false);

  const fetchRepos = useCallback(async (bypassCache = false) => {
    if (inFlightRef.current) return;
    inFlightRef.current = true;
    setError(null);
    if (!bypassCache) setLoading(true);
    try {
      const now = Date.now();
      if (!bypassCache) {
        try {
          const raw = localStorage.getItem(cacheKey);
          if (raw) {
            const parsed: CacheEnvelope = JSON.parse(raw);
            if (parsed.version === CACHE_VERSION) {
              const age = now - parsed.fetchedAt;
              if (age < ttlMs) {
                setRepos(parsed.repos);
                setLastUpdated(parsed.fetchedAt);
                setLoading(false);
                inFlightRef.current = false;
                return; // fresh cache
              } else {
                // serve stale and continue to refresh
                setRepos(parsed.repos);
                setLastUpdated(parsed.fetchedAt);
              }
            }
          }
        } catch { /* ignore */ }
      }

      // Using GitHub public API (unauthenticated) - subject to 60/hr rate limit for IP.
      // We fetch repositories sorted by updated desc for recency ordering.
      const url = `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=${perPage}&sort=updated&direction=desc`;
      const resp = await fetch(url, { headers: { Accept: "application/vnd.github+json" } });
      if (!resp.ok) {
        throw new Error(`GitHub repos fetch failed: ${resp.status}`);
      }
      const json = await resp.json();
      if (!Array.isArray(json)) throw new Error("Unexpected GitHub API response");

      interface GithubRepoApiShape {
        id: number;
        name: string;
        full_name: string;
        description?: string | null;
        html_url: string;
        homepage?: string | null;
        stargazers_count: number;
        forks_count: number;
        language?: string | null;
        topics?: string[];
        updated_at: string;
        pushed_at?: string;
        fork?: boolean;
      }

      let normalized: GithubRepo[] = (json as GithubRepoApiShape[]).map((r) => ({
        id: r.id,
        name: r.name,
        fullName: r.full_name,
        description: r.description ?? undefined,
        htmlUrl: r.html_url,
        homepage: r.homepage ?? undefined,
        stargazersCount: r.stargazers_count ?? 0,
        forksCount: r.forks_count ?? 0,
        language: r.language ?? undefined,
        topics: Array.isArray(r.topics) ? r.topics : undefined,
        updatedAt: r.updated_at,
        pushedAt: r.pushed_at,
      }));

      if (!includeForks) {
        // filter out forks
        normalized = normalized.filter((_, idx) => !(json as GithubRepoApiShape[])[idx].fork);
      }

      // Write cache
      try {
        const envelope: CacheEnvelope = { fetchedAt: now, repos: normalized, version: CACHE_VERSION };
        localStorage.setItem(cacheKey, JSON.stringify(envelope));
      } catch { /* quota ignore */ }

      setRepos(normalized);
      setLastUpdated(now);
    } catch (e) {
      if (repos.length === 0) {
        setError(e instanceof Error ? e.message : "Failed to load GitHub repositories");
      }
    } finally {
      setLoading(false);
      inFlightRef.current = false;
    }
  }, [cacheKey, includeForks, perPage, repos.length, ttlMs, username]);

  useEffect(() => {
    fetchRepos();
    // Background revalidation if served stale
    const raw = localStorage.getItem(cacheKey);
    if (raw) {
      try {
        const parsed: CacheEnvelope = JSON.parse(raw);
        if (parsed.version === CACHE_VERSION) {
          const age = Date.now() - parsed.fetchedAt;
          if (age >= ttlMs) fetchRepos(true);
        }
      } catch { /* ignore */ }
    }
  }, [cacheKey, fetchRepos, ttlMs]);

  const refresh = useCallback(() => fetchRepos(true), [fetchRepos]);

  return { repos, loading, error, refresh, lastUpdated };
}

export default useGithubRepos;
