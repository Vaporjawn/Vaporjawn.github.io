import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";

interface ThemeToggleProps {
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ toggleTheme }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Tooltip title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"} arrow>
      <motion.div
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <IconButton
          onClick={toggleTheme}
          color="inherit"
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          sx={{
            transition: "all 0.3s ease",
            "&:hover": {
              background: theme.palette.primary.main + "20",
            },
          }}
        >
          {isDark ? (
            <motion.div
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Brightness7 />
            </motion.div>
          ) : (
            <motion.div
              initial={{ rotate: 180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Brightness4 />
            </motion.div>
          )}
        </IconButton>
      </motion.div>
    </Tooltip>
  );
};

export default ThemeToggle;
