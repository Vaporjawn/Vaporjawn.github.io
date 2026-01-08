/**
 * @module components/contact
 * @description
 * Barrel export for contact form components and utilities.
 *
 * @example
 * ```tsx
 * import { ContactForm } from './components/contact';
 * import type { ContactFormData } from './components/contact';
 * ```
 */

export { default as ContactForm } from "./ContactForm";
export { ContactSection } from "./ContactSection";

export type { ContactFormData } from "./types";
export { contactFormSchema } from "./validation";
export {
  PROJECT_TYPE_OPTIONS,
  BUDGET_RANGE_OPTIONS,
  TIMELINE_OPTIONS,
  DEFAULT_FORM_VALUES,
  FORM_ENDPOINT,
  TOAST_CONFIG,
} from "./constants";
