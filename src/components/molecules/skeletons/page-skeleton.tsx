import { Container } from "@/components/templates/container";

export function PageSkeleton() {
  return (
    <div className="bg-white dark:bg-background min-h-screen">
      {/* PageHero Skeleton */}
      <div className="relative bg-secondary py-16 lg:py-24 border-b border-border animate-pulse">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <div className="h-4 w-24 bg-muted/40 mx-auto mb-4" />
          <div className="h-10 w-64 bg-muted/40 mx-auto" />
        </div>
      </div>

      <Container>
        <div className="prose prose-gray dark:prose-invert max-w-3xl mx-auto py-12 space-y-4 animate-pulse">
          <div className="h-6 w-3/4 bg-muted/20" />
          <div className="h-4 w-full bg-muted/20" />
          <div className="h-4 w-5/6 bg-muted/20" />
          <div className="h-4 w-11/12 bg-muted/20" />
          <div className="h-4 w-full bg-muted/20" />
          <div className="h-10 w-full bg-muted/20 mt-8" />
          <div className="h-4 w-3/4 bg-muted/20" />
          <div className="h-4 w-full bg-muted/20" />
        </div>
      </Container>
    </div>
  );
}
