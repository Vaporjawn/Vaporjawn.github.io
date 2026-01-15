/**
 * Type definitions for SkillsSection
 * @module pages/home/components/SkillsSection/types
 */

/**
 * Individual skill data structure
 *
 * @interface Skill
 * @property {string} name - Display name of the skill
 * @property {number} level - Proficiency level (0-100)
 * @property {string} category - Skill category classification
 */
export interface Skill {
  name: string;
  level: number;
  category: string;
}

/**
 * Skills data organized by category
 *
 * @interface SkillsData
 * @property {Skill[]} frontend - Frontend technologies and frameworks
 * @property {Skill[]} backend - Backend languages and frameworks
 * @property {Skill[]} tools - Development tools and utilities
 * @property {Skill[]} database - Database technologies
 * @property {Skill[]} cloud - Cloud platforms and services
 * @property {Skill[]} mobile - Mobile development frameworks
 * @property {Skill[]} architecture - Architecture patterns and design
 * @property {Skill[]} business - Business and soft skills
 * @property {Skill[]} security - Security and cybersecurity skills
 * @property {Skill[]} leadership - Leadership and management skills
 */
export interface SkillsData {
  frontend: Skill[];
  backend: Skill[];
  tools: Skill[];
  database: Skill[];
  cloud: Skill[];
  mobile: Skill[];
  architecture: Skill[];
  business: Skill[];
  security: Skill[];
  leadership: Skill[];
}

/**
 * Props interface for main SkillsSection component
 *
 * @interface SkillsSectionProps
 * @property {SkillsData} [skills] - Skills data organized by category (optional)
 */
export interface SkillsSectionProps {
  /** Skills data organized by category; defaults to empty arrays if not provided */
  skills?: SkillsData;
}

/**
 * Props interface for SkillCategory component
 *
 * @interface SkillCategoryProps
 * @property {string} title - Category display title
 * @property {Skill[]} skills - Array of skills in this category
 */
export interface SkillCategoryProps {
  /** Display title for the skill category */
  title: string;
  /** Array of skills to display in this category */
  skills: Skill[];
}

/**
 * Props interface for SkillChip component
 *
 * @interface SkillChipProps
 * @property {string} name - Skill name to display
 * @property {number} [index] - Optional index for staggered animation delay
 */
export interface SkillChipProps {
  /** Skill name to display on the chip */
  name: string;
  /** Optional index for animation delay calculations */
  index?: number;
}
