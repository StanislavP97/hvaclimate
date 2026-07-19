"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ServiceCategoryCard } from "@/components/services/ServiceCategoryLayout";

const gridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export function ServiceCategoryRevealGrid({
  cards,
}: {
  cards: ServiceCategoryCard[];
}) {
  return (
    <motion.div
      className="mx-auto grid max-w-7xl grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={gridVariants}
    >
      {cards.map((card) => (
        <motion.div
          key={card.title}
          variants={cardVariants}
          whileHover={{ y: -4, boxShadow: "0 12px 30px rgba(0,0,0,0.08)" }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="cursor-pointer overflow-hidden rounded-2xl border border-[#eaeef3] bg-white"
        >
          <div className="relative aspect-video w-full">
            <Image
              src={card.thumbnail}
              alt={card.altText ?? card.imageLabel}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          </div>
          <div className="p-6">
            <h3 className="mb-2 font-sans text-lg font-bold text-foreground">
              {card.title}
            </h3>
            <p className="mb-4.5 text-sm leading-relaxed text-[#64748b]">
              {card.description}
            </p>
            <Link
              href={card.href}
              className="inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-primary-accent"
            >
              <span>View Service</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
