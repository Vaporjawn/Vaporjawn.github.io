/**
 * Analytics utility functions
 * @module services/analytics/utils
 */

import type { DeviceType, TrafficSource } from './types';

/**
 * Generate a unique session ID
 * @returns Session ID string
 */
export function generateSessionId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
}

/**
 * Get or create session ID from sessionStorage
 * @returns Session ID
 */
export function getSessionId(): string {
  const SESSION_KEY = 'analytics_session_id';
  const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes

  let sessionData = sessionStorage.getItem(SESSION_KEY);

  if (sessionData) {
    try {
      const { id, timestamp } = JSON.parse(sessionData);
      const age = Date.now() - timestamp;

      // Reuse session if less than 30 minutes old
      if (age < SESSION_DURATION) {
        return id;
      }
    } catch {
      // Invalid session data, create new one
    }
  }

  // Create new session
  const newSessionId = generateSessionId();
  sessionStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ id: newSessionId, timestamp: Date.now() })
  );

  return newSessionId;
}

/**
 * Detect device type based on screen width
 * @returns Device type classification
 */
export function detectDeviceType(): DeviceType {
  const width = window.innerWidth;

  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

/**
 * Classify traffic source based on referrer
 * @param referrer - Document referrer
 * @returns Traffic source classification
 */
export function classifyTrafficSource(referrer: string): TrafficSource {
  if (!referrer || referrer === window.location.origin) {
    return 'direct';
  }

  const ref = referrer.toLowerCase();

  // Social media sources
  const socialDomains = [
    'facebook.com',
    'twitter.com',
    'linkedin.com',
    'instagram.com',
    'github.com',
    'reddit.com',
    't.co', // Twitter shortened URLs
  ];

  if (socialDomains.some((domain) => ref.includes(domain))) {
    return 'social';
  }

  // Search engines
  const searchDomains = ['google.com', 'bing.com', 'yahoo.com', 'duckduckgo.com'];

  if (searchDomains.some((domain) => ref.includes(domain))) {
    return 'search';
  }

  // Everything else is referral
  return 'referral';
}

/**
 * Calculate session duration in seconds
 * @param startTime - Session start timestamp
 * @param endTime - Session end timestamp
 * @returns Duration in seconds
 */
export function calculateSessionDuration(startTime: number, endTime: number): number {
  return Math.floor((endTime - startTime) / 1000);
}

/**
 * Sanitize page path for storage
 * @param path - URL path
 * @returns Sanitized path
 */
export function sanitizePath(path: string): string {
  // Remove query parameters and hash
  return path.split('?')[0].split('#')[0];
}
