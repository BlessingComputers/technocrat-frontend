"use client";

import { useCallback, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { FeaturedProduct } from "@/features/catalog/api/catalog.service";
import { ProductCard } from "./product-card";

/**
 * The four newest products.
 *
 * One DOM, two layouts: a snap-scrolling shelf with a peeking next card up to
 * `xl`, and a plain four-up grid from `xl` where all four fit at their designed
 * 302px. The flex container simply becomes a grid at the breakpoint, so no card
 * is duplicated or re-mounted across it.
 *
 * This deliberately reads differently from the "Featured Products" grid higher
 * up the page — same card, different shelf — so the two product sections don't
 * land as the same block twice.
 */
export function NewArrivalsCarousel({
  products,
}: {
  products: FeaturedProduct[];
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Map scroll progress (0 → max scrollable distance) linearly onto the dot
  // range rather than dividing by a fixed card width: the trailing card has
  // less than a full card of scroll room left, so `scrollLeft / cardStep`
  // would never reach the last index.
  const handleScroll = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const ratio = maxScroll > 0 ? el.scrollLeft / maxScroll : 0;
    const index = Math.round(ratio * (products.length - 1));
    setActiveIndex(Math.max(0, Math.min(index, products.length - 1)));
  }, [products.length]);

  const scrollToIndex = (index: number) => {
    const el = scrollerRef.current;
    const card = el?.children[index] as HTMLElement | undefined;
    if (!el || !card) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({
      left: card.offsetLeft - el.offsetLeft,
      behavior: reduce ? "auto" : "smooth",
    });
    setActiveIndex(index);
  };

  return (
    <div>
      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        // Focusable so the shelf is reachable by keyboard, which is the only
        // way to pan it without a pointer (the dots below jump, they don't pan).
        tabIndex={0}
        role="group"
        aria-label="New arrivals"
        className="scrollbar-hide flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none xl:grid xl:grid-cols-4 xl:gap-5 xl:overflow-visible xl:pb-0"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="flex w-[302px] shrink-0 snap-start xl:w-auto"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {products.length > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2 xl:hidden">
          {products.map((product, i) => (
            <button
              key={product.id}
              type="button"
              onClick={() => scrollToIndex(i)}
              aria-label={`Show ${product.name}`}
              aria-current={i === activeIndex}
              // 12px dot per the design, sat inside a 44px tap target so the
              // control is reachable without pixel-hunting.
              className="flex size-11 items-center justify-center rounded-full focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              <span
                className={cn(
                  "size-3 rounded-full transition-colors motion-reduce:transition-none",
                  i === activeIndex
                    ? "bg-foreground/80"
                    : "bg-muted-foreground/30",
                )}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
