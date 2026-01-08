/**
 * Utility functions for Activity components
 * @module components/activity/utils
 */

import { PALETTE } from "./constants";

/**
 * Convert a timestamp to relative time description
 * Lightweight helper for displaying relative time (minutes / hours / days / weeks)
 * For dates older than ~30 days, returns a short locale date string
 *
 * @param input - Timestamp as string, number, or Date object
 * @returns Human-readable relative time string
 *
 * @example
 * relativeTime(new Date(Date.now() - 1000 * 60 * 5)); // "5m ago"
 *
 * @example
 * relativeTime(new Date(Date.now() - 1000 * 60 * 60 * 3)); // "3h ago"
 *
 * @example
 * relativeTime(new Date(Date.now() - 1000 * 60 * 60 * 24 * 2)); // "2d ago"
 */
export function relativeTime(input: string | number | Date): string {
  try {
    const date = new Date(input);
    const now = Date.now();
    let diffMs = now - date.getTime();
    const future = diffMs < 0;
    diffMs = Math.abs(diffMs);

    const sec = Math.floor(diffMs / 1000);
    if (sec < 45) return future ? "in a few sec" : "just now";
    const min = Math.floor(sec / 60);
    if (min < 60) return future ? `in ${min}m` : `${min}m ago`;
    const hr = Math.floor(min / 60);
    if (hr < 24) return future ? `in ${hr}h` : `${hr}h ago`;
    const day = Math.floor(hr / 24);
    if (day < 7) return future ? `in ${day}d` : `${day}d ago`;
    const week = Math.floor(day / 7);
    if (week < 5) return future ? `in ${week}w` : `${week}w ago`;

    // Fallback to short date for older items
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: new Date().getFullYear() === date.getFullYear() ? undefined : "numeric",
    });
  } catch {
    return "";
  }
}

/**
 * Get a color for a given lane index
 * Cycles through the PALETTE array for consistent lane colors
 *
 * @param index - Lane index (0-based)
 * @returns Hex color string
 *
 * @example
 * colorForLane(0); // "#14b8a6" (teal)
 *
 * @example
 * colorForLane(8); // "#14b8a6" (wraps back to first color)
 */
export function colorForLane(index: number): string {
  return PALETTE[index % PALETTE.length];
}
