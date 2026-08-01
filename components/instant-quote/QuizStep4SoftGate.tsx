"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import {
  formatPhoneInput,
  isValidEmail,
  isValidName,
  isValidPhone,
} from "@/components/instant-quote/validation";
import { DEFAULT_ADDONS, TIER_META } from "@/components/instant-quote/quiz-data";
import type {
  ContactInfo,
  CurrentSystem,
  HomeSize,
  PropertyData,
  ServiceType,
} from "@/components/instant-quote/types";

interface QuizStep4SoftGateProps {
  value: ContactInfo;
  address: string;
  serviceType: ServiceType | null;
  homeSize: HomeSize | null;
  currentSystem: CurrentSystem | null;
  propertyData: PropertyData | null;
  onUnlock: (value: ContactInfo, emailFailed: boolean) => void;
}

export function QuizStep4SoftGate({
  value,
  address,
  serviceType,
  homeSize,
  currentSystem,
  propertyData,
  onUnlock,
}: QuizStep4SoftGateProps) {
  const [formName, setFormName] = useState(value.formName);
  const [formPhone, setFormPhone] = useState(value.formPhone);
  const [formEmail, setFormEmail] = useState(value.formEmail);
  const [smsOptIn, setSmsOptIn] = useState(value.smsOptIn);
  const [touched, setTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const nameValid = isValidName(formName);
  const phoneValid = isValidPhone(formPhone);
  const emailValid = isValidEmail(formEmail);
  const gateReady = nameValid && phoneValid && emailValid;

  async function handleSubmit() {
    setTouched(true);
    if (!gateReady || submitting) return;

    const contact = { formName, formPhone, formEmail, smsOptIn };
    setSubmitting(true);
    let emailFailed = false;

    try {
      const tier = TIER_META.gold;
      const payload = {
        contact: { name: formName, phone: formPhone, email: formEmail },
        address,
        serviceType,
        homeSize: homeSize ?? "medium",
        currentSystem: currentSystem ?? "gas",
        selectedTier: "gold",
        selectedAddons: Object.entries(DEFAULT_ADDONS)
          .filter(([, checked]) => checked)
          .map(([id]) => id),
        priceRange: { min: tier.priceLow, max: tier.priceHigh },
        monthlyPayment: tier.monthly,
        propertyData,
        submittedAt: new Date().toISOString(),
      };

      const response = await fetch("/api/instant-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        emailFailed = true;
      }
    } catch {
      emailFailed = true;
    } finally {
      setSubmitting(false);
      onUnlock(contact, emailFailed);
    }
  }

  const errorClass = "border-[#ef4444]";

  return (
    <div>
      <h2 className="mb-2 text-center font-[Plus_Jakarta_Sans,sans-serif] text-[25px] font-extrabold text-[#0D1B2A] max-sm:text-[19px]">
        Your personalized packages are ready! 🎉
      </h2>
      <p className="mx-auto mb-[26px] max-w-[460px] text-center text-[15px] text-[#64748b] max-sm:text-[13px]">
        Enter your details to unlock your estimate and see available WA/OR utility rebates.
      </p>

      <div className="mb-[18px] flex flex-col gap-3">
        <div>
          <input
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            placeholder="Jane Smith"
            aria-label="Full name"
            className={`w-full rounded-[10px] border-[1.5px] px-4 py-3.5 font-sans text-base text-[#0D1B2A] outline-none ${
              touched && !nameValid ? errorClass : "border-[#e2e8f0]"
            }`}
          />
          {touched && !nameValid && (
            <p className="mt-1 text-xs text-[#ef4444]">Please enter your name (at least 2 characters).</p>
          )}
        </div>

        <div>
          <input
            value={formPhone}
            onChange={(e) => setFormPhone(formatPhoneInput(e.target.value))}
            placeholder="(360) 555-0123"
            type="tel"
            aria-label="Phone number"
            className={`w-full rounded-[10px] border-[1.5px] px-4 py-3.5 font-sans text-base text-[#0D1B2A] outline-none ${
              touched && !phoneValid ? errorClass : "border-[#e2e8f0]"
            }`}
          />
          {touched && !phoneValid && (
            <p className="mt-1 text-xs text-[#ef4444]">Please enter a valid 10-digit phone number.</p>
          )}
        </div>

        <div>
          <input
            value={formEmail}
            onChange={(e) => setFormEmail(e.target.value)}
            placeholder="you@example.com"
            type="email"
            aria-label="Email address"
            className={`w-full rounded-[10px] border-[1.5px] px-4 py-3.5 font-sans text-base text-[#0D1B2A] outline-none ${
              touched && !emailValid ? errorClass : "border-[#e2e8f0]"
            }`}
          />
          {touched && !emailValid && (
            <p className="mt-1 text-xs text-[#ef4444]">Please enter a valid email address.</p>
          )}
        </div>

        <button
          type="button"
          onClick={() => setSmsOptIn((v) => !v)}
          className="flex items-center gap-2.5 px-0.5 py-1 text-left"
        >
          <span
            className={`flex h-5 w-5 flex-none items-center justify-center rounded-[6px] text-xs text-white ${
              smsOptIn ? "border-2 border-[#2563EB] bg-[#2563EB]" : "border-[1.5px] border-[#cbd5e1] bg-white"
            }`}
          >
            {smsOptIn ? "✓" : ""}
          </span>
          <span className="text-sm text-[#334155]">Text me my estimate via SMS</span>
        </button>
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        disabled={!gateReady || submitting}
        className={`group flex w-full min-h-[60px] items-center justify-center gap-2 rounded-[11px] py-4 text-center font-[Plus_Jakarta_Sans,sans-serif] text-[15.5px] font-bold transition-colors ${
          gateReady && !submitting
            ? "cursor-pointer bg-[#F97316] text-white shadow-[0_10px_24px_rgba(249,115,22,.32)] hover:bg-[#ea6a0c]"
            : "cursor-not-allowed bg-[#fbc99a] text-white"
        }`}
      >
        {submitting ? (
          <span>Unlocking...</span>
        ) : (
          <>
            <span>Unlock My Free Estimate</span>
            <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
          </>
        )}
      </button>

      <div className="mt-5 flex flex-col gap-2.5 border-t border-[#eef1f5] pt-5">
        <div className="flex items-center gap-2.5 text-[13px] text-[#64748b]">
          <span>🔒</span>No-Pressure Guarantee — no pushy sales calls
        </div>
        <div className="flex items-center gap-2.5 text-[13px] text-[#64748b]">
          <span>✓</span>Estimates within 10% of final onsite quotes
        </div>
        <div className="flex items-center gap-2.5 text-[13px] text-[#64748b]">
          <span>✓</span>Serving Vancouver WA &amp; Portland OR
        </div>
      </div>

      <div className="pointer-events-none mt-7 select-none opacity-70 blur-[5px]">
        <div className="grid grid-cols-3 gap-2.5 max-sm:flex max-sm:flex-col">
          <div className="h-[150px] rounded-2xl border border-[#e2e8f0] bg-[#f1f5f9] max-sm:h-14" />
          <div className="h-[170px] rounded-2xl border-2 border-[#2563EB] bg-[#dbe7fb] max-sm:h-14" />
          <div className="h-[150px] rounded-2xl border-2 border-[#F97316] bg-[#fde8d6] max-sm:h-14" />
        </div>
      </div>
    </div>
  );
}
