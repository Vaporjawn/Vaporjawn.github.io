/**
 * HeroSection Component
 * Main hero banner for the homepage featuring profile image, name, title, and social links
 * @module pages/home/components/HeroSection
 */

import React from "react";
import { motion } from "framer-motion";
import { Box, Typography, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SocialMedia from "../../../components/socials/socialMedia";
import OptimizedImage from "../../../components/OptimizedImage/OptimizedImage";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - Jest will mock these via moduleNameMapper
import profileImage from "../../../assets/profile-picture.jpeg";

interface HeroSectionProps {
  /** Background image URL or gradient configuration */
  background: string;
}

/**
 * Animation variants for staggered entrance effect
 */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/**
 * HeroSection displays the main banner with profile information
 *
 * @param props - Component props
 * @param props.background - Background CSS string with gradient and images
 * @returns Hero section component
 */
const HeroSection: React.FC<HeroSectionProps> = ({ background }) => {
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
  );
};

export default HeroSection;
