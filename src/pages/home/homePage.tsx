import React from "react";
import { motion } from "framer-motion";
import {
  Box,
  Typography,
  Container,
  Grid,
  Chip,
  Fade,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SocialMedia from "../../components/socials/socialMedia";
import SEO from "../../components/SEO/SEO";
import { usePortfolio, useSkills } from "../../hooks/usePortfolioData";
import OptimizedImage from "../../components/OptimizedImage/OptimizedImage";
import GitHubContributions from "../../components/github/GitHubContributions";
import { SkillsRadarChart, CareerTimeline, GitHubStatsChart } from "../../components/charts";
// Import the actual profile image asset (file name contains a space)
// Using an import ensures Vite handles hashing/optimization.
// Asset paths: fall back to static string paths for test environment; Vite will rewrite in prod build.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - Jest will mock these via moduleNameMapper
import profileImage from "../../assets/profile-picture.jpeg";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import heroBanner from "../../assets/banner.jpg";

const HomePage: React.FC = () => {
  const theme = useTheme();
  const portfolioData = usePortfolio();
  const skills = useSkills();

  // Animation variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  // Use imported banner image (hashed by Vite). If you want the Philadelphia skyline, drop
  // philadelphia-skyline.jpg into public/ and replace heroBackground with "/philadelphia-skyline.jpg".
  // Multi-layer background: gradient overlay + skyline (if present in public) + fallback banner asset.
  const skylinePublicPath = "/philadelphia-skyline.jpg"; // Place file in public/ to activate

  // Reusable background generator so hero + CTA share identical layered parallax image
  const parallaxBackground = (dark: boolean) =>
    dark
      ? `linear-gradient(135deg, rgba(8,8,18,0.55) 0%, rgba(18,0,36,0.65) 55%, ${theme.palette.primary.main}20 100%), url(${skylinePublicPath}), url(${heroBanner})`
      : `linear-gradient(135deg, rgba(255,255,255,0.62) 0%, rgba(250,250,255,0.70) 55%, ${theme.palette.primary.main}15 100%), url(${skylinePublicPath}), url(${heroBanner})`;

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
            {/* Hero Section with Background Banner */}
            <Box
              sx={{
                position: "relative",
                mb: 6,
                borderRadius: 4,
                overflow: "hidden",
                px: { xs: 3, md: 6 },
                py: { xs: 6, md: 8 },
                minHeight: { xs: 420, md: 480 },
                background: parallaxBackground(theme.palette.mode === "dark"),
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
                spacing={4}
                alignItems="center"
                sx={{ position: "relative", zIndex: 1 }}
              >
                <Grid item xs={12} md={8}>
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
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
                      background: `linear-gradient(60deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      textShadow:
                        theme.palette.mode === "dark"
                          ? "0 4px 18px rgba(0,0,0,0.6)"
                          : "0 4px 14px rgba(0,0,0,0.25)",
                    }}
                  >
                    VICTOR WILLIAMS
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
                      color:
                        theme.palette.mode === "dark"
                          ? theme.palette.grey[100]
                          : theme.palette.text.primary,
                      textTransform: "uppercase",
                      textShadow:
                        theme.palette.mode === "dark"
                          ? "0 2px 10px rgba(0,0,0,0.5)"
                          : "0 2px 8px rgba(0,0,0,0.2)",
                    }}
                  >
                    SOFTWARE DEVELOPER & DIGITAL CREATIVE
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
                      color:
                        theme.palette.mode === "dark"
                          ? theme.palette.grey[200]
                          : theme.palette.text.secondary,
                      textShadow:
                        theme.palette.mode === "dark"
                          ? "0 2px 8px rgba(0,0,0,0.6)"
                          : "0 2px 6px rgba(0,0,0,0.25)",
                    }}
                  >
                    Passionate developer creating innovative digital experiences
                    with modern web technologies.
                  </Typography>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                  <SocialMedia />
                    </motion.div>
                  </motion.div>
                </Grid>
                <Grid item xs={12} md={4}>
                  <motion.div
                    variants={imageVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <OptimizedImage
                      src={profileImage}
                      alt="Victor Williams - Software Engineer"
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
                </Grid>
              </Grid>
            </Box>

            {/* Skills Section */}
            <Box sx={{ mb: 6 }}>
              <Typography
                variant="h3"
                component="h3"
                sx={{
                  fontSize: "2rem",
                  fontWeight: 600,
                  mb: 3,
                  textAlign: "center",
                }}
              >
                Technical Skills
              </Typography>

              <Grid container spacing={3}>
                {/* Frontend Skills */}
                <Grid item xs={12} md={4}>
                  <Typography
                    variant="h4"
                    component="h4"
                    sx={{
                      fontSize: "1.3rem",
                      fontWeight: 500,
                      mb: 2,
                      color: theme.palette.primary.main,
                    }}
                  >
                    Frontend
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {skills?.frontend.map((skill, index) => (
                      <Chip
                        key={index}
                        label={skill.name}
                        variant="outlined"
                        sx={{
                          borderColor: theme.palette.primary.main,
                          color: theme.palette.primary.main,
                          "&:hover": {
                            backgroundColor: theme.palette.primary.light,
                            color: theme.palette.primary.contrastText,
                          },
                        }}
                      />
                    ))}
                  </Box>
                </Grid>

                {/* Backend Skills */}
                <Grid item xs={12} md={4}>
                  <Typography
                    variant="h4"
                    component="h4"
                    sx={{
                      fontSize: "1.3rem",
                      fontWeight: 500,
                      mb: 2,
                      color: theme.palette.secondary.main,
                    }}
                  >
                    Backend
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {skills?.backend.map((skill, index) => (
                      <Chip
                        key={index}
                        label={skill.name}
                        variant="outlined"
                        sx={{
                          borderColor: theme.palette.secondary.main,
                          color: theme.palette.secondary.main,
                          "&:hover": {
                            backgroundColor: theme.palette.secondary.light,
                            color: theme.palette.secondary.contrastText,
                          },
                        }}
                      />
                    ))}
                  </Box>
                </Grid>

                {/* Tools Skills */}
                <Grid item xs={12} md={4}>
                  <Typography
                    variant="h4"
                    component="h4"
                    sx={{
                      fontSize: "1.3rem",
                      fontWeight: 500,
                      mb: 2,
                      color: theme.palette.info.main,
                    }}
                  >
                    Tools & Technologies
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {skills?.tools.map((skill, index) => (
                      <Chip
                        key={index}
                        label={skill.name}
                        variant="outlined"
                        sx={{
                          borderColor: theme.palette.info.main,
                          color: theme.palette.info.main,
                          "&:hover": {
                            backgroundColor: theme.palette.info.light,
                            color: theme.palette.info.contrastText,
                          },
                        }}
                      />
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </Box>

            <GitHubContributions />

            {/* Skills Radar Chart */}
            <Box sx={{ mb: 8, mt: 8 }}>
              <SkillsRadarChart />
            </Box>

            {/* GitHub Stats Dashboard */}
            <Box sx={{ mb: 8 }}>
              <GitHubStatsChart />
            </Box>

            {/* Career Timeline */}
            <Box sx={{ mb: 8 }}>
              <CareerTimeline />
            </Box>

            {/* Call to Action */}
            <Box
              sx={{
                textAlign: "center",
                py: 8,
                px: 4,
                mt: 10,
                position: "relative",
                overflow: "hidden",
                borderRadius: 4,
                background: parallaxBackground(theme.palette.mode === "dark"),
                backgroundSize: "cover, cover, cover",
                backgroundPosition: "center, center, center",
                backgroundRepeat: "no-repeat, no-repeat, no-repeat",
                backgroundAttachment: { xs: "scroll", md: "fixed" },
                boxShadow:
                  theme.palette.mode === "dark"
                    ? `0 10px 40px ${theme.palette.primary.main}30`
                    : `0 10px 40px ${theme.palette.primary.main}25`,
                // Layer a subtle translucent surface for text legibility
                "&::before": {
                  content: "\"\"",
                  position: "absolute",
                  inset: 0,
                  background:
                    theme.palette.mode === "dark"
                      ? "rgba(10,10,20,0.45)"
                      : "rgba(255,255,255,0.55)",
                  backdropFilter: "blur(4px)",
                },
                // Decorative edge glow
                "&::after": {
                  content: "\"\"",
                  position: "absolute",
                  inset: 0,
                  boxShadow:
                    theme.palette.mode === "dark"
                      ? `0 0 0 2px ${theme.palette.primary.main}40 inset, 0 0 30px ${theme.palette.secondary.main}30 inset`
                      : `0 0 0 2px ${theme.palette.primary.main}25 inset, 0 0 20px ${theme.palette.secondary.main}20 inset`,
                  pointerEvents: "none",
                },
              }}
            >
              <Typography
                variant="h4"
                component="h4"
                sx={{
                  fontSize: { xs: "1.3rem", md: "1.8rem" },
                  fontWeight: 600,
                  mb: 2,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                Ready to build something amazing together?
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "1rem", md: "1.2rem" },
                  color: theme.palette.text.secondary,
                  mb: 3,
                  position: "relative",
                  zIndex: 1,
                  lineHeight: 1.6,
                }}
              >
                Check out my projects or get in touch to discuss your next idea.
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 2,
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => (window.location.href = "/projects")}
                  sx={{
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    borderRadius: 2,
                    px: 4,
                    py: 1.5,
                    fontSize: "1rem",
                    fontWeight: 600,
                    textTransform: "none",
                    boxShadow: `0 4px 20px ${theme.palette.primary.main}30`,
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: `0 8px 30px ${theme.palette.primary.main}40`,
                      background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                    },
                  }}
                >
                  View My Projects
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  onClick={() =>
                    (window.location.href =
                      "mailto:" + portfolioData?.personalInfo.email)
                  }
                  sx={{
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main,
                    borderRadius: 2,
                    px: 4,
                    py: 1.5,
                    fontSize: "1rem",
                    fontWeight: 600,
                    textTransform: "none",
                    borderWidth: 2,
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      borderColor: theme.palette.primary.main,
                      backgroundColor: `${theme.palette.primary.main}10`,
                      transform: "translateY(-2px)",
                      boxShadow: `0 8px 25px ${theme.palette.primary.main}20`,
                    },
                  }}
                >
                  Get In Touch
                </Button>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Container>
    </>
  );
};

export default HomePage;
