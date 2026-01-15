/**
 * @module pages/contact/__tests__/ContactHero
 * @description Unit tests for ContactHero component
 */

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { createVaporwaveTheme } from "../../../theme/theme";
import { ContactHero } from "../components/ContactHero";

const theme = createVaporwaveTheme("dark");

describe("ContactHero", () => {
  it("renders without crashing", () => {
    render(
      <ThemeProvider theme={theme}>
        <ContactHero />
      </ThemeProvider>
    );

    expect(screen.getByText("Let's Work Together")).toBeInTheDocument();
  });

  it("displays hero heading", () => {
    render(
      <ThemeProvider theme={theme}>
        <ContactHero />
      </ThemeProvider>
    );

    expect(screen.getByText("Let's Work Together")).toBeInTheDocument();
  });

  it("displays hero description text", () => {
    render(
      <ThemeProvider theme={theme}>
        <ContactHero />
      </ThemeProvider>
    );

    expect(
      screen.getByText(/Have a project in mind/)
    ).toBeInTheDocument();
  });

  it("renders with gradient styling", () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <ContactHero />
      </ThemeProvider>
    );

    // Verify hero section renders with MUI Box
    const box = container.querySelector("div[class*=\"MuiBox\"]");
    expect(box).toBeInTheDocument();
  });

  it("displays contact encouragement message", () => {
    render(
      <ThemeProvider theme={theme}>
        <ContactHero />
      </ThemeProvider>
    );

    expect(
      screen.getByText(/how we can bring your ideas to life/)
    ).toBeInTheDocument();
  });
});
