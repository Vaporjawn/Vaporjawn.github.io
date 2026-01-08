/**
 * Timeline utility functions for date formatting and data transformation
 *
 * Provides helpers for converting between different date formats and
 * transforming Experience data to TimelineEvent format for display.
 *
 * @module timelineUtils
 */
import type { Experience } from "../../../contexts/PortfolioContext";

/**
 * TimelineEvent interface for career timeline display
 */
export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  organization: string;
  description: string;
  type: "work" | "education" | "achievement";
  technologies?: string[];
}

/**
 * Formats a date string from YYYY-MM format to readable month abbreviation + year
 *
 * @param dateStr - Date string in YYYY-MM format (e.g., "2024-01")
 * @returns Formatted date string (e.g., "Jan 2024")
 *
 * @example
 * ```ts
 * formatMonth("2024-03") // Returns: "Mar 2024"
 * ```
 */
const formatMonth = (dateStr: string): string => {
  const [year, month] = dateStr.split('-');
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  return `${monthNames[parseInt(month) - 1]} ${year}`;
};

/**
 * Formats a date range for timeline display
 *
 * @param startDate - Start date in YYYY-MM format
 * @param endDate - End date in YYYY-MM format, or null for ongoing positions
 * @returns Formatted date range (e.g., "Jan 2022 - Present" or "Mar 2020 - Dec 2021")
 *
 * @example
 * ```ts
 * formatDateRange("2022-01", null) // Returns: "Jan 2022 - Present"
 * formatDateRange("2020-03", "2021-12") // Returns: "Mar 2020 - Dec 2021"
 * ```
 */
export const formatDateRange = (startDate: string, endDate: string | null): string => {
  const start = formatMonth(startDate);
  const end = endDate ? formatMonth(endDate) : 'Present';
  return `${start} - ${end}`;
};

/**
 * Converts Experience data from portfolio context to TimelineEvent format
 *
 * @param exp - Experience object from PortfolioContext
 * @returns TimelineEvent object ready for timeline display
 *
 * @example
 * ```ts
 * const experience = {
 *   id: "1",
 *   company: "Tech Corp",
 *   position: "Senior Developer",
 *   startDate: "2022-01",
 *   endDate: null,
 *   description: "Building awesome apps",
 *   technologies: ["React", "TypeScript"]
 * };
 *
 * const event = experienceToTimelineEvent(experience);
 * // Returns: {
 * //   id: "1",
 * //   date: "Jan 2022 - Present",
 * //   title: "Senior Developer",
 * //   organization: "Tech Corp",
 * //   description: "Building awesome apps",
 * //   type: "work",
 * //   technologies: ["React", "TypeScript"]
 * // }
 * ```
 */
export const experienceToTimelineEvent = (exp: Experience): TimelineEvent => {
  return {
    id: exp.id,
    date: formatDateRange(exp.startDate, exp.endDate),
    title: exp.position,
    organization: exp.company,
    description: exp.description,
    type: "work",
    technologies: exp.technologies,
  };
};
