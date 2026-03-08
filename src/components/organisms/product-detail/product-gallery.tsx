"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  const displayImages =
    images.length > 0 ? images : ["/assets/placeholder.png"];

  const prev = () =>
    setSelectedImage((i) =>
      i === 0 ? displayImages.length - 1 : i - 1,
    );
  const next = () =>
    setSelectedImage((i) =>
      i === displayImages.length - 1 ? 0 : i + 1,
    );

  return (
    <div className="flex flex-col gap-3">
      {/* Main Image */}
      <div className="relative aspect-[4/3] lg:aspect-[16/10] bg-muted/5 border border-border overflow-hidden group">
        <Image
          src={displayImages[selectedImage]}
          alt={name}
          fill
          priority
          className="object-contain p-8 sm:p-12 lg:p-16 transition-transform duration-500 group-hover:scale-105"
          sizes="100vw"
        />

        {/* Nav arrows */}
        {displayImages.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary hover:text-primary-foreground hover:border-primary"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary hover:text-primary-foreground hover:border-primary"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Counter */}
        <div className="absolute bottom-3 right-3 bg-foreground text-background px-2.5 py-1">
          <span className="font-mono text-[10px] font-bold">
            {selectedImage + 1} / {displayImages.length}
          </span>
        </div>
      </div>

      {/* Thumbnail Strip */}
      {displayImages.length > 1 && (
        <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
          {displayImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={cn(
                "relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 overflow-hidden border-2 transition-all p-1 bg-muted/5",
                selectedImage === index
                  ? "border-primary"
                  : "border-border opacity-50 hover:opacity-100 hover:border-primary/40",
              )}
            >
              <Image
                src={image}
                alt={`${name} view ${index + 1}`}
                fill
                className="object-contain"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
