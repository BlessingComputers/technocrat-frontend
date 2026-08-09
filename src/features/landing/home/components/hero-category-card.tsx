import Image from "next/image";
import Link from "next/link";
import type { FeaturedCategoryCard } from "@/features/catalog/api/catalog.service";

export function HeroCategoryCard({
  image,
  label,
  name,
  href,
}: FeaturedCategoryCard) {
  return (
    <Link
      href={href}
      className="group relative aspect-[5/6] w-64 shrink-0 snap-start overflow-hidden rounded-3xl bg-card sm:w-72"
    >
      <Image
        src={image}
        alt={name}
        fill
        className="object-contain p-8 transition-transform duration-300 group-hover:scale-105"
        sizes="(max-width: 640px) 256px, 288px"
      />
      <div className="absolute inset-x-4 bottom-4 flex flex-col gap-1.5 rounded-xl bg-foreground/85 px-4 py-2 shadow-sm">
        <p className="text-xs font-semibold tracking-wide text-background/70">
          {label.toUpperCase()}
        </p>
        <p className="truncate text-sm font-medium text-background">{name}</p>
      </div>
    </Link>
  );
}
