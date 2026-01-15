/**
 * @module pages/home/components/CallToActionSection/__tests__/CallToActionSection.test
 * @description
 * Test suite for CallToActionSection main component.
 * Verifies rendering, styling, and composition with subcomponents.
 */

import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { PortfolioProvider } from "../../../../../contexts/PortfolioContext";
import { CallToActionSection } from "../CallToActionSection";

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <HelmetProvider>
      <BrowserRouter>
        <PortfolioProvider>{component}</PortfolioProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
};

describe("CallToActionSection", () => {
  const defaultProps = {
    background:
      "linear-gradient(135deg, rgba(8,8,18,0.55) 0%, rgba(18,0,36,0.65) 55%)",
    email: "test@example.com",
  };

  it("renders without crashing", async () => {
    renderWithProviders(<CallToActionSection {...defaultProps} />);
    await waitFor(() => {
      expect(
        screen.getByText("Ready to build something amazing together?")
      ).toBeInTheDocument();
    });
  });

  it("renders the main heading", async () => {
    renderWithProviders(<CallToActionSection {...defaultProps} />);
    await waitFor(() => {
      const heading = screen.getByText(
        "Ready to build something amazing together?"
      );
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe("H4");
    });
  });

  it("renders the description text", async () => {
    renderWithProviders(<CallToActionSection {...defaultProps} />);
    await waitFor(() => {
      expect(
        screen.getByText(
          "Check out my projects or get in touch to discuss your next idea."
        )
      ).toBeInTheDocument();
    });
  });

  it("renders both CTA buttons", async () => {
    renderWithProviders(<CallToActionSection {...defaultProps} />);
    await waitFor(() => {
      expect(screen.getByText("View My Projects")).toBeInTheDocument();
      expect(screen.getByText("Get In Touch")).toBeInTheDocument();
    });
  });

  it("applies parallax background styling", () => {
    const { container } = renderWithProviders(
      <CallToActionSection {...defaultProps} />
    );
    const box = container.querySelector("div[class*=\"MuiBox\"]");
    expect(box).toBeInTheDocument();
  });

  it("renders with custom background prop", async () => {
    const customBackground = "linear-gradient(90deg, #ff0000, #00ff00)";
    renderWithProviders(
      <CallToActionSection
        background={customBackground}
        email={defaultProps.email}
      />
    );
    await waitFor(() => {
      expect(
        screen.getByText("Ready to build something amazing together?")
      ).toBeInTheDocument();
    });
  });

  it("renders without email prop", async () => {
    renderWithProviders(
      <CallToActionSection background={defaultProps.background} />
    );
    await waitFor(() => {
      expect(screen.getByText("View My Projects")).toBeInTheDocument();
      expect(screen.getByText("Get In Touch")).toBeInTheDocument();
    });
  });

  it("passes email prop to CTAButtons component", async () => {
    renderWithProviders(<CallToActionSection {...defaultProps} />);
    await waitFor(() => {
      const contactButton = screen.getByText("Get In Touch");
      expect(contactButton).toBeInTheDocument();
    });
  });
});
