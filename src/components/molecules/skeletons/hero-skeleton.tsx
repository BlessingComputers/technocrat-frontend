export function HeroSkeleton() {
  return (
    <section className="animate-pulse bg-background">
      <div className="container mx-auto flex flex-col items-center gap-6 px-4 pt-16 pb-14 text-center lg:px-8 lg:pt-24">
        <div className="h-12 w-full max-w-3xl rounded-md bg-muted md:h-14 lg:h-16" />
        <div className="h-4 w-full max-w-2xl rounded-md bg-muted" />
        <div className="h-4 w-2/3 max-w-xl rounded-md bg-muted" />
        <div className="flex gap-4 pt-2">
          <div className="h-10 w-32 rounded-md bg-muted" />
          <div className="h-10 w-32 rounded-md bg-muted" />
        </div>
      </div>
      <div className="flex gap-4 overflow-hidden px-4 pb-16 sm:px-8">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="aspect-[5/6] w-64 shrink-0 rounded-3xl bg-muted sm:w-72"
          />
        ))}
      </div>
    </section>
  );
}
