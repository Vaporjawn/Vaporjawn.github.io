/**
 * @module pages/home/components/SkillsSection/__tests__/SkillsSection.test
 * @description
 * Test suite for SkillsSection orchestrator component.
 * Verifies composition of categories, prop handling, and display logic.
 */

import { render, screen } from "@testing-library/react";
import { SkillsSection } from "../SkillsSection";

// Mock framer-motion to avoid animation issues in tests
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe("SkillsSection", () => {
  const mockSkills = {
    frontend: [
      { name: "React.js", level: 95, category: "framework" },
      { name: "TypeScript", level: 92, category: "language" },
    ],
    backend: [
      { name: "Node.js", level: 90, category: "runtime" },
      { name: "Python", level: 88, category: "language" },
    ],
    tools: [
      { name: "Git", level: 92, category: "version-control" },
      { name: "Vite", level: 85, category: "build-tool" },
    ],
    database: [
      { name: "PostgreSQL", level: 85, category: "relational" },
    ],
    cloud: [
      { name: "Microsoft Azure", level: 88, category: "platform" },
    ],
    mobile: [
      { name: "React Native", level: 80, category: "framework" },
    ],
    architecture: [
      { name: "REST APIs", level: 92, category: "api" },
    ],
    business: [
      { name: "User Experience (UX)", level: 85, category: "design" },
    ],
    security: [
      { name: "Cybersecurity", level: 80, category: "security" },
    ],
    leadership: [
      { name: "Technical Leadership", level: 95, category: "management" },
    ],
  };

  it("renders without crashing", () => {
    render(<SkillsSection skills={mockSkills} />);
    expect(screen.getByText("Technical Skills")).toBeInTheDocument();
  });

  it("renders the main heading", () => {
    render(<SkillsSection skills={mockSkills} />);
    const heading = screen.getByText("Technical Skills");
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe("H3");
  });

  it("displays all skill categories with data", () => {
    render(<SkillsSection skills={mockSkills} />);

    expect(screen.getByText("Frontend")).toBeInTheDocument();
    expect(screen.getByText("Backend")).toBeInTheDocument();
    expect(screen.getByText("Tools & Technologies")).toBeInTheDocument();
    expect(screen.getByText("Database")).toBeInTheDocument();
    expect(screen.getByText("Cloud & DevOps")).toBeInTheDocument();
    expect(screen.getByText("Mobile")).toBeInTheDocument();
    expect(screen.getByText("Architecture")).toBeInTheDocument();
    expect(screen.getByText("Business")).toBeInTheDocument();
    expect(screen.getByText("Security")).toBeInTheDocument();
    expect(screen.getByText("Leadership")).toBeInTheDocument();
  });

  it("displays skill chips within categories", () => {
    render(<SkillsSection skills={mockSkills} />);

    // Frontend skills
    expect(screen.getByText("React.js")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();

    // Backend skills
    expect(screen.getByText("Node.js")).toBeInTheDocument();
    expect(screen.getByText("Python")).toBeInTheDocument();

    // Tools
    expect(screen.getByText("Git")).toBeInTheDocument();
    expect(screen.getByText("Vite")).toBeInTheDocument();
  });

  it("handles missing skills data gracefully", () => {
    render(<SkillsSection />);
    expect(screen.getByText("Technical Skills")).toBeInTheDocument();
    // Should not crash, just not render any categories
  });

  it("handles empty skill categories", () => {
    const emptySkills = {
      frontend: [],
      backend: [],
      tools: [],
      database: [],
      cloud: [],
      mobile: [],
      architecture: [],
      business: [],
      security: [],
      leadership: [],
    };

    render(<SkillsSection skills={emptySkills} />);
    expect(screen.getByText("Technical Skills")).toBeInTheDocument();
    // Categories with no skills should not be rendered
    expect(screen.queryByText("Frontend")).not.toBeInTheDocument();
  });

  it("only renders categories that have skills", () => {
    const partialSkills = {
      frontend: [{ name: "React.js", level: 95, category: "framework" }],
      backend: [],
      tools: [],
      database: [],
      cloud: [],
      mobile: [],
      architecture: [],
      business: [],
      security: [],
      leadership: [],
    };

    render(<SkillsSection skills={partialSkills} />);

    expect(screen.getByText("Frontend")).toBeInTheDocument();
    expect(screen.queryByText("Backend")).not.toBeInTheDocument();
    expect(screen.queryByText("Tools & Technologies")).not.toBeInTheDocument();
  });

  it("has responsive grid structure", () => {
    const { container } = render(<SkillsSection skills={mockSkills} />);
    const gridContainers = container.querySelectorAll(
      "[class*='MuiGrid-container'], [class*='MuiGrid-root']"
    );
    expect(gridContainers.length).toBeGreaterThan(0);
  });

  it("renders skill chips as MUI Chip components", () => {
    const { container } = render(<SkillsSection skills={mockSkills} />);
    const chips = container.querySelectorAll("[class*='MuiChip']");
    expect(chips.length).toBeGreaterThan(0);
  });
});
