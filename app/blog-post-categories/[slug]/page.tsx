import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogCategories, getBlogCategoryBySlug } from "@/lib/blog-categories";
import { getBlogPostsByCategorySlug } from "@/lib/blog-posts";
import { ServiceHero } from "@/components/services/ServiceHero";
import { BlogCardGrid } from "@/components/blog/BlogCardGrid";
import { pageMetadata } from "@/lib/metadata";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getBlogCategories().map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getBlogCategoryBySlug(slug);

  if (!category) {
    return {};
  }

  return pageMetadata({
    title: category.titleTag,
    description: category.metaDescription,
    path: `/blog-post-categories/${category.slug}`,
  });
}

export default async function BlogCategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getBlogCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const posts = getBlogPostsByCategorySlug(slug);
  const categories = getBlogCategories();

  return (
    <>
      <ServiceHero
        title={category.name}
        description={category.metaDescription}
        primaryCtaLabel="Get a Quote Today"
        imageLabel={`${category.name} blog posts`}
      />
      <BlogCardGrid posts={posts} categories={categories} />
    </>
  );
}
