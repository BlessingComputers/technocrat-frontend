import Link from "next/link";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { catalogService } from "@/features/catalog/api/catalog.service";
import { HeroCategoryCard } from "./hero-category-card";
import { HeroCarouselCurve } from "./hero-carousel-curve";

export async function Hero() {
  const categories = await catalogService.getFeaturedCategoryCards();

  return (
    <section className="relative overflow-hidden bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-10 top-24 size-72 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-32 size-[34rem] rounded-full bg-primary/10 blur-3xl"
      />

      <div className="container relative mx-auto flex flex-col items-center gap-6 px-4 pt-16 pb-14 text-center lg:px-8 lg:pt-24">
        <h1 className="max-w-4xl text-4xl leading-[1.05] font-bold tracking-tight text-balance text-foreground/80 md:text-5xl lg:text-6xl xl:text-7xl">
          Everything You <span className="text-primary">Need</span>, All in{" "}
          <span className="text-primary">One Place</span>
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-pretty text-paragraph">
          From premium smartphones and computers to home appliances and
          enterprise technology procurement and motorcycle purchase,
          Technocrat Stores makes quality products more accessible for
          individuals and organizations across Nigeria.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/product">
              Shop Now
              <Icon icon="solar:arrow-right-linear" className="size-5" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/contact">
              <Icon icon="solar:buildings-2-linear" className="size-5" />
              Get Quote
            </Link>
          </Button>
        </div>
      </div>

      {categories.length > 0 && (
        <div className="pb-16">
          <div className="relative overflow-hidden">
            <div className="flex justify-center gap-4 overflow-x-auto scroll-px-4 snap-x snap-mandatory scrollbar-hide px-4 sm:px-8">
              {categories.map((category) => (
                <HeroCategoryCard key={category.slug} {...category} />
              ))}
            </div>
            <HeroCarouselCurve />
          </div>
        </div>
      )}
    </section>
  );
}
