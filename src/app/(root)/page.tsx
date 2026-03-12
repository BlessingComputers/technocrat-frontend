import { Suspense } from "react";
import { BentoHero } from "@/components/organisms/bento-hero";
import { CategoryBar } from "@/components/organisms/category-bar";
import { FeaturedGrid } from "@/components/organisms/featured-grid";
import { RecentArrivals } from "@/components/organisms/recent-arrivals";
import { LatestPosts } from "@/components/organisms/latest-posts";
import { ContactBanner } from "@/components/organisms/contact-banner";

export default function HomePage() {
  return (
    <main>
      <Suspense>
        <BentoHero />
      </Suspense>
      <Suspense>
        <CategoryBar />
      </Suspense>
      <Suspense>
        <FeaturedGrid />
      </Suspense>
      <Suspense>
        <RecentArrivals />
      </Suspense>
      <Suspense>
        <LatestPosts />
      </Suspense>
      <ContactBanner />
    </main>
  );
}
