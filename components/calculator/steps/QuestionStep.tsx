import { OptionCard } from "@/components/calculator/ui/OptionCard";
import { OptionList } from "@/components/calculator/ui/OptionList";
import { MultiSelect } from "@/components/calculator/ui/MultiSelect";
import type { StepConfig } from "@/components/calculator/steps";
import type { CalculatorState } from "@/types/calculator";

interface QuestionStepProps {
  step: StepConfig;
  state: CalculatorState;
  onSingleSelect: (field: keyof CalculatorState, value: string) => void;
  onMultiToggle: (field: keyof CalculatorState, value: string) => void;
  onAdvance: () => void;
}

export function QuestionStep({ step, state, onSingleSelect, onMultiToggle, onAdvance }: QuestionStepProps) {
  const field = step.field as keyof CalculatorState;
  const note = step.note?.(state);

  return (
    <div className="flex flex-col gap-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#0d1b2a] sm:text-3xl">{step.title}</h2>
        {step.subtitle && <p className="mt-2 text-sm text-[#64748b]">{step.subtitle}</p>}
      </div>

      {step.kind === "cards" && step.cardOptions && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {step.cardOptions.map((option) => (
            <OptionCard
              key={option.label}
              icon={option.icon}
              label={option.label}
              selected={state[field] === option.label}
              onClick={() => {
                onSingleSelect(field, option.label);
                onAdvance();
              }}
            />
          ))}
        </div>
      )}

      {step.kind === "list" && step.listOptions && (
        <OptionList
          options={step.listOptions}
          value={state[field] as string}
          onChange={(value) => onSingleSelect(field, value)}
          onAdvance={onAdvance}
        />
      )}

      {step.kind === "multiselect" && step.listOptions && (
        <MultiSelect
          options={step.listOptions}
          selected={state[field] as string[]}
          onToggle={(value) => onMultiToggle(field, value)}
          onContinue={onAdvance}
        />
      )}

      {note && (
        <p className="rounded-lg bg-[#2563EB]/8 px-4 py-3 text-sm text-[#0d1b2a]">{note}</p>
      )}
    </div>
  );
}
