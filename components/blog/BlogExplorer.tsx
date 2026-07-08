"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, Search } from "lucide-react";
import type { BlogCategory, BlogPost } from "@/types/blog";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getBlogCategoryStyle } from "@/lib/blog-category-styles";
import { BlogPostCard } from "@/components/blog/BlogPostCard";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const pillListVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const pillVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

const gridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

interface BlogExplorerProps {
  posts: BlogPost[];
  categories: BlogCategory[];
}

export function BlogExplorer({ posts, categories }: BlogExplorerProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const isSearching = searchQuery.trim().length > 0;
  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  const filteredPosts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const source = isSearching ? posts : remainingPosts;

    return source.filter((post) => {
      const matchesCategory = activeCategory === "All" || post.categorySlug === activeCategory;
      const matchesQuery =
        !query ||
        post.name.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });
  }, [posts, remainingPosts, activeCategory, searchQuery, isSearching]);

  const categoryOf = (slug: string) => categories.find((c) => c.slug === slug);

  const resultsLabel = isSearching
    ? `Results for "${searchQuery.trim()}"`
    : activeCategory === "All"
      ? "All Articles"
      : `${categoryOf(activeCategory)?.name ?? "Filtered"} Articles`;

  return (
    <>
      {/* HERO */}
      <section className="border-b border-border bg-background px-6 pt-16 pb-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-[13px] font-bold tracking-[0.14em] text-primary-accent uppercase"
        >
          The HVA Journal
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="mx-auto mt-3.5 max-w-2xl text-[40px] leading-[1.1] font-extrabold tracking-[-0.02em] text-foreground sm:text-[48px]"
        >
          HVAC Tips, Guides &amp; Local Insights
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="mx-auto mt-3.5 max-w-lg text-[17px] text-muted-foreground"
        >
          Practical advice for Pacific Northwest homeowners.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="mx-auto mt-8 max-w-lg"
        >
          <div className="flex h-[52px] items-center gap-3 rounded-xl border-[1.5px] border-border bg-background px-4.5 text-left shadow-[0_2px_10px_rgba(13,27,42,0.04)] focus-within:border-primary-accent">
            <Search className="size-[17px] shrink-0 text-muted-foreground" />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search articles&hellip;"
              aria-label="Search articles"
              className="w-full bg-transparent text-[15px] text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </div>
        </motion.div>

        <motion.div
          className="mt-6.5 flex flex-wrap justify-center gap-2.5"
          initial="hidden"
          animate="visible"
          variants={pillListVariants}
        >
          {["All", ...categories.map((c) => c.name)].map((label) => {
            const slug = label === "All" ? "All" : categories.find((c) => c.name === label)?.slug ?? label;
            const isActive = activeCategory === slug;
            return (
              <motion.button
                key={label}
                type="button"
                variants={pillVariants}
                onClick={() => setActiveCategory(slug)}
                className={cn(
                  "rounded-full px-4.5 py-2.25 font-sans text-sm font-semibold transition-colors duration-150",
                  isActive
                    ? "bg-navy text-white"
                    : "bg-muted text-muted-foreground hover:bg-muted/70"
                )}
              >
                {label}
              </motion.button>
            );
          })}
        </motion.div>
      </section>

      {/* FEATURED POST */}
      {featuredPost && !isSearching && (
        <section className="bg-background px-6 pt-13 pb-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mx-auto grid max-w-7xl grid-cols-1 overflow-hidden rounded-[20px] border border-border shadow-[0_8px_30px_rgba(13,27,42,0.06)] lg:grid-cols-[1.15fr_1fr]"
          >
            <div className="relative aspect-video lg:aspect-auto lg:min-h-[420px]">
              <ImagePlaceholder
                label={featuredPost.altText}
                className="absolute inset-0 h-full w-full"
              />
              <span className="absolute top-6 left-6 rounded-full bg-[#F97316] px-3.5 py-1.75 font-sans text-xs font-bold tracking-[0.02em] text-white">
                FEATURED
              </span>
            </div>
            <div className="flex flex-col justify-center p-9 sm:p-11">
              {(() => {
                const category = categoryOf(featuredPost.categorySlug);
                const style = getBlogCategoryStyle(featuredPost.categorySlug);
                return category ? (
                  <span
                    className="mb-4.5 inline-flex w-fit items-center rounded-full px-3 py-1.25 font-sans text-[12.5px] font-semibold"
                    style={{ background: style.bg, color: style.color }}
                  >
                    {category.name}
                  </span>
                ) : null;
              })()}
              <h2 className="text-[28px] leading-[1.2] font-extrabold tracking-[-0.02em] text-foreground sm:text-[32px]">
                {featuredPost.name}
              </h2>
              <p className="mt-4 text-base leading-[1.65] text-muted-foreground">
                {featuredPost.excerpt}
              </p>
              <div className="mt-6.5 flex items-center gap-3.5">
                <div className="flex size-11 items-center justify-center rounded-full bg-muted font-sans text-sm font-bold text-muted-foreground">
                  EK
                </div>
                <div>
                  <div className="font-sans text-[14.5px] font-bold text-foreground">Eugene K.</div>
                  <div className="text-[13px] text-muted-foreground">{formatDate(featuredPost.publishedDate)}</div>
                </div>
              </div>
              <Link
                href={`/blog/${featuredPost.slug}`}
                className={buttonVariants({
                  className: "mt-6.5 w-fit rounded-[11px] bg-navy px-6.5 py-3.5 text-[14.5px] hover:bg-navy",
                })}
              >
                Read Article <span aria-hidden>&rarr;</span>
              </Link>
            </div>
          </motion.div>
        </section>
      )}

      {/* POSTS GRID */}
      <section className="bg-background px-6 pt-6 pb-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-7 flex items-baseline justify-between">
            <h3 className="text-[22px] font-extrabold tracking-[-0.01em] text-foreground">
              {resultsLabel}
            </h3>
            <span className="text-sm text-muted-foreground">Sorted by newest</span>
          </div>

          {filteredPosts.length === 0 ? (
            <p className="text-body">No posts found — try a different search or category.</p>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeCategory}-${searchQuery.trim().toLowerCase()}`}
                className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3"
                initial="hidden"
                animate="visible"
                variants={gridVariants}
              >
                {filteredPosts.map((post) => (
                  <motion.div key={post.slug} variants={cardVariants}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      <BlogPostCard post={post} category={categoryOf(post.categorySlug)} />
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* CTA BAND */}
      <section className="bg-background px-6 pb-18">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[22px] px-8 py-11 sm:px-13"
          style={{
            backgroundImage:
              "radial-gradient(120% 180% at 10% 0%, #17304d 0%, #0D1B2A 60%)",
          }}
        >
          <div
            className="pointer-events-none absolute -top-20 right-40 size-75 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(37,99,235,.20), transparent 70%)",
            }}
          />
          <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="flex items-center gap-5.5">
              <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-[#2563EB59] bg-[#2563EB29] text-[#7fb0ff]">
                <Phone className="size-6" />
              </div>
              <div>
                <div className="text-2xl font-extrabold text-white sm:text-[26px]">
                  Need HVAC help now?
                </div>
                <div className="mt-1 text-[15px] text-[#aebccc]">
                  Same-day service across Vancouver &amp; Portland &mdash; comfort can&apos;t wait.
                </div>
              </div>
            </div>
            <div className="flex flex-none flex-wrap items-center gap-3.5">
              <a
                href="tel:3608882217"
                className={buttonVariants({
                  className: "rounded-[11px] px-6.5 py-3.75 text-base",
                })}
              >
                (360) 888-2217
              </a>
              <a
                href="#"
                className={buttonVariants({
                  className:
                    "rounded-[11px] bg-[#F97316] px-6.5 py-3.75 text-base hover:bg-[#F97316]",
                })}
              >
                Book Online
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
