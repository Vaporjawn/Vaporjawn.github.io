/**
 * CallToActionSection Component
 * Prominent call-to-action section with buttons for Projects and Contact
 * @module pages/home/components/CallToActionSection
 */

import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface CallToActionSectionProps {
  /** Background CSS string with gradient and images */
  background: string;
  /** Email address for contact button */
  email?: string;
}

/**
 * CallToActionSection displays prominent CTA with styled buttons
 *
 * @param props - Component props
 * @param props.background - Background CSS string matching hero section
 * @param props.email - Email address for the contact button
 * @returns Call to action section component
 */
const CallToActionSection: React.FC<CallToActionSectionProps> = ({
  background,
  email,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        textAlign: "center",
        py: 8,
        px: 4,
        mt: 10,
        position: "relative",
        overflow: "hidden",
        borderRadius: 4,
        background,
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
          content: '""',
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
          content: '""',
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
          onClick={() => (window.location.href = `mailto:${email || ""}`)}
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
  );
};

export default CallToActionSection;
