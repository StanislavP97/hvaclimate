"use client";

import { motion } from "framer-motion";
import type { TierMeta } from "@/components/instant-quote/types";

interface SystemTierCardProps {
  tier: TierMeta;
  isActive: boolean;
  onSelect: () => void;
  index: number;
}

export function SystemTierCard({ tier, isActive, onSelect, index }: SystemTierCardProps) {
  const label = tier.tier.charAt(0).toUpperCase() + tier.tier.slice(1);

  if (tier.tier === "silver") {
    return (
      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        className="rounded-[18px] border border-[#e2e7ee] bg-[#fafafa] transition-all duration-200 ease-out"
      >
        <div className="rounded-t-[17px] bg-[#f1f5f9] px-6 py-4 font-[Plus_Jakarta_Sans,sans-serif] text-sm font-extrabold tracking-wide text-[#64748b]">
          {tier.label}
        </div>
        <div className="p-6">
          <span className="mb-4 inline-block rounded-full bg-white px-3 py-1 text-xs font-bold text-[#64748b]">
            {tier.afue}
          </span>
          <div className="mb-1 font-[Plus_Jakarta_Sans,sans-serif] text-2xl font-extrabold text-[#475569]">
            ${tier.priceLow.toLocaleString()} – ${tier.priceHigh.toLocaleString()}
          </div>
          <div className="mb-5 text-[13.5px] font-semibold text-[#64748b]">
            from ${tier.monthly}/mo
          </div>

          <ul className="mb-0">
            {tier.bullets.map((bullet) => (
              <li
                key={bullet}
                className="mb-[11px] flex items-start gap-2 text-[13.5px] leading-snug text-[#64748b]"
              >
                <span className="mt-px text-[#94a3b8]">·</span>
                {bullet}
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={onSelect}
            className="mt-1.5 w-full rounded-[10px] border border-[#cbd5e1] py-3.5 text-center font-[Plus_Jakarta_Sans,sans-serif] text-sm font-bold text-[#475569] transition-colors hover:bg-[#f1f5f9]"
          >
            {isActive ? "Selected ✓" : `Select ${label}`}
          </button>
        </div>
      </motion.div>
    );
  }

  if (tier.tier === "platinum") {
    return (
      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        className="rounded-[18px] bg-[#0D1B2A] transition-all duration-200 ease-out"
      >
        <div className="px-6 py-4 font-[Plus_Jakarta_Sans,sans-serif] text-sm font-extrabold tracking-wide text-white">
          {tier.label}
        </div>
        <div className="p-6">
          <span className="mb-4 inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white">
            {tier.afue}
          </span>
          <div className="mb-1 font-[Plus_Jakarta_Sans,sans-serif] text-2xl font-extrabold text-white">
            ${tier.priceLow.toLocaleString()} – ${tier.priceHigh.toLocaleString()}
          </div>
          <div className="mb-5 text-[13.5px] font-semibold text-[#94a3b8]">
            from ${tier.monthly}/mo
          </div>

          <ul className="mb-0">
            {tier.bullets.map((bullet) => (
              <li
                key={bullet}
                className="mb-[11px] flex items-start gap-2 text-[13.5px] leading-snug text-[#94a3b8]"
              >
                <span className="mt-px text-[#F97316]">·</span>
                {bullet}
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={onSelect}
            className="mt-1.5 w-full rounded-[10px] border border-white py-3.5 text-center font-[Plus_Jakarta_Sans,sans-serif] text-sm font-bold text-white transition-colors hover:bg-white hover:text-[#0D1B2A]"
          >
            {isActive ? "Selected ✓" : `Select ${label}`}
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="relative rounded-[18px] border-2 border-[#2563EB] bg-white shadow-[0_8px_32px_rgba(37,99,235,0.15)] transition-all duration-200 ease-out"
    >
      <span className="absolute -top-3 right-4 rounded-full bg-[#2563EB] px-3 py-1 font-[Plus_Jakarta_Sans,sans-serif] text-[11px] font-bold text-white">
        MOST POPULAR
      </span>

      <div className="rounded-t-2xl border-b-4 border-[#2563EB] px-6 py-4 font-[Plus_Jakarta_Sans,sans-serif] text-sm font-extrabold tracking-wide text-[#0D1B2A]">
        {tier.label}
      </div>

      <div className="p-6">
        <span className="mb-4 inline-block rounded-full bg-[#eaf1ff] px-3 py-1 text-xs font-bold text-[#2563EB]">
          {tier.afue}
        </span>
        <div className="mb-1 font-[Plus_Jakarta_Sans,sans-serif] text-[28px] font-extrabold text-[#0D1B2A]">
          ${tier.priceLow.toLocaleString()} – ${tier.priceHigh.toLocaleString()}
        </div>
        <div className="mb-5 text-[13.5px] font-semibold text-[#2563EB]">
          from ${tier.monthly}/mo
        </div>

        <ul className="mb-0">
          {tier.bullets.map((bullet) => (
            <li
              key={bullet}
              className="mb-[11px] flex items-start gap-2 text-[13.5px] leading-snug text-[#334155]"
            >
              <span className="mt-px text-[#2563EB]">·</span>
              {bullet}
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={onSelect}
          className="mt-1.5 w-full rounded-[10px] border-[1.5px] border-[#2563EB] bg-[#2563EB] py-3.5 text-center font-[Plus_Jakarta_Sans,sans-serif] text-sm font-bold text-white transition-colors hover:bg-[#1d4ed8]"
        >
          {isActive ? "Selected ✓" : `Select ${label}`}
        </button>
      </div>
    </motion.div>
  );
}
