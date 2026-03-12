import { getPostBySlug, getRecentPosts } from "@/lib/data";
import { notFound } from "next/navigation";
import { Container } from "@/components/templates/container";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowLeft, Tag } from "lucide-react";
import type { Metadata } from "next";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(decodeURIComponent(slug));

  if (!post) {
    return { title: "Post Not Found" };
  }

  const plainExcerpt = post.excerpt.replace(/<[^>]*>/g, "").slice(0, 160);

  return {
    title: post.title,
    description:
      plainExcerpt || `Read "${post.title}" on the Technocrat Nigeria blog.`,
    openGraph: {
      title: post.title,
      description:
        plainExcerpt || `Read "${post.title}" on the Technocrat Nigeria blog.`,
      type: "article",
      publishedTime: post.createdAt,
      modifiedTime: post.modifiedAt,
      authors: post.author ? [post.author.name] : [],
      images: post.featuredImage ? [{ url: post.featuredImage }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description:
        plainExcerpt || `Read "${post.title}" on the Technocrat Nigeria blog.`,
      images: post.featuredImage ? [post.featuredImage] : [],
    },
  };
}

async function BlogPostContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(decodeURIComponent(slug));

  if (!post) {
    notFound();
  }

  const recentPosts = (await getRecentPosts(5)).filter(
    (p) => p.slug !== post.slug,
  );

  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      {/* Breadcrumb */}
      <div className="mb-8">
        <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-primary transition-colors">
            Blog
          </Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-white line-clamp-1">
            {post.title}
          </span>
        </nav>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <article className="lg:col-span-2">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-gray-500 dark:text-muted-foreground">
            {post.author && (
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {post.author.name}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {formattedDate}
            </span>
            {post.categories.length > 0 && (
              <span className="flex items-center gap-1.5">
                <Tag className="w-4 h-4" />
                {post.categories.map((c) => c.name).join(", ")}
              </span>
            )}
          </div>

          {post.featuredImage && (
            <div className="relative aspect-video w-full mb-8 rounded-xl overflow-hidden bg-gray-100 dark:bg-muted">
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
                priority
              />
            </div>
          )}

          <div
            className="prose prose-gray dark:prose-invert max-w-none
              prose-headings:font-bold prose-headings:tracking-tight
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-img:rounded-xl prose-p:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-100 dark:border-white/10">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-muted text-gray-600 dark:text-muted-foreground rounded-full"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="lg:sticky lg:top-32 space-y-8">
            {/* Recent Posts */}
            <div className="bg-white dark:bg-card rounded-xl border border-gray-100 dark:border-white/10 p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                Recent Posts
              </h3>
              <div className="space-y-4">
                {recentPosts.slice(0, 4).map((recentPost) => (
                  <Link
                    key={recentPost.id}
                    href={`/blog/${recentPost.slug}`}
                    className="flex gap-3 group"
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 dark:bg-muted shrink-0">
                      {recentPost.featuredImage ? (
                        <Image
                          src={recentPost.featuredImage}
                          alt={recentPost.title}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full bg-linear-to-br from-primary/10 to-primary/5">
                          <span className="text-lg font-black text-primary/20">
                            {recentPost.title.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 group-hover:text-primary transition-colors">
                        {recentPost.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(recentPost.createdAt).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric", year: "numeric" },
                        )}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  return (
    <div className="bg-white dark:bg-background">
      <Container outerStyle="py-8">
        <Suspense
          fallback={
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 dark:bg-muted rounded w-1/3" />
              <div className="h-10 bg-gray-200 dark:bg-muted rounded w-2/3" />
              <div className="h-64 bg-gray-200 dark:bg-muted rounded" />
            </div>
          }
        >
          <BlogPostContent params={params} />
        </Suspense>
      </Container>
    </div>
  );
}
