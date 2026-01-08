import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
// Mock heavy/asset imports before importing HomePage to avoid TS resolution issues
vi.mock("../../assets/profile-picture.jpeg", () => ({ default: "profile-picture-mock.jpg" }));
vi.mock("../../assets/banner.jpg", () => ({ default: "banner-mock.jpg" }));
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
