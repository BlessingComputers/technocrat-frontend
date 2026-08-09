import { Container } from "@/components/templates/container";
import { ServiceCard } from "./service-card";
import { services } from "../data/services";

export function Services() {
  return (
    <Container outerStyle="bg-background py-6">
      <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
        {services.map((service) => (
          <ServiceCard key={service.slug} {...service} />
        ))}
      </div>
    </Container>
  );
}
