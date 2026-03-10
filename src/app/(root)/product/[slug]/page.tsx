import { getProductById, getRelatedProducts } from "@/lib/data";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/organisms/product-detail/product-gallery";
import { ProductInfo } from "@/components/organisms/product-detail/product-info";
import { ProductDetails } from "@/components/organisms/product-detail/product-tabs";
import { ProductCard } from "@/components/molecules/product-card";
import { ProductDetailSkeleton } from "@/components/organisms/product-detail/product-detail-skeleton";
import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductById(decodeURIComponent(slug));

  if (!product) {
    return { title: "Product Not Found" };
  }

  const plainDescription = product.short_description
    .replace(/<[^>]*>/g, "")
    .slice(0, 160);

  return {
    title: product.name,
    description:
      plainDescription || `Shop ${product.name} at Technocrat Nigeria.`,
    openGraph: {
      title: product.name,
      description:
        plainDescription || `Shop ${product.name} at Technocrat Nigeria.`,
      type: "website",
      images: product.images?.[0] ? [{ url: product.images[0] }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description:
        plainDescription || `Shop ${product.name} at Technocrat Nigeria.`,
      images: product.images?.[0] ? [product.images[0]] : [],
    },
  };
}

async function ProductContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const product = getProductById(decodedSlug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product, 4);

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb Bar */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-[11px] text-muted-foreground">
            <Link
              href="/"
              className="font-semibold uppercase tracking-wider hover:text-primary transition-colors"
            >
              Home
            </Link>
            <span>/</span>
            <Link
              href="/product"
              className="font-semibold uppercase tracking-wider hover:text-primary transition-colors"
            >
              Products
            </Link>
            {product.categories[0] && (
              <>
                <span>/</span>
                <Link
                  href={`/product?category=${product.categories[0].slug}`}
                  className="font-semibold uppercase tracking-wider hover:text-primary transition-colors"
                >
                  {product.categories[0].name}
                </Link>
              </>
            )}
            <span>/</span>
            <span className="text-foreground truncate max-w-50 sm:max-w-none">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      {/* Gallery + Info — Full-width gallery on top, info below on mobile; side-by-side on desktop */}
      <section className="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Gallery */}
          <div className="lg:col-span-7">
            <ProductGallery images={product.images} name={product.name} />
          </div>

          {/* Info */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-20">
              <ProductInfo product={product} />
            </div>
          </div>
        </div>
      </section>

      {/* Specs + Description — side by side */}
      <section className="container mx-auto px-4 lg:px-8 pb-12 lg:pb-16">
        <ProductDetails description={product.description} />
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-border">
          <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
            <div className="flex items-end justify-between pb-4 border-b border-border mb-8">
              <div>
                <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-primary block mb-2">
                  Similar Items
                </span>
                <h2 className="text-xl font-semibold tracking-tight text-foreground">
                  You Might Also Like
                </h2>
              </div>
              <Link
                href={`/product${product.categories[0] ? `?category=${product.categories[0].slug}` : ""}`}
                className="hidden sm:inline-flex items-center gap-2 border border-border px-5 py-2 text-xs font-semibold uppercase tracking-wider text-foreground hover:border-primary hover:text-primary transition-colors"
              >
                View All
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedProducts.map((p) => (
                <ProductCard
                  key={p.slug}
                  id={p.id}
                  slug={p.slug}
                  title={p.name}
                  image={p.images[0] || "/assets/placeholder.png"}
                  description={p.short_description || ""}
                  brand={p.categories[0]?.name}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <Suspense fallback={<ProductDetailSkeleton />}>
      <ProductContent params={params} />
    </Suspense>
  );
}
