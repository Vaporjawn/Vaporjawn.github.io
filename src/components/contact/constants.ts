/**
 * @module components/contact/constants
 * @description
 * Constants and configuration data for ContactForm component.
 * Contains dropdown options for project type, budget range, and timeline.
 *
 * @example
 * ```tsx
 * import { PROJECT_TYPE_OPTIONS, BUDGET_RANGE_OPTIONS, TIMELINE_OPTIONS } from './constants';
 * ```
 */

import type { ContactFormData } from "./types";

/**
 * Project type dropdown options
 *
 * @constant {Array<{value: string, label: string}>}
 *
 * @example
 * ```tsx
 * <Select>
 *   {PROJECT_TYPE_OPTIONS.map(option => (
 *     <MenuItem key={option.value} value={option.value}>
 *       {option.label}
 *     </MenuItem>
 *   ))}
 * </Select>
 * ```
 */
export const PROJECT_TYPE_OPTIONS = [
  { value: "web-development", label: "Web Development" },
  { value: "mobile-app", label: "Mobile App" },
  { value: "full-stack", label: "Full Stack Application" },
  { value: "consulting", label: "Consulting" },
  { value: "maintenance", label: "Maintenance & Support" },
  { value: "other", label: "Other" },
] as const;

/**
 * Budget range dropdown options
 *
 * @constant {Array<{value: string, label: string}>}
 *
 * @example
 * ```tsx
 * <Select>
 *   {BUDGET_RANGE_OPTIONS.map(option => (
 *     <MenuItem key={option.value} value={option.value}>
 *       {option.label}
 *     </MenuItem>
 *   ))}
 * </Select>
 * ```
 */
export const BUDGET_RANGE_OPTIONS = [
  { value: "less-than-5k", label: "Less than $5,000" },
  { value: "5k-10k", label: "$5,000 - $10,000" },
  { value: "10k-25k", label: "$10,000 - $25,000" },
  { value: "25k-50k", label: "$25,000 - $50,000" },
  { value: "50k-plus", label: "$50,000+" },
  { value: "not-sure", label: "Not Sure" },
] as const;

/**
 * Timeline dropdown options
 *
 * @constant {Array<{value: string, label: string}>}
 *
 * @example
 * ```tsx
 * <Select>
 *   {TIMELINE_OPTIONS.map(option => (
 *     <MenuItem key={option.value} value={option.value}>
 *       {option.label}
 *     </MenuItem>
 *   ))}
 * </Select>
 * ```
 */
export const TIMELINE_OPTIONS = [
  { value: "asap", label: "ASAP" },
  { value: "1-3-months", label: "1-3 Months" },
  { value: "3-6-months", label: "3-6 Months" },
  { value: "6-plus-months", label: "6+ Months" },
  { value: "flexible", label: "Flexible" },
] as const;

/**
 * Default form values
 *
 * Initial state for all form fields.
 *
 * @constant {ContactFormData}
 *
 * @example
 * ```tsx
 * const { control } = useForm<ContactFormData>({
 *   defaultValues: DEFAULT_FORM_VALUES
 * });
 * ```
 */
export const DEFAULT_FORM_VALUES: ContactFormData = {
  name: "",
  email: "",
  subject: "",
  projectType: "",
  budget: "",
  timeline: "",
  message: "",
};

/**
 * Form submission endpoint configuration
 *
 * Gets endpoint URL from environment variable or falls back to placeholder.
 *
 * @constant {string}
 *
 * @example
 * ```tsx
 * const response = await fetch(FORM_ENDPOINT, {
 *   method: 'POST',
 *   body: JSON.stringify(data)
 * });
 * ```
 */
export const FORM_ENDPOINT =
  import.meta.env.VITE_FORM_ENDPOINT ||
  "https://formspree.io/f/your-form-id";

/**
 * Toast notification configurations
 *
 * @constant {Object}
 */
export const TOAST_CONFIG = {
  /**
   * Success toast configuration
   */
  success: {
    message: "Thank you! I'll get back to you within 24-48 hours.",
    duration: 4000,
    position: "top-center" as const,
    style: {
      background: "#10b981",
      color: "#fff",
      fontWeight: 600,
    },
  },
  /**
   * Error toast configuration
   */
  error: {
    message:
      "Something went wrong. Please try again or email me directly.",
    duration: 5000,
    position: "top-center" as const,
    style: {
      background: "#ef4444",
      color: "#fff",
      fontWeight: 600,
    },
  },
} as const;
