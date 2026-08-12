/**
 * GitHubStatsChart displays a live GitHub repository stats dashboard
 *
 * Features:
 * - Three stat cards showing live total stars, forks, and public repo count
 * - Pie chart showing live programming language distribution across repos
 * - Loading and error states — never silently falls back to fake numbers
 * - Responsive grid layout adapting to screen size
 * - Themed styling with glassmorphism effects
 *
 * Data is expected to come from `useGithubRepos()` (real GitHub REST API,
 * cached with a TTL) via `stats`/`languageData`/`loading`/`error` props —
 * see `homePage.tsx` for the wiring and `utils/githubStatsUtils.ts` for the
 * aggregation logic. The `stats`/`languageData` defaults below only apply
 * when this component is rendered standalone (e.g. in isolation/tests)
 * without those props — they are not what real visitors see.
 *
 * @component
 */
import React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Skeleton,
  Alert,
  useTheme,
  alpha,
} from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import StarIcon from "@mui/icons-material/Star";
import ForkRightIcon from "@mui/icons-material/ForkRight";
import CodeIcon from "@mui/icons-material/Code";
import StatCard from "./components/StatCard";
import type { RepoStats, LanguageSlice } from "./utils/githubStatsUtils";

interface GitHubStatsChartProps {
  title?: string;
  languageData?: LanguageSlice[];
  stats?: RepoStats;
  /** True while the live GitHub data is being fetched */
  loading?: boolean;
  /** Set when the live fetch failed; shown instead of the dashboard, never
   *  papered over with fallback numbers */
  error?: string | null;
}

const defaultLanguageData: LanguageSlice[] = [];

// Stat cards and the Language Distribution card below share this width so
// their left/right edges line up exactly instead of each being centered
// independently at a different width (previously stat cards sat at 9/12
// while the card below sat at 8/12 of the page container, leaving visibly
// mismatched side margins).
const CONTENT_MAX_WIDTH = 720;

const defaultStats: RepoStats = {
  totalStars: 0,
  totalForks: 0,
  totalRepos: 0,
};

interface PieChartData {
  name: string;
  value: number;
  color: string;
  [key: string]: string | number; // Index signature for recharts compatibility
}

/**
 * GitHubStatsChart component renders a live GitHub repository stats dashboard
 *
 * @param title - Dashboard title (default: "GitHub Stats")
 * @param languageData - Programming language distribution data
 * @param stats - GitHub statistics (stars, forks, repos)
 * @param loading - Shows a skeleton state while true
 * @param error - Shows an error message instead of the dashboard when set
 */
const GitHubStatsChart: React.FC<GitHubStatsChartProps> = ({
  title = "GitHub Stats",
  languageData = defaultLanguageData,
  stats = defaultStats,
  loading = false,
  error = null,
}) => {
  const theme = useTheme();

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} gutterBottom textAlign="center" mb={4}>
        {title}
      </Typography>

      {error ? (
        <Alert severity="error" sx={{ maxWidth: 600, mx: "auto" }}>
          Couldn't load live GitHub stats right now ({error}). Try refreshing the page in
          a bit.
        </Alert>
      ) : (
        <Box sx={{ maxWidth: CONTENT_MAX_WIDTH, mx: "auto" }}>
          {/* Stats Cards — each takes an even third so the row's edges land
              flush with the Language Distribution card below instead of
              floating narrower and centered within it. */}
          <Grid container spacing={2} mb={4}>
            <Grid size={4}>
              {loading ? (
                <Skeleton variant="rounded" height={116} />
              ) : (
                <StatCard
                  icon={<StarIcon sx={{ fontSize: 32 }} />}
                  label="Total Stars"
                  value={stats.totalStars.toLocaleString()}
                  color={theme.palette.warning.main}
                />
              )}
            </Grid>
            <Grid size={4}>
              {loading ? (
                <Skeleton variant="rounded" height={116} />
              ) : (
                <StatCard
                  icon={<ForkRightIcon sx={{ fontSize: 32 }} />}
                  label="Total Forks"
                  value={stats.totalForks.toLocaleString()}
                  color={theme.palette.info.main}
                />
              )}
            </Grid>
            <Grid size={4}>
              {loading ? (
                <Skeleton variant="rounded" height={116} />
              ) : (
                <StatCard
                  icon={<CodeIcon sx={{ fontSize: 32 }} />}
                  label="Repositories"
                  value={stats.totalRepos}
                  color={theme.palette.primary.main}
                />
              )}
            </Grid>
          </Grid>

          {/* Language Distribution */}
          <Paper
            sx={{
              p: 3,
              bgcolor: alpha(theme.palette.background.paper, 0.6),
              backdropFilter: "blur(10px)",
            }}
          >
            <Typography variant="h6" fontWeight={600} gutterBottom textAlign="center">
              Language Distribution
            </Typography>
            {loading ? (
              <Skeleton variant="circular" width={250} height={250} sx={{ mx: "auto" }} />
            ) : languageData.length === 0 ? (
              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
                sx={{ py: 4 }}
              >
                No language data available yet.
              </Typography>
            ) : (
              // Every distinct language gets its own slice (see
              // computeLanguageDistribution). The pie sits centered with a
              // wrapped, centered legend underneath — rather than a side
              // legend next to an off-center pie — so the card reads as one
              // balanced block instead of content bunched to one side with a
              // large empty gap on the other, at any container width.
              <ResponsiveContainer
                width="100%"
                height={260 + Math.ceil(languageData.length / 4) * 32}
              >
                <PieChart>
                  <Pie
                    data={languageData as unknown as PieChartData[]}
                    cx="50%"
                    cy="42%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {languageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number, name: string) => {
                      const total = languageData.reduce((sum, d) => sum + d.value, 0);
                      const percent = total > 0 ? Math.round((value / total) * 100) : 0;
                      return [`${value} repo${value === 1 ? "" : "s"} (${percent}%)`, name];
                    }}
                  />
                  <Legend
                    layout="horizontal"
                    align="center"
                    verticalAlign="bottom"
                    iconType="circle"
                    wrapperStyle={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "center",
                      gap: 4,
                      paddingTop: 16,
                    }}
                    formatter={(value: string, entry) => {
                      const slice = languageData.find((d) => d.name === value);
                      const total = languageData.reduce((sum, d) => sum + d.value, 0);
                      const percent =
                        slice && total > 0 ? Math.round((slice.value / total) * 100) : 0;
                      return (
                        <span style={{ color: entry.color }}>
                          {value} {percent}%
                        </span>
                      );
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default GitHubStatsChart;
