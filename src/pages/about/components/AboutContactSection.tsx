/**
 * @module pages/about/components/AboutContactSection
 * @description
 * Contact section wrapper component for the About page.
 * Provides proper spacing and integration for the shared ContactSection component.
 *
 * @example
 * ```tsx
 * import { AboutContactSection } from './components';
 *
 * <AboutContactSection darkMode={isDarkMode} />
 * ```
 */

import React from "react";
import { Box } from "@mui/material";
import ContactSection from "../../../components/contact/ContactSection";

/**
 * Props interface for AboutContactSection component
 *
 * @interface AboutContactSectionProps
 */
export interface AboutContactSectionProps {
  /**
   * Whether dark mode is active
   * @type {boolean}
   */
  darkMode: boolean;
}

/**
 * AboutContactSection Component
 *
 * Wraps the shared ContactSection component with About page-specific
 * spacing and layout considerations.
 *
 * @component
 * @param {AboutContactSectionProps} props - Component props
 * @returns {JSX.Element} Rendered contact section with proper spacing
 *
 * @example
 * ```tsx
 * <AboutContactSection darkMode={theme.palette.mode === "dark"} />
 * ```
 */
export const AboutContactSection: React.FC<AboutContactSectionProps> = ({
  darkMode,
}) => {
  return (
    <Box sx={{ mt: { xs: 8, md: 12 } }}>
      <ContactSection darkMode={darkMode} />
    </Box>
  );
};

export default AboutContactSection;
