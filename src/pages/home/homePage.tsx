/**
 * HomePage Component
 * Main landing page orchestrating hero section, skills display, charts, and call-to-action
 * @module pages/home/HomePage
 */

import React, { useMemo } from "react";
import { Container, Fade, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SEO from "../../components/SEO/SEO";
import { usePortfolio } from "../../hooks/usePortfolioData";
import { useGithubRepos } from "../../hooks/useGithubRepos";
import { CareerTimeline, GitHubStatsChart } from "../../components/charts";
import {
  computeRepoStats,
  computeLanguageDistribution,
} from "../../components/charts/utils/githubStatsUtils";

// Sub-component imports
import { HeroSection } from "./components/HeroSection";
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

  // Live GitHub repo stats (stars/forks/repos/languages) — real API data,
  // cached with a TTL by the hook. See utils/githubStatsUtils.ts for the
  // aggregation and GitHubStatsChart's own doc comment for why this replaced
  // the previous always-mock-data dashboard.
  const {
    repos: githubRepos,
    loading: githubStatsLoading,
    error: githubStatsError,
  } = useGithubRepos();
  const githubStats = useMemo(() => computeRepoStats(githubRepos), [githubRepos]);
  const githubLanguageData = useMemo(
    () => computeLanguageDistribution(githubRepos),
    [githubRepos]
  );

  // Generate parallax background with theme awareness and memoization
  const background = useParallaxBackground({
    primaryColor: theme.palette.primary.main,
    skylinePath: DEFAULT_SKYLINE_PATH,
    bannerImage: heroBanner,
  });

  return (
    <>
      <SEO
        title="Victor Williams | Senior Full Stack Software Engineer"
        description="Senior Full Stack Software Engineer with 9+ years building and leading full-stack platforms across fintech, legal tech, and marketplace industries. Currently at Morgan Lewis."
        keywords="Victor Williams, Senior Software Engineer, Full Stack Engineer, Engineering Leadership, React, TypeScript"
        url="https://vaporjawn.dev/"
      />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Fade in timeout={1000}>
          <Box>
            {/* Hero Section with profile and social links */}
            <HeroSection
              background={background}
              name={portfolioData?.personalInfo.name}
              title={portfolioData?.personalInfo.title}
              bio={portfolioData?.personalInfo.bio}
            />

            {/* GitHub Statistics Dashboard */}
            <ChartSection spacing="large" ariaLabel="GitHub statistics dashboard">
              <GitHubStatsChart
                stats={githubStats}
                languageData={githubLanguageData}
                loading={githubStatsLoading}
                error={githubStatsError}
              />
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
