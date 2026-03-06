import Link from "next/link";
import { Container } from "../templates/container";
import { Button } from "../ui/button";

export function ContactBanner() {
  return (
    <Container
      innerStyle="bg-gradient-to-r from-primary to-[#ff9ea2] rounded-xl p-8 via-[] flex flex-col lg:flex-row items-center justify-between
    "
    >
      <div className="flex flex-col gap-2 justify-center lg:justify-start">
        <h1 className="text-4xl text-white font-bold text-center lg:text-left">
          Need help choosing the{" "}
          <span className="text-white">right product?</span>
        </h1>
        <p className="text-white text-center lg:text-left">
          Contact us for expert advice and recommendations.
        </p>
      </div>
      <Link href="/contact">
        <Button className="bg-primary w-full lg:w-auto mt-4 lg:mt-0 text-white hover:bg-primary/70 transition-colors duration-300 rounded-full">
          Contact Us
        </Button>
      </Link>
    </Container>
  );
}
