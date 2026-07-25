"use client";

import { useMemo, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { ProgressBar } from "@/components/calculator/ui/ProgressBar";
import { LandingStep } from "@/components/calculator/steps/LandingStep";
import { PathStep } from "@/components/calculator/steps/PathStep";
import { QuestionStep } from "@/components/calculator/steps/QuestionStep";
import { ContactStep } from "@/components/calculator/steps/ContactStep";
import { ResultStep } from "@/components/calculator/steps/ResultStep";
import { CENTRAL_STEPS, MINISPLIT_STEPS } from "@/components/calculator/steps";
import {
  initialCalculatorState,
  toggleMultiSelectValue,
  type CalculatorState,
  type EstimateResult,
  type SystemPath,
} from "@/types/calculator";

type WizardPhase = "landing" | "path" | "question" | "result";

export default function CalculatorWizard() {
  const [phase, setPhase] = useState<WizardPhase>("landing");
  const [stepIndex, setStepIndex] = useState(0);
  const [state, setState] = useState<CalculatorState>(initialCalculatorState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<EstimateResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const questionSteps = useMemo(
    () => (state.systemPath === "minisplit" ? MINISPLIT_STEPS : CENTRAL_STEPS),
    [state.systemPath],
  );

  const currentStep = phase === "question" ? questionSteps[stepIndex] : null;
  const percent = phase === "landing" ? 0 : phase === "path" ? 8 : phase === "result" ? 100 : currentStep?.percent ?? 8;

  function updateField(field: keyof CalculatorState, value: string) {
    setState((prev) => ({ ...prev, [field]: value }));
  }

  function toggleMulti(field: keyof CalculatorState, value: string) {
    setState((prev) => ({ ...prev, [field]: toggleMultiSelectValue(prev[field] as string[], value) }));
  }

  function goToNextQuestion() {
    if (stepIndex + 1 < questionSteps.length) {
      setStepIndex(stepIndex + 1);
    }
  }

  function handleBack() {
    if (phase === "path") {
      setPhase("landing");
      return;
    }
    if (phase === "question") {
      if (stepIndex === 0) {
        setPhase("path");
      } else {
        setStepIndex(stepIndex - 1);
      }
    }
  }

  function handlePathSelect(path: SystemPath) {
    setState((prev) => ({ ...prev, systemPath: path }));
    setStepIndex(0);
    setPhase("question");
  }

  async function handleSubmit() {
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch("/api/calculate-estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      });
      const data = await response.json();
      if (!response.ok || !data.result) {
        throw new Error(data.error ?? "Failed to calculate estimate");
      }
      setResult(data.result as EstimateResult);
      setPhase("result");
    } catch {
      setError("Something went wrong calculating your estimate. Please call us at (360) 888-2217.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const canGoBack = phase !== "landing";

  return (
    <div className="w-full max-w-4xl pb-20 sm:pb-0">
      <div className="rounded-2xl bg-white p-6 py-10 shadow-2xl sm:p-10 sm:py-16">
        {phase !== "landing" && (
          <div className="mb-8 flex items-center gap-4">
            <button
              type="button"
              onClick={handleBack}
              disabled={!canGoBack}
              aria-label="Back"
              className="flex size-8 shrink-0 items-center justify-center rounded-full border border-[#e2e8f0] text-[#0d1b2a] transition-colors duration-150 enabled:hover:bg-slate-50 disabled:opacity-0"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex-1">
              <ProgressBar percent={percent} />
            </div>
          </div>
        )}

        {phase === "landing" && <LandingStep onStart={() => setPhase("path")} />}

        {phase === "path" && <PathStep value={state.systemPath} onSelect={handlePathSelect} />}

        {phase === "question" && currentStep && currentStep.kind !== "contact" && (
          <QuestionStep
            step={currentStep}
            state={state}
            onSingleSelect={updateField}
            onMultiToggle={toggleMulti}
            onAdvance={goToNextQuestion}
          />
        )}

        {phase === "question" && currentStep && currentStep.kind === "contact" && (
          <>
            <ContactStep state={state} onChange={updateField} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
            {error && <p className="mt-4 text-center text-sm text-red-600">{error}</p>}
          </>
        )}

        {phase === "result" && result && <ResultStep firstName={state.firstName} result={result} />}
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#0d1b2a] py-3 sm:hidden">
        <a href="tel:+13608882217" className="block text-center text-sm font-semibold text-white">
          📞 Call (360) 888-2217
        </a>
      </div>
    </div>
  );
}
