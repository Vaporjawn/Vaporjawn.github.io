/**
 * Tests for NpmSection component
 * @module components/activity/__tests__/NpmSection.test
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { NpmSection } from "../NpmSection";

describe("NpmSection", () => {
  const mockPackages = [
    {
      name: "@vaporjawn/test-package",
      version: "1.2.3",
      description: "A test package for unit tests",
      publishedAt: "2024-01-10T12:00:00Z",
      npmUrl: "https://www.npmjs.com/package/@vaporjawn/test-package",
      weeklyDownloads: 1250,
    },
    {
      name: "another-package",
      version: "2.0.0",
      description: "Another test package",
      publishedAt: "2024-01-08T10:00:00Z",
      npmUrl: "https://www.npmjs.com/package/another-package",
      weeklyDownloads: 500,
    },
  ];

  const mockProfileUrl = "https://www.npmjs.com/~vaporjawn";
  const mockRefresh = vi.fn();

  it("renders npm packages section heading", () => {
    render(
      <NpmSection
        packages={mockPackages}
        loading={false}
        error={null}
        refresh={mockRefresh}
        profileUrl={mockProfileUrl}
      />
    );

    expect(screen.getByRole("heading", { name: /npm Packages/i })).toBeInTheDocument();
  });

  it("displays loading state when loading is true", () => {
    render(
      <NpmSection
        packages={[]}
        loading={true}
        error={null}
        refresh={mockRefresh}
        profileUrl={mockProfileUrl}
      />
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("displays error message when error is present", () => {
    const errorMessage = "Failed to fetch packages";
    render(
      <NpmSection
        packages={[]}
        loading={false}
        error={errorMessage}
        refresh={mockRefresh}
        profileUrl={mockProfileUrl}
      />
    );

    expect(screen.getByText(/Failed to load npm packages/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(errorMessage))).toBeInTheDocument();
  });

  it("displays package list when packages are provided", () => {
    render(
      <NpmSection
        packages={mockPackages}
        loading={false}
        error={null}
        refresh={mockRefresh}
        profileUrl={mockProfileUrl}
      />
    );

    expect(screen.getByText(/@vaporjawn\/test-package @ 1.2.3/)).toBeInTheDocument();
    expect(screen.getByText(/another-package @ 2.0.0/)).toBeInTheDocument();
  });

  it("displays package descriptions and metadata", () => {
    render(
      <NpmSection
        packages={mockPackages}
        loading={false}
        error={null}
        refresh={mockRefresh}
        profileUrl={mockProfileUrl}
      />
    );

    expect(screen.getByText(/A test package for unit tests/)).toBeInTheDocument();
    expect(screen.getByText(/1,250 downloads\/week/)).toBeInTheDocument();
    expect(screen.getByText(/500 downloads\/week/)).toBeInTheDocument();
  });

  it("displays \"No published packages\" when packages array is empty", () => {
    render(
      <NpmSection
        packages={[]}
        loading={false}
        error={null}
        refresh={mockRefresh}
        profileUrl={mockProfileUrl}
      />
    );

    expect(screen.getByText(/No published packages/i)).toBeInTheDocument();
  });

  it("limits display to 8 packages", () => {
    const manyPackages = Array.from({ length: 15 }, (_, i) => ({
      name: `package-${i}`,
      version: "1.0.0",
      description: `Package ${i}`,
      publishedAt: "2024-01-01T00:00:00Z",
      npmUrl: `https://www.npmjs.com/package/package-${i}`,
      weeklyDownloads: 100,
    }));

    render(
      <NpmSection
        packages={manyPackages}
        loading={false}
        error={null}
        refresh={mockRefresh}
        profileUrl={mockProfileUrl}
      />
    );

    // Should only show first 8 packages
    expect(screen.getByText(/package-0 @ 1.0.0/)).toBeInTheDocument();
    expect(screen.getByText(/package-7 @ 1.0.0/)).toBeInTheDocument();
    expect(screen.queryByText(/package-8 @ 1.0.0/)).not.toBeInTheDocument();
  });

  it("calls refresh function when refresh button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <NpmSection
        packages={mockPackages}
        loading={false}
        error={null}
        refresh={mockRefresh}
        profileUrl={mockProfileUrl}
      />
    );

    const refreshButton = screen.getByLabelText(/refresh npm packages/i);
    await user.click(refreshButton);

    expect(mockRefresh).toHaveBeenCalledTimes(1);
  });

  it("disables refresh button when loading", () => {
    render(
      <NpmSection
        packages={[]}
        loading={true}
        error={null}
        refresh={mockRefresh}
        profileUrl={mockProfileUrl}
      />
    );

    const refreshButton = screen.getByLabelText(/refresh npm packages/i);
    expect(refreshButton).toBeDisabled();
  });

  it("renders link to npm profile", () => {
    render(
      <NpmSection
        packages={mockPackages}
        loading={false}
        error={null}
        refresh={mockRefresh}
        profileUrl={mockProfileUrl}
      />
    );

    const profileLink = screen.getByRole("link", { name: /open npm profile/i });
    expect(profileLink).toHaveAttribute("href", mockProfileUrl);
    expect(profileLink).toHaveAttribute("target", "_blank");
  });

  it("renders View All on npm button", () => {
    render(
      <NpmSection
        packages={mockPackages}
        loading={false}
        error={null}
        refresh={mockRefresh}
        profileUrl={mockProfileUrl}
      />
    );

    const viewAllButton = screen.getByRole("link", { name: /View All on npm/i });
    expect(viewAllButton).toHaveAttribute("href", mockProfileUrl);
  });

  it("renders package links when npmUrl is provided", () => {
    render(
      <NpmSection
        packages={mockPackages}
        loading={false}
        error={null}
        refresh={mockRefresh}
        profileUrl={mockProfileUrl}
      />
    );

    const packageLinks = screen.getAllByLabelText(/open package/i);
    expect(packageLinks.length).toBe(2);
    expect(packageLinks[0]).toHaveAttribute("href", mockPackages[0].npmUrl);
  });
});
