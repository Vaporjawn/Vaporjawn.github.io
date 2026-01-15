/**
 * @module pages/home/components/HeroSection/__tests__/HeroSection.test
 * @description
 * Test suite for HeroSection orchestrator component.
 * Verifies composition of subcomponents and prop passing.
 */

import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { PortfolioProvider } from "../../../../../contexts/PortfolioContext";
import { HeroSection } from "../HeroSection";

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <HelmetProvider>
      <BrowserRouter>
        <PortfolioProvider>
          {component}
        </PortfolioProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
};

describe("HeroSection", () => {
  const mockBackground = "linear-gradient(135deg, rgba(0,0,0,0.5), rgba(0,0,0,0.3))";

  it("renders without crashing", async () => {
    renderWithProviders(<HeroSection background={mockBackground} />);
    await waitFor(() => {
      expect(screen.getByText("VICTOR WILLIAMS")).toBeInTheDocument();
    });
  });

  it("renders the user name", async () => {
    renderWithProviders(<HeroSection background={mockBackground} />);
    await waitFor(() => {
      const nameElement = screen.getByText("VICTOR WILLIAMS");
      expect(nameElement).toBeInTheDocument();
      expect(nameElement.tagName).toBe("H1");
    });
  });

  it("renders the professional title", async () => {
    renderWithProviders(<HeroSection background={mockBackground} />);
    await waitFor(() => {
      expect(
        screen.getByText("SOFTWARE DEVELOPER & DIGITAL CREATIVE")
      ).toBeInTheDocument();
    });
  });

  it("renders the bio text", async () => {
    renderWithProviders(<HeroSection background={mockBackground} />);
    await waitFor(() => {
      expect(
        screen.getByText(/Passionate developer creating innovative digital experiences/)
      ).toBeInTheDocument();
    });
  });

  it("applies the background prop correctly", () => {
    const { container } = renderWithProviders(<HeroSection background={mockBackground} />);
    const heroBox = container.querySelector("[class*='MuiBox']");
    expect(heroBox).toHaveStyle({ background: mockBackground });
  });

  it("has responsive layout grid structure", () => {
    const { container } = renderWithProviders(<HeroSection background={mockBackground} />);
    // Check for Grid containers (MUI Grid v2 uses different class names)
    const gridContainers = container.querySelectorAll("[class*='MuiGrid-container'], [class*='MuiGrid-root']");
    expect(gridContainers.length).toBeGreaterThan(0);
  });

  it("renders social media links section", async () => {
    const { container } = renderWithProviders(<HeroSection background={mockBackground} />);
    await waitFor(() => {
      // Social media component should render multiple social links
      const socialLinks = container.querySelectorAll("a");
      expect(socialLinks.length).toBeGreaterThan(0);
    });
  });
});
