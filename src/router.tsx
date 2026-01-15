import { Route, Routes, useLocation } from "react-router-dom";
import { Suspense, lazy, useState, useEffect } from "react";
import Footer from "./components/footer";
import Header from "./components/header/header";
import AdminHeader from "./components/header/AdminHeader";
import ErrorBoundary from "./components/errorBoundary/errorBoundary";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { createVaporwaveTheme } from "./theme/theme";
import { Box, CircularProgress } from "@mui/material";
import HomePath from "./routes/homePath";
import { PortfolioProvider } from "./contexts/PortfolioContext";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";
import SkipNavigation from "./components/a11y/SkipNavigation";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

// Lazy load components for better performance
const HomePage = lazy(() => import("./pages/home/homePage"));
const AboutPage = lazy(() => import("./pages/about"));
const ErrorPage = lazy(() => import("./pages/error"));
const ComingSoon = lazy(() => import("./pages/comingSoon"));
const ProjectsPage = lazy(() => import("./pages/projects/projectsPage"));
const ResumePage = lazy(() => import("./pages/resume/resumePage"));
const ActivityPage = lazy(() => import("./pages/activity/activityPage"));
const ServicesPage = lazy(() => import("./pages/services/servicesPage"));
const ContactPage = lazy(() => import("./pages/contact/contactPage"));
const PrivacyPage = lazy(() => import("./pages/privacy/PrivacyPolicy"));
const TermsPage = lazy(() => import("./pages/terms/TermsOfService"));
const DevTestPage = lazy(() => import("./pages/dev-test"));
const BlogListPage = lazy(() => import("./pages/blog/BlogListPage"));
const BlogPostPage = lazy(() => import("./pages/blog/BlogPostPage"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));

const THEME_STORAGE_KEY = "vaporjawn-theme-mode";

/**
 * Main Router Component with Conditional Header Rendering
 * Displays AdminHeader for admin routes, regular Header for public routes
 */
const Router = () => {
  const location = useLocation();

  // Initialize theme from localStorage or system preference
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored) {
      return stored === "dark";
    }
    // Check system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Persist theme changes to localStorage
  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, darkMode ? "dark" : "light");
  }, [darkMode]);

  const theme = createVaporwaveTheme(darkMode ? "dark" : "light");

  /**
   * Determine if current route is an admin route
   * Admin routes include: /admin, /admin/login, /admin/settings, etc.
   */
  const isAdminRoute = location.pathname.startsWith("/admin");

  const LoadingSpinner = () => (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="50vh"
    >
      <CircularProgress />
    </Box>
  );

  // Add smooth theme transition
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--theme-transition",
      "background-color 0.3s ease-in-out, color 0.3s ease-in-out"
    );
  }, []);

  return (
    <PortfolioProvider>
      <AdminAuthProvider>
        <ErrorBoundary>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <SkipNavigation />
            {/* Conditional Header Rendering: AdminHeader for admin routes, regular Header for public routes */}
            {isAdminRoute ? (
              <AdminHeader darkMode={darkMode} setDarkMode={setDarkMode} />
            ) : (
              <Header darkMode={darkMode} setDarkMode={setDarkMode} />
            )}
            <Box
              component="main"
              id="main-content"
              tabIndex={-1}
              sx={{
                pt: { xs: "80px", md: "100px" }, // Add padding top for fixed header
                minHeight: "100vh",
                outline: "none", // Remove focus outline on main
              }}
            >
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path={HomePath} element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/resume" element={<ResumePage />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/privacy" element={<PrivacyPage />} />
                  <Route path="/terms" element={<TermsPage />} />
                  <Route path="/coming-soon" element={<ComingSoon />} />
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route path="/activity" element={<ActivityPage />} />
                  <Route path="/blog" element={<BlogListPage />} />
                  <Route path="/blog/:slug" element={<BlogPostPage />} />
                  {/* Admin Routes */}
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute>
                        <AdminDashboard />
                      </ProtectedRoute>
                    }
                  />
                  {/* Development Routes */}
                  {import.meta.env.MODE === "development" && (
                    <Route path="/dev-test" element={<DevTestPage />} />
                  )}
                  <Route path="*" element={<ErrorPage />} />
                </Routes>
              </Suspense>
            </Box>
            <Footer />
          </ThemeProvider>
        </ErrorBoundary>
      </AdminAuthProvider>
    </PortfolioProvider>
  );
};

export default Router;
