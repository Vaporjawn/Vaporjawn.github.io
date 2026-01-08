/**
 * CareerTimeline displays chronological career events with visual timeline
 *
 * Features:
 * - Vertical timeline with connecting line
 * - Color-coded event types (work, education, achievement)
 * - Smooth scroll animations with Framer Motion
 * - Integration with PortfolioContext for dynamic data
 * - Responsive layout adapting to screen size
 * - Technology tags for work experiences
 *
 * @component
 */
import React, { useContext } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { PortfolioContext } from "../../contexts/PortfolioContext";
import TimelineItem from "./components/TimelineItem";
import {
  experienceToTimelineEvent,
  type TimelineEvent
} from "./utils/timelineUtils";

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

/**
 * CareerTimeline component renders a visual chronological timeline
 *
 * @param title - Section title (default: "Career Journey")
 * @param events - Optional array of timeline events (uses context or defaults)
 */
const CareerTimeline: React.FC<CareerTimelineProps> = ({
  title = "Career Journey",
  events,
}) => {
  const theme = useTheme();
  const portfolioData = useContext(PortfolioContext);

  // Use provided events, or transform portfolio experience data, or fall back to defaults
  const timelineEvents = events ||
    (portfolioData?.experience
      ? portfolioData.experience.map(experienceToTimelineEvent)
      : defaultEvents);

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

        {timelineEvents.map((event, index) => (
          <TimelineItem
            key={event.id}
            id={event.id}
            date={event.date}
            title={event.title}
            organization={event.organization}
            description={event.description}
            type={event.type}
            technologies={event.technologies}
            delay={index}
          />
        ))}
      </Box>
    </Box>
  );
};

export default CareerTimeline;
