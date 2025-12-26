import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import { BrowserRouter, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Router from "./router.tsx";
import { initGA, trackPageView, initScrollTracking, initTimeTracking } from "./utils/analytics";
import { initSentry } from "./utils/errorTracking";
import { initPerformanceMonitoring, monitorLongTasks } from "./utils/performanceMonitoring";
import { registerServiceWorker, setupInstallPrompt } from "./utils/pwa";
import { initHotjar } from "./utils/hotjar";
// Material Web Components imports removed - not currently used in the application
// import "@material/web/button/filled-button.js";
// import "@material/web/button/outlined-button.js";
// import "@material/web/checkbox/checkbox.js";

// Initialize monitoring services
if (import.meta.env.PROD) {
  initSentry();
  initGA();
  initHotjar();
  initPerformanceMonitoring();
  monitorLongTasks();
  registerServiceWorker();
  setupInstallPrompt();
}

// Analytics wrapper to track page views
const AnalyticsWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  useEffect(() => {
    if (import.meta.env.PROD) {
      trackPageView({
        page_title: document.title,
        page_location: window.location.href,
        page_path: location.pathname,
      });

      // Initialize scroll depth tracking
      const cleanupScroll = initScrollTracking();

      // Initialize time on page tracking
      const cleanupTime = initTimeTracking();

      // Cleanup tracking on unmount
      return () => {
        if (cleanupScroll) cleanupScroll();
        if (cleanupTime) cleanupTime();
      };
    }
  }, [location]);

  return <>{children}</>;
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <AnalyticsWrapper>
          <Router />
        </AnalyticsWrapper>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
