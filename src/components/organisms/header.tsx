"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import { Logo } from "@/components/atoms/logo";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { useCategoriesQuery } from "@/features/catalog/model/catalog-queries";
import { useCustomerProfileQuery } from "@/features/auth/model/auth-queries";
import type { CatalogCategory } from "@/features/catalog/types/catalog";

const NAV_LINKS = [
  { label: "Products", href: "/product" },
  { label: "Services", href: "/services" },
  { label: "Company", href: "/company" },
  { label: "Contact", href: "/contact" },
];

function navLinkClassName(isActive: boolean) {
  return cn(
    "group relative py-2 text-sm font-medium transition-colors",
    isActive
      ? "text-foreground"
      : "text-muted-foreground hover:text-foreground",
  );
}

function navLinkUnderlineClassName(isActive: boolean) {
  return cn(
    "absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-primary transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:transition-none",
    isActive && "scale-x-100",
  );
}

/**
 * Reads `usePathname()` to highlight the active link. Rendering this in its
 * own component (rather than in `Header` directly) keeps the dynamic hook
 * out of `Header`'s own render — only this subtree needs the Suspense
 * boundary, so the rest of the header still prerenders as static shell.
 * See https://nextjs.org/docs/messages/blocking-prerender-client-hook.
 */
function HeaderNavLinks() {
  const pathname = usePathname();

  return (
    <>
      {NAV_LINKS.map(({ href, label }) => {
        const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
        return (
          <Link key={href} href={href} className={navLinkClassName(isActive)}>
            {label}
            <span aria-hidden className={navLinkUnderlineClassName(isActive)} />
          </Link>
        );
      })}
    </>
  );
}

/** Static fallback for `HeaderNavLinks` — same links, no active state yet. */
function HeaderNavLinksFallback() {
  return (
    <>
      {NAV_LINKS.map(({ href, label }) => (
        <Link key={href} href={href} className={navLinkClassName(false)}>
          {label}
          <span aria-hidden className={navLinkUnderlineClassName(false)} />
        </Link>
      ))}
    </>
  );
}

/**
 * Closes the mobile menu/search dialog on route change. Isolated in its own
 * component (instead of reading `usePathname()` in `Header`) for the same
 * reason as `HeaderNavLinks` above — it renders nothing, so its Suspense
 * fallback is `null` and there's no visible difference while it streams in.
 */
function RouteChangeCloser({ onNavigate }: { onNavigate: () => void }) {
  const pathname = usePathname();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      onNavigate();
    }
  }, [pathname, onNavigate]);

  return null;
}

function IconAction({
  href,
  icon,
  label,
  onClick,
}: {
  href?: string;
  icon: string;
  label: string;
  onClick?: () => void;
}) {
  const content = (
    <>
      <Icon icon={icon} className="size-5" />
      <span className="text-[11px] font-medium">{label}</span>
    </>
  );
  const className =
    "flex flex-col items-center gap-1 rounded-md px-2 py-1 text-foreground/70 transition-colors hover:text-foreground";

  if (href) {
    return (
      <Link href={href} className={className} aria-label={label}>
        {content}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={className} aria-label={label}>
      {content}
    </button>
  );
}

function CategoriesMenu({ categories }: { categories: CatalogCategory[] }) {
  if (categories.length === 0) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1.5 rounded-md px-2 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground focus-visible:outline-none">
        <Icon icon="solar:hamburger-menu-linear" className="size-4" />
        All Categories
        <Icon icon="solar:alt-arrow-down-linear" className="size-3.5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64">
        <DropdownMenuItem asChild>
          <Link href="/product" className="font-medium">
            All Products
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {categories.map((category) =>
          category.children.length > 0 ? (
            <DropdownMenuSub key={category.id}>
              <DropdownMenuSubTrigger>{category.name}</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem asChild>
                  <Link href={`/product?category=${category.slug}`}>
                    All {category.name}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {category.children.map((child) => (
                  <DropdownMenuItem key={child.id} asChild>
                    <Link href={`/product?category=${child.slug}`}>
                      {child.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          ) : (
            <DropdownMenuItem key={category.id} asChild>
              <Link href={`/product?category=${category.slug}`}>
                {category.name}
              </Link>
            </DropdownMenuItem>
          ),
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function SearchDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/product?search=${encodeURIComponent(query.trim())}`);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="top-24 translate-y-0 gap-0 sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Search Technocrat Stores</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="mt-4 flex items-center gap-2">
          <div className="relative flex-1">
            <Icon
              icon="solar:magnifer-linear"
              className="absolute top-1/2 left-3 size-5 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
              placeholder="Search laptops, phones, generators..."
              className="h-12 w-full rounded-md border border-input bg-background pr-4 pl-11 text-sm outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <button
            type="submit"
            className="flex h-12 items-center justify-center rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Search
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { data: categories = [] } = useCategoriesQuery();
  const { data: profile } = useCustomerProfileQuery();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <div className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
      <Suspense fallback={null}>
        <RouteChangeCloser
          onNavigate={() => {
            setMenuOpen(false);
            setSearchOpen(false);
          }}
        />
      </Suspense>

      <div className="h-0.5 bg-primary" />

      <header className="container relative mx-auto flex h-16 items-center justify-between gap-4 px-4 lg:h-20 lg:px-8">
        <div className="flex shrink-0 items-center gap-4 lg:gap-6">
          <Logo className="w-24 shrink-0 md:w-32" />
          <div className="hidden border-l border-border pl-4 lg:block lg:pl-6">
            <CategoriesMenu categories={categories} />
          </div>
        </div>

        <nav className="hidden items-center gap-5 md:flex lg:gap-8">
          <Suspense fallback={<HeaderNavLinksFallback />}>
            <HeaderNavLinks />
          </Suspense>
        </nav>

        <div className="flex items-center gap-1">
          <IconAction
            icon="solar:magnifer-linear"
            label="Search"
            onClick={() => setSearchOpen(true)}
          />
          <IconAction icon="solar:user-linear" label="Account" href="/account" />
          {profile && (
            <IconAction icon="solar:cart-3-linear" label="Cart" href="/cart" />
          )}

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="ml-1 flex size-9 items-center justify-center rounded-full text-foreground/80 transition-colors hover:bg-muted hover:text-foreground md:hidden"
          >
            <Icon
              icon={menuOpen ? "solar:close-circle-linear" : "solar:hamburger-menu-linear"}
              className="size-5"
            />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={cn(
          "grid overflow-hidden border-border/80 transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none md:hidden",
          menuOpen ? "grid-rows-[1fr] border-t" : "grid-rows-[0fr]",
        )}
      >
        <div className="min-h-0">
          <nav className="flex flex-col gap-1 px-4 py-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground/90 transition-colors hover:bg-muted"
              >
                {link.label}
              </Link>
            ))}

            {categories.length > 0 && (
              <Accordion type="single" collapsible className="mt-1">
                <AccordionItem value="categories" className="border-none">
                  <AccordionTrigger className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground/90 hover:bg-muted hover:no-underline [&[data-state=open]>svg]:rotate-180">
                    All Categories
                  </AccordionTrigger>
                  <AccordionContent className="pl-3">
                    <Link
                      href="/product"
                      className="block rounded-md px-3 py-2 text-sm font-medium text-foreground/90 hover:bg-muted"
                    >
                      All Products
                    </Link>
                    {categories.map((category) => (
                      <div key={category.id}>
                        <Link
                          href={`/product?category=${category.slug}`}
                          className="block rounded-md px-3 py-2 text-sm font-medium text-foreground/90 hover:bg-muted"
                        >
                          {category.name}
                        </Link>
                        {category.children.length > 0 && (
                          <div className="ml-3 border-l border-border pl-3">
                            {category.children.map((child) => (
                              <Link
                                key={child.id}
                                href={`/product?category=${child.slug}`}
                                className="block rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                              >
                                {child.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}
          </nav>
        </div>
      </div>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </div>
  );
}
