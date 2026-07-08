"use client";

import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";

const textVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const textItemVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function GoalsSection() {
  return (
    <section className="bg-section-dark pb-20 text-footer-foreground">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textVariants}
        >
          <motion.p
            variants={textItemVariants}
            className="text-sm font-semibold tracking-wide text-primary-accent uppercase"
          >
            Our Goals
          </motion.p>
          <motion.h2
            variants={textItemVariants}
            className="mt-4 text-3xl font-bold text-footer-heading sm:text-4xl"
          >
            Provide exceptional HVAC services that exceed customer
            expectations
          </motion.h2>
          <motion.p variants={textItemVariants} className="mt-4">
            Our goal is to deliver consistent, high-quality service that
            ensures your HVAC systems operate at peak performance
            year-round.
          </motion.p>
          <motion.div
            variants={textItemVariants}
            transition={{ duration: 0.4, delay: 0.3 + 0.15 * 2, ease: "easeOut" }}
          >
            <a
              href="/instant-quote"
              className={buttonVariants({ className: "mt-6 rounded-full px-8" })}
            >
              Get a quote
            </a>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <ImagePlaceholder
            label="AC condenser unit"
            className="h-80 w-full rounded-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
}
