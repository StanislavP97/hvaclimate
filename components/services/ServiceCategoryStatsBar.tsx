"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

const STATS = [
  { to: 4.9, decimals: 1, suffix: "", star: true, label: "Google Rating" },
  { to: 10, decimals: 0, suffix: "+", star: false, label: "Years Experience" },
  { to: 400, decimals: 0, suffix: "+", star: false, label: "Happy Clients" },
  { to: 7, decimals: 0, suffix: "+", star: false, label: "Certified Experts" },
];

function Counter({ to, decimals }: { to: number; decimals: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => v.toFixed(decimals));

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, to, { duration: 1.2, ease: "easeOut" });
      return () => controls.stop();
    }
  }, [isInView, count, to]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export function ServiceCategoryStatsBar() {
  return (
    <div className="border-y border-[#eef1f5] bg-white px-12 py-8.5">
      <div className="mx-auto grid max-w-7xl grid-cols-2 items-center sm:grid-cols-4">
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className={
              i < STATS.length - 1
                ? "border-r border-[#eef1f5] py-2 text-center"
                : "py-2 text-center"
            }
          >
            <div className="font-sans text-[34px] font-extrabold text-foreground">
              <Counter to={stat.to} decimals={stat.decimals} />
              {stat.suffix}
              {stat.star && <span className="ml-1 text-[26px] text-[#F97316]">★</span>}
            </div>
            <div className="mt-1 text-sm text-[#64748b]">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
