"use client";

import { Thermometer, Wind, Zap, ShieldCheck, type LucideIcon } from "lucide-react";
import type { AddOnMeta } from "@/components/instant-quote/quiz-data";
import type { AddOnId } from "@/components/instant-quote/types";

interface AddOnCheckboxProps {
  addon: AddOnMeta;
  checked: boolean;
  onToggle: () => void;
}

const ADDON_ICONS: Record<AddOnId, LucideIcon> = {
  thermostat: Thermometer,
  purifier: Wind,
  surge: Zap,
  warranty: ShieldCheck,
};

export function AddOnCheckbox({ addon, checked, onToggle }: AddOnCheckboxProps) {
  const Icon = ADDON_ICONS[addon.id];

  return (
    <button
      type="button"
      onClick={onToggle}
      className={`flex w-full items-center gap-4 border-b border-[#f1f5f9] px-2 py-4 text-left transition-colors last:border-b-0 ${
        checked ? "bg-[#f0f7ff]" : "bg-transparent"
      }`}
    >
      <span
        className={`flex h-5 w-5 flex-none items-center justify-center rounded-[6px] text-xs text-white ${
          checked ? "border-2 border-[#2563EB] bg-[#2563EB]" : "border-[1.5px] border-[#cbd5e1] bg-white"
        }`}
      >
        {checked ? "✓" : ""}
      </span>

      <Icon size={20} className="flex-none text-[#2563EB]" />

      <span className="flex-1">
        <span className="font-[Plus_Jakarta_Sans,sans-serif] text-[15.5px] font-bold text-[#0D1B2A]">
          {addon.label}
        </span>
        <span className="block text-[13px] leading-snug text-[#64748b]">{addon.desc}</span>
      </span>

      <span className="flex-none whitespace-nowrap text-sm font-semibold text-[#2563EB]">
        + ${addon.price.toLocaleString()}
      </span>
    </button>
  );
}
