"use client";

import { useGetFeaturedProductsQuery } from "@/features/catalog/api/catalog-api";
import { Container } from "@/components/templates/container";
import {
  FadeIn,
  ViewIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/motion-components";
import { ProductCard } from "@/components/molecules/product-card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "../molecules/section-header";

export function RecentArrivals() {
  const { data: products } = useGetFeaturedProductsQuery();

  // For this section, we just take the last 4 products from our "featured/recent" list
  const recentProducts = products?.slice(4, 8) || [];

  if (recentProducts.length === 0) return null;

  return (
    <section className="py-24 bg-white dark:bg-background overflow-hidden">
      <Container>
        <SectionHeader
          tag="Latest Updates"
          title={{ span: "Recent ", rest: "Arrivals" }}
          description="Stay ahead with our newest hardware additions. Premium workstations and gaming beasts updated daily."
        />
        <div className="flex flex-col md:flex-row md:items-end justify-end my-16 gap-6">
          <Button
            variant="outline"
            className="rounded-full h-14 px-8 border-gray-200 dark:border-white/10 text-xs font-black uppercase tracking-widest hidden md:flex"
          >
            Shop New Drops <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <StaggerContainer
          staggerDelay={0.1}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {recentProducts.map((product) => (
            <StaggerItem key={product.id}>
              <ProductCard
                id={product.id}
                slug={product.slug}
                title={product.name}
                brand={product.categories[0]?.name}
                price={product.price ? parseInt(product.price) : 0}
                image={product.images[0] || ""}
                description={product.short_description || ""}
                href={`/product/${product.slug}`}
                badge="New Arrival"
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
