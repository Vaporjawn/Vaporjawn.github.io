/**
 * ContributionStatus Component
 * Displays freshness status badge and refresh button for GitHub contributions
 * @module components/github/components/ContributionStatus
 */

import React from "react";
import { Box, Button, Chip, CircularProgress, Tooltip, Typography } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { ContributionMetadata } from "../../contribs/ContribHeatmap";

interface ContributionStatusProps {
  /** Metadata from contribution JSON file */
  meta: ContributionMetadata | null;
  /** Whether data is considered stale (>48h old) */
  isStale: boolean;
  /** Currently refreshing data */
  isRefreshing: boolean;
  /** Staleness threshold in hours */
  staleHours: number;
  /** Callback to trigger manual refresh */
  onRefresh: () => void;
}

/**
 * Formats timestamp as relative time string (e.g., "2h ago", "3d ago")
 *
 * @param ts - ISO timestamp string
 * @returns Human-readable relative time
 */
function formatRelative(ts?: string): string {
  if (!ts) return "unknown";

  const date = new Date(ts);
  if (Number.isNaN(date.getTime())) return "invalid date";

  const diffMs = Date.now() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);

  if (diffSec < 60) return `${diffSec}s ago`;

  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;

  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;

  const diffDay = Math.floor(diffHr / 24);
  return `${diffDay}d ago`;
}

/**
 * ContributionStatus displays data freshness indicator and refresh controls
 *
 * @param props - Component props
 * @returns Status display with refresh button
 */
const ContributionStatus: React.FC<ContributionStatusProps> = ({
  meta,
  isStale,
  isRefreshing,
  staleHours,
  onRefresh,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mt: 1,
        flexWrap: "wrap",
        gap: 1,
      }}
    >
      <Typography variant="caption" sx={{ opacity: 0.7 }}>
        Last updated: {formatRelative(meta?.fetchedAt)}
        {meta?.fetchedAt &&
          ` (${new Date(meta.fetchedAt).toLocaleString()})`}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {/* Staleness Badge */}
        {isStale && (
          <Tooltip
            title={
              meta?.fetchedAt
                ? `Data older than ${staleHours}h; click refresh to check for updates.`
                : "No metadata detected. Click refresh to load latest data."
            }
          >
            <Chip
              color="warning"
              size="small"
              label="STALE"
              sx={{ fontWeight: 600 }}
            />
          </Tooltip>
        )}

        {/* Fresh Badge */}
        {!isStale && meta?.fetchedAt && (
          <Chip
            color="success"
            size="small"
            label="Fresh"
            sx={{ fontWeight: 600 }}
          />
        )}

        {/* Refresh Button */}
        <Tooltip title="Refresh contribution data">
          <Button
            size="small"
            variant="outlined"
            disabled={isRefreshing}
            onClick={onRefresh}
            startIcon={
              isRefreshing ? <CircularProgress size={16} /> : <RefreshIcon />
            }
            sx={{
              minWidth: "auto",
              px: 1.5,
              py: 0.5,
              fontSize: "0.75rem",
              textTransform: "none",
            }}
          >
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </Button>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default ContributionStatus;
