import React, { useCallback, useMemo, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  useTheme,
  Paper,
  Stack,
  Tooltip,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import TimelineIcon from "@mui/icons-material/Timeline";
import ListIcon from "@mui/icons-material/FormatListBulleted";

import { useGithubActivity } from "../../hooks/useGithubActivity";
import { useNpmPackages } from "../../hooks/useNpmPackages";
import { CommitGraph, CommitGraphEvent } from "../../components/activity/CommitGraph";
import { ActivityLegend } from "../../components/activity/ActivityLegend";

// --- relative time utility -------------------------------------------------
// Lightweight relative time helper (minutes / hours / days / weeks; >30d => locale date)
function relativeTime(input: string | number | Date): string {
  try {
    const date = new Date(input);
    const now = Date.now();
    let diffMs = now - date.getTime();
    const future = diffMs < 0;
    diffMs = Math.abs(diffMs);

    const sec = Math.floor(diffMs / 1000);
    if (sec < 45) return future ? "in a few sec" : "just now";
    const min = Math.floor(sec / 60);
    if (min < 60) return future ? `in ${min}m` : `${min}m ago`;
    const hr = Math.floor(min / 60);
    if (hr < 24) return future ? `in ${hr}h` : `${hr}h ago`;
    const day = Math.floor(hr / 24);
    if (day < 7) return future ? `in ${day}d` : `${day}d ago`;
    const week = Math.floor(day / 7);
    if (week < 5) return future ? `in ${week}w` : `${week}w ago`;

    // Fallback to short date for older items
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: new Date().getFullYear() === date.getFullYear() ? undefined : "numeric",
    });
  } catch {
    return "";
  }
}

// --- Component -------------------------------------------------------------
const ActivityPage: React.FC = () => {
  const theme = useTheme();

  // Data hooks
  const {
    events: githubEvents,
    loading: githubLoading,
    error: githubError,
    refresh: refreshGithub,
  } = useGithubActivity();
  const {
    packages: npmPackages,
    loading: npmLoading,
    error: npmError,
    refresh: refreshNpm,
  } = useNpmPackages();
  // npm maintainer profile URL (hook does not return profile meta object currently)
  const npmProfileUrl = "https://www.npmjs.com/~vaporjawn"; // keep in sync with maintainer option if changed

  // View toggle for GitHub activity section
  const [ghView, setGhView] = useState<"graph" | "list">("graph");
  const handleGhView = useCallback(
    (_: unknown, val: "graph" | "list" | null) => {
      if (val) setGhView(val);
    },
    []
  );

  // Unified events: GitHub events already normalized; map npm packages to events.
  const unifiedEvents: CommitGraphEvent[] = useMemo(() => {
    const nowIso = new Date().toISOString();
    const npmEvents: CommitGraphEvent[] = npmPackages.map((p) => ({
      id: `npm:${p.name}@${p.version}:${p.publishedAt || "no-date"}`,
      createdAt: p.publishedAt || nowIso, // guarantee string for graph; fallback to now if missing
      message: `${p.name} v${p.version} published`,
      kind: "npm-publish",
      lane: "npm",
      url: p.npmUrl,
    }));
    // GitHub events form the trunk; assign lane explicitly.
    const ghEvents: CommitGraphEvent[] = githubEvents.map((e) => ({
      ...e,
      lane: "GitHub",
    }));
    return [...ghEvents, ...npmEvents].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [githubEvents, npmPackages]);

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: 2, md: 3 }, py: { xs: 4, md: 6 } }}>
      <Typography variant="h3" fontWeight={700} gutterBottom>
        Activity
      </Typography>
      <Typography variant="body1" sx={{ opacity: 0.75, mb: 4 }}>
        A unified timeline of my open-source work. npm publishes appear first, with a
        commit‑style graph of GitHub repository activity.
      </Typography>

      {/* npm Packages Section (FIRST) */}
      {(
        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, md: 4 },
            borderRadius: 4,
            background:
              theme.palette.mode === "dark"
                ? "linear-gradient(135deg, rgba(255,255,255,0.035), rgba(255,255,255,0.018))"
                : "linear-gradient(135deg, rgba(0,0,0,0.012), rgba(0,0,0,0.03))",
            backdropFilter: "blur(10px)",
          }}
        >
          <Stack spacing={2}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="h5" fontWeight={600} component="h2">
                npm Packages
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Tooltip title="Refresh">
                  <span>
                    <IconButton
                      aria-label="refresh npm packages"
                      size="small"
                      onClick={refreshNpm}
                      disabled={npmLoading}
                    >
                      <RefreshIcon fontSize="small" />
                    </IconButton>
                  </span>
                </Tooltip>
                <Tooltip title="Open npm profile">
                  <IconButton
                    aria-label="open npm profile"
                    size="small"
                    component="a"
                    href={npmProfileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <OpenInNewIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Stack>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Recently published / updated packages.
            </Typography>
            {npmLoading && (
              <Box display="flex" justifyContent="center" py={3}>
                <CircularProgress size={26} />
              </Box>
            )}
            {npmError && !npmLoading && (
              <Alert severity="error">Failed to load npm packages: {npmError}</Alert>
            )}
            {!npmLoading && !npmError && (
              <List dense aria-label="Recent npm packages" sx={{ width: "100%" }}>
                {npmPackages.slice(0, 8).map((p) => (
                  <React.Fragment key={p.name}>
                    <ListItem
                      disableGutters
                      secondaryAction={
                        p.npmUrl ? (
                          <IconButton
                            edge="end"
                            aria-label="open package"
                            size="small"
                            href={p.npmUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <OpenInNewIcon fontSize="inherit" />
                          </IconButton>
                        ) : null
                      }
                    >
                      <ListItemText
                        primary={`${p.name} @ ${p.version}`}
                        secondary={[
                          p.description || "",
                          p.publishedAt ? ` • ${relativeTime(p.publishedAt)}` : "",
                          typeof p.weeklyDownloads === "number"
                            ? ` • ${p.weeklyDownloads.toLocaleString()} downloads/week`
                            : "",
                        ]
                          .filter(Boolean)
                          .join("")}
                        primaryTypographyProps={{ variant: "body2" }}
                        secondaryTypographyProps={{ variant: "caption" }}
                      />
                    </ListItem>
                    <Divider component="li" sx={{ opacity: 0.2 }} />
                  </React.Fragment>
                ))}
                {npmPackages.length === 0 && (
                  <Typography variant="body2" sx={{ opacity: 0.6, mt: 1 }}>
                    No published packages.
                  </Typography>
                )}
              </List>
            )}
            <Button
              variant="outlined"
              color="primary"
              href={npmProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ alignSelf: "flex-start" }}
            >
              View All on npm
            </Button>
          </Stack>
        </Paper>
      )}

      {/* GitHub Activity Section (SECOND) */}
      <Paper
        elevation={5}
        sx={{
          mt: 6,
            p: { xs: 2, md: 4 },
          borderRadius: 4,
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(135deg, rgba(255,255,255,0.045), rgba(255,255,255,0.025))"
              : "linear-gradient(135deg, rgba(0,0,0,0.018), rgba(0,0,0,0.04))",
          backdropFilter: "blur(10px)",
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
          <Typography variant="h5" fontWeight={600} component="h2">
            GitHub Activity
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Tooltip title="Refresh">
              <span>
                <IconButton
                  aria-label="refresh github activity"
                  size="small"
                  onClick={refreshGithub}
                  disabled={githubLoading}
                >
                  <RefreshIcon fontSize="small" />
                </IconButton>
              </span>
            </Tooltip>
            <ToggleButtonGroup
              size="small"
              exclusive
              value={ghView}
              onChange={handleGhView}
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
                aria-label="open github profile"
                size="small"
                component="a"
                href="https://github.com/Vaporjawn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <OpenInNewIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
        {githubLoading && (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress size={28} />
          </Box>
        )}
        {githubError && !githubLoading && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Failed to load GitHub activity: {githubError}
          </Alert>
        )}
        {!githubLoading && !githubError && ghView === "graph" && (
          <Box sx={{ mt: 1 }}>
            <CommitGraph events={unifiedEvents} maxRepos={8} heightPerNode={40} />
            <ActivityLegend />
            {unifiedEvents.length === 0 && (
              <Typography variant="body2" sx={{ opacity: 0.6, mt: 1 }}>
                No recent activity.
              </Typography>
            )}
          </Box>
        )}
        {!githubLoading && !githubError && ghView === "list" && (
          <List dense aria-label="Recent GitHub / npm activity list" sx={{ width: "100%" }}>
            {unifiedEvents.slice(0, 32).map((evt) => (
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
            {unifiedEvents.length === 0 && (
              <Typography variant="body2" sx={{ opacity: 0.6, mt: 1 }}>
                No recent activity.
              </Typography>
            )}
          </List>
        )}
      </Paper>

      <Typography variant="body2" sx={{ mt: 4, opacity: 0.7 }}>
        GitHub and npm sections use local caching with background refresh to reduce API calls
        while keeping activity reasonably fresh. ({githubEvents.length} GitHub events / {npmPackages.length} packages)
      </Typography>

      {/* TODO: Enhance node visuals (shapes/sizes) & add virtualization if event list grows large */}
      {/* TODO: Add richer tooltips with relative time + repository badges */}
    </Box>
  );
};

export default ActivityPage;
