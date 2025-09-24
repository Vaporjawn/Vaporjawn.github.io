import React from "react";
import { IconButton, Tooltip, Box } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";
import { VaporwaveGreen, VaporwavePink } from "../../../colors";

const DarkModeToggle = (args: {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { darkMode, setDarkMode } = args;

  return (
    <Tooltip
      title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      arrow
    >
      <IconButton
        onClick={() => setDarkMode(!darkMode)}
        sx={{
          background: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: 2,
          p: 1.5,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            background: "rgba(255,255,255,0.2)",
            transform: "scale(1.1) rotate(15deg)",
            boxShadow: darkMode
              ? `0 8px 25px ${VaporwaveGreen}40`
              : `0 8px 25px ${VaporwavePink}40`,
          },
          "&:active": {
            transform: "scale(0.95) rotate(15deg)",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {darkMode ? (
            <LightMode
              sx={{
                fontSize: "1.8rem",
                color: VaporwaveGreen,
                filter: `drop-shadow(0 0 6px ${VaporwaveGreen}70)`,
                animation: "glow 12s ease-in-out infinite alternate",
                "@keyframes glow": {
                  "0%": { filter: `drop-shadow(0 0 4px ${VaporwaveGreen}40)` },
                  "50%": { filter: `drop-shadow(0 0 7px ${VaporwaveGreen}70)` },
                  "100%": {
                    filter: `drop-shadow(0 0 4px ${VaporwaveGreen}40)`,
                  },
                },
                "@media (prefers-reduced-motion: reduce)": {
                  animation: "none",
                  filter: `drop-shadow(0 0 4px ${VaporwaveGreen}40)`,
                },
              }}
            />
          ) : (
            <DarkMode
              sx={{
                fontSize: "1.8rem",
                color: VaporwavePink,
                filter: `drop-shadow(0 0 6px ${VaporwavePink}70)`,
                animation: "glow 12s ease-in-out infinite alternate",
                "@keyframes glow": {
                  "0%": { filter: `drop-shadow(0 0 4px ${VaporwavePink}40)` },
                  "50%": { filter: `drop-shadow(0 0 7px ${VaporwavePink}70)` },
                  "100%": { filter: `drop-shadow(0 0 4px ${VaporwavePink}40)` },
                },
                "@media (prefers-reduced-motion: reduce)": {
                  animation: "none",
                  filter: `drop-shadow(0 0 4px ${VaporwavePink}40)`,
                },
              }}
            />
          )}
        </Box>
      </IconButton>
    </Tooltip>
  );
};

export default DarkModeToggle;
