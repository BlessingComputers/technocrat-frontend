"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ZoomIn } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  const displayImages =
    images.length > 0 ? images : ["/assets/placeholder.png"];

  return (
    <div className="flex flex-col-reverse sm:flex-row gap-4 h-full">
      {/* Thumbnails — vertical strip on the left (desktop), horizontal below (mobile) */}
      <div className="flex sm:flex-col gap-2.5 overflow-x-auto sm:overflow-y-auto sm:max-h-[520px] pb-2 sm:pb-0 scrollbar-hide shrink-0">
        {displayImages.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={cn(
              "relative min-w-[64px] w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-lg overflow-hidden border-2 transition-all duration-200 p-1.5 bg-gray-50 dark:bg-muted/30 shrink-0",
              selectedImage === index
                ? "border-primary ring-2 ring-primary/20 shadow-sm"
                : "border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 opacity-60 hover:opacity-100",
            )}
          >
            <Image
              src={image}
              alt={`${name} view ${index + 1}`}
              fill
              className="object-contain mix-blend-multiply dark:mix-blend-normal"
              sizes="72px"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="relative grow aspect-square bg-linear-to-br from-gray-50 to-gray-100/50 dark:from-muted/20 dark:to-muted/5 rounded-2xl overflow-hidden group flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedImage}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="relative w-full h-full p-8 sm:p-12"
          >
            <Image
              src={displayImages[selectedImage]}
              alt={name}
              fill
              priority
              className="object-contain mix-blend-multiply dark:mix-blend-normal transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Zoom hint on hover */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-1.5 bg-white/90 dark:bg-card/90 backdrop-blur-sm text-xs font-medium text-gray-600 dark:text-muted-foreground px-3 py-1.5 rounded-full shadow-sm">
            <ZoomIn className="w-3.5 h-3.5" />
            Hover to zoom
          </div>
        </div>
      </div>
    </div>
  );
}
