/**
 * @module pages/home/components/CallToActionSection/__tests__/CTAButton.test
 * @description
 * Test suite for CTAButton subcomponent.
 * Verifies button rendering, navigation, and interaction behavior.
 */

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { PortfolioProvider } from "../../../../../contexts/PortfolioContext";
import { CTAButton } from "../CTAButton";
import { vi } from "vitest";

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <HelmetProvider>
      <BrowserRouter>
        <PortfolioProvider>{component}</PortfolioProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
};

describe("CTAButton", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("renders with label text", async () => {
    renderWithProviders(
      <CTAButton label="Test Button" variant="contained" to="/test" />
    );
    await waitFor(() => {
      expect(screen.getByText("Test Button")).toBeInTheDocument();
    });
  });

  it("renders contained variant button", async () => {
    renderWithProviders(
      <CTAButton label="Contained Button" variant="contained" to="/test" />
    );
    await waitFor(() => {
      const button = screen.getByText("Contained Button");
      expect(button).toBeInTheDocument();
      expect(button.tagName).toBe("BUTTON");
    });
  });

  it("renders outlined variant button", async () => {
    renderWithProviders(
      <CTAButton label="Outlined Button" variant="outlined" to="/test" />
    );
    await waitFor(() => {
      const button = screen.getByText("Outlined Button");
      expect(button).toBeInTheDocument();
      expect(button.tagName).toBe("BUTTON");
    });
  });

  it("navigates to internal route when clicked", async () => {
    renderWithProviders(
      <CTAButton label="Navigate" variant="contained" to="/projects" />
    );
    await waitFor(() => {
      const button = screen.getByText("Navigate");
      fireEvent.click(button);
      expect(mockNavigate).toHaveBeenCalledWith("/projects");
    });
  });

  it("calls custom onClick handler when provided", async () => {
    const mockOnClick = vi.fn();
    renderWithProviders(
      <CTAButton
        label="Custom Click"
        variant="contained"
        onClick={mockOnClick}
      />
    );
    await waitFor(() => {
      const button = screen.getByText("Custom Click");
      fireEvent.click(button);
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
  });

  it("handles external href correctly", async () => {
    // Mock window.location.href assignment
    const originalLocation = window.location;
    delete (window as any).location;
    window.location = { ...originalLocation, href: "" } as any;

    renderWithProviders(
      <CTAButton
        label="External Link"
        variant="outlined"
        href="mailto:test@example.com"
      />
    );

    await waitFor(() => {
      const button = screen.getByText("External Link");
      fireEvent.click(button);
      expect(window.location.href).toBe("mailto:test@example.com");
    });

    // Restore original location
    window.location = originalLocation;
  });

  it("prioritizes onClick over to prop", async () => {
    const mockOnClick = vi.fn();
    renderWithProviders(
      <CTAButton
        label="Priority Test"
        variant="contained"
        to="/projects"
        onClick={mockOnClick}
      />
    );
    await waitFor(() => {
      const button = screen.getByText("Priority Test");
      fireEvent.click(button);
      expect(mockOnClick).toHaveBeenCalledTimes(1);
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });

  it("renders with proper size and styling props", async () => {
    renderWithProviders(
      <CTAButton label="Styled Button" variant="contained" to="/test" />
    );
    await waitFor(() => {
      const button = screen.getByText("Styled Button");
      expect(button).toBeInTheDocument();
      // Button should be rendered with MUI styles
      expect(button.className).toContain("MuiButton");
    });
  });
});
