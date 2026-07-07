"use client";

import { buttonVariants } from "@/components/ui/button";

export function ContactForm() {
  return (
    <form
      className="mt-6 space-y-6"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-foreground">
          Name
          <input
            type="text"
            name="name"
            placeholder="John Carter"
            className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground"
          />
        </label>
        <label className="block text-sm font-semibold text-foreground">
          Email
          <input
            type="email"
            name="email"
            placeholder="example@email.com"
            className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground"
          />
        </label>
        <label className="block text-sm font-semibold text-foreground">
          Phone
          <input
            type="tel"
            name="phone"
            placeholder="(123) 456 - 789"
            className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground"
          />
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
          className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground"
        />
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

      <button
        type="submit"
        disabled
        aria-disabled
        title="Contact form submission is coming soon"
        className={buttonVariants({
          className: "w-full rounded-full",
        })}
      >
        Send Message
      </button>
    </form>
  );
}
