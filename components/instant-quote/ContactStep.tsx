"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BackLink } from "@/components/instant-quote/BackLink";
import {
  formatPhoneInput,
  isValidEmail,
  isValidName,
  isValidPhone,
} from "@/components/instant-quote/validation";

type ContactPhase = "form" | "verify" | "email-fallback";

interface ContactStepProps {
  onVerified: () => void;
  onBack: () => void;
}

const slideVariants = {
  initial: { x: 100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: -100, opacity: 0 },
};

export function ContactStep({ onVerified, onBack }: ContactStepProps) {
  const [phase, setPhase] = useState<ContactPhase>("form");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [nameTouched, setNameTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);

  const nameValid = isValidName(name);
  const phoneValid = isValidPhone(phone);
  const emailValid = isValidEmail(email);
  const formValid = nameValid && phoneValid;

  const showNameError = nameTouched && !nameValid;
  const showPhoneError = phoneTouched && !phoneValid;
  const showEmailError = emailTouched && !emailValid;

  function handleSend() {
    setNameTouched(true);
    setPhoneTouched(true);
    if (isValidName(name) && isValidPhone(phone)) setPhase("verify");
  }

  function handleSeePricing() {
    setEmailTouched(true);
    if (isValidEmail(email)) onVerified();
  }

  return (
    <div className="overflow-hidden">
      <BackLink onClick={phase === "form" ? onBack : () => setPhase("form")} />

      <AnimatePresence mode="wait" initial={false}>
        {phase === "form" && (
          <motion.div
            key="form"
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.25 }}
          >
            <h1 className="text-2xl font-semibold text-[#172345] sm:text-3xl">
              Where would you like to receive your quote?
            </h1>
            <p className="mt-2 text-[#374151]">
              We&apos;ll text you a secure link — no spam, ever.
            </p>

            <div className="mt-8 space-y-4">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-[#172345]">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() => setNameTouched(true)}
                  placeholder="Jane Smith"
                  className={`w-full rounded-xl border px-4 py-3 text-[#172345] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 ${
                    showNameError
                      ? "border-[#ef4444] focus:border-[#ef4444] focus:ring-[#ef4444]/20"
                      : "border-[#e6ebf1] focus:border-[#2563EB] focus:ring-[#2563EB]/20"
                  }`}
                />
                {showNameError && (
                  <p className="mt-1.5 text-xs text-[#ef4444]">
                    Please enter your name (at least 2 characters).
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="phone" className="mb-2 block text-sm font-medium text-[#172345]">
                  Phone number
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(formatPhoneInput(e.target.value))}
                  onBlur={() => setPhoneTouched(true)}
                  placeholder="(360) 555-0123"
                  className={`w-full rounded-xl border px-4 py-3 text-[#172345] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 ${
                    showPhoneError
                      ? "border-[#ef4444] focus:border-[#ef4444] focus:ring-[#ef4444]/20"
                      : "border-[#e6ebf1] focus:border-[#2563EB] focus:ring-[#2563EB]/20"
                  }`}
                />
                {showPhoneError && (
                  <p className="mt-1.5 text-xs text-[#ef4444]">
                    Please enter a valid 10-digit phone number.
                  </p>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={handleSend}
              disabled={!formValid}
              className="mt-6 w-full rounded-xl bg-[#2563EB] px-6 py-3 font-medium text-white transition-colors hover:bg-[#1d4ed8] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Send my quote →
            </button>
          </motion.div>
        )}

        {phase === "verify" && (
          <motion.div
            key="verify"
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.25 }}
          >
            <h1 className="text-2xl font-semibold text-[#172345] sm:text-3xl">
              Did you receive your code?
            </h1>
            <p className="mt-2 text-[#374151]">
              We just sent it to {phone || "your phone"}
            </p>

            <button
              type="button"
              onClick={onVerified}
              className="mt-8 w-full rounded-xl bg-[#2563EB] px-6 py-3 font-medium text-white transition-colors hover:bg-[#1d4ed8]"
            >
              Yes, I got it →
            </button>

            <button
              type="button"
              onClick={() => setPhase("email-fallback")}
              className="mt-4 w-full text-center text-sm text-[#374151] transition-colors duration-200 hover:text-[#2563EB] hover:underline"
            >
              No — let&apos;s try a different way
            </button>
          </motion.div>
        )}

        {phase === "email-fallback" && (
          <motion.div
            key="email-fallback"
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.25 }}
          >
            <h1 className="text-2xl font-semibold text-[#172345] sm:text-3xl">
              No problem — let&apos;s try your email instead
            </h1>

            <div className="mt-8">
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#172345]">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setEmailTouched(true)}
                placeholder="jane@example.com"
                className={`w-full rounded-xl border px-4 py-3 text-[#172345] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 ${
                  showEmailError
                    ? "border-[#ef4444] focus:border-[#ef4444] focus:ring-[#ef4444]/20"
                    : "border-[#e6ebf1] focus:border-[#2563EB] focus:ring-[#2563EB]/20"
                }`}
              />
              {showEmailError && (
                <p className="mt-1.5 text-xs text-[#ef4444]">
                  Please enter a valid email address.
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={handleSeePricing}
              disabled={!emailValid}
              className="mt-6 w-full rounded-xl bg-[#2563EB] px-6 py-3 font-medium text-white transition-colors hover:bg-[#1d4ed8] disabled:cursor-not-allowed disabled:opacity-50"
            >
              See my pricing →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
