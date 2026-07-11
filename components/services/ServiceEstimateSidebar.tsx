"use client";

import { Phone, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ServiceEstimateSidebar() {
  return (
    <aside className="overflow-hidden rounded-[20px] border border-border bg-background shadow-[0_18px_48px_rgba(13,27,42,.12)] lg:sticky lg:top-24">
      <div className="bg-navy px-6.5 py-6">
        <div className="font-sans text-[21px] font-extrabold text-white">
          Get a Free Estimate
        </div>
        <div className="mt-1 text-[13.5px] text-footer-foreground">
          No obligation — we&apos;ll respond fast.
        </div>
      </div>

      <form
        className="flex flex-col gap-3.5 px-6.5 py-6"
        onSubmit={(e) => e.preventDefault()}
      >
        <label className="block">
          <span className="mb-1.75 block font-sans text-[12.5px] font-semibold text-body">
            Full Name
          </span>
          <input
            type="text"
            name="name"
            placeholder="Jane Doe"
            className="h-11.5 w-full rounded-[10px] border border-border px-3.5 text-sm text-foreground placeholder:text-muted-foreground"
          />
        </label>

        <label className="block">
          <span className="mb-1.75 block font-sans text-[12.5px] font-semibold text-body">
            Phone Number
          </span>
          <input
            type="tel"
            name="phone"
            placeholder="(360) 000-0000"
            className="h-11.5 w-full rounded-[10px] border border-border px-3.5 text-sm text-foreground placeholder:text-muted-foreground"
          />
        </label>

        <label className="block">
          <span className="mb-1.75 block font-sans text-[12.5px] font-semibold text-body">
            Email
          </span>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            className="h-11.5 w-full rounded-[10px] border border-border px-3.5 text-sm text-foreground placeholder:text-muted-foreground"
          />
        </label>

        <label className="block">
          <span className="mb-1.75 block font-sans text-[12.5px] font-semibold text-body">
            Message
          </span>
          <textarea
            name="message"
            rows={3}
            placeholder="Tell us what's going on…"
            className="w-full resize-none rounded-[10px] border border-border px-3.5 py-3 text-sm text-foreground placeholder:text-muted-foreground"
          />
        </label>

        <Button
          type="submit"
          disabled
          aria-disabled
          title="Contact form submission is coming soon"
          variant="cta-orange"
          className="mt-1 w-full py-3.5 text-[15.5px]"
        >
          Request Free Estimate
        </Button>

        <div className="mt-1.5 text-center">
          <a
            href="tel:+13608882217"
            className="flex items-center justify-center gap-2 font-sans text-[19px] font-extrabold text-foreground"
          >
            <Phone className="size-4.5" />
            (360) 888-2217
          </a>
          <div className="mt-0.5 text-[13px] text-muted-foreground">
            Mon–Sun · 8AM–9PM
          </div>
        </div>

        <div className="mt-1.5 flex items-center justify-center gap-3.5 border-t border-border pt-3.5 text-[12.5px] text-muted-foreground">
          <span className="flex items-center gap-1.25">
            <ShieldCheck className="size-3.5 text-primary-accent" />
            Licensed
          </span>
          <span className="flex items-center gap-1.25">
            <ShieldCheck className="size-3.5 text-primary-accent" />
            Bonded
          </span>
          <span className="flex items-center gap-1.25">
            <ShieldCheck className="size-3.5 text-primary-accent" />
            Insured
          </span>
        </div>
      </form>
    </aside>
  );
}
