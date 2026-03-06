import { HeroCarousel } from "@/features/catalog/components/hero-carousel";
import { FeaturedProducts } from "@/features/catalog/components/featured-products";
import { AccessoriesSection } from "@/components/organisms/accessories-section";
import { CategoryExplorer } from "@/components/organisms/category-grid";
import { RecentArrivals } from "@/components/organisms/recent-arrivals";
import { Suspense } from "react";
import { getFeaturedProducts } from "@/lib/data";
import { ContactBanner } from "@/components/organisms/contact-banner";

export default function HomePage() {
  const heroProducts = getFeaturedProducts(3);

  return (
    <main>
      <Suspense fallback={null}>
        <HeroCarousel products={heroProducts} />
      </Suspense>
      <Suspense fallback={null}>
        <FeaturedProducts />
      </Suspense>
      <Suspense fallback={null}>
        <CategoryExplorer />
      </Suspense>
      <Suspense fallback={null}>
        <RecentArrivals />
      </Suspense>
      <Suspense fallback={null}>
        <AccessoriesSection />
      </Suspense>
      <ContactBanner />
    </main>
  );
}
