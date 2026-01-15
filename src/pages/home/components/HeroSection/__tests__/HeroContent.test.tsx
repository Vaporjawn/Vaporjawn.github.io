/**
 * @module pages/home/components/HeroSection/__tests__/HeroContent.test
 * @description
 * Test suite for HeroContent subcomponent.
 * Verifies text rendering, typography hierarchy, and social media integration.
 */

import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { PortfolioProvider } from "../../../../../contexts/PortfolioContext";
import { HeroContent } from "../HeroContent";

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

describe("HeroContent", () => {
  const defaultProps = {
    name: "JOHN DOE",
    title: "FULL STACK DEVELOPER",
    bio: "Building amazing web applications with modern technologies.",
  };

  it("renders without crashing", async () => {
    renderWithProviders(<HeroContent {...defaultProps} />);
    await waitFor(() => {
      expect(screen.getByText("JOHN DOE")).toBeInTheDocument();
    });
  });

  it("renders the name as h1 heading", async () => {
    renderWithProviders(<HeroContent {...defaultProps} />);
    await waitFor(() => {
      const nameElement = screen.getByText("JOHN DOE");
      expect(nameElement.tagName).toBe("H1");
    });
  });

  it("renders the title as h2 heading", async () => {
    renderWithProviders(<HeroContent {...defaultProps} />);
    await waitFor(() => {
      const titleElement = screen.getByText("FULL STACK DEVELOPER");
      expect(titleElement.tagName).toBe("H2");
    });
  });

  it("renders the bio text", async () => {
    renderWithProviders(<HeroContent {...defaultProps} />);
    await waitFor(() => {
      expect(screen.getByText(defaultProps.bio)).toBeInTheDocument();
    });
  });

  it("renders social media component", async () => {
    const { container } = renderWithProviders(<HeroContent {...defaultProps} />);
    await waitFor(() => {
      // Social media component renders anchor tags for social links
      const socialLinks = container.querySelectorAll("a");
      expect(socialLinks.length).toBeGreaterThan(0);
    });
  });

  it("applies correct typography hierarchy", async () => {
    renderWithProviders(<HeroContent {...defaultProps} />);
    await waitFor(() => {
      const h1 = screen.getByText("JOHN DOE");
      const h2 = screen.getByText("FULL STACK DEVELOPER");

      expect(h1.tagName).toBe("H1");
      expect(h2.tagName).toBe("H2");
    });
  });

  it("renders custom name prop correctly", async () => {
    const customName = "JANE SMITH";
    renderWithProviders(<HeroContent {...defaultProps} name={customName} />);
    await waitFor(() => {
      expect(screen.getByText(customName)).toBeInTheDocument();
    });
  });

  it("renders custom title prop correctly", async () => {
    const customTitle = "SOFTWARE ARCHITECT";
    renderWithProviders(<HeroContent {...defaultProps} title={customTitle} />);
    await waitFor(() => {
      expect(screen.getByText(customTitle)).toBeInTheDocument();
    });
  });

  it("renders custom bio prop correctly", async () => {
    const customBio = "Creating scalable solutions for enterprise clients.";
    renderWithProviders(<HeroContent {...defaultProps} bio={customBio} />);
    await waitFor(() => {
      expect(screen.getByText(customBio)).toBeInTheDocument();
    });
  });
});
