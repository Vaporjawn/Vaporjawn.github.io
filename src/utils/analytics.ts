// Google Analytics 4 Integration
// Initialize with your GA4 Measurement ID

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

interface PageView {
  page_title: string;
  page_location: string;
  page_path: string;
}

// Type declaration for gtag
declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
    dataLayer?: unknown[];
  }
}

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || '';

export const initGA = (): void => {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) {
    console.warn('Google Analytics not initialized: Missing measurement ID');
    return;
  }

  // Load GA4 script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args) {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer?.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: false, // We'll send page views manually
  });

  console.log('Google Analytics initialized');
};

export const trackPageView = (pageData: PageView): void => {
  if (!window.gtag) return;

  window.gtag('event', 'page_view', {
    page_title: pageData.page_title,
    page_location: pageData.page_location,
    page_path: pageData.page_path,
  });
};

export const trackEvent = (event: AnalyticsEvent): void => {
  if (!window.gtag) return;

  window.gtag('event', event.action, {
    event_category: event.category,
    event_label: event.label,
    value: event.value,
  });
};

// Convenience functions for common events
export const trackProjectView = (projectName: string): void => {
  trackEvent({
    action: 'view_project',
    category: 'Projects',
    label: projectName,
  });
};

export const trackProjectClick = (projectName: string, linkType: 'live' | 'github'): void => {
  trackEvent({
    action: 'click_project_link',
    category: 'Projects',
    label: `${projectName} - ${linkType}`,
  });
};

export const trackResumeDownload = (): void => {
  trackEvent({
    action: 'download_resume',
    category: 'Resume',
    label: 'PDF Download',
  });
};

export const trackContactFormSubmit = (success: boolean): void => {
  trackEvent({
    action: 'submit_contact_form',
    category: 'Contact',
    label: success ? 'Success' : 'Error',
  });
};

export const trackSocialClick = (platform: string): void => {
  trackEvent({
    action: 'click_social_link',
    category: 'Social',
    label: platform,
  });
};

export const trackThemeToggle = (theme: 'light' | 'dark'): void => {
  trackEvent({
    action: 'toggle_theme',
    category: 'UI',
    label: theme,
  });
};

export const trackSkillInteraction = (skillName: string): void => {
  trackEvent({
    action: 'interact_skill',
    category: 'Skills',
    label: skillName,
  });
};

// Advanced Custom Events

export const trackScrollDepth = (depth: number): void => {
  trackEvent({
    action: 'scroll_depth',
    category: 'Engagement',
    label: `${depth}%`,
    value: depth,
  });
};

export const trackTimeOnPage = (seconds: number): void => {
  trackEvent({
    action: 'time_on_page',
    category: 'Engagement',
    label: window.location.pathname,
    value: seconds,
  });
};

export const trackCTAClick = (ctaName: string, location: string): void => {
  trackEvent({
    action: 'click_cta',
    category: 'Conversion',
    label: `${ctaName} - ${location}`,
  });
};

export const trackNavigation = (from: string, to: string): void => {
  trackEvent({
    action: 'navigate',
    category: 'Navigation',
    label: `${from} → ${to}`,
  });
};

export const trackSearch = (query: string, resultsCount: number): void => {
  trackEvent({
    action: 'search',
    category: 'Search',
    label: query,
    value: resultsCount,
  });
};

export const trackFilter = (filterType: string, filterValue: string): void => {
  trackEvent({
    action: 'apply_filter',
    category: 'Filter',
    label: `${filterType}: ${filterValue}`,
  });
};

export const trackBlogRead = (postTitle: string, readPercentage: number): void => {
  trackEvent({
    action: 'read_blog',
    category: 'Blog',
    label: postTitle,
    value: readPercentage,
  });
};

export const trackCalendlyOpen = (): void => {
  trackEvent({
    action: 'open_calendly',
    category: 'Conversion',
    label: 'Schedule Meeting',
  });
};

export const trackNewsletterSignup = (source: string): void => {
  trackEvent({
    action: 'signup_newsletter',
    category: 'Conversion',
    label: source,
  });
};

export const trackErrorEncountered = (errorType: string, errorMessage: string): void => {
  trackEvent({
    action: 'error_encountered',
    category: 'Error',
    label: `${errorType}: ${errorMessage}`,
  });
};

export const trackExternalLink = (url: string, linkText: string): void => {
  trackEvent({
    action: 'click_external_link',
    category: 'External',
    label: `${linkText} - ${url}`,
  });
};

export const trackVideoPlay = (videoTitle: string): void => {
  trackEvent({
    action: 'play_video',
    category: 'Media',
    label: videoTitle,
  });
};

export const trackFileDownload = (fileName: string, fileType: string): void => {
  trackEvent({
    action: 'download_file',
    category: 'Downloads',
    label: `${fileName} (${fileType})`,
  });
};

// Utility to track scroll depth automatically
let scrollDepthTracked = { 25: false, 50: false, 75: false, 100: false };

export const initScrollTracking = (): void => {
  if (typeof window === 'undefined') return;

  const handleScroll = () => {
    const scrollPercentage = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );

    [25, 50, 75, 100].forEach((depth) => {
      if (scrollPercentage >= depth && !scrollDepthTracked[depth as keyof typeof scrollDepthTracked]) {
        scrollDepthTracked[depth as keyof typeof scrollDepthTracked] = true;
        trackScrollDepth(depth);
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // Reset on navigation
  return () => {
    window.removeEventListener('scroll', handleScroll);
    scrollDepthTracked = { 25: false, 50: false, 75: false, 100: false };
  };
};

// Utility to track time on page
export const initTimeTracking = (): void => {
  if (typeof window === 'undefined') return;

  const startTime = Date.now();
  const intervals = [30, 60, 120, 300]; // 30s, 1min, 2min, 5min
  const tracked: Record<number, boolean> = {};

  const checkInterval = setInterval(() => {
    const secondsOnPage = Math.floor((Date.now() - startTime) / 1000);

    intervals.forEach((interval) => {
      if (secondsOnPage >= interval && !tracked[interval]) {
        tracked[interval] = true;
        trackTimeOnPage(interval);
      }
    });

    // Stop tracking after 5 minutes
    if (secondsOnPage >= 300) {
      clearInterval(checkInterval);
    }
  }, 1000);

  // Cleanup on unmount
  return () => clearInterval(checkInterval);
};
