import { CheckCircle2 } from "lucide-react";
import type { EstimateResult } from "@/types/calculator";

interface ResultStepProps {
  firstName: string;
  result: EstimateResult;
}

export function ResultStep({ firstName, result }: ResultStepProps) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-center gap-3 text-center">
        <CheckCircle2 size={40} className="text-emerald-500" />
        <h2 className="text-2xl font-bold text-[#0d1b2a] sm:text-3xl">
          Your estimate is ready, {firstName}!
        </h2>
      </div>

      <div className="rounded-2xl bg-[#0d1b2a] p-8 text-center">
        <p className="text-xs font-semibold tracking-widest text-[#94a3b8] uppercase">Estimated Cost</p>
        <p className="text-5xl font-bold text-[#2563EB]">
          ${result.estimated_price.toLocaleString("en-US")}
        </p>
        <p className="mt-1 text-sm text-gray-500">± 10% · Final price confirmed at free in-home visit</p>
        <p className="mt-3 text-sm text-[#94a3b8]">{result.system_name}</p>
        <p className="mt-1 text-xs text-[#94a3b8]">
          or from ${result.monthly_payment.toLocaleString("en-US")}/mo · 0% for 18 months
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <h3 className="mb-3 text-sm font-semibold text-[#0d1b2a]">What affects your price</h3>
          <div className="flex flex-col gap-2">
            {result.factors.map((factor) => (
              <div
                key={factor}
                className="flex items-start gap-3 rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#334155]"
              >
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#2563EB]" />
                {factor}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-xl border border-[#2563EB]/25 bg-[#2563EB]/8 p-4">
            <p className="mb-1 text-xs font-semibold text-[#2563EB] uppercase">Our Recommendation</p>
            <p className="text-sm text-[#0d1b2a]">{result.recommendation}</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4 text-xs text-[#64748b]">
            ⚠️ Preliminary estimate only — not a final quote. Final pricing requires a free in-home
            assessment. Actual cost may vary based on equipment availability, permits, ductwork condition,
            and site-specific factors.
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <a
          href="https://app.housecallpro.com/book/HVA-Climate-Control"
          className="flex flex-1 items-center justify-center rounded-xl bg-[#2563EB] py-4 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#1d4ed8]"
        >
          📅 Book an In-Person Estimate
        </a>
        <a
          href="tel:+13608882217"
          className="flex flex-1 items-center justify-center rounded-xl border border-[#2563EB] py-4 text-sm font-semibold text-[#2563EB] transition-colors duration-150 hover:bg-[#2563EB]/8"
        >
          📞 (360) 888-2217
        </a>
      </div>
    </div>
  );
}
