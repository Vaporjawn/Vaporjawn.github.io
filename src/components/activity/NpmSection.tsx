/**
 * npm Packages Section
 * Displays recently published npm packages with metadata
 * @module components/activity/NpmSection
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
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import RefreshIcon from "@mui/icons-material/Refresh";

import type { NpmSectionProps } from "./types";

import { relativeTime } from "./utils";

/**
 * npm packages section component
 * Shows a list of recently published packages with download statistics
 *
 * @param props - Component props
 * @returns React component
 */
export const NpmSection: React.FC<NpmSectionProps> = ({
  packages,
  loading,
  error,
  refresh,
  profileUrl,
}) => {
  const theme = useTheme();

  return (
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
                  onClick={refresh}
                  disabled={loading}
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
                href={profileUrl}
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
        {loading && (
          <Box display="flex" justifyContent="center" py={3}>
            <CircularProgress size={26} />
          </Box>
        )}
        {error && !loading && (
          <Alert severity="error">Failed to load npm packages: {error}</Alert>
        )}
        {!loading && !error && (
          <List dense aria-label="Recent npm packages" sx={{ width: "100%" }}>
            {packages.slice(0, 8).map((p) => (
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
            {packages.length === 0 && (
              <Typography variant="body2" sx={{ opacity: 0.6, mt: 1 }}>
                No published packages.
              </Typography>
            )}
          </List>
        )}
        <Button
          variant="outlined"
          color="primary"
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ alignSelf: "flex-start" }}
        >
          View All on npm
        </Button>
      </Stack>
    </Paper>
  );
};

export default NpmSection;
