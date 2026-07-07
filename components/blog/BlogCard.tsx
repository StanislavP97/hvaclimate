import Image from "next/image";
import Link from "next/link";
import type { BlogCategory, BlogPost } from "@/types/blog";

interface BlogCardProps {
  post: BlogPost;
  category?: BlogCategory;
}

export function BlogCard({ post, category }: BlogCardProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-background">
      <Link href={`/blog/${post.slug}`} className="block h-48 w-full">
        <Image
          src={post.thumbnail}
          alt={post.altText}
          width={640}
          height={384}
          className="h-48 w-full object-cover"
        />
      </Link>
      <div className="flex flex-1 flex-col p-6">
        {category ? (
          <Link
            href={`/blog-post-categories/${category.slug}`}
            className="text-sm font-semibold tracking-wide text-primary-accent uppercase"
          >
            {category.name}
          </Link>
        ) : null}
        <Link href={`/blog/${post.slug}`}>
          <h3 className="mt-2 text-lg font-bold text-foreground">
            {post.name}
          </h3>
        </Link>
        <p className="mt-2 flex-1 text-sm text-body">{post.excerpt}</p>
      </div>
    </div>
  );
}
