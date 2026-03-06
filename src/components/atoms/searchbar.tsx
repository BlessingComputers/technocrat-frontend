"use client";

import { ArrowRight, Search } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const searchBarVariants = cva(
  "relative flex items-center w-full transition-all group",
  {
    variants: {
      variant: {
        hero: "max-w-2xl mx-auto lg:h-16 h-12",
        header: "max-w-md h-10",
      },
    },
    defaultVariants: {
      variant: "hero",
    },
  },
);

interface SearchBarProps
  extends
    React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof searchBarVariants> {}

export function SearchBar({ className, variant, ...props }: SearchBarProps) {
  return (
    <div className={cn(searchBarVariants({ variant, className }))}>
      <div className="absolute left-5 text-muted-foreground group-focus-within:text-primary transition-colors">
        <Search size={20} strokeWidth={2.5} />
      </div>
      <input
        type="text"
        className={cn(
          "w-full h-full pl-14 pr-5 border-none rounded-full outline-none focus:ring-2 focus:ring-primary/20 transition-all text-paragraph placeholder:text-muted-foreground/60",
          variant === "hero"
            ? "text-xs sm:text-sm lg:text-lg bg-white dark:bg-card shadow-xl"
            : "text-sm bg-customGray dark:bg-muted",
        )}
        placeholder="Search cars, phones, property..."
        {...props}
      />
      {variant === "hero" && (
        <div className="lg:w-12 lg:h-12 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white absolute right-2">
          <ArrowRight className="size-3 lg:size-4" />
        </div>
      )}
    </div>
  );
}
