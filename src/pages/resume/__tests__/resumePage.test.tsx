/**
 * @module pages/resume/__tests__/resumePage.test
 * @description
 * Unit tests for ResumePage component.
 * Tests rendering of SEO, actions, viewer, and overall page layout.
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ResumePage from "../resumePage";

// Mock the resume PDF import
vi.mock("../../../assets/Resume.pdf", () => ({
  default: "/mocked-resume.pdf",
}));

/**
 * Helper to render ResumePage with all required providers
 */
const renderWithProviders = (component: React.ReactElement) => {
  const theme = createTheme({
    palette: {
      mode: "light",
    },
  });

  return render(
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>{component}</ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
};

describe("ResumePage", () => {
  it("renders without crashing", () => {
    renderWithProviders(<ResumePage />);

    // Check for main heading
    expect(
      screen.getByRole("heading", { name: /Resume/i, level: 1 })
    ).toBeInTheDocument();
  });

  it("renders action buttons", () => {
    renderWithProviders(<ResumePage />);

    expect(screen.getByText("Download PDF")).toBeInTheDocument();
    expect(screen.getByText("Open in New Tab")).toBeInTheDocument();
  });

  it("renders resume viewer", () => {
    renderWithProviders(<ResumePage />);

    const iframe = screen.getByTitle("Victor Williams Resume");
    expect(iframe).toBeInTheDocument();
  });

  it("renders fallback message", () => {
    renderWithProviders(<ResumePage />);

    expect(
      screen.getByText(
        /If the PDF doesn't display correctly, please try downloading it or opening in a new tab/i
      )
    ).toBeInTheDocument();
  });

  it("has proper page structure with SEO", () => {
    renderWithProviders(<ResumePage />);

    // SEO component should render without errors
    // Verify main content renders
    expect(screen.getByRole("heading", { name: /Resume/i })).toBeInTheDocument();
  });

  it("renders with proper typography styling", () => {
    renderWithProviders(<ResumePage />);

    const heading = screen.getByRole("heading", { name: /Resume/i });
    expect(heading).toHaveClass("MuiTypography-h3");
  });

  it("applies responsive layout", () => {
    const { container } = renderWithProviders(<ResumePage />);

    // Check for MUI Box components
    const boxes = container.querySelectorAll(".MuiBox-root");
    expect(boxes.length).toBeGreaterThan(0);
  });

  it("renders in dark mode", () => {
    const darkTheme = createTheme({
      palette: {
        mode: "dark",
      },
    });

    const { container } = render(
      <HelmetProvider>
        <BrowserRouter>
          <ThemeProvider theme={darkTheme}>
            <ResumePage />
          </ThemeProvider>
        </BrowserRouter>
      </HelmetProvider>
    );

    expect(container.firstChild).toBeInTheDocument();
  });

  it("uses correct resume path", () => {
    renderWithProviders(<ResumePage />);

    const iframe = screen.getByTitle("Victor Williams Resume");
    expect(iframe).toHaveAttribute("src", "/mocked-resume.pdf");
  });

  it("has accessible heading structure", () => {
    renderWithProviders(<ResumePage />);

    // Should have exactly one h1
    const h1Elements = screen.getAllByRole("heading", { level: 1 });
    expect(h1Elements).toHaveLength(1);
    expect(h1Elements[0]).toHaveTextContent("Resume");
  });
});
