"use client";

import { Logo } from "@/components/atoms/logo";
import { SearchBar } from "@/components/atoms/searchbar";
import { Filter } from "@/features/catalog/components/filter";
import { ShoppingCart, User, Menu, Heart } from "lucide-react";
import { Activity, useState } from "react";
import { Button } from "@/components/ui/button";
// import { ModeToggle } from "../atoms/theme-toggle";
import Link from "next/link";

export function Header() {
  const [isAuthenticated] = useState(true);

  return (
    <div className="w-full backdrop-filter backdrop-blur-lg bg-card border-b border-gray-100 dark:border-white/10 sticky top-0 z-50 transition-colors duration-300">
      <header className="container mx-auto px-4 py-3 sm:py-4 flex flex-row items-center justify-between gap-4 md:gap-8 text-secondary-foreground">
        {/* Top Row / Logo & Mobile Actions */}
        <div className="flex w-full md:w-auto items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {/* <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-secondary-foreground/80"
            >
              <Menu className="w-6 h-6" />
            </Button> */}
            <Logo className="w-30 md:w-36 lg:w-44" />
          </div>

          {/* Mobile Only Actions */}
          {/* <div className="flex items-center gap-3 md:hidden">
            <div className="relative cursor-pointer">
              <Heart className="w-6 h-6 text-secondary-foreground/80" />
            </div>
            <div className="relative cursor-pointer">
              <ShoppingCart className="w-6 h-6 text-secondary-foreground/80" />
              <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[9px] font-bold px-1 py-0.5 rounded-full border border-white dark:border-background">
                0
              </span>
            </div>
            <ModeToggle />
          </div> */}
        </div>

        {/* Search Bar Section - Full width on mobile, max-w-2xl on desktop */}
        {/* <div className="w-full md:grow flex items-center gap-2 order-3 md:order-2">
          <SearchBar
            variant="header"
            placeholder="Search for GPUs, CPUs, Laptops..."
            className="w-full bg-gray-50 dark:bg-card border border-gray-200 dark:border-white/10 rounded-full"
          />
        </div> */}

        {/* <div className="hidden md:flex items-center gap-4 lg:gap-6 order-2 md:order-3">
          <div className="flex items-center gap-4">
            <Activity mode={isAuthenticated ? "hidden" : "visible"}>
              <Button className="bg-primary hover:bg-primary/80 text-white font-medium px-5 lg:px-6 py-2 rounded-2xl transition-all shadow-sm">
                Sign In
              </Button>
            </Activity>

            <Activity mode={isAuthenticated ? "visible" : "hidden"}>
              <div className="relative cursor-pointer hover:text-primary transition-colors">
                <Heart className="w-6 h-6 text-secondary-foreground/80" />
              </div>

              <div className="relative cursor-pointer hover:text-primary transition-colors">
                <ShoppingCart className="w-6 h-6 text-secondary-foreground/80" />
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white dark:border-background">
                  0
                </span>
              </div>

              <div className="cursor-pointer hover:text-primary transition-colors">
                <User className="w-6 h-6 text-secondary-foreground/80" />
              </div>
              <Button
                variant="ghost"
                className="text-secondary-foreground font-medium px-5 lg:px-6 py-2 rounded-xl border border-white/10 hover:bg-white/5 transition-all"
              >
                Sign Out
              </Button>
            </Activity>
            <ModeToggle />
          </div>
        </div> */}
        <div className="flex gap-4 items-center">
          <Link
            href="/contact"
            className="text-secondary-foreground whitespace-nowrap font-medium px-5 lg:px-6 py-2 rounded-full bg-primary border border-white/10 hover:bg-white/5 transition-all"
          >
            Contact Us
          </Link>
          {/* <ModeToggle /> */}
        </div>
      </header>

      {/* Navigation / Filter Section - Horizontal scrollable on small screens */}
      {/* <div className="bg-secondary/3 backdrop-filter backdrop-blur-lg py-1 sm:py-2 transition-colors duration-300 border-t border-white/5">
        <Filter />
      </div> */}
    </div>
  );
}
