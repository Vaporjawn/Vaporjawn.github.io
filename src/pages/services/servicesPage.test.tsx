import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { HelmetProvider } from "react-helmet-async";
import { createVaporwaveTheme } from "../../theme/theme";
import { PortfolioProvider } from "../../contexts/PortfolioContext";
import ServicesPage from "./servicesPage";

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = createVaporwaveTheme("dark");
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <PortfolioProvider>{children}</PortfolioProvider>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
};

describe("ServicesPage", () => {
  it("renders the services page with all main sections", () => {
    render(
      <TestWrapper>
        <ServicesPage />
      </TestWrapper>
    );

    // Check for main heading
    expect(
      screen.getByRole("heading", { name: /web development services/i })
    ).toBeInTheDocument();

    // Check for "How I Work" section
    expect(
      screen.getByRole("heading", { name: /how i work/i })
    ).toBeInTheDocument();

    // Check for pricing section
    expect(
      screen.getByRole("heading", { name: /simple, transparent pricing/i })
    ).toBeInTheDocument();

    // Check for CTA section
    expect(
      screen.getByRole("heading", { name: /let's build something amazing/i })
    ).toBeInTheDocument();

    // Check for service packages
    expect(screen.getByText("Consultation")).toBeInTheDocument();
    expect(screen.getByText("Project Leadership")).toBeInTheDocument();

    // Check for process steps
    expect(screen.getByText("Discovery")).toBeInTheDocument();
    expect(screen.getByText("Planning")).toBeInTheDocument();
    expect(screen.getByText("Delivery")).toBeInTheDocument();

    // Check that "Development" appears twice (process step and service package)
    expect(screen.getAllByText("Development")).toHaveLength(2);
  });

  it("renders the hero section with proper description", () => {
    render(
      <TestWrapper>
        <ServicesPage />
      </TestWrapper>
    );

    expect(screen.getByText(/from concept to deployment/i)).toBeInTheDocument();
  });

  it("renders all Get Started buttons", () => {
    render(
      <TestWrapper>
        <ServicesPage />
      </TestWrapper>
    );

    const getStartedButtons = screen.getAllByText("Get Started");
    expect(getStartedButtons).toHaveLength(3); // One for each service package
  });

  it("renders CTA buttons", () => {
    render(
      <TestWrapper>
        <ServicesPage />
      </TestWrapper>
    );

    expect(screen.getByText("Start Your Project")).toBeInTheDocument();
    expect(screen.getByText("View Portfolio")).toBeInTheDocument();
  });
});
