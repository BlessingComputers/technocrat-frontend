"use client";

import { CATEGORY_DATA } from "../data/mock-filter";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

export function Filter() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const router = useRouter();

  function handleCategoryClick(id: string, slug: string) {
    setActiveCategory(id);
    router.push(`?categoryId=${slug}`);
  }

  return (
    <div className="w-full container mx-auto overflow-x-auto pb-4 no-scrollbar scrollbar-hide">
      <div className="flex gap-3 min-w-max px-1 no-scrollbar">
        {CATEGORY_DATA.map((category) => {
          const isActive = activeCategory === category.categoryId;

          return (
            <button
              key={category.categoryId}
              onClick={() =>
                handleCategoryClick(category.categoryId, category.slug)
              }
              className={cn(
                "flex items-center gap-2 cursor-pointer px-4 py-2.5 rounded-full border transition-all duration-200",
                isActive
                  ? "bg-primary border-primary-dark text-white"
                  : "bg-muted border-border text-paragrapgh hover:border-primary-dark hover:text-white hover:bg-primary/80",
              )}
            >
              <Icon
                icon={category.icon}
                className={cn(
                  "w-5 h-5 hover:text-white",
                  isActive ? "text-white" : "",
                )}
              />

              <span className="font-medium text-sm whitespace-nowrap">
                {category.name}
              </span>

              {/* <span
                className={cn(
                  "text-xs px-1.5 py-0.5 rounded-md font-medium min-w-[20px] text-center",
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-gray-100 text-gray-500",
                )}
              >
                {formatCount(category.itemCount)}
              </span> */}
            </button>
          );
        })}
      </div>
    </div>
  );
}
