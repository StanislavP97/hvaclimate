"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
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
    <div className="mx-auto max-w-[720px] px-6 py-20">
      <div className="mb-10 text-center">
        <p className="text-[13px] font-bold tracking-[0.14em] text-primary-accent uppercase">
          FAQ
        </p>
        <h2 className="mt-2.5 text-3xl font-extrabold tracking-[-0.02em] text-foreground">
          Frequently asked questions
        </h2>
      </div>

      <div>
        {FAQS.map((faq, index) => {
          const isOpen = index === openIndex;
          return (
            <div key={faq.question} className="border-b border-[#e6ebf1]">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-6 py-4.5 text-left"
              >
                <span
                  className={cn(
                    "text-base font-semibold",
                    isOpen ? "text-primary-accent" : "text-[#0D1B2A]",
                  )}
                >
                  {faq.question}
                </span>
                <ChevronDown
                  className={cn(
                    "size-4.5 shrink-0 transition-transform duration-200",
                    isOpen ? "rotate-180 text-primary-accent" : "text-[#0D1B2A]",
                  )}
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pb-4 text-[15px] text-[#64748b]">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
