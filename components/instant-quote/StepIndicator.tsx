import type { WizardStep } from "@/components/instant-quote/types";

const STEPS: { key: WizardStep; label: string }[] = [
  { key: "address", label: "Address" },
  { key: "contact", label: "Contact" },
  { key: "price", label: "Your Price" },
];

export function StepIndicator({ current }: { current: WizardStep }) {
  const currentIndex = STEPS.findIndex((s) => s.key === current);

  return (
    <div className="flex items-center">
      {STEPS.map((step, index) => {
        const isComplete = index < currentIndex;
        const isCurrent = index === currentIndex;
        return (
          <div key={step.key} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                  isCurrent
                    ? "bg-[#2563EB] text-white"
                    : isComplete
                      ? "bg-[#2563EB]/20 text-[#2563EB]"
                      : "bg-[#e6ebf1] text-[#9ca3af]"
                }`}
              >
                {index + 1}
              </div>
              <span
                className={`mt-1 text-xs ${
                  isCurrent ? "font-medium text-[#172345]" : "text-[#9ca3af]"
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < STEPS.length - 1 && (
              <div
                className={`mx-2 h-px flex-1 ${
                  isComplete ? "bg-[#2563EB]/40" : "bg-[#e6ebf1]"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
