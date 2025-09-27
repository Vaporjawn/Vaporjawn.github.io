import React from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Link,
  useTheme,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import SEO from "../../components/SEO/SEO";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(3),
  background: theme.palette.mode === "dark"
    ? "rgba(25, 25, 35, 0.9)"
    : "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(10px)",
  border: `1px solid ${theme.palette.mode === "dark"
    ? "rgba(139, 69, 255, 0.2)"
    : "rgba(139, 69, 255, 0.1)"}`,
  borderRadius: theme.spacing(2),
}));

const SectionTitle = styled(Typography)<{ component?: React.ElementType }>(({ theme }) => ({
  fontWeight: 700,
  marginBottom: theme.spacing(2),
  background: `linear-gradient(45deg, ${theme.palette.vaporwave.pink}, ${theme.palette.vaporwave.purple})`,
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
}));

const MainTitle = styled(Typography)<{ component?: React.ElementType }>(({ theme }) => ({
  fontWeight: 700,
  marginBottom: theme.spacing(3),
  textAlign: "center",
  background: `linear-gradient(45deg, ${theme.palette.vaporwave.green}, ${theme.palette.vaporwave.blueGreen}, ${theme.palette.vaporwave.pink})`,
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  textShadow: `0 0 20px ${theme.palette.vaporwave.blueGreen}50`,
}));

const ImportantNotice = styled(Alert)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  background: `linear-gradient(135deg, ${theme.palette.vaporwave.purple}20, ${theme.palette.vaporwave.pink}20)`,
  border: `1px solid ${theme.palette.vaporwave.pink}50`,
  "& .MuiAlert-icon": {
    color: theme.palette.vaporwave.pink,
  },
}));

const TermsOfService: React.FC = () => {
  const theme = useTheme();

  return (
    <>
      <SEO
        title="Terms of Service - Victor Williams"
        description="Terms of Service governing the use of Victor Williams' website and professional development services."
        url="https://vaporjawn.github.io/terms"
      />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <MainTitle variant="h3" component="h1">
          Terms of Service
        </MainTitle>

        <Typography
          variant="subtitle1"
          color="text.secondary"
          textAlign="center"
          sx={{ mb: 4 }}
        >
          These terms govern the use of my website and the provision of my professional development services.
        </Typography>

        <StyledPaper>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            <strong>Last updated: December 1, 2024</strong>
          </Typography>
        </StyledPaper>

        <StyledPaper>
          <SectionTitle variant="h4" component="h2">
            Introduction
          </SectionTitle>
          <Typography variant="body1" paragraph>
            Welcome to vaporjawn.com ("I," "my," or "me"). These Terms of Service ("Terms") govern your use of my website
            and any professional services provided by Victor Williams ("I," "my," or "me"). By accessing my website or
            engaging my services, you agree to be bound by these Terms.
          </Typography>
          <Typography variant="body1" paragraph>
            Please read these Terms carefully before using my website or services. If you do not agree with any part
            of these Terms, you should not use my website or engage my services.
          </Typography>
        </StyledPaper>

        <StyledPaper>
          <SectionTitle variant="h4" component="h2">
            Website Usage
          </SectionTitle>

          <Typography variant="h5" component="h3" sx={{ fontWeight: 600, mb: 2, color: theme.palette.vaporwave.blueGreen }}>
            Permitted Use
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Portfolio Browsing"
                secondary="Browse my portfolio and read my content for legitimate business purposes"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Professional Contact"
                secondary="Contact me for professional inquiries and project discussions"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Content Sharing"
                secondary="Share my content with proper attribution and linking"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Subscription Services"
                secondary="Subscribe to my newsletter and updates"
              />
            </ListItem>
          </List>

          <Typography variant="h5" component="h3" sx={{ fontWeight: 600, mb: 2, mt: 3, color: theme.palette.vaporwave.blueGreen }}>
            Prohibited Activities
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Content Reproduction"
                secondary="Reproduce, copy, or redistribute my content without permission"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Automated Tools"
                secondary="Use automated tools to scrape or download my content"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Unauthorized Access"
                secondary="Attempt to gain unauthorized access to my systems"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="False Information"
                secondary="Submit false or misleading information in contact forms"
              />
            </ListItem>
          </List>
        </StyledPaper>

        <StyledPaper>
          <SectionTitle variant="h4" component="h2">
            Professional Service Terms
          </SectionTitle>

          <Typography variant="h5" component="h3" sx={{ fontWeight: 600, mb: 2, color: theme.palette.vaporwave.blueGreen }}>
            Service Scope & Agreements
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Written Agreements"
                secondary="All projects require a signed written agreement before work begins"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Scope Definition"
                secondary="Project scope, deliverables, and timelines must be clearly defined in writing"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Change Requests"
                secondary="Any scope changes require written approval and may affect timeline and cost"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Communication"
                secondary="Primary communication will be conducted via email and scheduled meetings"
              />
            </ListItem>
          </List>

          <Typography variant="h5" component="h3" sx={{ fontWeight: 600, mb: 2, mt: 3, color: theme.palette.vaporwave.blueGreen }}>
            Client Responsibilities
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Timely Communication"
                secondary="Respond to project-related communications within 48 hours"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Required Materials"
                secondary="Provide all necessary content, assets, and access credentials promptly"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Review & Feedback"
                secondary="Provide constructive feedback within agreed timeframes"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Payment Terms"
                secondary="Adhere to agreed payment schedules and terms"
              />
            </ListItem>
          </List>
        </StyledPaper>

        <StyledPaper>
          <SectionTitle variant="h4" component="h2">
            Payment & Billing Terms
          </SectionTitle>

          <Typography variant="h5" component="h3" sx={{ fontWeight: 600, mb: 2, color: theme.palette.vaporwave.blueGreen }}>
            Payment Structure
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Project Deposit"
                secondary="50% deposit required before project start"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Progress Payments"
                secondary="Progress payments for larger projects"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Final Payment"
                secondary="Final payment due upon project completion"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Hourly Services"
                secondary="Hourly billing for consulting services"
              />
            </ListItem>
          </List>

          <Typography variant="h5" component="h3" sx={{ fontWeight: 600, mb: 2, mt: 3, color: theme.palette.vaporwave.blueGreen }}>
            Payment Terms
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Payment Timeline"
                secondary="Net 15 payment terms from invoice date"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Late Fees"
                secondary="Late fees apply after 30 days"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Work Suspension"
                secondary="Work suspension after 45 days overdue"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Payment Methods"
                secondary="Bank transfer or online payment accepted"
              />
            </ListItem>
          </List>

          <ImportantNotice severity="warning" sx={{ mt: 3 }}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Important Notice
            </Typography>
            <Typography variant="body2">
              All project work is suspended if payments become overdue. Additional fees may apply for project resumption.
            </Typography>
          </ImportantNotice>
        </StyledPaper>

        <StyledPaper>
          <SectionTitle variant="h4" component="h2">
            Intellectual Property Rights
          </SectionTitle>

          <Typography variant="h5" component="h3" sx={{ fontWeight: 600, mb: 2, color: theme.palette.vaporwave.blueGreen }}>
            Client Work & Deliverables
          </Typography>
          <Typography variant="body1" paragraph>
            Upon full payment, clients receive ownership of custom code and designs created specifically for their project.
            However, I retain the right to:
          </Typography>
          <List>
            <ListItem>
              <ListItemText secondary="Use general methodologies, techniques, and know-how in future projects" />
            </ListItem>
            <ListItem>
              <ListItemText secondary="Display completed work in my portfolio (with client permission)" />
            </ListItem>
            <ListItem>
              <ListItemText secondary="Reuse generic code components and libraries in other projects" />
            </ListItem>
          </List>

          <Typography variant="h5" component="h3" sx={{ fontWeight: 600, mb: 2, mt: 3, color: theme.palette.vaporwave.blueGreen }}>
            Third-Party Resources
          </Typography>
          <Typography variant="body1" paragraph>
            Projects may incorporate third-party libraries, frameworks, and resources with their own licensing terms.
            Clients are responsible for compliance with all applicable licenses.
          </Typography>
        </StyledPaper>

        <StyledPaper>
          <SectionTitle variant="h4" component="h2">
            Project Delivery & Support
          </SectionTitle>

          <Typography variant="h5" component="h3" sx={{ fontWeight: 600, mb: 2, color: theme.palette.vaporwave.blueGreen }}>
            Delivery Terms
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Timeline Estimates"
                secondary="Provided in good faith but not guaranteed"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Testing Period"
                secondary="7-day testing period for bug reports"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Minor Revisions"
                secondary="Included within agreed scope"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Final Delivery"
                secondary="Via agreed delivery method"
              />
            </ListItem>
          </List>

          <Typography variant="h5" component="h3" sx={{ fontWeight: 600, mb: 2, mt: 3, color: theme.palette.vaporwave.blueGreen }}>
            Support & Maintenance
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Bug Fixes"
                secondary="30-day warranty for functionality issues"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Documentation"
                secondary="Basic usage documentation provided"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Training"
                secondary="Basic handover session included"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Extended Support"
                secondary="Available via separate agreement"
              />
            </ListItem>
          </List>
        </StyledPaper>

        <StyledPaper>
          <SectionTitle variant="h4" component="h2">
            Liability & Warranties
          </SectionTitle>

          <Typography variant="h5" component="h3" sx={{ fontWeight: 600, mb: 2, color: theme.palette.vaporwave.blueGreen }}>
            Service Warranties
          </Typography>
          <Typography variant="body1" paragraph>
            I warrant that my services will be performed in a professional and workmanlike manner in accordance with
            industry standards. However, I make no warranties regarding:
          </Typography>
          <List>
            <ListItem>
              <ListItemText secondary="Compatibility with future software versions or updates" />
            </ListItem>
            <ListItem>
              <ListItemText secondary="Performance on all devices, browsers, or operating systems" />
            </ListItem>
            <ListItem>
              <ListItemText secondary="Specific business results or revenue outcomes" />
            </ListItem>
            <ListItem>
              <ListItemText secondary="Third-party service integrations or external dependencies" />
            </ListItem>
          </List>

          <Typography variant="h5" component="h3" sx={{ fontWeight: 600, mb: 2, mt: 3, color: theme.palette.vaporwave.blueGreen }}>
            Limitation of Liability
          </Typography>
          <Typography variant="body1" paragraph>
            My total liability for any claims arising from my services shall not exceed the total amount paid for the
            specific project in question. I am not liable for any indirect, incidental, or consequential damages.
          </Typography>
        </StyledPaper>

        <StyledPaper>
          <SectionTitle variant="h4" component="h2">
            Project Termination
          </SectionTitle>

          <Typography variant="h5" component="h3" sx={{ fontWeight: 600, mb: 2, color: theme.palette.vaporwave.blueGreen }}>
            Client Termination Rights
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Notice Period"
                secondary="14-day written notice required for termination"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Payment Obligation"
                secondary="Payment due for all completed work"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Refund Policy"
                secondary="Partial refund of unused deposits (minus costs)"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Work Delivery"
                secondary="Delivery of work completed to date"
              />
            </ListItem>
          </List>

          <Typography variant="h5" component="h3" sx={{ fontWeight: 600, mb: 2, mt: 3, color: theme.palette.vaporwave.blueGreen }}>
            My Termination Rights
          </Typography>
          <List>
            <ListItem>
              <ListItemText secondary="Non-payment beyond agreed terms" />
            </ListItem>
            <ListItem>
              <ListItemText secondary="Lack of client communication or cooperation" />
            </ListItem>
            <ListItem>
              <ListItemText secondary="Scope changes that fundamentally alter the project" />
            </ListItem>
            <ListItem>
              <ListItemText secondary="Violation of these terms or unprofessional conduct" />
            </ListItem>
          </List>
        </StyledPaper>

        <StyledPaper>
          <SectionTitle variant="h4" component="h2">
            General Provisions
          </SectionTitle>

          <Typography variant="h5" component="h3" sx={{ fontWeight: 600, mb: 2, color: theme.palette.vaporwave.blueGreen }}>
            Legal Framework
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Governing Law"
                secondary="These terms are governed by applicable local laws"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Dispute Resolution"
                secondary="Good faith negotiation preferred, mediation if needed"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Severability"
                secondary="Invalid provisions don't affect remaining terms"
              />
            </ListItem>
          </List>

          <Typography variant="h5" component="h3" sx={{ fontWeight: 600, mb: 2, mt: 3, color: theme.palette.vaporwave.blueGreen }}>
            Modifications
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Updates"
                secondary="Terms may be updated with 30-day notice"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Notification"
                secondary="Changes communicated via website and email"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Existing Projects"
                secondary="Current agreements remain under original terms"
              />
            </ListItem>
          </List>
        </StyledPaper>

        <StyledPaper>
          <SectionTitle variant="h4" component="h2">
            Questions About These Terms
          </SectionTitle>
          <Typography variant="body1" paragraph>
            If you have any questions about these Terms of Service or need clarification on any provisions,
            please contact me before engaging my services.
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Email"
                secondary={
                  <Link href="mailto:victor.williams.dev@gmail.com" sx={{ color: theme.palette.vaporwave.pink }}>
                    victor.williams.dev@gmail.com
                  </Link>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Consultation"
                secondary={
                  <Link component={RouterLink} to="/contact" sx={{ color: theme.palette.vaporwave.pink }}>
                    Schedule a call
                  </Link>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Response Time"
                secondary="Within 24 hours"
              />
            </ListItem>
          </List>
        </StyledPaper>

        <StyledPaper>
          <SectionTitle variant="h4" component="h2">
            Ready to Start Your Project?
          </SectionTitle>
          <Typography variant="body1" paragraph>
            Now that you understand my terms, let's discuss your project requirements and how we can work together
            to bring your ideas to life.
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mt: 3, flexWrap: "wrap" }}>
            <Link
              component={RouterLink}
              to="/contact"
              sx={{
                color: theme.palette.vaporwave.pink,
                textDecoration: "none",
                fontWeight: 600,
                padding: theme.spacing(1, 2),
                border: `2px solid ${theme.palette.vaporwave.pink}`,
                borderRadius: theme.spacing(1),
                transition: "all 0.3s ease",
                "&:hover": {
                  background: `${theme.palette.vaporwave.pink}20`,
                  textDecoration: "none"
                }
              }}
            >
              Start a Project
            </Link>
            <Link
              component={RouterLink}
              to="/contact"
              sx={{
                color: theme.palette.vaporwave.blueGreen,
                textDecoration: "none",
                fontWeight: 600,
                padding: theme.spacing(1, 2),
                border: `2px solid ${theme.palette.vaporwave.blueGreen}`,
                borderRadius: theme.spacing(1),
                transition: "all 0.3s ease",
                "&:hover": {
                  background: `${theme.palette.vaporwave.blueGreen}20`,
                  textDecoration: "none"
                }
              }}
            >
              Schedule Consultation
            </Link>
            <Link
              component={RouterLink}
              to="/"
              sx={{
                color: theme.palette.text.primary,
                textDecoration: "none",
                fontWeight: 600,
                padding: theme.spacing(1, 2),
                border: `2px solid ${theme.palette.text.secondary}`,
                borderRadius: theme.spacing(1),
                transition: "all 0.3s ease",
                "&:hover": {
                  background: `${theme.palette.text.secondary}20`,
                  textDecoration: "none"
                }
              }}
            >
              Back to Home
            </Link>
          </Box>
        </StyledPaper>
      </Container>
    </>
  );
};

export default TermsOfService;