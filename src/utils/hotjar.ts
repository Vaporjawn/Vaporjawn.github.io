// Hotjar Integration for Heatmaps and Session Recordings
// Provides user behavior analytics, heatmaps, and session replay

declare global {
  interface Window {
    hj?: (_command: string, ..._args: unknown[]) => void;
    _hjSettings?: {
      hjid: number;
      hjsv: number;
    };
  }
}

const HOTJAR_SITE_ID = import.meta.env.VITE_HOTJAR_SITE_ID || "";
const HOTJAR_VERSION = import.meta.env.VITE_HOTJAR_VERSION || "6";

export const initHotjar = (): void => {
  if (typeof window === "undefined" || !HOTJAR_SITE_ID) {
    console.warn("Hotjar not initialized: Missing site ID");
    return;
  }

  // Initialize Hotjar
  // Note: SRI not used for same reasons as GA4 (dynamic content, frequent updates)
  // Security enforced via CSP script-src whitelist and HTTPS
  (function (h, o, t, j, a, r) {
    h.hj =
      h.hj ||
      function (...args) {
        (h.hj.q = h.hj.q || []).push(args);
      };
    h._hjSettings = { hjid: parseInt(HOTJAR_SITE_ID), hjsv: parseInt(HOTJAR_VERSION) };
    [a] = o.getElementsByTagName("head");
    r = o.createElement("script");
    r.async = true;
    r.crossOrigin = "anonymous"; // Enable CORS for better error reporting
    r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
    a.appendChild(r);
  })(window, document, "https://static.hotjar.com/c/hotjar-", ".js?sv=");

  console.log("Hotjar initialized");
};

// Identify user (useful for tracking specific users)
export const identifyHotjarUser = (userId: string, attributes?: Record<string, unknown>): void => {
  if (!window.hj) return;

  window.hj("identify", userId, attributes);
};

// Tag recordings with custom labels
export const tagHotjarRecording = (tags: string[]): void => {
  if (!window.hj) return;

  tags.forEach((tag) => {
    window.hj("tagRecording", [tag]);
  });
};

// Trigger Hotjar events
export const triggerHotjarEvent = (eventName: string): void => {
  if (!window.hj) return;

  window.hj("event", eventName);
};

// Virtual page view (for SPA)
export const trackHotjarPageView = (path: string): void => {
  if (!window.hj) return;

  window.hj("stateChange", path);
};

// Privacy controls - stop recording
export const stopHotjarRecording = (): void => {
  if (!window.hj) return;

  // Remove Hotjar tracking
  window.hj("tagRecording", ["opted-out"]);
  console.log("Hotjar recording stopped");
};

// Convenience functions for common events
export const hotjarTrackFormSubmission = (formName: string): void => {
  triggerHotjarEvent(`form_submission_${formName}`);
};

export const hotjarTrackCTAClick = (ctaName: string): void => {
  triggerHotjarEvent(`cta_click_${ctaName}`);
};

export const hotjarTrackFeatureUsage = (featureName: string): void => {
  triggerHotjarEvent(`feature_${featureName}`);
};

export const hotjarTrackError = (errorType: string): void => {
  triggerHotjarEvent(`error_${errorType}`);
  tagHotjarRecording(["error", errorType]);
};
