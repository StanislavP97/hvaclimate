import type { SizingResult } from "@/components/instant-quote/types";

interface EstimatedCapacityCardProps {
  result: SizingResult | null;
}

export function EstimatedCapacityCard({ result }: EstimatedCapacityCardProps) {
  return (
    <div className="rounded-[20px] bg-[#0e1122] p-6 lg:sticky lg:top-8">
      <p className="text-xs font-semibold tracking-wide text-[#92a0b9]">ESTIMATED CAPACITY</p>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-white/5 p-4">
          <p className="text-xs tracking-wide text-[#92a0b9]">COOLING</p>
          <p className="mt-2 text-2xl font-semibold text-white">
            {result ? result.coolingTons : "—"}
          </p>
          <p className="text-xs text-[#92a0b9]">tons</p>
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
            {result && <div className="h-full w-full rounded-full bg-[#2563EB]" />}
          </div>
        </div>

        <div className="rounded-xl bg-white/5 p-4">
          <p className="text-xs tracking-wide text-[#92a0b9]">HEATING</p>
          <p className="mt-2 text-2xl font-semibold text-white">
            {result ? result.heatingBtu.toLocaleString() : "—"}
          </p>
          <p className="text-xs text-[#92a0b9]">BTU/h output</p>
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
            {result && <div className="h-full w-full rounded-full bg-[#F97316]" />}
          </div>
        </div>
      </div>

      <p className="mt-5 text-sm text-[#92a0b9]">
        {result
          ? "Here's your recommended equipment size and type based on what you told us."
          : "Fill in the form and your recommended equipment size and type will show up here."}
      </p>
    </div>
  );
}
