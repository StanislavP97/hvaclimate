"use client";

import { useState } from "react";
import { isValidAddress } from "@/components/instant-quote/validation";

interface AddressStepProps {
  onContinue: () => void;
  onSkip: () => void;
}

export function AddressStep({ onContinue, onSkip }: AddressStepProps) {
  const [address, setAddress] = useState("");
  const [touched, setTouched] = useState(false);

  const valid = isValidAddress(address);
  const showError = touched && !valid;

  function handleContinue() {
    setTouched(true);
    if (isValidAddress(address)) onContinue();
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-[#172345] sm:text-3xl">
        Let&apos;s find the right system for your home
      </h1>
      <p className="mt-2 text-[#374151]">
        Start with your address — we&apos;ll pull your home&apos;s details
      </p>

      <div className="mt-8">
        <label htmlFor="address" className="mb-2 block text-sm font-medium text-[#172345]">
          Home address
        </label>
        {/* TODO: Add Google Places Autocomplete when API key is available */}
        {/* Replace input with PlacesAutocomplete component */}
        <input
          id="address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          onBlur={() => setTouched(true)}
          placeholder="123 Main St, Vancouver, WA 98682"
          className={`w-full rounded-xl border px-4 py-3 text-[#172345] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 ${
            showError
              ? "border-[#ef4444] focus:border-[#ef4444] focus:ring-[#ef4444]/20"
              : "border-[#e6ebf1] focus:border-[#2563EB] focus:ring-[#2563EB]/20"
          }`}
        />
        {showError && (
          <p className="mt-1.5 text-xs text-[#ef4444]">
            Please enter a valid address (at least 5 characters).
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={handleContinue}
        disabled={!valid}
        className="mt-6 w-full rounded-xl bg-[#2563EB] px-6 py-3 font-medium text-white transition-colors hover:bg-[#1d4ed8] disabled:cursor-not-allowed disabled:opacity-50"
      >
        Continue →
      </button>

      <button
        type="button"
        onClick={onSkip}
        className="mt-4 w-full text-center text-sm text-[#374151] transition-colors duration-200 hover:text-[#2563EB] hover:underline"
      >
        Skip — I&apos;ll enter details myself
      </button>
    </div>
  );
}
