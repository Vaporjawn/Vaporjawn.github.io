import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Devpost project normalized shape.
 * NOTE: We rely on scraping public Devpost profile HTML (no official API).
 * This is brittle; selectors are guarded and failures degrade gracefully.
 */
export interface DevpostProject {
  id: string;               // slug extracted from /software/{slug}
  title: string;            // project title text
  summary?: string;         // short blurb/description if parsable
  projectUrl: string;       // absolute https://devpost.com/software/{slug}
  likes?: number;           // heart count (♥)
  comments?: number;        // comment count (💬)
  badges?: string[];        // any award / badge texts if discoverable
  tags?: string[];          // technology tags if available
  hackathons?: string[];    // associated hackathon names if found
  updatedAt?: string;       // ISO date if inferable (often unavailable)
}

interface UseDevpostProjectsOptions {
  username?: string;           // Devpost username (profile path)
  ttlMs?: number;              // cache TTL
  cacheKey?: string;           // override cache key
  forceFresh?: boolean;        // skip cache on first load
}

interface DevpostHookState {
  projects: DevpostProject[];
  loading: boolean;
  error: string | null;
  lastUpdated: number | null;   // epoch ms when cache stored
  refresh: () => Promise<void>;
}

const DEFAULT_TTL = 6 * 60 * 60 * 1000; // 6 hours
const DEFAULT_USERNAME = "vaporjawn";
const BASE_URL = "https://devpost.com";

interface CacheEnvelope {
  fetchedAt: number;
  projects: DevpostProject[];
  version: number;
}

const CACHE_VERSION = 1;

function parseNumber(token?: string | null): number | undefined {
  if (!token) return undefined;
  const cleaned = token.replace(/[^0-9]/g, "");
  if (!cleaned) return undefined;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : undefined;
}

/**
 * Parse Devpost profile HTML into structured projects.
 * We search for anchors with href starting /software/ and derive metadata
 * from nearby DOM context. This function executes on a detached DOM (DOMParser).
 */
export function parseDevpostProjects(html: string): DevpostProject[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const anchors = Array.from(doc.querySelectorAll<HTMLAnchorElement>("a[href^='/software/']"));

  const seen = new Set<string>();
  const projects: DevpostProject[] = [];

  for (const a of anchors) {
  const href = a.getAttribute("href");
    if (!href) continue;
    // Exclude non-project software routes if any appear
    const match = /^\/software\/([a-z0-9-]+)/i.exec(href);
    if (!match) continue;
    const slug = match[1].toLowerCase();
    if (seen.has(slug)) continue;
    seen.add(slug);

    // Title: prefer anchor text trimmed
    const title = a.textContent?.trim() || slug;

    // Look upward for a containing card element - heuristic
  const card = a.closest("div, li, article");

    // Summary: first paragraph or brief text node inside card
    let summary: string | undefined;
    if (card) {
      // try paragraphs
  const p = card.querySelector("p");
      if (p) {
        const txt = p.textContent?.trim();
        if (txt && txt.length > 15) summary = txt.slice(0, 300);
      }
    }

    // Likes & comments: search immediate text around anchor and card for symbols ♥ and 💬
    let likes: number | undefined;
    let comments: number | undefined;
  const contextText = (card?.textContent || a.parentElement?.textContent || "").replace(/\s+/g, " ");
    // Patterns like "♥ 12" or "12 ♥"
    const heartMatch = contextText.match(/(?:♥|❤)\s*(\d{1,5})| (\d{1,5})\s*(?:♥|❤)/);
    if (heartMatch) likes = parseNumber(heartMatch[1] || heartMatch[2]);
    const commentMatch = contextText.match(/💬\s*(\d{1,5})| (\d{1,5})\s*💬/);
    if (commentMatch) comments = parseNumber(commentMatch[1] || commentMatch[2]);

    // Badges / awards: look for elements with class containing 'badge' or text containing 'Winner'
    const badges: string[] = [];
    if (card) {
  const badgeEls = card.querySelectorAll("[class*='badge'], .award, .prize, .winner");
      badgeEls.forEach(b => {
        const txt = b.textContent?.trim();
        if (txt && txt.length <= 80 && !badges.includes(txt)) badges.push(txt);
      });
      // textual heuristics
      const cardTextLower = card.textContent?.toLowerCase() || "";
      if (cardTextLower.includes("winner") && !badges.some(b => /winner/i.test(b))) {
        badges.push("Winner");
      }
    }

    // Tags: naive approach - spans or anchors with class containing 'tag'
    const tags: string[] = [];
    if (card) {
      card.querySelectorAll("[class*='tag']").forEach(t => {
        const txt = t.textContent?.trim();
        if (txt && txt.length <= 30 && !tags.includes(txt)) tags.push(txt);
      });
    }

    const project: DevpostProject = {
      id: slug,
      title,
      summary,
      projectUrl: `${BASE_URL}/software/${slug}`,
      likes,
      comments,
      badges: badges.length ? badges : undefined,
      tags: tags.length ? tags : undefined,
    };
    projects.push(project);
  }

  return projects;
}

export function useDevpostProjects(options: UseDevpostProjectsOptions = {}): DevpostHookState {
  const {
    username = DEFAULT_USERNAME,
    ttlMs = DEFAULT_TTL,
    cacheKey = `devpost_projects_${username}`,
    forceFresh = false,
  } = options;

  const [projects, setProjects] = useState<DevpostProject[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);

  const inFlightRef = useRef<Promise<void> | null>(null);

  const load = useCallback(async (opts?: { bypassCache?: boolean; background?: boolean }) => {
    const { bypassCache = false, background = false } = opts || {};
    if (inFlightRef.current) return inFlightRef.current;

    const exec = async () => {
      try {
        if (!background) {
          setLoading(true);
          setError(null);
        }
        const now = Date.now();
        if (!bypassCache) {
          try {
            const raw = localStorage.getItem(cacheKey);
            if (raw) {
              const parsed: CacheEnvelope = JSON.parse(raw);
              if (parsed.version === CACHE_VERSION) {
                const age = now - parsed.fetchedAt;
                if (age < ttlMs) {
                  setProjects(parsed.projects);
                  setLastUpdated(parsed.fetchedAt);
                  setLoading(false);
                  return; // Fresh cache, no fetch
                } else {
                  // Serve stale immediately, then background refresh
                  setProjects(parsed.projects);
                  setLastUpdated(parsed.fetchedAt);
                  // Proceed to fetch fresh (do not return)
                }
              }
            }
          } catch {
            // Corrupt cache - ignore
          }
        }

        const profileUrl = `${BASE_URL}/${encodeURIComponent(username)}`;
  const res = await fetch(profileUrl, { credentials: "omit" });
        if (!res.ok) throw new Error(`Devpost fetch failed: ${res.status}`);
        const html = await res.text();
        const parsed = parseDevpostProjects(html);

        // Persist cache
        const envelope: CacheEnvelope = { fetchedAt: now, projects: parsed, version: CACHE_VERSION };
        try {
          localStorage.setItem(cacheKey, JSON.stringify(envelope));
        } catch { /* ignore quota errors */ }

        setProjects(parsed);
        setLastUpdated(now);
      } catch (err) {
        if (!background) setError((err as Error).message || "Unknown error fetching Devpost projects");
      } finally {
        if (!background) setLoading(false);
      }
    };

    const p = exec();
    inFlightRef.current = p.finally(() => { inFlightRef.current = null; });
    return p;
  }, [cacheKey, ttlMs, username]);

  // Initial load with optional cache skip
  useEffect(() => {
    load({ bypassCache: forceFresh });
    // Background revalidation if we served stale cache
    const raw = localStorage.getItem(cacheKey);
    if (raw && !forceFresh) {
      try {
        const parsed: CacheEnvelope = JSON.parse(raw);
        if (parsed.version === CACHE_VERSION) {
          const age = Date.now() - parsed.fetchedAt;
          if (age >= ttlMs) {
            // Stale - perform background refresh
            load({ bypassCache: true, background: true });
          }
        }
      } catch {/* ignore */}
    }
  }, [cacheKey, forceFresh, load, ttlMs]);

  const refresh = useCallback(async () => {
    await load({ bypassCache: true });
  }, [load]);

  return { projects, loading, error, lastUpdated, refresh };
}

export default useDevpostProjects;
