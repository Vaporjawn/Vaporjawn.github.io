import React, { useEffect, useMemo, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";

// Types derived from GitHub GraphQL contributionCalendar shape
interface ContributionDay {
  date: string; // ISO date
  weekday: number; // 0..6
  contributionCount: number;
  color: string; // GitHub API derived color (we may map to theme)
}
interface ContributionWeek {
  contributionDays: ContributionDay[];
}
interface ContributionCalendar {
  totalContributions: number;
  weeks: ContributionWeek[];
}

// Extended metadata optionally appended by the fetch script
interface ContributionCalendarWithMeta extends ContributionCalendar {
  schemaVersion?: number;
  fetchedAt?: string; // ISO timestamp when CI fetched data
  login?: string;
  range?: { from: string; to: string };
}

// Metadata shape emitted upward (subset of json fields)
export type ContributionMetadata = {
  fetchedAt?: string;
  schemaVersion?: number;
  login?: string;
  range?: { from: string; to: string };
};

// underscore param name to avoid unused-var lint complaints in parent implementations
// eslint-disable-next-line no-unused-vars
export type ContributionMetadataHandler = (meta: ContributionMetadata) => void; // parent may ignore param

interface HeatmapProps {
  source?: string; // override JSON path (default /data/contributions.json)
  maxDays?: number; // safety limit
  cellSize?: number;
  cellGap?: number;
  ariaLabel?: string;
  onError?: () => void;
  onLoaded?: () => void;
  onMetadata?: ContributionMetadataHandler;
}

const DEFAULT_SOURCE = "/data/contributions.json";

// Map GitHub green scale (light->dark) to theme primary scale (or keep original) if desired.
function resolveColor(input: string, themeMode: "light"|"dark"): string {
  // The API already returns accessible colors. Optionally adjust for dark mode contrast.
  if (themeMode === "dark") return input; // keep as-is for now.
  return input;
}

// Compute levels for legend (simple quantization) – could be enhanced.
function computeLegend(colors: string[]): string[] {
  const uniq = Array.from(new Set(colors));
  // keep order as encountered – limit to 5 for legend clarity
  return uniq.slice(0, 5);
}

export const ContribHeatmap: React.FC<HeatmapProps> = ({
  source = DEFAULT_SOURCE,
  maxDays = 400,
  cellSize = 12,
  cellGap = 3,
  ariaLabel = "GitHub contribution heatmap",
  onError,
  onLoaded,
  onMetadata
}) => {
  const theme = useTheme();
  const [data, setData] = useState<ContributionCalendar | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        // Fetch with no-store cache to ensure we get latest data when manually refreshed
        const res = await fetch(source, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json: ContributionCalendarWithMeta = await res.json();
  if (!json?.weeks) throw new Error("Malformed JSON");

        // Detect placeholder / zero-data scenario:
        //  - totalContributions === 0
        //  - weeks length === 1
        //  - first week has single day dated 1970-01-01 (seed placeholder)
        const looksLikePlaceholder =
          json.totalContributions === 0 &&
          json.weeks?.length === 1 &&
            json.weeks[0].contributionDays?.length === 1 &&
            json.weeks[0].contributionDays[0].date === "1970-01-01";

        if (looksLikePlaceholder) {
          if (!cancelled) {
            setError("placeholder dataset (workflow not yet run)");
            onError?.();
          }
          return;
        }

        if (!cancelled) {
          const { schemaVersion, fetchedAt, login: metaLogin, range, ...bare } = json;
          setData(bare);
          // Emit metadata upward (non-breaking for existing parents ignoring it)
          onMetadata?.({ fetchedAt, schemaVersion, login: metaLogin, range });
          setError(null);
          onLoaded?.();
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to load contributions";
        if (!cancelled) {
          setError(message);
          onError?.();
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();
    return () => { cancelled = true; };
  }, [source, onError, onLoaded, onMetadata]);

  const flatDays: ContributionDay[] = useMemo(() => {
    if (!data) return [];
    return data.weeks.flatMap(w => w.contributionDays).slice(-maxDays);
  }, [data, maxDays]);

  // Weeks count for layout
  const weekCount = data?.weeks.length || 0;

  const legendColors = useMemo(() => computeLegend(flatDays.map(d => d.color)), [flatDays]);

  if (loading) {
    return (
      <Box aria-busy role="status" sx={{ display: "flex", gap: 1, flexDirection: "column" }}>
        <Typography variant="body2" sx={{ opacity: 0.7 }}>Loading contributions…</Typography>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 0.5, flexWrap: "wrap", maxWidth: weekCount * (cellSize + cellGap) }}>
          {Array.from({ length: 7 * 20 }).map((_, i) => (
            <Box key={i} sx={{ width: cellSize, height: cellSize, borderRadius: 0.5, bgcolor: "action.hover", animation: "pulse 1.5s ease-in-out infinite", "@keyframes pulse": { "0%": { opacity: 0.35 }, "50%": { opacity: 0.8 }, "100%": { opacity: 0.35 } } }} />
          ))}
        </Box>
      </Box>
    );
  }

  if (error) {
    return <Typography color="error" role="alert">Failed to load contributions: {error}</Typography>;
  }

  if (!data) return null;

  // Build SVG cells: columns = weeks, rows = weekday (0=Sunday) matching GitHub's ordering.
  const svgWidth = weekCount * (cellSize + cellGap);
  const svgHeight = 7 * (cellSize + cellGap);

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        {data.totalContributions.toLocaleString()} contributions in the last 52 weeks
      </Typography>
      <Box component="svg"
        role="img"
        aria-label={ariaLabel}
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        sx={{ display: "block", maxWidth: "100%", border: "1px solid", borderColor: "divider", borderRadius: 1, background: "transparent" }}>
        <title>{ariaLabel}</title>
        {data.weeks.map((week, wIdx) => (
          week.contributionDays.map((day, dIdx) => {
            const x = wIdx * (cellSize + cellGap);
            const y = day.weekday * (cellSize + cellGap);
            const fill = resolveColor(day.color, theme.palette.mode);
            const { contributionCount: count, date } = day;
            const aria = `${count} contribution${count === 1 ? "" : "s"} on ${date}`;
            return (
              <rect
                key={`${wIdx}-${dIdx}`}
                x={x}
                y={y}
                width={cellSize}
                height={cellSize}
                rx={2}
                ry={2}
                fill={fill}
              >
                <title>{aria}</title>
              </rect>
            );
          })
        ))}
      </Box>
      {legendColors.length > 0 && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1, flexWrap: "wrap" }}>
          <Typography variant="caption" sx={{ opacity: 0.8 }}>Less</Typography>
          {legendColors.map(c => (
            <Box key={c} sx={{ width: cellSize, height: cellSize, borderRadius: 0.5, bgcolor: c, border: "1px solid", borderColor: "divider" }} />
          ))}
          <Typography variant="caption" sx={{ opacity: 0.8 }}>More</Typography>
        </Box>
      )}
    </Box>
  );
};

export default ContribHeatmap;
