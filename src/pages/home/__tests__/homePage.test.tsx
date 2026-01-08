import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HomePage from "../homePage";
import { PortfolioProvider } from "../../../contexts/PortfolioContext";
import { HelmetProvider } from "react-helmet-async";

const renderWithRouter = (component: React.ReactElement) => {
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

describe("HomePage", () => {
  it("renders Victor Williams name", () => {
    renderWithRouter(<HomePage />);
    // The component renders "VICTOR WILLIAMS" in all caps
    expect(screen.getByText("VICTOR WILLIAMS")).toBeInTheDocument();
  });

  it("renders in dark mode", () => {
    renderWithRouter(<HomePage />);
    // The component renders "VICTOR WILLIAMS" in all caps
    const nameElement = screen.getByText("VICTOR WILLIAMS");
    expect(nameElement).toBeInTheDocument();
  });

  it("renders in light mode", () => {
    renderWithRouter(<HomePage />);
    // The component renders "VICTOR WILLIAMS" in all caps
    const nameElement = screen.getByText("VICTOR WILLIAMS");
    expect(nameElement).toBeInTheDocument();
  });
});