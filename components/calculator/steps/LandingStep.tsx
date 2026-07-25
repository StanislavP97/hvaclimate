interface LandingStepProps {
  onStart: () => void;
}

export function LandingStep({ onStart }: LandingStepProps) {
  return (
    <div className="flex flex-col items-center gap-6 py-6 text-center">
      <span className="rounded-full border border-[#2563EB]/30 px-4 py-1.5 text-xs font-semibold text-[#2563EB]">
        ⚡ AI-Powered Instant Estimate
      </span>

      <h1 className="max-w-2xl text-3xl font-bold text-[#0d1b2a] sm:text-4xl">
        Find Out What Your New HVAC System Will Cost
      </h1>

      <p className="max-w-xl text-base text-[#64748b]">
        Answer a few quick questions — our AI calculates a personalized cost estimate for your Vancouver WA
        home.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium text-[#0d1b2a]">
        <span>🕐 Takes ~2 minutes</span>
        <span>💲 100% Free</span>
        <span>🛡 No spam, ever</span>
      </div>

      <div className="flex items-center gap-2 text-sm text-[#64748b]">
        <span className="text-amber-400">★★★★★</span>
        <span className="font-semibold text-[#0d1b2a]">4.8</span>
        <span>· 158 Google Reviews</span>
      </div>

      <button
        type="button"
        onClick={onStart}
        className="w-full max-w-xs rounded-xl bg-[#2563EB] py-4 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#1d4ed8]"
      >
        ⚡ Get My Free AI Estimate →
      </button>

      <p className="text-xs text-[#64748b]">Licensed · Bonded · Insured · Vancouver WA &amp; Portland OR</p>
    </div>
  );
}
