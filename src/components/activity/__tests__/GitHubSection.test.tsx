/**
 * Tests for GitHubSection component
 * @module components/activity/__tests__/GitHubSection.test
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { GitHubSection } from "../GitHubSection";
import type { CommitGraphEvent } from "../types";

describe("GitHubSection", () => {
  const mockEvents: CommitGraphEvent[] = [
    {
      id: "1",
      createdAt: "2024-01-15T10:00:00Z",
      message: "Fixed bug in authentication",
      kind: "push",
      lane: "GitHub",
      repo: "vaporjawn/portfolio",
      url: "https://github.com/vaporjawn/portfolio/commit/abc123",
    },
    {
      id: "2",
      createdAt: "2024-01-14T14:00:00Z",
      message: "Opened PR for new feature",
      kind: "pr-open",
      lane: "GitHub",
      repo: "vaporjawn/test-repo",
      url: "https://github.com/vaporjawn/test-repo/pull/42",
    },
  ];

  const mockProfileUrl = "https://github.com/Vaporjawn";
  const mockRefresh = vi.fn();
  const mockOnViewChange = vi.fn();

  it("renders GitHub activity section heading", () => {
    render(
      <GitHubSection
        events={mockEvents}
        loading={false}
        error={null}
        refresh={mockRefresh}
        view="graph"
        onViewChange={mockOnViewChange}
        profileUrl={mockProfileUrl}
      />
    );

    expect(screen.getByRole("heading", { name: /GitHub Activity/i })).toBeInTheDocument();
  });

  it("displays loading state when loading is true", () => {
    render(
      <GitHubSection
        events={[]}
        loading={true}
        error={null}
        refresh={mockRefresh}
        view="graph"
        onViewChange={mockOnViewChange}
        profileUrl={mockProfileUrl}
      />
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("displays error message when error is present", () => {
    const errorMessage = "API rate limit exceeded";
    render(
      <GitHubSection
        events={[]}
        loading={false}
        error={errorMessage}
        refresh={mockRefresh}
        view="graph"
        onViewChange={mockOnViewChange}
        profileUrl={mockProfileUrl}
      />
    );

    expect(screen.getByText(/Failed to load GitHub activity/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(errorMessage))).toBeInTheDocument();
  });

  it("renders CommitGraph in graph view mode", () => {
    render(
      <GitHubSection
        events={mockEvents}
        loading={false}
        error={null}
        refresh={mockRefresh}
        view="graph"
        onViewChange={mockOnViewChange}
        profileUrl={mockProfileUrl}
      />
    );

    // CommitGraph renders lane headers
    expect(screen.getByText("GitHub")).toBeInTheDocument();
  });

  it("renders list view when view mode is list", () => {
    render(
      <GitHubSection
        events={mockEvents}
        loading={false}
        error={null}
        refresh={mockRefresh}
        view="list"
        onViewChange={mockOnViewChange}
        profileUrl={mockProfileUrl}
      />
    );

    expect(screen.getByText(/Fixed bug in authentication/)).toBeInTheDocument();
    expect(screen.getByText(/Opened PR for new feature/)).toBeInTheDocument();
  });

  it("displays \"No recent activity\" when events array is empty", () => {
    render(
      <GitHubSection
        events={[]}
        loading={false}
        error={null}
        refresh={mockRefresh}
        view="graph"
        onViewChange={mockOnViewChange}
        profileUrl={mockProfileUrl}
      />
    );

    expect(screen.getByText(/No recent activity/i)).toBeInTheDocument();
  });

  it("calls refresh function when refresh button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <GitHubSection
        events={mockEvents}
        loading={false}
        error={null}
        refresh={mockRefresh}
        view="graph"
        onViewChange={mockOnViewChange}
        profileUrl={mockProfileUrl}
      />
    );

    const refreshButton = screen.getByLabelText(/refresh GitHub activity/i);
    await user.click(refreshButton);

    expect(mockRefresh).toHaveBeenCalledTimes(1);
  });

  it("disables refresh button when loading", () => {
    render(
      <GitHubSection
        events={[]}
        loading={true}
        error={null}
        refresh={mockRefresh}
        view="graph"
        onViewChange={mockOnViewChange}
        profileUrl={mockProfileUrl}
      />
    );

    const refreshButton = screen.getByLabelText(/refresh GitHub activity/i);
    expect(refreshButton).toBeDisabled();
  });

  it("calls onViewChange when view toggle is clicked", async () => {
    const user = userEvent.setup();
    render(
      <GitHubSection
        events={mockEvents}
        loading={false}
        error={null}
        refresh={mockRefresh}
        view="graph"
        onViewChange={mockOnViewChange}
        profileUrl={mockProfileUrl}
      />
    );

    const listViewButton = screen.getByLabelText(/list view/i);
    await user.click(listViewButton);

    expect(mockOnViewChange).toHaveBeenCalledWith("list");
  });

  it("renders link to GitHub profile", () => {
    render(
      <GitHubSection
        events={mockEvents}
        loading={false}
        error={null}
        refresh={mockRefresh}
        view="graph"
        onViewChange={mockOnViewChange}
        profileUrl={mockProfileUrl}
      />
    );

    const profileLink = screen.getByRole("link", { name: /open GitHub profile/i });
    expect(profileLink).toHaveAttribute("href", mockProfileUrl);
    expect(profileLink).toHaveAttribute("target", "_blank");
  });

  it("limits list view to 32 events", () => {
    const manyEvents: CommitGraphEvent[] = Array.from({ length: 50 }, (_, i) => ({
      id: `event-${i}`,
      createdAt: "2024-01-01T00:00:00Z",
      message: `Event ${i}`,
      kind: "push",
      lane: "GitHub",
      repo: "test/repo",
    }));

    render(
      <GitHubSection
        events={manyEvents}
        loading={false}
        error={null}
        refresh={mockRefresh}
        view="list"
        onViewChange={mockOnViewChange}
        profileUrl={mockProfileUrl}
      />
    );

    // Should only show first 32 events
    expect(screen.getByText(/Event 0/)).toBeInTheDocument();
    expect(screen.getByText(/Event 31/)).toBeInTheDocument();
    expect(screen.queryByText(/Event 32/)).not.toBeInTheDocument();
  });

  it("passes maxRepos and heightPerNode props to CommitGraph", () => {
    const { container } = render(
      <GitHubSection
        events={mockEvents}
        loading={false}
        error={null}
        refresh={mockRefresh}
        view="graph"
        onViewChange={mockOnViewChange}
        profileUrl={mockProfileUrl}
        maxRepos={10}
        heightPerNode={50}
      />
    );

    // CommitGraph should be rendered (we can't easily verify props, but we can check it renders)
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders event URLs as clickable links in list view", () => {
    render(
      <GitHubSection
        events={mockEvents}
        loading={false}
        error={null}
        refresh={mockRefresh}
        view="list"
        onViewChange={mockOnViewChange}
        profileUrl={mockProfileUrl}
      />
    );

    const eventLinks = screen.getAllByLabelText(/open event/i);
    expect(eventLinks.length).toBe(2);
    expect(eventLinks[0]).toHaveAttribute("href", mockEvents[0].url);
  });

  it("displays lane and repo information in list view", () => {
    render(
      <GitHubSection
        events={mockEvents}
        loading={false}
        error={null}
        refresh={mockRefresh}
        view="list"
        onViewChange={mockOnViewChange}
        profileUrl={mockProfileUrl}
      />
    );

    expect(screen.getByText(/GitHub • vaporjawn\/portfolio/)).toBeInTheDocument();
    expect(screen.getByText(/GitHub • vaporjawn\/test-repo/)).toBeInTheDocument();
  });
});
