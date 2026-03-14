import { getPaginatedPosts } from "@/lib/data";
import { BlogCard } from "@/components/blog/blog-card";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/templates/container";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read the latest news, tips, and updates from Technocrat Nigeria. Stay informed about computers, solar systems, generators, and electronics.",
  openGraph: {
    title: "Blog | Technocrat Nigeria",
    description:
      "Read the latest news, tips, and updates from Technocrat Nigeria.",
    type: "website",
  },
};

async function PostList({ currentPage }: { currentPage: number }) {
  const { posts, totalPages } = await getPaginatedPosts(currentPage, 9);

  if (posts.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-lg text-muted-foreground">No blog posts found.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-6">
        <p className="text-sm sm:text-base text-gray-500 dark:text-muted-foreground w-fit px-3 py-1 bg-gray-100 dark:bg-muted rounded-full">
          Showing page {currentPage} of {totalPages || 1}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {posts.map((post) => (
          <BlogCard
            key={post.id}
            title={post.title}
            slug={post.slug}
            excerpt={post.excerpt}
            featuredImage={post.featuredImage}
            author={post.author}
            createdAt={post.createdAt}
            category={post.categories?.[0]?.name}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 sm:gap-4 mt-12 bg-white dark:bg-card p-2 sm:p-4 rounded-full border border-gray-100 dark:border-white/10 w-fit mx-auto shadow-sm">
          <Button
            asChild
            variant="outline"
            disabled={currentPage <= 1}
            className={`rounded-full h-10 px-4 ${
              currentPage <= 1 ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <Link href={`?page=${currentPage - 1}`}>
              <ChevronLeft className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline font-bold uppercase tracking-wider text-xs">
                Previous
              </span>
            </Link>
          </Button>

          <span className="text-sm font-bold tracking-widest px-4 text-gray-600 dark:text-muted-foreground uppercase">
            {currentPage}{" "}
            <span className="text-gray-300 dark:text-gray-700 mx-1">/</span>{" "}
            {totalPages}
          </span>

          <Button
            asChild
            variant="outline"
            disabled={currentPage >= totalPages}
            className={`rounded-full h-10 px-4 ${
              currentPage >= totalPages ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <Link href={`?page=${currentPage + 1}`}>
              <span className="hidden sm:inline font-bold uppercase tracking-wider text-xs">
                Next
              </span>
              <ChevronRight className="w-4 h-4 sm:ml-2" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}

async function BlogPageContent(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const pageParam = searchParams?.page;
  const page = typeof pageParam === "string" ? parseInt(pageParam, 10) : 1;
  const currentPage = isNaN(page) || page < 1 ? 1 : page;

  return (
    <main className="min-h-screen bg-gray-50/50 dark:bg-background">
      <PageHero
        tag="Our Blog"
        title="Latest News & Updates"
        subtitle="Stay updated with the latest tech trends, product reviews, and industry insights from Blessing Computers."
      />
      <Container>
        <PostList currentPage={currentPage} />
      </Container>
    </main>
  );
}

function BlogSkeleton() {
  return (
    <main className="min-h-screen bg-gray-50/50 dark:bg-background">
      <PageHero
        tag="Our Blog"
        title="Latest News & Updates"
        subtitle="Stay updated with the latest tech trends, product reviews, and industry insights from Blessing Computers."
      />
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-card rounded-xl border border-gray-100 dark:border-white/10 overflow-hidden animate-pulse"
            >
              <div className="aspect-16/10 bg-gray-200 dark:bg-muted" />
              <div className="p-5 space-y-3">
                <div className="h-4 bg-gray-200 dark:bg-muted rounded w-3/4" />
                <div className="h-3 bg-gray-200 dark:bg-muted rounded w-full" />
                <div className="h-3 bg-gray-200 dark:bg-muted rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </main>
  );
}

export default function BlogPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <Suspense fallback={<BlogSkeleton />}>
      <BlogPageContent {...props} />
    </Suspense>
  );
}
