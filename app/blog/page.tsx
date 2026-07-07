import type { Metadata } from "next";
import { ServiceHero } from "@/components/services/ServiceHero";
import { BlogCardGrid } from "@/components/blog/BlogCardGrid";
import { getBlogPosts } from "@/lib/blog-posts";
import { getBlogCategories } from "@/lib/blog-categories";

export const metadata: Metadata = {
  title: "HVAC Blog | HVA Climate Control",
  description:
    "HVAC tips, guides, and articles for homeowners in Vancouver WA and Portland OR from the team at HVA Climate Control.",
};

export default function BlogPage() {
  const posts = getBlogPosts();
  const categories = getBlogCategories();

  return (
    <>
      <ServiceHero
        title="HVAC Blog"
        description="Tips, guides, and insights to help you get the most out of your heating and cooling system, from the team at HVA Climate Control."
        primaryCtaLabel="Get a Quote Today"
        imageLabel="HVA Climate Control blog"
      />
      <BlogCardGrid posts={posts} categories={categories} />
    </>
  );
}
