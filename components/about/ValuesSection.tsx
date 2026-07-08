"use client";

import { motion } from "framer-motion";
import { Handshake, ShieldCheck, HeartHandshake, Star } from "lucide-react";

const VALUES = [
  {
    icon: Handshake,
    title: "Trust",
    description:
      "We build lasting relationships with our customers through honest service and dependable results.",
  },
  {
    icon: Star,
    title: "Integrity",
    description:
      "We do what's right, even when no one's looking. Our word is backed by quality workmanship.",
  },
  {
    icon: ShieldCheck,
    title: "Security",
    description:
      "Your home's comfort and safety matter. We install and maintain HVAC systems you can count on.",
  },
  {
    icon: HeartHandshake,
    title: "Commitment",
    description:
      "From first call to final install, we stay dedicated to your comfort, satisfaction, and long-term support.",
  },
];

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

const iconVariants = {
  hidden: { scale: 0 },
  visible: {
    scale: 1,
    transition: { duration: 0.4, delay: 0.1, ease: "easeOut" as const },
  },
};

export function ValuesSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <p className="text-sm font-semibold tracking-wide text-primary-accent uppercase">
          Our Values
        </p>
        <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
          The values that drive us
        </h2>
      </motion.div>

      <motion.div
        className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={gridVariants}
      >
        {VALUES.map(({ icon: Icon, title, description }) => (
          <motion.div
            key={title}
            variants={cardVariants}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <motion.span
              variants={iconVariants}
              className="flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground"
            >
              <Icon className="size-7" />
            </motion.span>
            <h3 className="mt-4 text-lg font-bold text-foreground">
              {title}
            </h3>
            <p className="mt-2 text-sm text-body">{description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
