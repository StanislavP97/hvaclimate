import Image from "next/image";
import Link from "next/link";
import type { BlogCategory, BlogPost } from "@/types/blog";
import { getBlogCategoryStyle } from "@/lib/blog-category-styles";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

interface BlogPostCardProps {
  post: BlogPost;
  category?: BlogCategory;
}

export function BlogPostCard({ post, category }: BlogPostCardProps) {
  const style = getBlogCategoryStyle(post.categorySlug);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background transition-shadow duration-200 hover:shadow-[0_12px_28px_rgba(13,27,42,0.1)]"
    >
      <div className="relative aspect-video w-full">
        <Image src={post.thumbnail} alt={post.altText} fill className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col p-5.5">
        {category && (
          <span
            className="mb-3.25 inline-flex w-fit items-center rounded-full px-3 py-1.25 font-sans text-xs font-semibold"
            style={{ background: style.bg, color: style.color }}
          >
            {category.name}
          </span>
        )}
        <h3 className="text-lg leading-[1.32] font-bold text-foreground">{post.name}</h3>
        <p className="mt-2.25 flex-1 text-sm leading-[1.55] text-muted-foreground">
          {post.excerpt}
        </p>
        <div className="mt-4.5 font-sans text-[13px] text-muted-foreground">
          {formatDate(post.publishedDate)}
        </div>
      </div>
    </Link>
  );
}
