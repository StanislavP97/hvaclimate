import { cn } from "@/lib/utils";
import { CheckCircle2, Circle } from "lucide-react";

interface MultiSelectProps {
  options: string[];
  selected: string[];
  onToggle: (option: string) => void;
  onContinue: () => void;
}

export function MultiSelect({ options, selected, onToggle, onContinue }: MultiSelectProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {options.map((option) => {
          const isSelected = selected.includes(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => onToggle(option)}
              aria-pressed={isSelected}
              className={cn(
                "flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-sm font-semibold text-[#0d1b2a] transition-all duration-150",
                isSelected
                  ? "border-[#2563EB] bg-[#2563EB]/8 shadow-sm"
                  : "border-[#e2e8f0] bg-white hover:border-[#2563EB]/40",
              )}
            >
              {isSelected ? (
                <CheckCircle2 size={20} className="shrink-0 text-[#2563EB]" />
              ) : (
                <Circle size={20} className="shrink-0 text-[#cbd5e1]" />
              )}
              {option}
            </button>
          );
        })}
      </div>
      <button
        type="button"
        onClick={onContinue}
        className="w-full rounded-xl bg-[#2563EB] py-4 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#1d4ed8]"
      >
        Continue
      </button>
    </div>
  );
}
