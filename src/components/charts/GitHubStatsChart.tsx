/**
 * GitHubStatsChart displays comprehensive GitHub activity dashboard
 *
 * Features:
 * - Four stat cards showing stars, forks, repositories, and contribution streak
 * - Line chart visualizing 6-month contribution activity (commits, PRs, issues)
 * - Pie chart showing programming language distribution
 * - Responsive grid layout adapting to screen size
 * - Themed styling with glassmorphism effects
 *
 * @component
 */
import React from "react";
import { Box, Typography, Grid, Paper, useTheme, alpha } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import StarIcon from "@mui/icons-material/Star";
import ForkRightIcon from "@mui/icons-material/ForkRight";
import CodeIcon from "@mui/icons-material/Code";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import StatCard from "./components/StatCard";
import CustomTooltip from "./components/CustomTooltip";

interface LanguageData {
  name: string;
  value: number;
  color: string;
}

interface ContributionData {
  month: string;
  commits: number;
  pullRequests: number;
  issues: number;
}

interface GitHubStatsChartProps {
  title?: string;
  languageData?: LanguageData[];
  contributionData?: ContributionData[];
  stats?: {
    totalStars: number;
    totalForks: number;
    totalRepos: number;
    contributionStreak: number;
  };
}

const defaultLanguageData: LanguageData[] = [
  { name: "TypeScript", value: 45, color: "#3178c6" },
  { name: "JavaScript", value: 30, color: "#f7df1e" },
  { name: "Python", value: 15, color: "#3776ab" },
  { name: "CSS", value: 7, color: "#1572b6" },
  { name: "Other", value: 3, color: "#858585" },
];

const defaultContributionData: ContributionData[] = [
  { month: "Jul", commits: 120, pullRequests: 15, issues: 8 },
  { month: "Aug", commits: 145, pullRequests: 18, issues: 12 },
  { month: "Sep", commits: 165, pullRequests: 22, issues: 10 },
  { month: "Oct", commits: 180, pullRequests: 25, issues: 15 },
  { month: "Nov", commits: 195, pullRequests: 28, issues: 18 },
  { month: "Dec", commits: 210, pullRequests: 30, issues: 20 },
];

const defaultStats = {
  totalStars: 1250,
  totalForks: 320,
  totalRepos: 45,
  contributionStreak: 127,
};

/**
 * GitHubStatsChart component renders comprehensive GitHub activity dashboard
 *
 * @param title - Dashboard title (default: "GitHub Activity Dashboard")
 * @param languageData - Programming language distribution data
 * @param contributionData - Monthly contribution activity data
 * @param stats - GitHub statistics (stars, forks, repos, streak)
 */
const GitHubStatsChart: React.FC<GitHubStatsChartProps> = ({
  title = "GitHub Activity Dashboard",
  languageData = defaultLanguageData,
  contributionData = defaultContributionData,
  stats = defaultStats,
}) => {
  const theme = useTheme();

  // Type definitions for Recharts compatibility
  interface PieChartData {
    name: string;
    value: number;
    color: string;
    [key: string]: string | number; // Index signature for recharts compatibility
  }

  interface PieLabelEntry {
    name?: string;
    percent?: number;
    value?: number;
  }

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} gutterBottom textAlign="center" mb={4}>
        {title}
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={2} mb={4}>
        <Grid item xs={6} md={3}>
          <StatCard
            icon={<StarIcon sx={{ fontSize: 32 }} />}
            label="Total Stars"
            value={stats.totalStars.toLocaleString()}
            color={theme.palette.warning.main}
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <StatCard
            icon={<ForkRightIcon sx={{ fontSize: 32 }} />}
            label="Total Forks"
            value={stats.totalForks.toLocaleString()}
            color={theme.palette.info.main}
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <StatCard
            icon={<CodeIcon sx={{ fontSize: 32 }} />}
            label="Repositories"
            value={stats.totalRepos}
            color={theme.palette.primary.main}
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <StatCard
            icon={<TrendingUpIcon sx={{ fontSize: 32 }} />}
            label="Day Streak"
            value={stats.contributionStreak}
            color={theme.palette.success.main}
          />
        </Grid>
      </Grid>

      {/* Charts Grid */}
      <Grid container spacing={3}>
        {/* Contribution Activity */}
        <Grid item xs={12} md={8}>
          <Paper
            sx={{
              p: 3,
              bgcolor: alpha(theme.palette.background.paper, 0.6),
              backdropFilter: "blur(10px)",
            }}
          >
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Contribution Activity (Last 6 Months)
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={contributionData}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                <XAxis
                  dataKey="month"
                  stroke={theme.palette.text.secondary}
                  style={{ fontSize: 12 }}
                />
                <YAxis stroke={theme.palette.text.secondary} style={{ fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="commits"
                  stroke={theme.palette.primary.main}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  name="Commits"
                />
                <Line
                  type="monotone"
                  dataKey="pullRequests"
                  stroke={theme.palette.secondary.main}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  name="Pull Requests"
                />
                <Line
                  type="monotone"
                  dataKey="issues"
                  stroke={theme.palette.success.main}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  name="Issues"
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Language Distribution */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              bgcolor: alpha(theme.palette.background.paper, 0.6),
              backdropFilter: "blur(10px)",
              height: "100%",
            }}
          >
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Language Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={languageData as unknown as PieChartData[]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry: PieLabelEntry) => {
                    const name = entry.name || "";
                    const percent = entry.percent || 0;
                    return `${name} ${(percent * 100).toFixed(0)}%`;
                  }}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {languageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GitHubStatsChart;
