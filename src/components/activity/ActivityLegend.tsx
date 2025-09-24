import React from "react";
import { Box, Typography, Stack } from "@mui/material";

interface LegendItem {
  label: string;
  glyph: string;
  description: string;
}

// Static legend definitions – keep in sync with CommitGraph KIND_LABELS and glyph switch.
const KIND_ITEMS: LegendItem[] = [
  { label: "Push", glyph: "⬆", description: "Code pushed to a repository" },
  { label: "PR Opened", glyph: "PR", description: "Pull request opened" },
  { label: "PR Merged", glyph: "M", description: "Pull request merged" },
  { label: "Release", glyph: "⛓", description: "Release / tag published" },
  { label: "Fork", glyph: "⑂", description: "Repository forked" },
  { label: "Star", glyph: "★", description: "Repository starred" },
  { label: "Issue Opened", glyph: "◻", description: "Issue created" },
  { label: "Issue Comment", glyph: "💬", description: "Issue or PR comment" },
  { label: "npm Publish", glyph: "📦", description: "Package version published to npm" },
];

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
