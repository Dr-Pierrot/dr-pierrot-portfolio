"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { getTransitionClasses, MAIN_CONTENT_ID } from "@/lib/accessibility";
import { cn } from "@/lib/utils";

interface ErrorFallbackProps {
  title?: string;
  message?: string;
  error?: Error & { digest?: string };
  retry?: () => void;
  className?: string;
  showDetails?: boolean;
}

export default function ErrorFallback({
  title = "Something went wrong",
  message = "The page hit an unexpected issue. You can try again, refresh the page, or return home.",
  error,
  retry,
  className,
  showDetails = process.env.NODE_ENV === "development",
}: ErrorFallbackProps) {
  const router = useRouter();
  const errorReference = error?.digest;

  return (
    <main
      id={MAIN_CONTENT_ID}
      tabIndex={-1}
      className={cn(
        "min-h-screen bg-ed-paper px-6 py-24 text-ed-text",
        "flex items-center justify-center",
        className,
      )}
    >
      <section className="relative w-full max-w-3xl overflow-hidden rounded-[2rem] border border-ed-border bg-ed-surface p-8 shadow-sm md:p-12">
        <div
          className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-ed-accent-soft blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-ed-accent2-soft blur-3xl"
          aria-hidden="true"
        />

        <div className="relative">
          <p className="mb-4 font-ed-mono text-sm tracking-[0.02em] text-ed-text-muted">
            {"// graceful recovery"}
          </p>

          <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-ed-accent-border bg-ed-accent-soft text-ed-accent-text">
            <svg
              className="h-7 w-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"
              />
            </svg>
          </div>

          <h1 className="mb-4 font-ed-heading text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight tracking-[-0.03em] text-ed-text">
            {title}
          </h1>

          <p className="max-w-2xl text-base leading-7 text-ed-text-muted md:text-lg">
            {message}
          </p>

          {errorReference && (
            <p className="mt-4 font-ed-mono text-xs text-ed-text-muted">
              Error reference:{" "}
              <span className="text-ed-text">{errorReference}</span>
            </p>
          )}

          {showDetails && error?.message && (
            <details className="mt-6 rounded-xl border border-ed-border bg-ed-paper p-4">
              <summary className="cursor-pointer font-ed-heading text-sm font-semibold text-ed-text">
                Developer details
              </summary>
              <pre className="mt-3 max-h-56 overflow-auto whitespace-pre-wrap break-words font-ed-mono text-xs leading-5 text-ed-text-muted">
                {error.stack || error.message}
              </pre>
            </details>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {retry && (
              <button
                type="button"
                onClick={retry}
                className={cn(
                  "inline-flex items-center justify-center rounded-lg bg-ed-gradient-button px-5 py-3 font-ed-heading text-sm font-semibold text-white shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ed-accent",
                  getTransitionClasses(
                    "transition-all hover:-translate-y-0.5 hover:shadow-md motion-reduce:hover:translate-y-0",
                  ),
                )}
              >
                Try again
              </button>
            )}

            <button
              type="button"
              onClick={() => router.refresh()}
              className={cn(
                "inline-flex items-center justify-center rounded-lg border border-ed-border bg-ed-paper px-5 py-3 font-ed-heading text-sm font-semibold text-ed-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ed-accent",
                getTransitionClasses(
                  "transition-all hover:-translate-y-0.5 hover:shadow-md motion-reduce:hover:translate-y-0",
                ),
              )}
            >
              Refresh page
            </button>

            <Link
              href="/"
              className={cn(
                "inline-flex items-center justify-center rounded-lg border border-ed-border bg-ed-surface px-5 py-3 font-ed-heading text-sm font-semibold text-ed-text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ed-accent",
                getTransitionClasses("transition-colors hover:text-ed-accent"),
              )}
            >
              Back to home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
