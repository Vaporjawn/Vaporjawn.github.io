/**
 * GitKraken-inspired commit graph visualization
 * Groups events by repo/lane and displays chronologically
 * @module components/activity/CommitGraph
 */

import React, { useMemo } from "react";
import { Box, Tooltip, useTheme } from "@mui/material";

import type { CommitGraphEvent, CommitGraphProps, LaneInfo, Row } from "./types";

import {
  KIND_LABELS,
  LANE_WIDTH,
  LEFT_PAD,
  NODE_SIZE_BRANCH,
  NODE_SIZE_TRUNK,
  RADIUS_BRANCH,
  RADIUS_TRUNK,
} from "./constants";
import { colorForLane } from "./utils";

export const CommitGraph: React.FC<CommitGraphProps> = ({
  events,
  maxRepos = 12,
  heightPerNode = 46,
  legendId = "activity-legend",
  orientation = "desc",
  showDates = true
}) => {
  const theme = useTheme();

  // Enhanced lane & row construction with optional date grouping & orientation.
  const { lanes, rows, trunkLane, accessibleList } = useMemo(() => {
    if (!events.length) {
      return { lanes: [] as LaneInfo[], rows: [] as Row[], trunkLane: undefined as LaneInfo | undefined, accessibleList: [] as string[] };
    }

    const sorted = [...events].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()); // oldest->newest
    if (orientation === "desc") sorted.reverse(); // newest->oldest if desc (top to bottom)

    // Distinct GitHub repos (first appearance order in the chosen orientation list).
    const githubRepoOrder: string[] = [];
    const otherLaneOrder: string[] = [];
    const otherLaneSet = new Set<string>();

    sorted.forEach(evt => {
      if (evt.lane === "GitHub" && evt.repo) {
        if (!githubRepoOrder.includes(evt.repo)) githubRepoOrder.push(evt.repo);
      } else if (evt.lane && evt.lane !== "GitHub") {
        if (!otherLaneSet.has(evt.lane)) { otherLaneSet.add(evt.lane); otherLaneOrder.push(evt.lane); }
      }
    });

    const laneOrder: string[] = ["GitHub", ...githubRepoOrder, ...otherLaneOrder];
    const laneMap = new Map<string, LaneInfo>();
    laneOrder.slice(0, maxRepos).forEach((label, idx) => laneMap.set(label, { label, color: colorForLane(idx), index: idx }));
    const trunk = laneMap.get("GitHub")!;

    // Build rows: optionally insert date header rows before first event of each day (based on orientation order).
    const rows: Row[] = [];
    let lastDate: string | undefined;
    sorted.forEach((evt) => {
      const date = evt.createdAt.slice(0, 10); // YYYY-MM-DD
      if (showDates && date !== lastDate) {
        rows.push({ type: "date", date });
        lastDate = date;
      }
      let laneKey: string;
      if (evt.lane === "GitHub" && evt.repo) laneKey = evt.repo;
      else if (evt.lane === "GitHub") laneKey = "GitHub";
      else laneKey = evt.lane || evt.repo || "Misc";
      rows.push({ type: "event", evt, laneKey, lane: laneMap.get(laneKey) });
    });

    const accessibleList = rows.filter(r => r.type === "event").map(r => {
      const e = (r as Extract<Row, { type: "event" }>).evt; const lane = (r as Extract<Row, { type: "event" }>).laneKey;
      return `${e.createdAt} – ${lane}: ${e.message}`;
    });

    return { lanes: laneOrder.slice(0, maxRepos).map(l => laneMap.get(l)!), rows, trunkLane: trunk, accessibleList };
  }, [events, maxRepos, orientation, showDates]);

  const totalHeight = rows.length * heightPerNode + 16;

  return (
    <Box sx={{ position: "relative", width: "100%", overflowX: "auto", py: 2 }}>
      {/* Lanes header */}
      <Box sx={{ display: "flex", flexDirection: "row", pl: LEFT_PAD, mb: 1 }}>
        {lanes.map(l => {
          const isTrunk = l.label === "GitHub";
          return (
            <Box key={l.label} sx={{ width: LANE_WIDTH, mr: 3, textAlign: "center", fontSize: 10, color: l.color, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontWeight: isTrunk ? 700 : 500, position: "relative", "&:after": isTrunk ? { content: "\"trunk\"", position: "absolute", left: 0, right: 0, top: "100%", fontSize: 8, letterSpacing: 0.5, opacity: 0.55 } : undefined }} title={l.label.split("/").pop()}>
              {l.label === "GitHub" ? "GitHub" : l.label.split("/").pop()}
            </Box>
          );
        })}
      </Box>
      <Box sx={{ position: "relative", height: totalHeight, pl: LEFT_PAD }}>
        {/* Vertical trunk line */}
        {trunkLane && (
          <Box sx={{ position: "absolute", left: trunkLane.index * (LANE_WIDTH + 12) + LANE_WIDTH / 2, top: 0, bottom: 0, width: 2, bgcolor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.18)" }} />
        )}
        {/* Rows (date headers + events) */}
        {rows.map((r, rowIndex) => {
          const yCenter = rowIndex * heightPerNode + 8;
          if (r.type === "date") {
            return (
              <Box key={`date-${r.date}-${rowIndex}`} sx={{ position: "absolute", left: 0, top: yCenter - 10, height: heightPerNode, display: "flex", alignItems: "center", fontSize: 11, fontWeight: 600, color: "text.secondary" }}>
                {r.date}
              </Box>
            );
          }
          if (!r.evt) return null;
          const { lane } = r;
          const trunkX = trunkLane ? trunkLane.index * (LANE_WIDTH + 12) + LANE_WIDTH / 2 : 0;
          const laneX = lane ? lane.index * (LANE_WIDTH + 12) + LANE_WIDTH / 2 : trunkX;
          // Determine icon glyph based on kind
          const kindGlyph = (() => {
            switch (r.evt!.kind) {
              case "push": return "⬆";
              case "pr-open": return "PR";
              case "pr-merge": return "M";
              case "release": return "⛓";
              case "fork": return "⑂";
              case "star": return "★";
              case "issue-open": return "◻";
              case "issue-comment": return "💬";
              case "npm-publish": return "📦";
              default: return "●";
            }
          })();
          const humanKind = KIND_LABELS[r.evt.kind] || (r.evt.kind.charAt(0).toUpperCase() + r.evt.kind.slice(1));
          const isTrunkEvent = lane?.label === "GitHub";
          return (
            <React.Fragment key={r.evt.id}>
              {/* Horizontal connector for branch events */}
              {!isTrunkEvent && (
                <Box sx={{ position: "absolute", left: Math.min(trunkX, laneX), top: yCenter, width: Math.abs(laneX - trunkX), height: 2, bgcolor: lane?.color || "divider", opacity: 0.55, pointerEvents: "none" }} />
              )}
              {/* Trunk node */}
              {trunkLane && (
                <Box sx={{ position: "absolute", left: trunkX - RADIUS_TRUNK, top: yCenter - RADIUS_TRUNK, width: NODE_SIZE_TRUNK, height: NODE_SIZE_TRUNK, borderRadius: "50%", backgroundColor: theme.palette.background.paper, border: `2px solid ${theme.palette.divider}`, boxSizing: "border-box", pointerEvents: "none", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 600, color: "text.secondary" }} aria-hidden="true">
                  {/* tiny bullet could show order index if desired */}
                </Box>
              )}
              {/* Branch or trunk event node */}
              <Tooltip title={`${r.evt.message}\n${humanKind} • ${(r.evt.repo || r.evt.lane || "GitHub")}`}>
                <Box component={r.evt.url ? "a" : "div"} href={r.evt.url} target={r.evt.url ? "_blank" : undefined} rel={r.evt.url ? "noopener noreferrer" : undefined} aria-label={`${humanKind} event in ${(r.evt.repo || r.evt.lane || "GitHub")} : ${r.evt.message}`} aria-describedby={legendId} tabIndex={0} sx={{ position: "absolute", left: laneX - (isTrunkEvent ? RADIUS_TRUNK : RADIUS_BRANCH), top: yCenter - (isTrunkEvent ? RADIUS_TRUNK : RADIUS_BRANCH), width: isTrunkEvent ? NODE_SIZE_TRUNK : NODE_SIZE_BRANCH, height: isTrunkEvent ? NODE_SIZE_TRUNK : NODE_SIZE_BRANCH, borderRadius: "50%", backgroundColor: isTrunkEvent ? theme.palette.primary.main : (lane?.color || theme.palette.secondary.main), color: theme.palette.getContrastText(isTrunkEvent ? theme.palette.primary.main : (lane?.color || theme.palette.secondary.main)), fontSize: isTrunkEvent ? 9 : 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", boxShadow: (t) => `0 0 0 2px ${t.palette.background.default}, 0 3px 6px rgba(0,0,0,0.45)`, transition: "transform .15s, box-shadow .15s", "&:hover": { transform: "scale(1.15)" }, "&:focus-visible": { outline: "2px solid #fff", outlineOffset: 3, transform: "scale(1.15)" } }}>
                  {kindGlyph}
                </Box>
              </Tooltip>
              {/* Label to right of farthest node */}
              <Box sx={{ position: "absolute", left: Math.max(laneX, trunkX) + (isTrunkEvent ? RADIUS_TRUNK : RADIUS_BRANCH) + 10, top: yCenter - (isTrunkEvent ? RADIUS_TRUNK : RADIUS_BRANCH) + 2, minHeight: (isTrunkEvent ? NODE_SIZE_TRUNK : NODE_SIZE_BRANCH) - 4, display: "flex", alignItems: "center", fontSize: 12, pr: 2, maxWidth: `calc(100% - ${Math.max(laneX, trunkX) + (isTrunkEvent ? RADIUS_TRUNK : RADIUS_BRANCH) + 32}px)`, color: "text.secondary", lineHeight: 1.2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", pointerEvents: "none" }} aria-hidden="true">
                {r.evt.message}
                <Box component="span" sx={{ ml: 0.75, opacity: 0.55, fontSize: 11 }}>({humanKind})</Box>
              </Box>
            </React.Fragment>
          );
        })}
        {/* Accessible offscreen list of events for screen readers */}
        <Box component="ol" aria-label="Activity chronological list" sx={{ position: "absolute", left: -9999, width: 1, height: 1, overflow: "hidden", p: 0, m: 0 }}>
          {accessibleList.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default CommitGraph;
