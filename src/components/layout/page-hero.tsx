interface PageHeroProps {
  title: string;
  subtitle?: string;
  tag?: string;
}

export function PageHero({ title, subtitle, tag }: PageHeroProps) {
  return (
    <section className="relative bg-muted/30 py-16 sm:py-20 px-4 md:px-8 lg:px-16 text-center overflow-hidden border-b border-border">
      <div
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 10% 20%, oklch(0.596 0.233 27.2 / 0.1) 0%, transparent 20%), radial-gradient(circle at 90% 80%, oklch(0.596 0.233 27.2 / 0.1) 0%, transparent 20%)",
        }}
      />
      <div className="max-w-3xl mx-auto relative z-10">
        {tag && (
          <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-4">
            {tag}
          </p>
        )}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
