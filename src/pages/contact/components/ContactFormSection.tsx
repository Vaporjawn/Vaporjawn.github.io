/**
 * @module pages/contact/components/ContactFormSection
 * @description
 * Form section wrapper component for Contact page.
 * Provides title, description, and contains the ContactForm component.
 *
 * @example
 * ```tsx
 * import { ContactFormSection } from './components';
 *
 * <ContactFormSection />
 * ```
 */

import React from "react";
import { Box, Typography, useTheme, alpha } from "@mui/material";
import ContactForm from "../../../components/contact/ContactForm";
import { VaporwavePink, VaporwaveGreen } from "../../../colors";

/**
 * ContactFormSection Component
 *
 * Wraps the ContactForm component with section title and description.
 * Provides consistent styling and layout for the form section.
 *
 * @component
 * @returns {JSX.Element} Rendered form section
 *
 * @example
 * ```tsx
 * <ContactFormSection />
 * ```
 */
export const ContactFormSection: React.FC = () => {
  const theme = useTheme();

  return (
    <Box sx={{ mb: 10 }}>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          mb: 2,
          fontWeight: "bold",
          background: `linear-gradient(45deg, ${VaporwavePink}, ${VaporwaveGreen})`,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontSize: { xs: "1.75rem", md: "2.125rem" },
          textShadow: `0 0 30px ${alpha(VaporwavePink, 0.3)}`,
          letterSpacing: "0.5px",
        }}
      >
        Send Me a Message
      </Typography>
      <Typography
        variant="body1"
        sx={{
          textAlign: "center",
          color: theme.palette.text.secondary,
          mb: 5,
          fontSize: { xs: "0.95rem", md: "1.05rem" },
          maxWidth: 700,
          mx: "auto",
          lineHeight: 1.7,
        }}
      >
        Fill out the form below and I'll get back to you within 24-48 hours.
      </Typography>
      <Box sx={{ maxWidth: 800, mx: "auto" }}>
        <ContactForm />
      </Box>
    </Box>
  );
};
