/**
 * @module pages/contact
 * @description
 * Contact page barrel export providing centralized access to the Contact page
 * and all related types and constants.
 *
 * @example
 * ```tsx
 * import { ContactPage, ContactMethod, FAQ } from '@/pages/contact';
 * ```
 */

export { default as ContactPage } from "./contactPage";
export type { ContactMethod, FAQ } from "./types";
export { getContactMethods, FAQ_DATA } from "./constants.tsx";
