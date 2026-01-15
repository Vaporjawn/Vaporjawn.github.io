/**
 * @module pages/contact/ContactPage
 * @description
 * Contact page component orchestrating all contact-related sections.
 * Modular architecture with dedicated components for each section.
 *
 * Features:
 * - Hero section with call-to-action
 * - Multiple contact methods (Email, LinkedIn, Schedule)
 * - Contact form with validation
 * - Comprehensive FAQ accordion
 * - Final CTA section
 * - Calendly integration for scheduling
 * - Scroll-to-FAQ functionality via hash
 *
 * @example
 * ```tsx
 * import ContactPage from './pages/contact';
 *
 * <Route path="/contact" element={<ContactPage />} />
 * ```
 */

import React, { useEffect, useState } from "react";
import { Box, Container, useTheme } from "@mui/material";
import { PopupModal } from "react-calendly";
import SEO from "../../components/SEO/SEO";
import { usePortfolio } from "../../hooks/usePortfolioData";
import {
  VaporwavePink,
  VaporwavePurple,
  VaporwaveBlue,
} from "../../colors";
import {
  ContactHero,
  ContactMethods,
  ContactFormSection,
  FAQSection,
  ContactCTA,
} from "./components";
import { getContactMethods, FAQ_DATA } from "./constants.tsx";

/**
 * ContactPage Component
 *
 * Main Contact page component that composes all contact-related sections.
 * Manages Calendly modal state and handles scroll-to-FAQ functionality.
 *
 * @component
 * @returns {JSX.Element} Rendered Contact page
 *
 * @example
 * ```tsx
 * <ContactPage />
 * ```
 */
const ContactPage: React.FC = () => {
  const theme = useTheme();
  const { personalInfo } = usePortfolio();
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  // Handle scroll to FAQ section when hash is present
  useEffect(() => {
    const { hash } = window.location;
    if (hash === "#faq") {
      // Small delay to ensure the page is fully rendered
      setTimeout(() => {
        const element = document.getElementById("faq");
        if (element) {
          const yOffset = -100; // Offset for fixed header or spacing
          const y =
            element.getBoundingClientRect().top +
            window.pageYOffset +
            yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 100);
    }
  }, []);

  const contactMethods = getContactMethods(personalInfo.email);

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
          background:
            theme.palette.mode === "dark"
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
          <ContactHero />

          <ContactMethods
            contactMethods={contactMethods}
            onScheduleClick={() => setIsCalendlyOpen(true)}
          />

          <ContactFormSection />

          <FAQSection faqs={FAQ_DATA} />

          <ContactCTA
            email={personalInfo.email}
            onScheduleClick={() => setIsCalendlyOpen(true)}
          />
        </Container>
      </Box>

      {/* Calendly Modal */}
      <PopupModal
        url="https://calendly.com/victor-williams-dev/introductory-call"
        onModalClose={() => setIsCalendlyOpen(false)}
        open={isCalendlyOpen}
        rootElement={document.getElementById("root") as HTMLElement}
      />
    </>
  );
};

export default ContactPage;
