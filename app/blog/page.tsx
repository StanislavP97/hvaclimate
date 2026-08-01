import type { Metadata } from "next";
import { BlogExplorer } from "@/components/blog/BlogExplorer";
import { getBlogPosts } from "@/lib/blog-posts";
import { getBlogCategories } from "@/lib/blog-categories";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "HVAC Blog | HVA Climate Control",
  description:
    "HVAC tips, guides, and articles for homeowners in Vancouver WA and Portland OR from the team at HVA Climate Control.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getBlogPosts();
  const categories = getBlogCategories();

  return <BlogExplorer posts={posts} categories={categories} />;
}
