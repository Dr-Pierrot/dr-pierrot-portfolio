import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  label?: string;
  size?: "sm" | "md" | "lg";
  tone?: "dark" | "accent" | "light";
  className?: string;
  showLabel?: boolean;
}

const sizeClasses = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-10 w-10 border-[3px]",
};

const toneClasses = {
  dark: "border-ed-border-strong border-t-ed-ink",
  accent: "border-ed-accent-border border-t-ed-accent",
  light: "border-white/30 border-t-white",
};

export default function LoadingSpinner({
  label = "Loading...",
  size = "md",
  tone = "accent",
  className,
  showLabel = false,
}: LoadingSpinnerProps) {
  return (
    <div
      className={cn("inline-flex items-center gap-3", className)}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <span
        aria-hidden="true"
        className={cn(
          "inline-block shrink-0 rounded-full animate-spin motion-reduce:animate-none",
          sizeClasses[size],
          toneClasses[tone],
        )}
      />
      {showLabel ? (
        <span className="font-ed-heading text-sm font-medium text-ed-text-muted">
          {label}
        </span>
      ) : (
        <span className="sr-only">{label}</span>
      )}
    </div>
  );
}
