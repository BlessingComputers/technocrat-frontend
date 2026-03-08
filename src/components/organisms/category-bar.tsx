import Link from "next/link";
import { getRootCategories } from "@/lib/data";

export function CategoryBar() {
  const categories = getRootCategories();

  if (categories.length === 0) return null;

  return (
    <div className="bg-card border-y border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex overflow-x-auto scrollbar-hide">
          <Link
            href="/product"
            className="shrink-0 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors border-r border-border"
          >
            All Products
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/product?category=${cat.slug}`}
              className="shrink-0 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors border-r border-border flex items-center gap-2"
            >
              {cat.name}
              <span className="text-[10px] text-muted-foreground/60 font-mono">
                {cat.count}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
