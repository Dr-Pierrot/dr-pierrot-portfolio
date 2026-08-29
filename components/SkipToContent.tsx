import { MAIN_CONTENT_ID, FOCUS_VISIBLE_CLASSES } from "@/lib/accessibility";
import { cn } from "@/lib/utils";

interface SkipToContentProps {
  targetId?: string;
  label?: string;
  className?: string;
}

export default function SkipToContent({
  targetId = MAIN_CONTENT_ID,
  label = "Skip to main content",
  className,
}: SkipToContentProps) {
  return (
    <a
      href={`#${targetId}`}
      className={cn(
        "sr-only fixed left-4 top-4 z-[9999] rounded-lg border border-ed-border bg-ed-ink px-4 py-3 font-ed-heading text-sm font-semibold text-white shadow-lg",
        "focus:not-sr-only focus:fixed focus:outline-none",
        FOCUS_VISIBLE_CLASSES,
        className,
      )}
    >
      {label}
    </a>
  );
}
