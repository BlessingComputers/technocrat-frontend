import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  id: number | string;
  slug?: string;
  title: string;
  description: string;
  price: number | null;
  image: string | StaticImageData;
  brand?: string;
  badge?: string;
  href?: string;
  sku?: string;
  stockStatus?: string;
  className?: string;
  variant?: "grid" | "list";
}

export function ProductCard({
  id,
  slug,
  title,
  description,
  price,
  image,
  brand,
  badge,
  href,
  className,
  variant = "grid",
}: ProductCardProps) {
  const productHref = href || (slug ? `/product/${slug}` : `/product/${id}`);
  const cleanDesc = description
    ? description.replace(/(<([^>]+)>)/gi, "").replace(/&nbsp;/g, " ")
    : "";

  if (variant === "list") {
    return (
      <div
        className={cn(
          "group bg-card border border-border flex items-stretch hover:border-primary/40 transition-colors duration-200",
          className,
        )}
      >
        <div className="relative w-40 sm:w-52 shrink-0 bg-muted/10 overflow-hidden">
          <Link href={productHref}>
            <Image
              src={image}
              alt={title}
              fill
              className="object-contain p-4"
              sizes="200px"
            />
          </Link>
          {badge && (
            <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5">
              {badge}
            </span>
          )}
        </div>
        <div className="flex flex-col justify-between p-4 grow min-w-0">
          <div>
            {brand && (
              <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-primary/70 block mb-1">
                {brand}
              </span>
            )}
            <Link
              href={productHref}
              className="hover:text-primary transition-colors"
            >
              <h3 className="font-medium text-sm text-foreground line-clamp-1 mb-1">
                {title}
              </h3>
            </Link>
            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
              {cleanDesc}
            </p>
          </div>
          <div className="flex items-center justify-between mt-3">
            <span className="text-sm font-mono font-bold text-foreground">
              Available on Request
            </span>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 text-xs font-semibold uppercase tracking-wide hover:bg-primary/90 transition-colors"
            >
              Enquire <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "group bg-card border border-border flex flex-col h-full hover:border-primary/40 transition-colors duration-200",
        className,
      )}
    >
      <div className="relative aspect-square w-full bg-muted/10 overflow-hidden">
        <Link href={productHref} className="absolute inset-0 z-10" />
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain p-3 sm:p-4 transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {badge && (
          <span className="absolute top-2 left-2 z-20 bg-primary text-primary-foreground text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5">
            {badge}
          </span>
        )}
      </div>
      <div className="flex flex-col grow p-3 sm:p-4 border-t border-border">
        {brand && (
          <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-primary/70 mb-1">
            {brand}
          </span>
        )}
        <Link
          href={productHref}
          className="hover:text-primary transition-colors"
        >
          <h3 className="font-medium text-sm text-foreground line-clamp-1 mb-1">
            {title}
          </h3>
        </Link>
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-3 min-h-[32px]">
          {cleanDesc}
        </p>
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-mono font-bold text-foreground">
              On Request
            </span>
            <Link
              href={productHref}
              className="text-xs text-primary font-medium hover:underline underline-offset-2"
            >
              Specs
            </Link>
          </div>
          <Link
            href="/contact"
            className="flex items-center justify-center gap-1.5 w-full bg-primary text-primary-foreground py-2 text-xs font-semibold uppercase tracking-wide hover:bg-primary/90 transition-colors"
          >
            Contact to Buy
          </Link>
        </div>
      </div>
    </div>
  );
}
