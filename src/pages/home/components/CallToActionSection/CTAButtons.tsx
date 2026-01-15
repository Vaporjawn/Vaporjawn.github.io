/**
 * @module pages/home/components/CallToActionSection/CTAButtons
 * @description
 * Button group component for CallToActionSection.
 * Manages layout and configuration of Projects and Contact action buttons.
 *
 * @example
 * ```tsx
 * import { CTAButtons } from './CTAButtons';
 *
 * <CTAButtons email="hello@example.com" />
 * ```
 */

import React from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";

import type { CTAButtonsProps } from "./types";
import { CTAButton } from "./CTAButton";
import { containerVariants } from "./animations";

/**
 * CTAButtons Component
 *
 * Renders a group of call-to-action buttons with responsive flexbox layout.
 * Contains buttons for viewing projects and contacting via email.
 *
 * Features:
 * - Responsive layout (stacked on mobile, row on desktop)
 * - Staggered entrance animations
 * - Proper navigation handling
 * - Theme-aware styling
 *
 * @component
 * @param {CTAButtonsProps} props - Component props
 * @param {string} [props.email] - Email address for contact button
 * @returns {JSX.Element} Rendered button group
 *
 * @example
 * ```tsx
 * <CTAButtons email="victor.williams.dev@gmail.com" />
 * ```
 */
export const CTAButtons: React.FC<CTAButtonsProps> = ({ email }) => {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <CTAButton
          label="View My Projects"
          variant="contained"
          to="/projects"
        />

        <CTAButton
          label="Get In Touch"
          variant="outlined"
          href={`mailto:${email || ""}`}
        />
      </Box>
    </motion.div>
  );
};
