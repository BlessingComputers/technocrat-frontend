import { Container } from "@/components/templates/container";

export function LatestPostsSkeleton() {
  return (
    <Container outerStyle="py-10 animate-pulse">
      <div className="mb-8">
        <div className="h-3 w-24 bg-muted/30 mb-2" />
        <div className="h-8 w-48 bg-muted/40 mb-3" />
        <div className="h-4 w-full max-w-md bg-muted/20" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-card border border-border overflow-hidden">
            <div className="aspect-video bg-muted/10" />
            <div className="p-4 space-y-3">
              <div className="h-3 w-20 bg-muted/30" />
              <div className="h-6 w-full bg-muted/40" />
              <div className="h-4 w-full bg-muted/20" />
              <div className="h-4 w-2/3 bg-muted/20" />
              <div className="pt-2 flex justify-between">
                <div className="h-3 w-24 bg-muted/20" />
                <div className="h-3 w-16 bg-muted/20" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
