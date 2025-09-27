import React, { useEffect, useState } from "react";
import { Box, Typography, Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ContribHeatmap, { ContributionMetadata } from "../contribs/ContribHeatmap";
import { Chip, Tooltip } from "@mui/material";

/**
 * GitHubContributions now prefers a locally generated JSON heatmap (updated daily via GitHub Actions)
 * rendered by <ContribHeatmap/>. If the JSON fails to load (e.g., first deploy before workflow run),
 * we fall back to the legacy external SVG service and finally to optional static screenshots.
 *
 * Fallback chain:
 *  1. JSON-driven <ContribHeatmap /> (/data/contributions.json)
 *  2. External SVG from ghchart.rshah.org (theme-colored)
 *  3. Local static PNG (/contributions-dark.png or /contributions-light.png) if provided
 *  4. Error message
 */
// External dynamic chart provider: https://ghchart.rshah.org
const USERNAME = "vaporjawn";

const buildChartUrl = (hexColor: string) => `https://ghchart.rshah.org/${hexColor.replace("#", "")}/${USERNAME}`;

// Optional local fallback (user may add later)
const LOCAL_DARK = "/contributions-dark.png";
const LOCAL_LIGHT = "/contributions-light.png";

const GitHubContributions: React.FC = () => {
  const theme = useTheme();
  // Decide primary tint (fallback to primary.main). Use a mid-saturation for readability.
  const primary = theme.palette.primary.main || "#34d058"; // default greenish if undefined
  const [chartUrl, setChartUrl] = useState<string>(buildChartUrl(primary));
  const [status, setStatus] = useState<"idle" | "loading" | "loaded" | "error">("idle");
  const [attemptedLocal, setAttemptedLocal] = useState(false);
  const [jsonFailed, setJsonFailed] = useState(false);
  const [meta, setMeta] = useState<ContributionMetadata | null>(null);

  // Compute staleness ( > 48h )
  const STALE_HOURS = 48;
  const isStale = (() => {
    if (!meta?.fetchedAt) return true; // treat missing metadata as stale/unknown
    const fetched = new Date(meta.fetchedAt).getTime();
    if (Number.isNaN(fetched)) return true;
    const ageHrs = (Date.now() - fetched) / 36e5;
    return ageHrs > STALE_HOURS;
  })();

  function formatRelative(ts?: string) {
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

  // If theme changes (light/dark), we can attempt a recolor. (Service doesn't expose theme param,
  // but we could choose different hex per mode.)
  useEffect(() => {
    const colorForMode = theme.palette.mode === "dark" ? primary : primary;
    const newUrl = buildChartUrl(colorForMode);
    setChartUrl(newUrl);
    setStatus("loading");
  }, [theme.palette.mode, primary]);

  const handleError = () => {
    if (!attemptedLocal) {
      // Try local fallback image if present
      setAttemptedLocal(true);
      setChartUrl(theme.palette.mode === "dark" ? LOCAL_DARK : LOCAL_LIGHT);
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
        sx={{ textAlign: "center", mb: 3, color: theme.palette.text.secondary }}
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
        {jsonFailed && (
          <>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ mb: 2, p: 2, border: "1px solid", borderColor: "warning.main", borderRadius: 2, bgcolor: theme.palette.mode === "dark" ? "warning.900" : "warning.50" }}>
              <Typography variant="subtitle2" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                Contribution data not yet generated
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.8, display: "block", mt: 0.5 }}>
                The scheduled GitHub Action has not produced a real <code>contributions.json</code> file yet (or it failed). Ensure you have added a repo secret named <code>CONTRIB_GRAPHQL_TOKEN</code> with a GitHub Personal Access Token (scopes: <code>read:user</code>, <code>repo</code> not required) and manually run the workflow "Update Contributions Calendar" via the Actions tab. Once it commits an updated JSON the heatmap will appear here.
              </Typography>
            </Box>
            {/* Legacy external SVG fallback chain */}
            {status === "loading" && (
              <Box
                aria-label="Loading contribution graph"
                role="status"
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(53, 1fr)",
                  gap: 0.5,
                  width: "100%",
                  mb: 2,
                  aspectRatio: "53 / 7",
                  maxHeight: 180,
                }}
              >
                {Array.from({ length: 53 * 7 }).map((_, i) => (
                  <Box
                    key={i}
                    sx={{
                      width: "100%",
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? "rgba(255,255,255,0.06)"
                          : "rgba(0,0,0,0.07)",
                      borderRadius: 0.5,
                      animation: "pulse 1.6s ease-in-out infinite",
                      "@keyframes pulse": {
                        "0%": { opacity: 0.4 },
                        "50%": { opacity: 1 },
                        "100%": { opacity: 0.4 },
                      },
                    }}
                  />
                ))}
              </Box>
            )}
            {status !== "error" && (
              <Box
                component="img"
                src={chartUrl}
                alt={`GitHub contribution activity graph for ${USERNAME} over the last year`}
                loading="lazy"
                onError={handleError}
                onLoad={handleLoad}
                sx={{
                  display: status === "loaded" ? "block" : "none",
                  width: "100%",
                  height: "auto",
                  borderRadius: 2,
                  userSelect: "none",
                }}
              />
            )}
            {status === "error" && (
              <Box sx={{ textAlign: "center", py: 4 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Unable to load dynamic contribution chart.
                </Typography>
                <Typography variant="caption" sx={{ display: "block", opacity: 0.7 }}>
                  Optionally add a static screenshot named {"'contributions-"}
                  {theme.palette.mode === "dark" ? "dark" : "light"}
                  {".png'"} into the public/ folder.
                </Typography>
              </Box>
            )}
          </>
        )}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1, flexWrap: "wrap", gap: 1 }}>
          <Typography variant="caption" sx={{ opacity: 0.7 }}>
            Last updated: {formatRelative(meta?.fetchedAt)}{meta?.fetchedAt && ` (${new Date(meta.fetchedAt).toLocaleString()})`}
          </Typography>
          {isStale && (
            <Tooltip title={meta?.fetchedAt ? `Data older than ${STALE_HOURS}h; run the 'Update Contributions Calendar' workflow.` : "No metadata detected. Run the workflow to generate data."}>
              <Chip color="warning" size="small" label="STALE" sx={{ fontWeight: 600 }} />
            </Tooltip>
          )}
          {!isStale && meta?.fetchedAt && (
            <Chip color="success" size="small" label="Fresh" sx={{ fontWeight: 600 }} />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default GitHubContributions;
