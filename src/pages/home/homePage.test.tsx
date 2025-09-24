import { describe, it, expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
// Mock heavy/asset imports before importing HomePage to avoid TS resolution issues
jest.mock("../../assets/profile-picture.jpeg", () => "profile-picture-mock.jpg");
jest.mock("../../assets/banner.jpg", () => "banner-mock.jpg");
import HomePage from "./homePage";
import { PortfolioProvider } from "../../contexts/PortfolioContext";

describe("HomePage", () => {
  it("renders Reddit and Threads social links", () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <PortfolioProvider>
            <HomePage />
          </PortfolioProvider>
        </MemoryRouter>
      </HelmetProvider>
    );

    const [reddit] = screen.getAllByLabelText(/reddit/i);
    const [threads] = screen.getAllByLabelText(/threads/i);
    expect(reddit).toBeTruthy();
    expect(threads).toBeTruthy();
  });
});
