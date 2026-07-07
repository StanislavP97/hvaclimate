import Image from "next/image";
import Link from "next/link";
import { getBlogPosts } from "@/lib/blog-posts";
import { buttonVariants } from "@/components/ui/button";

export function BlogTeaser() {
  const posts = getBlogPosts().slice(0, 3);

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="bg-background py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold tracking-wide text-primary-accent">
              BLOG
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-foreground">
              Check our lastest articles
            </h2>
            <p className="mt-2 text-body">
              Discover seasonal HVAC tips, expert repair advice, and
              energy-saving insights from the HVA Climate Control team.
            </p>
          </div>
          <Link
            href="/blog"
            className={buttonVariants({ variant: "outline", className: "rounded-full px-6" })}
          >
            Browse all articles
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="flex flex-col overflow-hidden rounded-2xl border border-border"
            >
              <Image
                src={post.thumbnail}
                alt={post.altText}
                width={640}
                height={384}
                className="h-40 w-full object-cover"
              />
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-bold text-foreground">
                  {post.name}
                </h3>
                <p className="mt-2 text-sm text-body">
                  {new Date(post.publishedDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
