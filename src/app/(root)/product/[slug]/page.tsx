import { getProductById, getRelatedProducts } from "@/lib/data";
import { notFound } from "next/navigation";
import { Container } from "@/components/templates/container";
import { ProductGallery } from "@/components/organisms/product-detail/product-gallery";
import { ProductInfo } from "@/components/organisms/product-detail/product-info";
import { ProductTabs } from "@/components/organisms/product-detail/product-tabs";
import { ProductCard } from "@/components/molecules/product-card";
import { ProductDetailSkeleton } from "@/components/organisms/product-detail/product-detail-skeleton";
import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Detail | Blessing Computers",
  description: "View product details and specifications.",
};

interface ProductPageProps {
  params: Promise<{ slug: string }>;
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
    <>
      <div className="mb-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
          <a href="/" className="hover:text-primary transition-colors">
            Home
          </a>
          <span>/</span>
          <a
            href={`/product${product.categories[0]?.slug ? `?category=${product.categories[0]?.slug}` : ""}`}
            className="hover:text-primary transition-colors"
          >
            {product.categories[0]?.name || "Shop"}
          </a>
          <span>/</span>
          <span className="text-gray-900 dark:text-white">{product.name}</span>
        </nav>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-24">
        <div className="lg:sticky lg:top-32">
          <ProductGallery images={product.images} name={product.name} />
        </div>
        <div>
          <ProductInfo product={product} />
        </div>
      </div>

      <div className="mb-32">
        <ProductTabs description={product.description} />
      </div>

      {/* Related Products Section */}
      <section className="border-t border-gray-100 dark:border-white/10 pt-16 pb-12 mt-8">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-10">
          You might also like
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {relatedProducts.map((p) => (
            <div key={p.slug}>
              <ProductCard
                id={p.id}
                slug={p.slug}
                title={p.name}
                price={parseInt(p.price)}
                image={p.images[0] || ""}
                description={p.short_description || ""}
                brand={p.categories[0]?.name}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <div className="bg-white dark:bg-background">
      <Container outerStyle="py-8">
        <Suspense fallback={<ProductDetailSkeleton />}>
          <ProductContent params={params} />
        </Suspense>
      </Container>
    </div>
  );
}
