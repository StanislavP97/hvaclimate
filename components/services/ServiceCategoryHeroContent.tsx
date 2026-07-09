"use client";

import { motion } from "framer-motion";
import { Check, Star, Phone } from "lucide-react";

const CHIPS = [
  { icon: Check, label: "Licensed" },
  { icon: Check, label: "Bonded" },
  { icon: Check, label: "Insured" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const, delay },
  }),
};

export function ServiceCategoryHeroContent({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="relative mx-auto max-w-3xl text-center">
      <motion.div
        initial="hidden"
        animate="visible"
        custom={0}
        variants={fadeUp}
        className="mb-6.5 inline-flex items-center gap-2 rounded-full border border-primary-accent/50 bg-primary-accent/16 px-4.5 py-2 font-sans text-[12.5px] font-bold tracking-[0.14em] text-[#8fb8ff] uppercase"
      >
        {eyebrow}
      </motion.div>
      <motion.h1
        initial="hidden"
        animate="visible"
        custom={0.12}
        variants={fadeUp}
        className="mb-5 font-sans text-[52px] leading-[1.1] font-extrabold tracking-[-0.02em] text-white"
      >
        {title}
      </motion.h1>
      <motion.p
        initial="hidden"
        animate="visible"
        custom={0.24}
        variants={fadeUp}
        className="mx-auto mb-7.5 max-w-[640px] text-lg leading-relaxed text-[#aebccc]"
      >
        {description}
      </motion.p>
      <motion.div
        initial="hidden"
        animate="visible"
        custom={0.34}
        variants={fadeUp}
        className="mb-9.5 flex flex-wrap items-center justify-center gap-x-5.5 gap-y-2.5 text-[15px] font-medium text-[#dbe4ee]"
      >
        {CHIPS.map(({ icon: Icon, label }) => (
          <span key={label} className="flex items-center gap-2">
            <Icon className="size-4 text-primary-accent" />
            {label}
          </span>
        ))}
        <span className="flex items-center gap-2">
          <Star className="size-4 fill-[#F97316] text-[#F97316]" />
          4.9 Rated
        </span>
      </motion.div>
      <motion.div
        initial="hidden"
        animate="visible"
        custom={0.44}
        variants={fadeUp}
        className="flex flex-wrap items-center justify-center gap-3.5"
      >
        <a
          href="tel:+13608882217"
          className="flex items-center gap-2 rounded-[11px] bg-primary-accent px-6.5 py-4 font-sans text-base font-bold text-white shadow-[0_10px_26px_rgba(37,99,235,0.4)] transition-transform hover:-translate-y-0.5"
        >
          <Phone className="size-4" />
          (360) 888-2217
        </a>
        <a
          href="/instant-quote"
          className="flex items-center gap-2 rounded-[11px] bg-[#F97316] px-6.5 py-4 font-sans text-base font-bold text-white shadow-[0_10px_26px_rgba(249,115,22,0.35)] transition-transform hover:-translate-y-0.5"
        >
          Get Free Estimate
        </a>
      </motion.div>
    </div>
  );
}
