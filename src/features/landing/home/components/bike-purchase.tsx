import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/templates/container";

const BENEFITS = [
  "Low initial deposit",
  "Flexible monthly payment",
  "Maintenance packages",
];

export function BikePurchase() {
  return (
    <div className="relative isolate overflow-hidden bg-[linear-gradient(to_bottom,#0e2115_18.865%,#50a664_100%)]">
      <Container outerStyle="relative z-10 py-16 lg:min-h-[540px] xl:min-h-[660px] xl:pt-[92px] xl:pb-[116px]">
        <div className="flex flex-col gap-[50px] lg:w-[380px] lg:gap-10 xl:w-[492px]">
          <div className="flex flex-col items-start gap-4">
            <div className="flex w-full flex-col items-start gap-4">
              <div className="flex w-full flex-col items-start gap-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-medium tracking-[-0.01em] text-[#e6fcec]">
                  <Icon icon="lineicons:bike" className="size-6" />
                  Bike purchase
                </span>
                <h2 className="text-[40px] leading-[1.4] font-bold tracking-[-0.01em] text-balance text-white xl:text-[64px] xl:leading-[80px] xl:font-extrabold">
                  Ride now, Pay Conveniently
                </h2>
              </div>
              <p className="text-base leading-[1.4] tracking-[-0.01em] text-pretty text-white">
                Own a motorcycle for personal use or your delivery business with
                plans designed around your cash flow
              </p>
            </div>

            <ul className="flex flex-col items-start gap-2">
              {BENEFITS.map((benefit) => (
                <li key={benefit} className="flex items-center gap-2">
                  <span className="flex items-center rounded-[13px] bg-[#e6fcec] p-0.5">
                    <Icon
                      icon="material-symbols:check-rounded"
                      className="size-5 text-[#008d00]"
                    />
                  </span>
                  <span className="text-sm font-medium tracking-[-0.01em] text-white">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Transparent PNG sitting directly on the section gradient. From lg
              it spans the free area beside the copy and centres itself there;
              the height cap keeps it near the asset's native 458x366. */}
          <div className="relative aspect-[458/366] w-full lg:absolute lg:top-1/2 lg:right-0 lg:left-[42%] lg:h-[420px] lg:w-auto lg:aspect-auto lg:-translate-y-1/2 xl:h-[500px]">
            <Image
              src="/assets/spiro-ekon.png"
              alt="Spiro Ekon electric motorcycle, three-quarter view"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-contain"
            />
          </div>

          <div className="flex w-full flex-col items-start gap-4 lg:w-auto lg:flex-row lg:flex-wrap">
            <Button
              asChild
              className="group h-12 w-full rounded-[8px] bg-[#2f7a45] px-6 text-base leading-6 text-white transition-colors hover:bg-[#276b3b] lg:w-auto"
            >
              <Link href="/contact?intent=bike-purchase">
                Purchase bike
                <Icon
                  icon="solar:arrow-right-linear"
                  className="size-6 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
                />
              </Link>
            </Button>
            <Button
              asChild
              className="h-12 w-full rounded-[8px] border border-[#007a00] bg-[#fafafa] px-6 text-base leading-6 text-[#007a00] transition-colors hover:bg-white lg:w-auto"
            >
              <Link href="/contact?intent=bike-plans">
                View Plans
                <Icon icon="solar:arrow-right-linear" className="size-6" />
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
