/**
 * @module pages/resume/components/ResumeActions
 * @description
 * Action buttons for resume download and external viewing.
 * Provides user options to download the PDF resume or open it in a new browser tab.
 *
 * Features:
 * - Download PDF with custom filename
 * - Open in new tab for full browser viewing
 * - Analytics tracking for downloads
 * - Responsive button layout with icons
 *
 * @example
 * ```tsx
 * import { ResumeActions } from './components';
 *
 * <ResumeActions resumePath={resume} />
 * ```
 */

import React from "react";
import { Box, Button, useTheme } from "@mui/material";
import { Download, OpenInNew } from "@mui/icons-material";
import { trackResumeDownload } from "../../../utils/analytics";
import { RESUME_FILENAME } from "../constants";

/**
 * Props interface for ResumeActions component
 *
 * @interface ResumeActionsProps
 */
export interface ResumeActionsProps {
  /**
   * Path to the resume PDF file
   * @type {string}
   */
  resumePath: string;
}

/**
 * ResumeActions Component
 *
 * Displays action buttons for downloading or opening the resume PDF.
 * Tracks download events through analytics integration.
 *
 * @component
 * @param {ResumeActionsProps} props - Component props
 * @returns {JSX.Element} Rendered action buttons
 *
 * @example
 * ```tsx
 * <ResumeActions resumePath="/assets/Resume.pdf" />
 * ```
 */
export const ResumeActions: React.FC<ResumeActionsProps> = ({
  resumePath,
}) => {
  const theme = useTheme();

  /**
   * Handles resume PDF download with analytics tracking
   */
  const handleDownload = () => {
    trackResumeDownload();
    const link = document.createElement("a");
    link.href = resumePath;
    link.download = RESUME_FILENAME;
    link.click();
  };

  /**
   * Opens resume PDF in a new browser tab
   */
  const handleOpenInNewTab = () => {
    window.open(resumePath, "_blank");
  };

  return (
    <Box sx={{ mb: 4, display: "flex", gap: 2, justifyContent: "center" }}>
      <Button
        variant="contained"
        startIcon={<Download />}
        onClick={handleDownload}
        sx={{
          backgroundColor: theme.palette.primary.main,
          "&:hover": {
            backgroundColor: theme.palette.primary.dark,
          },
        }}
        aria-label="Download resume as PDF"
      >
        Download PDF
      </Button>
      <Button
        variant="outlined"
        startIcon={<OpenInNew />}
        onClick={handleOpenInNewTab}
        sx={{
          borderColor: theme.palette.primary.main,
          color: theme.palette.primary.main,
          "&:hover": {
            borderColor: theme.palette.primary.dark,
            backgroundColor: `${theme.palette.primary.main}08`,
          },
        }}
        aria-label="Open resume in new tab"
      >
        Open in New Tab
      </Button>
    </Box>
  );
};

export default ResumeActions;
