"use client";

import { motion } from "framer-motion";
import type { BlogCategory, BlogPost } from "@/types/blog";
import { BlogPostCard } from "@/components/blog/BlogPostCard";

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
          <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2, ease: "easeOut" }}>
            <BlogPostCard post={post} category={category} />
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
}
