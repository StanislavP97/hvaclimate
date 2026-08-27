"use client";

import { useCallback } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { AddressAutocomplete } from "@/components/instant-quote/AddressAutocomplete";
import { hasVerifiedPropertyData, type CalculatorState, type PropertyData } from "@/types/calculator";

interface ContactStepProps {
  state: CalculatorState;
  onChange: (field: keyof CalculatorState, value: string) => void;
  onPropertyData: (data: PropertyData | null) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

interface PropertyLookupResponse {
  found?: boolean;
  squareFootage?: number | null;
  yearBuilt?: number | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
  heatingType?: string | null;
}

export function toPropertyData(response: PropertyLookupResponse): PropertyData | null {
  if (!response.found) return null;

  const data: PropertyData = { source: "rentcast" };
  if (response.squareFootage != null) data.squareFootage = response.squareFootage;
  if (response.yearBuilt != null) data.yearBuilt = response.yearBuilt;
  if (response.bedrooms != null) data.bedrooms = response.bedrooms;
  if (response.bathrooms != null) data.bathrooms = response.bathrooms;
  if (response.heatingType != null) data.heatingType = response.heatingType;

  return hasVerifiedPropertyData(data) ? data : null;
}

export function ContactStep({
  state,
  onChange,
  onPropertyData,
  onSubmit,
  isSubmitting,
}: ContactStepProps) {
  const handleAddressSelect = useCallback(
    (address: string) => {
      onChange("address", address);
      onPropertyData(null);

      fetch(`/api/property-lookup?address=${encodeURIComponent(address)}`)
        .then((response) => (response.ok ? response.json() : null))
        .then((data: PropertyLookupResponse | null) => {
          onPropertyData(data ? toPropertyData(data) : null);
        })
        .catch(() => onPropertyData(null));
    },
    [onChange, onPropertyData],
  );

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
        <div className="flex flex-col gap-2">
          <AddressAutocomplete
            value={state.address}
            onChange={(value) => {
              onChange("address", value);
              onPropertyData(null);
            }}
            onAddressSelect={handleAddressSelect}
          />
          {hasVerifiedPropertyData(state.propertyData) && (
            <p className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
              <CheckCircle2 size={14} />
              Home data auto-verified from public records
            </p>
          )}
        </div>
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
