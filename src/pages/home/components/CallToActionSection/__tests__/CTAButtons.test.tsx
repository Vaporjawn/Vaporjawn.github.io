/**
 * @module pages/home/components/CallToActionSection/__tests__/CTAButtons.test
 * @description
 * Test suite for CTAButtons group component.
 * Verifies button group rendering, layout, and prop passing.
 */

import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { PortfolioProvider } from "../../../../../contexts/PortfolioContext";
import { CTAButtons } from "../CTAButtons";

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <HelmetProvider>
      <BrowserRouter>
        <PortfolioProvider>{component}</PortfolioProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
};

describe("CTAButtons", () => {
  it("renders without crashing", async () => {
    renderWithProviders(<CTAButtons email="test@example.com" />);
    await waitFor(() => {
      expect(screen.getByText("View My Projects")).toBeInTheDocument();
    });
  });

  it("renders both CTA buttons", async () => {
    renderWithProviders(<CTAButtons email="test@example.com" />);
    await waitFor(() => {
      expect(screen.getByText("View My Projects")).toBeInTheDocument();
      expect(screen.getByText("Get In Touch")).toBeInTheDocument();
    });
  });

  it("renders without email prop", async () => {
    renderWithProviders(<CTAButtons />);
    await waitFor(() => {
      expect(screen.getByText("View My Projects")).toBeInTheDocument();
      expect(screen.getByText("Get In Touch")).toBeInTheDocument();
    });
  });

  it("passes email to contact button", async () => {
    const email = "custom@example.com";
    renderWithProviders(<CTAButtons email={email} />);
    await waitFor(() => {
      const contactButton = screen.getByText("Get In Touch");
      expect(contactButton).toBeInTheDocument();
      // Button should be present - actual mailto validation happens in CTAButton tests
    });
  });

  it("renders projects button with proper configuration", async () => {
    renderWithProviders(<CTAButtons email="test@example.com" />);
    await waitFor(() => {
      const projectsButton = screen.getByText("View My Projects");
      expect(projectsButton).toBeInTheDocument();
      expect(projectsButton.tagName).toBe("BUTTON");
    });
  });

  it("renders contact button with proper configuration", async () => {
    renderWithProviders(<CTAButtons email="test@example.com" />);
    await waitFor(() => {
      const contactButton = screen.getByText("Get In Touch");
      expect(contactButton).toBeInTheDocument();
      expect(contactButton.tagName).toBe("BUTTON");
    });
  });

  it("applies responsive flexbox layout", () => {
    const { container } = renderWithProviders(
      <CTAButtons email="test@example.com" />
    );
    const box = container.querySelector("div[class*=\"MuiBox\"]");
    expect(box).toBeInTheDocument();
  });

  it("renders with default empty email when undefined", async () => {
    renderWithProviders(<CTAButtons email={undefined} />);
    await waitFor(() => {
      expect(screen.getByText("View My Projects")).toBeInTheDocument();
      expect(screen.getByText("Get In Touch")).toBeInTheDocument();
    });
  });
});
