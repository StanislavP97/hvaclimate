import blogCategories from "@/data/hvaclimate-cms-data/blog-categories.json";
import type { BlogCategory } from "@/types/blog";

export function getBlogCategories(): BlogCategory[] {
  return blogCategories as BlogCategory[];
}

export function getBlogCategoryBySlug(slug: string): BlogCategory | undefined {
  return getBlogCategories().find((entry) => entry.slug === slug);
}
