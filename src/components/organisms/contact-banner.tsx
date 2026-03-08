import Link from "next/link";
import { Container } from "../templates/container";

export function ContactBanner() {
  return (
    <Container>
      <div className="bg-secondary text-secondary-foreground border-t border-border p-8 lg:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-primary block mb-2">
            Expert Assistance
          </span>
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">
            Need help choosing the right product?
          </h2>
          <p className="text-sm text-muted-foreground max-w-lg">
            Contact us for expert advice and recommendations tailored to your
            business needs.
          </p>
        </div>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-xs font-semibold uppercase tracking-wider hover:bg-primary/90 transition-colors shrink-0"
        >
          Contact Us
        </Link>
      </div>
    </Container>
  );
}
