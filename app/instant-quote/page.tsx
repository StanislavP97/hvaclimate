import type { Metadata } from "next";
import CalculatorWizard from "@/components/calculator/CalculatorWizard";

export const metadata: Metadata = {
  title: "Instant Quote | HVA Climate Control",
  description:
    "Get an instant HVAC quote for your home in Vancouver WA or Portland OR. Enter your address to get started, no obligation.",
};

export default function InstantQuotePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0a0f2e] px-4 py-8">
      <CalculatorWizard />
    </main>
  );
}
