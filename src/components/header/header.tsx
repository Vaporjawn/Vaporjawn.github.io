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
} from "@mui/material";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Home as HomeIcon,
  Work as WorkIcon,
  Description as DescriptionIcon,
  Info as InfoIcon,
  Build as BuildIcon,
} from "@mui/icons-material";
import { NavigateFunction, useNavigate, useLocation } from "react-router-dom";
import HomePath from "../../routes/homePath";
import DarkModeToggle from "./components/darkModeToggle";
<<<<<<< Updated upstream
import "./styles/header.css";
import { Link } from "react-router-dom";
=======
import {
  VaporwavePink,
  VaporwavePurple,
  VaporwaveBlue,
  VaporwaveBlueGreen,
  VaporwaveGreen,
} from "../../colors";
>>>>>>> Stashed changes

const Header = (args: {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { darkMode, setDarkMode } = args;
<<<<<<< Updated upstream
=======
  const navigate: NavigateFunction = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
>>>>>>> Stashed changes

  const navItems = [
    { label: "Home", path: HomePath, icon: <HomeIcon /> },
    { label: "About", path: "/about", icon: <InfoIcon /> },
    { label: "Services", path: "/services", icon: <BuildIcon /> },
    { label: "Projects", path: "/projects", icon: <WorkIcon /> },
    { label: "Resume", path: "/resume", icon: <DescriptionIcon /> },
    { label: "Activity", path: "/activity", icon: <InfoIcon /> },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
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
<<<<<<< Updated upstream
      <nav>
        <ul style={{ display: "flex", listStyle: "none" }}>
          <li style={{ marginRight: "1rem" }}>
            <Link to={HomePath} className="header-link">
              Home
            </Link>
          </li>
          <li style={{ marginRight: "1rem" }}>
            <Link to="/projects" className="header-link">
              Projects
            </Link>
          </li>
          <li style={{ marginRight: "1rem" }}>
            <Link to="/resume" className="header-link">
              Resume
            </Link>
          </li>
        </ul>
      </nav>
      <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
    </header>
=======
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
          Vaporjawn
        </Typography>
        <IconButton onClick={handleDrawerToggle} color="inherit">
          <CloseIcon />
        </IconButton>
      </Box>
      <List sx={{ pt: 3 }}>
        {navItems.map((item) => (
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
              cursor: "pointer",
              transition: "all 0.3s ease",
              "&:hover": {
                background: `linear-gradient(45deg, ${VaporwavePurple}20, ${VaporwaveBlue}20)`,
                backdropFilter: "blur(10px)",
                border: `1px solid ${VaporwavePurple}30`,
                transform: "translateX(5px)",
              },
            }}
            onClick={() => handleNavigation(item.path)}
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
          </ListItem>
        ))}
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
        <Toolbar sx={{ minHeight: { xs: 64, md: 80 } }}>
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
              mr: isMobile ? 0 : 4,
              background: `linear-gradient(45deg, ${VaporwaveGreen}, ${VaporwaveBlueGreen}, ${VaporwavePink})`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: "bold",
              fontSize: { xs: "1.5rem", md: "2rem" },
              textShadow: `0 0 20px ${VaporwaveBlueGreen}50`,
              cursor: "pointer",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
                filter: "brightness(1.2)",
              },
            }}
            onClick={() => handleNavigation(HomePath)}
          >
            Vaporjawn
          </Typography>

          {!isMobile && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexGrow: 1,
                gap: 1,
              }}
            >
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  startIcon={item.icon}
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    color: "white",
                    px: 3,
                    py: 1.5,
                    borderRadius: 3,
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
                    fontSize: "1rem",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      background: "rgba(255,255,255,0.15)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      transform: "translateY(-2px)",
                      boxShadow: `0 8px 25px ${VaporwavePurple}40`,
                    },
                    "&:active": {
                      transform: "translateY(0px)",
                    },
                  }}
                >
                  {item.label}
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
            <Box sx={{ ml: "auto" }}>
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
          display: { xs: "block", md: "none" },
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
    </>
>>>>>>> Stashed changes
  );
};

export default Header;
