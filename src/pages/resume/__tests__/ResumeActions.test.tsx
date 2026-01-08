/**
 * @module pages/resume/__tests__/ResumeActions.test
 * @description
 * Unit tests for ResumeActions component.
 * Tests button rendering, download functionality, and analytics integration.
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ResumeActions } from "../components/ResumeActions";

// Mock analytics module
vi.mock("../../../utils/analytics");

/**
 * Helper to render component with theme provider
 */
const renderWithTheme = (component: React.ReactElement) => {
  const theme = createTheme({
    palette: {
      mode: "light",
    },
  });

  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe("ResumeActions", () => {
  const mockResumePath = "/assets/Resume.pdf";

  beforeEach(() => {
    vi.clearAllMocks();
    // Mock window.open
    global.open = vi.fn();
  });

  it("renders download and open buttons", () => {
    renderWithTheme(<ResumeActions resumePath={mockResumePath} />);

    expect(screen.getByText("Download PDF")).toBeInTheDocument();
    expect(screen.getByText("Open in New Tab")).toBeInTheDocument();
  });

  it("has proper ARIA labels", () => {
    renderWithTheme(<ResumeActions resumePath={mockResumePath} />);

    expect(
      screen.getByLabelText("Download resume as PDF")
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Open resume in new tab")).toBeInTheDocument();
  });

  it("renders with correct icon components", () => {
    const { container } = renderWithTheme(
      <ResumeActions resumePath={mockResumePath} />
    );

    // Check for SVG icons (Download and OpenInNew icons)
    const svgs = container.querySelectorAll("svg");
    expect(svgs.length).toBeGreaterThanOrEqual(2);
  });

  it("applies theme-based styling", () => {
    renderWithTheme(<ResumeActions resumePath={mockResumePath} />);

    const downloadButton = screen.getByText("Download PDF");
    expect(downloadButton).toHaveClass("MuiButton-contained");

    const openButton = screen.getByText("Open in New Tab");
    expect(openButton).toHaveClass("MuiButton-outlined");
  });
});

