"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";

export interface ServiceCardData {
  title: string;
  description: string;
  href: string;
  imageLabel: string;
}

const gridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export function ServiceCardGrid({ cards }: { cards: ServiceCardData[] }) {
  return (
    <section className="bg-background py-16">
      <motion.div
        className="mx-auto grid max-w-7xl grid-cols-1 gap-6.5 px-6 sm:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={gridVariants}
      >
        {cards.map((card) => (
          <motion.div
            key={card.title}
            variants={cardVariants}
            whileHover={{
              y: -4,
              boxShadow: "0 12px 30px rgba(0,0,0,0.1)",
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-[0_2px_10px_rgba(13,27,42,0.04)]"
          >
            <ImagePlaceholder
              label={card.imageLabel}
              className="h-[190px] w-full"
            />
            <div className="flex flex-1 flex-col p-5.5">
              <h3 className="text-lg font-bold text-foreground">
                {card.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-body">
                {card.description}
              </p>
              <Link
                href={card.href}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-accent"
              >
                View Services
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
