/**
 * @module pages/home/components/CallToActionSection
 * @description
 * Main call-to-action section orchestrator for homepage.
 * Composes heading, description, and CTAButtons with parallax background.
 * Features theme-aware styling and Framer Motion animations.
 *
 * @example
 * ```tsx
 * import { CallToActionSection } from './components/CallToActionSection';
 *
 * <CallToActionSection
 *   background={backgroundGradient}
 *   email="victor.williams.dev@gmail.com"
 * />
 * ```
 */

import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";

import type { CallToActionSectionProps } from "./types";
import { CTAButtons } from "./CTAButtons";
import { containerVariants, itemVariants } from "./animations";

/**
 * CallToActionSection Component
 *
 * Main call-to-action section that orchestrates heading, description, and action buttons.
 * Features parallax background matching hero section for visual consistency.
 *
 * Features:
 * - Parallax background with multiple layers
 * - Theme-aware shadow and overlay styling
 * - Decorative edge glow effects
 * - Staggered entrance animations
 * - Responsive typography and spacing
 *
 * @component
 * @param {CallToActionSectionProps} props - Component props
 * @param {string} props.background - Background CSS string with gradient and images
 * @param {string} [props.email] - Email address for contact button
 * @returns {JSX.Element} Rendered call-to-action section
 *
 * @example
 * ```tsx
 * const background = 'linear-gradient(...), url(...), url(...)';
 * <CallToActionSection
 *   background={background}
 *   email="hello@example.com"
 * />
 * ```
 */
export const CallToActionSection: React.FC<CallToActionSectionProps> = ({
  background,
  email,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        textAlign: "center",
        py: 8,
        px: 4,
        mt: 10,
        position: "relative",
        overflow: "hidden",
        borderRadius: 4,
        background,
        backgroundSize: "cover, cover, cover",
        backgroundPosition: "center, center, center",
        backgroundRepeat: "no-repeat, no-repeat, no-repeat",
        backgroundAttachment: { xs: "scroll", md: "fixed" },
        boxShadow:
          theme.palette.mode === "dark"
            ? `0 10px 40px ${theme.palette.primary.main}30`
            : `0 10px 40px ${theme.palette.primary.main}25`,
        // Layer a subtle translucent surface for text legibility
        "&::before": {
          content: "\"\"",
          position: "absolute",
          inset: 0,
          background:
            theme.palette.mode === "dark"
              ? "rgba(10,10,20,0.45)"
              : "rgba(255,255,255,0.55)",
          backdropFilter: "blur(4px)",
        },
        // Decorative edge glow
        "&::after": {
          content: "\"\"",
          position: "absolute",
          inset: 0,
          boxShadow:
            theme.palette.mode === "dark"
              ? `0 0 0 2px ${theme.palette.primary.main}40 inset, 0 0 30px ${theme.palette.secondary.main}30 inset`
              : `0 0 0 2px ${theme.palette.primary.main}25 inset, 0 0 20px ${theme.palette.secondary.main}20 inset`,
          pointerEvents: "none",
        },
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Typography
            variant="h4"
            component="h4"
            sx={{
              fontSize: { xs: "1.3rem", md: "1.8rem" },
              fontWeight: 600,
              mb: 2,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              position: "relative",
              zIndex: 1,
            }}
          >
            Ready to build something amazing together?
          </Typography>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "1rem", md: "1.2rem" },
              color: theme.palette.text.secondary,
              mb: 3,
              position: "relative",
              zIndex: 1,
              lineHeight: 1.6,
            }}
          >
            Check out my projects or get in touch to discuss your next idea.
          </Typography>
        </motion.div>

        <motion.div variants={itemVariants}>
          <CTAButtons email={email} />
        </motion.div>
      </motion.div>
    </Box>
  );
};
