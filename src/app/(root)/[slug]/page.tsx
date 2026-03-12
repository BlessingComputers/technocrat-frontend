import { getPageBySlug, getAllPages } from "@/lib/data";
import { notFound } from "next/navigation";
import { Container } from "@/components/templates/container";
import { PageHero } from "@/components/layout/page-hero";
import type { Metadata } from "next";

interface DynamicPageProps {
  params: Promise<{ slug: string }>;
}

// Slugs that are handled by other routes and should not match here
const RESERVED_SLUGS = ["product", "blog", "contact", "test"];

// Pre-render all known pages at build time so they're instant
export async function generateStaticParams() {
  const pages = await getAllPages();
  return pages
    .filter((p) => !RESERVED_SLUGS.includes(p.slug))
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: DynamicPageProps): Promise<Metadata> {
  const { slug } = await params;

  if (RESERVED_SLUGS.includes(slug)) {
    return {};
  }

  const page = await getPageBySlug(decodeURIComponent(slug));

  if (!page) {
    return { title: "Page Not Found" };
  }

  const plainContent = page.content.replace(/<[^>]*>/g, "").slice(0, 160);

  return {
    title: page.title,
    description: plainContent || `${page.title} - Technocrat Nigeria`,
    openGraph: {
      title: page.title,
      description: plainContent || `${page.title} - Technocrat Nigeria`,
      images: page.featuredImage ? [{ url: page.featuredImage }] : [],
    },
  };
}

export default async function DynamicPage({ params }: DynamicPageProps) {
  const { slug } = await params;

  if (RESERVED_SLUGS.includes(slug)) {
    notFound();
  }

  const page = await getPageBySlug(decodeURIComponent(slug));

  if (!page) {
    notFound();
  }

  return (
    <div className="bg-white dark:bg-background min-h-screen">
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
    </div>
  );
}
