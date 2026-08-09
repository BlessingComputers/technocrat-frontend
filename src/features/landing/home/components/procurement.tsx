import Link from "next/link";
import { getImageProps } from "next/image";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/templates/container";

const BENEFITS = [
  "Low initial deposit",
  "Flexible monthly payment",
  "Maintenance packages",
];

const MOSAIC_ALT =
  "Bulk orders of laptops, printers, routers and phones being unloaded and staged for an organization";

export function Procurement() {
  // The mosaic is a single flattened export per breakpoint: desktop is a
  // 1:1 crop, mobile a wider 345x320 recomposition, so the two are art
  // direction rather than one image at two sizes. getImageProps + <picture>
  // is the Next-documented way to do that without downloading both.
  const common = { alt: MOSAIC_ALT, sizes: "(min-width: 1024px) 620px, 100vw" };
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    ...common,
    src: "/assets/procurement-mosaic.webp",
    width: 620,
    height: 620,
  });
  const { props: mobileProps } = getImageProps({
    ...common,
    src: "/assets/procurement-mosaic-mobile.webp",
    width: 345,
    height: 320,
  });

  return (
    // The mosaic export bakes #f8f9fa into the gaps between its tiles, so the
    // section background has to stay on that exact value to read as seamless.
    <div className="bg-[#f8f9fa]">
      <Container outerStyle="py-16 lg:py-20">
        <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12 xl:gap-16">
          <div className="flex w-full flex-col items-start gap-8 lg:max-w-[569px]">
            <div className="flex flex-col items-start gap-6">
              <div className="flex flex-col items-start gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-[#f8fdf9] px-4 py-1 text-xs font-medium tracking-[-0.01em] text-[#0e2115]">
                  <Icon icon="ph:building-office" className="size-6" />
                  For Organizations
                </span>
                <h2 className="text-[40px] leading-[1.4] font-bold tracking-[-0.01em] text-balance text-black xl:text-[64px] xl:leading-[80px] xl:font-extrabold">
                  <span className="text-[#008d00]">Procurement</span> For
                  Organizations
                </h2>
              </div>

              <p className="text-base leading-[1.4] tracking-[-0.01em] text-pretty text-[#525252] xl:text-xl">
                From smartphones, computers, and networking equipment to office
                essentials, home appliances, and everyday operational supplies,
                we help organizations source quality products in bulk at
                affordable prices.
              </p>

              <ul className="flex flex-col items-start gap-2">
                {BENEFITS.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2">
                    <span className="flex items-center rounded-[13px] bg-[#e6fcec] p-0.5">
                      <Icon
                        icon="material-symbols:check-rounded"
                        className="size-5 text-[#008d00]"
                      />
                    </span>
                    <span className="text-sm font-medium tracking-[-0.01em] text-black">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <Button
              asChild
              className="h-12 w-full rounded-[8px] bg-[#2f7a45] px-6 text-base leading-6 text-white transition-colors hover:bg-[#276b3b] active:translate-y-px motion-reduce:transition-none lg:w-auto"
            >
              <Link href="/contact?intent=procurement-quote">
                <Icon icon="ph:building-office" className="size-6" />
                Get Quote
              </Link>
            </Button>
          </div>

          <picture className="w-full lg:w-[620px] lg:shrink-0">
            <source media="(min-width: 1024px)" srcSet={desktopSrcSet} />
            <img
              {...mobileProps}
              alt={MOSAIC_ALT}
              // Pin each breakpoint's ratio so swapping sources at lg costs no
              // layout shift and neither crop gets stretched.
              className="block aspect-[345/320] w-full lg:aspect-square"
              loading="lazy"
              decoding="async"
            />
          </picture>
        </div>
      </Container>
    </div>
  );
}
