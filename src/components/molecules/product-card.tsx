import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { Heart, ShoppingCart, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HoverLift } from "@/components/animations/motion-components";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/helpers/helpers";

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
  colors?: string[]; // Colors for the dots
  className?: string;
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
  colors = ["bg-black", "bg-blue-600", "bg-pink-500", "bg-gray-200"], // Default colors if none provided
  className,
}: ProductCardProps) {
  const productHref = href || (slug ? `/product/${slug}` : `/product/${id}`);
  const CardContent = (
    <>
      {/* Image Area */}
      <div className="relative aspect-square w-full mb-3 sm:mb-4 bg-gray-50/50 dark:bg-muted/30 rounded-lg overflow-hidden flex items-center justify-center p-3 sm:p-4">
        <Link href={productHref}>
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain mix-blend-multiply dark:mix-blend-normal transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </Link>
        {badge && (
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            <span className="bg-primary text-white text-[8px] sm:text-[10px] font-black uppercase tracking-widest px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-lg">
              {badge}
            </span>
          </div>
        )}
      </div>

      {/* Carousel Indicators Placeholder */}
      {/* <div className="flex items-center justify-center gap-3 mb-4 text-gray-400 group-hover:text-primary transition-colors">
          <button className="hover:text-gray-800 dark:hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-medium tracking-wide">1 of 4</span>
          <button className="hover:text-gray-800 dark:hover:text-white transition-colors">
            <ArrowRight className="w-4 h-4" />
          </button>
        </div> */}

      {/* Content Area */}
      <div className="flex flex-col grow">
        {brand && (
          <div className="mb-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60">
              {brand}
            </span>
          </div>
        )}
        {productHref ? (
          <Link
            href={productHref}
            className="hover:text-primary text-foreground transition-colors"
          >
            <h3 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base line-clamp-1">
              {title}
            </h3>
          </Link>
        ) : (
          <h3 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base line-clamp-1">
            {title}
          </h3>
        )}
        <div className="text-xs sm:text-sm text-gray-500 dark:text-muted-foreground mb-3 sm:mb-4 line-clamp-2 leading-relaxed min-h-10">
          {description
            ? description.replace(/(<([^>]+)>)/gi, "").replace(/&nbsp;/g, " ")
            : ""}
        </div>

        {/* Installment Text Placeholder */}
        {/* <div className="flex items-center gap-1 sm:gap-2 mb-3 sm:mb-4 text-[10px] sm:text-xs font-medium text-primary">
          <svg
            className="w-3 h-3 sm:w-4 sm:h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="2" y="5" width="20" height="14" rx="2" />
            <line x1="2" y1="10" x2="22" y2="10" />
          </svg>
          Buy in installments
        </div> */}

        <div className="mt-auto">
          {/* Price and Colors Row */}
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <span className="text-base sm:text-sm font-bold text-gray-900 dark:text-white">
              {/* {price ? `${formatPrice(price)}` : "Available on Request"} */}
              Available on Request
            </span>
            <Link
              className="text-primary underline underline-offset-4 hover:text-primary/80"
              href={productHref}
            >
              Specs
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 w-full">
            {/* <Button
              variant="outline"
              className="flex-1 rounded-full h-8 sm:h-10 px-2 sm:px-4 text-[10px] sm:text-sm border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-muted text-gray-700 dark:text-muted-foreground bg-white dark:bg-card"
            >
              <Heart className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Wishlist
            </Button> */}

            <Button
              asChild
              className="flex-1 rounded-full h-8 sm:h-10 px-2 sm:px-4 text-[10px] sm:text-sm bg-primary hover:bg-primary/90 text-white border-0 transition-colors"
            >
              <Link href="/contact">
                <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Buy
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <HoverLift
      y={-4}
      duration={0.3}
      className={cn(
        "group bg-white dark:bg-card rounded-xl border border-gray-100 dark:border-white/10 p-3 sm:p-5 flex flex-col h-full hover:shadow-xl transition-all duration-300",
        className,
      )}
    >
      {CardContent}
    </HoverLift>
  );
}
