import React from "react";
import {
  Box,
  Typography,
  useTheme,
  Paper,
  Container,
  Grid,
  Fade,
} from "@mui/material";
import SEO from "../../components/SEO/SEO";
import { usePortfolio } from "../../hooks/usePortfolioData";
import ContactSection from "../../components/contact/ContactSection";

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
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 4, md: 6 },
                    background: (theme) =>
                      theme.palette.mode === "dark"
                        ? "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))"
                        : "linear-gradient(145deg, rgba(0,0,0,0.04), rgba(0,0,0,0.015))",
                    backdropFilter: "blur(4px)",
                    borderRadius: 4,
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <Box sx={{ position: "relative", zIndex: 2 }}>
                    <Typography
                      variant="h2"
                      component="h1"
                      sx={{
                        fontWeight: 700,
                        mb: 3,
                        fontSize: { xs: "2.4rem", md: "3rem" },
                        background: (theme) =>
                          `linear-gradient(120deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                      }}
                    >
                      About {portfolioData?.personalInfo.name || "Me"}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: { xs: "1.05rem", md: "1.15rem" },
                        lineHeight: 1.7,
                        color: "text.secondary",
                        mb: 3,
                      }}
                    >
                      {portfolioData?.personalInfo.bio || (
                        <>
                          I'm a passionate developer focused on building
                          interactive experiences, performant web interfaces,
                          and accessible user journeys. I love working across
                          the stack, experimenting with visual effects, and
                          refining details that make digital products feel
                          polished and intentional.
                        </>
                      )}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: { xs: "1.05rem", md: "1.15rem" },
                        lineHeight: 1.7,
                        color: "text.secondary",
                        mb: 3,
                      }}
                    >
                      Outside of coding, I explore creative tech, gaming
                      culture, design systems, and ways to elevate personal
                      digital identity. This site evolves as an experimental
                      canvas—showcasing projects, iterations, and ideas in
                      motion.
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.secondary,
                        mt: 2,
                        fontStyle: "italic",
                      }}
                    >
                      This site is built with React, TypeScript, Vite, and
                      Material-UI, featuring a custom theme and modern
                      development practices.
                    </Typography>
                  </Box>
                </Paper>
                <Box sx={{ mt: { xs: 8, md: 12 } }}>
                  <ContactSection darkMode={theme.palette.mode === "dark"} />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Container>
    </>
  );
};

export default AboutPage;
