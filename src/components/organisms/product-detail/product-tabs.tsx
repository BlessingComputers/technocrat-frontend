"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductTabsProps {
  description: string;
  specs?: Record<string, string>;
  reviewsCount?: number;
}

export function ProductTabs({
  description,
  specs,
  reviewsCount = 128,
}: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("specifications");

  const tabs = [
    { id: "specifications", label: "Specifications" },
    { id: "description", label: "Description" },
    // { id: "reviews", label: `Customer Reviews (${reviewsCount})` },
  ];

  const defaultSpecs = {
    Processor: "Intel® Core™ i9-12900H Processor 2.5 GHz",
    Graphics: "NVIDIA® GeForce RTX™ 3060 Laptop GPU, 6GB GDDR6",
    Display: "16.0-inch, 4K (3840 × 2400) OLED 16:10 aspect ratio",
    Memory: "32GB LPDDR5 on board",
    Storage: "1TB M.2 NVMe™ PCIe® 4.0 Performance SSD",
    "I/O Ports":
      "1x USB 3.2 Gen 2 Type-A, 2x Thunderbolt™ 4 supports display / power delivery, 1x HDMI 2.1 FRL, 1x 3.5mm Combo Audio Jack",
    "Keyboard & Touchpad": "Backlit Chiclet Keyboard Per-Key RGBW with N-key R",
    Battery: "96WHrs, 3S2P, 6-cell Li-ion",
  };

  const displaySpecs = specs || defaultSpecs;

  const ratings = [
    { star: 5, pct: 60 },
    { star: 4, pct: 25 },
    { star: 3, pct: 10 },
    { star: 2, pct: 3 },
    { star: 1, pct: 2 },
  ];

  const reviews = [
    {
      initials: "JD",
      name: "John Doe",
      rating: 5,
      date: "2 days ago",
      title: "Excellent performance for creative work",
      text: "The OLED screen is absolutely stunning. The dial is a bit gimmicky at first but actually very useful in Premiere Pro.",
    },
    {
      initials: "AS",
      name: "Alice Smith",
      rating: 4,
      date: "1 week ago",
      title: "Battery life could be better",
      text: "Performance is top notch, but don't expect to be away from a plug for more than 4-5 hours under load.",
    },
  ];

  return (
    <div className="mt-16">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 dark:border-white/10 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-6 py-4 text-sm font-semibold whitespace-nowrap transition-all relative",
              activeTab === tab.id
                ? "text-primary"
                : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200",
            )}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeProductTab"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Content Area — two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-10">
        {/* Main Content (Left) */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {activeTab === "specifications" && (
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
                    Technical Specifications
                  </h3>
                  <div className="border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden">
                    {Object.entries(displaySpecs).map(([key, value], i) => (
                      <div
                        key={key}
                        className={cn(
                          "grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-1 sm:gap-0 px-5 py-4",
                          i !== Object.keys(displaySpecs).length - 1 &&
                            "border-b border-gray-100 dark:border-white/5",
                          i % 2 === 0
                            ? "bg-white dark:bg-transparent"
                            : "bg-gray-50/60 dark:bg-muted/5",
                        )}
                      >
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                          {key}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-muted-foreground leading-relaxed">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "description" && (
                <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none prose-headings:font-bold prose-p:text-gray-500 dark:prose-p:text-muted-foreground prose-p:leading-relaxed">
                  <div dangerouslySetInnerHTML={{ __html: description }} />
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Community Feedback
                  </h3>
                  {reviews.map((review, i) => (
                    <div
                      key={i}
                      className="p-5 rounded-xl bg-gray-50/60 dark:bg-muted/5 border border-gray-100 dark:border-white/5"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                            {review.initials}
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                              {review.name}
                            </h4>
                            <div className="flex gap-0.5 mt-0.5">
                              {[...Array(5)].map((_, j) => (
                                <Star
                                  key={j}
                                  className="w-3 h-3"
                                  fill={
                                    j < review.rating ? "#fbbf24" : "#e5e7eb"
                                  }
                                  stroke={
                                    j < review.rating ? "#fbbf24" : "#e5e7eb"
                                  }
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-xs text-gray-400 font-medium">
                          {review.date}
                        </span>
                      </div>
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-1.5 text-sm">
                        {review.title}
                      </h5>
                      <p className="text-sm text-gray-500 dark:text-muted-foreground leading-relaxed">
                        {review.text}
                      </p>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    className="w-full rounded-xl border-gray-200 dark:border-white/10 h-11 text-sm font-semibold"
                  >
                    View All Reviews
                  </Button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Reviews Sidebar (Right) — always visible */}
        <div className="lg:col-span-5">
          <div className="p-6 rounded-2xl bg-white dark:bg-card border border-gray-100 dark:border-white/10 shadow-sm sticky top-32">
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-5">
              Customer Reviews
            </h4>

            {/* Big Score */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-5xl font-extrabold text-gray-900 dark:text-white tracking-tighter">
                4.2
              </span>
              <div className="flex flex-col gap-1">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4"
                      fill={i < 4 ? "#fbbf24" : "#e5e7eb"}
                      stroke={i < 4 ? "#fbbf24" : "#e5e7eb"}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-400 font-medium">
                  Based on {reviewsCount} reviews
                </span>
              </div>
            </div>

            {/* Rating Bars */}
            <div className="space-y-2.5 mb-6">
              {ratings.map((rating) => (
                <div key={rating.star} className="flex items-center gap-3">
                  <span className="text-xs font-medium w-10 text-gray-500 shrink-0">
                    {rating.star} star
                  </span>
                  <div className="grow h-2 bg-gray-100 dark:bg-muted/30 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${rating.pct}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.8,
                        delay: 0.1 * (5 - rating.star),
                        ease: "easeOut",
                      }}
                      className="h-full bg-amber-400 rounded-full"
                    />
                  </div>
                  <span className="text-xs font-medium w-8 text-right text-gray-400">
                    {rating.pct}%
                  </span>
                </div>
              ))}
            </div>

            {/* Inline Reviews */}
            <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-white/5">
              {reviews.map((review, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-[10px] font-bold">
                        {review.initials}
                      </div>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        {review.name}
                      </span>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, j) => (
                          <Star
                            key={j}
                            className="w-3 h-3"
                            fill={j < review.rating ? "#fbbf24" : "#e5e7eb"}
                            stroke={j < review.rating ? "#fbbf24" : "#e5e7eb"}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-[11px] text-gray-400">
                      {review.date}
                    </span>
                  </div>
                  <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                    {review.title}
                  </h5>
                  <p className="text-xs text-gray-500 dark:text-muted-foreground leading-relaxed">
                    {review.text}
                  </p>
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              className="w-full mt-5 rounded-xl border-gray-200 dark:border-white/10 h-10 text-sm font-semibold"
            >
              View All Reviews
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
