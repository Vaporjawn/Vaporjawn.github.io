/**
 * @module pages/home/utils/__tests__/backgroundUtils.test
 * @description
 * Test suite for parallax background utility functions.
 * Validates background generation, theme awareness, and memoization.
 */

import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import type { ReactNode } from "react";
import {
  createParallaxBackground,
  useParallaxBackground,
  DEFAULT_SKYLINE_PATH,
} from "../backgroundUtils";

describe("createParallaxBackground", () => {
  const mockConfig = {
    isDark: true,
    primaryColor: "#1976d2",
    bannerImage: "/path/to/banner.jpg",
  };

  it("generates background with gradient and banner", () => {
    const result = createParallaxBackground(mockConfig);

    expect(result).toContain("linear-gradient");
    expect(result).toContain("url(/path/to/banner.jpg)");
    expect(result).toContain("#1976d220"); // Primary color with opacity
  });

  it("generates dark mode gradient overlay", () => {
    const result = createParallaxBackground({
      ...mockConfig,
      isDark: true,
    });

    expect(result).toContain("rgba(8,8,18,0.55)");
    expect(result).toContain("rgba(18,0,36,0.65)");
  });

  it("generates light mode gradient overlay", () => {
    const result = createParallaxBackground({
      ...mockConfig,
      isDark: false,
    });

    expect(result).toContain("rgba(255,255,255,0.62)");
    expect(result).toContain("rgba(250,250,255,0.70)");
  });

  it("includes skyline layer when provided", () => {
    const result = createParallaxBackground({
      ...mockConfig,
      skylinePath: "/philadelphia-skyline.jpg",
    });

    expect(result).toContain("url(/philadelphia-skyline.jpg)");
    expect(result).toContain("url(/path/to/banner.jpg)");
  });

  it("works without skyline layer", () => {
    const result = createParallaxBackground(mockConfig);

    expect(result).not.toContain("skyline");
    expect(result).toContain("url(/path/to/banner.jpg)");
  });

  it("layers gradient, skyline, and banner in correct order", () => {
    const result = createParallaxBackground({
      ...mockConfig,
      skylinePath: "/skyline.jpg",
    });

    // Gradient should come first, then skyline, then banner
    const gradientIndex = result.indexOf("linear-gradient");
    const skylineIndex = result.indexOf("url(/skyline.jpg)");
    const bannerIndex = result.indexOf("url(/path/to/banner.jpg)");

    expect(gradientIndex).toBeLessThan(skylineIndex);
    expect(skylineIndex).toBeLessThan(bannerIndex);
  });

  it("incorporates primary color into gradient", () => {
    const customColor = "#ff5722";
    const result = createParallaxBackground({
      ...mockConfig,
      primaryColor: customColor,
    });

    expect(result).toContain(`${customColor}20`);
  });
});

describe("useParallaxBackground", () => {
  it("generates background based on theme mode", () => {
    const darkTheme = createTheme({ palette: { mode: "dark" } });

    const wrapper = ({ children }: { children: ReactNode }) => (
      <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>
    );

    const { result } = renderHook(
      () =>
        useParallaxBackground({
          primaryColor: "#1976d2",
          bannerImage: "/banner.jpg",
        }),
      { wrapper }
    );

    expect(result.current).toContain("rgba(8,8,18,0.55)"); // Dark mode gradient
  });

  it("responds to theme changes", () => {
    const darkTheme = createTheme({ palette: { mode: "dark" } });
    const lightTheme = createTheme({ palette: { mode: "light" } });

    const darkWrapper = ({ children }: { children: ReactNode }) => (
      <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>
    );

    const { result } = renderHook(
      () =>
        useParallaxBackground({
          primaryColor: "#1976d2",
          bannerImage: "/banner.jpg",
        }),
      { wrapper: darkWrapper }
    );

    expect(result.current).toContain("rgba(8,8,18,0.55)");

    // Rerender with light theme
    const lightWrapper = ({ children }: { children: ReactNode }) => (
      <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>
    );

    const { result: lightResult } = renderHook(
      () =>
        useParallaxBackground({
          primaryColor: "#1976d2",
          bannerImage: "/banner.jpg",
        }),
      { wrapper: lightWrapper }
    );

    expect(lightResult.current).toContain("rgba(255,255,255,0.62)");
  });

  it("includes skyline when path provided", () => {
    const darkTheme = createTheme({ palette: { mode: "dark" } });

    const wrapper = ({ children }: { children: ReactNode }) => (
      <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>
    );

    const { result } = renderHook(
      () =>
        useParallaxBackground({
          primaryColor: "#1976d2",
          skylinePath: DEFAULT_SKYLINE_PATH,
          bannerImage: "/banner.jpg",
        }),
      { wrapper }
    );

    expect(result.current).toContain(DEFAULT_SKYLINE_PATH);
  });

  it("omits skyline when path not provided", () => {
    const darkTheme = createTheme({ palette: { mode: "dark" } });

    const wrapper = ({ children }: { children: ReactNode }) => (
      <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>
    );

    const { result } = renderHook(
      () =>
        useParallaxBackground({
          primaryColor: "#1976d2",
          bannerImage: "/banner.jpg",
        }),
      { wrapper }
    );

    expect(result.current).not.toContain("skyline");
  });
});

describe("DEFAULT_SKYLINE_PATH", () => {
  it("exports correct default path", () => {
    expect(DEFAULT_SKYLINE_PATH).toBe("/philadelphia-skyline.jpg");
  });
});
