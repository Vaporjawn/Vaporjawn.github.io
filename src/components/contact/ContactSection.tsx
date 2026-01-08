/**
 * @module components/contact/ContactSection
 * @description
 * Reusable contact section component featuring email button and social media links.
 * Displays contact information with decorative styling, animations, and theme awareness.
 *
 * Features:
 * - Pre-filled mailto functionality
 * - Social media icon integration
 * - Decorative radial gradient accents
 * - Fade-in animation effects
 * - Light/Dark mode support
 * - Responsive design
 *
 * @example
 * ```tsx
 * import { ContactSection } from '@/components/contact/ContactSection';
 *
 * <ContactSection darkMode={theme.palette.mode === "dark"} />
 * ```
 */

import React from "react";
import { Box, Typography, Button, useTheme, Paper, Fade } from "@mui/material";
import SocialMedia from "../socials/socialMedia";

/**
 * Props interface for ContactSection component
 *
 * @interface ContactSectionProps
 */
interface ContactSectionProps {
  /**
   * Whether dark mode is active for theme-dependent styling
   * @type {boolean}
   */
  darkMode: boolean;
}

/**
 * Opens default email client with pre-filled subject and body
 *
 * @function handleMailTo
 * @returns {void}
 *
 * @example
 * ```tsx
 * <Button onClick={handleMailTo}>Email Me</Button>
 * ```
 */
const handleMailTo = () => {
  const subject = encodeURIComponent("Inquiry from your portfolio site");
  const body = encodeURIComponent("Hi Victor,\n\n");
  window.location.href = `mailto:victor.williams.dev@gmail.com?subject=${subject}&body=${body}`;
};

/**
 * ContactSection Component
 *
 * Displays contact information section with email button and social media links.
 * Features decorative gradient accents, fade-in animation, and responsive layout.
 *
 * @component
 * @param {ContactSectionProps} props - Component props
 * @returns {JSX.Element} Rendered contact section
 *
 * @example
 * ```tsx
 * // Basic usage
 * <ContactSection darkMode={false} />
 *
 * // With theme
 * <ContactSection darkMode={theme.palette.mode === "dark"} />
 * ```
 */
export const ContactSection: React.FC<ContactSectionProps> = ({ darkMode }) => {
  const theme = useTheme();
  return (
    <Fade in timeout={800}>
      <Paper
        id="contact"
        elevation={8}
        sx={{
          mt: 6,
          p: { xs: 3, md: 5 },
          borderRadius: 4,
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))"
              : "linear-gradient(145deg, rgba(0,0,0,0.04), rgba(0,0,0,0.02))",
          backdropFilter: "blur(6px)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative radial accents */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            "&:before, &:after": {
              content: "''",
              position: "absolute",
              width: 300,
              height: 300,
              borderRadius: "50%",
              filter: "blur(60px)",
              opacity: theme.palette.mode === "dark" ? 0.18 : 0.22,
              mixBlendMode: "overlay",
            },
            "&:before": {
              top: -80,
              left: -60,
              background: theme.palette.primary.main,
            },
            "&:after": {
              bottom: -100,
              right: -40,
              background: theme.palette.secondary.main,
            },
          }}
        />

        <Box sx={{ position: "relative" }}>
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: "2rem", md: "2.4rem" },
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textAlign: "center",
            }}
          >
            Get In Touch
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mb: 4,
              maxWidth: 760,
              mx: "auto",
              textAlign: "center",
              lineHeight: 1.6,
              fontSize: { xs: "1.05rem", md: "1.15rem" },
            }}
          >
            Whether you want to collaborate, discuss an opportunity, or just say
            hello—I'd love to hear from you. I'm always open to chatting about
            engineering leadership, full stack development, performance
            optimization, or creative side projects.
          </Typography>

          <Box sx={{ maxWidth: 640, mx: "auto", textAlign: "center" }}>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
              Reach me directly:
            </Typography>
            <Button variant="outlined" onClick={handleMailTo} sx={{ mb: 3 }}>
              victor.williams.dev@gmail.com
            </Button>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <SocialMedia darkMode={darkMode} />
            </Box>
          </Box>
        </Box>
      </Paper>
    </Fade>
  );
};
