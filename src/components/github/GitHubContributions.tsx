/**
 * GitHubContributions Component
 * Displays GitHub contribution heatmap with fallback chain and refresh mechanism
 * @module components/github/GitHubContributions
 */

import React, { useState, useCallback, useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ContribHeatmap, {
  ContributionMetadata,
} from "../contribs/ContribHeatmap";
import ContributionStatus from "./components/ContributionStatus";
import ContributionFallback from "./components/ContributionFallback";

/**
 * GitHubContributions displays contribution activity with intelligent fallback chain
 *
 * Prefers locally generated JSON heatmap (updated daily via GitHub Actions) rendered by ContribHeatmap.
 * If JSON fails to load, falls back to:
 *  1. External SVG from ghchart.rshah.org (theme-colored)
 *  2. Local static PNG (/contributions-dark.png or /contributions-light.png) if provided
 *  3. Error message
 *
 * AUTO-REFRESH DISABLED: Manual refresh only via button to prevent infinite loops.
 * Users can check data freshness via status badge and refresh manually when needed.
 *
 * @returns GitHub contributions visualization component
 */
// External dynamic chart provider: https://ghchart.rshah.org
const USERNAME = "vaporjawn";

const buildChartUrl = (hexColor: string) =>
  `https://ghchart.rshah.org/${hexColor.replace("#", "")}/${USERNAME}`;

// Optional local fallback (user may add later)
const LOCAL_DARK = "/contributions-dark.png";
const LOCAL_LIGHT = "/contributions-light.png";

// Staleness threshold in hours
const STALE_HOURS = 48;

const GitHubContributions: React.FC = () => {
  const theme = useTheme();

  // Decide primary tint (fallback to default green)
  const primary = theme.palette.primary.main || "#34d058";

  // Derive theme URL from primary color (memoised so the compiler is happy)
  const themeChartUrl = useMemo(() => buildChartUrl(primary), [primary]);
  // Local fallback URL is set (via handleError) only when the theme URL fails
  const [localFallback, setLocalFallback] = useState<string | null>(null);
  // Effective URL: theme-derived unless a local fallback was triggered by an error
  const chartUrl = localFallback ?? themeChartUrl;

  const [status, setStatus] = useState<
    "idle" | "loading" | "loaded" | "error"
  >("idle");
  const [attemptedLocal, setAttemptedLocal] = useState(false);
  const [jsonFailed, setJsonFailed] = useState(false);
  const [meta, setMeta] = useState<ContributionMetadata | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Capture wall-clock time at mount via lazy useState initializer.
  // Passing `Date.now` (function reference, not a call) satisfies react-hooks/purity
  // because the reference itself is pure — React calls it once during initialisation.
  const [mountTime] = useState<number>(Date.now);

  // Compute staleness (>48h) against the mount-time baseline.
  // Omitting useMemo intentionally: the React Compiler handles memoisation automatically,
  // which avoids the conflict between exhaustive-deps and preserve-manual-memoization.
  // new Date(fetchedAt) with a deterministic string arg is considered pure by the compiler.
  const fetchedMs = meta?.fetchedAt ? new Date(meta.fetchedAt).getTime() : NaN;
  const isStale =
    !meta?.fetchedAt || Number.isNaN(fetchedMs) || (mountTime - fetchedMs) / 36e5 > STALE_HOURS;

  /**
   * Manual refresh handler
   * Forces fresh fetch by incrementing refresh key and adding cache-busting
   */
  const handleManualRefresh = useCallback(async () => {
    setIsRefreshing(true);
    // Force a fresh fetch by incrementing the key
    setRefreshKey((prev) => prev + 1);
    // Wait a moment to allow the component to remount with new key
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsRefreshing(false);
  }, []);

  // Note: chartUrl auto-updates when `primary` changes (via useMemo above),
  // so no useEffect is needed to recolor on theme change.

  /**
   * Fallback error handler
   * Attempts local static image before showing error state
   */
  const handleError = () => {
    if (!attemptedLocal) {
      // Try local fallback image if present
      setAttemptedLocal(true);
      setLocalFallback(theme.palette.mode === "dark" ? LOCAL_DARK : LOCAL_LIGHT);
      setStatus("loading");
    } else {
      setStatus("error");
    }
  };

  const handleLoad = () => setStatus("loaded");

  return (
    <Box sx={{ mt: 6 }}>
      <Typography
        component="h4"
        variant="h4"
        sx={{
          fontSize: { xs: "1.4rem", md: "1.6rem" },
          fontWeight: 600,
          mb: 2,
          textAlign: "center",
          background: `linear-gradient(60deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        GitHub Contributions
      </Typography>

      <Typography
        variant="body2"
        sx={{
          textAlign: "center",
          mb: 3,
          color: theme.palette.text.secondary,
        }}
      >
        Activity snapshot from the past 12 months.
      </Typography>

      <Box
        sx={{
          maxWidth: 950,
          mx: "auto",
          borderRadius: 3,
          overflow: "hidden",
          position: "relative",
          boxShadow:
            theme.palette.mode === "dark"
              ? `0 4px 24px ${theme.palette.primary.main}30`
              : `0 4px 24px ${theme.palette.primary.main}25`,
          p: { xs: 2, md: 3 },
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(180deg, #080810, #10121a)"
              : "linear-gradient(180deg, #ffffff, #f5f7fa)",
        }}
      >
        {/* Primary: JSON heatmap */}
        <Box sx={{ mb: 2 }}>
          <ContribHeatmap
            key={refreshKey} // Force remount on refresh
            ariaLabel="GitHub contribution heatmap"
            onLoaded={() => {
              setJsonFailed(false);
            }}
            onError={() => {
              setJsonFailed(true);
              setStatus("loading");
            }}
            onMetadata={(m) => setMeta(m)}
          />
        </Box>

        {/* Fallback chain when JSON fails */}
        {jsonFailed && (
          <ContributionFallback
            username={USERNAME}
            chartUrl={chartUrl}
            status={status}
            onError={handleError}
            onLoad={handleLoad}
          />
        )}

        {/* Status badge and refresh button */}
        <ContributionStatus
          meta={meta}
          isStale={isStale}
          isRefreshing={isRefreshing}
          staleHours={STALE_HOURS}
          onRefresh={handleManualRefresh}
        />
      </Box>
    </Box>
  );
};

export default GitHubContributions;
