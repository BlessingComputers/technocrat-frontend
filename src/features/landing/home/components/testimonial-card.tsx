import Image from "next/image";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import type { Testimonial } from "../data/testimonials";
import {
  CardBlobLarge,
  CardBlobLargeShadow,
  CardBlobSmall,
} from "./testimonial-shapes";

/**
 * One card in the testimonial shelf.
 *
 * `active` is the centre card the section is currently showing; `side` is the
 * pair of smaller siblings flanking it on desktop. The right-hand sibling is
 * the left one mirrored — in Figma its shapes carry a rotate(180deg) plus a
 * vertical flip, which composes to a plain horizontal flip — so both share this
 * component and differ only by `-scale-x-100` on the shape layer.
 *
 * All the geometry below is the Figma frame's own numbers. The percentages on
 * the shadow blob hold across breakpoints because the mobile frame is the
 * desktop one stretched, not re-drawn (see testimonial-shapes.tsx).
 */
export function TestimonialCard({
  testimonial,
  variant,
  mirrored = false,
}: {
  testimonial: Testimonial;
  variant: "active" | "side";
  mirrored?: boolean;
}) {
  const isActive = variant === "active";

  return (
    <div
      className={cn(
        "relative shrink-0",
        // The mobile frame draws the card wider than the section's own gutter,
        // so it bleeds to within 8px of each edge and only narrows below 401px.
        isActive ? "w-[min(385px,100vw_-_16px)] lg:w-[415px]" : "w-[302px]",
      )}
    >
      {/* Shape layer. It starts below the avatar's overhang on the active card
          (33px in the design, 27px on mobile) and at the very top on the side
          cards, where the avatar sits flush with the blob's own dipped edge. */}
      <div
        className={cn(
          "absolute inset-x-0 bottom-0",
          isActive ? "top-[27px] lg:top-[33px]" : "top-0",
          mirrored && "-scale-x-100",
        )}
      >
        {isActive ? (
          <>
            <CardBlobLargeShadow className="absolute top-0 left-[13.25%] h-[87.3%] w-[91.3%] text-[#008d00]" />
            <CardBlobLarge className="absolute inset-0 size-full text-[#0e2115]" />
          </>
        ) : (
          <>
            {/* Same silhouette as the card, nudged 19px left / 17px down and
                tipped 7.35deg, which is how the design casts its shadow. */}
            <CardBlobSmall className="absolute top-[4.97%] left-[-6.29%] size-full rotate-[7.35deg] text-[#008d00]" />
            <CardBlobSmall className="absolute inset-0 size-full text-[#0e2115]" />
          </>
        )}
      </div>

      <Image
        src={testimonial.avatar}
        alt={`${testimonial.name}, ${testimonial.role}`}
        // Declared at the largest rendered size rather than the file's 306px:
        // that asks next/image for 102w and 204w candidates, so the 2x source
        // is a real downscale instead of an upscale of an already-small crop.
        width={102}
        height={102}
        className={cn(
          "relative z-10 mx-auto block rounded-full object-cover ring-2 ring-white/50",
          isActive ? "size-[94px] lg:size-[102px]" : "size-[76px]",
        )}
      />

      {/* figcaption has to be a direct child of figure and either its first or
          its last node, so the attribution trails the quote in the DOM and is
          pulled back above it with `order`. */}
      <figure
        className={cn(
          "relative flex flex-col items-center text-center text-[#cfcfcf]",
          isActive
            ? "-mt-[67px] min-h-[351px] px-9 pt-[71px] pb-10 lg:-mt-[69px] lg:min-h-[433px] lg:px-[35px] lg:pt-[88px] lg:pb-14"
            : "-mt-[76px] min-h-[342px] px-9 pt-[87px] pb-12",
        )}
      >
        <blockquote
          className={cn(
            "order-2 flex flex-col items-center",
            isActive ? "mt-1.5 gap-0.5 lg:mt-[7px] lg:gap-[7px]" : "mt-1 gap-1",
          )}
        >
          <Icon
            icon="clarity:block-quote-line"
            aria-hidden
            className={cn(
              "shrink-0 text-[#008d00]",
              isActive ? "size-8 lg:size-9" : "size-[22px]",
            )}
          />
          <p
            className={cn(
              "leading-normal text-pretty",
              isActive ? "text-base lg:text-lg" : "text-xs",
            )}
          >
            {testimonial.quote}
          </p>
        </blockquote>

        <figcaption
          className={cn(
            "order-1 flex flex-col items-center",
            isActive ? "gap-[5px] lg:gap-[7px]" : "gap-[3px]",
          )}
        >
          <span
            className={cn(
              "leading-tight font-bold",
              isActive ? "text-xl lg:text-2xl" : "text-lg",
            )}
          >
            {testimonial.name}
          </span>
          <span
            className={cn(
              "leading-tight text-balance",
              isActive ? "text-[15px] lg:text-lg" : "text-xs",
            )}
          >
            {testimonial.role}
          </span>
        </figcaption>
      </figure>
    </div>
  );
}
