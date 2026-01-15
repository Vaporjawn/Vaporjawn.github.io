/**
 * Animation variants for SkillsSection components
 * Provides Framer Motion animation configurations for staggered entrance effects
 * @module pages/home/components/SkillsSection/animations
 */

import { Variants } from "framer-motion";

/**
 * Container animation variant for parent wrapper
 * Orchestrates staggered children animations with delayed start
 *
 * @constant
 * @type {Variants}
 */
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

/**
 * Item animation variant for category sections
 * Creates fade-in with upward slide effect
 *
 * @constant
 * @type {Variants}
 */
export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

/**
 * Chip animation variant for individual skill chips
 * Creates fade-in with slight scale effect for subtle entrance
 *
 * @constant
 * @type {Variants}
 */
export const chipVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};
