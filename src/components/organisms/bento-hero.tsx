import Image from "next/image";
import Link from "next/link";
import { getFeaturedProducts, getRootCategories } from "@/lib/data";
import { ArrowRight } from "lucide-react";

export function BentoHero() {
  const products = getFeaturedProducts(2);
  const categories = getRootCategories().slice(0, 6);
  const main = products[0];
  const secondary = products[1];

  if (!main) return null;

  return (
    <section className="container mx-auto px-4 lg:px-8 py-6">
      <div className="grid grid-cols-12 auto-rows-[180px] lg:auto-rows-[200px] gap-1">
        {/* Cell A — Main featured product */}
        <div className="col-span-12 lg:col-span-8 row-span-2 relative bg-card border border-border overflow-hidden group">
          <div className="absolute top-4 left-4 z-10">
            <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-primary bg-primary/10 px-2 py-1">
              Featured
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 h-full">
            <div className="flex flex-col justify-center p-6 lg:p-10">
              <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground mb-2">
                {main.categories[0]?.name || "Electronics"}
              </span>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-foreground mb-3 line-clamp-2">
                {main.name}
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-2 max-w-sm">
                {main.short_description
                  ?.replace(/(<([^>]+)>)/gi, "")
                  .replace(/&nbsp;/g, " ") ||
                  "Premium quality electronics for professionals."}
              </p>
              <div className="flex items-center gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 text-xs font-semibold uppercase tracking-wider hover:bg-primary/90 transition-colors"
                >
                  Contact to Buy
                </Link>
                <Link
                  href={`/product/${main.slug}`}
                  className="inline-flex items-center gap-2 border border-border px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  View Specs
                </Link>
              </div>
            </div>
            <div className="relative hidden md:block">
              {main.images[0] && (
                <Image
                  src={main.images[0]}
                  alt={main.name}
                  fill
                  className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
              )}
            </div>
          </div>
        </div>

        {/* Cell B — Electric Bikes promo (Spiro) */}
        <div className="col-span-6 lg:col-span-4 row-span-1 relative bg-card border border-border overflow-hidden group">
          <a
            href="https://rideahead.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 z-10"
          />
          <Image
            src="/assets/spiro.jpeg"
            alt="Ride Ahead — Electric Bikes on Hire Purchase"
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 via-black/40 to-transparent p-4 z-5">
            <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/60 block mb-0.5">
              Hire Purchase
            </span>
            <h3 className="text-sm font-semibold text-white line-clamp-1">
              Electric Bikes — Ride Ahead
            </h3>
          </div>
        </div>

        {/* Cell C — Corporate promo */}
        <div className="col-span-6 lg:col-span-4 row-span-1 bg-primary text-primary-foreground p-6 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-primary-foreground/70 block mb-2">
              Enterprise
            </span>
            <h3 className="text-base lg:text-lg font-bold tracking-tight mb-1">
              Corporate bulk pricing available
            </h3>
            <p className="text-xs text-primary-foreground/70">
              Volume discounts for organizations
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider mt-3 hover:gap-3 transition-all"
          >
            Get a Quote <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Cell D — Category quick-links */}
        <div className="col-span-6 lg:col-span-4 row-span-1 bg-card border border-border p-5 flex flex-col">
          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-3">
            Categories
          </span>
          <div className="flex flex-wrap gap-1.5 grow items-start content-start">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/product?category=${cat.slug}`}
                className="text-[10px] font-medium uppercase tracking-wider border border-border px-2.5 py-1 text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Cell E — Secondary product */}
        {secondary && (
          <div className="col-span-6 lg:col-span-4 row-span-1 relative bg-card border border-border overflow-hidden group">
            <Link
              href={`/product/${secondary.slug}`}
              className="absolute inset-0 z-10"
            />
            {secondary.images[0] && (
              <Image
                src={secondary.images[0]}
                alt={secondary.name}
                fill
                className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 1024px) 50vw, 33vw"
              />
            )}
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 via-black/40 to-transparent p-4 z-5">
              <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/60 block mb-0.5">
                {secondary.categories[0]?.name}
              </span>
              <h3 className="text-sm font-semibold text-white line-clamp-1">
                {secondary.name}
              </h3>
            </div>
          </div>
        )}

        {/* Cell F — Stats */}
        <div className="col-span-12 lg:col-span-4 row-span-1 bg-secondary text-secondary-foreground p-6 flex items-center justify-around">
          <div className="text-center">
            <span className="text-2xl lg:text-3xl font-mono font-bold block">
              16k+
            </span>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Products
            </span>
          </div>
          <div className="w-px h-10 bg-border" />
          <div className="text-center">
            <span className="text-2xl lg:text-3xl font-mono font-bold block">
              20+
            </span>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Years
            </span>
          </div>
          <div className="w-px h-10 bg-border" />
          <div className="text-center">
            <span className="text-2xl lg:text-3xl font-mono font-bold block">
              5k+
            </span>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Clients
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
