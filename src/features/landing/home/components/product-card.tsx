"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/helpers/helpers";
import { AddToCartButton } from "@/features/cart";
import type { FeaturedProduct } from "@/features/catalog/api/catalog.service";
import {
  getStockSignal,
  STOCK_DOT_CLASS,
  STOCK_TONE_CLASS,
} from "@/shared/utils/stock-signal";
import { useSavedProducts } from "../model/use-saved-products";

const MAX_SPEC_CHIPS = 3;
/**
 * Chips are an at-a-glance line, not a spec sheet. The live feed mixes short
 * values ("8GB RAM") with sentence-length ones ("32GB (2x16GB) DDR5 4800 DIMM
 * ECC REG Memory"); prefer the short ones so the row reads as designed, and
 * only fall back to truncated long values when a product has nothing shorter.
 */
const MAX_SPEC_CHARS = 28;

function pickSpecChips(
  specifications: Array<{ name: string; value: string }> = [],
): string[] {
  const values = specifications
    .map((spec) => spec.value?.trim())
    .filter((value): value is string => Boolean(value));

  const short = values.filter((value) => value.length <= MAX_SPEC_CHARS);
  return (short.length > 0 ? short : values).slice(0, MAX_SPEC_CHIPS);
}

interface ProductCardProps {
  product: FeaturedProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const { isSaved, toggleSaved } = useSavedProducts();

  const stock = getStockSignal(product);
  const saved = isSaved(product.id);
  const href = `/product/${product.slug}`;

  const specs = pickSpecChips(product.specifications);

  const hasPriceRange =
    product.lowestPrice !== null &&
    product.highestPrice !== null &&
    product.highestPrice > product.lowestPrice;

  return (
    <article className="group flex w-full flex-col overflow-hidden rounded-xl bg-white shadow-[0_4px_2.4px_rgba(0,0,0,0.04)] dark:bg-card">
      <div className="relative h-[260px] shrink-0 overflow-hidden bg-[#f1f3f5] dark:bg-muted">
        <Link href={href} tabIndex={-1} aria-hidden className="block h-full">
          {product.primaryImage ? (
            <Image
              src={product.primaryImage}
              alt=""
              fill
              sizes="(min-width: 1280px) 302px, (min-width: 640px) 45vw, 90vw"
              className="object-contain p-9 transition-transform duration-300 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
          ) : (
            <span className="flex h-full items-center justify-center text-muted-foreground">
              <Icon icon="solar:box-linear" aria-hidden className="size-10" />
            </span>
          )}
        </Link>

        <button
          type="button"
          onClick={() => toggleSaved(product.id)}
          aria-pressed={saved}
          aria-label={
            saved
              ? `Remove ${product.name} from saved items`
              : `Save ${product.name} for later`
          }
          className="absolute top-4 right-4 flex size-8 items-center justify-center rounded-lg border border-[#f1f5f9] bg-white/90 backdrop-blur-[2px] transition-colors hover:bg-white focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none dark:border-border dark:bg-background/80"
        >
          <Icon
            icon={saved ? "solar:heart-bold" : "solar:heart-linear"}
            aria-hidden
            className={cn(
              "size-4",
              saved ? "text-[#d4183d]" : "text-[#62748e] dark:text-muted-foreground",
            )}
          />
        </button>
      </div>

      <div className="flex grow flex-col gap-2 px-4 pt-2 pb-4">
        <div className="flex items-center justify-between gap-3">
          <span className="truncate text-[10px] leading-[15px] font-black tracking-[2px] text-[#1e3a8a] uppercase dark:text-[#93b4ff]">
            {product.brand?.name ?? product.category?.name ?? "Technocrat"}
          </span>
          <span className="flex shrink-0 items-center gap-1.5">
            <span
              aria-hidden
              className={cn("size-1.5 rounded-full", STOCK_DOT_CLASS[stock.tone])}
            />
            <span
              className={cn(
                "text-[9px] leading-[13.5px] font-bold tracking-[0.9px] uppercase",
                STOCK_TONE_CLASS[stock.tone],
              )}
            >
              {stock.label}
            </span>
          </span>
        </div>

        <h3 className="text-[15px] leading-[1.4] font-medium tracking-[-0.3px] text-[#1a1f36] dark:text-foreground">
          <Link
            href={href}
            className="line-clamp-3 rounded-sm hover:underline focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            {product.name}
          </Link>
        </h3>

        {specs.length > 0 && (
          <ul className="flex flex-wrap gap-1.5">
            {specs.map((spec) => (
              <li
                key={spec}
                title={spec}
                className="max-w-[10rem] truncate rounded-[4px] border border-[#e2e8f0] px-[9px] py-[3px] text-[9px] leading-[13.5px] font-medium tracking-[-0.225px] text-[#62748e] dark:border-border dark:text-muted-foreground"
              >
                {spec}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex flex-col gap-4 pt-4">
          <p className="text-base leading-[1.4] font-bold tracking-[-0.32px] text-[#0f172b] dark:text-foreground">
            {product.lowestPrice === null ? (
              <span className="text-muted-foreground">Price on request</span>
            ) : (
              <>
                {hasPriceRange && (
                  <span className="mr-1 text-xs font-medium text-muted-foreground">
                    from
                  </span>
                )}
                {formatPrice(product.lowestPrice)}
              </>
            )}
          </p>

          <div className="flex items-stretch gap-4">
            <QuantityStepper
              value={quantity}
              onChange={setQuantity}
              disabled={!stock.canBuy}
              productName={product.name}
            />
            <AddToCartButton
              productId={product.id}
              quantity={quantity}
              availabilityStatus={product.availabilityStatus}
              className="h-12 flex-1 rounded-lg bg-[#50a664] px-6 text-base leading-6 font-medium text-white hover:bg-[#469259]"
            />
          </div>
        </div>
      </div>
    </article>
  );
}

const MAX_QUANTITY = 99;

function QuantityStepper({
  value,
  onChange,
  disabled,
  productName,
}: {
  value: number;
  onChange: (next: number) => void;
  disabled: boolean;
  productName: string;
}) {
  return (
    <div
      className={cn(
        "flex h-12 items-center gap-3 rounded-lg border border-[#e8e8e8] px-2 dark:border-border",
        disabled && "opacity-50",
      )}
    >
      <StepperButton
        icon="tabler:minus"
        label={`Decrease quantity of ${productName}`}
        disabled={disabled || value <= 1}
        onClick={() => onChange(Math.max(1, value - 1))}
      />
      <span
        aria-live="polite"
        className="min-w-4 text-center text-base tracking-[-0.32px] text-foreground tabular-nums"
      >
        {value}
      </span>
      <StepperButton
        icon="ic:round-plus"
        label={`Increase quantity of ${productName}`}
        disabled={disabled || value >= MAX_QUANTITY}
        onClick={() => onChange(Math.min(MAX_QUANTITY, value + 1))}
      />
    </div>
  );
}

function StepperButton({
  icon,
  label,
  disabled,
  onClick,
}: {
  icon: string;
  label: string;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex size-4 items-center justify-center rounded-sm text-foreground transition-opacity hover:opacity-70 focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-30 motion-reduce:transition-none"
    >
      <Icon icon={icon} aria-hidden className="size-4" />
    </button>
  );
}
