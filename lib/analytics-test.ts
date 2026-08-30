/**
 * Analytics Integration Test & Utilities
 *
 * Development utilities for testing analytics implementation
 * and ensuring proper event tracking across the application.
 */

import React from "react";
import {
  trackEvent,
  trackProjectView,
  trackProjectLink,
  trackContactForm,
  trackNavigation,
  trackResumeDownload,
  isAnalyticsAvailable,
  getMeasurementId,
} from "./analytics";

/**
 * Test analytics integration in development
 */
export function testAnalytics(): void {
  if (typeof window === "undefined") return;

  console.group("🔍 Analytics Integration Test");

  // Check if analytics is properly configured
  console.log("Analytics Available:", isAnalyticsAvailable());
  console.log("Measurement ID:", getMeasurementId());
  console.log("Environment:", process.env.NODE_ENV);

  // Test basic event tracking
  console.log("Testing basic event...");
  trackEvent({
    action: "test_analytics",
    category: "development",
    label: "integration_test",
    custom_parameters: {
      timestamp: new Date().toISOString(),
      test_type: "basic_event",
    },
  });

  // Test project tracking
  console.log("Testing project tracking...");
  trackProjectView("test-project", "Test Project Analytics");

  // Test contact form tracking
  console.log("Testing contact form tracking...");
  trackContactForm("start");

  // Test navigation tracking
  console.log("Testing navigation tracking...");
  trackNavigation("/test-page", "/current-page");

  console.groupEnd();
}

/**
 * Analytics debugging utilities
 */
export const analyticsDebug = {
  /**
   * Log all analytics events to console in development
   */
  enableDebugMode(): void {
    if (typeof window === "undefined" || process.env.NODE_ENV === "production")
      return;

    const originalGtag = window.gtag;
    if (originalGtag) {
      window.gtag = function (...args: any[]) {
        console.log("📊 GA Event:", args);
        return originalGtag.apply(window, args as [any, any, any?]);
      };
    }
  },

  /**
   * Test all tracking functions
   */
  testAllTracking(): void {
    console.group("🧪 Testing All Analytics Functions");

    // Test project interactions
    trackProjectView("test-1", "Test Project 1");
    trackProjectLink("test-1", "demo");
    trackProjectLink("test-1", "github");

    // Test form interactions
    trackContactForm("start");
    trackContactForm("submit");
    trackContactForm("success");

    // Test navigation
    trackNavigation("/about", "/home");

    // Test resume download
    trackResumeDownload("pdf");

    console.groupEnd();
  },

  /**
   * Check analytics configuration
   */
  checkConfiguration(): void {
    console.group("⚙️ Analytics Configuration");

    console.log("Features enabled:", {
      analytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true",
      blog: process.env.NEXT_PUBLIC_ENABLE_BLOG === "true",
      resumeDownload: process.env.NEXT_PUBLIC_ENABLE_RESUME_DOWNLOAD === "true",
    });

    console.log("Analytics config:", {
      measurementId: getMeasurementId(),
      available: isAnalyticsAvailable(),
      gtag: typeof window !== "undefined" ? !!window.gtag : false,
      dataLayer: typeof window !== "undefined" ? !!window.dataLayer : false,
    });

    console.groupEnd();
  },
};

/**
 * Higher-order component for automatic analytics tracking
 */
export function withAnalytics<P extends object>(
  Component: React.ComponentType<P>,
  trackingConfig?: {
    trackMount?: boolean;
    trackUnmount?: boolean;
    trackProps?: (keyof P)[];
  },
) {
  return function AnalyticsWrappedComponent(props: P) {
    React.useEffect(() => {
      if (trackingConfig?.trackMount) {
        trackEvent({
          action: "component_mount",
          category: "technical",
          label: Component.displayName || Component.name || "Unknown",
          custom_parameters: {
            component_name: Component.displayName || Component.name,
            props_count: Object.keys(props).length,
          },
        });
      }

      return () => {
        if (trackingConfig?.trackUnmount) {
          trackEvent({
            action: "component_unmount",
            category: "technical",
            label: Component.displayName || Component.name || "Unknown",
          });
        }
      };
    }, []);

    return React.createElement(Component, props);
  };
}

// Auto-run configuration check in development
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  // Delay to ensure everything is loaded
  setTimeout(() => {
    analyticsDebug.checkConfiguration();
  }, 2000);
}
