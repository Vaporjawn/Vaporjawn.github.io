/**
 * @module pages/home/utils/backgroundUtils
 * @description
 * Utility functions for generating parallax background effects on homepage.
 * Provides consistent background styling across HeroSection and CallToActionSection.
 *
 * @example
 * ```tsx
 * import { createParallaxBackground } from './utils/backgroundUtils';
 *
 * const background = createParallaxBackground({
 *   isDark: true,
 *   primaryColor: theme.palette.primary.main,
 *   skylinePath: '/philadelphia-skyline.jpg',
 *   bannerImage: heroBanner
 * });
 * ```
 */

/**
 * Configuration for parallax background generation
 */
export interface ParallaxBackgroundConfig {
  /** Whether dark mode is active */
  isDark: boolean;
  /** Primary theme color for gradient overlay */
  primaryColor: string;
  /** Path to skyline background image (optional) */
  skylinePath?: string;
  /** Path to banner background image */
  bannerImage: string;
}

/**
 * Creates a multi-layer parallax background with gradient overlay
 *
 * Generates CSS background string with:
 * - Gradient overlay (light or dark mode)
 * - Optional skyline image layer
 * - Banner image as base layer
 *
 * Supports seamless theme transitions and consistent visual identity
 * across hero and call-to-action sections.
 *
 * @param config - Background configuration object
 * @returns CSS background string with layered images
 *
 * @example
 * ```tsx
 * // Dark mode with skyline
 * const darkBg = createParallaxBackground({
 *   isDark: true,
 *   primaryColor: '#1976d2',
 *   skylinePath: '/skyline.jpg',
 *   bannerImage: banner
 * });
 *
 * // Light mode without skyline
 * const lightBg = createParallaxBackground({
 *   isDark: false,
 *   primaryColor: '#1976d2',
 *   bannerImage: banner
 * });
 * ```
 */
export const createParallaxBackground = ({
  isDark,
  primaryColor,
  skylinePath,
  bannerImage,
}: ParallaxBackgroundConfig): string => {
  // Build gradient overlay based on theme mode
  const gradientOverlay = isDark
    ? `linear-gradient(135deg, rgba(8,8,18,0.55) 0%, rgba(18,0,36,0.65) 55%, ${primaryColor}20 100%)`
    : `linear-gradient(135deg, rgba(255,255,255,0.62) 0%, rgba(250,250,255,0.70) 55%, ${primaryColor}15 100%)`;

  // Build image layers array
  const imageLayers: string[] = [];

  // Add skyline if provided
  if (skylinePath) {
    imageLayers.push(`url(${skylinePath})`);
  }

  // Always add banner as base layer
  imageLayers.push(`url(${bannerImage})`);

  // Combine gradient with image layers
  return [gradientOverlay, ...imageLayers].join(", ");
};

/**
 * Default Philadelphia skyline path
 * Place file in public/ directory to activate skyline layer
 */
export const DEFAULT_SKYLINE_PATH = "/philadelphia-skyline.jpg";

/**
 * Hook for creating parallax backgrounds with theme awareness
 *
 * Provides memoized background generation that automatically responds
 * to theme changes while maintaining performance optimization.
 *
 * @param config - Background configuration (without isDark, derived from theme)
 * @returns Memoized CSS background string
 *
 * @example
 * ```tsx
 * import { useParallaxBackground } from './utils/backgroundUtils';
 *
 * const MyComponent = () => {
 *   const background = useParallaxBackground({
 *     bannerImage: heroBanner,
 *     skylinePath: DEFAULT_SKYLINE_PATH
 *   });
 *
 *   return <Box sx={{ background }} />;
 * };
 * ```
 */
import { useMemo } from "react";
import { useTheme } from "@mui/material/styles";

export const useParallaxBackground = (
  config: Omit<ParallaxBackgroundConfig, "isDark">
): string => {
  const theme = useTheme();

  return useMemo(
    () =>
      createParallaxBackground({
        ...config,
        isDark: theme.palette.mode === "dark",
      }),
    [config.primaryColor, config.skylinePath, config.bannerImage, theme.palette.mode]
  );
};
