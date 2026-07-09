"use client";

import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";

interface StatDef {
  label: string;
  target: number;
  decimals: number;
  suffix: string;
}

const STATS: StatDef[] = [
  { label: "Google Rating", target: 4.9, decimals: 1, suffix: "" },
  { label: "Years Experience", target: 10, decimals: 0, suffix: "+" },
  { label: "Happy Clients", target: 400, decimals: 0, suffix: "+" },
  { label: "Certified Experts", target: 7, decimals: 0, suffix: "+" },
];

function CountingStat({ target, decimals, suffix, label }: StatDef) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState((0).toFixed(decimals));
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const duration = 1400;
            const start = performance.now();
            const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

            const tick = (now: number) => {
              const progress = Math.min((now - start) / duration, 1);
              const eased = easeOut(progress);
              setDisplay((target * eased).toFixed(decimals));
              if (progress < 1) requestAnimationFrame(tick);
              else setDisplay(target.toFixed(decimals));
            };
            requestAnimationFrame(tick);
            observer.unobserve(node);
          }
        });
      },
      { threshold: 0.6 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [target, decimals]);

  return (
    <div ref={ref} className="text-center">
      <div className="flex items-center justify-center gap-1.5 font-sans text-[32px] font-extrabold text-foreground">
        {display}
        {suffix}
        {label === "Google Rating" && (
          <Star className="size-6 fill-[#F97316] text-[#F97316]" />
        )}
      </div>
      <div className="mt-1 text-[13.5px] text-muted-foreground">{label}</div>
    </div>
  );
}

export function ServiceDetailStats() {
  return (
    <div className="border-b border-border bg-muted px-6 py-7.5 sm:px-12">
      <div className="mx-auto flex max-w-7xl items-center justify-around">
        {STATS.map((stat, index) => (
          <div key={stat.label} className="flex items-center">
            {index > 0 && (
              <div className="mr-6 hidden h-11 w-px bg-border sm:block md:mr-10" />
            )}
            <CountingStat {...stat} />
          </div>
        ))}
      </div>
    </div>
  );
}
