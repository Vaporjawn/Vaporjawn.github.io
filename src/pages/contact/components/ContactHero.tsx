/**
 * @module pages/contact/components/ContactHero
 * @description
 * Hero section component for Contact page.
 * Displays page title and introductory text with gradient styling.
 *
 * @example
 * ```tsx
 * import { ContactHero } from './components';
 *
 * <ContactHero />
 * ```
 */

import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import {
  VaporwavePink,
  VaporwaveBlueGreen,
} from "../../../colors";

/**
 * ContactHero Component
 *
 * Displays the hero section of the Contact page with title and description.
 * Features responsive typography and gradient text effects.
 *
 * @component
 * @returns {JSX.Element} Rendered hero section
 *
 * @example
 * ```tsx
 * <ContactHero />
 * ```
 */
export const ContactHero: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ textAlign: "center", mb: 8 }}>
      <Typography
        variant={isMobile ? "h3" : "h2"}
        sx={{
          fontWeight: "bold",
          background: `linear-gradient(45deg, ${VaporwavePink}, ${VaporwaveBlueGreen})`,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          mb: 2,
          textShadow: `0 0 30px ${VaporwavePink}30`,
        }}
      >
        Let's Work Together
      </Typography>
      <Typography
        variant="h6"
        sx={{
          color: theme.palette.text.secondary,
          maxWidth: 600,
          mx: "auto",
          lineHeight: 1.6,
        }}
      >
        Have a project in mind? I'd love to hear about it and discuss how we
        can bring your ideas to life.
      </Typography>
    </Box>
  );
};
