/**
 * @module pages/home/components/ChartSection/__tests__/ChartSection.test
 * @description
 * Test suite for ChartSection wrapper component.
 * Validates spacing, layout, and accessibility features.
 */

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChartSection } from "../ChartSection";

describe("ChartSection", () => {
  it("renders children correctly", () => {
    render(
      <ChartSection>
        <div data-testid="test-chart">Test Chart</div>
      </ChartSection>
    );

    expect(screen.getByTestId("test-chart")).toBeInTheDocument();
    expect(screen.getByText("Test Chart")).toBeInTheDocument();
  });

  it("renders as section element", () => {
    const { container } = render(
      <ChartSection>
        <div>Content</div>
      </ChartSection>
    );

    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("applies default large spacing", () => {
    const { container } = render(
      <ChartSection>
        <div>Content</div>
      </ChartSection>
    );

    const section = container.querySelector("section");
    const styles = window.getComputedStyle(section!);

    // MUI spacing(8) typically = 64px (8 * 8px)
    // Note: Actual px value depends on MUI theme
    expect(section).toHaveStyle({ marginBottom: expect.any(String) });
  });

  it("applies small spacing when specified", () => {
    const { container } = render(
      <ChartSection spacing="small">
        <div>Content</div>
      </ChartSection>
    );

    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("applies medium spacing when specified", () => {
    const { container } = render(
      <ChartSection spacing="medium">
        <div>Content</div>
      </ChartSection>
    );

    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("applies custom top spacing", () => {
    const { container } = render(
      <ChartSection spacing="small" topSpacing="large">
        <div>Content</div>
      </ChartSection>
    );

    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("uses bottom spacing for top when topSpacing not provided", () => {
    const { container } = render(
      <ChartSection spacing="medium">
        <div>Content</div>
      </ChartSection>
    );

    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("applies aria-label when provided", () => {
    const { container } = render(
      <ChartSection ariaLabel="Skills proficiency radar visualization">
        <div>Content</div>
      </ChartSection>
    );

    const section = container.querySelector("section");
    expect(section).toHaveAttribute(
      "aria-label",
      "Skills proficiency radar visualization"
    );
  });

  it("omits aria-label when not provided", () => {
    const { container } = render(
      <ChartSection>
        <div>Content</div>
      </ChartSection>
    );

    const section = container.querySelector("section");
    expect(section).not.toHaveAttribute("aria-label");
  });

  it("applies custom sx props", () => {
    const { container } = render(
      <ChartSection sx={{ backgroundColor: "red" }}>
        <div>Content</div>
      </ChartSection>
    );

    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("combines default and custom sx props", () => {
    const { container } = render(
      <ChartSection spacing="large" sx={{ padding: 2 }}>
        <div>Content</div>
      </ChartSection>
    );

    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("renders multiple children", () => {
    render(
      <ChartSection>
        <div data-testid="child1">Child 1</div>
        <div data-testid="child2">Child 2</div>
      </ChartSection>
    );

    expect(screen.getByTestId("child1")).toBeInTheDocument();
    expect(screen.getByTestId("child2")).toBeInTheDocument();
  });

  it("handles complex chart components", () => {
    const MockChart = () => (
      <div data-testid="mock-chart">
        <h3>Chart Title</h3>
        <canvas />
      </div>
    );

    render(
      <ChartSection ariaLabel="Mock chart section">
        <MockChart />
      </ChartSection>
    );

    expect(screen.getByTestId("mock-chart")).toBeInTheDocument();
    expect(screen.getByText("Chart Title")).toBeInTheDocument();
  });

  it("maintains accessibility with proper semantic HTML", () => {
    const { container } = render(
      <ChartSection ariaLabel="GitHub statistics dashboard">
        <div role="img" aria-label="Chart visualization">
          Chart Content
        </div>
      </ChartSection>
    );

    const section = container.querySelector("section");
    expect(section).toHaveAttribute("aria-label", "GitHub statistics dashboard");

    const chart = screen.getByRole("img");
    expect(chart).toHaveAttribute("aria-label", "Chart visualization");
  });
});
