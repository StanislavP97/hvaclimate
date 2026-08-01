import { Loader2 } from "lucide-react";
import type { CalculatorState } from "@/types/calculator";

interface ContactStepProps {
  state: CalculatorState;
  onChange: (field: keyof CalculatorState, value: string) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export function ContactStep({ state, onChange, onSubmit, isSubmitting }: ContactStepProps) {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#0d1b2a] sm:text-3xl">Almost done — how do we reach you?</h2>
        <p className="mt-2 text-sm text-[#64748b]">Your free AI estimate is just one step away</p>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
        className="flex flex-col gap-4"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            required
            placeholder="First Name"
            aria-label="First name"
            value={state.firstName}
            onChange={(event) => onChange("firstName", event.target.value)}
            className="rounded-xl border border-[#e2e8f0] px-4 py-3 text-base text-[#0d1b2a] outline-none focus:border-[#2563EB]"
          />
          <input
            required
            placeholder="Last Name"
            aria-label="Last name"
            value={state.lastName}
            onChange={(event) => onChange("lastName", event.target.value)}
            className="rounded-xl border border-[#e2e8f0] px-4 py-3 text-base text-[#0d1b2a] outline-none focus:border-[#2563EB]"
          />
        </div>
        <input
          required
          type="tel"
          placeholder="Phone Number"
          aria-label="Phone number"
          value={state.phone}
          onChange={(event) => onChange("phone", event.target.value)}
          className="rounded-xl border border-[#e2e8f0] px-4 py-3 text-base text-[#0d1b2a] outline-none focus:border-[#2563EB]"
        />
        <input
          required
          type="email"
          placeholder="Email Address"
          aria-label="Email address"
          value={state.email}
          onChange={(event) => onChange("email", event.target.value)}
          className="rounded-xl border border-[#e2e8f0] px-4 py-3 text-base text-[#0d1b2a] outline-none focus:border-[#2563EB]"
        />
        <input
          required
          placeholder="Service Address or Zip Code"
          aria-label="Service address or zip code"
          value={state.address}
          onChange={(event) => onChange("address", event.target.value)}
          className="rounded-xl border border-[#e2e8f0] px-4 py-3 text-base text-[#0d1b2a] outline-none focus:border-[#2563EB]"
        />
        <textarea
          placeholder="Anything else we should know? (e.g. system not working, upstairs always hot…)"
          aria-label="Additional notes"
          value={state.c_notes}
          onChange={(event) => onChange("c_notes", event.target.value)}
          rows={3}
          className="resize-none rounded-xl border border-[#e2e8f0] px-4 py-3 text-base text-[#0d1b2a] outline-none focus:border-[#2563EB]"
        />

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-xs font-medium text-[#64748b]">
          <span>🛡 No spam, ever</span>
          <span>⭐ 4.8★ Google</span>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] py-4 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#1d4ed8] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Calculating your estimate…
            </>
          ) : (
            "Get My Free AI Estimate →"
          )}
        </button>
      </form>
    </div>
  );
}
