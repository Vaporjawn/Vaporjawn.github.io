/**
 * Icon Mapper Utility
 * Maps social media platform keys to their corresponding icon components
 * @module components/socials/utils/iconMapper
 */

import React from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ArticleIcon from "@mui/icons-material/Article";
import XIcon from "@mui/icons-material/X";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGitlab,
  faReddit,
  faThreads,
} from "@fortawesome/free-brands-svg-icons";
import { styled } from "@mui/material/styles";
import { getBrandColor, SocialBrandKey } from "../../../data/socialBrandColors";

// Asset imports
import NpmLogo from "../../../assets/logos/Npm-logo.svg.png";
import DevpostLogo from "../../../assets/logos/devpost_logo_icon_169279.svg";
import BuyMeACoffeeLogo from "../../../assets/logos/buymeacoffee_logo.svg";
import BlueskyIcon from "../../../assets/logos/Bluesky_Logo.svg";

/**
 * Styled raster/vector image element for imported brand assets
 * Ensures consistent sizing and rendering quality
 */
const ImgIcon = styled("img")<{ $size?: string }>(({ $size = "2.5rem" }) => ({
  width: $size,
  height: $size,
  display: "block",
  objectFit: "contain",
  aspectRatio: "1 / 1",
  userSelect: "none",
  imageRendering: "-webkit-optimize-contrast",
}));

/**
 * Icon configuration mapping for social media platforms
 * Maps platform keys to their rendering function
 */
interface IconConfig {
  [key: string]: (
    brandColor: string,
    size: string,
    label: string
  ) => React.ReactNode;
}

const iconSizeRem = "2.5rem";

/**
 * Icon configuration object
 * Each key corresponds to a social platform and returns the appropriate icon component
 */
const iconConfigs: IconConfig = {
  github: (color) => (
    <GitHubIcon style={{ fontSize: iconSizeRem, color }} />
  ),
  gitlab: (color) => (
    <FontAwesomeIcon
      icon={faGitlab}
      style={{ fontSize: iconSizeRem, color }}
    />
  ),
  email: (color) => (
    <MailOutlineIcon style={{ fontSize: iconSizeRem, color }} />
  ),
  resume: (color) => (
    <ArticleIcon style={{ fontSize: iconSizeRem, color }} />
  ),
  linkedin: (color) => (
    <LinkedInIcon style={{ fontSize: iconSizeRem, color }} />
  ),
  x: (color) => <XIcon style={{ fontSize: iconSizeRem, color }} />,
  reddit: (color) => (
    <FontAwesomeIcon
      icon={faReddit}
      style={{ fontSize: iconSizeRem, color }}
    />
  ),
  threads: (color) => (
    <FontAwesomeIcon
      icon={faThreads}
      style={{ fontSize: "2.25rem", color, verticalAlign: "middle" }}
    />
  ),
  bluesky: (_, __, label) => <ImgIcon src={BlueskyIcon} alt={label} />,
  npm: (_, __, label) => <ImgIcon src={NpmLogo} alt={label} />,
  devpost: (_, __, label) => <ImgIcon src={DevpostLogo} alt={label} />,
  buymeacoffee: (_, __, label) => (
    <ImgIcon src={BuyMeACoffeeLogo} alt={label} />
  ),
  calendly: (color) => (
    <CalendarMonthIcon style={{ fontSize: iconSizeRem, color }} />
  ),
};

/**
 * Renders the appropriate icon for a given social media platform
 *
 * @param key - Social platform key (e.g., "github", "linkedin")
 * @param label - Accessible label for the icon
 * @param mode - Current theme mode ("light" or "dark")
 * @returns React node containing the icon, or null if key not found
 */
export const renderSocialIcon = (
  key: string,
  label: string,
  mode: "light" | "dark"
): React.ReactNode => {
  const iconRenderer = iconConfigs[key];

  if (!iconRenderer) {
    console.warn(`No icon configuration found for key: ${key}`);
    return null;
  }

  const brandColor = getBrandColor(key as SocialBrandKey, mode, false);
  return iconRenderer(brandColor, iconSizeRem, label);
};

/**
 * Checks if an icon exists for the given platform key
 *
 * @param key - Social platform key to check
 * @returns True if icon configuration exists
 */
export const hasIcon = (key: string): boolean => {
  return key in iconConfigs;
};

/**
 * Gets all supported social platform keys
 *
 * @returns Array of supported platform keys
 */
export const getSupportedPlatforms = (): string[] => {
  return Object.keys(iconConfigs);
};
