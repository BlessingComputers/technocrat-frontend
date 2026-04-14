import { Suspense } from "react";
import { BentoHero } from "@/components/organisms/bento-hero";
import { CategoryBar } from "@/components/organisms/category-bar";
import { FeaturedGrid } from "@/components/organisms/featured-grid";
import { RecentArrivals } from "@/components/organisms/recent-arrivals";
import { LatestPosts } from "@/components/organisms/latest-posts";
import { ContactBanner } from "@/components/organisms/contact-banner";
import { HeroSkeleton } from "@/components/molecules/skeletons/hero-skeleton";
import { CategoryBarSkeleton } from "@/components/molecules/skeletons/category-bar-skeleton";
import { GridSkeleton } from "@/components/molecules/skeletons/grid-skeleton";
import { LatestPostsSkeleton } from "@/components/molecules/skeletons/latest-posts-skeleton";

export default function HomePage() {
  return (
    <main>
      <Suspense fallback={<HeroSkeleton />}>
        <BentoHero />
      </Suspense>
      <Suspense fallback={<CategoryBarSkeleton />}>
        <CategoryBar />
      </Suspense>
      <Suspense fallback={<GridSkeleton count={8} columns={{ mobile: 2, tablet: 3, desktop: 4 }} />}>
        <FeaturedGrid />
      </Suspense>
      <Suspense fallback={<GridSkeleton count={4} />}>
        <RecentArrivals />
      </Suspense>
      <Suspense fallback={<LatestPostsSkeleton />}>
        <LatestPosts />
      </Suspense>
      <ContactBanner />
    </main>
  );
}
