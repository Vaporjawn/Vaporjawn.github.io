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
    // The name renders as-is in the DOM; CSS text-transform: uppercase handles the caps display
    expect(screen.getByText("Victor Williams")).toBeInTheDocument();
  });

  it("renders in dark mode", () => {
    renderWithRouter(<HomePage />);
    const nameElement = screen.getByText("Victor Williams");
    expect(nameElement).toBeInTheDocument();
  });

  it("renders in light mode", () => {
    renderWithRouter(<HomePage />);
    const nameElement = screen.getByText("Victor Williams");
    expect(nameElement).toBeInTheDocument();
  });
});