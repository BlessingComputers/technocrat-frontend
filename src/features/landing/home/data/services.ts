export interface ServiceItem {
  slug: string;
  icon: string;
  title: string;
  description: string;
  href: string;
}

export const services: ServiceItem[] = [
  {
    slug: "bulk-order",
    icon: "solar:buildings-2-linear",
    title: "Bulk Order for Organizations",
    description:
      "Get the best prices for phones, computers, and accessories for your business, schools, and organizations",
    href: "/contact",
  },
  {
    slug: "bike-hire-purchase",
    icon: "solar:verified-check-linear",
    title: "Flexible Bike Hire Purchase",
    description:
      "Own our quality bike with low down payment and flexible monthly installments",
    href: "/contact",
  },
  {
    slug: "aftersales-support",
    icon: "solar:phone-calling-rounded-linear",
    title: "After Sales Support",
    description: "We are here to help you before and after your purchase",
    href: "/contact",
  },
];
