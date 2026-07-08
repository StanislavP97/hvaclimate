"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Star } from "lucide-react";
import { HOME_STATS } from "@/components/home/ExperienceBanner";

const TRUST_BAR_STATS = [
  {
    label: "Google Rating",
    target: 4.9,
    decimals: 1,
    suffix: "",
    render: (display: string) => (
      <span className="flex items-center justify-center gap-1.5">
        {display}
        <Star className="size-6 fill-primary-accent text-primary-accent" />
      </span>
    ),
  },
  ...HOME_STATS.map((stat) => {
    const target = parseInt(stat.value, 10);
    const suffix = stat.value.replace(String(target), "");
    return {
      label: stat.label,
      target,
      decimals: 0,
      suffix,
      render: (display: string) => (
        <span>
          {display}
          {suffix}
        </span>
      ),
    };
  }),
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

function CountingStat({
  target,
  decimals,
  render,
}: {
  target: number;
  decimals: number;
  render: (display: string) => React.ReactNode;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState((0).toFixed(decimals));

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const start = performance.now();

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    let frame: number;
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOut(progress);
      setDisplay((target * eased).toFixed(decimals));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };
    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [isInView, target, decimals]);

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="text-3xl font-extrabold text-navy sm:text-[32px]"
    >
      {isInView ? render(display) : render((0).toFixed(decimals))}
    </motion.p>
  );
}

export function TrustBar() {
  return (
    <div className="bg-muted">
      <motion.div
        className="mx-auto grid max-w-7xl grid-cols-2 px-6 sm:grid-cols-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        {TRUST_BAR_STATS.map((stat, index) => (
          <motion.div
            key={stat.label}
            variants={itemVariants}
            className={`border-border px-4 py-8.5 text-center ${
              index % 2 === 0 ? "border-r" : ""
            } ${index < 2 ? "border-b sm:border-b-0" : ""} ${
              index < TRUST_BAR_STATS.length - 1
                ? "sm:border-r"
                : "sm:border-r-0"
            }`}
          >
            <CountingStat
              target={stat.target}
              decimals={stat.decimals}
              render={stat.render}
            />
            <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
