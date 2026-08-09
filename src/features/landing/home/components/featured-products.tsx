import Link from "next/link";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/templates/container";
import { catalogService } from "@/features/catalog/api/catalog.service";
import { ProductCard } from "./product-card";

/**
 * Cards past this index are hidden below `sm`. The mobile frame stops at four
 * so the section stays a glance rather than a catalogue; "View all" carries
 * the rest.
 */
const MOBILE_CARD_LIMIT = 4;

export async function FeaturedProducts() {
  const products = await catalogService.getFeaturedProducts(8);

  if (products.length === 0) return null;

  return (
    <div className="bg-[#fafafa] dark:bg-background">
      <Container outerStyle="py-16 lg:py-20">
        <div className="mb-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col items-start gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-[#f8fdf9] px-4 py-1 text-xs font-medium tracking-[-0.01em] text-[#0e2115] dark:bg-primary/10 dark:text-foreground">
              <Icon
                icon="solar:star-fall-outline"
                aria-hidden
                className="size-6"
              />
              Explore our range
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-balance text-foreground lg:text-[40px] lg:leading-[1.4]">
              <span className="text-[#008d00] dark:text-primary">Featured</span>{" "}
              Products
            </h2>
          </div>

          <Link
            href="/product"
            className="group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-lg border border-[#008d00] bg-[#fafafa] px-4 text-sm font-medium text-[#008d00] transition-colors hover:bg-[#008d00]/5 focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none lg:px-6 lg:text-base dark:border-primary dark:bg-transparent dark:text-primary"
          >
            <span className="lg:hidden">View all</span>
            <span className="max-lg:hidden">Explore all products</span>
            <Icon
              icon="solar:arrow-right-linear"
              aria-hidden
              className="size-5 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none lg:size-6"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={cn(
                "flex",
                index >= MOBILE_CARD_LIMIT && "max-sm:hidden",
              )}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
