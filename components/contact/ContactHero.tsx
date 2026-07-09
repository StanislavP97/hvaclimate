"use client";

import { motion } from "framer-motion";
import { Phone } from "lucide-react";

export function ContactHero() {
  return (
    <section
      className="relative overflow-hidden bg-navy text-center"
      style={{
        backgroundImage:
          "radial-gradient(120% 160% at 15% 0%, #17304d 0%, #0D1B2A 60%)",
      }}
    >
      <div className="pointer-events-none absolute -top-30 -right-10 size-105 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,.18),transparent_70%)]" />

      <div className="relative mx-auto max-w-[820px] px-6 py-16 lg:py-20">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="inline-flex items-center gap-[9px] rounded-full border border-[#2563EB66] bg-[#2563EB24] px-4 py-1.75 font-sans text-[12.5px] font-semibold text-[#7FB0FF]"
        >
          <Phone className="size-3.5 text-primary-accent" />
          We answer live &mdash; no phone trees
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mt-5 text-[46px] leading-[1.1] font-extrabold tracking-[-0.02em] text-white"
        >
          Get in touch with <span className="text-primary-accent">HVA Climate</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="mt-3.5 text-[17px] text-footer-foreground"
        >
          Same-day repair &middot; Free estimates &middot;{" "}
          <span className="font-semibold text-[#F97316]">4.9&#9733; rated</span>
        </motion.p>
      </div>
    </section>
  );
}
