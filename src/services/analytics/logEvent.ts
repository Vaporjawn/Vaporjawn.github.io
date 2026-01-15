/**
 * Analytics data collection service
 * Logs analytics events to Firestore
 * @module services/analytics/logEvent
 */

import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getFirestoreDB } from '../../backend/firebase';
import type {
  EventType,
  PageViewDocument,
  AnalyticsEventDocument,
} from './types';
import {
  getSessionId,
  detectDeviceType,
  classifyTrafficSource,
  sanitizePath,
} from './utils';
import { COLLECTIONS } from './types';

/**
 * Log a page view event to Firestore
 * @param path - Page path
 * @param title - Page title
 * @returns Promise that resolves when logged
 */
export async function logPageView(path: string, title: string): Promise<void> {
  try {
    const db = getFirestoreDB();
    const sessionId = getSessionId();
    const deviceType = detectDeviceType();
    const trafficSource = classifyTrafficSource(document.referrer);

    const pageViewData: Omit<PageViewDocument, 'timestamp'> & { timestamp: any } = {
      timestamp: serverTimestamp(),
      path: sanitizePath(path),
      title,
      sessionId,
      referrer: document.referrer || undefined,
      deviceType,
      trafficSource,
    };

    await addDoc(collection(db, COLLECTIONS.PAGE_VIEWS), pageViewData);

    console.log('[Analytics] Page view logged:', path);
  } catch (error) {
    console.error('[Analytics] Failed to log page view:', error);
    // Don't throw - analytics failures shouldn't break the app
  }
}

/**
 * Log a generic analytics event to Firestore
 * @param type - Event type
 * @param label - Event label
 * @param metadata - Additional event metadata
 * @returns Promise that resolves when logged
 */
export async function logAnalyticsEvent(
  type: EventType,
  label: string,
  metadata?: Record<string, any>
): Promise<void> {
  try {
    const db = getFirestoreDB();
    const sessionId = getSessionId();

    const eventData: Omit<AnalyticsEventDocument, 'timestamp'> & { timestamp: any } = {
      timestamp: serverTimestamp(),
      type,
      label,
      sessionId,
      metadata,
    };

    await addDoc(collection(db, COLLECTIONS.EVENTS), eventData);

    console.log('[Analytics] Event logged:', type, label);
  } catch (error) {
    console.error('[Analytics] Failed to log event:', error);
    // Don't throw - analytics failures shouldn't break the app
  }
}

/**
 * Log a project view event
 * @param projectName - Name of the project viewed
 * @returns Promise that resolves when logged
 */
export async function logProjectView(projectName: string): Promise<void> {
  return logAnalyticsEvent('project_view', projectName);
}

/**
 * Log a project link click
 * @param projectName - Name of the project
 * @param linkType - Type of link clicked (live or github)
 * @returns Promise that resolves when logged
 */
export async function logProjectClick(
  projectName: string,
  linkType: 'live' | 'github'
): Promise<void> {
  return logAnalyticsEvent('project_click', `${projectName} - ${linkType}`, {
    linkType,
  });
}

/**
 * Log a contact form submission
 * @param formType - Type of contact form
 * @returns Promise that resolves when logged
 */
export async function logContactSubmit(formType: string = 'contact'): Promise<void> {
  return logAnalyticsEvent('contact_submit', formType);
}

/**
 * Log a social media click
 * @param platform - Social media platform
 * @returns Promise that resolves when logged
 */
export async function logSocialClick(platform: string): Promise<void> {
  return logAnalyticsEvent('social_click', platform);
}

/**
 * Log a blog post read
 * @param postTitle - Blog post title
 * @returns Promise that resolves when logged
 */
export async function logBlogRead(postTitle: string): Promise<void> {
  return logAnalyticsEvent('blog_read', postTitle);
}

/**
 * Log a resume download
 * @returns Promise that resolves when logged
 */
export async function logResumeDownload(): Promise<void> {
  return logAnalyticsEvent('resume_download', 'Resume PDF');
}

/**
 * Log a section view (e.g., scrolling to a section)
 * @param sectionName - Name of the section viewed
 * @returns Promise that resolves when logged
 */
export async function logSectionView(sectionName: string): Promise<void> {
  return logAnalyticsEvent('section_view', sectionName);
}
