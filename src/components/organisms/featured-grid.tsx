import { getFeaturedProducts } from "@/lib/data";
import { ProductCard } from "@/components/molecules/product-card";
import { Container } from "@/components/templates/container";
import { SectionHeader } from "@/components/molecules/section-header";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export async function FeaturedGrid() {
  const products = await getFeaturedProducts(8);

  if (products.length === 0) return null;

  return (
    <Container>
      <SectionHeader
        tag="Top Picks"
        title={{ span: "Featured", rest: "Products" }}
        description="Hand-picked selections from our extensive catalog of professional-grade hardware."
        action={
          <Link
            href="/product"
            className="inline-flex items-center gap-2 border border-border px-5 py-2 text-xs font-semibold uppercase tracking-wider text-foreground hover:border-primary hover:text-primary transition-colors"
          >
            View All <ArrowRight className="w-3 h-3" />
          </Link>
        }
      />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            slug={product.slug}
            title={product.name}
            brand={product.categories[0]?.name}
            image={product.images[0] || "/assets/placeholder.png"}
            description={product.short_description || ""}
            href={`/product/${product.slug}`}
          />
        ))}
      </div>
      <div className="flex justify-center mt-8 lg:hidden">
        <Link
          href="/product"
          className="inline-flex items-center gap-2 border border-border px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-foreground hover:border-primary hover:text-primary transition-colors w-full justify-center"
        >
          View All Products <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </Container>
  );
}
