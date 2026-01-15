/**
 * @module pages/home/components/SkillsSection
 * @description
 * Main skills section orchestrator for homepage.
 * Displays all skill categories in responsive grid with animations.
 * Features comprehensive skill taxonomy across 10 categories.
 *
 * @example
 * ```tsx
 * import { SkillsSection } from './components/SkillsSection';
 * import { useSkills } from '../../hooks/usePortfolioData';
 *
 * const skills = useSkills();
 * <SkillsSection skills={skills} />
 * ```
 */

import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { motion } from "framer-motion";

import type { SkillsSectionProps } from "./types";
import { SkillCategory } from "./SkillCategory";
import { containerVariants } from "./animations";

/**
 * SkillsSection Component
 *
 * Main orchestrator component that displays all skill categories in a responsive grid.
 * Showcases comprehensive technical expertise across frontend, backend, cloud, and more.
 *
 * Features:
 * - Displays all 10 skill categories (frontend, backend, tools, database, cloud, mobile, architecture, business, security, leadership)
 * - Responsive grid layout (4 columns desktop, 2 columns tablet, 1 column mobile)
 * - Staggered entrance animations for categories
 * - Theme-aware styling
 * - Graceful handling of missing data
 *
 * @component
 * @param {SkillsSectionProps} props - Component props
 * @param {SkillsData} [props.skills] - Skills data organized by category
 * @returns {JSX.Element} Rendered skills section
 *
 * @example
 * ```tsx
 * const skills = useSkills();
 * <SkillsSection skills={skills} />
 * ```
 */
export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  // Define all skill categories to display
  const categories = [
    { key: "frontend", title: "Frontend" },
    { key: "backend", title: "Backend" },
    { key: "tools", title: "Tools & Technologies" },
    { key: "database", title: "Database" },
    { key: "cloud", title: "Cloud & DevOps" },
    { key: "mobile", title: "Mobile" },
    { key: "architecture", title: "Architecture" },
    { key: "business", title: "Business" },
    { key: "security", title: "Security" },
    { key: "leadership", title: "Leadership" },
  ] as const;

  return (
    <Box sx={{ mb: 6 }}>
      <Typography
        variant="h3"
        component="h3"
        sx={{
          fontSize: { xs: "1.8rem", md: "2rem" },
          fontWeight: 600,
          mb: 4,
          textAlign: "center",
        }}
      >
        Technical Skills
      </Typography>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Grid container spacing={3}>
          {categories.map(({ key, title }) => {
            const categorySkills = skills?.[key as keyof typeof skills] || [];
            // Only render categories that have skills
            if (categorySkills.length === 0) return null;

            return (
              <SkillCategory
                key={key}
                title={title}
                skills={categorySkills}
              />
            );
          })}
        </Grid>
      </motion.div>
    </Box>
  );
};
