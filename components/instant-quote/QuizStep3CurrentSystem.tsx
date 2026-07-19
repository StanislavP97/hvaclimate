"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { STEP3_OPTIONS } from "@/components/instant-quote/quiz-data";
import type { CurrentSystem } from "@/components/instant-quote/types";

interface QuizStep3CurrentSystemProps {
  value: CurrentSystem | null;
  onNext: (value: CurrentSystem) => void;
}

export function QuizStep3CurrentSystem({ value, onNext }: QuizStep3CurrentSystemProps) {
  const [selected, setSelected] = useState<CurrentSystem | null>(value);
  const canProceed = !!selected;

  return (
    <div>
      <h2 className="mb-2 text-center font-[Plus_Jakarta_Sans,sans-serif] text-[25px] font-extrabold text-[#0D1B2A] max-sm:text-[19px]">
        How do you currently heat your home?
      </h2>
      <p className="mb-7 text-center text-[15px] text-[#64748b] max-sm:text-[13px]">
        This helps us recommend the right replacement system
      </p>

      <div className="mb-7 grid grid-cols-3 gap-3.5 max-sm:mb-5 max-sm:grid-cols-1 max-sm:gap-2.5">
        {STEP3_OPTIONS.map((opt) => {
          const isSelected = selected === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => setSelected(opt.id)}
              className={`relative min-h-20 rounded-2xl p-[22px] text-left transition-colors max-sm:flex max-sm:min-h-0 max-sm:items-center max-sm:gap-3 max-sm:rounded-[14px] max-sm:p-3.5 ${
                isSelected
                  ? "border-2 border-[#2563EB] bg-[#eaf1ff]"
                  : "border border-[#eaeef3] bg-white hover:border-[#2563EB]/60"
              }`}
            >
              {isSelected && (
                <span className="absolute right-3.5 top-3.5 flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[#2563EB] text-xs text-white max-sm:static max-sm:ml-auto max-sm:h-5 max-sm:w-5">
                  ✓
                </span>
              )}
              <div className="mb-2.5 text-[28px] max-sm:mb-0 max-sm:text-[22px]">{opt.emoji}</div>
              <div className="flex-1">
                <div className="mb-1 font-[Plus_Jakarta_Sans,sans-serif] text-[15px] font-bold text-[#0D1B2A] max-sm:mb-0 max-sm:text-sm">
                  {opt.title}
                </div>
                <div className="text-[12.5px] leading-snug text-[#64748b] max-sm:text-xs">
                  {opt.sub}
                </div>
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
