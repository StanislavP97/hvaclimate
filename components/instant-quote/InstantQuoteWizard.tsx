"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ProgressBar, MobileProgressDots } from "@/components/instant-quote/ProgressBar";
import { QuizStep1ServiceType } from "@/components/instant-quote/QuizStep1ServiceType";
import { QuizStep2HomeSize } from "@/components/instant-quote/QuizStep2HomeSize";
import { QuizStep3CurrentSystem } from "@/components/instant-quote/QuizStep3CurrentSystem";
import { QuizStep4SoftGate } from "@/components/instant-quote/QuizStep4SoftGate";
import { LivingProposal } from "@/components/instant-quote/LivingProposal";
import { DEFAULT_ADDONS } from "@/components/instant-quote/quiz-data";
import type { QuizState } from "@/components/instant-quote/types";

const slideVariants = {
  initial: { x: 60, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: -60, opacity: 0 },
};

const DEFAULT_STATE: QuizState = {
  step: 0,
  serviceType: null,
  homeSize: null,
  currentSystem: null,
  contact: { formName: "", formPhone: "", formEmail: "", smsOptIn: true },
  gateUnlocked: false,
  selectedTier: "gold",
  addons: DEFAULT_ADDONS,
};

function handleCall() {
  window.location.href = "tel:3608882217";
}

function handleSchedule() {
  window.location.href = "/contact";
}

export function InstantQuoteWizard() {
  const [quiz, setQuiz] = useState<QuizState>(DEFAULT_STATE);

  if (quiz.gateUnlocked) {
    return (
      <LivingProposal
        homeSize={quiz.homeSize}
        currentSystem={quiz.currentSystem}
        onSchedule={handleSchedule}
        onCall={handleCall}
      />
    );
  }

  return (
    <div>
      {/* HERO */}
      <div
        className="relative overflow-hidden px-12 pb-16 pt-14 text-center max-sm:px-5 max-sm:pb-8 max-sm:pt-7"
        style={{
          background: "radial-gradient(120% 140% at 15% 0%, #17304d 0%, #0D1B2A 55%)",
        }}
      >
        <div
          className="pointer-events-none absolute -top-[140px] left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full"
          style={{ background: "radial-gradient(circle,#2563EB2e,transparent 70%)" }}
        />
        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#2563EB]/40 bg-[#2563EB]/[.14] px-[18px] py-2 font-[Plus_Jakarta_Sans,sans-serif] text-[13px] font-bold uppercase tracking-[.06em] text-[#7fb0ff] max-sm:px-3 max-sm:text-[11px]">
            <span className="h-[7px] w-[7px] rounded-full bg-[#F97316]" />
            Free Instant Estimate
          </span>
          <h1 className="mx-auto mb-3.5 mt-[22px] max-w-[720px] font-[Plus_Jakarta_Sans,sans-serif] text-[46px] font-extrabold leading-[1.1] tracking-tight text-white max-sm:mb-2.5 max-sm:mt-3.5 max-sm:text-2xl">
            Get Your Personalized HVAC Estimate
          </h1>
          <p className="mx-auto mb-7 max-w-[520px] text-[17px] leading-relaxed text-[#aebccc] max-sm:mb-0 max-sm:text-sm">
            Answer 4 quick questions — see your investment range in 60 seconds. No phone call
            required.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3.5 max-sm:hidden">
            <span className="flex items-center gap-1.5 rounded-full border border-white/[.14] bg-white/[.08] px-4 py-2.5 text-[13.5px] font-semibold text-[#dbe4ee]">
              ⭐ 4.9 Rated
            </span>
            <span className="flex items-center gap-1.5 rounded-full border border-white/[.14] bg-white/[.08] px-4 py-2.5 text-[13.5px] font-semibold text-[#dbe4ee]">
              ✓ Licensed &amp; Insured
            </span>
            <span className="flex items-center gap-1.5 rounded-full border border-white/[.14] bg-white/[.08] px-4 py-2.5 text-[13.5px] font-semibold text-[#dbe4ee]">
              🏠 Vancouver WA &amp; Portland OR
            </span>
          </div>
        </div>
      </div>

      {/* QUIZ CARD */}
      <div className="flex justify-center px-12 pb-20 pt-14 max-sm:px-4 max-sm:pb-10 max-sm:pt-5">
        <div className="relative w-full max-w-[620px] rounded-3xl bg-white p-11 shadow-[0_24px_60px_rgba(13,27,42,.14)] max-sm:rounded-[18px] max-sm:p-[22px] max-sm:shadow-[0_12px_30px_rgba(13,27,42,.1)]">
          <ProgressBar step={quiz.step} />
          <MobileProgressDots step={quiz.step} />

          {quiz.step > 0 && (
            <button
              type="button"
              onClick={() => setQuiz((q) => ({ ...q, step: Math.max(q.step - 1, 0) }))}
              className="mb-2.5 flex items-center gap-1.5 font-[Plus_Jakarta_Sans,sans-serif] text-sm font-semibold text-[#64748b] max-sm:text-[13px]"
            >
              ← Back
            </button>
          )}

          <div className="overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              {quiz.step === 0 && (
                <motion.div
                  key="step0"
                  variants={slideVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.35 }}
                >
                  <QuizStep1ServiceType
                    value={quiz.serviceType}
                    onNext={(serviceType) =>
                      setQuiz((q) => ({ ...q, serviceType, step: 1 }))
                    }
                  />
                </motion.div>
              )}

              {quiz.step === 1 && (
                <motion.div
                  key="step1"
                  variants={slideVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.35 }}
                >
                  <QuizStep2HomeSize
                    value={quiz.homeSize}
                    onNext={(homeSize) => setQuiz((q) => ({ ...q, homeSize, step: 2 }))}
                  />
                </motion.div>
              )}

              {quiz.step === 2 && (
                <motion.div
                  key="step2"
                  variants={slideVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.35 }}
                >
                  <QuizStep3CurrentSystem
                    value={quiz.currentSystem}
                    onNext={(currentSystem) =>
                      setQuiz((q) => ({ ...q, currentSystem, step: 3 }))
                    }
                  />
                </motion.div>
              )}

              {quiz.step === 3 && (
                <motion.div
                  key="step3"
                  variants={slideVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.35 }}
                >
                  <QuizStep4SoftGate
                    value={quiz.contact}
                    onUnlock={(contact) =>
                      setQuiz((q) => ({ ...q, contact, gateUnlocked: true }))
                    }
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
