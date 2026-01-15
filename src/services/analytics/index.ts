/**
 * Analytics service exports
 * @module services/analytics
 */

// Export types
export type {
  DeviceType,
  TrafficSource,
  EventType,
  PageViewDocument,
  AnalyticsEventDocument,
  SessionDocument,
  DailyMetrics,
  DashboardMetrics,
} from './types';

export { COLLECTIONS } from './types';

// Export utility functions
export {
  generateSessionId,
  getSessionId,
  detectDeviceType,
  classifyTrafficSource,
  calculateSessionDuration,
  sanitizePath,
} from './utils';

// Export data logging functions
export {
  logPageView,
  logAnalyticsEvent,
  logProjectView,
  logProjectClick,
  logContactSubmit,
  logSocialClick,
  logBlogRead,
  logResumeDownload,
  logSectionView,
} from './logEvent';

// Export dashboard data fetching functions
export {
  fetchDashboardMetrics,
  getRecentPageViews,
  getRecentEvents,
} from './fetchDashboardData';
