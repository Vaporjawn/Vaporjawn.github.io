/**
 * Footer Constants
 * Static data for footer navigation, services, and legal links
 * @module components/footer/constants
 */

/**
 * Navigation link configuration
 */
export interface NavLink {
  /** Display label for the link */
  label: string;
  /** Route path */
  path: string;
}

/**
 * Quick navigation links displayed in footer
 * Links to main sections of the application
 */
export const quickLinks: NavLink[] = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Projects", path: "/projects" },
  { label: "Blog", path: "/blog" },
  { label: "Resume", path: "/resume" },
  { label: "Activity", path: "/activity" },
];

/**
 * Service offerings displayed in footer
 * Highlights key technical capabilities
 */
export const services: string[] = [
  "Web Development",
  "React Development",
  "TypeScript Solutions",
  "UI/UX Design",
  "Portfolio Development",
];

/**
 * Legal and informational links displayed in footer
 * Links to policies and frequently asked questions
 */
export const legalLinks: NavLink[] = [
  { label: "FAQs", path: "/contact#faq" },
  { label: "Privacy Policy", path: "/privacy" },
  { label: "Terms of Service", path: "/terms" },
];
