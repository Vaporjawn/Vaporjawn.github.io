/**
 * ContributionFallback Component
 * Handles fallback rendering chain for GitHub contributions when JSON fails
 * @module components/github/components/ContributionFallback
 */

import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface ContributionFallbackProps {
  /** GitHub username for chart service */
  username: string;
  /** External chart URL (ghchart.rshah.org) */
  chartUrl: string;
  /** Loading/loaded/error status */
  status: "idle" | "loading" | "loaded" | "error";
  /** Callback when image fails to load */
  onError: () => void;
  /** Callback when image loads successfully */
  onLoad: () => void;
}

/**
 * ContributionFallback displays fallback chain when JSON heatmap unavailable
 * Falls back to: External SVG → Local static image → Error message
 *
 * @param props - Component props
 * @returns Fallback rendering component
 */
const ContributionFallback: React.FC<ContributionFallbackProps> = ({
  username,
  chartUrl,
  status,
  onError,
  onLoad,
}) => {
  const theme = useTheme();

  return (
    <>
      <Divider sx={{ my: 2 }} />

      {/* Warning Box */}
      <Box
        sx={{
          mb: 2,
          p: 2,
          border: "1px solid",
          borderColor: "warning.main",
          borderRadius: 2,
          bgcolor:
            theme.palette.mode === "dark" ? "warning.900" : "warning.50",
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          Contribution data not yet generated
        </Typography>
        <Typography
          variant="caption"
          sx={{ opacity: 0.8, display: "block", mt: 0.5 }}
        >
          The scheduled GitHub Action has not produced a real{" "}
          <code>contributions.json</code> file yet (or it failed). Ensure you
          have added a repo secret named <code>CONTRIB_GRAPHQL_TOKEN</code>{" "}
          with a GitHub Personal Access Token (scopes: <code>read:user</code>,{" "}
          <code>repo</code> not required) and manually run the workflow "Update
          Contributions Calendar" via the Actions tab. Once it commits an
          updated JSON the heatmap will appear here.
        </Typography>
      </Box>

      {/* Loading Skeleton */}
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

      {/* External SVG Fallback */}
      {status !== "error" && (
        <Box
          component="img"
          src={chartUrl}
          alt={`GitHub contribution activity graph for ${username} over the last year`}
          loading="lazy"
          onError={onError}
          onLoad={onLoad}
          sx={{
            display: status === "loaded" ? "block" : "none",
            width: "100%",
            height: "auto",
            borderRadius: 2,
            userSelect: "none",
          }}
        />
      )}

      {/* Error State */}
      {status === "error" && (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Unable to load dynamic contribution chart.
          </Typography>
          <Typography
            variant="caption"
            sx={{ display: "block", opacity: 0.7 }}
          >
            Optionally add a static screenshot named{" "}
            {"'contributions-"}
            {theme.palette.mode === "dark" ? "dark" : "light"}
            {".png'"} into the public/ folder.
          </Typography>
        </Box>
      )}
    </>
  );
};

export default ContributionFallback;
