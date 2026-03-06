"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { FadeIn } from "@/components/animations/motion-components";
import { ArrowLeft, Home, Search } from "lucide-react";
import { ViewIn } from "@/components/animations/motion-components";

export default function NotFound() {
  const [year, setYear] = useState<number>();

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    setYear(currentYear);
  }, []);
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-24 text-center">
      {/* Subtle Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10">
        <FadeIn delay={0.1} direction="up">
          <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Search className="h-10 w-10" />
          </div>
        </FadeIn>

        <ViewIn
          initial={{ opacity: 0, scale: 0.8 }}
          view={{ opacity: 1, scale: 1 }}
          duration={0.6}
        >
          <h1 className="text-9xl font-black tracking-tighter text-gray-900 dark:text-white sm:text-[12rem]">
            404
          </h1>
        </ViewIn>

        <FadeIn delay={0.3} direction="up" className="mt-4">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Page not found
          </h2>
          <p className="mt-6 text-lg leading-7 text-muted-foreground max-w-md mx-auto">
            Sorry, we couldn't find the page you're looking for. It might have
            been moved or doesn't exist anymore.
          </p>
        </FadeIn>

        <FadeIn
          delay={0.5}
          direction="up"
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center"
        >
          <Button
            variant="outline"
            size="lg"
            onClick={() => router.back()}
            className="rounded-full border-2 border-primary bg-transparent text-primary transition-all hover:bg-primary hover:text-white font-black uppercase tracking-widest cursor-pointer"
          >
            <ArrowLeft />
            Go Back
          </Button>

          <Button
            asChild
            size="lg"
            className="rounded-full bg-primary text-white shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95 font-black uppercase tracking-widest cursor-pointer"
          >
            <Link href="/">
              <Home />
              Back to Home
            </Link>
          </Button>
        </FadeIn>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <FadeIn delay={0.8} direction="up">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/40">
            Blessing Computers &copy; {year}
          </p>
        </FadeIn>
      </div>
    </div>
  );
}
