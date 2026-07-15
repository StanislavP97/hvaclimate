"use client";

import { useState } from "react";
import { STEP2_OPTIONS } from "@/components/instant-quote/quiz-data";
import type { HomeSize } from "@/components/instant-quote/types";

interface QuizStep2HomeSizeProps {
  value: HomeSize | null;
  onNext: (value: HomeSize) => void;
}

export function QuizStep2HomeSize({ value, onNext }: QuizStep2HomeSizeProps) {
  const [selected, setSelected] = useState<HomeSize | null>(value);
  const canProceed = !!selected;

  return (
    <div>
      <h2 className="mb-2 text-center font-[Plus_Jakarta_Sans,sans-serif] text-[25px] font-extrabold text-[#0D1B2A] max-sm:text-[19px]">
        What is the approximate size of your home?
      </h2>
      <p className="mb-7 text-center text-[15px] text-[#64748b] max-sm:text-[13px]">
        Living space only — skip unfinished basements or garages
      </p>

      <div className="mb-7 grid grid-cols-3 gap-3.5 max-sm:mb-5 max-sm:grid-cols-1 max-sm:gap-2.5">
        {STEP2_OPTIONS.map((opt) => {
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
              {opt.badge && (
                <span className="absolute -top-2.5 right-3 rounded-full bg-[#2563EB] px-2.5 py-1 font-[Plus_Jakarta_Sans,sans-serif] text-[11px] font-bold text-white max-sm:hidden">
                  Most Common
                </span>
              )}
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
        className={`w-full min-h-[60px] rounded-[11px] py-4 text-center font-[Plus_Jakarta_Sans,sans-serif] text-[15.5px] font-bold transition-colors ${
          canProceed
            ? "cursor-pointer bg-[#2563EB] text-white shadow-[0_8px_20px_rgba(37,99,235,.3)] hover:bg-[#1d4ed8]"
            : "cursor-not-allowed bg-[#e2e8f0] text-[#94a3b8]"
        }`}
      >
        Next →
      </button>
    </div>
  );
}
