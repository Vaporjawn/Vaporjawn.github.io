import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ArticleIcon from "@mui/icons-material/Article";
import XIcon from "@mui/icons-material/X";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGitlab, faReddit, faThreads } from "@fortawesome/free-brands-svg-icons";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import React from "react";
// Asset imports – ts-ignore to satisfy Jest TS resolution when moduleNameMapper replaces them
import NpmLogo from "../../assets/logos/Npm-logo.svg.png";
import DevpostLogo from "../../assets/logos/devpost_logo_icon_169279.svg";
import BuyMeACoffeeLogo from "../../assets/logos/buymeacoffee_logo.svg";
import { socialLinks, UnifiedSocialLink } from "../../data/socialLinks";
import { getBrandColor, SocialBrandKey } from "../../data/socialBrandColors";
import { useTheme } from "@mui/material/styles";

// Styled raster / vector image element for imported brand assets
const ImgIcon = styled("img")<{ $size?: string }>(({ $size = "2.5rem" }) => ({
  width: $size,
  height: $size,
  display: "block",
  objectFit: "contain",
  aspectRatio: "1 / 1",
  userSelect: "none",
  imageRendering: "-webkit-optimize-contrast",
}));

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
  onlyPrimary?: boolean;
}

const iconSizeRem = "2.5rem";

const SocialMedia: React.FC<SocialMediaProps> = ({ onlyPrimary }) => {
  const theme = useTheme();
  const effectiveMode: "light" | "dark" = theme.palette.mode === "dark" ? "dark" : "light";
  const links = onlyPrimary
    ? socialLinks.filter((l) => l.primary)
    : socialLinks;

  const renderIcon = (key: string, label: string) => {
    const brandBase = getBrandColor(key as SocialBrandKey, effectiveMode, false);
    switch (key) {
      case "github":
        return <GitHubIcon style={{ fontSize: iconSizeRem, color: brandBase }} />;
      case "gitlab":
        return (
          <FontAwesomeIcon
            icon={faGitlab}
            style={{ fontSize: iconSizeRem, color: brandBase }}
          />
        );
      case "email":
        return <MailOutlineIcon style={{ fontSize: iconSizeRem, color: brandBase }} />;
      case "resume":
        return <ArticleIcon style={{ fontSize: iconSizeRem, color: brandBase }} />;
      case "linkedin":
        return <LinkedInIcon style={{ fontSize: iconSizeRem, color: brandBase }} />;
      case "x":
        return <XIcon style={{ fontSize: iconSizeRem, color: brandBase }} />;
      case "reddit":
        return (
          <FontAwesomeIcon
            icon={faReddit}
            style={{ fontSize: iconSizeRem, color: brandBase }}
          />
        );
      case "threads":
        return (
          <FontAwesomeIcon
            icon={faThreads}
            style={{ fontSize: iconSizeRem, color: brandBase }}
          />
        );
      case "npm":
        return <ImgIcon src={NpmLogo} alt={label} />;
      case "devpost":
        return <ImgIcon src={DevpostLogo} alt={label} />;
      case "buymeacoffee":
        return <ImgIcon src={BuyMeACoffeeLogo} alt={label} />;
      default:
        return null;
    }
  };

  // Split icons into two rows: 6 on top, remaining on bottom
  const topRowLinks = links.slice(0, 6);
  const bottomRowLinks = links.slice(6);

  const renderLinkElement = (link: UnifiedSocialLink) => {
    const iconNode = renderIcon(link.key, link.label);
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

      {/* Bottom Row - remaining icons */}
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
