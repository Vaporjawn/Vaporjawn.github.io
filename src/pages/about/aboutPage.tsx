/**
 * @module pages/about/AboutPage
 * @description
 * About page component displaying personal bio, professional summary,
 * and contact information. Orchestrates sub-components for a clean,
 * modular page structure.
 *
 * Features:
 * - SEO optimization with comprehensive meta tags
 * - Personal bio and professional summary
 * - Technical stack information
 * - Contact section with social links
 * - Responsive layout with animations
 *
 * @example
 * ```tsx
 * import AboutPage from './pages/about';
 *
 * <Route path="/about" element={<AboutPage />} />
 * ```
 */

import React from "react";
import { Box, useTheme, Container, Grid, Fade } from "@mui/material";
import SEO from "../../components/SEO/SEO";
import { usePortfolio } from "../../hooks/usePortfolioData";
import { AboutBioSection, AboutContactSection } from "./components";

/**
 * AboutPage Component
 *
 * Main About page component that composes bio and contact sections.
 * Provides centered layout with animation effects and responsive design.
 *
 * @component
 * @returns {JSX.Element} Rendered About page
 *
 * @example
 * ```tsx
 * <AboutPage />
 * ```
 */
const AboutPage: React.FC = () => {
  const theme = useTheme();
  const portfolioData = usePortfolio();

  return (
    <>
      <SEO
        title="About | Victor Williams"
        description="Learn more about Victor Williams, a seasoned Full Stack Software Engineer with expertise in React, TypeScript, and modern web development."
        keywords="About Victor Williams, Software Engineer Bio, Full Stack Developer, React Expert"
        url="https://vaporjawn.github.io/about"
      />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Fade in timeout={1000}>
          <Box
            sx={{
              minHeight: "80vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              py: 6,
            }}
          >
            <Grid container justifyContent="center">
              <Grid item xs={12} md={10} lg={8}>
                <AboutBioSection portfolioData={portfolioData} />
                <AboutContactSection
                  darkMode={theme.palette.mode === "dark"}
                />
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Container>
    </>
  );
};

export default AboutPage;
