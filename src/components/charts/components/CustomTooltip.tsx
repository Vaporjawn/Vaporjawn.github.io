/**
 * CustomTooltip component for Recharts visualizations
 *
 * Displays formatted chart data on hover with themed styling
 * and glassmorphism effect for modern appearance.
 *
 * @component
 */
import React from "react";
import { Box, Typography, useTheme, alpha } from "@mui/material";

interface TooltipPayload {
  name: string;
  value: number;
  color: string;
}

interface CustomTooltipProps {
  /** Whether tooltip is currently active/visible */
  active?: boolean;
  /** Array of data entries to display in tooltip */
  payload?: TooltipPayload[];
  /** Label for the data point (e.g., month name, date) */
  label?: string;
}

/**
 * CustomTooltip renders a themed tooltip for chart data points
 *
 * Features:
 * - Glassmorphism effect with backdrop blur
 * - Themed background with high opacity
 * - Color-coded data entries matching chart lines
 * - Clean typography with proper hierarchy
 *
 * @example
 * ```tsx
 * <LineChart data={data}>
 *   <Tooltip content={<CustomTooltip />} />
 * </LineChart>
 * ```
 */
const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  const theme = useTheme();

  if (!active || !payload || payload.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        bgcolor: alpha(theme.palette.background.paper, 0.95),
        p: 1.5,
        borderRadius: 1,
        boxShadow: 3,
      }}
    >
      <Typography variant="body2" fontWeight={600} gutterBottom>
        {label}
      </Typography>
      {payload.map((entry, index: number) => (
        <Typography
          key={index}
          variant="body2"
          sx={{ color: entry.color }}
        >
          {entry.name}: {entry.value}
        </Typography>
      ))}
    </Box>
  );
};

export default CustomTooltip;
