export function ShopByCategoriesSkeleton() {
  return (
    <section className="animate-pulse bg-white dark:bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="mb-10 flex flex-col items-start gap-3">
          <div className="h-6 w-32 rounded-full bg-muted" />
          <div className="h-8 w-56 rounded-md bg-muted lg:h-11 lg:w-80" />
        </div>

        <div className="relative">
          <div className="absolute top-1/2 -left-3 size-9 -translate-y-1/2 rounded-full bg-muted sm:-left-4 lg:size-11" />
          <div className="flex gap-4 overflow-hidden lg:gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex w-[260px] shrink-0 flex-col gap-4 sm:w-[300px]"
              >
                <div className="aspect-square w-full rounded-xl bg-muted" />
                <div className="h-6 w-2/3 rounded-md bg-muted" />
              </div>
            ))}
          </div>
          <div className="absolute top-1/2 -right-3 size-9 -translate-y-1/2 rounded-full bg-muted sm:-right-4 lg:size-11" />
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="size-2.5 rounded-full bg-muted" />
          ))}
        </div>
      </div>
    </section>
  );
}
