"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    question: "How soon can I expect service after booking?",
    answer:
      "We aim to provide next-day or same-week service whenever possible. Emergency calls are prioritized.",
  },
  {
    question: "What HVAC services do you specialize in?",
    answer:
      "We handle heating, cooling, ventilation, and commercial HVAC: repairs, installations, tune-ups, and maintenance.",
  },
  {
    question: "How often should HVAC systems be serviced?",
    answer:
      "Most systems benefit from a tune-up twice a year, once before summer and once before winter.",
  },
  {
    question: "Are financing or payment plans available?",
    answer:
      "Yes, ask our team about available financing options when you request your quote.",
  },
  {
    question: "Are your technicians licensed and insured?",
    answer:
      "Yes, every technician is licensed, bonded, and insured in Washington and Oregon.",
  },
  {
    question: "Do you offer free estimates?",
    answer:
      "Yes, use the Instant Quote tool or contact us directly for a free, no-obligation estimate.",
  },
];

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {FAQS.map((faq, index) => {
        const isOpen = index === openIndex;
        return (
          <button
            key={faq.question}
            type="button"
            onClick={() => setOpenIndex(isOpen ? -1 : index)}
            aria-expanded={isOpen}
            className={cn(
              "rounded-2xl bg-background p-6 text-left transition-colors",
              isOpen && "sm:row-span-1"
            )}
          >
            <h3
              className={cn(
                "text-lg font-bold",
                isOpen ? "text-primary-accent" : "text-foreground"
              )}
            >
              {faq.question}
            </h3>
            {isOpen && (
              <p className="mt-3 text-sm text-body">{faq.answer}</p>
            )}
          </button>
        );
      })}
    </div>
  );
}
