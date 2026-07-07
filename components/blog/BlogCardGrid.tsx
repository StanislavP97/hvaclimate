import type { BlogCategory, BlogPost } from "@/types/blog";
import { BlogCard } from "@/components/blog/BlogCard";

interface BlogCardGridProps {
  posts: BlogPost[];
  categories: BlogCategory[];
}

export function BlogCardGrid({ posts, categories }: BlogCardGridProps) {
  if (posts.length === 0) {
    return (
      <section className="bg-navy py-16">
        <div className="mx-auto max-w-7xl px-6 text-center text-body">
          No posts yet — check back soon.
        </div>
      </section>
    );
  }

  return (
    <section className="bg-navy py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard
            key={post.slug}
            post={post}
            category={categories.find((c) => c.slug === post.categorySlug)}
          />
        ))}
      </div>
    </section>
  );
}
