"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { STEP1_OPTIONS } from "@/components/instant-quote/quiz-data";
import type { ServiceType } from "@/components/instant-quote/types";

interface QuizStep1ServiceTypeProps {
  value: ServiceType | null;
  onNext: (value: ServiceType) => void;
}

export function QuizStep1ServiceType({ value, onNext }: QuizStep1ServiceTypeProps) {
  const [selected, setSelected] = useState<ServiceType | null>(value);
  const canProceed = !!selected;

  return (
    <div>
      <h2 className="mb-2 text-center font-[Plus_Jakarta_Sans,sans-serif] text-[25px] font-extrabold text-[#0D1B2A] max-sm:text-[19px]">
        How can we help you today?
      </h2>
      <p className="mb-7 text-center text-[15px] text-[#64748b] max-sm:text-[13px]">
        Select the option that best describes your situation
      </p>

      <div className="mb-7 grid grid-cols-2 gap-4 max-sm:mb-5 max-sm:grid-cols-1 max-sm:gap-3">
        {STEP1_OPTIONS.map((opt) => {
          const isSelected = selected === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => setSelected(opt.id)}
              className={`relative min-h-[80px] rounded-2xl p-[22px] text-left transition-colors ${
                isSelected
                  ? "border-2 border-[#2563EB] bg-[#eaf1ff]"
                  : "border border-[#eaeef3] bg-white hover:border-[#2563EB]/60"
              }`}
            >
              {isSelected && (
                <span className="absolute right-3.5 top-3.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#2563EB] text-[13px] text-white">
                  ✓
                </span>
              )}
              <div
                className="mb-4 flex h-[52px] w-[52px] items-center justify-center rounded-full text-2xl max-sm:mb-3 max-sm:h-[42px] max-sm:w-[42px] max-sm:text-xl"
                style={{ background: opt.iconBg, color: opt.iconColor }}
              >
                {opt.emoji}
              </div>
              <div className="mb-1.5 font-[Plus_Jakarta_Sans,sans-serif] text-[16.5px] font-bold text-[#0D1B2A] max-sm:text-[15px]">
                {opt.title}
              </div>
              <div className="text-[13.5px] leading-snug text-[#64748b] max-sm:text-[12.5px]">
                {opt.sub}
              </div>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => selected && onNext(selected)}
        disabled={!canProceed}
        className={`group flex w-full min-h-[60px] items-center justify-center gap-2 rounded-[11px] py-4 text-center font-[Plus_Jakarta_Sans,sans-serif] text-[15.5px] font-bold transition-colors ${
          canProceed
            ? "cursor-pointer bg-[#2563EB] text-white shadow-[0_8px_20px_rgba(37,99,235,.3)] hover:bg-[#1d4ed8]"
            : "cursor-not-allowed bg-[#e2e8f0] text-[#94a3b8]"
        }`}
      >
        <span>Next</span>
        <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
      </button>
    </div>
  );
}
