/**
 * Type definitions for CallToActionSection
 * @module pages/home/components/CallToActionSection/types
 */

/**
 * Props interface for CallToActionSection component
 *
 * @interface CallToActionSectionProps
 * @property {string} background - Background CSS string with gradient and images for parallax effect
 * @property {string} [email] - Email address for contact button (optional)
 */
export interface CallToActionSectionProps {
  /** Background CSS string matching hero section for visual consistency */
  background: string;
  /** Email address for the contact button */
  email?: string;
}

/**
 * Props interface for CTAButton component
 *
 * @interface CTAButtonProps
 */
export interface CTAButtonProps {
  /** Button label text */
  label: string;
  /** Button variant (contained or outlined) */
  variant: "contained" | "outlined";
  /** Internal route path (e.g., "/projects") or undefined for external links */
  to?: string;
  /** External href (e.g., "mailto:email@example.com") or undefined for internal navigation */
  href?: string;
  /** Optional click handler for custom behavior */
  onClick?: () => void;
}

/**
 * Props interface for CTAButtons group component
 *
 * @interface CTAButtonsProps
 */
export interface CTAButtonsProps {
  /** Email address for contact button mailto link */
  email?: string;
}
