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

const PrivacyPolicy: React.FC = () => {
  const theme = useTheme();

  return (
    <>
      <SEO
        title="Privacy Policy - Victor Williams"
        description="Privacy policy explaining how Victor Williams collects, uses, and protects your information when you visit the website."
        url="https://vaporjawn.github.io/privacy"
      />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <MainTitle variant="h3" component="h1">
          Privacy Policy
        </MainTitle>

        <Typography
          variant="subtitle1"
          color="text.secondary"
          textAlign="center"
          sx={{ mb: 4 }}
        >
          This privacy policy explains how I collect, use, and protect your information when you visit my website.
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
            Welcome to vaporjawn.com ("I," "my," or "me"). This privacy policy explains how Victor Williams
            collects, uses, and protects your personal information when you visit my website or use my services.
            I am committed to protecting your privacy and ensuring transparency about my data practices.
          </Typography>
          <Typography variant="body1" paragraph>
            By using my website, you consent to the collection and use of information in accordance with this policy.
            If you do not agree with this policy, please do not use my website.
          </Typography>
        </StyledPaper>

        <StyledPaper>
          <SectionTitle variant="h4" component="h2">
            Information I Collect
          </SectionTitle>

          <Typography variant="h5" component="h3" sx={{ fontWeight: 600, mb: 2, color: theme.palette.vaporwave.blueGreen }}>
            Information You Provide Directly
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Contact Information"
                secondary="Name, email address, and message content when you use my contact form"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Project Inquiries"
                secondary="Business information, project requirements, and budget details you share"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Newsletter Subscription"
                secondary="Email address if you subscribe to my newsletter or updates"
              />
            </ListItem>
          </List>

          <Typography variant="h5" component="h3" sx={{ fontWeight: 600, mb: 2, mt: 3, color: theme.palette.vaporwave.blueGreen }}>
            Information Collected Automatically
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Usage Data"
                secondary="Pages visited, time spent on site, click patterns, and navigation paths"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Device Information"
                secondary="Browser type, operating system, device type, and screen resolution"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Location Data"
                secondary="General geographic location based on IP address"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Referral Information"
                secondary="Website or search engine that referred you to my site"
              />
            </ListItem>
          </List>
        </StyledPaper>

        <StyledPaper>
          <SectionTitle variant="h4" component="h2">
            How I Use Your Information
          </SectionTitle>
          <Typography variant="body1" paragraph>
            I use the collected information for the following purposes:
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Communication"
                secondary="Respond to your inquiries, provide project quotes, and maintain professional correspondence"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Website Improvement"
                secondary="Analyze usage patterns to enhance user experience and optimize content"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Marketing"
                secondary="Send relevant updates about services, blog posts, and industry insights (with your consent)"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Legal Compliance"
                secondary="Maintain records as required by law and protect against fraudulent activities"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Service Delivery"
                secondary="Manage projects, deliver contracted services, and provide technical support"
              />
            </ListItem>
          </List>
        </StyledPaper>

        <StyledPaper>
          <SectionTitle variant="h4" component="h2">
            Cookies and Tracking Technologies
          </SectionTitle>
          <Typography variant="body1" paragraph>
            I use cookies and similar tracking technologies to enhance your browsing experience:
          </Typography>

          <Typography variant="h5" component="h3" sx={{ fontWeight: 600, mb: 2, color: theme.palette.vaporwave.blueGreen }}>
            Essential Cookies
          </Typography>
          <Typography variant="body1" paragraph>
            Required for website functionality, security, and user preferences (theme, language settings).
          </Typography>

          <Typography variant="h5" component="h3" sx={{ fontWeight: 600, mb: 2, color: theme.palette.vaporwave.blueGreen }}>
            Analytics Cookies
          </Typography>
          <Typography variant="body1" paragraph>
            Help me understand how visitors interact with my website to improve user experience.
          </Typography>

          <Typography variant="h5" component="h3" sx={{ fontWeight: 600, mb: 2, color: theme.palette.vaporwave.blueGreen }}>
            Cookie Management
          </Typography>
          <Typography variant="body1" paragraph>
            You can control cookie preferences through your browser settings. Note that disabling certain cookies may affect website functionality.
          </Typography>
        </StyledPaper>

        <StyledPaper>
          <SectionTitle variant="h4" component="h2">
            Third-Party Services
          </SectionTitle>
          <Typography variant="body1" paragraph>
            My website integrates with third-party services that have their own privacy policies:
          </Typography>

          <Typography variant="h5" component="h3" sx={{ fontWeight: 600, mb: 2, color: theme.palette.vaporwave.blueGreen }}>
            Analytics
          </Typography>
          <Typography variant="body1" paragraph>
            I may use Google Analytics or similar services to track website usage and performance.
          </Typography>
          <Link href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" sx={{ color: theme.palette.vaporwave.pink }}>
            Google Privacy Policy
          </Link>

          <Typography variant="h5" component="h3" sx={{ fontWeight: 600, mb: 2, mt: 3, color: theme.palette.vaporwave.blueGreen }}>
            Email Services
          </Typography>
          <Typography variant="body1" paragraph>
            Contact forms and newsletters may be processed through email service providers.
          </Typography>
          <Typography variant="body1" paragraph>
            Service providers are carefully selected for GDPR compliance.
          </Typography>
        </StyledPaper>

        <StyledPaper>
          <SectionTitle variant="h4" component="h2">
            Data Security
          </SectionTitle>
          <Typography variant="body1" paragraph>
            I implement appropriate security measures to protect your personal information:
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Encryption"
                secondary="HTTPS encryption for all data transmission"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Secure Storage"
                secondary="Data stored on secure, encrypted servers"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Access Control"
                secondary="Limited access on need-to-know basis"
              />
            </ListItem>
          </List>
        </StyledPaper>

        <StyledPaper>
          <SectionTitle variant="h4" component="h2">
            Your Rights and Choices
          </SectionTitle>
          <Typography variant="body1" paragraph>
            You have the following rights regarding your personal information:
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Access"
                secondary="Request a copy of personal data I hold about you"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Rectification"
                secondary="Request correction of inaccurate information"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Erasure"
                secondary="Request deletion of your personal data"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Portability"
                secondary="Request data in a machine-readable format"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Objection"
                secondary="Object to processing of your personal data"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Withdraw Consent"
                secondary="Withdraw consent for marketing communications"
              />
            </ListItem>
          </List>

          <Typography variant="h5" component="h3" sx={{ fontWeight: 600, mb: 2, mt: 3, color: theme.palette.vaporwave.blueGreen }}>
            Exercise Your Rights
          </Typography>
          <Typography variant="body1" paragraph>
            To exercise any of these rights, please contact me at{" "}
            <Link href="mailto:victor.williams.dev@gmail.com" sx={{ color: theme.palette.vaporwave.pink }}>
              victor.williams.dev@gmail.com
            </Link>
            . I will respond within 30 days.
          </Typography>
        </StyledPaper>

        <StyledPaper>
          <SectionTitle variant="h4" component="h2">
            Data Retention
          </SectionTitle>
          <Typography variant="body1" paragraph>
            I retain your personal information only as long as necessary for the purposes outlined in this policy:
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Contact form submissions"
                secondary="2 years"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Analytics data"
                secondary="26 months"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Newsletter subscriptions"
                secondary="Until unsubscribed"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Project-related communications"
                secondary="5 years"
              />
            </ListItem>
          </List>
        </StyledPaper>

        <StyledPaper>
          <SectionTitle variant="h4" component="h2">
            Children's Privacy
          </SectionTitle>
          <Typography variant="body1" paragraph>
            My website is not intended for children under 13 years of age. I do not knowingly collect personal
            information from children under 13. If you are a parent or guardian and believe your child has provided
            me with personal information, please contact me immediately so I can delete such information.
          </Typography>
        </StyledPaper>

        <StyledPaper>
          <SectionTitle variant="h4" component="h2">
            Changes to This Privacy Policy
          </SectionTitle>
          <Typography variant="body1" paragraph>
            I may update this privacy policy from time to time to reflect changes in my practices or legal requirements.
            I will notify you of any material changes by:
          </Typography>
          <List>
            <ListItem>
              <ListItemText secondary="Posting the updated policy on this page with a new 'Last Updated' date" />
            </ListItem>
            <ListItem>
              <ListItemText secondary="Sending an email notification to subscribers (for significant changes)" />
            </ListItem>
            <ListItem>
              <ListItemText secondary="Displaying a prominent notice on my website" />
            </ListItem>
          </List>
        </StyledPaper>

        <StyledPaper>
          <SectionTitle variant="h4" component="h2">
            Contact Me
          </SectionTitle>
          <Typography variant="body1" paragraph>
            If you have any questions about this privacy policy or my data practices, please contact me:
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
                primary="Website"
                secondary={
                  <Link component={RouterLink} to="/" sx={{ color: theme.palette.vaporwave.pink }}>
                    vaporjawn.com
                  </Link>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Response Time"
                secondary="Within 30 days"
              />
            </ListItem>
          </List>
        </StyledPaper>

        <StyledPaper>
          <SectionTitle variant="h4" component="h2">
            Questions About Your Privacy?
          </SectionTitle>
          <Typography variant="body1" paragraph>
            I'm committed to protecting your privacy and being transparent about my data practices.
            Don't hesitate to reach out if you have any concerns.
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
            <Link
              href="mailto:victor.williams.dev@gmail.com"
              sx={{
                color: theme.palette.vaporwave.pink,
                textDecoration: "none",
                fontWeight: 600,
                "&:hover": {
                  textDecoration: "underline"
                }
              }}
            >
              Contact Me
            </Link>
            <Link
              component={RouterLink}
              to="/"
              sx={{
                color: theme.palette.vaporwave.blueGreen,
                textDecoration: "none",
                fontWeight: 600,
                "&:hover": {
                  textDecoration: "underline"
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

export default PrivacyPolicy;