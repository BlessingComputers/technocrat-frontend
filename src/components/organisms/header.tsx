import { Logo } from "@/components/atoms/logo";
import Link from "next/link";

export function Header() {
  return (
    <div className="w-full bg-card border-b border-border sticky top-0 z-50">
      {/* Accent line */}
      <div className="h-0.5 bg-primary" />

      <header className="container mx-auto px-4 lg:px-8 py-3 flex items-center justify-between gap-6">
        <Logo className="w-28 md:w-36" />

        <nav className="flex items-center gap-5 lg:gap-6">
          <Link
            href="/product"
            className="hidden sm:inline text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
          >
            Products
          </Link>
          <Link
            href="/blog"
            className="hidden sm:inline text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className="bg-primary text-primary-foreground px-5 py-2 text-xs font-semibold uppercase tracking-wider hover:bg-primary/90 transition-colors"
          >
            Contact Us
          </Link>
        </nav>
      </header>
    </div>
  );
}
