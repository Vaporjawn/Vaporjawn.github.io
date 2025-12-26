import React from "react";
import {
  Box,
  Typography,
  Paper,
  useTheme,
  alpha,
  Chip,
} from "@mui/material";
import { motion } from "framer-motion";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  organization: string;
  description: string;
  type: "work" | "education" | "achievement";
  technologies?: string[];
}

interface CareerTimelineProps {
  title?: string;
  events?: TimelineEvent[];
}

const defaultEvents: TimelineEvent[] = [
  {
    id: "1",
    date: "2024 - Present",
    title: "Senior Full-Stack Developer",
    organization: "Current Company",
    description: "Leading development of enterprise cloud solutions with React, TypeScript, and AWS.",
    type: "work",
    technologies: ["React", "TypeScript", "AWS", "Node.js", "PostgreSQL"],
  },
  {
    id: "2",
    date: "2022 - 2024",
    title: "Full-Stack Developer",
    organization: "Tech Company",
    description: "Built scalable web applications and microservices architecture.",
    type: "work",
    technologies: ["React", "Node.js", "Docker", "MongoDB"],
  },
  {
    id: "3",
    date: "2021",
    title: "AWS Certified Solutions Architect",
    organization: "Amazon Web Services",
    description: "Achieved professional certification in cloud architecture and best practices.",
    type: "achievement",
  },
  {
    id: "4",
    date: "2018 - 2022",
    title: "Computer Science Degree",
    organization: "University",
    description: "Bachelor of Science in Computer Science with focus on software engineering.",
    type: "education",
  },
];

const CareerTimeline: React.FC<CareerTimelineProps> = ({
  title = "Career Journey",
  events = defaultEvents,
}) => {
  const theme = useTheme();

  const getIcon = (type: TimelineEvent["type"]) => {
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

  const getColor = (type: TimelineEvent["type"]) => {
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

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} gutterBottom textAlign="center" mb={4}>
        {title}
      </Typography>
      <Box sx={{ position: "relative", pl: { xs: 2, md: 4 } }}>
        {/* Timeline line */}
        <Box
          sx={{
            position: "absolute",
            left: { xs: 0, md: 16 },
            top: 0,
            bottom: 0,
            width: 2,
            bgcolor: theme.palette.divider,
          }}
        />

        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
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
                  bgcolor: getColor(event.type),
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
                  border: `1px solid ${alpha(getColor(event.type), 0.2)}`,
                  "&:hover": {
                    bgcolor: alpha(theme.palette.background.paper, 0.95),
                    borderColor: alpha(getColor(event.type), 0.4),
                    transform: "translateX(4px)",
                    transition: "all 0.3s ease",
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Box sx={{ color: getColor(event.type), mr: 1 }}>
                    {getIcon(event.type)}
                  </Box>
                  <Typography variant="caption" color="text.secondary" fontWeight={600}>
                    {event.date}
                  </Typography>
                </Box>

                <Typography variant="h6" fontWeight={700} gutterBottom>
                  {event.title}
                </Typography>

                <Typography variant="body2" color="primary" gutterBottom>
                  {event.organization}
                </Typography>

                <Typography variant="body2" color="text.secondary" paragraph>
                  {event.description}
                </Typography>

                {event.technologies && (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {event.technologies.map((tech) => (
                      <Chip
                        key={tech}
                        label={tech}
                        size="small"
                        sx={{
                          bgcolor: alpha(getColor(event.type), 0.1),
                          color: getColor(event.type),
                          fontSize: "0.75rem",
                        }}
                      />
                    ))}
                  </Box>
                )}
              </Paper>
            </Box>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};

export default CareerTimeline;
