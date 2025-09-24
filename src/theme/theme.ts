import { createTheme, Theme } from "@mui/material/styles";
import {
  VaporwavePink,
  VaporwavePurple,
  VaporwaveBlue,
  VaporwaveBlueGreen,
  VaporwaveGreen,
} from "../colors";

// Extend the palette to include vaporwave
declare module "@mui/material/styles" {
  interface Palette {
    vaporwave: {
      pink: string;
      purple: string;
      blue: string;
      blueGreen: string;
      green: string;
      gradient: {
        primary: string;
        secondary: string;
        accent: string;
      };
    };
  }
  interface PaletteOptions {
    vaporwave?: {
      pink: string;
      purple: string;
      blue: string;
      blueGreen: string;
      green: string;
      gradient: {
        primary: string;
        secondary: string;
        accent: string;
      };
    };
  }
}

const createVaporwaveTheme = (mode: "light" | "dark"): Theme => {
  const isDark = mode === "dark";
  return createTheme({
    palette: {
      mode,
      primary: {
        main: VaporwavePurple,
        light: VaporwavePink,
        dark: VaporwaveBlue,
        contrastText: "#fff",
      },
      secondary: {
        main: VaporwaveBlueGreen,
        light: VaporwaveGreen,
        dark: VaporwaveBlue,
        contrastText: "#fff",
      },
      background: {
        default: isDark ? "#0a0a0f" : "#f5f5f5",
        paper: isDark ? "#1a1a2e" : "#fff",
      },
      text: {
        primary: isDark ? "#fff" : "#1a1a2e",
        secondary: isDark ? "rgba(255,255,255,0.7)" : "rgba(26,26,46,0.7)",
      },
      divider: isDark ? "rgba(255,255,255,0.12)" : "rgba(26,26,46,0.12)",
      vaporwave: {
        pink: VaporwavePink,
        purple: VaporwavePurple,
        blue: VaporwaveBlue,
        blueGreen: VaporwaveBlueGreen,
        green: VaporwaveGreen,
        gradient: {
          primary: `linear-gradient(135deg, ${VaporwaveBlue}, ${VaporwavePurple}, ${VaporwavePink})`,
          secondary: `linear-gradient(45deg, ${VaporwaveGreen}, ${VaporwaveBlueGreen})`,
          accent: `linear-gradient(90deg, ${VaporwavePink}, ${VaporwaveBlueGreen})`,
        },
      },
    },
    typography: {
      fontFamily: "Lato, Roboto, Helvetica, Arial, sans-serif",
      h1: {
        fontWeight: 700,
        fontSize: "3rem",
        lineHeight: 1.2,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
      },
      h2: {
        fontWeight: 700,
        fontSize: "2.5rem",
        lineHeight: 1.3,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
      },
      h3: {
        fontWeight: 600,
        fontSize: "2rem",
        lineHeight: 1.4,
        letterSpacing: "0.05em",
      },
      h4: {
        fontWeight: 600,
        fontSize: "1.5rem",
        lineHeight: 1.4,
        letterSpacing: "0.05em",
      },
      h5: {
        fontWeight: 600,
        fontSize: "1.25rem",
        lineHeight: 1.5,
        letterSpacing: "0.02em",
      },
      h6: {
        fontWeight: 600,
        fontSize: "1.1rem",
        lineHeight: 1.5,
        letterSpacing: "0.02em",
      },
      body1: {
        fontSize: "1rem",
        lineHeight: 1.75,
        letterSpacing: "0.02em",
      },
      body2: {
        fontSize: "0.875rem",
        lineHeight: 1.6,
        letterSpacing: "0.01em",
      },
      button: {
        fontWeight: 700,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
      },
    },
    shape: {
      borderRadius: 12,
    },
    spacing: 8,
    breakpoints: {
      values: {
        xs: 0,
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: isDark
              ? `linear-gradient(135deg, ${VaporwaveBlue}95, ${VaporwavePurple}95, ${VaporwavePink}95)`
              : `linear-gradient(135deg, ${VaporwaveBlue}85, ${VaporwavePurple}85, ${VaporwavePink}85)`,
            backdropFilter: "blur(20px)",
            borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
            boxShadow: isDark
              ? `0 8px 32px ${VaporwavePurple}30`
              : `0 8px 32px ${VaporwaveBlue}20`,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            padding: "12px 24px",
            fontSize: "0.875rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: `0 8px 25px ${VaporwavePurple}40`,
            },
          },
          contained: {
            background: `linear-gradient(45deg, ${VaporwavePurple}, ${VaporwavePink})`,
            color: "#fff",
            "&:hover": {
              background: `linear-gradient(45deg, ${VaporwaveBlue}, ${VaporwavePurple})`,
            },
          },
          outlined: {
            borderColor: VaporwavePurple,
            color: VaporwavePurple,
            "&:hover": {
              borderColor: VaporwavePink,
              backgroundColor: `${VaporwavePurple}10`,
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
              backgroundColor: "rgba(255,255,255,0.1)",
            },
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            background: isDark
              ? `linear-gradient(135deg, ${VaporwaveBlue}20, ${VaporwavePurple}20)`
              : `linear-gradient(135deg, ${VaporwaveBlue}10, ${VaporwavePurple}10)`,
            backdropFilter: "blur(20px)",
            borderRight: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            margin: "4px 16px",
            transition: "all 0.3s ease",
            "&:hover": {
              background: `linear-gradient(45deg, ${VaporwavePurple}20, ${VaporwaveBlue}20)`,
              backdropFilter: "blur(10px)",
              border: `1px solid ${VaporwavePurple}30`,
              transform: "translateX(5px)",
            },
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          h1: {
            background: `linear-gradient(45deg, ${VaporwaveGreen}, ${VaporwaveBlueGreen}, ${VaporwavePink})`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: `0 0 20px ${VaporwaveBlueGreen}50`,
          },
          h2: {
            background: `linear-gradient(45deg, ${VaporwavePink}, ${VaporwavePurple})`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: `0 0 15px ${VaporwavePurple}40`,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            background: `linear-gradient(45deg, ${VaporwaveGreen}, ${VaporwaveBlueGreen})`,
            color: VaporwaveBlue,
            fontWeight: "bold",
            // Subtle slow breathing effect (almost imperceptible)
            animation: "pulse 18s ease-in-out infinite",
            willChange: "transform",
            "@keyframes pulse": {
              "0%": { transform: "scale(1)" },
              "50%": { transform: "scale(1.02)" },
              "100%": { transform: "scale(1)" },
            },
            // Respect user prefers-reduced-motion to eliminate animation
            "@media (prefers-reduced-motion: reduce)": {
              animation: "none",
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            background: isDark
              ? "rgba(26, 26, 46, 0.8)"
              : "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
            border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
            boxShadow: isDark
              ? `0 8px 32px ${VaporwavePurple}20`
              : `0 8px 32px ${VaporwaveBlue}15`,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: 12,
              "& fieldset": {
                borderColor: VaporwavePurple,
              },
              "&:hover fieldset": {
                borderColor: VaporwavePink,
              },
              "&.Mui-focused fieldset": {
                borderColor: VaporwaveBlueGreen,
              },
            },
          },
        },
      },
    },
  });
};

export { createVaporwaveTheme };
export default createVaporwaveTheme;
