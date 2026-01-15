/**
 * @module pages/home/components/ChartSection
 * @description
 * Reusable wrapper component for homepage chart sections.
 * Provides consistent spacing, layout, and animation for all chart components.
 *
 * @example
 * ```tsx
 * import { ChartSection } from './components/ChartSection';
 * import { SkillsRadarChart } from '../../components/charts';
 *
 * <ChartSection spacing="large">
 *   <SkillsRadarChart />
 * </ChartSection>
 * ```
 */

import React from "react";
import { Box, type SxProps, type Theme } from "@mui/material";

/**
 * Props for ChartSection component
 */
export interface ChartSectionProps {
  /** Chart component(s) to render */
  children: React.ReactNode;

  /** Bottom margin spacing variant */
  spacing?: "small" | "medium" | "large";

  /** Top margin spacing (defaults to match bottom) */
  topSpacing?: "small" | "medium" | "large";

  /** Additional MUI sx props for customization */
  sx?: SxProps<Theme>;

  /** Optional accessibility label for the section */
  ariaLabel?: string;
}

/**
 * Spacing value mapping
 * Maintains consistent spacing scale across all chart sections
 */
const SPACING_MAP = {
  small: 4,
  medium: 6,
  large: 8,
} as const;

/**
 * ChartSection Component
 *
 * Reusable container for chart components on the homepage.
 * Ensures consistent spacing, layout patterns, and accessibility standards
 * across all visualization components.
 *
 * Features:
 * - Consistent spacing scale (small: 4, medium: 6, large: 8)
 * - Customizable top and bottom margins
 * - Optional accessibility labels
 * - Composable with any chart component
 * - Theme-aware styling support via sx prop
 *
 * @component
 * @param {ChartSectionProps} props - Component props
 * @returns {JSX.Element} Wrapped chart section with consistent spacing
 *
 * @example
 * ```tsx
 * // Default spacing (large)
 * <ChartSection>
 *   <SkillsRadarChart />
 * </ChartSection>
 *
 * // Custom spacing
 * <ChartSection spacing="medium" topSpacing="large">
 *   <GitHubStatsChart />
 * </ChartSection>
 *
 * // With accessibility label
 * <ChartSection ariaLabel="Skills proficiency radar visualization">
 *   <SkillsRadarChart />
 * </ChartSection>
 * ```
 */
export const ChartSection: React.FC<ChartSectionProps> = ({
  children,
  spacing = "large",
  topSpacing,
  sx,
  ariaLabel,
}) => {
  const marginBottom = SPACING_MAP[spacing];
  const marginTop = topSpacing ? SPACING_MAP[topSpacing] : marginBottom;

  return (
    <Box
      component="section"
      aria-label={ariaLabel}
      sx={{
        mb: marginBottom,
        mt: marginTop,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};
