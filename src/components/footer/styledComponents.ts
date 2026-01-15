/**
 * Footer Styled Components
 * MUI styled components for footer layout and styling
 * @module components/footer/styledComponents
 */

import { Box, Typography, Link, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";

/**
 * Custom styled image component for brand icons
 * Ensures square aspect ratio without stretching
 */
export const ImgIcon = styled("img")(() => ({
  width: 24,
  height: 24,
  display: "block",
  objectFit: "contain",
  aspectRatio: "1 / 1",
  // Prevent sub-pixel rendering blur in some browsers
  imageRendering: "-webkit-optimize-contrast",
}));

/**
 * Main footer container with gradient background
 * Full-width viewport bleed for edge-to-edge design
 */
export const FooterContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100vw",
  marginLeft: "calc(50% - 50vw)",
  background: `linear-gradient(135deg,
    ${theme.palette.secondary.main} 0%,
    ${theme.palette.primary.main} 50%,
    ${theme.palette.secondary.dark} 100%)`,
  padding: theme.spacing(4, 2),
  color: theme.palette.text.primary,
  boxSizing: "border-box",
}));

/**
 * Footer section wrapper with responsive bottom margin
 * Provides consistent spacing between footer sections
 */
export const FooterSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  [theme.breakpoints.up("md")]: {
    marginBottom: 0,
  },
}));

/**
 * Section title with gradient text effect
 * Uses vaporwave color palette for brand consistency
 */
export const FooterTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "1.2rem",
  letterSpacing: "0.05em",
  marginBottom: theme.spacing(2),
  background: `linear-gradient(45deg, ${theme.palette.vaporwave.pink}, ${theme.palette.vaporwave.purple})`,
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  textTransform: "uppercase",
}));

/**
 * Footer navigation link with hover animation
 * Includes horizontal slide effect on hover
 */
export const FooterLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: "none",
  fontSize: "0.9rem",
  fontWeight: 500,
  lineHeight: 2,
  transition: "all 0.3s ease",
  display: "block",
  "&:hover": {
    color: theme.palette.vaporwave.pink,
    transform: "translateX(4px)",
  },
})) as typeof Link;

/**
 * Brand name text with gradient and glow effect
 * Prominent display for site branding
 */
export const BrandText = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "1.5rem",
  letterSpacing: "0.1em",
  background: `linear-gradient(45deg, ${theme.palette.vaporwave.green}, ${theme.palette.vaporwave.blueGreen}, ${theme.palette.vaporwave.pink})`,
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  textShadow: `0 0 20px ${theme.palette.vaporwave.blueGreen}50`,
  marginBottom: theme.spacing(1),
}));

/**
 * Container for social media icon buttons
 * Responsive layout - centered on mobile, left-aligned on desktop
 */
export const SocialIconContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: theme.spacing(1),
  marginBottom: theme.spacing(3),
  [theme.breakpoints.up("md")]: {
    justifyContent: "flex-start",
  },
}));

/**
 * Props for styled icon button with brand colors
 * Supports custom brand colors and hover states
 */
export interface StyledIconButtonProps {
  /** Base brand color for the icon */
  $brandcolor?: string;
  /** Hover state color */
  $hovercolor?: string;
  /** Whether to preserve original asset colors (for logos) */
  $preserve?: boolean;
}

/**
 * Styled icon button for social media links
 * Supports brand-specific colors and hover effects
 */
export const StyledIconButton = styled(IconButton, {
  shouldForwardProp: (prop) =>
    prop !== "$brandcolor" && prop !== "$hovercolor" && prop !== "$preserve",
})<StyledIconButtonProps>(
  ({ theme, $brandcolor, $hovercolor, $preserve }) => ({
    color: $preserve
      ? theme.palette.text.secondary
      : $brandcolor || theme.palette.text.secondary,
    transition: "all 0.3s ease",
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,0.04)"
        : "rgba(0,0,0,0.04)",
    "&:hover": {
      color: $preserve
        ? $brandcolor || theme.palette.vaporwave.pink
        : $hovercolor || $brandcolor || theme.palette.vaporwave.pink,
      backgroundColor:
        theme.palette.mode === "dark"
          ? "rgba(255,255,255,0.1)"
          : "rgba(0,0,0,0.08)",
      transform: "translateY(-2px) scale(1.05)",
      boxShadow: `0 4px 15px ${theme.palette.vaporwave.purple}40`,
    },
  })
);

/**
 * Container for legal links with responsive layout
 * Horizontal on desktop, vertical on mobile
 */
export const LegalSection = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(2),
  flexWrap: "wrap",
  marginTop: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: theme.spacing(1),
  },
}));
