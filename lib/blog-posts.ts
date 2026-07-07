import blogPosts from "@/data/hvaclimate-cms-data/blog-posts.json";
import type { BlogPost } from "@/types/blog";

export function getBlogPosts(): BlogPost[] {
  return [...(blogPosts as BlogPost[])].sort(
    (a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime(),
  );
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return getBlogPosts().find((entry) => entry.slug === slug);
}

export function getBlogPostsByCategorySlug(categorySlug: string): BlogPost[] {
  return getBlogPosts().filter((entry) => entry.categorySlug === categorySlug);
}
