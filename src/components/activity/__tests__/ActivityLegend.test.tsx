/**
 * Tests for ActivityLegend component
 * @module components/activity/__tests__/ActivityLegend.test
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ActivityLegend } from "../ActivityLegend";

describe("ActivityLegend", () => {
  it("renders legend heading", () => {
    render(<ActivityLegend />);
    expect(screen.getByText("Activity Graph Legend")).toBeInTheDocument();
  });

  it("renders all legend items with glyphs and labels", () => {
    render(<ActivityLegend />);

    // Check for common legend items
    expect(screen.getByText("⬆")).toBeInTheDocument(); // Push
    expect(screen.getByText("PR")).toBeInTheDocument(); // PR Opened
    expect(screen.getByText("M")).toBeInTheDocument(); // PR Merged
    expect(screen.getByText("★")).toBeInTheDocument(); // Starred
    expect(screen.getByText("📦")).toBeInTheDocument(); // npm Publish

    // Check for labels (note: it's "Star" not "Starred")
    expect(screen.getByText(/Push/)).toBeInTheDocument();
    expect(screen.getByText(/PR Opened/)).toBeInTheDocument();
    expect(screen.getByText(/PR Merged/)).toBeInTheDocument();
    expect(screen.getByText(/Star/)).toBeInTheDocument();
    expect(screen.getByText(/npm Publish/)).toBeInTheDocument();
  });

  it("renders with correct accessibility attributes", () => {
    render(<ActivityLegend />);

    // Legend should have the correct ID for aria-describedby references
    const legend = screen.getByRole("region", { name: /legend/i });
    expect(legend).toBeInTheDocument();
    expect(legend).toHaveAttribute("id", "activity-legend");
  });

  it("displays all event types from KIND_ITEMS", () => {
    render(<ActivityLegend />);

    // All 9 legend items should be present
    // KIND_ITEMS contains: push, pr-open, pr-merge, release, fork, star, issue-open, issue-comment, npm-publish
    // Component uses Stack (not list), so verify by checking unique text per item
    // Using stronger selectors to avoid "Found multiple elements" error
    expect(screen.getByText((content, element) => {
      return element?.tagName === 'STRONG' && content === 'Push';
    })).toBeInTheDocument();
    expect(screen.getByText((content, element) => {
      return element?.tagName === 'STRONG' && content === 'PR Opened';
    })).toBeInTheDocument();
    expect(screen.getByText((content, element) => {
      return element?.tagName === 'STRONG' && content === 'PR Merged';
    })).toBeInTheDocument();
    expect(screen.getByText((content, element) => {
      return element?.tagName === 'STRONG' && content === 'Release';
    })).toBeInTheDocument();
    expect(screen.getByText((content, element) => {
      return element?.tagName === 'STRONG' && content === 'Fork';
    })).toBeInTheDocument();
    expect(screen.getByText((content, element) => {
      return element?.tagName === 'STRONG' && content === 'Star';
    })).toBeInTheDocument();
    expect(screen.getByText((content, element) => {
      return element?.tagName === 'STRONG' && content === 'Issue Opened';
    })).toBeInTheDocument();
    expect(screen.getByText((content, element) => {
      return element?.tagName === 'STRONG' && content === 'Issue Comment';
    })).toBeInTheDocument();
    expect(screen.getByText((content, element) => {
      return element?.tagName === 'STRONG' && content === 'npm Publish';
    })).toBeInTheDocument();
  });

  it("has proper semantic structure", () => {
    render(<ActivityLegend />);

    // Component uses section element with proper aria-labelledby
    const section = screen.getByRole("region", { name: /Activity Graph Legend/i });
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute("id", "activity-legend");
  });
});
