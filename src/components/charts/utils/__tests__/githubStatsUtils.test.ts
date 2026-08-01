/**
 * @module components/charts/utils/__tests__/githubStatsUtils.test
 * @description
 * Test suite for githubStatsUtils. Verifies stat aggregation and
 * language-distribution bucketing/sorting against plain GithubRepo fixtures
 * — no rendering, no network.
 */

import {
  computeRepoStats,
  computeLanguageDistribution,
} from "../githubStatsUtils";
import type { GithubRepo } from "../../../../hooks/useGithubRepos";

const makeRepo = (overrides: Partial<GithubRepo>): GithubRepo => ({
  id: Math.random(),
  name: "repo",
  fullName: "vaporjawn/repo",
  htmlUrl: "https://github.com/vaporjawn/repo",
  stargazersCount: 0,
  forksCount: 0,
  language: null,
  updatedAt: "2026-01-01T00:00:00Z",
  ...overrides,
});

describe("computeRepoStats", () => {
  it("sums stars and forks and counts repos", () => {
    const repos = [
      makeRepo({ stargazersCount: 10, forksCount: 2 }),
      makeRepo({ stargazersCount: 5, forksCount: 1 }),
      makeRepo({ stargazersCount: 0, forksCount: 0 }),
    ];

    expect(computeRepoStats(repos)).toEqual({
      totalStars: 15,
      totalForks: 3,
      totalRepos: 3,
    });
  });

  it("returns zeros for an empty repo list", () => {
    expect(computeRepoStats([])).toEqual({
      totalStars: 0,
      totalForks: 0,
      totalRepos: 0,
    });
  });
});

describe("computeLanguageDistribution", () => {
  it("counts repos per language", () => {
    const repos = [
      makeRepo({ language: "TypeScript" }),
      makeRepo({ language: "TypeScript" }),
      makeRepo({ language: "Python" }),
    ];

    const result = computeLanguageDistribution(repos);

    expect(result).toEqual([
      { name: "TypeScript", value: 2, color: "#3178c6" },
      { name: "Python", value: 1, color: "#3776ab" },
    ]);
  });

  it("excludes repos with no reported language", () => {
    const repos = [
      makeRepo({ language: "TypeScript" }),
      makeRepo({ language: null }),
      makeRepo({ language: undefined }),
    ];

    expect(computeLanguageDistribution(repos)).toEqual([
      { name: "TypeScript", value: 1, color: "#3178c6" },
    ]);
  });

  it("returns an empty array when no repo has a language", () => {
    const repos = [makeRepo({ language: null }), makeRepo({ language: null })];
    expect(computeLanguageDistribution(repos)).toEqual([]);
  });

  it("sorts by repo count descending", () => {
    const repos = [
      makeRepo({ language: "CSS" }),
      makeRepo({ language: "TypeScript" }),
      makeRepo({ language: "TypeScript" }),
      makeRepo({ language: "TypeScript" }),
    ];

    const result = computeLanguageDistribution(repos);
    expect(result.map((s) => s.name)).toEqual(["TypeScript", "CSS"]);
  });

  it("folds the long tail beyond maxSlices into 'Other'", () => {
    const repos = [
      makeRepo({ language: "TypeScript" }),
      makeRepo({ language: "TypeScript" }),
      makeRepo({ language: "JavaScript" }),
      makeRepo({ language: "Python" }),
      makeRepo({ language: "Go" }),
      makeRepo({ language: "Rust" }),
      makeRepo({ language: "Elixir" }), // pushed into "Other" beyond maxSlices=5
    ];

    const result = computeLanguageDistribution(repos, 5);

    expect(result).toHaveLength(6); // 5 named slices + "Other"
    expect(result.at(-1)).toEqual({ name: "Other", value: 1, color: "#858585" });
  });

  it("assigns a fallback color to languages outside the known map", () => {
    const repos = [makeRepo({ language: "Zig" })];
    const result = computeLanguageDistribution(repos);

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Zig");
    expect(result[0].color).toMatch(/^#[0-9a-f]{6}$/i);
  });
});
