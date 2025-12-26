// Sentry Error Tracking Integration
import * as Sentry from '@sentry/react';

const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN || '';
const environment = import.meta.env.MODE || 'development';

export const initSentry = (): void => {
  if (!SENTRY_DSN) {
    console.warn('Sentry not initialized: Missing DSN');
    return;
  }

  Sentry.init({
    dsn: SENTRY_DSN,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],
    environment,
    // Performance Monitoring
    tracesSampleRate: environment === 'production' ? 0.1 : 1.0, // 10% in prod, 100% in dev
    // Session Replay
    replaysSessionSampleRate: 0.1, // 10% of sessions
    replaysOnErrorSampleRate: 1.0, // 100% of sessions with errors
    // Release tracking
    release: `portfolio@${import.meta.env.VITE_APP_VERSION || '1.0.0'}`,
    // Ignore specific errors
    ignoreErrors: [
      'ResizeObserver loop limit exceeded',
      'Non-Error promise rejection captured',
      'ChunkLoadError',
    ],
    beforeSend(event, hint) {
      // Filter out development errors
      if (environment === 'development') {
        console.log('Sentry Event:', event, hint);
      }
      return event;
    },
  });

  console.log('Sentry initialized for environment:', environment);
};

// Custom error boundary component wrapper
export const SentryErrorBoundary = Sentry.ErrorBoundary;

// Capture custom errors
export const captureError = (error: Error, context?: Record<string, unknown>): void => {
  if (context) {
    Sentry.setContext('additional_info', context);
  }
  Sentry.captureException(error);
};

// Capture custom messages
export const captureMessage = (message: string, level: Sentry.SeverityLevel = 'info'): void => {
  Sentry.captureMessage(message, level);
};

// Set user context
export const setUserContext = (user: { id: string; email?: string; username?: string }): void => {
  Sentry.setUser(user);
};

// Add breadcrumbs for debugging
export const addBreadcrumb = (message: string, category: string, level: Sentry.SeverityLevel = 'info'): void => {
  Sentry.addBreadcrumb({
    message,
    category,
    level,
    timestamp: Date.now() / 1000,
  });
};

// Performance monitoring
export const startTransaction = (name: string, op: string) => {
  return Sentry.startSpan({ name, op }, (span) => span);
};
