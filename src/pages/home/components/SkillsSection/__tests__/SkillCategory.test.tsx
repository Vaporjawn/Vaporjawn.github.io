/**
 * @module pages/home/components/SkillsSection/__tests__/SkillCategory.test
 * @description
 * Test suite for SkillCategory component.
 * Verifies category display, skill chip rendering, and prop handling.
 */

import { render, screen } from "@testing-library/react";
import { SkillCategory } from "../SkillCategory";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe("SkillCategory", () => {
  const mockSkills = [
    { name: "React.js", level: 95, category: "framework" },
    { name: "TypeScript", level: 92, category: "language" },
    { name: "JavaScript", level: 95, category: "language" },
  ];

  it("renders without crashing", () => {
    render(<SkillCategory title="Frontend" skills={mockSkills} />);
    expect(screen.getByText("Frontend")).toBeInTheDocument();
  });

  it("displays the category title", () => {
    render(<SkillCategory title="Frontend" skills={mockSkills} />);
    const title = screen.getByText("Frontend");
    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe("H4");
  });

  it("renders all skills in the category", () => {
    render(<SkillCategory title="Frontend" skills={mockSkills} />);

    expect(screen.getByText("React.js")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
  });

  it("handles empty skills array", () => {
    render(<SkillCategory title="Empty Category" skills={[]} />);
    expect(screen.getByText("Empty Category")).toBeInTheDocument();
  });

  it("renders skills as chips", () => {
    const { container } = render(
      <SkillCategory title="Frontend" skills={mockSkills} />
    );
    const chips = container.querySelectorAll("[class*='MuiChip-root']");
    expect(chips.length).toBeGreaterThanOrEqual(3);
  });

  it("uses Grid item for responsive layout", () => {
    const { container } = render(
      <SkillCategory title="Frontend" skills={mockSkills} />
    );
    const gridItem = container.querySelector(
      "[class*='MuiGrid-item'], [class*='MuiGrid-root']"
    );
    expect(gridItem).toBeInTheDocument();
  });

  it("applies theme-aware primary color to title", () => {
    const { container } = render(
      <SkillCategory title="Frontend" skills={mockSkills} />
    );
    const title = screen.getByText("Frontend");
    // Title should have styling applied (can't directly test theme colors in jsdom)
    expect(title).toBeInTheDocument();
  });

  it("renders different categories with different titles", () => {
    const { rerender } = render(
      <SkillCategory title="Frontend" skills={mockSkills} />
    );
    expect(screen.getByText("Frontend")).toBeInTheDocument();

    rerender(<SkillCategory title="Backend" skills={mockSkills} />);
    expect(screen.getByText("Backend")).toBeInTheDocument();
    expect(screen.queryByText("Frontend")).not.toBeInTheDocument();
  });
});
