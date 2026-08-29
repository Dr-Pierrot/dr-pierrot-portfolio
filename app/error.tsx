"use client";

import { useEffect } from "react";
import ErrorFallback from "@/components/ErrorFallback";
import { trackAppError } from "@/lib/analytics";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    trackAppError(error, "app/error.tsx");
  }, [error]);

  return <ErrorFallback error={error} retry={unstable_retry} />;
}
