import React from "react";
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
      question: "What services do you offer?",
      answer: "I offer comprehensive web development services including Full-Stack Development (React, TypeScript, Node.js), Technical Consulting for architecture and performance optimization, and Code Review services to ensure quality and best practices. I specialize in modern web technologies and can help with everything from MVP development to scaling existing applications.",
      category: "services",
    },
    {
      question: "What is your typical development process and how are clients involved?",
      answer: "My development process follows four key phases: Discovery (understanding requirements and technical scope), Planning (architecture design and timeline estimation), Development (iterative development with regular check-ins), and Delivery (testing, deployment, and handover). Clients are involved throughout with regular updates, demo sessions, and feedback incorporation.",
      category: "process",
    },
    {
      question: "What are your pricing models and payment terms?",
      answer: "I offer three main pricing tiers: Consultation ($500) for technical advice and code reviews, Development ($2000) for feature development and bug fixes, and Project Leadership ($5000) for comprehensive project management and architecture. Payment terms are typically 50% upfront and 50% on completion, with flexible arrangements for longer projects.",
      category: "pricing",
    },
    {
      question: "Which technologies do you specialize in for Full-Stack Development?",
      answer: "Frontend: React, TypeScript, Material-UI, modern CSS, responsive design. Backend: Node.js, Python, REST APIs, database design. Tools: Git, Vite, Jest for testing, modern DevOps practices. I focus on modern, maintainable technologies that provide long-term value and excellent developer experience.",
      category: "technical",
    },
    {
      question: "Can you help with an existing project or only new ones? What about project rescue?",
      answer: "I work with both new and existing projects. For existing projects, I can help with feature additions, performance optimization, code refactoring, and technical debt reduction. I also specialize in project rescue situations - taking over stalled projects, fixing critical issues, and getting development back on track.",
      category: "projects",
    },
    {
      question: "How do I get started on a project with you, and what's the initial consultation like?",
      answer: "Getting started is simple: reach out via email, LinkedIn, or schedule a call. The initial consultation is a 30-minute discussion where we'll review your project goals, technical requirements, timeline, and budget. I'll provide honest feedback about feasibility and approach, and if we're a good fit, I'll create a detailed project proposal.",
      category: "getting-started",
    },
    {
      question: "Do you offer ongoing support and maintenance, and what are the terms?",
      answer: "Yes, I offer ongoing support and maintenance packages. This includes bug fixes, security updates, performance monitoring, and feature enhancements. Support terms are typically on a retainer basis or hourly rate, depending on the project scope and client needs. I believe in long-term partnerships with my clients.",
      category: "support",
    },
    {
      question: "What kind of technical consulting do you provide, and how can it benefit my project's timeline and budget?",
      answer: "Technical consulting includes architecture review, performance optimization, technology stack selection, code review, and team mentoring. This can significantly benefit your timeline by identifying potential issues early, optimizing development processes, and ensuring best practices. It often saves money by preventing costly rewrites and technical debt.",
      category: "consulting",
    },
    {
      question: "How are project timelines estimated, and what happens if there are delays?",
      answer: "Timelines are estimated based on detailed requirement analysis, technical complexity assessment, and my experience with similar projects. I provide realistic estimates with buffer time for unexpected challenges. If delays occur, I communicate immediately with revised timelines and mitigation strategies. Most delays are avoided through proper planning and regular check-ins.",
      category: "timeline",
    },
    {
      question: "What are the terms regarding intellectual property (IP) ownership for the developed software?",
      answer: "Generally, clients retain full intellectual property rights to custom-developed software. I retain rights to any pre-existing tools, frameworks, or general methodologies I bring to the project. All IP terms are clearly defined in the project contract before work begins, ensuring transparency and protection for both parties.",
      category: "legal",
    },
    {
      question: "How do you handle changes in project scope or requirements (scope creep)?",
      answer: "Scope changes are handled through a formal change request process. I document the requested changes, assess their impact on timeline and budget, and provide a written amendment for approval. Small changes may be absorbed, but significant changes require project plan updates. Clear communication and documentation prevent scope creep issues.",
      category: "scope",
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
                mb: 1,
                fontWeight: "bold",
                background: `linear-gradient(45deg, ${VaporwaveBlue}, ${VaporwaveGreen})`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Choose Your Preferred Method
            </Typography>
            <Typography
              variant="body1"
              sx={{
                textAlign: "center",
                color: theme.palette.text.secondary,
                mb: 6,
              }}
            >
              Select the most convenient way to reach out, and I'll get back to you as soon as possible.
            </Typography>

            <Grid container spacing={4}>
              {contactMethods.map((method, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card
                    sx={{
                      height: "100%",
                      background: theme.palette.mode === "dark"
                        ? `linear-gradient(135deg, ${method.color}20, ${VaporwavePurple}15)`
                        : `linear-gradient(135deg, ${method.color}15, ${VaporwavePurple}10)`,
                      backdropFilter: "blur(20px)",
                      border: `1px solid ${method.color}30`,
                      borderRadius: 3,
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      cursor: "pointer",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: `0 20px 40px ${method.color}30`,
                        border: `1px solid ${method.color}50`,
                      },
                    }}
                    onClick={() => window.open(method.link, "_blank")}
                  >
                    <CardContent sx={{ p: 4, textAlign: "center" }}>
                      <Box
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: "50%",
                          background: `linear-gradient(45deg, ${method.color}, ${VaporwaveBlueGreen})`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mx: "auto",
                          mb: 3,
                          color: "white",
                          boxShadow: `0 10px 30px ${method.color}40`,
                        }}
                      >
                        {method.icon}
                      </Box>
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: "bold",
                          mb: 1,
                          color: theme.palette.text.primary,
                        }}
                      >
                        {method.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: theme.palette.text.secondary,
                          mb: 3,
                        }}
                      >
                        {method.description}
                      </Typography>
                      <Button
                        variant="outlined"
                        endIcon={<LaunchIcon />}
                        sx={{
                          borderColor: method.color,
                          color: method.color,
                          fontWeight: "bold",
                          "&:hover": {
                            borderColor: method.color,
                            background: `${method.color}15`,
                          },
                        }}
                      >
                        {method.action}
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* FAQ Section */}
          <Box sx={{ mb: 8 }}>
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