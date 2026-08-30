/**
 * Simple Resume Link Component
 *
 * Lightweight component for adding resume download links
 * throughout the application.
 */

"use client";

import { trackResumeDownload } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { FOCUS_VISIBLE_CLASSES } from "@/lib/accessibility";

interface ResumeLinkProps {
  format?: "json" | "pdf";
  children?: React.ReactNode;
  className?: string;
  showIcon?: boolean;
}

export default function ResumeLink({
  format = "pdf",
  children,
  className = "",
  showIcon = true,
}: ResumeLinkProps) {
  const handleClick = () => {
    trackResumeDownload(format);
    window.open(`/api/resume?format=${format}&download=true`, "_blank");
  };

  const defaultText = format === "json" ? "Resume (JSON)" : "Resume (PDF)";
  const icon = showIcon ? (format === "json" ? "📄" : "📋") : "";

  return (
    <button
      onClick={handleClick}
      type="button"
      className={cn(
        "inline-flex items-center gap-2 text-ed-accent-text hover:text-ed-accent underline decoration-dotted underline-offset-2 transition-colors focus:outline-none",
        FOCUS_VISIBLE_CLASSES,
        className,
      )}
    >
      {icon && <span>{icon}</span>}
      {children || defaultText}
    </button>
  );
}
