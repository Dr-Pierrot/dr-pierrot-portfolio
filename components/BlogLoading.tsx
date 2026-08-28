export function BlogListingLoading() {
  return (
    <div className="min-h-screen bg-ed-background">
      <main className="container mx-auto px-6 pt-32 pb-20">
        <div className="mb-16 text-center">
          <div className="mb-4 h-4 w-32 bg-ed-surface rounded mx-auto animate-pulse" />
          <div className="mb-6 h-16 w-80 bg-ed-surface rounded mx-auto animate-pulse" />
          <div className="mx-auto max-w-2xl space-y-2">
            <div className="h-4 bg-ed-surface rounded animate-pulse" />
            <div className="h-4 bg-ed-surface rounded w-3/4 mx-auto animate-pulse" />
          </div>
        </div>

        <section className="mb-16">
          <div className="h-8 w-48 bg-ed-surface rounded mb-8 animate-pulse" />
          <div className="grid gap-8 md:grid-cols-2">
            {[1, 2].map((i) => (
              <div key={i} className="rounded-2xl bg-ed-surface border border-ed-border p-6 animate-pulse">
                <div className="h-6 w-20 bg-ed-background rounded-full mb-3" />
                <div className="h-6 bg-ed-background rounded mb-3" />
                <div className="space-y-2 mb-4">
                  <div className="h-4 bg-ed-background rounded" />
                  <div className="h-4 bg-ed-background rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="h-8 w-32 bg-ed-surface rounded mb-8 animate-pulse" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded-xl bg-ed-paper border border-ed-border p-5 animate-pulse">
                <div className="h-5 bg-ed-surface rounded mb-2" />
                <div className="space-y-2 mb-4">
                  <div className="h-4 bg-ed-surface rounded" />
                  <div className="h-4 bg-ed-surface rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export function BlogPostLoading() {
  return (
    <div className="min-h-screen bg-ed-background">
      <main className="container mx-auto px-6 pt-32 pb-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_300px]">
          <div className="max-w-4xl">
            <div className="space-y-3 mb-4">
              <div className="h-10 bg-ed-surface rounded animate-pulse" />
              <div className="h-10 bg-ed-surface rounded w-3/4 animate-pulse" />
            </div>
            <div className="space-y-2 mb-6">
              <div className="h-6 bg-ed-surface rounded animate-pulse" />
              <div className="h-6 bg-ed-surface rounded w-4/5 animate-pulse" />
            </div>
            <hr className="border-ed-border mb-8" />
            <div className="space-y-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 bg-ed-surface rounded animate-pulse" />
                  <div className="h-4 bg-ed-surface rounded animate-pulse" />
                  <div className="h-4 bg-ed-surface rounded w-2/3 animate-pulse" />
                </div>
              ))}
            </div>
          </div>
          <aside className="lg:sticky lg:top-32 lg:h-fit">
            <div className="rounded-xl bg-ed-surface border border-ed-border p-6 animate-pulse">
              <div className="h-4 w-24 bg-ed-background rounded mb-4" />
              <div className="space-y-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-4 bg-ed-background rounded" />
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}