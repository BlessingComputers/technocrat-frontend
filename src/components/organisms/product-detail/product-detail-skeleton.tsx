export function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-background animate-pulse">
      {/* Breadcrumb Bar */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 lg:px-8 py-3">
          <div className="flex items-center gap-2">
            <div className="h-3 w-10 bg-muted" />
            <span className="text-muted-foreground">/</span>
            <div className="h-3 w-16 bg-muted" />
            <span className="text-muted-foreground">/</span>
            <div className="h-3 w-32 bg-muted" />
          </div>
        </div>
      </div>

      {/* Gallery + Info */}
      <section className="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Gallery Skeleton */}
          <div className="lg:col-span-7 space-y-3">
            <div className="aspect-4/3 lg:aspect-16/10 bg-muted/10 border border-border" />
            <div className="flex gap-1.5">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-16 h-16 sm:w-20 sm:h-20 bg-muted/10 border border-border shrink-0"
                />
              ))}
            </div>
          </div>

          {/* Info Skeleton */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex gap-3">
              <div className="h-5 w-20 bg-muted" />
              <div className="h-5 w-16 bg-muted" />
            </div>
            <div className="h-9 w-4/5 bg-muted" />
            <div className="h-9 w-3/5 bg-muted" />
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-3.5 h-3.5 bg-muted" />
              ))}
              <div className="h-3 w-16 bg-muted ml-2" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-full bg-muted/50" />
              <div className="h-3 w-5/6 bg-muted/50" />
              <div className="h-3 w-2/3 bg-muted/50" />
            </div>
            <div className="border border-border p-5 bg-muted/5">
              <div className="h-10 w-40 bg-muted" />
              <div className="h-3 w-48 bg-muted/50 mt-2" />
            </div>
            <div className="flex gap-3">
              <div className="h-12 grow bg-muted" />
              <div className="h-12 w-28 bg-muted/50 border border-border" />
            </div>
            <div className="grid grid-cols-4 gap-3 pt-5 border-t border-border">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-muted" />
                  <div className="h-2 w-14 bg-muted/50" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Specs + Description Skeleton */}
      <section className="container mx-auto px-4 lg:px-8 pb-12 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-border">
          <div className="border-b lg:border-b-0 lg:border-r border-border">
            <div className="px-5 py-4 border-b border-border bg-muted/5">
              <div className="h-3 w-40 bg-muted" />
            </div>
            <div className="divide-y divide-border">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="grid grid-cols-[180px_1fr]">
                  <div className="px-5 py-3 border-r border-border">
                    <div className="h-3 w-20 bg-muted" />
                  </div>
                  <div className="px-5 py-3">
                    <div className="h-3 w-full bg-muted/40" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="px-5 py-4 border-b border-border bg-muted/5">
              <div className="h-3 w-36 bg-muted" />
            </div>
            <div className="p-5 space-y-3">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="h-3 bg-muted/30"
                  style={{ width: `${85 - i * 5}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Products Skeleton */}
      <section className="border-t border-border">
        <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
          <div className="mb-8 pb-4 border-b border-border">
            <div className="h-3 w-20 bg-muted mb-3" />
            <div className="h-6 w-48 bg-muted" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="border border-border">
                <div className="aspect-square bg-muted/10" />
                <div className="p-3 space-y-2 border-t border-border">
                  <div className="h-2 w-16 bg-muted/40" />
                  <div className="h-3 w-full bg-muted/40" />
                  <div className="h-8 w-full bg-muted/20 mt-3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
