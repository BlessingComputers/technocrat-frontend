import { getPaginatedProducts, getRootCategories } from "@/lib/data";
import { ProductCard } from "@/components/molecules/product-card";
import { Container } from "@/components/templates/container";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Suspense } from "react";
import { ProductSkeletonGrid } from "@/components/molecules/skeletons/product-skeleton-grid";

export const metadata = {
  title: "Products",
  description: "Browse our extensive catalog of products.",
};

async function ProductList({
  currentPage,
  categorySlug,
}: {
  currentPage: number;
  categorySlug?: string;
}) {
  const { products, totalPages } = getPaginatedProducts(
    currentPage,
    20,
    categorySlug,
  );

  return (
    <div className="w-full">
      <div className="mb-6">
        <p className="text-sm sm:text-base text-gray-500 dark:text-muted-foreground w-fit px-3 py-1 bg-gray-100 dark:bg-muted rounded-full">
          Showing page {currentPage} of {totalPages || 1}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 mb-16">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            slug={product.slug}
            title={product.name}
            description={product.short_description}
            price={product.price ? parseFloat(product.price) : null}
            image={product.images?.[0] || "/assets/placeholder.png"}
            brand={product.categories?.[0]?.name}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 sm:gap-4 mt-12 bg-white dark:bg-card p-2 sm:p-4 rounded-full border border-gray-100 dark:border-white/10 w-fit mx-auto shadow-sm">
          <Button
            asChild
            variant="outline"
            disabled={currentPage <= 1}
            className={`rounded-full h-10 px-4 ${
              currentPage <= 1 ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <Link
              href={`?page=${currentPage - 1}${
                categorySlug ? `&category=${categorySlug}` : ""
              }`}
            >
              <ChevronLeft className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline font-bold uppercase tracking-wider text-xs">
                Previous
              </span>
            </Link>
          </Button>

          <span className="text-sm font-bold tracking-widest px-4 text-gray-600 dark:text-muted-foreground uppercase">
            {currentPage}{" "}
            <span className="text-gray-300 dark:text-gray-700 mx-1">/</span>{" "}
            {totalPages}
          </span>

          <Button
            asChild
            variant="outline"
            disabled={currentPage >= totalPages}
            className={`rounded-full h-10 px-4 ${
              currentPage >= totalPages ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <Link
              href={`?page=${currentPage + 1}${
                categorySlug ? `&category=${categorySlug}` : ""
              }`}
            >
              <span className="hidden sm:inline font-bold uppercase tracking-wider text-xs">
                Next
              </span>
              <ChevronRight className="w-4 h-4 sm:ml-2" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}

async function ProductPageContent(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const pageParam = searchParams?.page;
  const categoryParam = searchParams?.category;

  const page = typeof pageParam === "string" ? parseInt(pageParam, 10) : 1;
  const categorySlug =
    typeof categoryParam === "string" ? categoryParam : undefined;
  const currentPage = isNaN(page) || page < 1 ? 1 : page;

  const categories = getRootCategories();

  return (
    <main className="min-h-screen bg-gray-50/50 dark:bg-background pt-8 pb-16">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-gray-900 dark:text-white mb-2">
              {categorySlug
                ? categories.find((c) => c.slug === categorySlug)?.name ||
                  "Category"
                : "All Products"}
            </h1>
          </div>
        </div>

        {/* Categories Filter */}
        <div className="flex overflow-x-auto pb-4 mb-8 gap-2 snap-x scrollbar-hide">
          <Button
            asChild
            variant={!categorySlug ? "default" : "outline"}
            className="rounded-full dark:text-white snap-start whitespace-nowrap"
          >
            <Link href="/product">All Categories</Link>
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              asChild
              variant={categorySlug === category.slug ? "default" : "outline"}
              className="rounded-full dark:text-white snap-start whitespace-nowrap"
            >
              <Link href={`/product?category=${category.slug}`}>
                {category.name}
              </Link>
            </Button>
          ))}
        </div>

        {/* Suspense Boundary for Products */}
        <Suspense
          key={`${currentPage}-${categorySlug || "all"}`}
          fallback={<ProductSkeletonGrid />}
        >
          <ProductList currentPage={currentPage} categorySlug={categorySlug} />
        </Suspense>
      </Container>
    </main>
  );
}

export default function ProductPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <Suspense fallback={<ProductSkeletonGrid />}>
      <ProductPageContent {...props} />
    </Suspense>
  );
}
