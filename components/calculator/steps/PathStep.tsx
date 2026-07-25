import { Home, Wind } from "lucide-react";
import { OptionCard } from "@/components/calculator/ui/OptionCard";
import { TrustBadges } from "@/components/calculator/ui/TrustBadges";
import type { SystemPath } from "@/types/calculator";

interface PathStepProps {
  value: SystemPath | "";
  onSelect: (path: SystemPath) => void;
}

export function PathStep({ value, onSelect }: PathStepProps) {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#0d1b2a] sm:text-3xl">
          Central air or ductless mini split?
        </h2>
        <p className="mt-2 text-sm text-[#64748b]">
          Both qualify for up to $8,000 in federal tax credits — before they expire Dec 2026
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <OptionCard icon={Home} label="Central Air System" selected={value === "central"} onClick={() => onSelect("central")} />
        <OptionCard icon={Wind} label="Ductless / Mini Split" selected={value === "minisplit"} onClick={() => onSelect("minisplit")} />
      </div>

      <TrustBadges />
    </div>
  );
}
