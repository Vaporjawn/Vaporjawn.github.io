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
import { Box, useTheme, Container, Fade } from "@mui/material";
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
        url="https://vaporjawn.dev/about"
      />

      <Container maxWidth="md" sx={{ py: { xs: 3, sm: 4, md: 5 } }}>
        <Fade in timeout={1000}>
          <Box
            sx={{
              width: "100%",
              minWidth: 0,
              mx: "auto",
              textAlign: "center",
              "& .MuiButton-root": {
                maxWidth: "100%",
                overflowWrap: "anywhere",
              },
              "& #contact a[aria-label]": {
                minWidth: 44,
                minHeight: 44,
                flexShrink: 0,
              },
            }}
          >
            <AboutBioSection portfolioData={portfolioData} />
            <AboutContactSection darkMode={theme.palette.mode === "dark"} />
          </Box>
        </Fade>
      </Container>
    </>
  );
};

export default AboutPage;
