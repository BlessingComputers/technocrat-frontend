export interface Testimonial {
  slug: string;
  name: string;
  /** Job title plus organization, rendered as one line under the name. */
  role: string;
  /** Square portrait in /public/assets/testimonials, 306px (3x of the 102px active avatar). */
  avatar: string;
  quote: string;
}

/**
 * Placeholder-grade content: the Figma frame ships lorem ipsum and three
 * repeats of "Farida / Lead designer", so the copy here is written to the
 * shape of the design (name, one attribution line, ~30 words) rather than
 * traced from it. Swap in real customer quotes and their own photographs
 * before launch — the portraits are licence-free Unsplash stock, not
 * Technocrat customers.
 */
export const testimonials: Testimonial[] = [
  {
    slug: "chidubem-nwosu",
    name: "Chidubem Nwosu",
    role: "IT Manager, Talex Logistics",
    avatar: "/assets/testimonials/chidubem-nwosu.jpg",
    quote:
      "We ordered thirty laptops for a new branch and had them imaged and delivered in four days. Technocrat handled the paperwork our finance team needed without us chasing anyone.",
  },
  {
    slug: "hauwa-suleiman",
    name: "Hauwa Suleiman",
    role: "Operations Manager, Sahel Health Initiative",
    avatar: "/assets/testimonials/hauwa-suleiman.jpg",
    quote:
      "Their team drove up to Kaduna to install the solar array themselves. Our clinic has not lost power to the cold room since, and the monthly diesel bill is gone.",
  },
  {
    slug: "tunde-ajibade",
    name: "Tunde Ajibade",
    role: "Facilities Lead, Ejiro & Co.",
    avatar: "/assets/testimonials/tunde-ajibade.jpg",
    quote:
      "The 10kVA inverter setup they sized for our office has carried every outage this year. Two site visits, one clean install, and the quote never moved after we signed.",
  },
  {
    slug: "ngozi-eleanya",
    name: "Ngozi Eleanya",
    role: "Practice Administrator, Grandview Clinic",
    avatar: "/assets/testimonials/ngozi-eleanya.jpg",
    quote:
      "I compared four suppliers before buying our generator. Technocrat was the only one that put the servicing schedule in writing, and they still call ahead of every visit.",
  },
  {
    slug: "amaka-okonkwo",
    name: "Amaka Okonkwo",
    role: "Founder, Okonkwo Studio",
    avatar: "/assets/testimonials/amaka-okonkwo.jpg",
    quote:
      "I needed a color-accurate monitor on a tight budget. They talked me out of the pricier model and into the right one. That is why I keep coming back to them.",
  },
];
