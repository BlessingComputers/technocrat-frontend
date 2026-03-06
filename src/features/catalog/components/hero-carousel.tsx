"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/templates/container";
import { Button } from "@/components/ui/button";
import { FadeIn, ViewIn } from "@/components/animations/motion-components";
import Link from "next/link";
import { Product } from "../types/catalog";

interface HeroCarouselProps {
  products: Product[];
}

export function HeroCarousel({ products }: HeroCarouselProps) {
  const carouselProducts = products.slice(1);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % carouselProducts.length);
  }, [carouselProducts.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlide(
      (prev) => (prev - 1 + carouselProducts.length) % carouselProducts.length,
    );
  }, [carouselProducts.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 10000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  if (!carouselProducts || carouselProducts.length === 0) {
    return null;
  }

  const slide = carouselProducts[currentSlide];

  // Use the first image from the product's images array, or a fallback
  const imagePath = slide.images?.[0] || "/assets/placeholder.png";

  return (
    <section className="relative w-full overflow-hidden bg-[#F8FAFC] dark:bg-background pt-8 pb-16 lg:pt-12 lg:pb-24">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-secondary/20 blur-[100px] rounded-full pointer-events-none" />

      <Container outerStyle="py-0">
        <div className="relative min-h-125 lg:min-h-150 flex items-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentSlide}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full"
            >
              {/* Text Content */}
              <div className="flex flex-col items-start z-10 text-left">
                <FadeIn direction="right" delay={0.1}>
                  <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/30 text-secondary border border-secondary/20 shadow-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      New Arrival Available
                    </span>
                  </div>
                </FadeIn>

                <FadeIn direction="up" delay={0.2}>
                  <h1 className="text-5xl lg:text-7xl font-black tracking-tight text-gray-900 dark:text-white leading-[1.1] mb-6">
                    {slide.name.split(" ").map((word, i) => (
                      <span
                        key={i}
                        className={
                          i >= slide.name.split(" ").length - 2
                            ? "text-primary block lg:inline"
                            : ""
                        }
                      >
                        {word}{" "}
                      </span>
                    ))}
                  </h1>
                </FadeIn>

                <FadeIn direction="up" delay={0.3}>
                  <div
                    className="text-lg text-gray-500 dark:text-muted-foreground leading-relaxed max-w-xl mb-10 line-clamp-3"
                    dangerouslySetInnerHTML={{
                      __html:
                        slide.short_description || slide.description || "",
                    }}
                  />
                </FadeIn>

                <FadeIn
                  direction="up"
                  delay={0.4}
                  className="flex flex-wrap gap-4"
                >
                  <Button
                    asChild
                    size="lg"
                    className="rounded-full bg-primary text-white font-black uppercase tracking-widest px-10 py-7 shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all group"
                  >
                    <Link href="/contact">
                      Buy Now
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="rounded-full border-2 border-primary/20 dark:border-white/10 hover:border-primary/40 bg-white/50 dark:bg-white/5 backdrop-blur-sm font-black uppercase tracking-widest px-10 py-7"
                  >
                    <Link href={`/product/${slide.slug}`}>View Specs</Link>
                  </Button>
                </FadeIn>

                {/* Trust Indicators */}
                <FadeIn
                  direction="up"
                  delay={0.5}
                  className="mt-12 flex items-center gap-8 grayscale opacity-50 dark:invert dark:opacity-30"
                >
                  <div className="flex flex-col">
                    <span className="text-2xl text-primary font-black">
                      12k+
                    </span>
                    <span className="text-[10px] uppercase font-bold text-paragraph tracking-tighter">
                      Products Listed
                    </span>
                  </div>
                  <div className="h-10 w-px bg-gray-300 dark:bg-white/20" />
                  <div className="flex flex-col">
                    <span className="text-2xl text-primary font-black">
                      4.8/5
                    </span>
                    <span className="text-[10px] uppercase font-bold text-paragraph tracking-tighter">
                      User Rating
                    </span>
                  </div>
                </FadeIn>
              </div>

              {/* Image Preview */}
              <div className="relative lg:block flex justify-center items-center">
                <ViewIn
                  initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                  view={{ opacity: 1, scale: 1, rotate: 0 }}
                  duration={0.8}
                  className="relative z-10 w-full max-w-125 lg:max-w-none aspect-square lg:aspect-4/3 rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border-4 border-white dark:border-white/5"
                >
                  <Image
                    src={imagePath}
                    alt={slide.name}
                    fill
                    className="object-cover"
                    priority
                  />

                  {/* Floating Info Tag */}
                  <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="absolute bottom-8 left-8 right-8 bg-white/90 dark:bg-black/80 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-2xl flex items-center justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-black uppercase text-primary tracking-widest block mb-1">
                        Featured Performance
                      </span>
                      <h4 className="font-bold text-gray-900 dark:text-white">
                        Professional Grade Build
                      </h4>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-primary italic">
                        In Stock
                      </span>
                    </div>
                  </motion.div>
                </ViewIn>

                {/* Background Glows */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-secondary/20 blur-[100px] animate-pulse pointer-events-none rounded-full" />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="absolute -bottom-5 right-0 flex gap-4 z-20">
            <button
              onClick={prevSlide}
              className="p-4 rounded-full bg-white dark:bg-card border border-black/5 dark:border-white/5 shadow-xl hover:bg-primary hover:text-white transition-all active:scale-95"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="p-4 rounded-full bg-white dark:bg-card border border-black/5 dark:border-white/5 shadow-xl hover:bg-primary hover:text-white transition-all active:scale-95"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Pagination Indicators */}
          <div className="absolute left-0 -bottom-5 flex gap-2 z-20">
            {carouselProducts.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > currentSlide ? 1 : -1);
                  setCurrentSlide(i);
                }}
                className={`h-2 rounded-full transition-all ${
                  i === currentSlide
                    ? "w-12 bg-primary"
                    : "w-2 bg-gray-300 dark:bg-white/20 hover:bg-primary/40"
                }`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
