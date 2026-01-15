/**
 * HeroSection Module
 * Main hero banner for homepage with profile image, text content, and social links
 * @module pages/home/components/HeroSection
 */

// Export main component (value export)
export { HeroSection } from "./HeroSection";

// Export subcomponents (value exports)
export { HeroContent } from "./HeroContent";
export { HeroProfile } from "./HeroProfile";

// Export types (type-only exports)
export type {
  HeroSectionProps,
  HeroContentProps,
  HeroProfileProps,
} from "./types";

// Export animation variants (value exports)
export { containerVariants, itemVariants, imageVariants } from "./animations";
