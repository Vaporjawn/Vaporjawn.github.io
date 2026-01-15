/**
 * SocialMedia Component
 * Displays social media links with branded icons in a two-row layout
 * @module components/socials/SocialMedia
 */

import React from "react";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { socialLinks, UnifiedSocialLink } from "../../data/socialLinks";
import { renderSocialIcon } from "./utils/iconMapper";

// Styled anchor / link for consistent hover + focus-visible without JS event handlers
const IconLink = styled("a")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  lineHeight: 0,
  padding: 2,
  borderRadius: 8,
  transition: "transform .25s ease, filter .25s ease, background .25s ease",
  textDecoration: "none",
  position: "relative",
  "&:hover, &:focus-visible": {
    transform: "translateY(-4px)",
    background:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,0.06)"
        : "rgba(0,0,0,0.05)",
  },
  "&:focus-visible": {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: 3,
  },
}));

// Internal helper for internal route link styling parity
const InternalIconLink = styled(Link)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  lineHeight: 0,
  padding: 2,
  borderRadius: 8,
  transition: "transform .25s ease, filter .25s ease, background .25s ease",
  textDecoration: "none",
  position: "relative",
  "&:hover, &:focus-visible": {
    transform: "translateY(-4px)",
    background:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,0.06)"
        : "rgba(0,0,0,0.05)",
  },
  "&:focus-visible": {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: 3,
  },
}));

interface SocialMediaProps {
  /** If true, only shows primary social links */
  onlyPrimary?: boolean;
}

/**
 * SocialMedia displays social media icon links in a two-row layout
 * First row shows up to 6 icons, remaining icons appear in second row
 *
 * @param props - Component props
 * @param props.onlyPrimary - If true, filters to only primary social links
 * @returns Social media links component
 */
const SocialMedia: React.FC<SocialMediaProps> = ({ onlyPrimary }) => {
  const theme = useTheme();
  const effectiveMode: "light" | "dark" =
    theme.palette.mode === "dark" ? "dark" : "light";

  // Filter links based on onlyPrimary prop
  const links = onlyPrimary
    ? socialLinks.filter((l) => l.primary)
    : socialLinks;

  // Split icons into two rows: 6-6 distribution
  const topRowLinks = links.slice(0, 6);
  const bottomRowLinks = links.slice(6);

  /**
   * Renders a single link element with appropriate wrapper (internal vs external)
   *
   * @param link - Social link configuration object
   * @returns Link component wrapped in appropriate container
   */
  const renderLinkElement = (link: UnifiedSocialLink) => {
    const iconNode = renderSocialIcon(link.key, link.label, effectiveMode);

    if (!iconNode) return null;

    if (link.kind === "internal") {
      return (
        <InternalIconLink
          key={link.key}
          aria-label={link.label}
          title={link.label}
          to={link.href}
        >
          {iconNode}
        </InternalIconLink>
      );
    }

    return (
      <IconLink
        key={link.key}
        aria-label={link.label}
        title={link.label}
        href={link.href}
        target={link.kind === "external" ? "_blank" : undefined}
        rel={link.kind === "external" ? "noopener noreferrer" : undefined}
      >
        {iconNode}
      </IconLink>
    );
  };

  return (
    <div
      style={{
        marginTop: "2rem",
      }}
    >
      {/* Top Row - 6 icons */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          gap: "1.1rem",
          marginBottom: "1.1rem",
        }}
      >
        {topRowLinks.map((link) => renderLinkElement(link))}
      </div>

      {/* Bottom Row - 6 icons */}
      {bottomRowLinks.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            gap: "1.1rem",
          }}
        >
          {bottomRowLinks.map((link) => renderLinkElement(link))}
        </div>
      )}
    </div>
  );
};

export default SocialMedia;
