import Image from "next/image";
import { Icon } from "@iconify/react";
import { Container } from "@/components/templates/container";
import { COMPANY_METRICS } from "../data/metrics";

export function AboutHero() {
  return (
    // The design pins this section to #fafafa rather than --background so the
    // pale glows and the white eyebrow pill keep their intended contrast.
    <div className="relative overflow-hidden bg-[#fafafa]">
      {/* Blurred ellipses exported from the design. They sit outside the
          desktop content grid and are absent from the mobile frame, so they
          only render from lg up. */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[103px] left-[1.25%] hidden h-[363px] w-[334px] lg:block"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/about-glow-left.svg"
          alt=""
          className="absolute inset-[-27.55%_-29.94%] block size-full max-w-none"
        />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-138px] right-[-8%] hidden h-[458px] w-[540px] lg:block"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/about-glow-right.svg"
          alt=""
          className="absolute inset-[-43.67%_-37.04%] block size-full max-w-none"
        />
      </div>

      <Container
        outerStyle="relative py-16 lg:py-28"
        innerStyle="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-14"
      >
        <div className="flex w-full flex-col items-start gap-6 lg:max-w-[498px]">
          <div className="flex flex-col items-start gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-medium tracking-[-0.01em] text-black">
              <Icon icon="solar:star-fall-outline" className="size-6" />
              About Technocrat
            </span>
            <h1 className="text-[32px] leading-[1.4] font-bold tracking-[-0.01em] text-balance text-black xl:text-[64px] xl:leading-[80px] xl:font-extrabold">
              Who We Are
            </h1>
          </div>

          <p className="text-base leading-[1.4] tracking-[-0.01em] text-pretty text-[#495057] xl:text-lg">
            Technocrat Stores is a retail and procurement company committed to
            providing quality products and dependable service. We proudly serve
            individuals, families, businesses, educational institutions,
            healthcare facilities, government organizations, and corporate
            clients by delivering trusted solutions across a wide range of
            product categories. Our success is built on professionalism,
            innovation, and an unwavering commitment to customer satisfaction
          </p>

          <dl className="flex items-start gap-4 lg:w-[426px] lg:justify-between lg:gap-0">
            {COMPANY_METRICS.map((metric) => (
              <div
                key={metric.label}
                className="flex w-[92px] flex-col items-center gap-[7px] text-center"
              >
                <dt className="text-[32px] leading-[1.4] font-bold tracking-[-0.01em] text-black xl:text-[38px] xl:font-semibold">
                  {metric.value}
                </dt>
                <dd className="text-[10px] leading-[1.4] tracking-[-0.01em] text-[#868e96]">
                  {metric.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* The right column is one flattened mosaic in the design but three
            separate crops in practice, so each tile keeps its own aspect ratio
            per breakpoint and the tall tile stretches to the stack's height. */}
        <div className="flex w-full items-stretch gap-2 lg:w-[704px] lg:shrink-0 lg:gap-3">
          <div className="flex w-[52.6%] shrink-0 flex-col gap-2 lg:w-[325px] lg:gap-3">
            <div className="relative aspect-[173/95] w-full overflow-hidden rounded-[12px] lg:aspect-[325/154] lg:rounded-[24px]">
              <Image
                src="/assets/about-phones.webp"
                alt="A row of Samsung Galaxy smartphones in white, pink, black and green"
                fill
                sizes="(min-width: 1024px) 325px, 53vw"
                className="object-cover object-bottom"
                loading="eager"
              />
            </div>
            <div className="relative aspect-[173/144] w-full overflow-hidden rounded-[12px] lg:aspect-[325/338] lg:rounded-[24px]">
              <Image
                src="/assets/about-laptop.webp"
                alt="A gold HP laptop open on a reflective surface"
                fill
                sizes="(min-width: 1024px) 325px, 53vw"
                className="object-cover"
                loading="eager"
              />
            </div>
          </div>
          <div className="relative min-w-0 flex-1 overflow-hidden rounded-[12px] lg:rounded-[24px]">
            <Image
              src="/assets/about-appliance.webp"
              alt="A Samsung front-loading washing machine packaged in a warehouse"
              fill
              sizes="(min-width: 1024px) 367px, 47vw"
              className="object-cover"
              // The tall tile is the dominant LCP candidate at every
              // breakpoint, so it is the only one that gets high fetch
              // priority. Next 16 deprecated `priority` in favour of these.
              loading="eager"
              fetchPriority="high"
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
