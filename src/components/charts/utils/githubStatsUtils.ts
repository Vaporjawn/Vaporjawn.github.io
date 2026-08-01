/**
 * Pure helpers that turn raw `GithubRepo[]` (from `useGithubRepos`) into the
 * aggregate shapes `GitHubStatsChart` renders: summary stats and a
 * per-language repo-count distribution.
 *
 * Kept separate from `GitHubStatsChart.tsx` and from `homePage.tsx` so the
 * aggregation logic is independently testable without rendering React or
 * hitting the network.
 *
 * @module components/charts/utils/githubStatsUtils
 */
import type { GithubRepo } from "../../../hooks/useGithubRepos";

export interface RepoStats {
  totalStars: number;
  totalForks: number;
  totalRepos: number;
}

export interface LanguageSlice {
  /** Language name (or "Other" for the long tail, only when `maxSlices` is
   *  passed explicitly — every language gets its own slice by default) */
  name: string;
  /** Repo count in this language — Recharts derives slice percentages from
   *  the proportion between slices, so raw counts (not pre-computed
   *  percentages) keep the numbers honest and avoid double-rounding. */
  value: number;
  color: string;
}

/**
 * Sums stars/forks and counts repos from a list of GitHub repos.
 *
 * @example
 * ```ts
 * const { repos } = useGithubRepos();
 * const stats = computeRepoStats(repos);
 * ```
 */
export function computeRepoStats(repos: GithubRepo[]): RepoStats {
  return repos.reduce(
    (acc, repo) => ({
      totalStars: acc.totalStars + repo.stargazersCount,
      totalForks: acc.totalForks + repo.forksCount,
      totalRepos: acc.totalRepos + 1,
    }),
    { totalStars: 0, totalForks: 0, totalRepos: 0 }
  );
}

/** Known brand-ish colors for common languages; anything else cycles through FALLBACK_COLORS. */
const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3776ab",
  HTML: "#e34c26",
  CSS: "#1572b6",
  Java: "#b07219",
  "C#": "#178600",
  Shell: "#89e051",
  Go: "#00add8",
  Ruby: "#701516",
  PHP: "#4f5d95",
  Swift: "#f05138",
  Kotlin: "#a97bff",
  Rust: "#dea584",
  Vue: "#41b883",
  Dockerfile: "#384d54",
  "C++": "#f34b7d",
  C: "#555555",
};

const FALLBACK_COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#5cb3ff"];
const OTHER_COLOR = "#858585";

/**
 * Buckets repos by primary language. By default every distinct language gets
 * its own slice, sorted by repo count descending — with 11 languages across
 * this account's repos at the time of writing, there's no real risk of an
 * unreadable chart, and lumping the tail into "Other" hid real information
 * (which language "Other" even meant) for no real space savings. Pass an
 * explicit `maxSlices` to opt back into top-N-plus-"Other" bucketing if the
 * account ever grows enough distinct languages for that to matter again.
 * Repos with no reported language (e.g. docs-only repos) are excluded
 * entirely.
 *
 * @example
 * ```ts
 * const { repos } = useGithubRepos();
 * const languageData = computeLanguageDistribution(repos); // every language, no cap
 * const top5 = computeLanguageDistribution(repos, 5); // top 5 + "Other"
 * ```
 */
export function computeLanguageDistribution(
  repos: GithubRepo[],
  maxSlices = Infinity
): LanguageSlice[] {
  const counts = new Map<string, number>();
  for (const repo of repos) {
    if (!repo.language) continue;
    counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1);
  }

  if (counts.size === 0) return [];

  const sorted = Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
  const top = sorted.slice(0, maxSlices);
  const rest = sorted.slice(maxSlices);
  const otherCount = rest.reduce((sum, [, count]) => sum + count, 0);

  let fallbackIndex = 0;
  const slices: LanguageSlice[] = top.map(([name, count]) => ({
    name,
    value: count,
    color:
      LANGUAGE_COLORS[name] ??
      FALLBACK_COLORS[fallbackIndex++ % FALLBACK_COLORS.length],
  }));

  if (otherCount > 0) {
    slices.push({ name: "Other", value: otherCount, color: OTHER_COLOR });
  }

  return slices;
}
