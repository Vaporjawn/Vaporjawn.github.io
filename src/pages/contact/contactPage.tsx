import React, { useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Email as EmailIcon,
  LinkedIn as LinkedInIcon,
  Schedule as ScheduleIcon,
  ExpandMore as ExpandMoreIcon,
  Launch as LaunchIcon,
} from "@mui/icons-material";
import SEO from "../../components/SEO/SEO";
import { usePortfolio } from "../../hooks/usePortfolioData";
import {
  VaporwavePink,
  VaporwavePurple,
  VaporwaveBlue,
  VaporwaveBlueGreen,
  VaporwaveGreen,
} from "../../colors";

interface ContactMethod {
  title: string;
  description: string;
  action: string;
  icon: React.ReactNode;
  color: string;
  link: string;
}

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

const ContactPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { personalInfo } = usePortfolio();

  // Handle scroll to FAQ section when hash is present
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === "#faq") {
      // Small delay to ensure the page is fully rendered
      setTimeout(() => {
        const element = document.getElementById("faq");
        if (element) {
          const yOffset = -100; // Offset for fixed header or spacing
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 100);
    }
  }, []);

  const contactMethods: ContactMethod[] = [
    {
      title: "Email",
      description: "Send me an email anytime",
      action: personalInfo.email,
      icon: <EmailIcon sx={{ fontSize: 32 }} />,
      color: VaporwavePink,
      link: `mailto:${personalInfo.email}`,
    },
    {
      title: "LinkedIn",
      description: "Connect with me professionally",
      action: "/in/victorwilliams",
      icon: <LinkedInIcon sx={{ fontSize: 32 }} />,
      color: VaporwaveBlue,
      link: "https://linkedin.com/in/victorwilliams",
    },
    {
      title: "Schedule a Call",
      description: "Book a 30-min consultation",
      action: "cal.com/vaporjawn",
      icon: <ScheduleIcon sx={{ fontSize: 32 }} />,
      color: VaporwaveGreen,
      link: "https://cal.com/vaporjawn",
    },
  ];

  const faqs: FAQ[] = [
    {
      question: "What do you actually do as a software engineer?",
      answer: "I build full-stack systems end to end—frontend, backend, infra, and the glue in between. Web, mobile, cloud, APIs, CI/CD. If it ships, scales, and survives production, I've probably touched it.",
      category: "role",
    },
    {
      question: "What level are you operating at right now?",
      answer: "Senior+ territory. I've led teams, owned architectures, mentored engineers, and stepped into roles like Tech Lead, Project Manager, Solutions Architect, and DevOps when the situation demanded it. Titles flex; responsibility doesn't.",
      category: "experience",
    },
    {
      question: "What kind of problems do you like solving?",
      answer: "Messy ones. Legacy systems, tech debt, scaling bottlenecks, unclear requirements, and \"this needs to work yesterday.\" I specialize in turning chaos into systems that people can actually rely on.",
      category: "expertise",
    },
    {
      question: "What industries have you worked in?",
      answer: "Fintech, food tech, marketplaces, enterprise platforms, SaaS, and internal tooling. From banking services to restaurant POS integrations to Fortune 500 testing platforms. Variety sharpened the blade.",
      category: "background",
    },
    {
      question: "What's your strongest technical stack?",
      answer: "Modern JavaScript/TypeScript ecosystems (React, Node), plus .NET, Go, Python, Java, SQL/Postgres, Docker, and cloud platforms like AWS and Azure. I adapt fast, but I don't fake fundamentals.",
      category: "technical",
    },
    {
      question: "Do you prefer frontend or backend?",
      answer: "Both. Frontend for user empathy and experience. Backend for power, scale, and correctness. Full-stack isn't a buzzword to me—it's leverage.",
      category: "specialization",
    },
    {
      question: "What separates you from other senior engineers?",
      answer: "I think in systems, not tickets. I care about business impact, team velocity, and long-term maintainability—not just getting green checkmarks in Jira. I fix root causes instead of babysitting symptoms.",
      category: "differentiator",
    },
    {
      question: "Have you led or managed other engineers?",
      answer: "Yes. I've led teams, mentored juniors, coordinated across countries, and reduced operational load (like cutting open tickets by 87%). Leadership to me means making everyone else better.",
      category: "leadership",
    },
    {
      question: "What kind of environments do you thrive in?",
      answer: "High-trust, high-ownership environments. Places where engineers are expected to think, not just execute. I do best where clarity, accountability, and ambition coexist.",
      category: "culture",
    },
    {
      question: "What are you looking for next?",
      answer: "Work that matters. Teams that value craftsmanship. Problems that stretch me. I'm not chasing hype—I'm building durable things with people who care about doing it right.",
      category: "opportunity",
    },
  ];

  // Remove unused groupedFAQs variable

  return (
    <>
      <SEO
        title="Contact - Let's Work Together"
        description="Have a project in mind? Let's discuss how we can bring your ideas to life. Multiple ways to connect and comprehensive FAQ about development services."
        keywords="contact, web development, consultation, project inquiry, technical consulting"
      />

      <Box
        sx={{
          minHeight: "100vh",
          background: theme.palette.mode === "dark"
            ? `linear-gradient(135deg, ${VaporwaveBlue}15, ${VaporwavePurple}15, ${VaporwavePink}10)`
            : `linear-gradient(135deg, ${VaporwaveBlue}08, ${VaporwavePurple}08, ${VaporwavePink}05)`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background Effects */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `radial-gradient(circle at 20% 20%, ${VaporwavePink}20 0%, transparent 50%),
                        radial-gradient(circle at 80% 80%, ${VaporwaveBlue}20 0%, transparent 50%),
                        radial-gradient(circle at 40% 60%, ${VaporwavePurple}15 0%, transparent 50%)`,
            zIndex: 0,
          }}
        />

        <Container
          maxWidth="lg"
          sx={{
            position: "relative",
            zIndex: 1,
            py: { xs: 6, md: 10 },
          }}
        >
          {/* Hero Section */}
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography
              variant={isMobile ? "h3" : "h2"}
              sx={{
                fontWeight: "bold",
                background: `linear-gradient(45deg, ${VaporwavePink}, ${VaporwaveBlueGreen})`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 2,
                textShadow: `0 0 30px ${VaporwavePink}30`,
              }}
            >
              Let's Work Together
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.text.secondary,
                maxWidth: 600,
                mx: "auto",
                lineHeight: 1.6,
              }}
            >
              Have a project in mind? I'd love to hear about it and discuss how we can bring your ideas to life.
            </Typography>
          </Box>

          {/* Contact Methods Section */}
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
              Select the most convenient way to reach out, and I'll get back to you as soon as possible.
            </Typography>

            <Grid container spacing={{ xs: 3, md: 4 }} sx={{ px: { xs: 0, md: 2 } }}>
              {contactMethods.map((method, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card
                    sx={{
                      height: "100%",
                      minHeight: { xs: "auto", md: "380px" },
                      background: theme.palette.mode === "dark"
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
                    onClick={() => window.open(method.link, "_blank")}
                  >
                    <CardContent sx={{ p: { xs: 3, md: 4.5 }, textAlign: "center", position: "relative", zIndex: 1 }}>
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
                          transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                          border: `3px solid ${theme.palette.mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.3)"}`,
                        }}
                      >
                        {React.cloneElement(method.icon as React.ReactElement, { sx: { fontSize: { xs: 36, md: 40 } } })}
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

          {/* FAQ Section */}
          <Box id="faq" sx={{ mb: 8, scrollMarginTop: "120px" }}>
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
                mb: 1,
                fontWeight: "bold",
                background: `linear-gradient(45deg, ${VaporwavePurple}, ${VaporwavePink})`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Frequently Asked Questions
            </Typography>
            <Typography
              variant="body1"
              sx={{
                textAlign: "center",
                color: theme.palette.text.secondary,
                mb: 6,
              }}
            >
              Find answers to common inquiries about my services and processes.
            </Typography>

            <Box sx={{ maxWidth: 900, mx: "auto" }}>
              {faqs.map((faq, index) => (
                <Accordion
                  key={index}
                  sx={{
                    mb: 2,
                    background: theme.palette.mode === "dark"
                      ? `linear-gradient(135deg, ${VaporwaveBlue}10, ${VaporwavePurple}10)`
                      : `linear-gradient(135deg, ${VaporwaveBlue}05, ${VaporwavePurple}05)`,
                    backdropFilter: "blur(10px)",
                    border: `1px solid ${VaporwavePurple}20`,
                    borderRadius: 2,
                    "&:before": { display: "none" },
                    "&.Mui-expanded": {
                      border: `1px solid ${VaporwavePurple}40`,
                      boxShadow: `0 8px 25px ${VaporwavePurple}20`,
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <ExpandMoreIcon sx={{ color: VaporwaveBlueGreen }} />
                    }
                    sx={{
                      "& .MuiAccordionSummary-content": {
                        alignItems: "center",
                        gap: 2,
                      },
                    }}
                  >
                    <Chip
                      label={faq.category}
                      size="small"
                      sx={{
                        background: `linear-gradient(45deg, ${VaporwaveGreen}, ${VaporwaveBlueGreen})`,
                        color: VaporwaveBlue,
                        fontWeight: "bold",
                        fontSize: "0.75rem",
                      }}
                    />
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "600",
                        color: theme.palette.text.primary,
                      }}
                    >
                      {faq.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography
                      variant="body1"
                      sx={{
                        color: theme.palette.text.secondary,
                        lineHeight: 1.7,
                        pl: 2,
                      }}
                    >
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </Box>

          {/* CTA Section */}
          <Box
            sx={{
              textAlign: "center",
              py: 8,
              px: 4,
              borderRadius: 4,
              background: theme.palette.mode === "dark"
                ? `linear-gradient(135deg, ${VaporwavePurple}20, ${VaporwavePink}20)`
                : `linear-gradient(135deg, ${VaporwavePurple}15, ${VaporwavePink}15)`,
              backdropFilter: "blur(20px)",
              border: `1px solid ${VaporwavePurple}30`,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                mb: 2,
                background: `linear-gradient(45deg, ${VaporwaveGreen}, ${VaporwaveBlueGreen})`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Ready to Start Your Project?
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.secondary,
                mb: 4,
                maxWidth: 500,
                mx: "auto",
              }}
            >
              Whether you have a clear vision or just an idea, I'm here to help bring it to life. Let's discuss your project and create something amazing together.
            </Typography>
            <Stack
              direction={isMobile ? "column" : "row"}
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <Button
                variant="contained"
                size="large"
                startIcon={<EmailIcon />}
                sx={{
                  px: 4,
                  py: 1.5,
                  background: `linear-gradient(45deg, ${VaporwavePink}, ${VaporwaveBlueGreen})`,
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  borderRadius: 3,
                  "&:hover": {
                    background: `linear-gradient(45deg, ${VaporwavePink}, ${VaporwaveBlue})`,
                    transform: "translateY(-2px)",
                    boxShadow: `0 8px 25px ${VaporwavePink}40`,
                  },
                }}
                onClick={() => window.open(`mailto:${personalInfo.email}`, "_blank")}
              >
                Send Email
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<ScheduleIcon />}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderColor: VaporwaveGreen,
                  color: VaporwaveGreen,
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  borderRadius: 3,
                  "&:hover": {
                    borderColor: VaporwaveGreen,
                    background: `${VaporwaveGreen}15`,
                    transform: "translateY(-2px)",
                  },
                }}
                onClick={() => window.open("https://cal.com/vaporjawn", "_blank")}
              >
                Schedule Call
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ContactPage;