import { getFeaturedProducts } from "@/lib/data";
import { ProductCard } from "@/components/molecules/product-card";
import { Container } from "@/components/templates/container";
import { SectionHeader } from "@/components/molecules/section-header";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function RecentArrivals() {
  const products = getFeaturedProducts(12).slice(8, 12);

  if (products.length === 0) return null;

  return (
    <Container>
      <SectionHeader
        tag="Latest Updates"
        title={{ span: "Recent", rest: "Arrivals" }}
        description="Stay ahead with our newest hardware additions. Premium workstations and electronics updated daily."
        action={
          <Link
            href="/product"
            className="inline-flex items-center gap-2 border border-border px-5 py-2 text-xs font-semibold uppercase tracking-wider text-foreground hover:border-primary hover:text-primary transition-colors"
          >
            Shop New Drops <ArrowRight className="w-3 h-3" />
          </Link>
        }
      />
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            slug={product.slug}
            title={product.name}
            brand={product.categories[0]?.name}
            price={product.price ? parseInt(product.price) : null}
            image={product.images[0] || "/assets/placeholder.png"}
            description={product.short_description || ""}
            href={`/product/${product.slug}`}
            badge="New"
          />
        ))}
      </div>
    </Container>
  );
}
