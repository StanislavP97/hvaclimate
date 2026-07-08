"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { BlogCategory, BlogPost } from "@/types/blog";

const gridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function BlogTeaserGrid({
  items,
}: {
  items: { post: BlogPost; category: BlogCategory | undefined }[];
}) {
  return (
    <motion.div
      className="mt-10 grid grid-cols-1 gap-6.5 sm:grid-cols-2 lg:grid-cols-3"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={gridVariants}
    >
      {items.map(({ post, category }) => (
        <motion.div key={post.slug} variants={cardVariants}>
          <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2, ease: "easeOut" }}>
            <Link
              href={`/blog/${post.slug}`}
              className="flex flex-col overflow-hidden rounded-2xl border border-border bg-background transition-shadow duration-200 hover:shadow-[0_8px_24px_rgba(13,27,42,0.12)]"
            >
              <Image
                src={post.thumbnail}
                alt={post.altText}
                width={640}
                height={384}
                className="h-[180px] w-full object-cover"
              />
              <div className="flex flex-1 flex-col p-5.5">
                {category && (
                  <span className="mb-3 inline-flex w-fit items-center rounded-full bg-primary-accent/10 px-3 py-1 text-xs font-semibold text-primary-accent">
                    {category.name}
                  </span>
                )}
                <h3 className="text-[17.5px] leading-snug font-bold text-foreground">
                  {post.name}
                </h3>
                <p className="mt-3 text-[13px] text-muted-foreground">
                  {new Date(post.publishedDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </Link>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
}
