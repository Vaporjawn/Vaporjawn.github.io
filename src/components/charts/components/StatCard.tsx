/**
 * StatCard component displays a single statistic with an icon, value, and label
 *
 * Features:
 * - Glassmorphism effect with backdrop blur
 * - Hover animation with scale and border color transition
 * - Themed color border matching the statistic type
 * - Responsive layout with centered content
 *
 * @component
 */
import React from "react";
import { Box, Typography, Paper, useTheme, alpha } from "@mui/material";

interface StatCardProps {
  /** Icon element to display above the value */
  icon: React.ReactNode;
  /** Label text describing the statistic */
  label: string;
  /** Numeric or string value to display */
  value: number | string;
  /** Theme color for the icon and value text */
  color: string;
}

/**
 * StatCard renders a statistic card with icon, value, and label
 *
 * @example
 * ```tsx
 * <StatCard
 *   icon={<StarIcon sx={{ fontSize: 32 }} />}
 *   label="Total Stars"
 *   value={1250}
 *   color={theme.palette.warning.main}
 * />
 * ```
 */
const StatCard: React.FC<StatCardProps> = ({ icon, label, value, color }) => {
  const theme = useTheme();

  return (
    <Paper
      sx={{
        p: 2,
        textAlign: "center",
        bgcolor: alpha(theme.palette.background.paper, 0.6),
        backdropFilter: "blur(10px)",
        border: `1px solid ${alpha(color, 0.2)}`,
        "&:hover": {
          borderColor: alpha(color, 0.4),
          transform: "translateY(-2px)",
          transition: "all 0.3s ease",
        },
      }}
    >
      <Box sx={{ color, mb: 1 }}>{icon}</Box>
      <Typography variant="h5" fontWeight={700} color={color}>
        {value}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
    </Paper>
  );
};

export default StatCard;
