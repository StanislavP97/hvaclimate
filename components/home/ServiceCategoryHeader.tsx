"use client";

import { motion } from "framer-motion";

export function ServiceCategoryHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <p className="text-[13px] font-bold tracking-[0.14em] text-primary-accent uppercase">
        What We Do
      </p>
      <h2 className="mt-3 text-4xl font-extrabold text-foreground">
        We offer a wide range of HVAC services
      </h2>
      <p className="mt-4 text-body">
        We provide anything from heat pump repair to vent cleaning.
      </p>
    </motion.div>
  );
}
