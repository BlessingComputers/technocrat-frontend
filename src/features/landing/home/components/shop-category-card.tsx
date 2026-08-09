import Image from "next/image";
import Link from "next/link";
import type { FeaturedCategoryCard } from "@/features/catalog/api/catalog.service";

export function ShopCategoryCard({
  image,
  label,
  href,
}: FeaturedCategoryCard) {
  return (
    <Link
      href={href}
      className="group flex w-[260px] shrink-0 snap-start flex-col gap-4 sm:w-[300px]"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-muted">
        <Image
          src={image}
          alt={label}
          fill
          className="object-contain p-5 transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 260px, 300px"
        />
      </div>
      <p className="text-xl font-semibold tracking-tight text-foreground">
        {label}
      </p>
    </Link>
  );
}
