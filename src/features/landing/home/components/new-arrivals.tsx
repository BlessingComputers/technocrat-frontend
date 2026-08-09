import Link from "next/link";
import { unstable_rethrow } from "next/navigation";
import { Icon } from "@iconify/react";
import { Container } from "@/components/templates/container";
import { catalogService } from "@/features/catalog/api/catalog.service";
import { NewArrivalsCarousel } from "./new-arrivals-carousel";

/** The design is a single four-up row on desktop and a four-dot shelf on mobile. */
const NEW_ARRIVAL_COUNT = 4;

export async function NewArrivals() {
  // `/v1/products/all` answers 500 on the DigitalOcean backend this app points
  // at (see catalogService.getNewArrivals). A decorative shelf shouldn't take
  // the homepage down with it, so a failed fetch drops the section and leaves a
  // trace instead of throwing.
  //
  // Deliberately `warn`, not `error`: Next's dev overlay promotes console.error
  // to a full-screen dialog, and this is a known upstream outage rather than a
  // fault in this app. Promote it back to `error` once the route is healthy and
  // a failure here would mean something genuinely went wrong.
  const products = await catalogService
    .getNewArrivals(NEW_ARRIVAL_COUNT)
    .catch((error: unknown) => {
      // Let Next's own control-flow errors (prerender aborts, redirects)
      // through untouched; only real fetch failures drop the section.
      unstable_rethrow(error);
      console.warn(
        "[NewArrivals] hiding section: /v1/products/all failed.",
        error instanceof Error ? error.message : error,
      );
      return [];
    });

  if (products.length === 0) return null;

  return (
    <div className="bg-[#fafafa] dark:bg-background">
      <Container outerStyle="py-16 lg:py-20">
        <div className="mb-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col items-start gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-white px-4 py-1 text-xs font-medium tracking-[-0.01em] text-[#0e2115] dark:bg-primary/10 dark:text-foreground">
              {/*
                The Figma frame labels this pill "Explore Our Range", which is
                the same copy (and icon) as the Featured Products pill further
                up the page. Two identical eyebrows above two product shelves
                reads as a duplicate rather than a pair, so this one names what
                the section actually is.
              */}
              <Icon icon="solar:box-outline" aria-hidden className="size-6" />
              Just In
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-balance text-foreground lg:text-[40px] lg:leading-[1.4]">
              New <span className="text-[#008d00] dark:text-primary">Arrivals</span>
            </h2>
          </div>

          <Link
            href="/product?sort=newest"
            className="group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-lg border border-[#008d00] bg-[#fafafa] px-6 text-base font-medium text-[#008d00] transition-colors hover:bg-[#008d00]/5 focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none dark:border-primary dark:bg-transparent dark:text-primary"
          >
            View All
            <Icon
              icon="solar:arrow-right-linear"
              aria-hidden
              className="size-6 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
            />
          </Link>
        </div>

        <NewArrivalsCarousel products={products} />
      </Container>
    </div>
  );
}
