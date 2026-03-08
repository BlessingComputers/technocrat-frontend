import { getPaginatedProducts, getRootCategories } from "@/lib/data";
import { ProductCard } from "@/components/molecules/product-card";
import { Container } from "@/components/templates/container";
import Link from "next/link";
import { ChevronLeft, ChevronRight, LayoutGrid, List } from "lucide-react";
import { Suspense } from "react";
import { ProductSkeletonGrid } from "@/components/molecules/skeletons/product-skeleton-grid";

export const metadata = {
  title: "Products | Technocrat",
  description: "Browse our extensive catalog of products.",
};

type SortOption = "featured" | "name-asc" | "name-desc" | "newest";

async function ProductList({
  currentPage,
  categorySlug,
  sort,
  view,
}: {
  currentPage: number;
  categorySlug?: string;
  sort: SortOption;
  view: string;
}) {
  const { products, totalPages, total } = getPaginatedProducts(
    currentPage,
    20,
    categorySlug,
    sort,
  );

  const buildHref = (params: Record<string, string | number>) => {
    const searchParams = new URLSearchParams();
    if (categorySlug) searchParams.set("category", categorySlug);
    if (sort !== "featured") searchParams.set("sort", sort);
    if (view !== "grid") searchParams.set("view", view);
    Object.entries(params).forEach(([k, v]) => searchParams.set(k, String(v)));
    const qs = searchParams.toString();
    return `/product${qs ? `?${qs}` : ""}`;
  };

  return (
    <div className="w-full">
      {/* Results info */}
      <div className="mb-5">
        <p className="text-xs font-mono text-muted-foreground">
          Showing page {currentPage} of {totalPages || 1} — {total} products
        </p>
      </div>

      {/* Product Grid / List */}
      {view === "list" ? (
        <div className="flex flex-col gap-3 mb-12">
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
              variant="list"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
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
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center">
          <div className="inline-flex items-center border border-border divide-x divide-border">
            <Link
              href={
                currentPage > 1 ? buildHref({ page: currentPage - 1 }) : "#"
              }
              className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                currentPage <= 1
                  ? "opacity-40 pointer-events-none text-muted-foreground"
                  : "text-foreground hover:bg-primary hover:text-primary-foreground"
              }`}
            >
              <ChevronLeft className="w-3.5 h-3.5 inline mr-1" />
              Prev
            </Link>
            <span className="px-5 py-2.5 text-xs font-mono font-bold text-foreground">
              {currentPage} / {totalPages}
            </span>
            <Link
              href={
                currentPage < totalPages
                  ? buildHref({ page: currentPage + 1 })
                  : "#"
              }
              className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                currentPage >= totalPages
                  ? "opacity-40 pointer-events-none text-muted-foreground"
                  : "text-foreground hover:bg-primary hover:text-primary-foreground"
              }`}
            >
              Next
              <ChevronRight className="w-3.5 h-3.5 inline ml-1" />
            </Link>
          </div>
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
  const sortParam = searchParams?.sort;
  const viewParam = searchParams?.view;

  const page = typeof pageParam === "string" ? parseInt(pageParam, 10) : 1;
  const categorySlug =
    typeof categoryParam === "string" ? categoryParam : undefined;
  const sort = (
    typeof sortParam === "string" ? sortParam : "featured"
  ) as SortOption;
  const view = typeof viewParam === "string" ? viewParam : "grid";
  const currentPage = isNaN(page) || page < 1 ? 1 : page;

  const categories = getRootCategories();

  const buildFilterHref = (params: Record<string, string>) => {
    const sp = new URLSearchParams();
    if (categorySlug) sp.set("category", categorySlug);
    if (sort !== "featured") sp.set("sort", sort);
    if (view !== "grid") sp.set("view", view);
    Object.entries(params).forEach(([k, v]) => {
      if (v) sp.set(k, v);
      else sp.delete(k);
    });
    sp.delete("page");
    const qs = sp.toString();
    return `/product${qs ? `?${qs}` : ""}`;
  };

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: "featured", label: "Featured" },
    { value: "name-asc", label: "Name A-Z" },
    { value: "name-desc", label: "Name Z-A" },
    { value: "newest", label: "Newest" },
  ];

  return (
    <main className="min-h-screen bg-background pt-6 pb-16">
      <Container outerStyle="">
        {/* Title */}
        <div className="mb-6">
          <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary block mb-1">
            Catalog
          </span>
          <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-foreground">
            {categorySlug
              ? categories.find((c) => c.slug === categorySlug)?.name ||
                "Category"
              : "All Products"}
          </h1>
        </div>

        {/* Filter Toolbar */}
        <div className="border border-border mb-8">
          {/* Row 1: Category tabs */}
          <div className="flex overflow-x-auto scrollbar-hide border-b border-border">
            <Link
              href="/product"
              className={`shrink-0 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors border-r border-border ${
                !categorySlug
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-primary hover:text-primary-foreground"
              }`}
            >
              All
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={buildFilterHref({ category: cat.slug })}
                className={`shrink-0 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors border-r border-border ${
                  categorySlug === cat.slug
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-primary hover:text-primary-foreground"
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>

          {/* Row 2: Sort + View */}
          <div className="flex items-center justify-between px-4 py-2 gap-4">
            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground hidden sm:inline">
                Sort:
              </span>
              <div className="flex items-center gap-1">
                {sortOptions.map((opt) => (
                  <Link
                    key={opt.value}
                    href={buildFilterHref({ sort: opt.value })}
                    className={`px-2.5 py-1 text-[11px] font-medium transition-colors ${
                      sort === opt.value
                        ? "bg-foreground text-background"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {opt.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-1 border border-border">
              <Link
                href={buildFilterHref({ view: "grid" })}
                className={`p-1.5 transition-colors ${
                  view === "grid"
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </Link>
              <Link
                href={buildFilterHref({ view: "list" })}
                className={`p-1.5 transition-colors ${
                  view === "list"
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <List className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Products */}
        <Suspense
          key={`${currentPage}-${categorySlug || "all"}-${sort}-${view}`}
          fallback={<ProductSkeletonGrid />}
        >
          <ProductList
            currentPage={currentPage}
            categorySlug={categorySlug}
            sort={sort}
            view={view}
          />
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
