import { Suspense } from "react";
import {
  Hero,
  Services,
  ShopByCategories,
  FeaturedProducts,
  BikePurchase,
  Procurement,
  NewArrivals,
  Testimonials,
} from "@/features/landing/home";
import { HeroSkeleton } from "@/components/molecules/skeletons/hero-skeleton";
import { ShopByCategoriesSkeleton } from "@/components/molecules/skeletons/shop-by-categories-skeleton";
import { FeaturedProductsSkeleton } from "@/components/molecules/skeletons/featured-products-skeleton";
import { NewArrivalsSkeleton } from "@/components/molecules/skeletons/new-arrivals-skeleton";

export default function HomePage() {
  // The (root) layout already renders the page's <main> landmark.
  return (
    <>
      <Suspense fallback={<HeroSkeleton />}>
        <Hero />
      </Suspense>
      <Services />
      <Suspense fallback={<ShopByCategoriesSkeleton />}>
        <ShopByCategories />
      </Suspense>
      <BikePurchase />
      <Suspense fallback={<FeaturedProductsSkeleton />}>
        <FeaturedProducts />
      </Suspense>
      <Procurement />
      <Suspense fallback={<NewArrivalsSkeleton />}>
        <NewArrivals />
      </Suspense>
      <Testimonials />
    </>
  );
}
