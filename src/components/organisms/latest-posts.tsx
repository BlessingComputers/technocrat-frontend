import { getRecentPosts } from "@/lib/data";
import { BlogCard } from "@/components/blog/blog-card";
import { Container } from "@/components/templates/container";
import { SectionHeader } from "@/components/molecules/section-header";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function LatestPosts() {
  const posts = getRecentPosts(3);

  if (posts.length === 0) return null;

  return (
    <Container>
      <SectionHeader
        tag="From Our Blog"
        title={{ span: "Latest", rest: "Updates" }}
        description="Stay informed with the latest news, product reviews, and tech insights."
        action={
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 border border-border px-5 py-2 text-xs font-semibold uppercase tracking-wider text-foreground hover:border-primary hover:text-primary transition-colors"
          >
            All Posts <ArrowRight className="w-3 h-3" />
          </Link>
        }
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
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
    </Container>
  );
}
