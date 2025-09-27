import { Route, Routes } from "react-router-dom";
import { Suspense, lazy, useState } from "react";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import ErrorBoundary from "./components/errorBoundary/errorBoundary";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { createVaporwaveTheme } from "./theme/theme";
import { Box, CircularProgress } from "@mui/material";
import HomePath from "./routes/homePath";
import { PortfolioProvider } from "./contexts/PortfolioContext";

// Lazy load components for better performance
const HomePage = lazy(() => import("./pages/home/homePage"));
const AboutPage = lazy(() => import("./pages/about"));
const ErrorPage = lazy(() => import("./pages/error"));
const ComingSoon = lazy(() => import("./pages/comingSoon"));
const BOXX = lazy(() => import("./pages/20XX"));
const ProjectsPage = lazy(() => import("./pages/projects/projectsPage"));
const ResumePage = lazy(() => import("./pages/resume/resumePage"));
const ActivityPage = lazy(() => import("./pages/activity/activityPage"));
const ServicesPage = lazy(() => import("./pages/services/servicesPage"));
const ContactPage = lazy(() => import("./pages/contact/contactPage"));
const PrivacyPage = lazy(() => import("./pages/privacy/PrivacyPolicy"));
const TermsPage = lazy(() => import("./pages/terms/TermsOfService"));
const DevTestPage = lazy(() => import("./pages/dev-test"));



const Router = () => {
  const [darkMode, setDarkMode] = useState<boolean>(true);

  const theme = createVaporwaveTheme(darkMode ? "dark" : "light");

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

  return (
    <PortfolioProvider>
      <ErrorBoundary>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />
          <Box
            component="main"
            sx={{
              pt: { xs: "80px", md: "100px" }, // Add padding top for fixed header
              minHeight: "100vh",
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
                <Route path="/20XX" element={<BOXX />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/activity" element={<ActivityPage />} />
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
    </PortfolioProvider>
  );
};

export default Router;
