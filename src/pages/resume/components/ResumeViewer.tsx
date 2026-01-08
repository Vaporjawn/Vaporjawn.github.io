/**
 * @module pages/resume/components/ResumeViewer
 * @description
 * PDF viewer component for displaying resume in an embedded iframe.
 * Provides responsive sizing and fallback instructions for compatibility.
 *
 * Features:
 * - Embedded PDF viewing with iframe
 * - Responsive sizing based on viewport
 * - Styled container with border and shadow
 * - Fallback message for display issues
 * - Accessibility attributes
 *
 * @example
 * ```tsx
 * import { ResumeViewer } from './components';
 *
 * <ResumeViewer resumePath={resume} />
 * ```
 */

import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { RESUME_IFRAME_TITLE, RESUME_FALLBACK_MESSAGE } from "../constants";

/**
 * Props interface for ResumeViewer component
 *
 * @interface ResumeViewerProps
 */
export interface ResumeViewerProps {
  /**
   * Path to the resume PDF file
   * @type {string}
   */
  resumePath: string;
}

/**
 * ResumeViewer Component
 *
 * Embeds the resume PDF in an iframe with responsive sizing and fallback messaging.
 * Optimizes height to fit viewport while maintaining minimum readable size.
 *
 * @component
 * @param {ResumeViewerProps} props - Component props
 * @returns {JSX.Element} Rendered PDF viewer
 *
 * @example
 * ```tsx
 * <ResumeViewer resumePath="/assets/Resume.pdf" />
 * ```
 */
export const ResumeViewer: React.FC<ResumeViewerProps> = ({ resumePath }) => {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: theme.shadows[3],
          backgroundColor: theme.palette.background.paper,
          // Give the preview a subtle growth on larger screens
          // while ensuring it doesn't overwhelm ultra-wide displays.
          p: { xs: 0, md: 1 },
        }}
      >
        <iframe
          src={resumePath}
          width="100%"
          // Make the height responsive to viewport while enforcing a reasonable minimum.
          // This improves the "fits the page" experience without forcing scroll traps.
          style={{
            border: "none",
            display: "block",
            height: "min(1200px, calc(100vh - 220px))",
            minHeight: "900px",
          }}
          title={RESUME_IFRAME_TITLE}
          aria-label={RESUME_IFRAME_TITLE}
        />
      </Box>

      <Typography
        variant="body2"
        sx={{
          mt: 2,
          color: theme.palette.text.secondary,
        }}
      >
        {RESUME_FALLBACK_MESSAGE}
      </Typography>
    </>
  );
};

export default ResumeViewer;
