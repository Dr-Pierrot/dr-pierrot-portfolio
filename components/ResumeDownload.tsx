"use client";

/**
 * Resume Download Component
 *
 * Provides download links for resume in various formats with
 * analytics tracking and user feedback.
 */

import { useState } from "react";
import { trackResumeDownload } from "@/lib/analytics";
import { getResumeStats } from "@/lib/resume";

interface ResumeDownloadProps {
  variant?: "button" | "link" | "inline";
  showStats?: boolean;
  className?: string;
}

export default function ResumeDownload({
  variant = "button",
  showStats = false,
  className = "",
}: ResumeDownloadProps) {
  const [downloading, setDownloading] = useState<string | null>(null);

  const handleDownload = async (format: "json" | "pdf") => {
    try {
      setDownloading(format);

      // Track download event
      trackResumeDownload(format);

      // Fetch resume with download headers
      const response = await fetch(
        `/api/resume?format=${format}&download=true`,
      );

      if (!response.ok) {
        throw new Error(`Failed to download resume: ${response.statusText}`);
      }

      // Get the blob and create download link
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      // Set filename based on format
      const filename =
        format === "json"
          ? "jaycee-capulong-resume.json"
          : "jaycee-capulong-resume.txt";
      link.download = filename;

      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      // Could add toast notification here
    } finally {
      setDownloading(null);
    }
  };

  if (variant === "inline") {
    return (
      <span className={`inline-flex items-center gap-2 ${className}`}>
        <button
          onClick={() => handleDownload("json")}
          disabled={downloading === "json"}
          className="text-ed-accent-text hover:text-ed-accent underline decoration-dotted underline-offset-2 transition-colors"
        >
          {downloading === "json" ? "Downloading..." : "JSON"}
        </button>
        <span className="text-ed-text-muted">•</span>
        <button
          onClick={() => handleDownload("pdf")}
          disabled={downloading === "pdf"}
          className="text-ed-accent-text hover:text-ed-accent underline decoration-dotted underline-offset-2 transition-colors"
        >
          {downloading === "pdf" ? "Downloading..." : "PDF"}
        </button>
      </span>
    );
  }

  if (variant === "link") {
    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        <button
          onClick={() => handleDownload("json")}
          disabled={downloading === "json"}
          className="text-left text-ed-accent-text hover:text-ed-accent underline decoration-dotted underline-offset-2 transition-colors disabled:opacity-50"
        >
          {downloading === "json"
            ? "Downloading JSON..."
            : "Download Resume (JSON)"}
        </button>
        <button
          onClick={() => handleDownload("pdf")}
          disabled={downloading === "pdf"}
          className="text-left text-ed-accent-text hover:text-ed-accent underline decoration-dotted underline-offset-2 transition-colors disabled:opacity-50"
        >
          {downloading === "pdf"
            ? "Downloading PDF..."
            : "Download Resume (PDF)"}
        </button>

        {showStats && <ResumeStats />}
      </div>
    );
  }

  // Default button variant
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <div className="flex gap-3">
        <button
          onClick={() => handleDownload("json")}
          disabled={downloading === "json"}
          className="flex-1 rounded-lg bg-ed-gradient-button px-4 py-2.5 font-ed-heading text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md disabled:opacity-50 disabled:hover:translate-y-0"
        >
          {downloading === "json" ? "Downloading..." : "Download JSON"}
        </button>

        <button
          onClick={() => handleDownload("pdf")}
          disabled={downloading === "pdf"}
          className="flex-1 rounded-lg border border-ed-border bg-ed-paper px-4 py-2.5 font-ed-heading text-sm font-semibold text-ed-text transition-all hover:-translate-y-0.5 hover:shadow-md disabled:opacity-50 disabled:hover:translate-y-0"
        >
          {downloading === "pdf" ? "Downloading..." : "Download PDF"}
        </button>
      </div>

      {showStats && <ResumeStats />}
    </div>
  );
}

/**
 * Resume Statistics Component
 */
function ResumeStats() {
  const stats = getResumeStats();

  return (
    <div className="text-xs text-ed-text-muted">
      <p>
        {stats.totalExperience}+ years experience • {stats.projectCount}{" "}
        projects • {stats.skillCount} skills
      </p>
      <p>Last updated: {new Date(stats.lastUpdated).toLocaleDateString()}</p>
    </div>
  );
}
