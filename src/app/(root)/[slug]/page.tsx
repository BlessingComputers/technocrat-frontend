import { getPageBySlug, getAllPages } from "@/lib/data";
import { notFound } from "next/navigation";
import { Container } from "@/components/templates/container";
import { PageHero } from "@/components/layout/page-hero";
import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page | Blessing Computers",
  description: "Blessing Computers page content.",
};

interface DynamicPageProps {
  params: Promise<{ slug: string }>;
}

// Slugs that are handled by other routes and should not match here
const RESERVED_SLUGS = ["product", "blog", "contact", "test"];

async function PageContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (RESERVED_SLUGS.includes(slug)) {
    notFound();
  }

  const page = getPageBySlug(decodeURIComponent(slug));

  if (!page) {
    notFound();
  }

  return (
    <>
      <PageHero title={page.title} />
      <Container>
        <div
          className="prose prose-gray dark:prose-invert max-w-3xl mx-auto
            prose-headings:font-bold prose-headings:tracking-tight
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-img:rounded-xl prose-p:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </Container>
    </>
  );
}

export default function DynamicPage({ params }: DynamicPageProps) {
  return (
    <div className="bg-white dark:bg-background min-h-screen">
      <Suspense
        fallback={
          <div className="animate-pulse">
            <div className="h-48 bg-gray-100 dark:bg-muted" />
            <div className="max-w-3xl mx-auto p-8 space-y-4">
              <div className="h-6 bg-gray-200 dark:bg-muted rounded w-3/4" />
              <div className="h-4 bg-gray-200 dark:bg-muted rounded w-full" />
              <div className="h-4 bg-gray-200 dark:bg-muted rounded w-5/6" />
            </div>
          </div>
        }
      >
        <PageContent params={params} />
      </Suspense>
    </div>
  );
}
