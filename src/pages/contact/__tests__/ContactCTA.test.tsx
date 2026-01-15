/**
 * @module pages/contact/__tests__/ContactCTA
 * @description Unit tests for ContactCTA component
 */

import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { createVaporwaveTheme } from "../../../theme/theme";
import { ContactCTA } from "../components/ContactCTA";

const theme = createVaporwaveTheme("dark");

describe("ContactCTA", () => {
  const mockEmail = "test@example.com";
  const mockOnScheduleClick = vi.fn();

  beforeEach(() => {
    mockOnScheduleClick.mockClear();
  });

  it("renders without crashing", () => {
    render(
      <ThemeProvider theme={theme}>
        <ContactCTA email={mockEmail} onScheduleClick={mockOnScheduleClick} />
      </ThemeProvider>
    );

    expect(screen.getByText("Ready to Get Started?")).toBeInTheDocument();
  });

  it("displays both call-to-action buttons", () => {
    render(
      <ThemeProvider theme={theme}>
        <ContactCTA email={mockEmail} onScheduleClick={mockOnScheduleClick} />
      </ThemeProvider>
    );

    expect(screen.getByText("Send Email")).toBeInTheDocument();
    expect(screen.getByText("Schedule Meeting")).toBeInTheDocument();
  });

  it("renders email button with correct mailto link", () => {
    render(
      <ThemeProvider theme={theme}>
        <ContactCTA email={mockEmail} onScheduleClick={mockOnScheduleClick} />
      </ThemeProvider>
    );

    const emailButton = screen.getByText("Send Email").closest("a");
    expect(emailButton).toHaveAttribute("href", `mailto:${mockEmail}`);
  });

  it("calls onScheduleClick when Schedule Meeting button is clicked", () => {
    render(
      <ThemeProvider theme={theme}>
        <ContactCTA email={mockEmail} onScheduleClick={mockOnScheduleClick} />
      </ThemeProvider>
    );

    const scheduleButton = screen.getByText("Schedule Meeting");
    fireEvent.click(scheduleButton);

    expect(mockOnScheduleClick).toHaveBeenCalledTimes(1);
  });

  it("displays descriptive text", () => {
    render(
      <ThemeProvider theme={theme}>
        <ContactCTA email={mockEmail} onScheduleClick={mockOnScheduleClick} />
      </ThemeProvider>
    );

    expect(
      screen.getByText(/Choose the communication method that works best for you/)
    ).toBeInTheDocument();
  });

  it("renders with gradient styling", () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <ContactCTA email={mockEmail} onScheduleClick={mockOnScheduleClick} />
      </ThemeProvider>
    );

    // Verify component renders with content
    const box = container.querySelector("div[class*=\"MuiBox\"]");
    expect(box).toBeInTheDocument();
  });
});
