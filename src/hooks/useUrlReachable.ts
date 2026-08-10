import { useEffect, useState } from "react";

interface CacheEntry {
  reachable: boolean;
  checkedAt: number;
}

const CACHE_KEY_PREFIX = "url_reachable_v1:";
const CACHE_TTL_MS = 1000 * 60 * 60 * 6; // 6 hours
const REQUEST_TIMEOUT_MS = 6000;
const memoryCache = new Map<string, CacheEntry>();

function readCache(url: string): CacheEntry | undefined {
  const cached = memoryCache.get(url);
  if (cached) return cached;
  try {
    const raw = window.localStorage.getItem(CACHE_KEY_PREFIX + url);
    if (!raw) return undefined;
    const parsed = JSON.parse(raw) as CacheEntry;
    memoryCache.set(url, parsed);
    return parsed;
  } catch {
    return undefined;
  }
}

function writeCache(url: string, reachable: boolean): void {
  const entry: CacheEntry = { reachable, checkedAt: Date.now() };
  memoryCache.set(url, entry);
  try {
    window.localStorage.setItem(CACHE_KEY_PREFIX + url, JSON.stringify(entry));
  } catch {
    // Storage full or unavailable (e.g. private browsing) - in-memory cache still applies.
  }
}

/**
 * Best-effort, cached check for whether `url` currently resolves to a
 * non-error HTTP response. Used to hide "Site"/"Demo" links that point at a
 * dead project page instead of leaving a button that goes nowhere.
 *
 * Deliberately fails OPEN (treats the link as reachable) whenever the check
 * itself is inconclusive - blocked by the target's CORS policy, a timeout, or
 * an offline browser - because those failures say nothing about whether a
 * real navigation (a link click, not a fetch()) would work. Only a
 * definitive non-2xx HTTP response is treated as proof the link is broken.
 */
export function useUrlReachable(url?: string): boolean {
  // Holds the outcome of a check (cached or live), keyed by the url it was
  // computed for (so a stale result from a previous url is never mistakenly
  // reused). Only ever written from inside the nested `run()` callback below
  // - never as a direct statement in the effect body - and never read from
  // during render via impure calls like Date.now(); the render body below
  // only ever compares plain values already captured in state.
  const [liveResult, setLiveResult] = useState<{
    url: string;
    reachable: boolean;
  } | null>(null);

  useEffect(() => {
    if (!url) return;

    let cancelled = false;
    const controller = new AbortController();
    const timeoutId = window.setTimeout(
      () => controller.abort(),
      REQUEST_TIMEOUT_MS
    );

    const run = async () => {
      const cached = readCache(url);
      if (cached && Date.now() - cached.checkedAt < CACHE_TTL_MS) {
        if (!cancelled) setLiveResult({ url, reachable: cached.reachable });
        return;
      }

      try {
        const response = await fetch(url, {
          method: "HEAD",
          mode: "cors",
          cache: "no-store",
          signal: controller.signal,
        });
        if (cancelled) return;
        writeCache(url, response.ok);
        setLiveResult({ url, reachable: response.ok });
      } catch {
        // Inconclusive (network error, CORS block, timeout) - fail open and
        // don't cache, so we can re-check later once conditions change.
      }
    };

    run().finally(() => window.clearTimeout(timeoutId));

    return () => {
      cancelled = true;
      controller.abort();
      window.clearTimeout(timeoutId);
    };
  }, [url]);

  if (!url) return true;
  if (liveResult && liveResult.url === url) return liveResult.reachable;

  return true; // optimistic default until a check (cached or live) resolves
}

export default useUrlReachable;
