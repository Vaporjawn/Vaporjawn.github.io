/**
 * @module pages/home/components/HeroSection/HeroProfile
 * @description
 * Profile image section subcomponent for HeroSection.
 * Displays optimized profile image with Framer Motion animation and hover effects.
 *
 * @example
 * ```tsx
 * import { HeroProfile } from './HeroProfile';
 *
 * <HeroProfile
 *   src={profileImage}
 *   alt="Victor Williams - Software Engineer"
 * />
 * ```
 */

import React from "react";
import { motion } from "framer-motion";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import OptimizedImage from "../../../../components/OptimizedImage/OptimizedImage";
import type { HeroProfileProps } from "./types";
import { imageVariants } from "./animations";

/**
 * HeroProfile Component
 *
 * Displays the profile image section with animation effects.
 * Features fade-in scale animation on mount and subtle scale effect on hover.
 *
 * @component
 * @param {HeroProfileProps} props - Component props
 * @param {string} props.src - Profile image source URL
 * @param {string} props.alt - Alternative text for accessibility
 * @returns {JSX.Element} Rendered profile image section
 *
 * @example
 * ```tsx
 * <HeroProfile
 *   src="/assets/profile.jpg"
 *   alt="John Doe - Software Engineer"
 * />
 * ```
 */
export const HeroProfile: React.FC<HeroProfileProps> = ({ src, alt }) => {
  const theme = useTheme();

  return (
    <motion.div
      variants={imageVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "center", md: "flex-end" },
          alignItems: "flex-start",
        }}
      >
        <OptimizedImage
          src={src}
          alt={alt}
          width="280px"
          height="280px"
          sx={{
            borderRadius: "50%",
            objectFit: "cover",
            boxShadow: theme.shadows[10],
            border: `3px solid ${theme.palette.primary.main}80`,
            backdropFilter: "blur(2px)",
          }}
        />
      </Box>
    </motion.div>
  );
};
