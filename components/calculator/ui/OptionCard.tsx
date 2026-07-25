import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface OptionCardProps {
  icon: LucideIcon;
  label: string;
  selected: boolean;
  onClick: () => void;
}

export function OptionCard({ icon: Icon, label, selected, onClick }: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "flex flex-col items-center gap-3 rounded-xl border p-5 text-center transition-all duration-150",
        selected
          ? "border-[#2563EB] bg-[#2563EB]/8 shadow-sm"
          : "border-[#e2e8f0] bg-white hover:border-[#2563EB]/40",
      )}
    >
      <Icon size={32} className="text-[#2563EB]" />
      <span className="text-sm font-semibold text-[#0d1b2a]">{label}</span>
    </button>
  );
}
