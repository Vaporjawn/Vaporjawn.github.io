/**
 * Admin Header Component
 * Specialized navigation header for admin dashboard with session management
 * @module components/header/AdminHeader
 */

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Dashboard as DashboardIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Timer as TimerIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import DarkModeToggle from "./components/darkModeToggle";
import { useAdminAuth } from "../../contexts/AdminAuthContext";
import {
  VaporwavePink,
  VaporwavePurple,
  VaporwaveBlue,
  VaporwaveBlueGreen,
  VaporwaveGreen,
} from "../../colors";

interface AdminHeaderProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * Admin Header Component
 * Displays admin-specific navigation with session timer and logout functionality
 *
 * @param darkMode - Current theme mode
 * @param setDarkMode - Function to toggle theme mode
 * @returns Admin navigation header
 */
const AdminHeader: React.FC<AdminHeaderProps> = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const { logout, sessionTimeRemaining } = useAdminAuth();

  const adminNavItems = [
    { label: "Dashboard", path: "/admin", icon: <DashboardIcon /> },
    { label: "Settings", path: "/admin/settings", icon: <SettingsIcon />, disabled: true },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path: string, disabled?: boolean) => {
    if (disabled) return;
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const handleLogoutClick = () => {
    setLogoutDialogOpen(true);
  };

  const handleLogoutConfirm = () => {
    setLogoutDialogOpen(false);
    logout();
    navigate("/");
  };

  const handleLogoutCancel = () => {
    setLogoutDialogOpen(false);
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  /**
   * Format session time remaining as MM:SS
   */
  const formatTime = (seconds: number | null): string => {
    if (seconds === null || seconds <= 0) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  /**
   * Determine if session is in warning state (< 5 minutes)
   */
  const isSessionWarning = (seconds: number | null): boolean => {
    return seconds !== null && seconds > 0 && seconds < 300;
  };

  const drawer = (
    <Box
      sx={{
        width: 280,
        height: "100%",
        background: darkMode
          ? `linear-gradient(135deg, ${VaporwaveBlue}20, ${VaporwavePurple}20)`
          : `linear-gradient(135deg, ${VaporwaveBlue}10, ${VaporwavePurple}10)`,
        backdropFilter: "blur(20px)",
        borderRight: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
          borderBottom: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            background: `linear-gradient(45deg, ${VaporwavePink}, ${VaporwaveBlueGreen})`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "bold",
          }}
        >
          Admin Panel
        </Typography>
        <IconButton
          onClick={handleDrawerToggle}
          color="inherit"
          aria-label="Close navigation menu"
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Session Timer in Drawer */}
      <Box
        sx={{
          p: 2,
          borderBottom: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <TimerIcon sx={{ color: isSessionWarning(sessionTimeRemaining) ? VaporwavePink : VaporwaveBlueGreen }} />
          <Typography variant="body2" color="text.secondary">
            Session: {formatTime(sessionTimeRemaining)}
          </Typography>
        </Box>
      </Box>

      <List sx={{ pt: 3 }}>
        {adminNavItems.map((item) => (
          <ListItem
            key={item.label}
            sx={{
              mb: 1,
              mx: 2,
              borderRadius: 3,
              background: isActivePath(item.path)
                ? `linear-gradient(45deg, ${VaporwavePurple}30, ${VaporwaveBlue}30)`
                : "transparent",
              backdropFilter: isActivePath(item.path) ? "blur(10px)" : "none",
              border: isActivePath(item.path)
                ? `1px solid ${VaporwavePurple}50`
                : "1px solid transparent",
              cursor: item.disabled ? "not-allowed" : "pointer",
              opacity: item.disabled ? 0.5 : 1,
              transition: "all 0.3s ease",
              "&:hover": !item.disabled ? {
                background: `linear-gradient(45deg, ${VaporwavePurple}20, ${VaporwaveBlue}20)`,
                backdropFilter: "blur(10px)",
                border: `1px solid ${VaporwavePurple}30`,
                transform: "translateX(5px)",
              } : {},
            }}
            onClick={() => handleNavigation(item.path, item.disabled)}
          >
            <Box sx={{ mr: 2, color: VaporwaveBlueGreen }}>{item.icon}</Box>
            <ListItemText
              primary={item.label}
              sx={{
                "& .MuiListItemText-primary": {
                  fontWeight: isActivePath(item.path) ? "bold" : "normal",
                  color: isActivePath(item.path) ? VaporwaveGreen : "inherit",
                },
              }}
            />
            {item.disabled && (
              <Chip label="Soon" size="small" sx={{ ml: 1, fontSize: "0.7rem" }} />
            )}
          </ListItem>
        ))}

        {/* Logout Button */}
        <ListItem
          sx={{
            mb: 1,
            mx: 2,
            mt: 4,
            borderRadius: 3,
            background: `linear-gradient(45deg, ${VaporwavePink}20, ${VaporwavePink}20)`,
            border: `1px solid ${VaporwavePink}30`,
            cursor: "pointer",
            transition: "all 0.3s ease",
            "&:hover": {
              background: `linear-gradient(45deg, ${VaporwavePink}30, ${VaporwavePink}30)`,
              border: `1px solid ${VaporwavePink}50`,
              transform: "translateX(5px)",
            },
          }}
          onClick={handleLogoutClick}
        >
          <Box sx={{ mr: 2, color: VaporwavePink }}><LogoutIcon /></Box>
          <ListItemText
            primary="Logout"
            sx={{
              "& .MuiListItemText-primary": {
                fontWeight: "bold",
                color: VaporwavePink,
              },
            }}
          />
        </ListItem>
      </List>

      <Box
        sx={{
          position: "absolute",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          top: 0,
          left: 0,
          right: 0,
          background: darkMode
            ? `linear-gradient(135deg, ${VaporwaveBlue}95, ${VaporwavePurple}95, ${VaporwavePink}95)`
            : `linear-gradient(135deg, ${VaporwaveBlue}85, ${VaporwavePurple}85, ${VaporwavePink}85)`,
          backdropFilter: "blur(20px)",
          borderBottom: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
          boxShadow: darkMode
            ? `0 8px 32px ${VaporwavePurple}30`
            : `0 8px 32px ${VaporwaveBlue}20`,
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ minHeight: { xs: 64, md: 70, lg: 80 }, px: { xs: 1, sm: 2, md: 3 } }}>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                mr: 2,
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.2)",
                "&:hover": {
                  background: "rgba(255,255,255,0.2)",
                  transform: "scale(1.05)",
                },
                transition: "all 0.3s ease",
              }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography
            variant={isMobile ? "h6" : "h5"}
            component="div"
            sx={{
              flexGrow: isMobile ? 1 : 0,
              mr: isMobile ? 0 : { lg: 3, xl: 4 },
              background: `linear-gradient(45deg, ${VaporwaveGreen}, ${VaporwaveBlueGreen}, ${VaporwavePink})`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: "bold",
              fontSize: { xs: "1.3rem", sm: "1.5rem", lg: "1.8rem", xl: "2rem" },
              textShadow: `0 0 20px ${VaporwaveBlueGreen}50`,
              cursor: "pointer",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
                filter: "brightness(1.2)",
              },
            }}
            onClick={() => handleNavigation("/admin")}
          >
            Admin Panel
          </Typography>

          {!isMobile && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexGrow: 1,
                gap: { lg: 0.5, xl: 1 },
                flexWrap: "nowrap",
                overflow: "visible",
                minHeight: { lg: 70, xl: 80 },
                py: 2,
              }}
            >
              {adminNavItems.map((item) => (
                <Button
                  key={item.label}
                  startIcon={item.icon}
                  onClick={() => handleNavigation(item.path, item.disabled)}
                  disabled={item.disabled}
                  sx={{
                    color: "white",
                    px: { lg: 1.5, xl: 2.5 },
                    py: { lg: 1, xl: 1.5 },
                    borderRadius: 3,
                    minWidth: "auto",
                    whiteSpace: "nowrap",
                    position: "relative",
                    background: isActivePath(item.path)
                      ? "rgba(255,255,255,0.2)"
                      : "transparent",
                    backdropFilter: isActivePath(item.path)
                      ? "blur(10px)"
                      : "none",
                    border: isActivePath(item.path)
                      ? "1px solid rgba(255,255,255,0.3)"
                      : "1px solid transparent",
                    fontWeight: isActivePath(item.path) ? "bold" : "normal",
                    fontSize: { lg: "0.875rem", xl: "1rem" },
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": !item.disabled ? {
                      background: "rgba(255,255,255,0.15)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      transform: "translateY(-2px)",
                      boxShadow: `0 8px 25px ${VaporwavePurple}40`,
                    } : {},
                    "&:active": {
                      transform: "translateY(0px)",
                    },
                    "&.Mui-disabled": {
                      color: "rgba(255,255,255,0.4)",
                    },
                  }}
                >
                  {item.label}
                  {item.disabled && (
                    <Chip
                      label="Soon"
                      size="small"
                      sx={{
                        ml: 1,
                        height: 20,
                        fontSize: "0.65rem",
                        background: "rgba(255,255,255,0.2)",
                        color: "white",
                      }}
                    />
                  )}
                  {isActivePath(item.path) && (
                    <Chip
                      size="small"
                      sx={{
                        position: "absolute",
                        top: -8,
                        right: -8,
                        height: 16,
                        fontSize: "0.7rem",
                        background: `linear-gradient(45deg, ${VaporwaveGreen}, ${VaporwaveBlueGreen})`,
                        color: VaporwaveBlue,
                        fontWeight: "bold",
                        animation: "pulse 18s ease-in-out infinite",
                        willChange: "transform",
                        "@keyframes pulse": {
                          "0%": { transform: "scale(1)" },
                          "50%": { transform: "scale(1.02)" },
                          "100%": { transform: "scale(1)" },
                        },
                        "@media (prefers-reduced-motion: reduce)": {
                          animation: "none",
                        },
                      }}
                    />
                  )}
                </Button>
              ))}
            </Box>
          )}

          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {/* Session Timer */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  background: isSessionWarning(sessionTimeRemaining)
                    ? `linear-gradient(45deg, ${VaporwavePink}30, ${VaporwavePink}30)`
                    : "rgba(255,255,255,0.1)",
                  border: isSessionWarning(sessionTimeRemaining)
                    ? `1px solid ${VaporwavePink}50`
                    : "1px solid rgba(255,255,255,0.2)",
                  transition: "all 0.3s ease",
                }}
              >
                <TimerIcon
                  sx={{
                    color: isSessionWarning(sessionTimeRemaining) ? VaporwavePink : VaporwaveBlueGreen,
                    fontSize: "1.2rem",
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    fontFamily: "monospace",
                  }}
                >
                  {formatTime(sessionTimeRemaining)}
                </Typography>
              </Box>

              {/* Logout Button */}
              <Button
                startIcon={<LogoutIcon />}
                onClick={handleLogoutClick}
                sx={{
                  color: "white",
                  px: 2.5,
                  py: 1,
                  borderRadius: 3,
                  background: `linear-gradient(45deg, ${VaporwavePink}50, ${VaporwavePink}50)`,
                  border: `1px solid ${VaporwavePink}70`,
                  fontWeight: "bold",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: `linear-gradient(45deg, ${VaporwavePink}70, ${VaporwavePink}70)`,
                    border: `1px solid ${VaporwavePink}`,
                    transform: "translateY(-2px)",
                    boxShadow: `0 8px 25px ${VaporwavePink}40`,
                  },
                }}
              >
                Logout
              </Button>

              <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", lg: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 280,
            background: "transparent",
            backdropFilter: "blur(20px)",
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={logoutDialogOpen}
        onClose={handleLogoutCancel}
        PaperProps={{
          sx: {
            background: darkMode
              ? `linear-gradient(135deg, ${VaporwaveBlue}90, ${VaporwavePurple}90)`
              : `linear-gradient(135deg, ${VaporwaveBlue}80, ${VaporwavePurple}80)`,
            backdropFilter: "blur(20px)",
            border: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
          },
        }}
      >
        <DialogTitle sx={{ color: "white", fontWeight: "bold" }}>
          Confirm Logout
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "rgba(255,255,255,0.9)" }}>
            Are you sure you want to logout? Your session will be ended and you'll need to login again to access the admin dashboard.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={handleLogoutCancel}
            sx={{
              color: "white",
              border: "1px solid rgba(255,255,255,0.3)",
              "&:hover": {
                border: "1px solid rgba(255,255,255,0.5)",
                background: "rgba(255,255,255,0.1)",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleLogoutConfirm}
            variant="contained"
            sx={{
              background: `linear-gradient(45deg, ${VaporwavePink}, ${VaporwavePink})`,
              "&:hover": {
                background: `linear-gradient(45deg, ${VaporwavePink}80, ${VaporwavePink}80)`,
              },
            }}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AdminHeader;
