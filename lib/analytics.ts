/**
 * Google Analytics 4 Integration
 *
 * Provides utilities for tracking events, page views, and user interactions
 * with Google Analytics 4. Includes privacy-focused configurations and
 * development mode handling.
 */

import { analyticsConfig } from "./env";

// Google Analytics gtag types
declare global {
  interface Window {
    gtag: (
      command: "config" | "event" | "js" | "set",
      targetId: string | Date,
      config?: Record<string, any>,
    ) => void;
    dataLayer: any[];
  }
}

/**
 * Initialize Google Analytics
 */
export function initGA(): void {
  if (!analyticsConfig.enabled || !analyticsConfig.gaMeasurementId) {
    return;
  }

  // Initialize dataLayer if it doesn't exist
  window.dataLayer = window.dataLayer || [];

  // Configure gtag
  window.gtag = function () {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };

  // Set initial timestamp
  window.gtag("js", new Date());

  // Configure GA4 with privacy settings
  window.gtag("config", analyticsConfig.gaMeasurementId, {
    // Privacy-focused settings
    anonymize_ip: true,
    respect_dnt: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,

    // Performance settings
    send_page_view: true,
    cookie_expires: 60 * 60 * 24 * 30, // 30 days

    // Custom settings
    custom_map: {
      custom_parameter_1: "portfolio_version",
    },
  });
}

/**
 * Track page views
 */
export function trackPageView(url: string, title?: string): void {
  if (
    !analyticsConfig.enabled ||
    !analyticsConfig.gaMeasurementId ||
    !window.gtag
  ) {
    return;
  }

  window.gtag("event", "page_view", {
    page_title: title,
    page_location: url,
    send_to: analyticsConfig.gaMeasurementId,
  });
}

/**
 * Event tracking types
 */
export interface AnalyticsEvent {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
}

/**
 * Track custom events
 */
export function trackEvent({
  action,
  category,
  label,
  value,
  custom_parameters,
}: AnalyticsEvent): void {
  if (
    !analyticsConfig.enabled ||
    !analyticsConfig.gaMeasurementId ||
    !window.gtag
  ) {
    return;
  }

  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
    send_to: analyticsConfig.gaMeasurementId,
    ...custom_parameters,
  });
}

/**
 * Pre-defined event tracking functions
 */

// Project interactions
export function trackProjectView(
  projectId: string,
  projectTitle: string,
): void {
  trackEvent({
    action: "view_project",
    category: "engagement",
    label: projectTitle,
    custom_parameters: {
      project_id: projectId,
      content_type: "project",
    },
  });
}

export function trackProjectLink(
  projectId: string,
  linkType: "demo" | "github" | "case_study",
): void {
  trackEvent({
    action: "click_project_link",
    category: "engagement",
    label: `${projectId}_${linkType}`,
    custom_parameters: {
      project_id: projectId,
      link_type: linkType,
      content_type: "external_link",
    },
  });
}

// Navigation tracking
export function trackNavigation(destination: string, source?: string): void {
  trackEvent({
    action: "navigate",
    category: "navigation",
    label: destination,
    custom_parameters: {
      destination_page: destination,
      source_page: source || window.location.pathname,
    },
  });
}

// Contact form tracking
export function trackContactForm(
  action: "start" | "submit" | "success" | "error",
): void {
  trackEvent({
    action: "contact_form",
    category: "engagement",
    label: action,
    custom_parameters: {
      form_step: action,
      content_type: "form",
    },
  });
}

// Resume download tracking
export function trackResumeDownload(format: "pdf" | "json" = "pdf"): void {
  trackEvent({
    action: "download_resume",
    category: "engagement",
    label: format,
    value: 1,
    custom_parameters: {
      file_format: format,
      content_type: "download",
    },
  });
}

// Scroll depth tracking
export function trackScrollDepth(percentage: number): void {
  if (percentage % 25 === 0) {
    // Track at 25%, 50%, 75%, 100%
    trackEvent({
      action: "scroll",
      category: "engagement",
      label: `${percentage}%`,
      value: percentage,
      custom_parameters: {
        scroll_depth: percentage,
        page_url: window.location.pathname,
      },
    });
  }
}

// Error tracking
export function trackError(error: Error, context?: string): void {
  trackEvent({
    action: "error",
    category: "technical",
    label: error.message,
    custom_parameters: {
      error_name: error.name,
      error_message: error.message,
      error_stack: error.stack?.substring(0, 500), // Limit stack trace length
      error_context: context,
      page_url: window.location.pathname,
    },
  });
}

/**
 * Utility functions
 */

// Check if analytics is available and enabled
export function isAnalyticsAvailable(): boolean {
  return !!(
    analyticsConfig.enabled &&
    analyticsConfig.gaMeasurementId &&
    typeof window !== "undefined" &&
    window.gtag
  );
}

// Get the measurement ID
export function getMeasurementId(): string | undefined {
  return analyticsConfig.gaMeasurementId;
}

// Opt-out functionality (GDPR compliance)
export function optOutOfAnalytics(): void {
  if (analyticsConfig.gaMeasurementId) {
    // Set the GA opt-out flag using proper typing
    const optOutProperty = `ga-disable-${analyticsConfig.gaMeasurementId}`;
    (window as any)[optOutProperty] = true;

    // Clear existing GA cookies
    document.cookie = "_ga=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "_ga_" +
      analyticsConfig.gaMeasurementId.replace("G-", "") +
      "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
}

// Opt back in to analytics
export function optInToAnalytics(): void {
  if (analyticsConfig.gaMeasurementId) {
    const optOutProperty = `ga-disable-${analyticsConfig.gaMeasurementId}`;
    (window as any)[optOutProperty] = false;

    // Reinitialize GA
    initGA();
  }
}
