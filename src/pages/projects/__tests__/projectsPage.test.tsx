import {
  render,
  screen,
  fireEvent,
  within,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HelmetProvider } from "react-helmet-async";
import { vi } from "vitest";
import ProjectsPage from "../projectsPage";

vi.mock("../../../hooks/useNpmPackages", () => ({
  __esModule: true,
  useNpmPackages: vi.fn(),
}));
vi.mock("../../../hooks/useGithubRepos", () => ({
  __esModule: true,
  useGithubRepos: vi.fn(),
}));
vi.mock("../../../hooks/useDevpostProjects", () => ({
  __esModule: true,
  useDevpostProjects: vi.fn(),
}));

// The portfolio layer supplies the curated metadata (status/category/featured)
// that the live sources cannot: two entries, deliberately differing in both.
const CURATED = [
  {
    id: "curated-web",
    title: "Curated Web Project",
    description: "A completed web project",
    longDescription: "Long description",
    image: "",
    technologies: ["React", "TypeScript"],
    featured: true,
    status: "completed",
    category: "web",
    githubUrl: undefined,
    liveUrl: undefined,
  },
  {
    id: "curated-cli",
    title: "Curated CLI Project",
    description: "An in-progress CLI project",
    longDescription: "Long description",
    image: "",
    technologies: ["Node.js"],
    featured: false,
    status: "in-progress",
    category: "cli",
    githubUrl: undefined,
    liveUrl: undefined,
  },
];

let curatedProjects: typeof CURATED = CURATED;

vi.mock("../../../hooks/usePortfolioData", () => ({
  __esModule: true,
  useProjects: () => ({
    projects: curatedProjects,
    featuredProjects: [],
    getProjectById: () => undefined,
    getProjectsByCategory: () => [],
  }),
}));

import { useNpmPackages } from "../../../hooks/useNpmPackages";
import { useGithubRepos } from "../../../hooks/useGithubRepos";
import { useDevpostProjects } from "../../../hooks/useDevpostProjects";

const asMock = (fn: unknown) => fn as ReturnType<typeof vi.fn>;

/** A live GitHub repo carries no curated status/category - that is the point. */
const REPO = {
  id: 1,
  name: "Live Repo",
  fullName: "vaporjawn/live-repo",
  description: "Straight from the GitHub API",
  htmlUrl: "https://github.com/Vaporjawn/live-repo",
  homepage: null,
  stargazersCount: 3,
  forksCount: 0,
  language: "TypeScript",
  topics: [],
  updatedAt: "2026-08-01T00:00:00Z",
  pushedAt: "2026-08-01T00:00:00Z",
};

const setSources = ({
  repos = [] as unknown[],
  githubLoading = false,
  githubError = null as string | null,
  npmLoading = false,
  npmError = null as string | null,
} = {}) => {
  asMock(useGithubRepos).mockReturnValue({
    repos,
    loading: githubLoading,
    error: githubError,
    refresh: vi.fn(),
    lastUpdated: null,
  });
  asMock(useNpmPackages).mockReturnValue({
    packages: [],
    loading: npmLoading,
    error: npmError,
    refresh: vi.fn(),
  });
  asMock(useDevpostProjects).mockReturnValue({
    projects: [],
    loading: false,
    error: null,
    refresh: vi.fn(),
    lastUpdated: null,
  });
};

const renderPage = () =>
  render(
    <HelmetProvider>
      <ProjectsPage />
    </HelmetProvider>
  );

describe("ProjectsPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    curatedProjects = CURATED;
  });

  it("reports how many projects are shown out of the total", () => {
    setSources({ repos: [REPO] });
    renderPage();
    expect(screen.getByText(/showing 3 of 3 projects/i)).toBeInTheDocument();
  });

  it("shows a loading state rather than 'no projects found' while sources are in flight", async () => {
    // Nothing has arrived from any source yet and all three are still fetching.
    // Falling through to the empty state here - as this page used to - tells the
    // visitor the opposite of the truth for the first second of every cold visit.
    curatedProjects = [];
    setSources({ repos: [], githubLoading: true, npmLoading: true });
    renderPage();

    expect(screen.getByText(/loading projects/i)).toBeInTheDocument();
    expect(screen.queryByText(/no projects found/i)).not.toBeInTheDocument();
  });

  it("shows the empty state once every source has reported", async () => {
    curatedProjects = [];
    setSources({ repos: [] });
    renderPage();

    expect(screen.getByText(/no projects found/i)).toBeInTheDocument();
    expect(screen.queryByText(/loading projects/i)).not.toBeInTheDocument();
  });

  it("surfaces an incomplete-data warning when a source fails", () => {
    setSources({ repos: [], githubError: "rate limit exceeded" });
    renderPage();
    expect(
      screen.getByText(/some sources could not be reached/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/rate limit exceeded/i)).toBeInTheDocument();
  });

  it("does not warn when every source succeeds", () => {
    setSources({ repos: [REPO] });
    renderPage();
    expect(
      screen.queryByText(/some sources could not be reached/i)
    ).not.toBeInTheDocument();
  });

  it("filters strictly by status, excluding entries that carry none", async () => {
    // Regression guard: this filter used to treat a missing status as a wildcard,
    // so every live GitHub repo satisfied every status and the dropdown did nothing.
    setSources({ repos: [REPO] });
    renderPage();

    expect(screen.getByText("Live Repo")).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(screen.getByRole("combobox", { name: /status/i }));
    await user.click(
      within(screen.getByRole("listbox")).getByRole("option", {
        name: /^completed$/i,
      })
    );

    expect(screen.getByText(/showing 1 of 3 projects/i)).toBeInTheDocument();
    expect(screen.getByText("Curated Web Project")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText("Curated CLI Project")).not.toBeInTheDocument();
      expect(screen.queryByText("Live Repo")).not.toBeInTheDocument();
    });
  });

  it("filters strictly by category", async () => {
    setSources({ repos: [REPO] });
    renderPage();

    const user = userEvent.setup();
    await user.click(screen.getByRole("combobox", { name: /category/i }));
    await user.click(
      within(screen.getByRole("listbox")).getByRole("option", {
        name: /^cli$/i,
      })
    );

    expect(screen.getByText(/showing 1 of 3 projects/i)).toBeInTheDocument();
    expect(screen.getByText("Curated CLI Project")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText("Curated Web Project")).not.toBeInTheDocument();
      expect(screen.queryByText("Live Repo")).not.toBeInTheDocument();
    });
  });

  it("keeps the filter toggles labelled and exposes their pressed state", () => {
    setSources({ repos: [REPO] });
    renderPage();

    const featured = screen.getByRole("button", { name: /^featured$/i });
    expect(featured).toHaveAttribute("aria-pressed", "false");
    fireEvent.click(featured);
    // The label must stay stable so the accessible name does not change underfoot.
    expect(screen.getByRole("button", { name: /^featured$/i })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
  });
});
