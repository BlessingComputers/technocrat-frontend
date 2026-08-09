import type { Metadata } from "next";
import { AboutHero } from "@/features/landing/company";

export const metadata: Metadata = {
  title: "Company",
  description:
    "Technocrat Stores is a retail and procurement company serving individuals, businesses, institutions and government organizations across Nigeria with quality products and dependable service.",
};

export default function CompanyPage() {
  // The (root) layout already renders the page's <main> landmark.
  return (
    <>
      <AboutHero />
    </>
  );
}
