/**
 * @module pages/home/components/HeroSection
 * @description
 * Main hero banner orchestrator for the homepage.
 * Composes HeroContent and HeroProfile subcomponents with responsive grid layout.
 * Features parallax background, animations, and theme-aware styling.
 *
 * @example
 * ```tsx
 * import { HeroSection } from './components/HeroSection';
 *
 * <HeroSection background={backgroundGradient} />
 * ```
 */

import React from "react";
import { Box, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import type { HeroSectionProps } from "./types";
import { HeroContent } from "./HeroContent";
import { HeroProfile } from "./HeroProfile";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - Jest will mock these via moduleNameMapper
import profileImage from "../../../../assets/profile-picture.jpeg";

/**
 * HeroSection Component
 *
 * Main hero banner component that orchestrates profile image and text content sections.
 * Implements responsive 8/4 column grid layout with parallax background effects.
 *
 * Features:
 * - Responsive layout (stacked on mobile, side-by-side on desktop)
 * - Parallax background with multiple layers
 * - Theme-aware shadow and styling
 * - Staggered entrance animations via subcomponents
 *
 * @component
 * @param {HeroSectionProps} props - Component props
 * @param {string} props.background - Background CSS string with gradient and images
 * @returns {JSX.Element} Rendered hero section
 *
 * @example
 * ```tsx
 * const background = 'linear-gradient(...), url(...), url(...)';
 * <HeroSection background={background} />
 * ```
 */
export const HeroSection: React.FC<HeroSectionProps> = ({ background }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "relative",
        mb: 6,
        borderRadius: 4,
        overflow: "hidden",
        px: { xs: 3, md: 6 },
        py: { xs: 6, md: 8 },
        minHeight: { xs: 420, md: 480 },
        background,
        backgroundSize: "cover, cover, cover",
        backgroundPosition: "center, center, center",
        backgroundRepeat: "no-repeat, no-repeat, no-repeat",
        backgroundAttachment: { xs: "scroll", md: "fixed" },
        boxShadow:
          theme.palette.mode === "dark"
            ? `0 10px 40px ${theme.palette.primary.main}40`
            : `0 10px 40px ${theme.palette.primary.main}30`,
      }}
    >
      <Grid
        container
        spacing={{ xs: 2, md: 4 }}
        alignItems="flex-start"
        sx={{
          position: "relative",
          zIndex: 1,
          flexDirection: { xs: "column", md: "row" },
          flexWrap: { xs: "wrap", md: "nowrap" },
        }}
      >
        {/* Content Section - Name, Title, Bio, Social Links */}
        <Grid
          item
          xs={12}
          md={8}
          sx={{
            width: { xs: "100%", md: "66.666%" },
            maxWidth: { xs: "100%", md: "66.666%" },
            flexBasis: { xs: "100%", md: "66.666%" },
          }}
        >
          <HeroContent
            name="VICTOR WILLIAMS"
            title="SOFTWARE DEVELOPER & DIGITAL CREATIVE"
            bio="Passionate developer creating innovative digital experiences with modern web technologies."
          />
        </Grid>

        {/* Profile Image Section */}
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            width: { xs: "100%", md: "33.333%" },
            maxWidth: { xs: "100%", md: "33.333%" },
            flexBasis: { xs: "100%", md: "33.333%" },
            order: { xs: 1, md: 2 },
            alignSelf: { xs: "flex-start", md: "center" },
          }}
        >
          <HeroProfile
            src={profileImage}
            alt="Victor Williams - Software Engineer"
          />
        </Grid>
      </Grid>
    </Box>
  );
};
