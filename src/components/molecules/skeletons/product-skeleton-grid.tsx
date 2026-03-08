import { Container } from "@/components/templates/container";

export function ProductSkeletonGrid() {
  return (
    <Container>
      {/* Title Skeleton */}
      <div className="mb-6">
        <div className="w-16 h-3 bg-muted animate-pulse mb-2" />
        <div className="w-48 h-7 bg-muted animate-pulse" />
      </div>

      {/* Filter Toolbar Skeleton */}
      <div className="border border-border mb-8 animate-pulse">
        <div className="flex gap-0 border-b border-border">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="shrink-0 w-24 h-9 bg-muted/20 border-r border-border"
            />
          ))}
        </div>
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="w-16 h-5 bg-muted/20" />
            ))}
          </div>
          <div className="w-16 h-6 bg-muted/20" />
        </div>
      </div>

      {/* Results Count Skeleton */}
      <div className="w-48 h-3 mb-5 bg-muted/20 animate-pulse" />

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="bg-card border border-border flex flex-col animate-pulse"
          >
            <div className="aspect-square w-full bg-muted/10" />
            <div className="p-3 border-t border-border space-y-2">
              <div className="w-16 h-2 bg-muted/20" />
              <div className="w-full h-3 bg-muted/20" />
              <div className="w-5/6 h-2 bg-muted/10" />
              <div className="w-4/5 h-2 bg-muted/10" />
              <div className="flex items-center justify-between mt-3">
                <div className="w-20 h-3 bg-muted/20" />
                <div className="w-10 h-2 bg-muted/10" />
              </div>
              <div className="w-full h-8 bg-muted/20 mt-2" />
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
