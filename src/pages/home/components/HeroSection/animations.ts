/**
 * Animation variants for HeroSection components
 * Provides Framer Motion animation configurations for staggered entrance effects
 * @module pages/home/components/HeroSection/animations
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
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

/**
 * Item animation variant for text content elements
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
 * Image animation variant for profile picture
 * Creates fade-in with scale effect for dramatic entrance
 *
 * @constant
 * @type {Variants}
 */
export const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};
