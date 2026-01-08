/**
 * Activity Module Exports
 * Barrel file for all activity-related components, types, utilities, and constants
 * @module components/activity
 */

// Type exports
export type {
  CommitGraphEvent,
  CommitGraphProps,
  GitHubSectionProps,
  LaneInfo,
  LegendItem,
  NpmSectionProps,
  Row,
} from "./types";

// Constant exports
export {
  GITHUB_PROFILE_URL,
  KIND_ITEMS,
  KIND_LABELS,
  LANE_WIDTH,
  LEFT_PAD,
  NODE_SIZE_BRANCH,
  NODE_SIZE_TRUNK,
  NPM_PROFILE_URL,
  PALETTE,
  RADIUS_BRANCH,
  RADIUS_TRUNK,
} from "./constants";

// Utility exports
export { colorForLane, relativeTime } from "./utils";

// Component exports
export { ActivityLegend } from "./ActivityLegend";
export { CommitGraph } from "./CommitGraph";
export { GitHubSection } from "./GitHubSection";
export { NpmSection } from "./NpmSection";
