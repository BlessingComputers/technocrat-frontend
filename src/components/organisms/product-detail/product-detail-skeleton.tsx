export function ProductDetailSkeleton() {
  return (
    <div className="bg-white dark:bg-background animate-pulse">
      <div className="py-8">
        {/* Breadcrumb Skeleton */}
        <div className="mb-8 flex items-center gap-2">
          <div className="h-3 w-12 rounded bg-gray-200 dark:bg-muted" />
          <span className="text-gray-300">/</span>
          <div className="h-3 w-20 rounded bg-gray-200 dark:bg-muted" />
          <span className="text-gray-300">/</span>
          <div className="h-3 w-40 rounded bg-gray-200 dark:bg-muted" />
        </div>

        {/* Gallery + Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-24">
          {/* Gallery Skeleton */}
          <div className="flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-3">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-gray-100 dark:bg-muted/30"
                />
              ))}
            </div>
            {/* Main Image */}
            <div className="grow aspect-square bg-gray-100 dark:bg-muted/10 rounded-2xl" />
          </div>

          {/* Info Skeleton */}
          <div className="flex flex-col gap-8">
            {/* Category + Stock Badge */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-3 w-28 rounded bg-gray-200 dark:bg-muted" />
                <div className="h-5 w-16 rounded-full bg-gray-200 dark:bg-muted" />
              </div>
              {/* Product Name */}
              <div className="h-10 w-3/4 rounded bg-gray-200 dark:bg-muted" />
              <div className="h-10 w-1/2 rounded bg-gray-200 dark:bg-muted" />
              {/* Rating */}
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-4 h-4 rounded bg-gray-200 dark:bg-muted"
                  />
                ))}
                <div className="ml-2 h-4 w-12 rounded bg-gray-200 dark:bg-muted" />
              </div>
              {/* Description */}
              <div className="space-y-2">
                <div className="h-4 w-full rounded bg-gray-200 dark:bg-muted" />
                <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-muted" />
                <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-muted" />
              </div>
            </div>

            {/* Pricing Card */}
            <div className="bg-gray-50 dark:bg-card border border-gray-100 dark:border-white/10 p-6 md:p-8 rounded-3xl space-y-3">
              <div className="h-12 w-48 rounded bg-gray-200 dark:bg-muted" />
              <div className="h-3 w-36 rounded bg-gray-200 dark:bg-muted" />
            </div>

            {/* Color + Storage Options */}
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="h-3 w-12 rounded bg-gray-200 dark:bg-muted" />
                <div className="flex gap-3">
                  {[...Array(2)].map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gray-200 dark:bg-muted"
                    />
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-3 w-16 rounded bg-gray-200 dark:bg-muted" />
                <div className="flex gap-3">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="h-11 w-24 rounded-xl bg-gray-200 dark:bg-muted"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 pt-4">
              <div className="h-12 w-32 rounded-2xl bg-gray-200 dark:bg-muted" />
              <div className="h-14 grow rounded-2xl bg-gray-200 dark:bg-muted" />
              <div className="h-14 w-14 rounded-2xl bg-gray-200 dark:bg-muted" />
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-gray-100 dark:border-white/10">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-muted" />
                  <div className="h-2 w-16 rounded bg-gray-200 dark:bg-muted" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs Skeleton */}
        <div className="mb-32 space-y-8">
          <div className="flex gap-6 border-b border-gray-100 dark:border-white/10 pb-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-4 w-28 rounded bg-gray-200 dark:bg-muted"
              />
            ))}
          </div>
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-12 w-full rounded-xl bg-gray-100 dark:bg-muted/10"
              />
            ))}
          </div>
        </div>

        {/* Related Products Skeleton */}
        <div className="border-t border-gray-100 dark:border-white/10 pt-24 pb-12">
          <div className="mb-16">
            <div className="h-3 w-32 rounded bg-gray-200 dark:bg-muted mb-4" />
            <div className="h-10 w-72 rounded bg-gray-200 dark:bg-muted" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="rounded-xl border border-gray-100 dark:border-white/10 p-5"
              >
                <div className="aspect-square w-full mb-4 bg-gray-100 dark:bg-muted/30 rounded-lg" />
                <div className="h-3 w-20 rounded bg-gray-200 dark:bg-muted mb-2" />
                <div className="h-4 w-full rounded bg-gray-200 dark:bg-muted mb-3" />
                <div className="h-3 w-5/6 rounded bg-gray-200 dark:bg-muted mb-4" />
                <div className="h-6 w-24 rounded bg-gray-200 dark:bg-muted" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
