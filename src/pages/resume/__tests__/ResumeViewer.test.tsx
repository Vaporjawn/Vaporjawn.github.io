/**
 * @module pages/resume/__tests__/ResumeViewer.test
 * @description
 * Unit tests for ResumeViewer component.
 * Tests iframe rendering, fallback message, and accessibility attributes.
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ResumeViewer } from "../components/ResumeViewer";

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

describe("ResumeViewer", () => {
  const mockResumePath = "/assets/Resume.pdf";

  it("renders iframe with resume path", () => {
    renderWithTheme(<ResumeViewer resumePath={mockResumePath} />);

    const iframe = screen.getByTitle("Victor Williams Resume");
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute("src", mockResumePath);
  });

  it("has proper accessibility attributes", () => {
    renderWithTheme(<ResumeViewer resumePath={mockResumePath} />);

    const iframe = screen.getByTitle("Victor Williams Resume");
    expect(iframe).toHaveAttribute("aria-label", "Victor Williams Resume");
  });

  it("renders fallback message", () => {
    renderWithTheme(<ResumeViewer resumePath={mockResumePath} />);

    expect(
      screen.getByText(
        /If the PDF doesn't display correctly, please try downloading it or opening in a new tab/i
      )
    ).toBeInTheDocument();
  });

  it("iframe has correct styling", () => {
    renderWithTheme(<ResumeViewer resumePath={mockResumePath} />);

    const iframe = screen.getByTitle("Victor Williams Resume") as HTMLIFrameElement;

    // Check that critical display styles are set
    expect(iframe).toHaveStyle({
      display: "block",
    });

    // Verify the height and min-height are set via inline styles
    const styleAttr = iframe.getAttribute("style");
    expect(styleAttr).toContain("height");
    expect(styleAttr).toContain("min-height");
  });

  it("renders with proper container styling", () => {
    const { container } = renderWithTheme(
      <ResumeViewer resumePath={mockResumePath} />
    );

    // Check for MUI Box component
    const boxElement = container.querySelector(".MuiBox-root");
    expect(boxElement).toBeInTheDocument();
  });

  it("iframe has 100% width", () => {
    renderWithTheme(<ResumeViewer resumePath={mockResumePath} />);

    const iframe = screen.getByTitle("Victor Williams Resume");
    expect(iframe).toHaveAttribute("width", "100%");
  });

  it("renders in dark mode", () => {
    const darkTheme = createTheme({
      palette: {
        mode: "dark",
      },
    });

    const { container } = render(
      <ThemeProvider theme={darkTheme}>
        <ResumeViewer resumePath={mockResumePath} />
      </ThemeProvider>
    );

    expect(container.firstChild).toBeInTheDocument();
  });
});
