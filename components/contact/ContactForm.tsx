"use client";

import { useActionState } from "react";
import { submitContactForm } from "@/actions/contact";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const initialState = null;

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState,
  );

  const fieldErrors = state && !state.success ? state.fieldErrors : undefined;

  if (state?.success) {
    return (
      <div
        role="status"
        className="mt-6 rounded-lg border border-border bg-background p-6 text-sm text-foreground"
      >
        Thanks, we&apos;ll be in touch shortly!
      </div>
    );
  }

  return (
    <form action={formAction} className="mt-6 space-y-6" noValidate>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-foreground">
          Name
          <input
            type="text"
            name="name"
            placeholder="John Carter"
            aria-invalid={!!fieldErrors?.name}
            className={cn(
              "mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground",
              fieldErrors?.name && "border-destructive",
            )}
          />
          {fieldErrors?.name && (
            <span className="mt-1 block text-xs font-normal text-destructive">
              {fieldErrors.name}
            </span>
          )}
        </label>
        <label className="block text-sm font-semibold text-foreground">
          Email
          <input
            type="email"
            name="email"
            placeholder="example@email.com"
            aria-invalid={!!fieldErrors?.email}
            className={cn(
              "mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground",
              fieldErrors?.email && "border-destructive",
            )}
          />
          {fieldErrors?.email && (
            <span className="mt-1 block text-xs font-normal text-destructive">
              {fieldErrors.email}
            </span>
          )}
        </label>
        <label className="block text-sm font-semibold text-foreground">
          Phone
          <input
            type="tel"
            name="phone"
            placeholder="(123) 456 - 789"
            aria-invalid={!!fieldErrors?.phone}
            className={cn(
              "mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground",
              fieldErrors?.phone && "border-destructive",
            )}
          />
          {fieldErrors?.phone && (
            <span className="mt-1 block text-xs font-normal text-destructive">
              {fieldErrors.phone}
            </span>
          )}
        </label>
        <label className="block text-sm font-semibold text-foreground">
          Service
          <input
            type="text"
            name="service"
            placeholder="ex. AC Install"
            className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground"
          />
        </label>
      </div>

      <label className="block text-sm font-semibold text-foreground">
        Address
        <input
          type="text"
          name="address"
          placeholder="Please type your full service address here"
          aria-invalid={!!fieldErrors?.address}
          className={cn(
            "mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground",
            fieldErrors?.address && "border-destructive",
          )}
        />
        {fieldErrors?.address && (
          <span className="mt-1 block text-xs font-normal text-destructive">
            {fieldErrors.address}
          </span>
        )}
      </label>

      <label className="block text-sm font-semibold text-foreground">
        Leave us any helpful details
        <textarea
          name="message"
          rows={4}
          placeholder="Please type your message here..."
          className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground"
        />
      </label>

      <label className="flex items-start gap-3 text-xs text-muted-foreground">
        <input type="checkbox" name="smsConsent" className="mt-1 size-4" />
        <span>
          I consent to receive text messages about appointment reminders,
          account notifications, and any relevant information from HVA
          Climate Control at the phone number I provided. I acknowledge that
          my consent is not a condition of purchase. Msg &amp; data rates may
          apply. Msg frequency varies. Reply HELP for assistance or STOP to
          opt out of receiving messages. Read our{" "}
          <a href="/privacy-policy" className="text-primary-accent underline">
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

      <button
        type="submit"
        disabled={isPending}
        className={buttonVariants({
          className: "w-full rounded-full",
        })}
      >
        {isPending ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
