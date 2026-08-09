"use client";

import { useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { Container } from "@/components/templates/container";
import { cn } from "@/lib/utils";
import { testimonials } from "../data/testimonials";
import { TestimonialCard } from "./testimonial-card";

/** Below this the swipe reads as a scroll attempt rather than a deliberate flick. */
const SWIPE_THRESHOLD_PX = 40;

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const count = testimonials.length;
  const wrap = (index: number) => (index + count) % count;
  const active = testimonials[activeIndex];
  const previous = testimonials[wrap(activeIndex - 1)];
  const next = testimonials[wrap(activeIndex + 1)];

  const handleTouchEnd = (event: React.TouchEvent) => {
    const start = touchStartX.current;
    touchStartX.current = null;
    if (start === null) return;
    const delta = event.changedTouches[0].clientX - start;
    if (Math.abs(delta) < SWIPE_THRESHOLD_PX) return;
    setActiveIndex((index) => wrap(index + (delta < 0 ? 1 : -1)));
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      setActiveIndex((index) => wrap(index + 1));
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      setActiveIndex((index) => wrap(index - 1));
    }
  };

  return (
    // Same gradient the bike-purchase band uses, so the two dark stops on the
    // page read as one system. `overflow-hidden` is what lets the shelf be
    // wider than the page and bleed off both edges: on mobile that hides the
    // flanking cards entirely, which is exactly what the mobile frame shows.
    <div className="overflow-hidden bg-[linear-gradient(to_bottom,#0e2115_0%,#50a664_100%)]">
      <Container outerStyle="py-16 lg:py-20">
        <div className="flex flex-col items-center gap-10 lg:gap-[65px]">
          <div className="flex flex-col items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-medium tracking-[-0.01em] text-[#e6fcec]">
              <Icon icon="solar:star-fall-outline" aria-hidden className="size-6" />
              Testimonials
            </span>
            <h2 className="text-2xl leading-[1.4] font-bold tracking-[-0.01em] text-balance text-white lg:text-[40px]">
              What Our Clients Say About Us
            </h2>
          </div>

          <div
            role="group"
            aria-roledescription="carousel"
            aria-label="Customer testimonials"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onTouchStart={(event) => {
              touchStartX.current = event.touches[0].clientX;
            }}
            onTouchEnd={handleTouchEnd}
            className="flex w-full items-center justify-center gap-4 rounded-lg focus-visible:ring-[3px] focus-visible:ring-white/60 focus-visible:outline-none lg:gap-6 xl:gap-10"
          >
            {/* The flanking cards are a preview of what the dots will bring in,
                so they are buttons rather than decoration. Their own text is
                hidden from assistive tech: the dots already walk the full set,
                and reading three quotes per step would bury the active one. */}
            <button
              type="button"
              onClick={() => setActiveIndex((index) => wrap(index - 1))}
              aria-label={`Show the testimonial from ${previous.name}`}
              className="hidden shrink-0 cursor-pointer rounded-lg transition-opacity duration-300 hover:opacity-90 focus-visible:ring-[3px] focus-visible:ring-white/60 focus-visible:outline-none motion-reduce:transition-none lg:block"
            >
              <span key={previous.slug} aria-hidden className="block animate-in fade-in duration-500 motion-reduce:animate-none">
                <TestimonialCard testimonial={previous} variant="side" />
              </span>
            </button>

            <div
              key={active.slug}
              className="shrink-0 animate-in fade-in slide-in-from-bottom-2 duration-500 ease-out motion-reduce:animate-none"
            >
              <TestimonialCard testimonial={active} variant="active" />
            </div>

            <button
              type="button"
              onClick={() => setActiveIndex((index) => wrap(index + 1))}
              aria-label={`Show the testimonial from ${next.name}`}
              className="hidden shrink-0 cursor-pointer rounded-lg transition-opacity duration-300 hover:opacity-90 focus-visible:ring-[3px] focus-visible:ring-white/60 focus-visible:outline-none motion-reduce:transition-none lg:block"
            >
              <span key={next.slug} aria-hidden className="block animate-in fade-in duration-500 motion-reduce:animate-none">
                <TestimonialCard testimonial={next} variant="side" mirrored />
              </span>
            </button>
          </div>

          {/* The two frames disagree on the dots: desktop draws four flat grey
              and white discs, mobile a green ring around the active one. The
              mobile treatment ships at both sizes — a mid-grey dot would sink
              into the gradient's green half, and one dot style beats two. */}
          <div className="flex items-center justify-center">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.slug}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show the testimonial from ${testimonial.name}`}
                aria-current={index === activeIndex}
                className="flex size-6 cursor-pointer items-center justify-center rounded-full focus-visible:ring-[3px] focus-visible:ring-white/60 focus-visible:outline-none"
              >
                <span
                  className={cn(
                    "flex items-center justify-center rounded-full transition-colors duration-300 motion-reduce:transition-none",
                    index === activeIndex ? "size-4 bg-[#008d00]" : "size-2",
                  )}
                >
                  <span className="size-2 rounded-full bg-white" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
