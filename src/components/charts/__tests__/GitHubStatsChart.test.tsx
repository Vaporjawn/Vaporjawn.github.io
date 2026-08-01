/**
 * @module components/charts/__tests__/GitHubStatsChart.test
 * @description
 * Test suite for GitHubStatsChart. Verifies loading, error, and populated
 * states render correctly from plain props — no network involved, matching
 * the codebase convention of keeping GitHub-data presentational components
 * dumb and testing them with static props (see GitHubSection.test.tsx).
 */

import { render, screen } from "@testing-library/react";
import GitHubStatsChart from "../GitHubStatsChart";
import type { LanguageSlice, RepoStats } from "../utils/githubStatsUtils";

const stats: RepoStats = { totalStars: 42, totalForks: 7, totalRepos: 12 };
const languageData: LanguageSlice[] = [
  { name: "TypeScript", value: 8, color: "#3178c6" },
  { name: "Python", value: 4, color: "#3776ab" },
];

describe("GitHubStatsChart", () => {
  it("renders the title", () => {
    render(<GitHubStatsChart stats={stats} languageData={languageData} />);
    expect(screen.getByText("GitHub Stats")).toBeInTheDocument();
  });

  it("shows a skeleton loading state and no error message while loading", () => {
    render(<GitHubStatsChart loading />);
    expect(screen.queryByText("Total Stars")).not.toBeInTheDocument();
    expect(screen.queryByText(/Couldn't load live GitHub stats/)).not.toBeInTheDocument();
  });

  it("shows an error message instead of the dashboard when error is set", () => {
    render(<GitHubStatsChart error="GitHub repos fetch failed: 403" />);
    expect(
      screen.getByText(/Couldn't load live GitHub stats/)
    ).toBeInTheDocument();
    expect(screen.getByText(/403/)).toBeInTheDocument();
    expect(screen.queryByText("Total Stars")).not.toBeInTheDocument();
  });

  it("renders real stat values when data is provided", () => {
    render(<GitHubStatsChart stats={stats} languageData={languageData} />);
    expect(screen.getByText("Total Stars")).toBeInTheDocument();
    expect(screen.getByText("42")).toBeInTheDocument();
    expect(screen.getByText("Total Forks")).toBeInTheDocument();
    expect(screen.getByText("7")).toBeInTheDocument();
    expect(screen.getByText("Repositories")).toBeInTheDocument();
    expect(screen.getByText("12")).toBeInTheDocument();
  });

  it("no longer renders the removed Day Streak stat or activity chart", () => {
    render(<GitHubStatsChart stats={stats} languageData={languageData} />);
    expect(screen.queryByText("Day Streak")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Contribution Activity (Last 6 Months)")
    ).not.toBeInTheDocument();
  });

  it("shows a fallback message when there is no language data", () => {
    render(<GitHubStatsChart stats={stats} languageData={[]} />);
    expect(screen.getByText("No language data available yet.")).toBeInTheDocument();
  });
});
