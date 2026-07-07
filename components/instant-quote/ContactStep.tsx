"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const INPUT_CLASS =
  "h-12 w-full rounded-lg border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none";

export function ContactStep({ onVerified }: { onVerified: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [awaitingCode, setAwaitingCode] = useState(false);

  if (awaitingCode) {
    return (
      <div>
        <h2 className="text-xl font-bold text-foreground">
          Did you receive your code?
        </h2>
        <p className="mt-2 text-sm text-body">
          We just sent it to {phone || "your phone"}.
        </p>

        <Button className="mt-6 h-12 w-full rounded-full" onClick={onVerified}>
          Yes, I got it →
        </Button>
        <button
          type="button"
          onClick={() => setAwaitingCode(false)}
          className="mt-4 block text-sm text-body underline underline-offset-2"
        >
          No — let&apos;s try a different way
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-foreground">
        Where would you like to receive your quote?
      </h2>
      <p className="mt-2 text-sm text-body">
        Enter your name and phone number and we&apos;ll send your
        personalized pricing.
      </p>

      <div className="mt-6 flex flex-col gap-4">
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Full name"
          className={INPUT_CLASS}
        />
        <input
          type="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="Phone number"
          className={INPUT_CLASS}
        />
      </div>

      <Button
        className="mt-6 h-12 w-full rounded-full"
        onClick={() => setAwaitingCode(true)}
      >
        Send my quote →
      </Button>
    </div>
  );
}
