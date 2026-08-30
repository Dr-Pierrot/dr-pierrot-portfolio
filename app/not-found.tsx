import ErrorFallback from "@/components/ErrorFallback";

export default function NotFound() {
  return (
    <ErrorFallback
      title="Page not found"
      message="The page you're looking for doesn't exist, may have moved, or is no longer available."
      showDetails={false}
    />
  );
}
