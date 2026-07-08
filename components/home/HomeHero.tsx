"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Phone, Wrench } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";

export const HOME_HERO_FEATURES = [
  {
    icon: Check,
    title: "Precision-Tuned HVAC Solutions",
    description:
      "We don't offer cookie-cutter installs — every system is sized and configured for maximum comfort and efficiency in your home.",
  },
  {
    icon: Phone,
    title: "Emergency-Ready, Anytime Calls",
    description:
      "We prioritize fast response times and reliable service so you're never left sweating (or freezing) when it matters most.",
  },
  {
    icon: Wrench,
    title: "Energy Savings That Last",
    description:
      "Our installs don't just work — they work smarter, saving you money month after month with optimized performance and airflow.",
  },
];

const featureListVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.15,
    },
  },
};

const featureItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function HomeHero() {
  return (
    <section
      className="relative overflow-hidden bg-navy"
      style={{
        backgroundImage:
          "radial-gradient(120% 140% at 15% 0%, color-mix(in srgb, var(--color-navy) 55%, var(--primary)) 0%, var(--color-navy) 55%)",
      }}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 py-18 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <div>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="inline-flex items-center gap-[9px] rounded-full border border-[#2563EB66] bg-[#2563EB24] px-4 py-2 font-sans text-[13px] font-semibold tracking-[0.02em] text-[#7FB0FF]"
          >
            <span className="h-[7px] w-[7px] rounded-full bg-[#2563EB]" />
            Licensed · Bonded · Insured
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="mt-6 text-[54px] leading-[1.06] font-extrabold tracking-[-0.02em] text-white"
          >
            Your HVAC Contractor in Vancouver, WA
          </motion.h1>

          <motion.ul
            className="mt-9 flex flex-col gap-4"
            initial="hidden"
            animate="visible"
            variants={featureListVariants}
          >
            {HOME_HERO_FEATURES.map((feature) => (
              <motion.li
                key={feature.title}
                variants={featureItemVariants}
                className="flex items-center gap-3.5"
              >
                <span className="flex size-9.5 shrink-0 items-center justify-center rounded-lg bg-primary-accent/15 text-primary-accent">
                  <feature.icon className="size-[17px]" />
                </span>
                <div>
                  <h2 className="text-[15.5px] font-bold text-white">
                    {feature.title}
                  </h2>
                  <p className="mt-0.5 text-sm text-footer-foreground">
                    {feature.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
            className="mt-9 flex flex-wrap items-center gap-3.5"
          >
            <a
              href="tel:3608882217"
              className={buttonVariants({
                className: "rounded-[11px] px-6.5 py-3.75 text-base",
              })}
            >
              (360) 888-2217
            </a>
            <Link
              href="/heating"
              className={buttonVariants({
                variant: "outline-dark",
                className: "rounded-[11px] px-6.5 py-3.75 text-base",
              })}
            >
              Browse our services
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
        >
          <ImagePlaceholder
            label="HVA Climate Control service van"
            className="h-[480px] w-full rounded-[18px]"
          />
        </motion.div>
      </div>
    </section>
  );
}
