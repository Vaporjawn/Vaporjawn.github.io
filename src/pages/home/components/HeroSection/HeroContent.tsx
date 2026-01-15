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
 *   name="VICTOR WILLIAMS"
 *   title="SOFTWARE DEVELOPER & DIGITAL CREATIVE"
 *   bio="Passionate developer creating innovative digital experiences with modern web technologies."
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
            fontSize: { xs: "2.4rem", md: "3.4rem" },
            fontWeight: 800,
            letterSpacing: "-1px",
            lineHeight: 1.1,
            mb: 2,
            position: "relative",
            zIndex: 10,
            color: theme.palette.primary.main,
            background: `linear-gradient(60deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
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
            fontSize: { xs: "1.1rem", md: "1.35rem" },
            fontWeight: 600,
            mb: 3,
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
            fontSize: { xs: "1rem", md: "1.15rem" },
            lineHeight: 1.55,
            mb: 4,
            maxWidth: "640px",
            position: "relative",
            zIndex: 10,
            color:
              theme.palette.mode === "dark"
                ? theme.palette.grey[200]
                : theme.palette.text.secondary,
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
