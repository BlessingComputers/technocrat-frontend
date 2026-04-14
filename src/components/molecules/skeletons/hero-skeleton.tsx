export function HeroSkeleton() {
  return (
    <section className="container mx-auto px-4 lg:px-8 py-6 animate-pulse">
      <div className="grid grid-cols-12 auto-rows-[180px] lg:auto-rows-[200px] gap-1">
        {/* Cell A Skeleton */}
        <div className="col-span-12 lg:col-span-8 row-span-2 relative bg-card border border-border overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 h-full">
            <div className="flex flex-col justify-center p-6 lg:p-10 space-y-4">
              <div className="h-3 w-20 bg-muted/30" />
              <div className="h-8 w-3/4 bg-muted/40" />
              <div className="h-4 w-full bg-muted/20" />
              <div className="h-4 w-2/3 bg-muted/20" />
              <div className="flex gap-3 pt-4">
                <div className="h-10 w-32 bg-muted/40" />
                <div className="h-10 w-28 bg-muted/30" />
              </div>
            </div>
            <div className="bg-muted/10 hidden md:block" />
          </div>
        </div>

        {/* Cell B Skeleton */}
        <div className="col-span-6 lg:col-span-4 row-span-1 bg-muted/20 border border-border" />

        {/* Cell C Skeleton */}
        <div className="col-span-6 lg:col-span-4 row-span-1 bg-muted/40 border border-border" />

        {/* Cell D Skeleton */}
        <div className="col-span-6 lg:col-span-4 row-span-1 bg-card border border-border p-5 flex flex-wrap gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-6 w-16 bg-muted/20" />
          ))}
        </div>

        {/* Cell E Skeleton */}
        <div className="col-span-6 lg:col-span-4 row-span-1 bg-muted/10 border border-border" />

        {/* Cell F Skeleton */}
        <div className="col-span-12 lg:col-span-4 row-span-1 bg-secondary border border-border flex items-center justify-around">
          <div className="h-10 w-20 bg-muted/30" />
          <div className="h-10 w-20 bg-muted/30" />
          <div className="h-10 w-20 bg-muted/30" />
        </div>
      </div>
    </section>
  );
}
