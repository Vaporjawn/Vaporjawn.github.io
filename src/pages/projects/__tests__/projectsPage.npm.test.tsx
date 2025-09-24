import { render, screen, fireEvent, act } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import ProjectsPage from "../projectsPage"; // adjust if path differs

// Mock hook to control states
jest.mock("../../../hooks/useNpmPackages", () => ({
  __esModule: true,
  useNpmPackages: jest.fn()
}));
jest.mock("../../../hooks/usePortfolioData", () => ({
  __esModule: true,
  useProjects: () => ({
    projects: [
      {
        id: "proj-1",
        title: "Test Project",
        description: "A test project",
        longDescription: "Long description",
        image: "",
        technologies: ["React", "TypeScript"],
        featured: false,
        status: "completed",
        category: "web",
        liveUrl: undefined,
        githubUrl: undefined,
      },
    ],
    featuredProjects: [],
    getProjectById: () => undefined,
    getProjectsByCategory: () => [],
  }),
}));

import { useNpmPackages } from "../../../hooks/useNpmPackages";

// Provide required Helmet context for SEO component (react-helmet-async)
const renderWithProviders = () =>
  render(
    <HelmetProvider>
      <ProjectsPage />
    </HelmetProvider>
  );

describe("ProjectsPage NPM Packages section", () => {
  beforeEach(() => {
    (useNpmPackages as jest.Mock).mockReset();
  });

  const ensureExpanded = () => {
    // If it's already expanded, the button will read Hide NPM packages list
    const hideBtn = screen.queryByRole("button", { name: /hide npm packages list/i });
    if (hideBtn) return; // already expanded
    const showBtn = screen.queryByRole("button", { name: /show npm packages list/i });
    if (showBtn) fireEvent.click(showBtn);
  };

  test("renders loading state", () => {
    (useNpmPackages as jest.Mock).mockReturnValue({ packages: [], loading: true, error: null, refresh: jest.fn() });
    renderWithProviders();
    ensureExpanded();
    expect(screen.getByText(/loading packages/i)).toBeInTheDocument();
  });

  test("renders empty state", () => {
    (useNpmPackages as jest.Mock).mockReturnValue({ packages: [], loading: false, error: null, refresh: jest.fn() });
    renderWithProviders();
    ensureExpanded();
    expect(screen.getByText(/no packages found/i)).toBeInTheDocument();
  });

  test("renders error state", () => {
    (useNpmPackages as jest.Mock).mockReturnValue({ packages: [], loading: false, error: "Boom", refresh: jest.fn() });
    renderWithProviders();
    ensureExpanded();
    expect(screen.getByText(/boom/i)).toBeInTheDocument();
  });

  test("renders packages and refresh works", async () => {
    const refresh = jest.fn();
    (useNpmPackages as jest.Mock).mockReturnValue({
      packages: [
        { name: "pkg-1", version: "1.0.0", description: "desc", keywords: [], npmUrl: "https://npmjs.com/package/pkg-1" }
      ],
      loading: false,
      error: null,
      refresh
    });
    renderWithProviders();
    ensureExpanded();
  // Use getAllByText because the package name may appear more than once (e.g., heading + tooltip/title)
  const nameMatches = screen.getAllByText(/pkg-1/i);
  expect(nameMatches.length).toBeGreaterThan(0);
    const refreshBtn = screen.getByRole("button", { name: /refresh npm packages/i });
    await act(async () => {
      fireEvent.click(refreshBtn);
    });
    expect(refresh).toHaveBeenCalled();
  });

  test("aria-live region updates from loading to count", () => {
    interface MockPkg { name: string; version: string; description: string; keywords: string[]; npmUrl: string; }
    interface HookState { packages: MockPkg[]; loading: boolean; error: string | null; refresh: () => void; }
    const sequence: HookState[] = [
      { packages: [], loading: true, error: null, refresh: jest.fn() },
      { packages: [ { name: "pkg-a", version: "1.0.0", description: "d", keywords: [], npmUrl: "" } ], loading: false, error: null, refresh: jest.fn() }
    ];
    let call = 0;
    (useNpmPackages as jest.Mock).mockImplementation(() => sequence[Math.min(call, sequence.length - 1)]);
    renderWithProviders();
    ensureExpanded();
    // Initial loading message
    expect(screen.getByText(/loading packages/i)).toBeInTheDocument();
    // Simulate re-render with data loaded
    call = 1;
    // Force re-render by toggling show/hide
    const hideBtn = screen.getByRole("button", { name: /hide npm packages list/i });
    fireEvent.click(hideBtn);
    ensureExpanded();
    expect(screen.getByText(/showing 1 package/i)).toBeInTheDocument();
  });
});
