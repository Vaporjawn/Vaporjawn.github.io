/**
 * @module pages/contact/components/ContactCTA
 * @description
 * Call-to-action component for Contact page.
 * Displays final engagement options with email and scheduling buttons.
 *
 * @example
 * ```tsx
 * import { ContactCTA } from './components';
 *
 * <ContactCTA
 *   email="victor.williams.dev@gmail.com"
 *   onScheduleClick={() => setCalendlyOpen(true)}
 * />
 * ```
 */

import React from "react";
import { Box, Typography, Button, useTheme } from "@mui/material";
import {
  Email as EmailIcon,
  Event as EventIcon,
} from "@mui/icons-material";
import {
  VaporwaveBlue,
  VaporwavePink,
  VaporwaveGreen,
} from "../../../colors";

/**
 * Props interface for ContactCTA component
 *
 * @interface ContactCTAProps
 */
interface ContactCTAProps {
  /**
   * Email address for mailto link
   * @type {string}
   */
  email: string;

  /**
   * Callback when Schedule button is clicked
   * @type {() => void}
   */
  onScheduleClick: () => void;
}

/**
 * ContactCTA Component
 *
 * Final call-to-action section with email and scheduling options.
 * Provides alternative engagement methods for users.
 *
 * @component
 * @param {ContactCTAProps} props - Component props
 * @returns {JSX.Element} Rendered CTA section
 *
 * @example
 * ```tsx
 * <ContactCTA
 *   email="hello@example.com"
 *   onScheduleClick={() => setModalOpen(true)}
 * />
 * ```
 */
export const ContactCTA: React.FC<ContactCTAProps> = ({
  email,
  onScheduleClick,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        textAlign: "center",
        py: 8,
        background:
          theme.palette.mode === "dark"
            ? `linear-gradient(135deg, ${VaporwaveBlue}10, ${VaporwavePink}10)`
            : `linear-gradient(135deg, ${VaporwaveBlue}05, ${VaporwavePink}05)`,
        borderRadius: 4,
        border: `1px solid ${VaporwaveBlue}20`,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 2,
          fontWeight: "bold",
          background: `linear-gradient(45deg, ${VaporwaveBlue}, ${VaporwaveGreen})`,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Ready to Get Started?
      </Typography>
      <Typography
        variant="body1"
        sx={{
          mb: 4,
          color: theme.palette.text.secondary,
          maxWidth: 600,
          mx: "auto",
        }}
      >
        Choose the communication method that works best for you. I'm here to
        help bring your ideas to life.
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 3,
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <Button
          variant="contained"
          size="large"
          href={`mailto:${email}`}
          startIcon={<EmailIcon />}
          sx={{
            background: `linear-gradient(45deg, ${VaporwaveBlue}, ${VaporwavePink})`,
            color: "#fff",
            fontWeight: "bold",
            px: 4,
            py: 1.5,
            borderRadius: 2,
            boxShadow: `0 4px 20px ${VaporwaveBlue}30`,
            transition: "all 0.3s ease",
            "&:hover": {
              background: `linear-gradient(45deg, ${VaporwavePink}, ${VaporwaveBlue})`,
              boxShadow: `0 6px 30px ${VaporwavePink}40`,
              transform: "translateY(-2px)",
            },
          }}
        >
          Send Email
        </Button>

        <Button
          variant="outlined"
          size="large"
          onClick={onScheduleClick}
          startIcon={<EventIcon />}
          sx={{
            borderColor: VaporwaveGreen,
            color: VaporwaveGreen,
            fontWeight: "bold",
            px: 4,
            py: 1.5,
            borderRadius: 2,
            borderWidth: 2,
            transition: "all 0.3s ease",
            "&:hover": {
              borderColor: VaporwaveGreen,
              borderWidth: 2,
              background: `${VaporwaveGreen}10`,
              transform: "translateY(-2px)",
              boxShadow: `0 4px 20px ${VaporwaveGreen}20`,
            },
          }}
        >
          Schedule Meeting
        </Button>
      </Box>
    </Box>
  );
};
