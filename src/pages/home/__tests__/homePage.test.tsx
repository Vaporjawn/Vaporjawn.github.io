import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HomePage from "../homePage";

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe("HomePage", () => {
  it("renders Victor Williams name", () => {
    renderWithRouter(<HomePage darkMode={false} />);
    expect(screen.getByText("Victor Williams")).toBeInTheDocument();
  });

  it("renders in dark mode", () => {
    renderWithRouter(<HomePage darkMode={true} />);
    const nameElement = screen.getByText("Victor Williams");
    expect(nameElement).toBeInTheDocument();
    expect(nameElement).toHaveStyle("text-shadow: 2px 2px 4px #4900ff");
  });

  it("renders in light mode", () => {
    renderWithRouter(<HomePage darkMode={false} />);
    const nameElement = screen.getByText("Victor Williams");
    expect(nameElement).toBeInTheDocument();
    expect(nameElement).toHaveStyle("text-shadow: 2px 2px 4px #000000");
  });
});