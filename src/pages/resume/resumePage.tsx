/**
 * @module pages/resume/ResumePage
 * @description
 * Resume page component displaying Victor Williams' professional resume.
 * Provides download, external viewing, and embedded PDF viewing options.
 *
 * Features:
 * - SEO optimization with comprehensive meta tags
 * - Download resume as PDF with analytics tracking
 * - Open in new tab for full browser viewing
 * - Embedded PDF viewer with responsive sizing
 * - Accessible UI with proper ARIA labels
 * - Responsive layout for all screen sizes
 *
 * @example
 * ```tsx
 * import ResumePage from './pages/resume';
 *
 * <Route path="/resume" element={<ResumePage />} />
 * ```
 */

import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import SEO from "../../components/SEO/SEO";
import resume from "../../assets/Resume.pdf";
import { ResumeActions, ResumeViewer } from "./components";
import {
  RESUME_PAGE_TITLE,
  RESUME_PAGE_DESCRIPTION,
  RESUME_PAGE_KEYWORDS,
  RESUME_PAGE_URL,
} from "./constants";

/**
 * ResumePage Component
 *
 * Main Resume page component that orchestrates resume viewing and download functionality.
 * Provides centered layout with SEO optimization and responsive design.
 *
 * @component
 * @returns {JSX.Element} Rendered Resume page
 *
 * @example
 * ```tsx
 * <ResumePage />
 * ```
 */
const ResumePage: React.FC = () => {
  const theme = useTheme();

  return (
    <>
      <SEO
        title={RESUME_PAGE_TITLE}
        description={RESUME_PAGE_DESCRIPTION}
        keywords={RESUME_PAGE_KEYWORDS}
        url={RESUME_PAGE_URL}
      />

      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: theme.palette.background.default,
          py: 4,
          px: 2,
        }}
      >
        <Box
          sx={{
            // Widen the content area so the embedded resume can use more horizontal space
            // while still remaining responsive on very small screens.
            maxWidth: { xs: "100%", sm: "min(1200px, 95vw)" },
            mx: "auto",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              color: theme.palette.text.primary,
              fontWeight: "bold",
              mb: 3,
            }}
          >
            Resume
          </Typography>

          <ResumeActions resumePath={resume} />

          <ResumeViewer resumePath={resume} />
        </Box>
      </Box>
    </>
  );
};

export default ResumePage;
