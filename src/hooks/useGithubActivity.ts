import { useCallback, useEffect, useRef, useState } from "react";

// ---------------- Types ----------------
export interface GithubEventRaw {
  id: string;
  type: string;
  created_at: string;
  repo?: { name: string; url: string };
  actor?: { login: string; avatar_url?: string; url?: string };
  // Partial payload shape for event types we normalize; unknown fields ignored.
  payload?: {
    // PushEvent
    commits?: { message?: string }[];
    ref?: string;
    // PR
    action?: string;
    number?: number;
    pull_request?: {
      number?: number;
      merged?: boolean;
      html_url?: string;
    };
    // Release
    release?: { tag_name?: string; html_url?: string };
    // Fork
    forkee?: { html_url?: string };
    // Issues / Comments
    issue?: { number?: number; html_url?: string };
    comment?: { html_url?: string };
  };
}

export type GithubActivityKind =
  | "push"
  | "pr-open"
  | "pr-merge"
  | "release"
  | "fork"
  | "star"
  | "issue-open"
  | "issue-comment"
  | "other";

export interface GithubActivityItem {
  id: string;
  kind: GithubActivityKind;
  repo: string;
  message: string;
  createdAt: string; // ISO
  url?: string; // target URL (repo, PR, issue, release)
}

interface UseGithubActivityOptions {
  username?: string; // default vaporjawn
  perPage?: number; // default 30 (GitHub API default)
  cacheTtlMs?: number; // default 10m (events change more frequently than npm packages)
  includeTypes?: GithubActivityKind[]; // optional filter after normalization
}

interface UseGithubActivityState {
  events: GithubActivityItem[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

const DEFAULT_USER = "vaporjawn";
const DEFAULT_TTL = 1000 * 60 * 10; // 10 minutes
const DEFAULT_CACHE_KEY = "gh_activity_v1";

interface CachedData {
  fetchedAt: number;
  data: GithubActivityItem[];
}

function classify(e: GithubEventRaw): GithubActivityItem {
  const { type, created_at, repo: repoObj } = e;
  const repo = repoObj?.name || "unknown";
  const createdAt = created_at;
  const base: Omit<GithubActivityItem, "message" | "kind"> = {
    id: e.id,
    repo,
    createdAt,
    url: undefined,
  };

  // Default fallbacks
  let kind: GithubActivityKind = "other";
  let message = type;
  let url: string | undefined = undefined;

  switch (type) {
    case "PushEvent": {
      kind = "push";
      const commits = Array.isArray(e.payload?.commits) ? e.payload!.commits.length : 0;
      const ref = e.payload?.ref?.split("/").pop();
      message = `Pushed ${commits} commit${commits === 1 ? "" : "s"} to ${ref || "main"}`;
      url = `https://github.com/${repo}/commits/${ref || "main"}`;
      break;
    }
    case "PullRequestEvent": {
      const action = e.payload?.action;
      const prNumber = e.payload?.number || e.payload?.pull_request?.number;
      url = e.payload?.pull_request?.html_url;
      if (action === "opened") {
        kind = "pr-open";
        message = `Opened PR #${prNumber} in ${repo}`;
      } else if (action === "closed" && e.payload?.pull_request?.merged) {
        kind = "pr-merge";
        message = `Merged PR #${prNumber} in ${repo}`;
      } else {
        kind = "other";
        message = `PR ${action} #${prNumber} in ${repo}`;
      }
      break;
    }
    case "ReleaseEvent": {
      kind = "release";
      const tag = e.payload?.release?.tag_name;
      url = e.payload?.release?.html_url;
      message = `Published release ${tag || "(untagged)"} in ${repo}`;
      break;
    }
    case "ForkEvent": {
      kind = "fork";
      url = e.payload?.forkee?.html_url;
      message = `Forked ${repo}`;
      break;
    }
    case "WatchEvent": {
      kind = "star";
      message = `Starred ${repo}`;
      url = `https://github.com/${repo}`;
      break;
    }
    case "IssuesEvent": {
      const action = e.payload?.action;
      const issueNumber = e.payload?.issue?.number;
      url = e.payload?.issue?.html_url;
      if (action === "opened") {
        kind = "issue-open";
        message = `Opened issue #${issueNumber} in ${repo}`;
      } else {
        kind = "other";
        message = `Issue ${action} #${issueNumber} in ${repo}`;
      }
      break;
    }
    case "IssueCommentEvent": {
      kind = "issue-comment";
      const issueNumber = e.payload?.issue?.number;
      url = e.payload?.comment?.html_url || e.payload?.issue?.html_url;
      message = `Commented on issue #${issueNumber} in ${repo}`;
      break;
    }
    default: {
      kind = "other";
      message = type.replace(/Event$/, "") + ` in ${repo}`;
      url = `https://github.com/${repo}`;
    }
  }

  return { ...base, kind, message, url };
}

export function useGithubActivity(options: UseGithubActivityOptions = {}): UseGithubActivityState {
  const {
    username = DEFAULT_USER,
    perPage = 30,
    cacheTtlMs = DEFAULT_TTL,
    includeTypes,
  } = options;

  const [events, setEvents] = useState<GithubActivityItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const inFlightRef = useRef<boolean>(false);

  const cacheKey = `${DEFAULT_CACHE_KEY}_${username}_${perPage}`;

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
    (data: GithubActivityItem[]) => {
      try {
        const payload: CachedData = { fetchedAt: Date.now(), data };
        localStorage.setItem(cacheKey, JSON.stringify(payload));
      } catch {
        // ignore
      }
    },
    [cacheKey]
  );

  const fetchData = useCallback(async (force = false) => {
    if (inFlightRef.current) return;
    inFlightRef.current = true;
    setLoading(true);
    setError(null);
    try {
      const url = `https://api.github.com/users/${encodeURIComponent(username)}/events/public?per_page=${perPage}`;
      const resp = await fetch(url, {
        headers: {
          // Accept header for potential future compatibility
          Accept: "application/vnd.github+json",
        },
      });
      if (!resp.ok) throw new Error(`GitHub activity failed (${resp.status})`);
      const json: GithubEventRaw[] = await resp.json();
      let normalized = json.map(classify);
      if (includeTypes && includeTypes.length) {
        normalized = normalized.filter((e) => includeTypes.includes(e.kind));
      }
      // Sort newest first (API returns newest first already, but ensure)
      normalized.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setEvents(normalized);
      writeCache(normalized);
    } catch (e: unknown) {
      if (!force) {
        if (e instanceof Error) setError(e.message); else setError("Failed to load GitHub activity");
      }
    } finally {
      setLoading(false);
      inFlightRef.current = false;
    }
  }, [username, perPage, includeTypes, writeCache]);

  useEffect(() => {
    const cached = readCache();
    if (cached) {
      const isFresh = Date.now() - cached.fetchedAt < cacheTtlMs;
      setEvents(cached.data);
      if (!isFresh) fetchData();
    } else {
      fetchData();
    }
  }, [cacheTtlMs, readCache, fetchData]);

  const refresh = useCallback(() => {
    fetchData(true);
  }, [fetchData]);

  return { events, loading, error, refresh };
}

export default useGithubActivity;
