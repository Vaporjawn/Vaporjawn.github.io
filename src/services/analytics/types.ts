/**
 * Analytics data type definitions
 * @module services/analytics/types
 */

import type { Timestamp } from 'firebase/firestore';

/**
 * Device type classification
 */
export type DeviceType = 'mobile' | 'tablet' | 'desktop';

/**
 * Traffic source types
 */
export type TrafficSource = 'direct' | 'social' | 'search' | 'referral' | 'other';

/**
 * Analytics event types
 */
export type EventType =
  | 'page_view'
  | 'project_view'
  | 'project_click'
  | 'contact_submit'
  | 'social_click'
  | 'blog_read'
  | 'resume_download'
  | 'section_view';

/**
 * Page view document structure
 */
export interface PageViewDocument {
  timestamp: Timestamp;
  path: string;
  title: string;
  sessionId: string;
  referrer?: string;
  deviceType: DeviceType;
  trafficSource: TrafficSource;
}

/**
 * Analytics event document structure
 */
export interface AnalyticsEventDocument {
  timestamp: Timestamp;
  type: EventType;
  label: string;
  sessionId: string;
  metadata?: Record<string, any>;
}

/**
 * Session document structure
 */
export interface SessionDocument {
  sessionId: string;
  startTime: Timestamp;
  lastActivity: Timestamp;
  deviceType: DeviceType;
  trafficSource: TrafficSource;
  pageCount: number;
  eventCount: number;
  duration?: number; // seconds
}

/**
 * Aggregated daily metrics for dashboard
 */
export interface DailyMetrics {
  date: string; // YYYY-MM-DD format
  pageViews: number;
  uniqueVisitors: number;
  sessions: number;
  avgSessionDuration: number; // seconds
  bounceRate: number; // percentage
  contactForms: number;
  projectViews: number;
  socialClicks: number;
  blogReads: number;
  topPages: Array<{ path: string; views: number }>;
  trafficSources: Array<{ source: TrafficSource; count: number }>;
  deviceBreakdown: Array<{ device: DeviceType; count: number }>;
}

/**
 * Dashboard metrics response
 */
export interface DashboardMetrics {
  overview: {
    pageViews: number;
    uniqueVisitors: number;
    avgSessionDuration: number;
    bounceRate: number;
    contactForms: number;
    projectViews: number;
    socialClicks: number;
    blogReads: number;
  };
  pageViewsTrend: Array<{ date: string; views: number }>;
  topPages: Array<{ page: string; views: number }>;
  trafficSources: Array<{ source: string; value: number }>;
  deviceBreakdown: Array<{ device: string; percentage: number }>;
}

/**
 * Firestore collection names
 */
export const COLLECTIONS = {
  PAGE_VIEWS: 'analytics_pageViews',
  EVENTS: 'analytics_events',
  SESSIONS: 'analytics_sessions',
  DAILY_METRICS: 'analytics_daily',
} as const;
