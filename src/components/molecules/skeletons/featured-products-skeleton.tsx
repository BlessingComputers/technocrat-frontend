export function FeaturedProductsSkeleton() {
  return (
    <section className="animate-pulse bg-[#fafafa] dark:bg-background">
      <div className="container mx-auto px-4 py-16 lg:px-8 lg:py-20">
        <div className="mb-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col items-start gap-2">
            <div className="h-7 w-40 rounded-full bg-muted" />
            <div className="h-8 w-56 rounded-md bg-muted lg:h-14 lg:w-80" />
          </div>
          <div className="h-12 w-32 rounded-lg bg-muted lg:w-56" />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className={`flex flex-col overflow-hidden rounded-xl bg-white dark:bg-card ${
                i >= 4 ? "max-sm:hidden" : ""
              }`}
            >
              <div className="h-[260px] bg-muted" />
              <div className="flex flex-col gap-3 px-4 pt-4 pb-4">
                <div className="h-3 w-16 rounded bg-muted" />
                <div className="h-4 w-full rounded bg-muted" />
                <div className="h-4 w-4/5 rounded bg-muted" />
                <div className="flex gap-1.5">
                  <div className="h-5 w-14 rounded bg-muted" />
                  <div className="h-5 w-16 rounded bg-muted" />
                  <div className="h-5 w-12 rounded bg-muted" />
                </div>
                <div className="mt-2 h-5 w-28 rounded bg-muted" />
                <div className="mt-2 flex gap-4">
                  <div className="h-12 w-20 rounded-lg bg-muted" />
                  <div className="h-12 flex-1 rounded-lg bg-muted" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
