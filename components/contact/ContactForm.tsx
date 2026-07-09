"use client";

import { useActionState, useState } from "react";
import { motion } from "framer-motion";
import { submitContactForm } from "@/actions/contact";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const initialState = null;

const SERVICES = [
  "Heating",
  "Cooling",
  "New install",
  "Maintenance",
  "Emergency",
] as const;

const fieldClass =
  "mt-2 w-full rounded-[10px] border-[1.5px] border-[#e0e6ee] bg-[#fbfcfe] px-3.75 py-3.25 font-sans text-[15px] text-foreground placeholder:text-[#9aa7b8] outline-none transition-[border-color,box-shadow] focus:border-primary-accent focus:bg-background focus:shadow-[0_0_0_3px_rgba(37,99,235,.12)]";

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState,
  );
  const [service, setService] = useState<string>("Heating");

  const fieldErrors = state && !state.success ? state.fieldErrors : undefined;

  if (state?.success) {
    return (
      <div
        role="status"
        className="rounded-lg border border-border bg-background p-6 text-sm text-foreground"
      >
        Thanks, we&apos;ll be in touch shortly!
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="rounded-[20px] border border-border p-10 shadow-[0_2px_10px_rgba(13,27,42,.04)]"
    >
      <p className="text-[13px] font-bold tracking-[0.14em] text-primary-accent uppercase">
        Request service
      </p>
      <h2 className="mt-2.5 text-[30px] font-extrabold tracking-[-0.02em] text-foreground">
        Tell us what you need
      </h2>
      <p className="mt-1.5 mb-7 text-[15px] text-muted-foreground">
        We&apos;ll reply within the hour during business hours &mdash;
        usually much sooner.
      </p>

      <form action={formAction} className="space-y-4.5" noValidate>
        <div className="grid grid-cols-1 gap-4.5 sm:grid-cols-2">
          <label className="block font-sans text-[13px] font-semibold text-[#334155]">
            Full name
            <input
              type="text"
              name="name"
              placeholder="Jane Doe"
              aria-invalid={!!fieldErrors?.name}
              className={cn(fieldClass, fieldErrors?.name && "border-destructive")}
            />
            {fieldErrors?.name && (
              <span className="mt-1 block text-xs font-normal text-destructive">
                {fieldErrors.name}
              </span>
            )}
          </label>
          <label className="block font-sans text-[13px] font-semibold text-[#334155]">
            Phone
            <input
              type="tel"
              name="phone"
              placeholder="(360) 555-0134"
              aria-invalid={!!fieldErrors?.phone}
              className={cn(fieldClass, fieldErrors?.phone && "border-destructive")}
            />
            {fieldErrors?.phone && (
              <span className="mt-1 block text-xs font-normal text-destructive">
                {fieldErrors.phone}
              </span>
            )}
          </label>
        </div>

        <div className="grid grid-cols-1 gap-4.5 sm:grid-cols-2">
          <label className="block font-sans text-[13px] font-semibold text-[#334155]">
            Email
            <input
              type="email"
              name="email"
              placeholder="jane@email.com"
              aria-invalid={!!fieldErrors?.email}
              className={cn(fieldClass, fieldErrors?.email && "border-destructive")}
            />
            {fieldErrors?.email && (
              <span className="mt-1 block text-xs font-normal text-destructive">
                {fieldErrors.email}
              </span>
            )}
          </label>
          <label className="block font-sans text-[13px] font-semibold text-[#334155]">
            City
            <input
              type="text"
              name="address"
              placeholder="Vancouver, WA"
              aria-invalid={!!fieldErrors?.address}
              className={cn(fieldClass, fieldErrors?.address && "border-destructive")}
            />
            {fieldErrors?.address && (
              <span className="mt-1 block text-xs font-normal text-destructive">
                {fieldErrors.address}
              </span>
            )}
          </label>
        </div>

        <div>
          <p className="mb-2.5 font-sans text-[13px] font-semibold text-[#334155]">
            What can we help with?
          </p>
          <div className="flex flex-wrap gap-2.5">
            {SERVICES.map((option) => {
              const active = service === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setService(option)}
                  aria-pressed={active}
                  className={cn(
                    "rounded-full border-[1.5px] px-4 py-2.25 font-sans text-[13.5px] font-semibold transition-colors",
                    active
                      ? "border-[#0D1B2A] bg-[#0D1B2A] text-white"
                      : "border-[#eaeef3] bg-[#f4f6f9] text-[#475569]",
                  )}
                >
                  {option}
                </button>
              );
            })}
          </div>
          <input type="hidden" name="service" value={service} />
        </div>

        <label className="block font-sans text-[13px] font-semibold text-[#334155]">
          Details
          <textarea
            name="message"
            rows={4}
            placeholder="Tell us about the issue, your system, and the best time to reach you."
            className={cn(fieldClass, "min-h-27.5 resize-y")}
          />
        </label>

        <label className="flex items-start gap-3 text-xs text-muted-foreground">
          <input type="checkbox" name="smsConsent" className="mt-1 size-4" />
          <span>
            I consent to receive text messages about appointment reminders,
            account notifications, and any relevant information from HVA
            Climate Control at the phone number I provided. I acknowledge
            that my consent is not a condition of purchase. Msg &amp; data
            rates may apply. Msg frequency varies. Reply HELP for assistance
            or STOP to opt out of receiving messages. Read our{" "}
            <a
              href="/privacy-policy"
              className="text-primary-accent underline"
            >
              SMS/Text Messaging Privacy Policy
            </a>
            .
          </span>
        </label>

        {state && !state.success && (
          <p role="alert" className="text-sm text-destructive">
            {state.error}
          </p>
        )}

        <div className="flex items-center gap-4.5 pt-1.5">
          <button
            type="submit"
            disabled={isPending}
            className={buttonVariants({
              className:
                "rounded-[11px] bg-[#F97316] px-7.5 py-3.75 text-[15px] font-bold text-white shadow-[0_8px_20px_rgba(249,115,22,.35)] border-[#F97316] hover:bg-[#F97316]",
            })}
          >
            {isPending ? "Sending..." : "Send request →"}
          </button>
          <p className="max-w-50 text-[13px] leading-[1.5] text-muted-foreground">
            No spam. We only use your info to get in touch.
          </p>
        </div>
      </form>
    </motion.div>
  );
}
