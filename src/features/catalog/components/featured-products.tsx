"use client";

import { useState, useEffect } from "react";
import { useGetFeaturedProductsQuery } from "../api/catalog-api";
import { ProductCard } from "@/components/molecules/product-card";
import { Container } from "../../../components/templates/container";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import {
  StaggerContainer,
  StaggerItem,
  ViewIn,
  FadeIn,
  SlideTransition,
  AnimatePresence,
} from "@/components/animations/motion-components";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/molecules/section-header";

export function FeaturedProducts() {
  const {
    data: products,
    isLoading,
    isError,
    isFetching,
  } = useGetFeaturedProductsQuery(undefined);

  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const itemsPerPage = isMobile ? 2 : 4;
  const totalPages = products ? Math.ceil(products.length / itemsPerPage) : 0;

  useEffect(() => {
    if (currentPage >= totalPages && totalPages > 0) {
      setCurrentPage(0);
    }
  }, [itemsPerPage, totalPages, currentPage]);

  const currentProducts = products?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage,
  );

  const nextPage = () => {
    setDirection("right");
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };
  const prevPage = () => {
    setDirection("left");
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section className="relative overflow-hidden bg-white dark:bg-background py-24">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <Container outerStyle="relative z-10">
        <SectionHeader
          tag="Curated Selection"
          title={{ span: "Featured ", rest: "Products" }}
          description="Experience peak performance with our handpicked selection of premium laptops and cutting-edge accessories."
        />
        <div className="flex flex-col 2xl:flex-row 2xl:items-end 2xl:justify-end my-16 gap-6">
          <div className="flex items-center gap-4">
            {/* Desktop Pagination Controls */}
            {totalPages > 1 && (
              <div className="hidden md:flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevPage}
                  className="rounded-full shadow-sm hover:bg-primary hover:text-white transition-all border-gray-200 dark:border-white/10"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextPage}
                  className="rounded-full shadow-sm hover:bg-primary hover:text-white transition-all border-gray-200 dark:border-white/10"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            )}

            <ViewIn
              initial={{ opacity: 0, scale: 0.9 }}
              view={{ opacity: 1, scale: 1 }}
              className="hidden md:block"
            >
              <Button
                size="lg"
                className="rounded-full bg-gray-900 dark:bg-white dark:text-gray-900 text-white font-bold text-sm transition-all shadow-xl hover:shadow-primary/20 hover:scale-105 active:scale-95 px-8"
              >
                Explore All <ArrowRight className="w-4 h-4" />
              </Button>
            </ViewIn>
          </div>
        </div>

        {isLoading || isFetching ? (
          <div className="flex flex-col items-center justify-center py-20 min-h-[400px]">
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
            <p className="text-muted-foreground font-medium animate-pulse">
              Loading curated products...
            </p>
          </div>
        ) : isError ? (
          <div className="text-center py-20">
            <p className="text-red-500 font-bold">Failed to load products.</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </div>
        ) : (
          <div className="relative min-h-[600px]">
            <AnimatePresence initial={false} custom={direction}>
              <SlideTransition
                key={currentPage}
                direction={direction}
                className="w-full"
              >
                <StaggerContainer
                  key={`${currentPage}-${isMobile}`}
                  staggerDelay={0.1}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12"
                >
                  {currentProducts?.map((product) => (
                    <StaggerItem key={product.id}>
                      <ProductCard
                        id={product.id}
                        slug={product.slug}
                        title={product.name}
                        brand={product.categories[0]?.name}
                        price={product.price ? parseInt(product.price) : 0}
                        image={product.images[0] || ""}
                        description={product.short_description || ""}
                        badge={product.meta.featured ? "Featured" : undefined}
                      />
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </SlideTransition>
            </AnimatePresence>

            {/* Mobile/Tablet Pagination Dots */}
            {totalPages > 1 && (
              <div className="flex mt-12 items-center justify-center gap-2">
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(idx)}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      currentPage === idx
                        ? "w-8 bg-primary"
                        : "w-2 bg-gray-300 dark:bg-gray-700",
                    )}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        <div className="mt-16 text-center md:hidden">
          <Button
            size="lg"
            className="rounded-full bg-gray-900 text-white font-bold text-sm shadow-2xl px-10"
          >
            Explore All <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
