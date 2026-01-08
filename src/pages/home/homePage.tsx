/**
 * HomePage Component
 * Main landing page orchestrating hero section, skills display, charts, and call-to-action
 * @module pages/home/HomePage
 */

import React from "react";
import { Box, Container, Fade } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SEO from "../../components/SEO/SEO";
import { usePortfolio, useSkills } from "../../hooks/usePortfolioData";
import GitHubContributions from "../../components/github/GitHubContributions";
import {
  SkillsRadarChart,
  CareerTimeline,
  GitHubStatsChart,
} from "../../components/charts";

// Sub-component imports
import HeroSection from "./components/HeroSection";
import SkillsSection from "./components/SkillsSection";
import CallToActionSection from "./components/CallToActionSection";

// Asset imports for background images
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - Jest will mock these via moduleNameMapper
import heroBanner from "../../assets/banner.jpg";

/**
 * HomePage main component
 * Orchestrates all sections of the landing page with optimized component composition
 *
 * @returns Complete home page with SEO, hero, skills, charts, and CTA sections
 */
const HomePage: React.FC = () => {
  const theme = useTheme();
  const portfolioData = usePortfolio();
  const skills = useSkills();

  // Public path to Philadelphia skyline background (place file in public/ to activate)
  const skylinePublicPath = "/philadelphia-skyline.jpg";

  /**
   * Reusable parallax background generator
   * Creates multi-layer background with gradient overlay + skyline + banner
   * Used by both hero and CTA sections for visual consistency
   *
   * @param dark - Whether dark mode is active
   * @returns CSS background string with layered images
   */
  const parallaxBackground = (dark: boolean) =>
    dark
      ? `linear-gradient(135deg, rgba(8,8,18,0.55) 0%, rgba(18,0,36,0.65) 55%, ${theme.palette.primary.main}20 100%), url(${skylinePublicPath}), url(${heroBanner})`
      : `linear-gradient(135deg, rgba(255,255,255,0.62) 0%, rgba(250,250,255,0.70) 55%, ${theme.palette.primary.main}15 100%), url(${skylinePublicPath}), url(${heroBanner})`;

  const background = parallaxBackground(theme.palette.mode === "dark");

  return (
    <>
      <SEO
        title="Victor Williams | Software Engineer"
        description="Full-stack software engineer specializing in React, TypeScript, and modern web technologies. Building innovative solutions with passion for clean code and user experience."
        keywords="Victor Williams, Software Engineer, React, TypeScript, Web Developer, Full Stack"
        url="https://vaporjawn.github.io/"
      />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Fade in timeout={1000}>
          <Box>
            {/* Hero Section with profile and social links */}
            <HeroSection background={background} />

            {/* Technical Skills Grid */}
            <SkillsSection skills={skills} />

            {/* GitHub Activity Heatmap */}
            <GitHubContributions />

            {/* Skills Proficiency Radar Chart */}
            <Box sx={{ mb: 8, mt: 8 }}>
              <SkillsRadarChart />
            </Box>

            {/* GitHub Statistics Dashboard */}
            <Box sx={{ mb: 8 }}>
              <GitHubStatsChart />
            </Box>

            {/* Career Timeline Visualization */}
            <Box sx={{ mb: 8 }}>
              <CareerTimeline />
            </Box>

            {/* Call to Action with Projects and Contact buttons */}
            <CallToActionSection
              background={background}
              email={portfolioData?.personalInfo.email}
            />
          </Box>
        </Fade>
      </Container>
    </>
  );
};

export default HomePage;
