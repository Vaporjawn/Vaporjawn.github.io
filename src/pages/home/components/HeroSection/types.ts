/**
 * Type definitions for HeroSection
 * @module pages/home/components/HeroSection/types
 */

/**
 * Props interface for HeroSection component
 *
 * @interface HeroSectionProps
 * @property {string} background - Background CSS string with gradient and images for parallax effect
 */
export interface HeroSectionProps {
  /** Background image URL or gradient configuration for parallax effect */
  background: string;
}

/**
 * Props interface for HeroProfile component
 *
 * @interface HeroProfileProps
 */
export interface HeroProfileProps {
  /** Alternative text for profile image (accessibility) */
  alt: string;
  /** Profile image source URL (JPEG/PNG fallback for older browsers) */
  src: string;
  /** Optional WebP source. When provided, the image is wrapped in a <picture> element
   *  so browsers that support WebP receive the smaller file. */
  srcWebP?: string;
}

/**
 * Props interface for HeroContent component
 *
 * @interface HeroContentProps
 */
export interface HeroContentProps {
  /** User's full name to display as main heading */
  name: string;
  /** Professional title or tagline */
  title: string;
  /** Brief biographical description or introduction */
  bio: string;
}
