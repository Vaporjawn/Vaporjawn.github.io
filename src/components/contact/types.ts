/**
 * @module components/contact/types
 * @description
 * Type definitions for ContactForm component.
 *
 * @example
 * ```tsx
 * import type { ContactFormData } from './types';
 * ```
 */

/**
 * Contact form data interface
 *
 * @interface ContactFormData
 */
export interface ContactFormData {
  /**
   * Contact person's full name
   * @type {string}
   */
  name: string;

  /**
   * Contact person's email address
   * @type {string}
   */
  email: string;

  /**
   * Email subject line
   * @type {string}
   */
  subject: string;

  /**
   * Type of project (web-development, mobile-app, etc.)
   * @type {string}
   */
  projectType: string;

  /**
   * Budget range for the project
   * @type {string}
   */
  budget: string;

  /**
   * Expected project timeline
   * @type {string}
   */
  timeline: string;

  /**
   * Detailed project description
   * @type {string}
   */
  message: string;
}
