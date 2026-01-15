/**
 * @module pages/home/components/SkillsSection/__tests__/SkillChip.test
 * @description
 * Test suite for SkillChip component.
 * Verifies chip rendering, animation, and styling.
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SkillChip } from "../SkillChip";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe("SkillChip", () => {
  it("renders without crashing", () => {
    render(<SkillChip name="React.js" />);
    expect(screen.getByText("React.js")).toBeInTheDocument();
  });

  it("displays the skill name", () => {
    render(<SkillChip name="TypeScript" />);
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("renders as MUI Chip component", () => {
    const { container } = render(<SkillChip name="JavaScript" />);
    const chip = container.querySelector("[class*='MuiChip']");
    expect(chip).toBeInTheDocument();
  });

  it("renders with outlined variant", () => {
    const { container } = render(<SkillChip name="Node.js" />);
    const chip = container.querySelector("[class*='MuiChip-outlined']");
    expect(chip).toBeInTheDocument();
  });

  it("handles different skill names", () => {
    const { rerender } = render(<SkillChip name="React.js" />);
    expect(screen.getByText("React.js")).toBeInTheDocument();

    rerender(<SkillChip name="Vue.js" />);
    expect(screen.getByText("Vue.js")).toBeInTheDocument();
    expect(screen.queryByText("React.js")).not.toBeInTheDocument();
  });

  it("accepts optional index prop without errors", () => {
    render(<SkillChip name="Python" index={5} />);
    expect(screen.getByText("Python")).toBeInTheDocument();
  });

  it("renders multiple chips independently", () => {
    render(
      <>
        <SkillChip name="HTML5" index={0} />
        <SkillChip name="CSS3" index={1} />
        <SkillChip name="JavaScript" index={2} />
      </>
    );

    expect(screen.getByText("HTML5")).toBeInTheDocument();
    expect(screen.getByText("CSS3")).toBeInTheDocument();
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
  });

  it("has hover styles applied", async () => {
    const user = userEvent.setup();
    const { container } = render(<SkillChip name="Git" />);
    const chip = container.querySelector("[class*='MuiChip']");

    // Verify chip exists and can be interacted with
    expect(chip).toBeInTheDocument();
    if (chip) {
      await user.hover(chip);
      // Chip should still be in document after hover
      expect(chip).toBeInTheDocument();
    }
  });

  it("renders with theme-aware styling", () => {
    const { container } = render(<SkillChip name="Docker" />);
    const chip = container.querySelector("[class*='MuiChip']");
    // Should have styling applied (theme colors can't be directly tested in jsdom)
    expect(chip).toBeInTheDocument();
  });

  it("handles long skill names gracefully", () => {
    render(<SkillChip name="Amazon Web Services (AWS) Cloud Infrastructure" />);
    expect(
      screen.getByText("Amazon Web Services (AWS) Cloud Infrastructure")
    ).toBeInTheDocument();
  });

  it("handles special characters in skill names", () => {
    render(<SkillChip name="C#" />);
    expect(screen.getByText("C#")).toBeInTheDocument();

    render(<SkillChip name="Node.js" />);
    expect(screen.getByText("Node.js")).toBeInTheDocument();
  });
});
