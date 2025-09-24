import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  Fade,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  CheckCircle,
  Code,
  Speed,
  Groups,
  Timeline,
  Psychology,
  Build,
  Rocket,
  Email,
  Star,
} from "@mui/icons-material";
import SEO from "../../components/SEO/SEO";
import { usePortfolio } from "../../hooks/usePortfolioData";
// import heroBanner from "../../assets/banner.jpg";

const ServicesPage: React.FC = () => {
  const theme = useTheme();
  const portfolioData = usePortfolio();

  // Reusable background generator matching home page style
  const parallaxBackground = (dark: boolean) =>
    dark
      ? `linear-gradient(135deg, rgba(8,8,18,0.55) 0%, rgba(18,0,36,0.65) 55%, ${theme.palette.primary.main}20 100%)`
      : `linear-gradient(135deg, rgba(255,255,255,0.62) 0%, rgba(250,250,255,0.70) 55%, ${theme.palette.primary.main}15 100%)`;

  const workProcess = [
    {
      label: "Discovery",
      description: "We discuss your project requirements, goals, and timeline.",
      icon: <Psychology />,
    },
    {
      label: "Planning",
      description:
        "I create a detailed project plan with milestones and deliverables.",
      icon: <Timeline />,
    },
    {
      label: "Development",
      description:
        "Regular updates and iterative development with your feedback.",
      icon: <Build />,
    },
    {
      label: "Delivery",
      description:
        "Final testing, deployment, and handover with documentation.",
      icon: <Rocket />,
    },
  ];

  const servicePackages = [
    {
      title: "Consultation",
      subtitle: "Perfect for getting expert advice on your project",
      price: "Contact for Pricing",
      features: [
        "Technical consultation",
        "Architecture review",
        "Technology recommendations",
        "Project planning",
        "Email support",
      ],
      icon: <Psychology />,
      color: theme.palette.info.main,
      recommended: false,
    },
    {
      title: "Development",
      subtitle: "Full-stack development services",
      price: "Contact for Quote",
      features: [
        "Custom web applications",
        "Frontend & backend development",
        "Database design",
        "API development",
        "Testing & deployment",
        "Documentation",
      ],
      icon: <Code />,
      color: theme.palette.primary.main,
      recommended: true,
    },
    {
      title: "Project Leadership",
      subtitle: "Complete project management and leadership",
      price: "Enterprise Pricing",
      features: [
        "Team management",
        "Project planning",
        "Quality assurance",
        "Risk management",
        "Stakeholder communication",
        "Delivery guarantee",
      ],
      icon: <Groups />,
      color: theme.palette.secondary.main,
      recommended: false,
    },
  ];

  const stats = [
    { label: "Years Experience", value: "10+", icon: <Star /> },
    { label: "Client Satisfaction", value: "100%", icon: <CheckCircle /> },
    { label: "Response Time", value: "24h", icon: <Speed /> },
  ];

  return (
    <>
      <SEO
        title="Web Development Services | Victor Williams"
        description="Professional web development services from concept to deployment. Full-stack development, technical consulting, and project leadership with modern technologies."
        keywords="Web Development, React, TypeScript, Full Stack, Technical Consulting, Project Management, Custom Applications"
        url="https://vaporjawn.github.io/services"
      />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Fade in timeout={1000}>
          <Box>
            {/* Hero Section */}
            <Box
              sx={{
                position: "relative",
                mb: 8,
                borderRadius: 4,
                overflow: "hidden",
                px: { xs: 3, md: 6 },
                py: { xs: 8, md: 10 },
                minHeight: { xs: 320, md: 400 },
                background: parallaxBackground(theme.palette.mode === "dark"),
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundAttachment: { xs: "scroll", md: "fixed" },
                boxShadow:
                  theme.palette.mode === "dark"
                    ? `0 10px 40px ${theme.palette.primary.main}40`
                    : `0 10px 40px ${theme.palette.primary.main}30`,
                textAlign: "center",
              }}
            >
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                  fontWeight: 800,
                  letterSpacing: "-1px",
                  lineHeight: 1.1,
                  mb: 3,
                  background: `linear-gradient(60deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  textShadow:
                    theme.palette.mode === "dark"
                      ? "0 4px 18px rgba(0,0,0,0.6)"
                      : "0 4px 14px rgba(0,0,0,0.25)",
                }}
              >
                Web Development Services
              </Typography>
              <Typography
                variant="h5"
                component="h2"
                sx={{
                  fontSize: { xs: "1.2rem", md: "1.5rem" },
                  fontWeight: 400,
                  lineHeight: 1.6,
                  maxWidth: "800px",
                  mx: "auto",
                  color:
                    theme.palette.mode === "dark"
                      ? theme.palette.grey[200]
                      : theme.palette.text.secondary,
                  textShadow:
                    theme.palette.mode === "dark"
                      ? "0 2px 8px rgba(0,0,0,0.6)"
                      : "0 2px 6px rgba(0,0,0,0.25)",
                }}
              >
                From concept to deployment, I deliver high-quality web solutions
                that drive results and exceed expectations.
              </Typography>
            </Box>

            {/* How I Work Section */}
            <Box sx={{ mb: 8 }}>
              <Typography
                variant="h2"
                component="h2"
                sx={{
                  fontSize: { xs: "2rem", md: "2.5rem" },
                  fontWeight: 600,
                  textAlign: "center",
                  mb: 2,
                }}
              >
                How I Work
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  textAlign: "center",
                  color: theme.palette.text.secondary,
                  mb: 6,
                  fontSize: { xs: "1rem", md: "1.1rem" },
                }}
              >
                A proven 4-step process that ensures successful project delivery
                and exceptional results.
              </Typography>

              <Grid container spacing={4}>
                {workProcess.map((step, index) => (
                  <Grid item xs={12} md={6} lg={3} key={index}>
                    <Card
                      sx={{
                        height: "100%",
                        background:
                          theme.palette.mode === "dark"
                            ? `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.grey[900]})`
                            : `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.grey[50]})`,
                        borderRadius: 3,
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        "&:hover": {
                          transform: "translateY(-8px)",
                          boxShadow: `0 12px 40px ${theme.palette.primary.main}20`,
                        },
                      }}
                    >
                      <CardContent sx={{ p: 4, textAlign: "center" }}>
                        <Box
                          sx={{
                            width: 64,
                            height: 64,
                            borderRadius: "50%",
                            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mx: "auto",
                            mb: 3,
                            color: "white",
                          }}
                        >
                          {step.icon}
                        </Box>
                        <Typography
                          variant="h5"
                          component="h3"
                          sx={{ fontWeight: 600, mb: 2 }}
                        >
                          {step.label}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            color: theme.palette.text.secondary,
                            lineHeight: 1.6,
                          }}
                        >
                          {step.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Services Pricing Section */}
            <Box sx={{ mb: 8 }}>
              <Typography
                variant="h2"
                component="h2"
                sx={{
                  fontSize: { xs: "2rem", md: "2.5rem" },
                  fontWeight: 600,
                  textAlign: "center",
                  mb: 2,
                }}
              >
                Simple, Transparent Pricing
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  textAlign: "center",
                  color: theme.palette.text.secondary,
                  mb: 6,
                  fontSize: { xs: "1rem", md: "1.1rem" },
                }}
              >
                Choose the package that fits your project needs. No hidden fees,
                no surprises.
              </Typography>

              <Grid container spacing={4} justifyContent="center">
                {servicePackages.map((pkg, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <Card
                      sx={{
                        position: "relative",
                        height: "100%",
                        background:
                          theme.palette.mode === "dark"
                            ? `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.grey[900]})`
                            : `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.grey[50]})`,
                        borderRadius: 3,
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        border: pkg.recommended
                          ? `2px solid ${theme.palette.primary.main}`
                          : "1px solid transparent",
                        "&:hover": {
                          transform: "translateY(-8px)",
                          boxShadow: `0 12px 40px ${pkg.color}30`,
                        },
                      }}
                    >
                      {pkg.recommended && (
                        <Chip
                          label="Recommended"
                          sx={{
                            position: "absolute",
                            top: -12,
                            left: "50%",
                            transform: "translateX(-50%)",
                            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                            color: "white",
                            fontWeight: 600,
                          }}
                        />
                      )}
                      <CardContent sx={{ p: 4, textAlign: "center" }}>
                        <Box
                          sx={{
                            width: 64,
                            height: 64,
                            borderRadius: "50%",
                            background: `linear-gradient(45deg, ${pkg.color}, ${theme.palette.secondary.main})`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mx: "auto",
                            mb: 3,
                            color: "white",
                          }}
                        >
                          {pkg.icon}
                        </Box>
                        <Typography
                          variant="h4"
                          component="h3"
                          sx={{ fontWeight: 600, mb: 1 }}
                        >
                          {pkg.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: theme.palette.text.secondary, mb: 2 }}
                        >
                          {pkg.subtitle}
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 600,
                            mb: 3,
                            color: pkg.color,
                          }}
                        >
                          {pkg.price}
                        </Typography>
                        <List sx={{ mb: 3 }}>
                          {pkg.features.map((feature, featureIndex) => (
                            <ListItem
                              key={featureIndex}
                              sx={{ px: 0, py: 0.5 }}
                            >
                              <ListItemIcon sx={{ minWidth: 32 }}>
                                <CheckCircle
                                  sx={{ color: pkg.color, fontSize: 20 }}
                                />
                              </ListItemIcon>
                              <ListItemText
                                primary={feature}
                                primaryTypographyProps={{
                                  fontSize: "0.9rem",
                                  color: theme.palette.text.secondary,
                                }}
                              />
                            </ListItem>
                          ))}
                        </List>
                        <Button
                          variant="contained"
                          fullWidth
                          sx={{
                            background: `linear-gradient(45deg, ${pkg.color}, ${theme.palette.secondary.main})`,
                            borderRadius: 2,
                            py: 1.5,
                            fontSize: "1rem",
                            fontWeight: 600,
                            textTransform: "none",
                            "&:hover": {
                              transform: "translateY(-2px)",
                              boxShadow: `0 8px 25px ${pkg.color}40`,
                            },
                          }}
                          onClick={() =>
                            (window.location.href = `mailto:${portfolioData?.personalInfo.email}?subject=Interested in ${pkg.title} Package`)
                          }
                        >
                          Get Started
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Stats Section */}
            <Box sx={{ mb: 8 }}>
              <Grid container spacing={4} justifyContent="center">
                {stats.map((stat, index) => (
                  <Grid item xs={12} sm={4} key={index}>
                    <Box sx={{ textAlign: "center" }}>
                      <Box
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: "50%",
                          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mx: "auto",
                          mb: 2,
                          color: "white",
                        }}
                      >
                        {stat.icon}
                      </Box>
                      <Typography
                        variant="h3"
                        sx={{
                          fontSize: "2.5rem",
                          fontWeight: 800,
                          color: theme.palette.primary.main,
                          mb: 1,
                        }}
                      >
                        {stat.value}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 500,
                          color: theme.palette.text.secondary,
                        }}
                      >
                        {stat.label}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* CTA Section */}
            <Box
              sx={{
                textAlign: "center",
                py: 8,
                px: 4,
                position: "relative",
                overflow: "hidden",
                borderRadius: 4,
                background: parallaxBackground(theme.palette.mode === "dark"),
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundAttachment: { xs: "scroll", md: "fixed" },
                boxShadow:
                  theme.palette.mode === "dark"
                    ? `0 10px 40px ${theme.palette.primary.main}30`
                    : `0 10px 40px ${theme.palette.primary.main}25`,
                "&::before": {
                  content: "\"\"",
                  position: "absolute",
                  inset: 0,
                  background:
                    theme.palette.mode === "dark"
                      ? "rgba(10,10,20,0.45)"
                      : "rgba(255,255,255,0.55)",
                  backdropFilter: "blur(4px)",
                },
                "&::after": {
                  content: "\"\"",
                  position: "absolute",
                  inset: 0,
                  boxShadow:
                    theme.palette.mode === "dark"
                      ? `0 0 0 2px ${theme.palette.primary.main}40 inset, 0 0 30px ${theme.palette.secondary.main}30 inset`
                      : `0 0 0 2px ${theme.palette.primary.main}25 inset, 0 0 20px ${theme.palette.secondary.main}20 inset`,
                  pointerEvents: "none",
                },
              }}
            >
              <Typography
                variant="h3"
                component="h3"
                sx={{
                  fontSize: { xs: "1.8rem", md: "2.5rem" },
                  fontWeight: 600,
                  mb: 2,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                Let's Build Something Amazing
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "1.1rem", md: "1.3rem" },
                  color: theme.palette.text.secondary,
                  mb: 4,
                  position: "relative",
                  zIndex: 1,
                  lineHeight: 1.6,
                }}
              >
                Ready to transform your ideas into reality? Let's discuss your
                project and create something extraordinary together.
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 3,
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<Email />}
                  onClick={() =>
                    (window.location.href = `mailto:${portfolioData?.personalInfo.email}?subject=New Project Inquiry`)
                  }
                  sx={{
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    borderRadius: 2,
                    px: 4,
                    py: 1.5,
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    textTransform: "none",
                    boxShadow: `0 4px 20px ${theme.palette.primary.main}30`,
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: `0 8px 30px ${theme.palette.primary.main}40`,
                      background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                    },
                  }}
                >
                  Start Your Project
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => (window.location.href = "/projects")}
                  sx={{
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main,
                    borderRadius: 2,
                    px: 4,
                    py: 1.5,
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    textTransform: "none",
                    borderWidth: 2,
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      borderColor: theme.palette.primary.main,
                      backgroundColor: `${theme.palette.primary.main}10`,
                      transform: "translateY(-2px)",
                      boxShadow: `0 8px 25px ${theme.palette.primary.main}20`,
                    },
                  }}
                >
                  View Portfolio
                </Button>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Container>
    </>
  );
};

export default ServicesPage;
