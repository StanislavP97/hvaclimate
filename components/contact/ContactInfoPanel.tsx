"use client";

import { motion } from "framer-motion";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const panelVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function ContactInfoPanel() {
  return (
    <motion.div
      variants={panelVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="flex flex-col gap-4.5"
    >
      <motion.div
        variants={cardVariants}
        className="relative overflow-hidden rounded-[18px] p-7.5"
        style={{
          backgroundImage:
            "radial-gradient(130% 150% at 12% 0%, #17304d 0%, #0D1B2A 65%)",
        }}
      >
        <div className="pointer-events-none absolute -top-17.5 -right-10 size-65 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,.22),transparent_70%)]" />
        <div className="relative">
          <p className="text-xs font-bold tracking-[0.14em] text-[#7FB0FF] uppercase">
            Call or text
          </p>
          <p className="mt-2.5 text-3xl font-extrabold tracking-[-0.01em] text-white">
            (360) 888-2217
          </p>
          <p className="mt-2 mb-4.5 text-sm text-footer-foreground">
            Live dispatch 7 days a week. Emergency? We prioritize no-heat and
            no-cool calls.
          </p>
          <Button
            render={<a href="tel:+13608882217" />}
            nativeButton={false}
            variant="cta-orange"
            className="gap-2"
          >
            <Phone className="size-4" />
            Call now
          </Button>
        </div>
      </motion.div>

      <motion.div
        variants={cardVariants}
        className="flex flex-col gap-5 rounded-[18px] border border-border p-6.5 shadow-[0_2px_10px_rgba(13,27,42,.04)]"
      >
        <div className="flex items-center gap-3.5">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-[11px] bg-accent text-primary-accent">
            <Mail className="size-[18px]" />
          </span>
          <div>
            <a
              href="mailto:Office@HVAClimate.com"
              className="font-sans text-[15px] font-bold text-foreground"
            >
              Office@HVAClimate.com
            </a>
            <p className="text-[13px] text-muted-foreground">
              Replies within the hour
            </p>
          </div>
        </div>

        <div className="h-px bg-border" />

        <div className="flex items-center gap-3.5">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-[11px] bg-accent text-primary-accent">
            <MapPin className="size-[18px]" />
          </span>
          <div>
            <p className="font-sans text-[15px] font-bold text-foreground">
              Vancouver, WA &middot; Portland, OR
            </p>
            <p className="text-[13px] text-muted-foreground">
              Clark &amp; Multnomah County
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={cardVariants}
        className="rounded-[18px] border border-border p-6.5 shadow-[0_2px_10px_rgba(13,27,42,.04)]"
      >
        <div className="mb-4 flex items-center justify-between">
          <p className="flex items-center gap-2 font-sans text-base font-extrabold text-foreground">
            <Clock className="size-4.5 text-primary-accent" />
            Business hours
          </p>
          <span className="inline-flex items-center gap-1.75 rounded-full bg-[#e7f6ed] px-3 py-1.25 font-sans text-xs font-semibold text-[#1a7f4b]">
            <span className="size-1.75 rounded-full bg-[#22b06b]" />
            Open now
          </span>
        </div>

        <div className="flex flex-col gap-2.75 text-[14.5px]">
          <div className="flex justify-between">
            <span className="text-body">Mon &ndash; Fri</span>
            <span className="font-sans font-semibold text-foreground">
              7:00 AM &ndash; 7:00 PM
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-body">Saturday</span>
            <span className="font-sans font-semibold text-foreground">
              8:00 AM &ndash; 5:00 PM
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-body">Sunday</span>
            <span className="font-sans font-semibold text-foreground">
              Emergency only
            </span>
          </div>
          <div className="my-1 h-px bg-border" />
          <div className="flex items-center justify-between">
            <span className="text-body">Emergency dispatch</span>
            <span className="font-sans font-bold text-[#F97316]">24 / 7</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
