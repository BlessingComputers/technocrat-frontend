import { Container } from "@/components/templates/container";

interface GridSkeletonProps {
  count?: number;
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
}

export function GridSkeleton({
  count = 4,
  columns = { mobile: 2, tablet: 2, desktop: 4 },
}: GridSkeletonProps) {
  const gridCols = `grid-cols-${columns.mobile} sm:grid-cols-${columns.tablet} lg:grid-cols-${columns.desktop}`;

  return (
    <Container outerStyle="py-10 animate-pulse">
      <div className="mb-8">
        <div className="h-3 w-24 bg-muted/30 mb-2" />
        <div className="h-8 w-48 bg-muted/40 mb-3" />
        <div className="h-4 w-full max-w-lg bg-muted/20" />
      </div>

      <div className={`grid ${gridCols} gap-4 mt-8`}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="bg-card border border-border overflow-hidden">
            <div className="aspect-square bg-muted/10 w-full" />
            <div className="p-4 space-y-3">
              <div className="h-3 w-16 bg-muted/20" />
              <div className="h-5 w-full bg-muted/30" />
              <div className="space-y-1">
                <div className="h-3 w-full bg-muted/10" />
                <div className="h-3 w-4/5 bg-muted/10" />
              </div>
              <div className="h-8 w-full bg-muted/20 mt-2" />
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
