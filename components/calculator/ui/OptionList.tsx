import { cn } from "@/lib/utils";

interface OptionListProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  onAdvance: () => void;
}

export function OptionList({ options, value, onChange, onAdvance }: OptionListProps) {
  return (
    <div className="flex flex-col gap-3">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => {
            onChange(option);
            onAdvance();
          }}
          aria-pressed={value === option}
          className={cn(
            "rounded-xl border px-5 py-4 text-left text-sm font-semibold text-[#0d1b2a] transition-all duration-150",
            value === option
              ? "border-[#2563EB] bg-[#2563EB]/8 shadow-sm"
              : "border-[#e2e8f0] bg-white hover:border-[#2563EB]/40",
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
