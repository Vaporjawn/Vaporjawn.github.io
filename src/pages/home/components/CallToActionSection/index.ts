/**
 * CallToActionSection Module
 * Call-to-action section for homepage with projects and contact buttons
 * @module pages/home/components/CallToActionSection
 */

// Export main component (value export)
export { CallToActionSection } from "./CallToActionSection";

// Export subcomponents (value exports)
export { CTAButton } from "./CTAButton";
export { CTAButtons } from "./CTAButtons";

// Export types (type-only exports)
export type {
  CallToActionSectionProps,
  CTAButtonProps,
  CTAButtonsProps,
} from "./types";

// Export animation variants (value exports)
export {
  containerVariants,
  itemVariants,
  buttonVariants,
} from "./animations";
