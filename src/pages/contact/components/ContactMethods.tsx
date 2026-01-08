/**
 * @module pages/contact/components/ContactMethods
 * @description
 * Contact methods section displaying cards for different contact options.
 * Manages Calendly modal state and handles contact method interactions.
 *
 * @example
 * ```tsx
 * import { ContactMethods } from './components';
 *
 * <ContactMethods contactMethods={methods} />
 * ```
 */

import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Launch as LaunchIcon } from "@mui/icons-material";
import {
  VaporwaveBlue,
  VaporwaveGreen,
  VaporwavePurple,
  VaporwaveBlueGreen,
} from "../../../colors";

import type { ContactMethod } from "../types";

/**
 * Props interface for ContactMethods component
 *
 * @interface ContactMethodsProps
 */
interface ContactMethodsProps {
  /**
   * Array of contact method configurations
   * @type {ContactMethod[]}
   */
  contactMethods: ContactMethod[];

  /**
   * Callback when Schedule button is clicked
   * @type {() => void}
   */
  onScheduleClick: () => void;
}

/**
 * ContactMethods Component
 *
 * Displays a grid of contact method cards with hover effects and click handlers.
 * Invokes parent callback for scheduling functionality.
 *
 * @component
 * @param {ContactMethodsProps} props - Component props
 * @returns {JSX.Element} Rendered contact methods section
 *
 * @example
 * ```tsx
 * const methods = getContactMethods('user@example.com');
 * <ContactMethods
 *   contactMethods={methods}
 *   onScheduleClick={() => setModalOpen(true)}
 * />
 * ```
 */
export const ContactMethods: React.FC<ContactMethodsProps> = ({
  contactMethods,
  onScheduleClick,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  /**
   * Handles contact method card clicks
   * Opens Calendly modal for scheduling, opens external links otherwise
   *
   * @param method - Contact method configuration object
   */
  const handleMethodClick = (method: ContactMethod) => {
    if (method.title === "Schedule a Call") {
      onScheduleClick();
    } else {
      window.open(method.link, "_blank");
    }
  };

  return (
    <>
      <Box sx={{ mb: 10 }}>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            mb: 2,
            fontWeight: "bold",
            background: `linear-gradient(45deg, ${VaporwaveBlue}, ${VaporwaveGreen})`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: { xs: "1.75rem", md: "2.125rem" },
          }}
        >
          Choose Your Preferred Method
        </Typography>
        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            color: theme.palette.text.secondary,
            mb: 7,
            fontSize: { xs: "0.95rem", md: "1.05rem" },
            maxWidth: 700,
            mx: "auto",
            lineHeight: 1.7,
          }}
        >
          Select the most convenient way to reach out, and I'll get back to you
          as soon as possible.
        </Typography>

        <Grid
          container
          spacing={{ xs: 3, md: 4 }}
          sx={{ px: { xs: 0, md: 2 } }}
        >
          {contactMethods.map((method, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: "100%",
                  minHeight: { xs: "auto", md: "380px" },
                  background:
                    theme.palette.mode === "dark"
                      ? `linear-gradient(145deg, ${method.color}18, ${VaporwavePurple}12, transparent)`
                      : `linear-gradient(145deg, ${method.color}12, ${VaporwavePurple}08, transparent)`,
                  backdropFilter: "blur(25px)",
                  border: `2px solid ${method.color}25`,
                  borderRadius: 4,
                  transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: `0 8px 32px ${method.color}15`,
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `radial-gradient(circle at 50% 0%, ${method.color}20, transparent 70%)`,
                    opacity: 0,
                    transition: "opacity 0.4s ease",
                  },
                  "&:hover": {
                    transform: "translateY(-12px) scale(1.02)",
                    boxShadow: `0 24px 48px ${method.color}35, 0 0 60px ${method.color}20`,
                    border: `2px solid ${method.color}60`,
                    "&::before": {
                      opacity: 1,
                    },
                    "& .icon-circle": {
                      transform: "scale(1.1) rotate(5deg)",
                      boxShadow: `0 15px 40px ${method.color}60`,
                    },
                    "& .card-button": {
                      background: `${method.color}20`,
                      borderColor: method.color,
                      transform: "translateY(-2px)",
                    },
                  },
                }}
                onClick={() => handleMethodClick(method)}
              >
                <CardContent
                  sx={{
                    p: { xs: 3, md: 4.5 },
                    textAlign: "center",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <Box
                    className="icon-circle"
                    sx={{
                      width: { xs: 90, md: 100 },
                      height: { xs: 90, md: 100 },
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${method.color}, ${VaporwaveBlueGreen})`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: "auto",
                      mb: 3.5,
                      color: "white",
                      boxShadow: `0 12px 35px ${method.color}50`,
                      transition:
                        "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                      border: `3px solid ${
                        theme.palette.mode === "dark"
                          ? "rgba(255,255,255,0.1)"
                          : "rgba(255,255,255,0.3)"
                      }`,
                    }}
                  >
                    {React.cloneElement(method.icon as React.ReactElement, {
                      sx: { fontSize: { xs: 36, md: 40 } },
                    })}
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "bold",
                      mb: 1.5,
                      color: theme.palette.text.primary,
                      fontSize: { xs: "1.35rem", md: "1.5rem" },
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {method.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.text.secondary,
                      mb: 4,
                      fontSize: { xs: "0.9rem", md: "0.95rem" },
                      lineHeight: 1.6,
                      minHeight: { xs: "auto", md: "48px" },
                    }}
                  >
                    {method.description}
                  </Typography>
                  <Button
                    className="card-button"
                    variant="outlined"
                    endIcon={<LaunchIcon sx={{ fontSize: 16 }} />}
                    sx={{
                      borderColor: `${method.color}60`,
                      color: method.color,
                      fontWeight: "600",
                      px: 2.5,
                      py: 1.5,
                      borderRadius: 2.5,
                      fontSize: { xs: "0.8rem", md: "0.875rem" },
                      textTransform: "none",
                      letterSpacing: "0.02em",
                      borderWidth: 2,
                      transition: "all 0.3s ease",
                      width: "100%",
                      maxWidth: "100%",
                      minHeight: { xs: "44px", md: "48px" },
                      lineHeight: 1.4,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      "& .MuiButton-endIcon": {
                        ml: 1,
                        flexShrink: 0,
                      },
                      "&:hover": {
                        borderColor: method.color,
                        borderWidth: 2,
                      },
                    }}
                  >
                    <Box
                      component="span"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        wordBreak: "break-all",
                      }}
                    >
                      {method.action}
                    </Box>
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};
