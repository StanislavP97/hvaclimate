"use client";

import { buttonVariants } from "@/components/ui/button";

export function QuoteMiniForm() {
  return (
    <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
      <label className="block text-sm font-semibold text-foreground">
        Name
        <input
          type="text"
          name="name"
          placeholder="First & Last Name"
          className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground"
        />
      </label>
      <label className="block text-sm font-semibold text-foreground">
        Email
        <input
          type="email"
          name="email"
          placeholder="example@gmail.com"
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
      <button
        type="submit"
        disabled
        aria-disabled
        title="Contact form submission is coming soon"
        className={buttonVariants({ className: "w-full rounded-full" })}
      >
        Get a quote
      </button>
    </form>
  );
}
