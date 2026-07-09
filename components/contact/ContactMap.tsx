"use client";

import { motion } from "framer-motion";

export function ContactMap() {
  return (
    <section className="bg-background px-6 pb-19 lg:px-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto max-w-7xl overflow-hidden rounded-[20px] border border-border shadow-[0_2px_10px_rgba(13,27,42,.04)]"
      >
        <iframe
          title="HVA Climate service area map"
          src="https://www.google.com/maps?q=Vancouver,WA&z=10&output=embed"
          width="100%"
          height="460"
          className="block border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </motion.div>
    </section>
  );
}
