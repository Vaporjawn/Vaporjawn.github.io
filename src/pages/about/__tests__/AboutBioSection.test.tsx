/**
 * @module pages/about/__tests__/AboutBioSection.test
 * @description
 * Unit tests for AboutBioSection component.
 * Tests rendering with portfolio data, fallback content, and theme responsiveness.
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AboutBioSection } from "../components/AboutBioSection";
import { PortfolioData } from "../../../contexts/PortfolioContext";

/**
 * Helper to render component with theme provider
 */
const renderWithTheme = (component: React.ReactElement, darkMode = false) => {
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

/**
 * Mock portfolio data for testing
 */
const mockPortfolioData: PortfolioData = {
  personalInfo: {
    name: "John Doe",
    title: "Software Engineer",
    email: "john@example.com",
    location: "San Francisco, CA",
    bio: "I'm a passionate developer with extensive experience in building web applications.",
    avatar: "/avatar.jpg",
  },
  skills: {
    frontend: [],
    backend: [],
  },
  projects: [],
  experience: [],
  education: [],
  social: [],
};

describe("AboutBioSection", () => {
  it("renders with portfolio data", () => {
    renderWithTheme(<AboutBioSection portfolioData={mockPortfolioData} />);

    // Check for name in heading
    expect(screen.getByText(/About John Doe/i)).toBeInTheDocument();

    // Check for bio text
    expect(
      screen.getByText(
        /I'm a passionate developer with extensive experience in building web applications./i
      )
    ).toBeInTheDocument();

    // Check for tech stack info
    expect(
      screen.getByText(/This site is built with React, TypeScript, Vite/i)
    ).toBeInTheDocument();
  });

  it("renders with fallback content when no portfolio data", () => {
    renderWithTheme(<AboutBioSection portfolioData={null} />);

    // Check for default heading
    expect(screen.getByText(/About Me/i)).toBeInTheDocument();

    // Check for fallback bio content
    expect(
      screen.getByText(
        /I'm a passionate developer focused on building interactive experiences/i
      )
    ).toBeInTheDocument();

    // Check for secondary paragraph
    expect(
      screen.getByText(
        /Outside of coding, I explore creative tech, gaming culture/i
      )
    ).toBeInTheDocument();
  });

  it("renders tech stack information", () => {
    renderWithTheme(<AboutBioSection portfolioData={mockPortfolioData} />);

    // Check for tech stack details
    expect(
      screen.getByText(/React, TypeScript, Vite, and Material-UI/i)
    ).toBeInTheDocument();
  });

  it("renders in dark mode", () => {
    const { container } = renderWithTheme(
      <AboutBioSection portfolioData={mockPortfolioData} />,
      true
    );

    // Check that component renders successfully in dark mode
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders in light mode", () => {
    const { container } = renderWithTheme(
      <AboutBioSection portfolioData={mockPortfolioData} />,
      false
    );

    // Check that component renders successfully in light mode
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders creative paragraph content", () => {
    renderWithTheme(<AboutBioSection portfolioData={null} />);

    // Check for the creative paragraph
    expect(
      screen.getByText(/This site evolves as an experimental canvas/i)
    ).toBeInTheDocument();
  });
});
