"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function AboutHero() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20 text-center">
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        className="text-sm font-semibold tracking-wide text-primary-accent uppercase"
      >
        About Us
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className="mt-4 text-4xl font-bold text-foreground sm:text-5xl"
      >
        Over 10+ Years Experience In HVAC Service
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        className="mt-4 text-lg font-semibold text-primary-accent"
      >
        Licensed, Bonded, &amp; Insured in Washington &amp; Oregon
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
        className="mt-4 text-body"
      >
        Proudly serving Vancouver and Portland with reliable HVAC repairs,
        installations, and maintenance for homes and businesses.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
      >
        <Button render={<Link href="/contact" />} nativeButton={false} className="mt-8">
          Get a quote
        </Button>
      </motion.div>
    </section>
  );
}
