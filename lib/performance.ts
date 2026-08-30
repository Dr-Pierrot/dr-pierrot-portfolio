/**
 * Performance Monitoring and Optimization Utilities
 *
 * Provides utilities for performance monitoring, metrics collection,
 * and optimization helpers for the application.
 */

"use client";

import React from "react";

// Custom LayoutShift interface for performance metrics
interface LayoutShift extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

// Performance metrics interface
export interface PerformanceMetrics {
  navigationTiming: PerformanceNavigationTiming | null;
  resourceTimings: PerformanceResourceTiming[];
  paintTimings: PerformanceEntry[];
  layoutShiftEntries: LayoutShift[];
  firstContentfulPaint: number | null;
  largestContentfulPaint: number | null;
  firstInputDelay: number | null;
  cumulativeLayoutShift: number;
  timeToInteractive: number | null;
}

// Web Vitals interface
export interface WebVitals {
  fcp: number | null; // First Contentful Paint
  lcp: number | null; // Largest Contentful Paint
  fid: number | null; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number | null; // Time to First Byte
  inp: number | null; // Interaction to Next Paint
}

// Performance observer for Core Web Vitals
export class PerformanceMonitor {
  private metrics: Partial<WebVitals> = {};
  private observers: PerformanceObserver[] = [];
  private clsValue = 0;
  private sessionId: string;

  constructor() {
    this.sessionId = this.generateSessionId();

    if (typeof window !== "undefined") {
      this.initializeObservers();
      this.calculateTTFB();
    }
  }

  private generateSessionId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }

  private initializeObservers(): void {
    // LCP Observer
    this.observeMetric("largest-contentful-paint", (entries) => {
      const lastEntry = entries[entries.length - 1];
      if (lastEntry) {
        this.metrics.lcp = lastEntry.startTime;
      }
    });

    // FCP Observer
    this.observeMetric("paint", (entries) => {
      entries.forEach((entry) => {
        if (entry.name === "first-contentful-paint") {
          this.metrics.fcp = entry.startTime;
        }
      });
    });

    // FID Observer (First Input Delay)
    this.observeMetric("first-input", (entries) => {
      entries.forEach((entry) => {
        const fidEntry = entry as PerformanceEntry & {
          processingStart?: number;
        };
        if (fidEntry.processingStart && fidEntry.startTime) {
          this.metrics.fid = fidEntry.processingStart - fidEntry.startTime;
        }
      });
    });

    // CLS Observer (Cumulative Layout Shift)
    this.observeMetric("layout-shift", (entries) => {
      entries.forEach((entry) => {
        const clsEntry = entry as LayoutShift;
        if (!clsEntry.hadRecentInput) {
          this.clsValue += clsEntry.value;
          this.metrics.cls = this.clsValue;
        }
      });
    });
  }

  private observeMetric(
    entryType: string,
    callback: (entries: PerformanceEntry[]) => void,
  ): void {
    if (typeof window === "undefined") return;

    try {
      const observer = new PerformanceObserver((list) => {
        callback(list.getEntries());
      });

      observer.observe({
        entryTypes: [entryType],
        buffered: true,
      });

      this.observers.push(observer);
    } catch (error) {
      console.warn(`${entryType} observer not supported:`, error);
    }
  }

  private calculateTTFB(): void {
    if (typeof window === "undefined") return;

    try {
      // Try newer Navigation Timing API Level 2 first
      if (window.performance?.getEntriesByType) {
        const navEntries = window.performance.getEntriesByType(
          "navigation",
        ) as PerformanceNavigationTiming[];
        if (navEntries.length > 0 && navEntries[0]) {
          const entry = navEntries[0];
          if (entry.responseStart && entry.requestStart) {
            this.metrics.ttfb = entry.responseStart - entry.requestStart;
          }
          return;
        }
      }

      // Fallback to older timing API
      if (window.performance?.timing) {
        const timing = window.performance.timing;
        this.metrics.ttfb = timing.responseStart - timing.requestStart;
      }
    } catch (error) {
      console.warn("TTFB calculation failed:", error);
    }
  }

  getMetrics(): Partial<WebVitals> {
    return { ...this.metrics };
  }

  getSessionId(): string {
    return this.sessionId;
  }

  disconnect(): void {
    this.observers.forEach((observer) => observer.disconnect());
    this.observers = [];
  }

  getPerformanceReport(): PerformanceMetrics {
    if (typeof window === "undefined") {
      return {
        navigationTiming: null,
        resourceTimings: [],
        paintTimings: [],
        layoutShiftEntries: [],
        firstContentfulPaint: null,
        largestContentfulPaint: null,
        firstInputDelay: null,
        cumulativeLayoutShift: 0,
        timeToInteractive: null,
      };
    }

    try {
      const navTiming =
        (window.performance.getEntriesByType(
          "navigation",
        )[0] as PerformanceNavigationTiming) || null;
      const resourceTimings = window.performance.getEntriesByType(
        "resource",
      ) as PerformanceResourceTiming[];
      const paintTimings = window.performance.getEntriesByType("paint");

      return {
        navigationTiming: navTiming,
        resourceTimings,
        paintTimings,
        layoutShiftEntries: [],
        firstContentfulPaint: this.metrics.fcp || null,
        largestContentfulPaint: this.metrics.lcp || null,
        firstInputDelay: this.metrics.fid || null,
        cumulativeLayoutShift: this.metrics.cls || 0,
        timeToInteractive: null,
      };
    } catch (error) {
      console.warn("Performance report generation failed:", error);
      return {
        navigationTiming: null,
        resourceTimings: [],
        paintTimings: [],
        layoutShiftEntries: [],
        firstContentfulPaint: null,
        largestContentfulPaint: null,
        firstInputDelay: null,
        cumulativeLayoutShift: 0,
        timeToInteractive: null,
      };
    }
  }
}

// Lazy loading utility for heavy components
export function createLazyComponent<T extends React.ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  fallback?: React.ComponentType,
) {
  const LazyComponent = React.lazy(importFn);

  return function LazyWrapper(props: React.ComponentProps<T>) {
    return React.createElement(
      React.Suspense,
      { fallback: fallback ? React.createElement(fallback) : null },
      React.createElement(LazyComponent, props),
    );
  };
}

// Resource preloading utilities
export function preloadResource(href: string, as: string, type?: string): void {
  if (typeof window === "undefined") return;

  // Check if resource is already preloaded
  const existingLink = document.querySelector(
    `link[href="${href}"][rel="preload"]`,
  );
  if (existingLink) return;

  const link = document.createElement("link");
  link.rel = "preload";
  link.href = href;
  link.as = as;
  if (type) link.type = type;

  // Add error handling
  link.onerror = () => console.warn(`Failed to preload resource: ${href}`);

  document.head.appendChild(link);
}

export function preloadFont(href: string): void {
  preloadResource(href, "font", "font/woff2");
}

export function preloadImage(src: string): void {
  if (typeof window === "undefined") return;

  const link = document.createElement("link");
  link.rel = "preload";
  link.href = src;
  link.as = "image";

  document.head.appendChild(link);
}
// Critical resource hints
export function addResourceHints(): void {
  if (typeof window === "undefined") return;

  const hints = [
    { rel: "dns-prefetch", href: "//fonts.googleapis.com" },
    { rel: "dns-prefetch", href: "//fonts.gstatic.com" },
    { rel: "dns-prefetch", href: "//www.googletagmanager.com" },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous",
    },
  ];

  hints.forEach((hint) => {
    const existing = document.querySelector(
      `link[rel="${hint.rel}"][href="${hint.href}"]`,
    );
    if (existing) return;

    const link = document.createElement("link");
    link.rel = hint.rel;
    link.href = hint.href;

    if ("crossOrigin" in hint) {
      (link as HTMLLinkElement & { crossOrigin: string }).crossOrigin = (
        hint as { crossOrigin: string }
      ).crossOrigin;
    }

    document.head.appendChild(link);
  });
}

// Performance budget checker
export interface PerformanceBudget {
  maxBundleSize: number; // in KB
  maxImageSize: number; // in KB
  maxFCP: number; // in ms
  maxLCP: number; // in ms
  maxCLS: number; // unitless
  maxFID: number; // in ms
  maxTTFB: number; // in ms
}

export const DEFAULT_PERFORMANCE_BUDGET: PerformanceBudget = {
  maxBundleSize: 500, // 500KB
  maxImageSize: 300, // 300KB
  maxFCP: 1800, // 1.8s
  maxLCP: 2500, // 2.5s
  maxCLS: 0.1, // 0.1
  maxFID: 100, // 100ms
  maxTTFB: 800, // 800ms
};

export function checkPerformanceBudget(
  metrics: Partial<WebVitals>,
  budget: PerformanceBudget = DEFAULT_PERFORMANCE_BUDGET,
): { passed: boolean; violations: string[] } {
  const violations: string[] = [];

  if (metrics.fcp && metrics.fcp > budget.maxFCP) {
    violations.push(
      `FCP (${Math.round(metrics.fcp)}ms) exceeds budget (${budget.maxFCP}ms)`,
    );
  }
  if (metrics.lcp && metrics.lcp > budget.maxLCP) {
    violations.push(
      `LCP (${Math.round(metrics.lcp)}ms) exceeds budget (${budget.maxLCP}ms)`,
    );
  }
  if (metrics.cls !== undefined && metrics.cls > budget.maxCLS) {
    violations.push(
      `CLS (${metrics.cls.toFixed(3)}) exceeds budget (${budget.maxCLS})`,
    );
  }
  if (metrics.fid && metrics.fid > budget.maxFID) {
    violations.push(
      `FID (${Math.round(metrics.fid)}ms) exceeds budget (${budget.maxFID}ms)`,
    );
  }
  if (metrics.ttfb && metrics.ttfb > budget.maxTTFB) {
    violations.push(
      `TTFB (${Math.round(metrics.ttfb)}ms) exceeds budget (${budget.maxTTFB}ms)`,
    );
  }

  return { passed: violations.length === 0, violations };
}

// Bundle analyzer utility
export function logBundleInfo(): void {
  if (typeof window === "undefined" || process.env.NODE_ENV !== "development")
    return;

  // eslint-disable-next-line no-console
  console.group("🚀 Performance Info");

  const resources = performance.getEntriesByType(
    "resource",
  ) as PerformanceResourceTiming[];
  const scripts = resources.filter(
    (r) => r.name.includes(".js") && r.transferSize,
  );
  const styles = resources.filter(
    (r) => r.name.includes(".css") && r.transferSize,
  );
  const images = resources.filter(
    (r) => /\.(jpg|jpeg|png|gif|webp|avif|svg)/.test(r.name) && r.transferSize,
  );

  // eslint-disable-next-line no-console
  console.log("📦 JavaScript bundles:", scripts.length);
  scripts.forEach((script) => {
    const size = script.transferSize
      ? `${Math.round(script.transferSize / 1024)}KB`
      : "Unknown";
    const fileName = script.name.split("/").pop();
    // eslint-disable-next-line no-console
    console.log(`  - ${fileName}: ${size}`);
  });

  // eslint-disable-next-line no-console
  console.log("🎨 CSS files:", styles.length);
  styles.forEach((style) => {
    const size = style.transferSize
      ? `${Math.round(style.transferSize / 1024)}KB`
      : "Unknown";
    const fileName = style.name.split("/").pop();
    // eslint-disable-next-line no-console
    console.log(`  - ${fileName}: ${size}`);
  });

  // eslint-disable-next-line no-console
  console.log("🖼️ Images loaded:", images.length);
  const totalImageSize = images.reduce(
    (total, img) => total + (img.transferSize || 0),
    0,
  );
  // eslint-disable-next-line no-console
  console.log(`  - Total size: ${Math.round(totalImageSize / 1024)}KB`);

  // eslint-disable-next-line no-console
  console.groupEnd();
}

// Global performance monitor
let globalMonitor: PerformanceMonitor | null = null;

export function initializePerformanceMonitoring(): PerformanceMonitor | null {
  if (!globalMonitor && typeof window !== "undefined") {
    globalMonitor = new PerformanceMonitor();

    if (process.env.NODE_ENV === "development") {
      setTimeout(() => {
        logBundleInfo();
      }, 2000);
    }
  }

  return globalMonitor;
}

export function getPerformanceMonitor(): PerformanceMonitor | null {
  return globalMonitor;
}

// Performance grade calculator
export function getPerformanceGrade(
  metrics: Partial<WebVitals>,
): "A" | "B" | "C" | "D" | "F" {
  let score = 0;
  let totalMetrics = 0;

  // FCP scoring
  if (metrics.fcp !== null && metrics.fcp !== undefined) {
    totalMetrics++;
    if (metrics.fcp <= 1800) score += 4;
    else if (metrics.fcp <= 3000) score += 3;
    else if (metrics.fcp <= 4500) score += 2;
    else if (metrics.fcp <= 6000) score += 1;
  }

  // LCP scoring
  if (metrics.lcp !== null && metrics.lcp !== undefined) {
    totalMetrics++;
    if (metrics.lcp <= 2500) score += 4;
    else if (metrics.lcp <= 4000) score += 3;
    else if (metrics.lcp <= 5500) score += 2;
    else if (metrics.lcp <= 7000) score += 1;
  }

  // CLS scoring
  if (metrics.cls !== undefined) {
    totalMetrics++;
    if (metrics.cls <= 0.1) score += 4;
    else if (metrics.cls <= 0.25) score += 3;
    else if (metrics.cls <= 0.4) score += 2;
    else if (metrics.cls <= 0.6) score += 1;
  }

  if (totalMetrics === 0) return "F";

  const averageScore = score / totalMetrics;

  if (averageScore >= 3.5) return "A";
  if (averageScore >= 2.5) return "B";
  if (averageScore >= 1.5) return "C";
  if (averageScore >= 0.5) return "D";
  return "F";
}

// Cleanup function for unmounting
export function cleanupPerformanceMonitoring(): void {
  if (globalMonitor) {
    globalMonitor.disconnect();
    globalMonitor = null;
  }
}
