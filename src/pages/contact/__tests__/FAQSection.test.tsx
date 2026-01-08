/**
 * @module pages/contact/__tests__/FAQSection
 * @description Unit tests for FAQSection component
 */

import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { createVaporwaveTheme } from "../../../theme/theme";
import { FAQSection } from "../components/FAQSection";
import type { FAQ } from "../types";

const theme = createVaporwaveTheme("dark");

const mockFAQs: FAQ[] = [
  {
    question: "What services do you offer?",
    answer: "I offer full-stack web development services including...",
    category: "Services",
  },
  {
    question: "What is your hourly rate?",
    answer: "My rates vary depending on the project scope...",
    category: "Pricing",
  },
  {
    question: "How long does a project take?",
    answer: "Project timelines depend on complexity...",
    category: "Timeline",
  },
];

describe("FAQSection", () => {
  it("renders without crashing", () => {
    render(
      <ThemeProvider theme={theme}>
        <FAQSection faqs={mockFAQs} />
      </ThemeProvider>
    );

    expect(screen.getByText("Frequently Asked Questions")).toBeInTheDocument();
  });

  it("displays all FAQ questions", () => {
    render(
      <ThemeProvider theme={theme}>
        <FAQSection faqs={mockFAQs} />
      </ThemeProvider>
    );

    expect(screen.getByText("What services do you offer?")).toBeInTheDocument();
    expect(screen.getByText("What is your hourly rate?")).toBeInTheDocument();
    expect(screen.getByText("How long does a project take?")).toBeInTheDocument();
  });

  it("expands accordion when question is clicked", () => {
    render(
      <ThemeProvider theme={theme}>
        <FAQSection faqs={mockFAQs} />
      </ThemeProvider>
    );

    const firstQuestion = screen.getByText("What services do you offer?");
    fireEvent.click(firstQuestion);

    // Answer should be visible after clicking
    expect(
      screen.getByText(/I offer full-stack web development services/)
    ).toBeInTheDocument();
  });

  it("displays category chips for each FAQ", () => {
    render(
      <ThemeProvider theme={theme}>
        <FAQSection faqs={mockFAQs} />
      </ThemeProvider>
    );

    expect(screen.getByText("Services")).toBeInTheDocument();
    expect(screen.getByText("Pricing")).toBeInTheDocument();
    expect(screen.getByText("Timeline")).toBeInTheDocument();
  });

  it("renders with correct id for anchor navigation", () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <FAQSection faqs={mockFAQs} />
      </ThemeProvider>
    );

    const section = container.querySelector("#faq");
    expect(section).toBeInTheDocument();
  });

  it("handles empty FAQ array gracefully", () => {
    render(
      <ThemeProvider theme={theme}>
        <FAQSection faqs={[]} />
      </ThemeProvider>
    );

    expect(screen.getByText("Frequently Asked Questions")).toBeInTheDocument();
  });
});
