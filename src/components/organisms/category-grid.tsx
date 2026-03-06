"use client";

import { useGetCategoriesQuery } from "@/features/catalog/api/catalog-api";
import { Container } from "@/components/templates/container";
import { FadeIn, ViewIn } from "@/components/animations/motion-components";
import Link from "next/link";
import {
  ArrowRight,
  Laptop,
  Cpu,
  Network,
  Monitor,
  HardDrive,
  Smartphone,
} from "lucide-react";
import { useState, useEffect } from "react";

import { SectionHeader } from "../molecules/section-header";

const categoryIcons: Record<string, any> = {
  laptops: Laptop,
  "desktop-pcs": Monitor,
  networking: Network,
  processors: Cpu,
  "storage-devices": HardDrive,
  smartphones: Smartphone,
};

export function CategoryExplorer() {
  const { data: categories, isLoading } = useGetCategoriesQuery();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Pick some top-level categories to show
  const displayCategories =
    categories?.filter((c) => c.parent === 0 && c.count > 10).slice(0, 6) || [];

  if (isLoading || !mounted || displayCategories.length === 0) return null;

  return (
    <section className="py-24 bg-gray-50 dark:bg-muted/10">
      <Container>
        <SectionHeader
          tag="Browse Catalog"
          title={{ span: "Shop by ", rest: "Category" }}
          description="Explore our extensive range of high-performance hardware, from powerful enterprise servers to cutting-edge gaming components."
        />
        <div className="flex flex-col md:flex-row md:items-end justify-end my-16 gap-6">
          <Link
            href="/product"
            className="group flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary transition-colors"
          >
            View All Categories{" "}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayCategories.map((category, i) => {
            const Icon = categoryIcons[category.slug] || Laptop;
            return (
              <ViewIn
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                view={{ opacity: 1, y: 0 }}
                delay={i * 0.1}
              >
                <Link
                  href={`/product?page=1&category=${category.slug}`}
                  className="group relative h-48 sm:h-64 rounded-3xl bg-white dark:bg-card backdrop-blur-2xl border border-gray-100 dark:border-white/10 p-8 flex flex-col justify-between overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all active:scale-[0.98]"
                >
                  <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />

                  <div className="relative z-10 w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="relative z-10">
                    <h3 className="text-xl font-black tracking-tight text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors uppercase">
                      {category.name}
                    </h3>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                      {category.count} Products available
                    </p>
                  </div>

                  <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-4 transition-all duration-300">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-lg">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </Link>
              </ViewIn>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
