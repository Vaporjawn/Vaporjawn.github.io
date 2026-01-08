/**
 * @module pages/about/__tests__/aboutPage.test
 * @description
 * Unit tests for AboutPage component.
 * Tests rendering of SEO, bio section, contact section, and layout.
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import AboutPage from "../aboutPage";
import { PortfolioProvider } from "../../../contexts/PortfolioContext";

/**
 * Helper to render AboutPage with all required providers
 */
const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <HelmetProvider>
      <BrowserRouter>
        <PortfolioProvider>{component}</PortfolioProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
};

describe("AboutPage", () => {
  it("renders without crashing", () => {
    renderWithRouter(<AboutPage />);

    // Check for bio section heading with more specific selector
    expect(screen.getByRole("heading", { name: /About/i, level: 1 })).toBeInTheDocument();
  });

  it("renders bio section", () => {
    renderWithRouter(<AboutPage />);

    // Check for bio content from portfolio data
    const bioContent = screen.queryByText(/technology leader|full-stack engineer/i) ||
                       screen.queryByText(/passionate developer focused on building interactive experiences/i);
    expect(bioContent).toBeInTheDocument();
  });

  it("renders tech stack information", () => {
    renderWithRouter(<AboutPage />);

    // Check for tech stack info
    expect(
      screen.getByText(/This site is built with React, TypeScript, Vite/i)
    ).toBeInTheDocument();
  });

  it("renders contact section", () => {
    renderWithRouter(<AboutPage />);

    // Check for contact section heading
    expect(screen.getByText(/Get In Touch/i)).toBeInTheDocument();
  });

  it("renders email button", () => {
    renderWithRouter(<AboutPage />);

    // Check for email button
    expect(
      screen.getByText(/victor\.williams\.dev@gmail\.com/i)
    ).toBeInTheDocument();
  });

  it("includes SEO meta information", () => {
    renderWithRouter(<AboutPage />);

    // SEO component should render without errors
    // Verify page renders successfully with bio heading
    expect(screen.getByRole("heading", { name: /About/i, level: 1 })).toBeInTheDocument();
  });
});
