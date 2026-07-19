"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function BrowseArticlesLink() {
  return (
    <motion.div initial="rest" whileHover="hover" animate="rest">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-accent"
      >
        <motion.span
          variants={{ rest: { opacity: 0.85 }, hover: { opacity: 1 } }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          Browse all articles
        </motion.span>
        <motion.span
          variants={{ rest: { x: 0 }, hover: { x: 4 } }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="flex items-center"
        >
          <ArrowRight size={14} />
        </motion.span>
      </Link>
    </motion.div>
  );
}
