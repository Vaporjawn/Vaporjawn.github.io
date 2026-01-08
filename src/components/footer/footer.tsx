/**
 * Footer Component
 * Main footer with brand info, navigation links, services, and social icons
 * @module components/footer/Footer
 */

import React from "react";
import {
  Box,
  Grid,
  Typography,
  Divider,
  useTheme,
  useMediaQuery,
  Link,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import { usePortfolio } from "../../hooks/usePortfolioData";
import { socialLinks } from "../../data/socialLinks";
import { getBrandColor, SocialBrandKey } from "../../data/socialBrandColors";
import { renderSocialIcon } from "../socials/utils/iconMapper";
import {
  FooterContainer,
  FooterSection,
  FooterTitle,
  FooterLink,
  BrandText,
  SocialIconContainer,
  StyledIconButton,
  LegalSection,
} from "./styledComponents";
import { quickLinks, services, legalLinks } from "./constants";


/**
 * Footer component displaying brand information, navigation, and social links
 *
 * @returns Footer component with multi-section layout
 */
const Footer: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const portfolio = usePortfolio();

  // Use unified social links as single source of truth.
  // Show all links in footer for full parity with SocialMedia component
  const allLinks = socialLinks; // no filtering

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
              const key = link.key as SocialBrandKey;
              const paletteMode: "light" | "dark" =
                theme.palette.mode === "dark" ? "dark" : "light";
              const brandBase = getBrandColor(key, paletteMode, false);
              const brandHover = getBrandColor(key, paletteMode, true);
              const preserve = ["npm", "bluesky", "devpost", "buymeacoffee"].includes(
                link.key
              );

              // Use iconMapper utility instead of local renderIcon
              const iconNode = renderSocialIcon(link.key, link.label, paletteMode);

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
