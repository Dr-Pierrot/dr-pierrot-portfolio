'use client';

/**
 * Google Analytics Component
 * 
 * Handles Google Analytics 4 initialization, script loading, and
 * provides tracking hooks for React components. Includes privacy
 * controls and development mode handling.
 */

import { useEffect, useCallback } from 'react';
import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { analyticsConfig } from '@/lib/env';
import { 
  initGA, 
  trackPageView, 
  trackScrollDepth,
  trackError,
  getMeasurementId 
} from '@/lib/analytics';

interface GoogleAnalyticsProps {
  /** Whether to track page views automatically on route changes */
  trackPageViews?: boolean;
  /** Whether to track scroll depth automatically */
  trackScrollDepth?: boolean;
  /** Whether to track JavaScript errors automatically */
  trackErrors?: boolean;
}

/**
 * Google Analytics component that should be placed in the root layout
 */
export default function GoogleAnalytics({ 
  trackPageViews = true,
  trackScrollDepth: enableScrollTracking = true,
  trackErrors = true 
}: GoogleAnalyticsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const measurementId = getMeasurementId();

  // Track page views on route changes
  useEffect(() => {
    if (trackPageViews && pathname) {
      const url = window.location.origin + pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      const title = document.title;
      
      // Small delay to ensure the page title has been updated
      setTimeout(() => {
        trackPageView(url, title);
      }, 100);
    }
  }, [pathname, searchParams, trackPageViews]);

  // Scroll depth tracking
  useEffect(() => {
    if (!enableScrollTracking) return;

    let maxScrollPercentage = 0;
    const trackingThrottled = new Set<number>();

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = Math.round((scrollTop / documentHeight) * 100);

      if (scrollPercentage > maxScrollPercentage) {
        maxScrollPercentage = scrollPercentage;
        
        // Track milestones (25%, 50%, 75%, 100%)
        const milestone = Math.floor(scrollPercentage / 25) * 25;
        if (milestone > 0 && !trackingThrottled.has(milestone)) {
          trackingThrottled.add(milestone);
          trackScrollDepth(milestone);
        }
      }
    };

    // Throttle scroll events
    let scrollTimeout: NodeJS.Timeout;
    const throttledHandleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 100);
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [enableScrollTracking]);

  // Error tracking
  useEffect(() => {
    if (!trackErrors) return;

    const handleError = (event: ErrorEvent) => {
      const error = new Error(event.message);
      error.name = 'JavaScriptError';
      error.stack = `${event.filename}:${event.lineno}:${event.colno}`;
      
      trackError(error, 'window.onerror');
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const error = event.reason instanceof Error 
        ? event.reason 
        : new Error(String(event.reason));
      
      trackError(error, 'unhandledrejection');
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, [trackErrors]);

  // Initialize GA when script loads
  const handleScriptLoad = useCallback(() => {
    initGA();
  }, []);

  // Don't render if analytics is disabled or no measurement ID
  if (!analyticsConfig.enabled || !measurementId) {
    return null;
  }

  return (
    <>
      {/* Google Analytics Script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
      />
    </>
  );
}

/**
 * Hook for manual event tracking in components
 */
export function useAnalytics() {
  return {
    trackPageView,
    trackScrollDepth,
    trackError,
    isEnabled: analyticsConfig.enabled,
    measurementId: getMeasurementId()
  };
}