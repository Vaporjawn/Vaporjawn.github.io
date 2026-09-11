/**
 * @module pages/home/components/HeroSection/HeroContent
 * @description
 * Text content section subcomponent for HeroSection.
 * Displays name, professional title, bio, and social media links with staggered animations.
 *
 * @example
 * ```tsx
 * import { HeroContent } from './HeroContent';
 *
 * <HeroContent
 *   name="Victor Williams"
 *   title="Senior Full Stack Software Engineer"
 *   bio="Senior Full Stack Software Engineer with 9+ years building and leading full-stack platforms across fintech, legal tech, and marketplace industries."
 * />
 * ```
 */

import React from "react";
import { motion } from "framer-motion";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import SocialMedia from "../../../../components/socials/socialMedia";
import type { HeroContentProps } from "./types";
import { containerVariants, itemVariants } from "./animations";

/**
 * HeroContent Component
 *
 * Displays the text content section with name, title, bio, and social links.
 * Features staggered entrance animations for sequential reveal of content.
 *
 * @component
 * @param {HeroContentProps} props - Component props
 * @param {string} props.name - User's full name to display as main heading
 * @param {string} props.title - Professional title or tagline
 * @param {string} props.bio - Brief biographical description
 * @returns {JSX.Element} Rendered content section
 *
 * @example
 * ```tsx
 * <HeroContent
 *   name="JOHN DOE"
 *   title="FULL STACK DEVELOPER"
 *   bio="Building amazing web experiences"
 * />
 * ```
 */
export const HeroContent: React.FC<HeroContentProps> = ({
  name,
  title,
  bio,
}) => {
  const theme = useTheme();

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <motion.div variants={itemVariants}>
        <Typography
          variant="h1"
          component="h1"
          sx={{
            // clamp() scales continuously with viewport width so a narrow
            // phone isn't stuck with the same size as a 599px-wide one.
            fontSize: "clamp(1.9rem, 7vw, 3.4rem)",
            fontWeight: 800,
            letterSpacing: "-1px",
            lineHeight: 1.1,
            mb: "clamp(0.75rem, 3vw, 1rem)",
            position: "relative",
            zIndex: 10,
            color: theme.palette.primary.main,
            background: `linear-gradient(60deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textTransform: "uppercase",
          }}
        >
          {name}
        </Typography>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Typography
          variant="h2"
          component="h2"
          sx={{
            fontSize: "clamp(0.95rem, 3.5vw, 1.35rem)",
            fontWeight: 600,
            mb: "clamp(1rem, 3vw, 1.5rem)",
            letterSpacing: 2,
            position: "relative",
            zIndex: 10,
            color:
              theme.palette.mode === "dark"
                ? theme.palette.grey[100]
                : theme.palette.text.primary,
            textTransform: "uppercase",
          }}
        >
          {title}
        </Typography>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Typography
          variant="body1"
          sx={{
            fontSize: "clamp(0.9rem, 3vw, 1.15rem)",
            lineHeight: 1.55,
            mb: "clamp(1.25rem, 4vw, 2rem)",
            maxWidth: "640px",
            position: "relative",
            zIndex: 10,
            color:
              theme.palette.mode === "dark"
                ? theme.palette.grey[200]
                : theme.palette.text.secondary,
            // The full bio runs ~450 characters — plenty of room on desktop,
            // but on the narrowest phones (≲340px) it wraps to 12-13 lines
            // and single-handedly pushes the social links below the first
            // screenful, forcing a scroll just to reach them. Clamping to 5
            // lines there (full text stays intact everywhere else — the
            // About page and footer both show it unclamped) keeps the hero
            // itself compact without cutting the bio anywhere it already fit.
            "@media (max-width: 340px)": {
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 5,
              overflow: "hidden",
            },
          }}
        >
          {bio}
        </Typography>
      </motion.div>

      <motion.div
        variants={itemVariants}
        style={{ position: "relative", zIndex: 10 }}
      >
        <SocialMedia />
      </motion.div>
    </motion.div>
  );
};
