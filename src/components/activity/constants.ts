/**
 * Constants for Activity components
 * Static data for colors, labels, and legend definitions
 * @module components/activity/constants
 */

import type { LegendItem } from "./types";

/**
 * Color palette for commit graph lanes
 * Provides distinct colors for different repositories/lanes
 */
export const PALETTE = [
  "#14b8a6", // teal
  "#6366f1", // indigo
  "#f59e0b", // amber
  "#ec4899", // pink
  "#0ea5e9", // sky
  "#84cc16", // lime
  "#f43f5e", // rose
  "#8b5cf6", // violet
];

/**
 * Human-readable labels for activity event kinds
 * Maps event kind strings to display labels
 */
export const KIND_LABELS: Record<string, string> = {
  push: "Push",
  "pr-open": "PR Opened",
  "pr-merge": "PR Merged",
  release: "Release",
  fork: "Fork",
  star: "Star",
  "issue-open": "Issue Opened",
  "issue-comment": "Issue Comment",
  "npm-publish": "npm Publish",
};

/**
 * Legend items for activity graph
 * Defines glyphs and descriptions for each activity type
 * Keep in sync with CommitGraph KIND_LABELS and glyph rendering
 */
export const KIND_ITEMS: LegendItem[] = [
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

/**
 * Default npm profile URL
 * Can be overridden in component props
 */
export const NPM_PROFILE_URL = "https://www.npmjs.com/~vaporjawn";

/**
 * Default GitHub profile URL
 */
export const GITHUB_PROFILE_URL = "https://github.com/Vaporjawn";

/**
 * Graph node sizes (in pixels)
 */
export const NODE_SIZE_BRANCH = 30;
export const NODE_SIZE_TRUNK = 16;
export const RADIUS_BRANCH = NODE_SIZE_BRANCH / 2;
export const RADIUS_TRUNK = NODE_SIZE_TRUNK / 2;

/**
 * Graph layout constants
 */
export const LANE_WIDTH = 36; // horizontal allocation per lane
export const LEFT_PAD = 52; // space for date labels + axis
