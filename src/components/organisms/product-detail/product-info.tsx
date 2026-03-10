import {
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  Headphones,
  Check,
  Phone,
} from "lucide-react";
import { Product } from "@/features/catalog/types/catalog";
import Link from "next/link";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const rating = product.meta.average_rating
    ? parseFloat(product.meta.average_rating)
    : 4.2;
  const ratingCount = product.meta.rating_count
    ? parseInt(product.meta.rating_count)
    : 128;
  const totalSales = product.meta.total_sales
    ? parseInt(product.meta.total_sales)
    : 0;

  return (
    <div className="flex flex-col h-full">
      {/* Category badge */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        {product.categories[0] && (
          <Link
            href={`/product?category=${product.categories[0].slug}`}
            className="text-[10px] font-semibold uppercase tracking-[0.15em] text-primary bg-primary/10 px-2.5 py-1 hover:bg-primary/20 transition-colors"
          >
            {product.categories[0].name}
          </Link>
        )}
        {product.stock_status === "instock" ? (
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-600">
            <Check className="w-3 h-3" />
            In Stock
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-destructive">
            <span className="w-1.5 h-1.5 bg-destructive" />
            Out of Stock
          </span>
        )}
      </div>

      {/* Product Name */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground leading-tight mb-3">
        {product.name}
      </h1>

      {/* Rating + Sales */}
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="w-3.5 h-3.5"
              fill={i < Math.round(rating) ? "#fbbf24" : "#e5e7eb"}
              stroke={i < Math.round(rating) ? "#fbbf24" : "#e5e7eb"}
            />
          ))}
        </div>
        <span className="text-xs font-mono font-bold text-foreground">
          {rating.toFixed(1)}
        </span>
        <span className="text-xs text-muted-foreground">
          ({ratingCount} reviews)
        </span>
        {totalSales > 0 && (
          <>
            <span className="text-border">|</span>
            <span className="text-xs text-muted-foreground font-mono">
              {totalSales} sold
            </span>
          </>
        )}
      </div>

      {/* Short Description */}
      <div
        className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-3"
        dangerouslySetInnerHTML={{
          __html:
            product.short_description || product.description.substring(0, 300),
        }}
      />

      {/* Price Block */}
      <div className="border border-border p-5 mb-5 bg-muted/5">
        <span className="text-3xl sm:text-4xl font-mono font-bold text-foreground tracking-tight">
          Available on Request
        </span>
        <p className="text-[11px] text-muted-foreground mt-1.5">
          Contact us for pricing and availability.
        </p>
      </div>

      {/* SKU */}
      {product.sku && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-5">
          <span className="font-semibold uppercase tracking-wider">SKU:</span>
          <span className="font-mono">{product.sku}</span>
        </div>
      )}

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <Link
          href="/contact"
          className="grow bg-primary text-primary-foreground py-3.5 text-xs font-semibold uppercase tracking-wider hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
        >
          <Phone className="w-3.5 h-3.5" />
          Contact Us to Buy
        </Link>
        <a
          href="tel:08124362413"
          className="border border-border py-3.5 px-6 text-xs font-semibold uppercase tracking-wider text-foreground hover:border-primary hover:text-primary transition-colors text-center"
        >
          Call Now
        </a>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5 border-t border-border mt-auto">
        {[
          { icon: Truck, label: "Free Shipping" },
          { icon: ShieldCheck, label: "2 Year Warranty" },
          { icon: RotateCcw, label: "30 Days Return" },
          { icon: Headphones, label: "24/7 Support" },
        ].map((badge, i) => (
          <div key={i} className="flex items-center gap-2 py-2">
            <badge.icon className="w-4 h-4 text-primary shrink-0" />
            <span className="text-[10px] font-medium text-muted-foreground tracking-wide leading-tight">
              {badge.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
