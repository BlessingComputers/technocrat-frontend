"use client";

import { useState } from "react";
import {
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  Headphones,
  Heart,
  ShoppingCart,
  Minus,
  Plus,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/helpers/helpers";
import { cn } from "@/lib/utils";
import { Product } from "@/features/catalog/types/catalog";
import { useRouter } from "next/navigation";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  function handleContactUs() {
    router.push("/contact");
  }

  const trustBadges = [
    { icon: Truck, label: "Free Shipping" },
    { icon: ShieldCheck, label: "2 Year Warranty" },
    { icon: RotateCcw, label: "30 Days Return" },
    { icon: Headphones, label: "24/7 Support" },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Category + Stock Status */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-primary text-xs font-bold uppercase tracking-[0.15em]">
          {product.categories[0]?.name || "Professional Series"}
        </span>
        <span className="text-gray-300 dark:text-white/20">·</span>
        {product.stock_status === "instock" ? (
          <span className="inline-flex items-center gap-1.5 text-emerald-600 text-xs font-semibold">
            <Check className="w-3.5 h-3.5" />
            In Stock
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-red-500 text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            Out of Stock
          </span>
        )}
      </div>

      {/* Product Name */}
      <h1 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-extrabold tracking-tight text-gray-900 dark:text-white leading-[1.15]">
        {product.name}
      </h1>

      {/* Rating Row */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="w-4 h-4"
              fill={i < 4 ? "#fbbf24" : "#e5e7eb"}
              stroke={i < 4 ? "#fbbf24" : "#e5e7eb"}
            />
          ))}
        </div>
        <span className="text-sm font-bold text-gray-900 dark:text-white">
          4.2
        </span>
        <span className="text-sm text-gray-400">(128 Reviews)</span>
      </div>

      {/* Description */}
      <div
        className="text-[15px] text-gray-500 dark:text-muted-foreground leading-relaxed max-w-lg line-clamp-4"
        dangerouslySetInnerHTML={{
          __html:
            product.short_description || product.description.substring(0, 300),
        }}
      />

      {/* Pricing Card */}
      <div className="bg-gray-50/80 dark:bg-card border border-gray-100 dark:border-white/10 px-6 py-5 rounded-2xl">
        <div className="flex items-baseline gap-3">
          <span className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            {product.price
              ? formatPrice(parseInt(product.price))
              : "Price on Request"}
          </span>
          {product.regular_price && product.regular_price !== product.price && (
            <span className="text-lg text-gray-400 line-through">
              Available on Request
              {/* {formatPrice(parseInt(product.regular_price))} */}
            </span>
          )}
        </div>
        <p className="text-xs text-gray-400 mt-1.5 font-medium">
          Includes local VAT & shipping
        </p>
      </div>

      {/* Quantity + Actions */}
      <div className="flex items-stretch gap-3 pt-2">
        {/* Quantity Selector */}
        {/* <div className="flex items-center bg-gray-100 dark:bg-muted/50 rounded-xl border border-gray-200 dark:border-white/10">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-11 h-12 flex items-center justify-center text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-10 text-center font-bold text-gray-900 dark:text-white text-sm tabular-nums">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-11 h-12 flex items-center justify-center text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div> */}

        {/* Add to Cart */}
        <Button
          onClick={handleContactUs}
          className="grow h-12 rounded-xl bg-primary hover:bg-primary/85 disabled:cursor-not-allowed text-white font-bold text-sm tracking-wide shadow-lg shadow-primary/15 transition-all duration-200 active:scale-[0.98]"
        >
          {/* <ShoppingCart className="w-4 h-4 mr-2.5" /> */}
          Contact us to buy
        </Button>

        {/* Wishlist */}
        {/* <Button
          variant="outline"
          disabled
          size="icon"
          className="h-12 w-12 rounded-xl border-gray-200 dark:border-white/10 hover:border-primary hover:text-primary transition-all duration-200 shrink-0"
        >
          <Heart className="w-4.5 h-4.5" />
        </Button> */}
      </div>

      {/* Trust Badges — horizontal row */}
      <div className="flex items-center justify-between gap-2 pt-6 border-t border-gray-100 dark:border-white/10 mt-2">
        {trustBadges.map((badge, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-2 text-center group flex-1"
          >
            <div className="w-9 h-9 rounded-full bg-primary/5 dark:bg-primary/10 flex items-center justify-center text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:shadow-md group-hover:shadow-primary/20">
              <badge.icon className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-semibold text-gray-500 dark:text-muted-foreground tracking-wide leading-tight">
              {badge.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
