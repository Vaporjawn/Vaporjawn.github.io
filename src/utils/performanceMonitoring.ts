// Performance monitoring utilities
import { addBreadcrumb, captureMessage } from './errorTracking';

interface PerformanceMetrics {
  fcp: number | null; // First Contentful Paint
  lcp: number | null; // Largest Contentful Paint
  fid: number | null; // First Input Delay
  cls: number | null; // Cumulative Layout Shift
  ttfb: number | null; // Time to First Byte
}

// Core Web Vitals thresholds
const THRESHOLDS = {
  FCP: { good: 1800, needsImprovement: 3000 },
  LCP: { good: 2500, needsImprovement: 4000 },
  FID: { good: 100, needsImprovement: 300 },
  CLS: { good: 0.1, needsImprovement: 0.25 },
  TTFB: { good: 800, needsImprovement: 1800 },
};

let metrics: PerformanceMetrics = {
  fcp: null,
  lcp: null,
  fid: null,
  cls: null,
  ttfb: null,
};

// Initialize performance monitoring
export const initPerformanceMonitoring = (): void => {
  if (typeof window === 'undefined' || !window.PerformanceObserver) {
    console.warn('Performance monitoring not supported');
    return;
  }

  // Monitor First Contentful Paint (FCP)
  const fcpObserver = new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      if (entry.name === 'first-contentful-paint') {
        metrics.fcp = entry.startTime;
        logMetric('FCP', entry.startTime, THRESHOLDS.FCP);
        fcpObserver.disconnect();
      }
    }
  });

  try {
    fcpObserver.observe({ type: 'paint', buffered: true });
  } catch (e) {
    console.warn('FCP observer not supported:', e);
  }

  // Monitor Largest Contentful Paint (LCP)
  const lcpObserver = new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    const lastEntry = entries[entries.length - 1];
    metrics.lcp = lastEntry.startTime;
    logMetric('LCP', lastEntry.startTime, THRESHOLDS.LCP);
  });

  try {
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
  } catch (e) {
    console.warn('LCP observer not supported:', e);
  }

  // Monitor First Input Delay (FID)
  const fidObserver = new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      const fidEntry = entry as PerformanceEventTiming;
      metrics.fid = fidEntry.processingStart - fidEntry.startTime;
      logMetric('FID', metrics.fid, THRESHOLDS.FID);
      fidObserver.disconnect();
    }
  });

  try {
    fidObserver.observe({ type: 'first-input', buffered: true });
  } catch (e) {
    console.warn('FID observer not supported:', e);
  }

  // Monitor Cumulative Layout Shift (CLS)
  let clsValue = 0;
  const clsObserver = new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      if (!(entry as LayoutShift).hadRecentInput) {
        clsValue += (entry as LayoutShift).value;
      }
    }
    metrics.cls = clsValue;
    logMetric('CLS', clsValue, THRESHOLDS.CLS);
  });

  try {
    clsObserver.observe({ type: 'layout-shift', buffered: true });
  } catch (e) {
    console.warn('CLS observer not supported:', e);
  }

  // Calculate Time to First Byte (TTFB)
  const navigationObserver = new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    const navigationEntry = entries[0] as PerformanceNavigationTiming;
    metrics.ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
    logMetric('TTFB', metrics.ttfb, THRESHOLDS.TTFB);
    navigationObserver.disconnect();
  });

  try {
    navigationObserver.observe({ type: 'navigation', buffered: true });
  } catch (e) {
    console.warn('Navigation observer not supported:', e);
  }

  // Report all metrics after page load
  window.addEventListener('load', () => {
    setTimeout(() => {
      reportAllMetrics();
    }, 3000); // Wait 3 seconds after load to ensure all metrics are collected
  });
};

// Log individual metric
const logMetric = (
  name: string,
  value: number,
  thresholds: { good: number; needsImprovement: number }
): void => {
  const status = value <= thresholds.good ? 'good' : value <= thresholds.needsImprovement ? 'needs improvement' : 'poor';

  addBreadcrumb(`Performance: ${name}`, 'performance', 'info');

  if (status === 'poor') {
    captureMessage(`Poor ${name}: ${value.toFixed(2)}ms (threshold: ${thresholds.needsImprovement}ms)`, 'warning');
  }

  console.log(`[Performance] ${name}: ${value.toFixed(2)}ms (${status})`);
};

// Report all collected metrics
const reportAllMetrics = (): void => {
  console.group('[Performance Metrics]');
  console.table(metrics);
  console.groupEnd();

  // Send to analytics if available
  if (window.gtag) {
    Object.entries(metrics).forEach(([key, value]) => {
      if (value !== null) {
        window.gtag?.('event', 'web_vitals', {
          event_category: 'Performance',
          event_label: key.toUpperCase(),
          value: Math.round(value),
        });
      }
    });
  }
};

// Get current metrics
export const getMetrics = (): PerformanceMetrics => {
  return { ...metrics };
};

// Monitor long tasks (> 50ms)
export const monitorLongTasks = (): void => {
  if (!window.PerformanceObserver) return;

  const longTaskObserver = new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      if (entry.duration > 50) {
        console.warn(`[Performance] Long task detected: ${entry.duration.toFixed(2)}ms`, entry);
        addBreadcrumb(`Long task: ${entry.duration.toFixed(2)}ms`, 'performance', 'warning');
      }
    }
  });

  try {
    longTaskObserver.observe({ type: 'longtask', buffered: true });
  } catch (e) {
    console.warn('Long task observer not supported:', e);
  }
};

// Types for PerformanceObserver entries
interface PerformanceEventTiming extends PerformanceEntry {
  processingStart: number;
}

interface LayoutShift extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}
