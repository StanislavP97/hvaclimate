import { cn } from "@/lib/utils";

const STEPS = [
  { number: 1, label: "Address" },
  { number: 2, label: "Contact" },
  { number: 3, label: "Your Price" },
] as const;

export function StepIndicator({ currentStep }: { currentStep: 1 | 2 | 3 }) {
  return (
    <div className="flex items-center justify-center gap-3">
      {STEPS.map((step, index) => (
        <div key={step.number} className="flex items-center gap-3">
          <div className="flex flex-col items-center gap-1.5">
            <span
              className={cn(
                "flex size-8 items-center justify-center rounded-full text-sm font-bold",
                step.number < currentStep && "bg-green-600 text-white",
                step.number === currentStep && "bg-primary text-primary-foreground",
                step.number > currentStep && "bg-muted text-muted-foreground",
              )}
            >
              {step.number}
            </span>
            <span
              className={cn(
                "text-xs font-semibold",
                step.number <= currentStep ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {step.label}
            </span>
          </div>
          {index < STEPS.length - 1 && (
            <span className="mb-5 h-px w-10 bg-border" aria-hidden />
          )}
        </div>
      ))}
    </div>
  );
}
