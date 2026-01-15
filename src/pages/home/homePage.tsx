/**
 * HomePage Component
 * Main landing page orchestrating hero section, skills display, charts, and call-to-action
 * @module pages/home/HomePage
 */

import React from "react";
import { Container, Fade, Box } from "@mui/material";
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
import { HeroSection } from "./components/HeroSection";
import { SkillsSection } from "./components/SkillsSection";
import { CallToActionSection } from "./components/CallToActionSection";
import { ChartSection } from "./components/ChartSection";

// Utility imports
import {
  useParallaxBackground,
  DEFAULT_SKYLINE_PATH,
} from "./utils/backgroundUtils";

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

  // Generate parallax background with theme awareness and memoization
  const background = useParallaxBackground({
    primaryColor: theme.palette.primary.main,
    skylinePath: DEFAULT_SKYLINE_PATH,
    bannerImage: heroBanner,
  });

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
            <ChartSection
              spacing="large"
              ariaLabel="Skills proficiency radar visualization"
            >
              <SkillsRadarChart />
            </ChartSection>

            {/* GitHub Statistics Dashboard */}
            <ChartSection spacing="large" ariaLabel="GitHub statistics dashboard">
              <GitHubStatsChart />
            </ChartSection>

            {/* Career Timeline Visualization */}
            <ChartSection
              spacing="large"
              ariaLabel="Career timeline visualization"
            >
              <CareerTimeline />
            </ChartSection>

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
