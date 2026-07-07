"use client";

import { useState } from "react";
import { StepIndicator } from "@/components/instant-quote/StepIndicator";
import { AddressStep } from "@/components/instant-quote/AddressStep";
import { ContactStep } from "@/components/instant-quote/ContactStep";
import { PriceStep } from "@/components/instant-quote/PriceStep";
import { EstimatedCapacityCard } from "@/components/instant-quote/EstimatedCapacityCard";

type Step = 1 | 2 | 3;

export function InstantQuoteWizard() {
  const [step, setStep] = useState<Step>(1);
  const [manualEntry, setManualEntry] = useState(false);

  const showCapacitySidebar = step === 1 && manualEntry;

  return (
    <section className="bg-muted/50 py-16">
      <div
        className={
          showCapacitySidebar
            ? "mx-auto grid max-w-5xl grid-cols-1 items-start gap-6 px-6 lg:grid-cols-[1fr_320px]"
            : "mx-auto max-w-2xl px-6"
        }
      >
        <div className="rounded-2xl bg-background p-8 shadow-sm">
          <StepIndicator currentStep={step} />

          <div className="mt-10">
            {step === 1 && (
              <AddressStep
                onContinue={() => setStep(2)}
                manualEntry={manualEntry}
                onManualEntryChange={setManualEntry}
              />
            )}
            {step === 2 && <ContactStep onVerified={() => setStep(3)} />}
            {step === 3 && <PriceStep />}
          </div>
        </div>

        {showCapacitySidebar && <EstimatedCapacityCard />}
      </div>
    </section>
  );
}
