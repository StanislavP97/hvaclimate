"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { StepIndicator } from "@/components/instant-quote/StepIndicator";
import { AddressStep } from "@/components/instant-quote/AddressStep";
import { ContactStep } from "@/components/instant-quote/ContactStep";
import { ComfortSizingCalculator } from "@/components/instant-quote/ComfortSizingCalculator";
import { BackLink } from "@/components/instant-quote/BackLink";
import type { WizardStep } from "@/components/instant-quote/types";

const slideVariants = {
  initial: { x: 100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: -100, opacity: 0 },
};

export function InstantQuoteWizard() {
  const [step, setStep] = useState<WizardStep>("address");

  if (step === "price") {
    return (
      <>
        <div className="mx-auto max-w-5xl px-6 pt-10">
          <BackLink onClick={() => setStep("contact")} />
        </div>
        <ComfortSizingCalculator />
      </>
    );
  }

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-2xl px-6">
        <div className="rounded-[20px] border border-[#e6ebf1] bg-white p-8 shadow-sm">
          <StepIndicator current={step} />

          <div className="mt-10 overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              {step === "address" && (
                <motion.div
                  key="address"
                  variants={slideVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.25 }}
                >
                  <AddressStep
                    onContinue={() => setStep("contact")}
                    onSkip={() => setStep("contact")}
                  />
                </motion.div>
              )}
              {step === "contact" && (
                <motion.div
                  key="contact"
                  variants={slideVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.25 }}
                >
                  <ContactStep
                    onVerified={() => setStep("price")}
                    onBack={() => setStep("address")}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
