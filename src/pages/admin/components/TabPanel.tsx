/**
 * TabPanel component for Material-UI Tabs
 * @module pages/admin/components/TabPanel
 */

import React from "react";
import { Box } from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

/**
 * TabPanel component for switching between tab content
 * @param props - Component props
 * @returns TabPanel component
 */
export const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
};

