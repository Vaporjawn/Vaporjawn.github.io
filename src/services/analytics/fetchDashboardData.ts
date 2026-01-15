/**
 * Fetch analytics data for admin dashboard
 * @module services/analytics/fetchDashboardData
 */

import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  Timestamp,
} from 'firebase/firestore';
import { getFirestoreDB } from '../../backend/firebase';
import type {
  DashboardMetrics,
  PageViewDocument,
  AnalyticsEventDocument,
  DeviceType,
  TrafficSource,
} from './types';
import { COLLECTIONS } from './types';

/**
 * Get date range for querying (default: last 30 days)
 * @param days - Number of days to look back
 * @returns Start and end timestamps
 */
function getDateRange(days: number = 30): { start: Timestamp; end: Timestamp } {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - days);

  return {
    start: Timestamp.fromDate(start),
    end: Timestamp.fromDate(end),
  };
}

/**
 * Fetch dashboard metrics from Firestore
 * @param days - Number of days to analyze (default: 30)
 * @returns Dashboard metrics data
 */
export async function fetchDashboardMetrics(days: number = 30): Promise<DashboardMetrics> {
  try {
    const db = getFirestoreDB();
    const { start, end } = getDateRange(days);

    // Fetch page views
    const pageViewsRef = collection(db, COLLECTIONS.PAGE_VIEWS);
    const pageViewsQuery = query(
      pageViewsRef,
      where('timestamp', '>=', start),
      where('timestamp', '<=', end)
    );
    const pageViewsSnapshot = await getDocs(pageViewsQuery);
    const pageViews = pageViewsSnapshot.docs.map((doc) => doc.data() as PageViewDocument);

    // Fetch events
    const eventsRef = collection(db, COLLECTIONS.EVENTS);
    const eventsQuery = query(
      eventsRef,
      where('timestamp', '>=', start),
      where('timestamp', '<=', end)
    );
    const eventsSnapshot = await getDocs(eventsQuery);
    const events = eventsSnapshot.docs.map((doc) => doc.data() as AnalyticsEventDocument);

    // Calculate metrics
    const metrics = calculateMetrics(pageViews, events, days);

    console.log('[Analytics] Dashboard metrics fetched successfully');
    return metrics;
  } catch (error) {
    console.error('[Analytics] Failed to fetch dashboard metrics:', error);
    throw error;
  }
}

/**
 * Calculate dashboard metrics from raw data
 * @param pageViews - Page view documents
 * @param events - Analytics event documents
 * @param days - Number of days analyzed
 * @returns Calculated dashboard metrics
 */
function calculateMetrics(
  pageViews: PageViewDocument[],
  events: AnalyticsEventDocument[],
  days: number
): DashboardMetrics {
  // Unique visitors (unique sessionIds)
  const uniqueSessions = new Set(pageViews.map((pv) => pv.sessionId));
  const uniqueVisitors = uniqueSessions.size;

  // Calculate bounce rate (sessions with only 1 page view)
  const sessionPageCounts = new Map<string, number>();
  pageViews.forEach((pv) => {
    sessionPageCounts.set(pv.sessionId, (sessionPageCounts.get(pv.sessionId) || 0) + 1);
  });
  const bouncedSessions = Array.from(sessionPageCounts.values()).filter(
    (count) => count === 1
  ).length;
  const bounceRate = uniqueVisitors > 0 ? (bouncedSessions / uniqueVisitors) * 100 : 0;

  // Calculate session durations
  const sessionTimes = new Map<string, { first: number; last: number }>();
  pageViews.forEach((pv) => {
    const timestamp = pv.timestamp.toMillis();
    const existing = sessionTimes.get(pv.sessionId);

    if (!existing) {
      sessionTimes.set(pv.sessionId, { first: timestamp, last: timestamp });
    } else {
      sessionTimes.set(pv.sessionId, {
        first: Math.min(existing.first, timestamp),
        last: Math.max(existing.last, timestamp),
      });
    }
  });

  const sessionDurations = Array.from(sessionTimes.values()).map(
    (times) => (times.last - times.first) / 1000
  );
  const avgSessionDuration =
    sessionDurations.length > 0
      ? sessionDurations.reduce((sum, dur) => sum + dur, 0) / sessionDurations.length
      : 0;

  // Count events by type
  const contactForms = events.filter((e) => e.type === 'contact_submit').length;
  const projectViews = events.filter((e) => e.type === 'project_view').length;
  const socialClicks = events.filter((e) => e.type === 'social_click').length;
  const blogReads = events.filter((e) => e.type === 'blog_read').length;

  // Top pages
  const pageCounts = new Map<string, number>();
  pageViews.forEach((pv) => {
    pageCounts.set(pv.path, (pageCounts.get(pv.path) || 0) + 1);
  });
  const topPages = Array.from(pageCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([page, views]) => ({ page, views }));

  // Traffic sources
  const sourceCounts = new Map<TrafficSource, number>();
  pageViews.forEach((pv) => {
    sourceCounts.set(pv.trafficSource, (sourceCounts.get(pv.trafficSource) || 0) + 1);
  });
  const trafficSources = Array.from(sourceCounts.entries()).map(([source, value]) => ({
    source,
    value,
  }));

  // Device breakdown (calculate percentages)
  const deviceCounts = new Map<DeviceType, number>();
  pageViews.forEach((pv) => {
    deviceCounts.set(pv.deviceType, (deviceCounts.get(pv.deviceType) || 0) + 1);
  });
  const totalViews = pageViews.length;
  const deviceBreakdown = Array.from(deviceCounts.entries()).map(([device, count]) => ({
    device,
    percentage: totalViews > 0 ? (count / totalViews) * 100 : 0,
  }));

  // Page views trend (group by date)
  const viewsByDate = new Map<string, number>();
  pageViews.forEach((pv) => {
    const date = new Date(pv.timestamp.toMillis()).toISOString().split('T')[0];
    viewsByDate.set(date, (viewsByDate.get(date) || 0) + 1);
  });
  const pageViewsTrend = Array.from(viewsByDate.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([date, views]) => ({ date, views }));

  return {
    overview: {
      pageViews: pageViews.length,
      uniqueVisitors,
      avgSessionDuration: Math.round(avgSessionDuration),
      bounceRate: Math.round(bounceRate * 10) / 10, // Round to 1 decimal
      contactForms,
      projectViews,
      socialClicks,
      blogReads,
    },
    pageViewsTrend,
    topPages,
    trafficSources,
    deviceBreakdown,
  };
}

/**
 * Get recent page views
 * @param count - Number of recent views to fetch
 * @returns Recent page view documents
 */
export async function getRecentPageViews(count: number = 100): Promise<PageViewDocument[]> {
  try {
    const db = getFirestoreDB();
    const pageViewsRef = collection(db, COLLECTIONS.PAGE_VIEWS);
    const recentQuery = query(pageViewsRef, orderBy('timestamp', 'desc'), limit(count));

    const snapshot = await getDocs(recentQuery);
    return snapshot.docs.map((doc) => doc.data() as PageViewDocument);
  } catch (error) {
    console.error('[Analytics] Failed to fetch recent page views:', error);
    throw error;
  }
}

/**
 * Get recent events
 * @param count - Number of recent events to fetch
 * @returns Recent analytics event documents
 */
export async function getRecentEvents(
  count: number = 100
): Promise<AnalyticsEventDocument[]> {
  try {
    const db = getFirestoreDB();
    const eventsRef = collection(db, COLLECTIONS.EVENTS);
    const recentQuery = query(eventsRef, orderBy('timestamp', 'desc'), limit(count));

    const snapshot = await getDocs(recentQuery);
    return snapshot.docs.map((doc) => doc.data() as AnalyticsEventDocument);
  } catch (error) {
    console.error('[Analytics] Failed to fetch recent events:', error);
    throw error;
  }
}
