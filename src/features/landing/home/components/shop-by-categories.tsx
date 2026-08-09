import { Icon } from "@iconify/react";
import { Container } from "@/components/templates/container";
import { catalogService } from "@/features/catalog/api/catalog.service";
import { ShopCategoriesCarousel } from "./shop-categories-carousel";

export async function ShopByCategories() {
  const categories = await catalogService.getShopCategories();

  if (categories.length === 0) return null;

  return (
    <div className="relative overflow-hidden bg-white dark:bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-0 size-72 rounded-full bg-primary/10 blur-3xl"
      />
      <Container outerStyle="relative py-16">
        <div className="mb-10 flex flex-col items-start gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/5 px-4 py-1 text-xs font-medium tracking-tight text-foreground">
            <Icon icon="solar:star-fall-outline" className="size-6" />
            Our categories
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-foreground lg:text-[40px] lg:font-semibold">
            Shop By <span className="text-primary">Categories</span>
          </h2>
        </div>

        <ShopCategoriesCarousel categories={categories} />
      </Container>
    </div>
  );
}
