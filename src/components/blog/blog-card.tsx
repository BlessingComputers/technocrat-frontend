import Link from "next/link";
import Image from "next/image";
import { Calendar, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string | null;
  author: { id: number; name: string } | null;
  createdAt: string;
  category?: string;
  className?: string;
}

export function BlogCard({
  title,
  slug,
  excerpt,
  featuredImage,
  author,
  createdAt,
  category,
  className,
}: BlogCardProps) {
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      className={cn(
        "group bg-card border border-border overflow-hidden flex flex-col h-full hover:border-primary/40 transition-colors duration-200",
        className,
      )}
    >
      {/* Image */}
      <div className="relative aspect-16/10 w-full bg-muted/10 overflow-hidden">
        {featuredImage ? (
          <Image
            src={featuredImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-muted/20">
            <span className="text-4xl font-bold text-primary/20">
              {title.charAt(0)}
            </span>
          </div>
        )}
        {category && (
          <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5">
            {category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col grow p-4 sm:p-5">
        <div className="flex items-center gap-4 mb-3 text-xs text-muted-foreground">
          {author && (
            <span className="flex items-center gap-1">
              <User className="w-3 h-3" />
              {author.name}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formattedDate}
          </span>
        </div>

        <Link
          href={`/blog/${slug}`}
          className="hover:text-primary transition-colors"
        >
          <h3 className="font-semibold text-base mb-2 line-clamp-2 text-foreground">
            {title}
          </h3>
        </Link>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
          {excerpt.replace(/(<([^>]+)>)/gi, "").replace(/&nbsp;/g, " ")}
        </p>

        <div className="mt-auto">
          <Link
            href={`/blog/${slug}`}
            className="text-xs font-semibold uppercase tracking-wider text-primary hover:text-primary/80 transition-colors"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
}
