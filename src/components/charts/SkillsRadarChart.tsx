/**
 * SkillsRadarChart displays technical skill proficiency in radar/spider chart format
 *
 * Features:
 * - Radar visualization showing skill levels across multiple dimensions
 * - Custom tooltip with skill name and proficiency percentage
 * - Themed styling with configurable colors
 * - Responsive container adapting to screen size
 * - Default data for 8 technical skill categories
 *
 * The radar chart provides an intuitive visual representation of skill balance,
 * making it easy to identify strengths and areas for development.
 *
 * @component
 */
import React from "react";
import { Box, Typography, useTheme, alpha } from "@mui/material";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

/**
 * SkillData interface for individual skill entries
 */
interface SkillData {
  /** Skill name/label (e.g., "React/TypeScript") */
  skill: string;
  /** Proficiency level (0-100) */
  proficiency: number;
  /** Maximum value for scale (typically 100) */
  fullMark: number;
}

/**
 * Props for SkillsRadarChart component
 */
interface SkillsRadarChartProps {
  /** Chart title (default: "Technical Skills Proficiency") */
  title?: string;
  /** Array of skill data (uses defaults if not provided) */
  data?: SkillData[];
}

const defaultSkillsData: SkillData[] = [
  { skill: "React/TypeScript", proficiency: 95, fullMark: 100 },
  { skill: "Node.js", proficiency: 90, fullMark: 100 },
  { skill: "Cloud/AWS", proficiency: 85, fullMark: 100 },
  { skill: "PostgreSQL", proficiency: 88, fullMark: 100 },
  { skill: "GraphQL", proficiency: 82, fullMark: 100 },
  { skill: "Docker/K8s", proficiency: 80, fullMark: 100 },
  { skill: "CI/CD", proficiency: 87, fullMark: 100 },
  { skill: "System Design", proficiency: 85, fullMark: 100 },
];

/**
 * SkillsRadarChart component renders a radar chart visualization
 *
 * @param title - Chart title
 * @param data - Skill proficiency data (defaults to 8 technical skills)
 *
 * @example
 * ```tsx
 * <SkillsRadarChart
 *   title="My Technical Skills"
 *   data={[
 *     { skill: "React", proficiency: 95, fullMark: 100 },
 *     { skill: "Node.js", proficiency: 90, fullMark: 100 }
 *   ]}
 * />
 * ```
 */
const SkillsRadarChart: React.FC<SkillsRadarChartProps> = ({
  title = "Technical Skills Proficiency",
  data = defaultSkillsData,
}) => {
  const theme = useTheme();

  /**
   * TooltipProps interface for Recharts tooltip
   */
  interface TooltipProps {
    active?: boolean;
    payload?: Array<{
      payload: SkillData;
      value: number;
    }>;
  }

  /**
   * CustomTooltip displays skill proficiency on hover
   * @param active - Whether tooltip is active
   * @param payload - Data payload from chart
   */
  const CustomTooltip = ({ active, payload }: TooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            bgcolor: alpha(theme.palette.background.paper, 0.95),
            p: 1.5,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
            boxShadow: 3,
          }}
        >
          <Typography variant="body2" fontWeight={600}>
            {payload[0].payload.skill}
          </Typography>
          <Typography variant="body2" color="primary">
            Proficiency: {payload[0].value}%
          </Typography>
        </Box>
      );
    }
    return null;
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} gutterBottom textAlign="center">
        {title}
      </Typography>
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart data={data}>
          <PolarGrid
            stroke={theme.palette.divider}
            strokeDasharray="3 3"
          />
          <PolarAngleAxis
            dataKey="skill"
            tick={{
              fill: theme.palette.text.primary,
              fontSize: 12,
            }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{
              fill: theme.palette.text.secondary,
              fontSize: 10,
            }}
          />
          <Radar
            name="Proficiency"
            dataKey="proficiency"
            stroke={theme.palette.primary.main}
            fill={theme.palette.primary.main}
            fillOpacity={0.6}
            strokeWidth={2}
          />
          <Tooltip content={<CustomTooltip />} />
        </RadarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default SkillsRadarChart;
