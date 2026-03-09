import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Technocrat Nigeria. Reach our sales agents for inquiries about computers, solar systems, generators, and electronics.",
  openGraph: {
    title: "Contact Us | Technocrat Nigeria",
    description:
      "Get in touch with Technocrat Nigeria for product inquiries and support.",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
