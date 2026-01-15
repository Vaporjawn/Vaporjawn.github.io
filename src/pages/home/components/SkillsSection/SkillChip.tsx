/**
 * @module pages/home/components/SkillsSection/SkillChip
 * @description
 * Individual skill chip component with hover animations.
 * Displays a single skill as an outlined chip with theme-aware styling.
 *
 * @example
 * ```tsx
 * <SkillChip name="React.js" index={0} />
 * ```
 */

import React from "react";
import { Chip } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";

import type { SkillChipProps } from "./types";
import { chipVariants } from "./animations";

/**
 * SkillChip Component
 *
 * Displays an individual skill as a themed chip with hover effects.
 * Features smooth entrance animation and interactive hover state.
 *
 * Features:
 * - Theme-aware border and text colors
 * - Hover state with background color transition
 * - Framer Motion entrance animation
 * - Responsive sizing
 *
 * @component
 * @param {SkillChipProps} props - Component props
 * @param {string} props.name - Skill name to display
 * @param {number} [props.index] - Optional index for animation delay
 * @returns {JSX.Element} Rendered skill chip
 *
 * @example
 * ```tsx
 * <SkillChip name="TypeScript" index={0} />
 * <SkillChip name="Node.js" index={1} />
 * ```
 */
export const SkillChip: React.FC<SkillChipProps> = ({ name, index = 0 }) => {
  const theme = useTheme();

  return (
    <motion.div
      variants={chipVariants}
      custom={index}
      initial="hidden"
      animate="visible"
      transition={{ delay: index * 0.03 }}
    >
      <Chip
        label={name}
        variant="outlined"
        sx={{
          borderColor: theme.palette.primary.main,
          color: theme.palette.primary.main,
          fontSize: { xs: "0.875rem", md: "1rem" },
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.contrastText,
            transform: "translateY(-2px)",
            boxShadow: `0 4px 12px ${theme.palette.primary.main}40`,
          },
        }}
      />
    </motion.div>
  );
};
