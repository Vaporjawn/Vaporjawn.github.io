import React from "react";
import {
  Box,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import ArticleIcon from "@mui/icons-material/Article";
import XIcon from "@mui/icons-material/X";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGitlab, faReddit, faThreads } from "@fortawesome/free-brands-svg-icons";
import { usePortfolio } from "../../hooks/usePortfolioData";
import { socialLinks } from "../../data/socialLinks";
import { getBrandColor, SocialBrandKey } from "../../data/socialBrandColors";
import BlueskyIcon from "../../assets/logos/Bluesky_Logo.svg";
import NpmIcon from "../../assets/logos/Npm-logo.svg.png";
import DevpostIcon from "../../assets/logos/devpost_logo_icon_169280.svg";
import BuyMeACoffeeIcon from "../../assets/logos/buymeacoffee_logo.svg";

// Custom styled image component for brand icons (ensure square, no stretching)
const ImgIcon = styled("img")(() => ({
  width: 24,
  height: 24,
  display: "block",
  objectFit: "contain",
  aspectRatio: "1 / 1",
  // Prevent sub-pixel rendering blur in some browsers
  imageRendering: "-webkit-optimize-contrast",
}));

const FooterContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100vw",
  marginLeft: "calc(50% - 50vw)",
  background: `linear-gradient(135deg,
    ${theme.palette.secondary.main} 0%,
    ${theme.palette.primary.main} 50%,
    ${theme.palette.secondary.dark} 100%)`,
  padding: theme.spacing(4, 2),
  color: theme.palette.text.primary,
  textAlign: "center",
  boxSizing: "border-box",
}));

const FooterSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  [theme.breakpoints.up("md")]: {
    marginBottom: 0,
  },
}));

const FooterTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "1.1rem",
  letterSpacing: "0.05em",
  marginBottom: theme.spacing(2),
  background: `linear-gradient(45deg, ${theme.palette.vaporwave.pink}, ${theme.palette.vaporwave.purple})`,
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  textTransform: "uppercase",
}));

const FooterLink = styled(Link)(({ theme }) => ({
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

const BrandText = styled(Typography)(({ theme }) => ({
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

const SocialIconContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: theme.spacing(1),
  marginBottom: theme.spacing(3),
  [theme.breakpoints.up("md")]: {
    justifyContent: "flex-start",
  },
}));

interface StyledIconButtonProps {
  $brandcolor?: string;
  $hovercolor?: string;
  $preserve?: boolean;
}

const StyledIconButton = styled(IconButton, {
  shouldForwardProp: (prop) =>
    prop !== "$brandcolor" &&
    prop !== "$hovercolor" &&
    prop !== "$preserve"
})<StyledIconButtonProps>(
  ({ theme, $brandcolor, $hovercolor, $preserve }) => ({
    color: $preserve ? theme.palette.text.secondary : $brandcolor || theme.palette.text.secondary,
    transition: "all 0.3s ease",
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,0.04)"
        : "rgba(0,0,0,0.04)",
    "&:hover": {
      color: $preserve ? $brandcolor || theme.palette.vaporwave.pink : $hovercolor || $brandcolor || theme.palette.vaporwave.pink,
      backgroundColor:
        theme.palette.mode === "dark"
          ? "rgba(255,255,255,0.1)"
          : "rgba(0,0,0,0.08)",
      transform: "translateY(-2px) scale(1.05)",
      boxShadow: `0 4px 15px ${theme.palette.vaporwave.purple}40`,
    },
  })
);

const LegalSection = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(3),
  flexWrap: "wrap",
  marginTop: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: theme.spacing(1),
  },
}));

const Footer: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const portfolio = usePortfolio();

  const quickLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Projects", path: "/projects" },
    { label: "Blog", path: "/blog" },
    { label: "Resume", path: "/resume" },
    { label: "Activity", path: "/activity" },
  ];

  const services = [
    "Web Development",
    "React Development",
    "TypeScript Solutions",
    "UI/UX Design",
    "Portfolio Development",
  ];

  const legalLinks = [
    { label: "FAQs", path: "/contact#faq" },
    { label: "Privacy Policy", path: "/privacy" },
    { label: "Terms of Service", path: "/terms" },
  ];

  // Use unified social links as single source of truth.
  // Show all links in footer for full parity with SocialMedia component
  const allLinks = socialLinks; // no filtering

  const renderIcon = (key: string, label: string, baseColor?: string) => {
    switch (key) {
      case "github":
        return <GitHubIcon fontSize="small" sx={{ color: baseColor }} />;
      case "gitlab":
        return <FontAwesomeIcon icon={faGitlab} style={{ fontSize: "1.05rem", color: baseColor }} />;
      case "reddit":
        return <FontAwesomeIcon icon={faReddit} style={{ fontSize: "1.05rem", color: baseColor }} />;
      case "threads":
        return <FontAwesomeIcon icon={faThreads} style={{ fontSize: "1.05rem", color: baseColor }} />;
      case "linkedin":
        return <LinkedInIcon fontSize="small" sx={{ color: baseColor }} />;
      case "x":
        return <XIcon fontSize="small" sx={{ color: baseColor }} />;
      case "twitter": // backward compatibility if ever appears
        return <TwitterIcon fontSize="small" sx={{ color: baseColor }} />;
      case "email":
        return <EmailIcon fontSize="small" sx={{ color: baseColor }} />;
      case "resume":
        return <ArticleIcon fontSize="small" sx={{ color: baseColor }} />;
      case "npm":
        return <ImgIcon src={NpmIcon} alt={label} />;
      case "bluesky":
        return <ImgIcon src={BlueskyIcon} alt={label} />;
      case "devpost":
        return <ImgIcon src={DevpostIcon} alt={label} />;
      case "buymeacoffee":
        return <ImgIcon src={BuyMeACoffeeIcon} alt={label} />;
      default:
        return null;
    }
  };

  return (
    <FooterContainer component="footer">
      <Box sx={{
        maxWidth: "lg",
        mx: "auto",
        px: { xs: 2, sm: 3, md: 4 },
        width: "100%"
      }}>
        <Grid container spacing={4}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <FooterSection>
              <BrandText variant="h4">Vaporjawn</BrandText>
              <Typography
                variant="body2"
                color="text.primary"
                sx={{
                  mb: 2,
                  lineHeight: 1.7,
                  fontSize: "0.95rem",
                  fontWeight: 400,
                  opacity: 0.9
                }}
              >
                {portfolio?.personalInfo?.bio ||
                  "Passionate developer creating innovative digital experiences with modern web technologies."}
              </Typography>
              <Link
                href={`mailto:${portfolio?.personalInfo?.email || "victor.williams.dev@gmail.com"}`}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  color: "text.primary",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  transition: "color 0.3s ease",
                  "&:hover": {
                    color: "vaporwave.blueGreen",
                  },
                }}
              >
                <EmailIcon fontSize="small" />
                {portfolio?.personalInfo?.email || "victor.williams.dev@gmail.com"}
              </Link>
            </FooterSection>
          </Grid>

          {/* Quick Links Section */}
          <Grid item xs={12} md={4}>
            <FooterSection>
              <FooterTitle variant="h6">Quick Links</FooterTitle>
              <Box>
                {quickLinks.map((link) => (
                  <FooterLink
                    key={link.path}
                    component={RouterLink}
                    to={link.path}
                  >
                    {link.label}
                  </FooterLink>
                ))}
              </Box>
            </FooterSection>
          </Grid>

          {/* Services Section */}
          <Grid item xs={12} md={4}>
            <FooterSection>
              <FooterTitle variant="h6">Services</FooterTitle>
              <Box>
                {services.map((service) => (
                  <Typography
                    key={service}
                    variant="body2"
                    color="text.primary"
                    sx={{
                      lineHeight: 2,
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      opacity: 0.9,
                    }}
                  >
                    {service}
                  </Typography>
                ))}
              </Box>
            </FooterSection>
          </Grid>
        </Grid>

        {/* Divider */}
        <Divider
          sx={{
            my: 4,
            borderColor:
              theme.palette.mode === "dark"
                ? "rgba(255,255,255,0.1)"
                : "rgba(0,0,0,0.1)",
          }}
        />

        {/* Bottom Section - Social Icons and Legal */}
        <Box>
          {/* Social Icons */}
          <SocialIconContainer>
            {allLinks.map((link) => {
              const key = link.key as SocialBrandKey; // narrowing for brand color helper
              const paletteMode: "light" | "dark" = theme.palette.mode === "dark" ? "dark" : "light";
              const brandBase = getBrandColor(key, paletteMode, false);
              const brandHover = getBrandColor(key, paletteMode, true);
              const preserve = ["npm", "bluesky", "devpost", "buymeacoffee"].includes(link.key);
              const iconNode = renderIcon(link.key, link.label, preserve ? undefined : brandBase);
              if (!iconNode) return null;
              const commonProps = {
                component: "a" as const,
                href: link.href,
                "aria-label": link.label,
                title: link.label,
                target: link.kind === "external" ? "_blank" : undefined,
                rel: link.kind === "external" ? "noopener noreferrer" : undefined,
              };
              if (link.kind === "internal") {
                return (
                  <Box
                    key={link.key}
                    component={RouterLink}
                    to={link.href}
                    aria-label={link.label}
                    title={link.label}
                    sx={{ textDecoration: "none", display: "inline-flex" }}
                  >
                    <StyledIconButton
                      aria-label={link.label}
                      title={link.label}
                      $brandcolor={brandBase}
                      $hovercolor={brandHover}
                      $preserve={preserve}
                    >
                      {iconNode}
                    </StyledIconButton>
                  </Box>
                );
              }
              return (
                <StyledIconButton
                  key={link.key}
                  {...commonProps}
                  $brandcolor={brandBase}
                  $hovercolor={brandHover}
                  $preserve={preserve}
                >
                  {iconNode}
                </StyledIconButton>
              );
            })}
          </SocialIconContainer>

          {/* Legal Links and Copyright */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: isMobile ? "column" : "row",
              gap: 2,
            }}
          >
            <Typography variant="body2" color="text.primary" sx={{ fontWeight: 500, fontSize: "0.9rem" }}>
              © {new Date().getFullYear()} {portfolio?.personalInfo?.name || "Victor Williams"}. All
              rights reserved.
            </Typography>

            <LegalSection>
              {legalLinks.map((link, index) => (
                <React.Fragment key={link.path}>
                  <FooterLink
                    component={RouterLink}
                    to={link.path}
                    sx={{ display: "inline" }}
                  >
                    {link.label}
                  </FooterLink>
                  {index < legalLinks.length - 1 && (
                    <Typography
                      variant="body2"
                      color="text.primary"
                      sx={{
                        display: { xs: "none", sm: "inline" },
                        fontWeight: 500,
                        opacity: 0.7
                      }}
                    >
                      •
                    </Typography>
                  )}
                </React.Fragment>
              ))}
            </LegalSection>
          </Box>
        </Box>
      </Box>
    </FooterContainer>
  );
};

export default Footer;
