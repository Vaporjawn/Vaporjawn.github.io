/**
 * SkillsSection Module
 * Technical skills display section for homepage with category organization
 * @module pages/home/components/SkillsSection
 */

// Export types (type-only imports)
export type {
  Skill,
  SkillsData,
  SkillsSectionProps,
  SkillCategoryProps,
  SkillChipProps,
} from "./types";

// Export animation variants (value exports)
export { containerVariants, itemVariants, chipVariants } from "./animations";

// Export components (value exports, alphabetically ordered)
export { SkillCategory } from "./SkillCategory";
export { SkillChip } from "./SkillChip";
export { SkillsSection } from "./SkillsSection";
