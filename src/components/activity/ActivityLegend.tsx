/**
 * Activity Graph Legend
 * Displays legend explaining activity graph glyphs and event types
 * @module components/activity/ActivityLegend
 */

import React from "react";
import { Box, Typography, Stack } from "@mui/material";

import { KIND_ITEMS } from "./constants";

/**
 * Legend component for the activity graph
 * Explains the meaning of different event type glyphs and the lane structure
 */
export const ActivityLegend: React.FC = () => {
  return (
    <Box
      component="section"
      aria-labelledby="activity-legend-heading"
      id="activity-legend"
      sx={{
        mt: 3,
        p: 2,
        borderRadius: 2,
        border: theme => `1px solid ${theme.palette.divider}`,
  background: theme => theme.palette.mode === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
      }}
    >
      <Typography id="activity-legend-heading" variant="subtitle2" fontWeight={600} gutterBottom>
        Activity Graph Legend
      </Typography>
      <Typography variant="caption" component="p" sx={{ mb: 2, lineHeight: 1.4 }}>
        The first lane is the GitHub trunk. Each GitHub repository branches horizontally from the trunk on the row of its first visible event; connectors show the relationship. The separate <strong>npm</strong> lane lists package publish events. Hover or focus bubbles for details.
      </Typography>
      <Stack direction="row" flexWrap="wrap" spacing={1.5} useFlexGap>
        {KIND_ITEMS.map(item => (
          <Stack
            key={item.label}
            direction="row"
            spacing={0.75}
            alignItems="center"
            sx={{ minWidth: 140 }}
          >
            <Box
              aria-hidden
              sx={{
                width: 22,
                height: 22,
                borderRadius: "50%",
                bgcolor: "action.hover",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 700,
              }}
            >
              {item.glyph}
            </Box>
            <Box sx={{ fontSize: 11, lineHeight: 1.2 }}>
              <strong>{item.label}</strong>
              <Box component="span" sx={{ ml: 0.5, opacity: 0.65 }}>
                {item.description}
              </Box>
            </Box>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
};

export default ActivityLegend;
