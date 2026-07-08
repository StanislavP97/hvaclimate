import { getBlogPosts } from "@/lib/blog-posts";
import { getBlogCategoryBySlug } from "@/lib/blog-categories";
import { BlogTeaserGrid } from "@/components/home/BlogTeaserGrid";
import { BrowseArticlesLink } from "@/components/home/BrowseArticlesLink";

export function BlogTeaser() {
  const posts = getBlogPosts().slice(0, 3);

  if (posts.length === 0) {
    return null;
  }

  const items = posts.map((post) => ({
    post,
    category: getBlogCategoryBySlug(post.categorySlug),
  }));

  return (
    <section className="bg-muted py-19">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[13px] font-bold tracking-[0.14em] text-primary-accent uppercase">
              Resources
            </p>
            <h2 className="mt-3 text-4xl font-extrabold text-foreground">
              Check our latest articles
            </h2>
          </div>
          <BrowseArticlesLink />
        </div>

        <BlogTeaserGrid items={items} />
      </div>
    </section>
  );
}
