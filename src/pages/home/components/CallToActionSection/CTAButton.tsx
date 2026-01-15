/**
 * @module pages/home/components/CallToActionSection/CTAButton
 * @description
 * Individual call-to-action button component with proper navigation handling.
 * Supports both internal React Router navigation and external mailto links.
 *
 * @example
 * ```tsx
 * import { CTAButton } from './CTAButton';
 *
 * // Internal navigation
 * <CTAButton
 *   label="View Projects"
 *   variant="contained"
 *   to="/projects"
 * />
 *
 * // External mailto
 * <CTAButton
 *   label="Get In Touch"
 *   variant="outlined"
 *   href="mailto:hello@example.com"
 * />
 * ```
 */

import React from "react";
import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import type { CTAButtonProps } from "./types";
import { buttonVariants } from "./animations";

/**
 * CTAButton Component
 *
 * Renders a styled call-to-action button with proper navigation handling.
 * Uses React Router's useNavigate for internal routes and href for external links.
 *
 * Features:
 * - Gradient styling for contained variant
 * - Outlined styling for secondary variant
 * - Smooth hover animations
 * - Proper navigation (React Router for internal, href for external)
 * - Framer Motion entrance animation
 *
 * @component
 * @param {CTAButtonProps} props - Component props
 * @param {string} props.label - Button label text
 * @param {"contained" | "outlined"} props.variant - Button style variant
 * @param {string} [props.to] - Internal route path (React Router)
 * @param {string} [props.href] - External href (mailto, http, etc.)
 * @param {() => void} [props.onClick] - Optional custom click handler
 * @returns {JSX.Element} Rendered button component
 *
 * @example
 * ```tsx
 * <CTAButton
 *   label="View My Projects"
 *   variant="contained"
 *   to="/projects"
 * />
 * ```
 */
export const CTAButton: React.FC<CTAButtonProps> = ({
  label,
  variant,
  to,
  href,
  onClick,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();

  /**
   * Handle button click with proper navigation
   * - Internal routes use React Router navigate
   * - External links use window.location
   * - Custom onClick takes precedence if provided
   */
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (to) {
      navigate(to);
    } else if (href) {
      window.location.href = href;
    }
  };

  return (
    <motion.div variants={buttonVariants}>
      <Button
        variant={variant}
        size="large"
        onClick={handleClick}
        sx={{
          ...(variant === "contained" && {
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            borderRadius: 2,
            px: 4,
            py: 1.5,
            fontSize: "1rem",
            fontWeight: 600,
            textTransform: "none",
            boxShadow: `0 4px 20px ${theme.palette.primary.main}30`,
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: `0 8px 30px ${theme.palette.primary.main}40`,
              background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
            },
          }),
          ...(variant === "outlined" && {
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.main,
            borderRadius: 2,
            px: 4,
            py: 1.5,
            fontSize: "1rem",
            fontWeight: 600,
            textTransform: "none",
            borderWidth: 2,
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              borderColor: theme.palette.primary.main,
              backgroundColor: `${theme.palette.primary.main}10`,
              transform: "translateY(-2px)",
              boxShadow: `0 8px 25px ${theme.palette.primary.main}20`,
            },
          }),
        }}
      >
        {label}
      </Button>
    </motion.div>
  );
};
