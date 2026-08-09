import Link from "next/link";
import { Icon } from "@iconify/react";
import type { ServiceItem } from "../data/services";

export function ServiceCard({ icon, title, description, href }: ServiceItem) {
  return (
    <div className="flex w-full max-w-[332px] flex-col items-center gap-2 text-center lg:gap-3">
      <div className="flex size-20 items-center justify-center rounded-[40px] bg-primary/10">
        <Icon icon={icon} className="size-[60px] text-primary" />
      </div>
      <h3 className="text-xl font-semibold tracking-tight text-foreground lg:text-2xl">
        {title}
      </h3>
      <p className="text-sm leading-[1.4] text-paragraph lg:text-base">
        {description}
      </p>
      <Link
        href={href}
        className="group inline-flex items-center gap-1.5 rounded-lg px-4 py-3 text-sm font-medium text-primary lg:gap-2 lg:px-6 lg:text-base"
      >
        Learn more
        <Icon
          icon="solar:arrow-right-linear"
          className="size-4 transition-transform duration-200 group-hover:translate-x-1 lg:size-6"
        />
      </Link>
    </div>
  );
}
