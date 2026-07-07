import type { Metadata } from "next";
import { InstantQuoteWizard } from "@/components/instant-quote/InstantQuoteWizard";

export const metadata: Metadata = {
  title: "Instant Quote | HVA Climate Control",
  description:
    "Get an instant HVAC quote for your home in Vancouver WA or Portland OR. Enter your address to get started, no obligation.",
};

export default function InstantQuotePage() {
  return <InstantQuoteWizard />;
}
