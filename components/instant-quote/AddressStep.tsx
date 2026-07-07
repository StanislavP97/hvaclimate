"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ManualHomeDetailsForm } from "@/components/instant-quote/ManualHomeDetailsForm";

interface AddressStepProps {
  onContinue: () => void;
  manualEntry: boolean;
  onManualEntryChange: (manualEntry: boolean) => void;
}

export function AddressStep({
  onContinue,
  manualEntry,
  onManualEntryChange,
}: AddressStepProps) {
  const [address, setAddress] = useState("");

  if (manualEntry) {
    return (
      <div>
        <p className="text-xs font-bold tracking-wide text-primary-accent uppercase">
          Start with your address
        </p>
        <p className="mt-2 text-sm text-body">
          Share your address and we&apos;ll pull your home&apos;s details from
          public records — square footage, heating system, and more — so you
          don&apos;t have to look it up yourself.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            placeholder="123 Main St, Vancouver, WA"
            className="h-12 flex-1 rounded-lg border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          />
          <Button
            className="h-12 shrink-0 rounded-full px-6"
            onClick={onContinue}
          >
            Look up my home
          </Button>
        </div>

        <p className="mt-4 text-sm text-body underline underline-offset-2">
          I&apos;ll enter my details manually ↓
        </p>

        <ManualHomeDetailsForm />

        <Button className="mt-8 h-12 w-full rounded-full" onClick={onContinue}>
          Continue →
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-foreground">
        What&apos;s your home address?
      </h2>
      <p className="mt-2 text-sm text-body">
        We use public records to size your system and see what you have now —
        no obligation.
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          placeholder="123 Main St, Vancouver, WA 98682"
          className="h-12 flex-1 rounded-lg border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        />
        <Button
          className="h-12 shrink-0 rounded-full px-6"
          onClick={onContinue}
        >
          Continue →
        </Button>
      </div>

      <button
        type="button"
        onClick={() => onManualEntryChange(true)}
        className="mt-4 block text-sm text-body underline underline-offset-2"
      >
        Skip — I&apos;ll enter details myself
      </button>
    </div>
  );
}
