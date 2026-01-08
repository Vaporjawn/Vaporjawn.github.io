/**
 * TimelineItem component renders individual career timeline entries
 *
 * Features:
 * - Icon-based type indicators (work, education, achievement)
 * - Themed color-coded borders and icons
 * - Technology chip display
 * - Hover animations with smooth transitions
 * - Framer Motion scroll animations
 * - Glassmorphism effect with backdrop blur
 *
 * @component
 */
import React from "react";
import { Box, Typography, Paper, useTheme, alpha, Chip } from "@mui/material";
import { motion } from "framer-motion";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

interface TimelineItemProps {
  /** Unique identifier for the timeline event */
  id: string;
  /** Display date or date range */
  date: string;
  /** Event title (job position, degree, achievement name) */
  title: string;
  /** Organization or institution name */
  organization: string;
  /** Detailed description of the event */
  description: string;
  /** Type of timeline event determining icon and color */
  type: "work" | "education" | "achievement";
  /** Optional array of technology tags to display */
  technologies?: string[];
  /** Animation delay multiplier for staggered entrance */
  delay: number;
}

/**
 * Helper function to get icon based on timeline event type
 * @param type - Timeline event type
 * @returns React icon component
 */
const getIcon = (type: TimelineItemProps["type"]) => {
  switch (type) {
    case "work":
      return <WorkIcon />;
    case "education":
      return <SchoolIcon />;
    case "achievement":
      return <EmojiEventsIcon />;
    default:
      return <WorkIcon />;
  }
};

/**
 * Helper function to get theme color based on timeline event type
 * @param type - Timeline event type
 * @param theme - MUI theme object
 * @returns Hex color string
 */
const getColor = (type: TimelineItemProps["type"], theme: any) => {
  switch (type) {
    case "work":
      return theme.palette.primary.main;
    case "education":
      return theme.palette.secondary.main;
    case "achievement":
      return theme.palette.success.main;
    default:
      return theme.palette.primary.main;
  }
};

/**
 * TimelineItem renders a single career timeline entry with animations
 *
 * @example
 * ```tsx
 * <TimelineItem
 *   id="1"
 *   date="2024 - Present"
 *   title="Senior Developer"
 *   organization="Tech Company"
 *   description="Building scalable applications"
 *   type="work"
 *   technologies={["React", "TypeScript"]}
 *   delay={0}
 * />
 * ```
 */
const TimelineItem: React.FC<TimelineItemProps> = ({
  id,
  date,
  title,
  organization,
  description,
  type,
  technologies,
  delay,
}) => {
  const theme = useTheme();
  const color = getColor(type, theme);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
    >
      <Box sx={{ position: "relative", mb: 4 }}>
        {/* Timeline dot */}
        <Box
          sx={{
            position: "absolute",
            left: { xs: -8, md: 8 },
            top: 8,
            width: 16,
            height: 16,
            borderRadius: "50%",
            bgcolor: color,
            border: `3px solid ${theme.palette.background.default}`,
            zIndex: 1,
          }}
        />

        {/* Content card */}
        <Paper
          sx={{
            ml: { xs: 2, md: 4 },
            p: 3,
            bgcolor: alpha(theme.palette.background.paper, 0.8),
            backdropFilter: "blur(10px)",
            border: `1px solid ${alpha(color, 0.2)}`,
            "&:hover": {
              bgcolor: alpha(theme.palette.background.paper, 0.95),
              borderColor: alpha(color, 0.4),
              transform: "translateX(4px)",
              transition: "all 0.3s ease",
            },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Box sx={{ color: color, mr: 1 }}>
              {getIcon(type)}
            </Box>
            <Typography variant="caption" color="text.secondary" fontWeight={600}>
              {date}
            </Typography>
          </Box>

          <Typography variant="h6" fontWeight={700} gutterBottom>
            {title}
          </Typography>

          <Typography variant="body2" color="primary" gutterBottom>
            {organization}
          </Typography>

          <Typography variant="body2" color="text.secondary" paragraph>
            {description}
          </Typography>

          {technologies && technologies.length > 0 && (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {technologies.map((tech) => (
                <Chip
                  key={tech}
                  label={tech}
                  size="small"
                  sx={{
                    bgcolor: alpha(color, 0.1),
                    color: color,
                    fontSize: "0.75rem",
                  }}
                />
              ))}
            </Box>
          )}
        </Paper>
      </Box>
    </motion.div>
  );
};

export default TimelineItem;
