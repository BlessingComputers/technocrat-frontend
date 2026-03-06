"use client";

import { useState, useEffect } from "react";
import { ProductCard } from "@/components/molecules/product-card";
import {
  StaggerContainer,
  StaggerItem,
  FadeInDown,
  SlideTransition,
  AnimatePresence,
} from "@/components/animations/motion-components";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "../molecules/section-header";
import { Product } from "@/features/catalog/types/catalog";

export function AccessoriesSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/products/accessories");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching accessories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const itemsPerPage = isMobile ? 2 : 4;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Reset to first page if items per page changes and current page is out of bounds
  useEffect(() => {
    if (currentPage >= totalPages && totalPages > 0) {
      setCurrentPage(0);
    }
  }, [itemsPerPage, totalPages, currentPage]);

  const currentProducts = products.slice(
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
    <section className="py-12 md:py-16 bg-gray-50/30 dark:bg-background overflow-hidden border-y border-gray-100 dark:border-white/5">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <SectionHeader
          tag="Accessories Collection"
          title={{ span: "Essential ", rest: "Accessories" }}
          description="Discover our curated collection of premium accessories designed to complement and enhance your devices."
        />
        <FadeInDown
          duration={0.5}
          className="my-10 lg:mb-14 flex flex-col md:flex-row md:items-end justify-end gap-6"
        >
          {/* Desktop Pagination Controls */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={prevPage}
              disabled={isLoading || products.length === 0}
              className="rounded-full shadow-sm hover:bg-primary hover:text-white transition-all border-gray-200 dark:border-white/10"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextPage}
              disabled={isLoading || products.length === 0}
              className="rounded-full shadow-sm hover:bg-primary hover:text-white transition-all border-gray-200 dark:border-white/10"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </FadeInDown>

        {/* Product Grid / Scroll Wrapper */}
        <div className="relative min-h-[400px]">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
              {[...Array(itemsPerPage)].map((_, i) => (
                <div
                  key={i}
                  className="w-full aspect-4/5 bg-gray-100 dark:bg-white/5 rounded-2xl animate-pulse flex items-center justify-center"
                >
                  <Loader2 className="w-8 h-8 text-gray-300 dark:text-gray-700 animate-spin" />
                </div>
              ))}
            </div>
          ) : (
            <>
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <SlideTransition
                  key={currentPage}
                  direction={direction}
                  className="w-full"
                >
                  <StaggerContainer
                    key={`${currentPage}-${isMobile}`}
                    staggerDelay={0.08}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full"
                  >
                    {currentProducts.map((product) => (
                      <StaggerItem key={product.id} className="w-full">
                        <ProductCard
                          id={product.id}
                          slug={product.slug}
                          title={product.name}
                          description={
                            product.short_description || product.description
                          }
                          price={parseFloat(product.price)}
                          image={product.images[0] || "/assets/hero.png"}
                          href={`/product/${product.slug}`}
                          colors={
                            product.id % 2 === 0
                              ? ["bg-black", "bg-gray-400"]
                              : ["bg-blue-600", "bg-red-500", "bg-green-400"]
                          }
                        />
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </SlideTransition>
              </AnimatePresence>

              {/* Mobile Pagination Info / Dots */}
              <div className="flex mt-10 items-center justify-center gap-2">
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setDirection(idx > currentPage ? "right" : "left");
                      setCurrentPage(idx);
                    }}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      currentPage === idx
                        ? "w-8 bg-primary"
                        : "w-2 bg-gray-300 dark:bg-gray-700",
                    )}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
