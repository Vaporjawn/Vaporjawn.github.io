/**
 * Type definitions for Activity components
 * @module components/activity/types
 */

/**
 * Generic activity event for the CommitGraph
 * Represents both GitHub events and synthetic npm publish events
 */
export interface CommitGraphEvent {
  /** Unique identifier for the event */
  id: string;
  /** ISO timestamp when the event occurred */
  createdAt: string;
  /** Human-readable message describing the event */
  message: string;
  /** Optional URL to the event (PR, commit, release, etc.) */
  url?: string;
  /** Type of event (push, pr-open, npm-publish, etc.) */
  kind: string;
  /** Optional repository name (legacy GitHub specific) */
  repo?: string;
  /** Lane label - overrides repo grouping (e.g., "GitHub" or "npm") */
  lane?: string;
}

/**
 * Props for the CommitGraph component
 */
export interface CommitGraphProps {
  /** Array of activity events to display */
  events: CommitGraphEvent[];
  /** Maximum distinct lanes to display (default: 12) */
  maxRepos?: number;
  /** Vertical space per row in pixels (default: 46) */
  heightPerNode?: number;
  /** Optional legend element id for accessibility (default: 'activity-legend') */
  legendId?: string;
  /** Orientation: 'desc' newest at top (default) or 'asc' oldest at top */
  orientation?: "asc" | "desc";
  /** Show date grouping header rows (default: true) */
  showDates?: boolean;
}

/**
 * Information about a lane in the commit graph
 */
export interface LaneInfo {
  /** Display label for the lane (repo name or lane override) */
  label: string;
  /** Color assigned to this lane */
  color: string;
  /** Index position of the lane */
  index: number;
}

/**
 * Row types for the commit graph
 * Can be either a date header or an event node
 */
export type Row =
  | { type: "date"; date: string }
  | { type: "event"; evt: CommitGraphEvent; laneKey: string; lane?: LaneInfo };

/**
 * Legend item definition for activity types
 */
export interface LegendItem {
  /** Display label for the legend item */
  label: string;
  /** Visual glyph/icon representing this event type */
  glyph: string;
  /** Description of what this event type means */
  description: string;
}

/**
 * Props for the NpmSection component
 */
export interface NpmSectionProps {
  /** Array of npm packages to display */
  packages: Array<{
    name: string;
    version: string;
    description?: string;
    publishedAt?: string;
    npmUrl?: string;
    weeklyDownloads?: number;
  }>;
  /** Loading state indicator */
  loading: boolean;
  /** Error message if fetch failed */
  error: string | null;
  /** Function to refresh npm package data */
  refresh: () => void;
  /** URL to the npm profile page */
  profileUrl: string;
}

/**
 * Props for the GitHubSection component
 */
export interface GitHubSectionProps {
  /** Unified array of GitHub and npm events */
  events: CommitGraphEvent[];
  /** Loading state indicator */
  loading: boolean;
  /** Error message if fetch failed */
  error: string | null;
  /** Function to refresh GitHub activity data */
  refresh: () => void;
  /** Current view mode: 'graph' or 'list' */
  view: "graph" | "list";
  /** Callback when view mode changes */
  onViewChange: (view: "graph" | "list" | null) => void;
  /** URL to the GitHub profile page */
  profileUrl: string;
  /** Maximum distinct lanes/repos to display in graph (default: 12) */
  maxRepos?: number;
  /** Vertical space per row in pixels (default: 46) */
  heightPerNode?: number;
}
