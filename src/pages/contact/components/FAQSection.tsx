/**
 * @module pages/contact/components/FAQSection
 * @description
 * FAQ accordion section component for Contact page.
 * Displays frequently asked questions in an expandable accordion layout.
 *
 * @example
 * ```tsx
 * import { FAQSection } from './components';
 *
 * <FAQSection faqs={faqData} />
 * ```
 */

import React from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  useTheme,
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import {
  VaporwavePurple,
  VaporwavePink,
  VaporwaveBlue,
  VaporwaveGreen,
  VaporwaveBlueGreen,
} from "../../../colors";

import type { FAQ } from "../types";

/**
 * Props interface for FAQSection component
 *
 * @interface FAQSectionProps
 */
interface FAQSectionProps {
  /**
   * Array of FAQ items to display
   * @type {FAQ[]}
   */
  faqs: FAQ[];
}

/**
 * FAQSection Component
 *
 * Displays FAQs in an accordion layout with category chips.
 * Supports scroll-to-anchor functionality via the #faq hash.
 *
 * @component
 * @param {FAQSectionProps} props - Component props
 * @returns {JSX.Element} Rendered FAQ section
 *
 * @example
 * ```tsx
 * const faqs = [...];
 * <FAQSection faqs={faqs} />
 * ```
 */
export const FAQSection: React.FC<FAQSectionProps> = ({ faqs }) => {
  const theme = useTheme();

  return (
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
              background:
                theme.palette.mode === "dark"
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
  );
};
