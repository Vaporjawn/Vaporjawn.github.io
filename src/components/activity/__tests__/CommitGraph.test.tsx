import { render, screen } from "@testing-library/react";
import CommitGraph, { CommitGraphEvent } from "../../activity/CommitGraph";

// Helper to build ISO dates increasing
function daysAgo(n: number) { return new Date(Date.now() - n * 24*60*60*1000).toISOString(); }

describe("CommitGraph", () => {
  const baseEvents: CommitGraphEvent[] = [
    { id: "1", createdAt: daysAgo(5), message: "RepoA push", kind: "push", lane: "GitHub", repo: "vapor/repoA" },
    { id: "2", createdAt: daysAgo(4), message: "RepoB push", kind: "push", lane: "GitHub", repo: "vapor/repoB" },
    { id: "3", createdAt: daysAgo(3), message: "RepoA PR opened", kind: "pr-open", lane: "GitHub", repo: "vapor/repoA" },
    { id: "4", createdAt: daysAgo(2), message: "RepoA PR merged", kind: "pr-merge", lane: "GitHub", repo: "vapor/repoA" },
    { id: "5", createdAt: daysAgo(1), message: "Package published", kind: "npm-publish", lane: "npm", repo: "portfolio-site" },
  ];

  it("renders GitHub trunk, repo sub-branches and npm lane", () => {
    render(<CommitGraph events={baseEvents} maxRepos={8} heightPerNode={30} />);
    // Lane headers (text content) - trunk + repo names (last path segment) + npm lane.
    expect(screen.getByText("GitHub")).toBeInTheDocument();
    expect(screen.getByText("repoA")).toBeInTheDocument();
    expect(screen.getByText("repoB")).toBeInTheDocument();
    // npm lane label should appear exactly once
    expect(screen.getByText("npm")).toBeInTheDocument();
  });

  it("applies correct aria-labels for events including human kind labels", () => {
    render(<CommitGraph events={baseEvents} />);
    // push event label
    const pushNode = screen.getByLabelText(/Push event in vapor\/repoA/i);
    expect(pushNode).toBeInTheDocument();
    // PR opened label
    const prOpen = screen.getByLabelText(/PR Opened event in vapor\/repoA/i);
    expect(prOpen).toBeInTheDocument();
    // npm publish event
    const npmPublish = screen.getByLabelText(/npm Publish event in portfolio-site|npm/i);
    expect(npmPublish).toBeInTheDocument();
  });

  it("shows glyphs matching event kinds (snapshot minimal)", () => {
    render(<CommitGraph events={baseEvents} />);
    // Glyph expectations (using text inside bubbles)
    // push -> ⬆ (some environments may render as a single arrow char)
    expect(screen.getAllByText("⬆").length).toBeGreaterThanOrEqual(1);
    // pr-open -> PR
    expect(screen.getAllByText("PR").length).toBeGreaterThanOrEqual(1);
    // pr-merge -> M
    expect(screen.getAllByText("M").length).toBeGreaterThanOrEqual(1);
    // npm-publish -> 📦 (package)
    expect(screen.getAllByText("📦").length).toBeGreaterThanOrEqual(1);
  });
});
