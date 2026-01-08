/**
 * GitHub Activity Section
 * Displays GitHub contribution graph with event visualization
 * @module components/activity/GitHubSection
 */

import React from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import RefreshIcon from "@mui/icons-material/Refresh";
import TimelineIcon from "@mui/icons-material/Timeline";
import ListIcon from "@mui/icons-material/FormatListBulleted";

import type { GitHubSectionProps } from "./types";

import { CommitGraph } from "./CommitGraph";
import { ActivityLegend } from "./ActivityLegend";
import { relativeTime } from "./utils";

/**
 * GitHub activity section component
 * Shows contribution graph and recent activity feed
 *
 * @param props - Component props
 * @returns React component
 */
export const GitHubSection: React.FC<GitHubSectionProps> = ({
  events,
  loading,
  error,
  refresh,
  view,
  onViewChange,
  profileUrl,
  maxRepos = 12,
  heightPerNode = 46,
}) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={5}
      sx={{
        p: { xs: 2, md: 4 },
        borderRadius: 4,
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(135deg, rgba(255,255,255,0.045), rgba(255,255,255,0.025))"
            : "linear-gradient(135deg, rgba(0,0,0,0.018), rgba(0,0,0,0.04))",
        backdropFilter: "blur(10px)",
      }}
    >
      <Stack spacing={1}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h5" fontWeight={600} component="h2">
            GitHub Activity
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Tooltip title="Refresh">
              <span>
                <IconButton
                  aria-label="refresh GitHub activity"
                  size="small"
                  onClick={refresh}
                  disabled={loading}
                >
                  <RefreshIcon fontSize="small" />
                </IconButton>
              </span>
            </Tooltip>
            <ToggleButtonGroup
              size="small"
              exclusive
              value={view}
              onChange={(_, val) => onViewChange(val)}
              aria-label="github activity view mode"
            >
              <ToggleButton value="graph" aria-label="graph view">
                <TimelineIcon fontSize="small" />
              </ToggleButton>
              <ToggleButton value="list" aria-label="list view">
                <ListIcon fontSize="small" />
              </ToggleButton>
            </ToggleButtonGroup>
            <Tooltip title="Open GitHub profile">
              <IconButton
                aria-label="open GitHub profile"
                size="small"
                component="a"
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <OpenInNewIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>

        {loading && (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress size={28} />
          </Box>
        )}

        {error && !loading && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Failed to load GitHub activity: {error}
          </Alert>
        )}

        {!loading && !error && view === "graph" && (
          <Box sx={{ mt: 1 }}>
            <CommitGraph events={events} maxRepos={maxRepos} heightPerNode={heightPerNode} />
            <ActivityLegend />
            {events.length === 0 && (
              <Typography variant="body2" sx={{ opacity: 0.6, mt: 1 }}>
                No recent activity.
              </Typography>
            )}
          </Box>
        )}

        {!loading && !error && view === "list" && (
          <List dense aria-label="Recent GitHub / npm activity list" sx={{ width: "100%" }}>
            {events.slice(0, 32).map((evt) => (
              <React.Fragment key={evt.id}>
                <ListItem
                  disableGutters
                  secondaryAction={
                    evt.url ? (
                      <IconButton
                        edge="end"
                        aria-label="open event"
                        size="small"
                        href={evt.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <OpenInNewIcon fontSize="inherit" />
                      </IconButton>
                    ) : null
                  }
                >
                  <ListItemText
                    primary={evt.message}
                    secondary={`${evt.lane}${evt.repo ? ` • ${evt.repo}` : ""} • ${relativeTime(
                      evt.createdAt
                    )}`}
                    primaryTypographyProps={{ variant: "body2" }}
                    secondaryTypographyProps={{ variant: "caption" }}
                  />
                </ListItem>
                <Divider component="li" sx={{ opacity: 0.2 }} />
              </React.Fragment>
            ))}
            {events.length === 0 && (
              <Typography variant="body2" sx={{ opacity: 0.6, mt: 1 }}>
                No recent activity.
              </Typography>
            )}
          </List>
        )}
      </Stack>
    </Paper>
  );
};

export default GitHubSection;
