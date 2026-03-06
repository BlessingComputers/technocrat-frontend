import { Container } from "@/components/templates/container";

export function ProductSkeletonGrid() {
  return (
    <Container>
      {/* Search/Category Header Skeleton */}
      <div className="w-56 h-10 mb-6 rounded-full bg-gray-200 dark:bg-muted/30 animate-pulse"></div>

      {/* Category Pills Skeleton */}
      <div className="flex gap-3 overflow-hidden items-center mb-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="shrink-0 w-32 h-9 bg-gray-200 dark:bg-muted/20 rounded-full animate-pulse"
          ></div>
        ))}
      </div>

      {/* Results Count Skeleton */}
      <div className="w-40 h-4 mb-8 bg-gray-200 dark:bg-muted/20 rounded-full animate-pulse"></div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 mb-16 w-full">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="group bg-white dark:bg-card rounded-xl border border-gray-100 dark:border-white/10 p-3 sm:p-5 flex flex-col h-full animate-pulse"
          >
            {/* Image area */}
            <div className="aspect-square w-full mb-3 sm:mb-4 bg-gray-100 dark:bg-muted/30 rounded-lg" />

            {/* Content Area */}
            <div className="flex flex-col grow">
              {/* Brand Skeleton (Optional but common) */}
              <div className="w-16 h-2 bg-gray-200 dark:bg-muted/20 rounded-full mb-2" />

              {/* Title Skeleton */}
              <div className="w-full h-4 bg-gray-200 dark:bg-muted/30 rounded-md mb-3" />

              {/* Description Skeletons */}
              <div className="space-y-2 mb-4">
                <div className="w-full h-3 bg-gray-100 dark:bg-muted/10 rounded-md" />
                <div className="w-4/5 h-3 bg-gray-100 dark:bg-muted/10 rounded-md" />
              </div>

              {/* Price Row Skeleton */}
              <div className="mt-auto pt-2 flex items-center justify-between mb-4">
                <div className="w-24 h-4 bg-gray-200 dark:bg-muted/30 rounded-md" />
                <div className="w-10 h-3 bg-gray-200 dark:bg-muted/20 rounded-md" />
              </div>

              {/* Buy Button Skeleton */}
              <div className="w-full h-8 sm:h-10 bg-gray-200 dark:bg-muted/30 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
