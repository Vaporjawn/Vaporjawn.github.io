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

interface SkillData {
  skill: string;
  proficiency: number;
  fullMark: number;
}

interface SkillsRadarChartProps {
  title?: string;
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

const SkillsRadarChart: React.FC<SkillsRadarChartProps> = ({
  title = "Technical Skills Proficiency",
  data = defaultSkillsData,
}) => {
  const theme = useTheme();

  interface TooltipProps {
    active?: boolean;
    payload?: Array<{
      payload: SkillData;
      value: number;
    }>;
  }

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
