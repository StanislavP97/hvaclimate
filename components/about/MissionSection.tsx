"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const MISSION_POINTS = [
  "Skilled in servicing all major HVAC brands and models",
  "Trained in diagnosing heating and cooling issues quickly and accurately",
  "Trusted for fast, reliable repairs and full system installations",
];

const textVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const textItemVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const listVariants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.45, staggerChildren: 0.1 },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export function MissionSection() {
  return (
    <section className="bg-section-dark py-20 text-footer-foreground">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="relative h-80 w-full overflow-hidden rounded-2xl">
            <Image
              src="/images/hero/service-van.avif"
              alt="Technician with service van"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </motion.div>
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
            Our Mission
          </motion.p>
          <motion.h2
            variants={textItemVariants}
            className="mt-4 text-3xl font-bold text-footer-heading sm:text-4xl"
          >
            Deliver reliable HVAC solutions for all types of heating and
            cooling systems
          </motion.h2>
          <motion.p variants={textItemVariants} className="mt-4">
            We provide expert heating, ventilation, and air conditioning
            services designed to ensure comfort and efficiency in your home
            or business. From seasonal tune-ups to full system
            installations, we&rsquo;re committed to quality and reliability.
          </motion.p>

          <motion.ul
            className="mt-6 space-y-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={listVariants}
          >
            {MISSION_POINTS.map((point) => (
              <motion.li
                key={point}
                variants={listItemVariants}
                className="flex items-start gap-3"
              >
                <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary-accent" />
                <span>{point}</span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.4,
              delay: 0.45 + MISSION_POINTS.length * 0.1,
              ease: "easeOut",
            }}
          >
            <Button render={<Link href="/contact" />} nativeButton={false} className="mt-6">
              Get a quote
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
