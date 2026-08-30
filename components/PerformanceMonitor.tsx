"use client";

import { useEffect, useState } from "react";
import {
  initializePerformanceMonitoring,
  checkPerformanceBudget,
  getPerformanceGrade,
  logBundleInfo,
  type WebVitals,
} from "@/lib/performance";

interface PerformanceMetrics {
  vitals: Partial<WebVitals>;
  grade: "A" | "B" | "C" | "D" | "F";
  violations: string[];
  passed: boolean;
}

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Initialize performance monitoring
    const monitor = initializePerformanceMonitoring();

    if (!monitor) return;

    // Update metrics every 5 seconds
    const updateMetrics = () => {
      const vitals = monitor.getMetrics();
      const budgetCheck = checkPerformanceBudget(vitals);
      const grade = getPerformanceGrade(vitals);

      setMetrics({
        vitals,
        grade,
        violations: budgetCheck.violations,
        passed: budgetCheck.passed,
      });
    };

    // Initial update
    updateMetrics();

    // Set up periodic updates
    const interval = setInterval(updateMetrics, 5000);

    // Log bundle info in development
    if (process.env.NODE_ENV === "development") {
      setTimeout(() => {
        logBundleInfo();
      }, 2000);
    }

    // Keyboard shortcut to toggle visibility (Ctrl/Cmd + Shift + P)
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "P") {
        e.preventDefault();
        setIsVisible((prev) => !prev);
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      clearInterval(interval);
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  if (!metrics || !isVisible || process.env.NODE_ENV !== "development") {
    return null;
  }

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A":
        return "text-green-600 bg-green-50";
      case "B":
        return "text-blue-600 bg-blue-50";
      case "C":
        return "text-yellow-600 bg-yellow-50";
      case "D":
        return "text-orange-600 bg-orange-50";
      case "F":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const formatMetric = (
    value: number | null | undefined,
    unit: string = "ms",
  ) => {
    if (value === null || value === undefined) return "N/A";
    return `${Math.round(value)}${unit}`;
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm z-50">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-sm">Performance Monitor</h3>
        <div
          className={`px-2 py-1 rounded text-xs font-medium ${getGradeColor(metrics.grade)}`}
        >
          Grade: {metrics.grade}
        </div>
      </div>

      <div className="space-y-2 text-xs">
        {/* Core Web Vitals */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="text-gray-600">FCP:</span>
            <span className="ml-1 font-mono">
              {formatMetric(metrics.vitals.fcp)}
            </span>
          </div>
          <div>
            <span className="text-gray-600">LCP:</span>
            <span className="ml-1 font-mono">
              {formatMetric(metrics.vitals.lcp)}
            </span>
          </div>
          <div>
            <span className="text-gray-600">FID:</span>
            <span className="ml-1 font-mono">
              {formatMetric(metrics.vitals.fid)}
            </span>
          </div>
          <div>
            <span className="text-gray-600">CLS:</span>
            <span className="ml-1 font-mono">
              {formatMetric(metrics.vitals.cls, "")}
            </span>
          </div>
          <div>
            <span className="text-gray-600">TTFB:</span>
            <span className="ml-1 font-mono">
              {formatMetric(metrics.vitals.ttfb)}
            </span>
          </div>
          <div>
            <span className="text-gray-600">INP:</span>
            <span className="ml-1 font-mono">
              {formatMetric(metrics.vitals.inp)}
            </span>
          </div>
        </div>

        {/* Budget Status */}
        <div className="pt-2 border-t">
          <div
            className={`text-xs font-medium ${metrics.passed ? "text-green-600" : "text-red-600"}`}
          >
            Budget: {metrics.passed ? "PASSED" : "FAILED"}
          </div>
          {metrics.violations.length > 0 && (
            <div className="mt-1 space-y-1">
              {metrics.violations.slice(0, 2).map((violation, index) => (
                <div key={index} className="text-xs text-red-600 truncate">
                  {violation}
                </div>
              ))}
              {metrics.violations.length > 2 && (
                <div className="text-xs text-gray-500">
                  +{metrics.violations.length - 2} more...
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mt-3 pt-2 border-t text-xs text-gray-500">
        Press Ctrl+Shift+P to toggle
      </div>
    </div>
  );
}
