"use client";

import { useCallback, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import type { FeaturedCategoryCard } from "@/features/catalog/api/catalog.service";
import { ShopCategoryCard } from "./shop-category-card";

export function ShopCategoriesCarousel({
  categories,
}: {
  categories: FeaturedCategoryCard[];
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Map scroll progress (0 → max scrollable distance) linearly onto the dot
  // range (0 → length-1) instead of dividing by a fixed card width — the last
  // card(s) don't have a full card-width of scroll room before hitting the
  // end, so a naive `scrollLeft / cardStep` never reaches the final index.
  const handleScroll = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const ratio = maxScroll > 0 ? el.scrollLeft / maxScroll : 0;
    const index = Math.round(ratio * (categories.length - 1));
    setActiveIndex(Math.max(0, Math.min(index, categories.length - 1)));
  }, [categories.length]);

  const scrollToIndex = (index: number) => {
    const el = scrollerRef.current;
    const card = el?.children[index] as HTMLElement | undefined;
    if (!el || !card) return;
    el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: "smooth" });
    setActiveIndex(index);
  };

  const goPrev = () => scrollToIndex(Math.max(0, activeIndex - 1));
  const goNext = () =>
    scrollToIndex(Math.min(categories.length - 1, activeIndex + 1));

  return (
    <div>
      <div className="relative">
        {categories.length > 1 && (
          <button
            type="button"
            aria-label="Previous categories"
            onClick={goPrev}
            disabled={activeIndex === 0}
            className="absolute top-1/2 -left-3 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-md transition-colors hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-30 sm:-left-4 lg:size-11"
          >
            <Icon
              icon="solar:arrow-left-linear"
              className="size-5 lg:size-6"
            />
          </button>
        )}

        <div
          ref={scrollerRef}
          onScroll={handleScroll}
          className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 lg:gap-8"
        >
          {categories.map((category) => (
            <ShopCategoryCard key={category.slug} {...category} />
          ))}
        </div>

        {categories.length > 1 && (
          <button
            type="button"
            aria-label="Next categories"
            onClick={goNext}
            disabled={activeIndex === categories.length - 1}
            className="absolute top-1/2 -right-3 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-md transition-colors hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-30 sm:-right-4 lg:size-11"
          >
            <Icon
              icon="solar:arrow-right-linear"
              className="size-5 lg:size-6"
            />
          </button>
        )}
      </div>

      {categories.length > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {categories.map((category, i) => (
            <button
              key={category.slug}
              type="button"
              aria-label={`Go to ${category.label}`}
              onClick={() => scrollToIndex(i)}
              className={`size-2.5 rounded-full transition-colors ${
                i === activeIndex
                  ? "bg-foreground/80"
                  : "bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
