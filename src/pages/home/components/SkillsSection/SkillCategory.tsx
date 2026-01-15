/**
 * @module pages/home/components/SkillsSection/SkillCategory
 * @description
 * Skill category display component with title and skill chips.
 * Groups related skills under a category heading with responsive grid layout.
 *
 * @example
 * ```tsx
 * <SkillCategory
 *   title="Frontend"
 *   skills={[
 *     { name: "React.js", level: 95, category: "framework" },
 *     { name: "TypeScript", level: 92, category: "language" }
 *   ]}
 * />
 * ```
 */

import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";

import type { SkillCategoryProps } from "./types";
import { SkillChip } from "./SkillChip";
import { itemVariants } from "./animations";

/**
 * SkillCategory Component
 *
 * Displays a category of skills with a title and grid of skill chips.
 * Features responsive layout and staggered chip animations.
 *
 * Features:
 * - Theme-aware category title styling
 * - Flexible grid layout for skill chips
 * - Staggered entrance animations
 * - Responsive spacing and typography
 *
 * @component
 * @param {SkillCategoryProps} props - Component props
 * @param {string} props.title - Category display title
 * @param {Skill[]} props.skills - Array of skills in this category
 * @returns {JSX.Element} Rendered skill category section
 *
 * @example
 * ```tsx
 * const frontendSkills = [
 *   { name: "React.js", level: 95, category: "framework" },
 *   { name: "TypeScript", level: 92, category: "language" }
 * ];
 * <SkillCategory title="Frontend" skills={frontendSkills} />
 * ```
 */
export const SkillCategory: React.FC<SkillCategoryProps> = ({
  title,
  skills,
}) => {
  const theme = useTheme();

  return (
    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
      <motion.div variants={itemVariants}>
        <Typography
          variant="h4"
          component="h4"
          sx={{
            fontSize: { xs: "1.2rem", md: "1.3rem" },
            fontWeight: 500,
            mb: 2,
            color: theme.palette.primary.main,
          }}
        >
          {title}
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {skills.map((skill, index) => (
            <SkillChip key={skill.name} name={skill.name} index={index} />
          ))}
        </Box>
      </motion.div>
    </Grid>
  );
};
