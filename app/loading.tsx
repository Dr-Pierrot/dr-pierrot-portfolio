import LoadingSpinner from "@/components/LoadingSpinner";

export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-ed-paper px-6 py-24">
      <div className="rounded-2xl border border-ed-border bg-ed-surface px-8 py-7 text-center shadow-sm">
        <LoadingSpinner
          label="Loading portfolio..."
          size="lg"
          showLabel
          className="justify-center"
        />
      </div>
    </main>
  );
}
