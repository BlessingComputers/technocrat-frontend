export function CategoryBarSkeleton() {
  return (
    <div className="bg-card border-y border-border animate-pulse">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex overflow-x-auto scrollbar-hide py-3 gap-0">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="shrink-0 w-32 h-6 bg-muted/20 border-r border-border"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
