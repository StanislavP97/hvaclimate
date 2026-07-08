"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ServiceCardGrid, type ServiceCardData } from "@/components/services/ServiceCardGrid";

export interface ServiceCategory {
  label: string;
  title: string;
  cards: ServiceCardData[];
}

export function ServiceCategoryTabs({
  categories,
}: {
  categories: ServiceCategory[];
}) {
  const [activeLabel, setActiveLabel] = useState(categories[0].label);
  const activeCategory = categories.find(
    (category) => category.label === activeLabel
  )!;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        className="mt-8 flex flex-wrap justify-center gap-2.5 px-6"
      >
        {categories.map((category) => {
          const isActive = category.label === activeLabel;
          return (
            <button
              key={category.label}
              type="button"
              onClick={() => setActiveLabel(category.label)}
              aria-pressed={isActive}
              className={`rounded-full px-6 py-2.75 text-sm font-semibold transition-colors ${
                isActive
                  ? "bg-navy text-white"
                  : "bg-muted text-muted-foreground hover:bg-navy/10"
              }`}
            >
              {category.label}
            </button>
          );
        })}
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory.label}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <h3 className="mx-auto max-w-7xl px-6 pt-16 text-center text-3xl font-extrabold text-foreground">
            {activeCategory.title}
          </h3>
          <ServiceCardGrid cards={activeCategory.cards} />
        </motion.div>
      </AnimatePresence>
    </>
  );
}
