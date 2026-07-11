"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HOME_HERO_FEATURES } from "@/components/home/HomeHero";

const WHY_CHOOSE_US_ITEMS = [
  {
    title: "Licensed, Bonded & Insured",
    description:
      "Work with a fully licensed, bonded, and insured HVAC contractor for total peace of mind.",
  },
  ...HOME_HERO_FEATURES.map((feature) => ({
    title: feature.title,
    description: feature.description,
  })),
];

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export function WhyChooseUs() {
  return (
    <section className="bg-muted">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 py-19 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="relative h-[430px] w-full overflow-hidden rounded-[18px]">
            <Image
              src="/images/team/technician-at-work.avif"
              alt="HVA Climate Control technician at work"
              fill
              loading="eager"
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </motion.div>

        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          >
            <p className="text-[13px] font-bold tracking-[0.14em] text-primary-accent uppercase">
              Why Choose Us
            </p>
            <h2 className="mt-3 text-4xl font-extrabold text-foreground">
              The trusted HVAC partner homeowners count on
            </h2>
          </motion.div>

          <motion.div
            className="mt-8.5 flex flex-col gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={listVariants}
          >
            {WHY_CHOOSE_US_ITEMS.map((item) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                className="flex gap-3.5"
              >
                <span className="flex size-6.5 shrink-0 items-center justify-center rounded-full bg-primary-accent text-white">
                  <Check className="size-3.5" />
                </span>
                <div>
                  <p className="font-bold text-foreground">{item.title}</p>
                  <p className="mt-0.75 text-sm text-body">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.4,
              delay: 0.2 + WHY_CHOOSE_US_ITEMS.length * 0.15,
              ease: "easeOut",
            }}
          >
            <Button render={<Link href="/contact" />} nativeButton={false} className="mt-8.5">
              Get a quote
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
