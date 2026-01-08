/**
 * SkillsSection Component
 * Displays technical skills organized by category (Frontend, Backend, Tools)
 * @module pages/home/components/SkillsSection
 */

import React from "react";
import { Box, Typography, Grid, Chip } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface Skill {
  name: string;
  category?: string;
}

interface SkillsData {
  frontend: Skill[];
  backend: Skill[];
  tools: Skill[];
}

interface SkillsSectionProps {
  /** Skills data organized by category */
  skills?: SkillsData;
}

/**
 * SkillCategory displays a single category of skills with chips
 */
const SkillCategory: React.FC<{
  title: string;
  skills: Skill[];
}> = ({ title, skills }) => {
  const theme = useTheme();

  return (
    <Grid item xs={12} md={4}>
      <Typography
        variant="h4"
        component="h4"
        sx={{
          fontSize: "1.3rem",
          fontWeight: 500,
          mb: 2,
          color: theme.palette.primary.main,
        }}
      >
        {title}
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {skills.map((skill, index) => (
          <Chip
            key={index}
            label={skill.name}
            variant="outlined"
            sx={{
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              "&:hover": {
                backgroundColor: theme.palette.primary.light,
                color: theme.palette.primary.contrastText,
              },
            }}
          />
        ))}
      </Box>
    </Grid>
  );
};

/**
 * SkillsSection displays technical skills in a three-column grid
 *
 * @param props - Component props
 * @param props.skills - Optional skills data; defaults to empty arrays if not provided
 * @returns Skills section component
 */
const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  return (
    <Box sx={{ mb: 6 }}>
      <Typography
        variant="h3"
        component="h3"
        sx={{
          fontSize: "2rem",
          fontWeight: 600,
          mb: 3,
          textAlign: "center",
        }}
      >
        Technical Skills
      </Typography>

      <Grid container spacing={3}>
        <SkillCategory
          title="Frontend"
          skills={skills?.frontend || []}
        />
        <SkillCategory
          title="Backend"
          skills={skills?.backend || []}
        />
        <SkillCategory
          title="Tools & Technologies"
          skills={skills?.tools || []}
        />
      </Grid>
    </Box>
  );
};

export default SkillsSection;
