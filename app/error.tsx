"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center bg-navy px-6 py-24 text-center text-footer-heading">
      <p className="text-8xl font-extrabold text-primary-accent sm:text-9xl">
        Oops
      </p>
      <h1 className="mt-8 text-4xl font-bold sm:text-5xl">
        Something went wrong
      </h1>
      <p className="mt-4 text-footer-foreground">
        We apologize for any inconvenience. Please try again.
      </p>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Button onClick={reset} className="rounded-full px-8">
          Try again
        </Button>
        <Button
          render={<Link href="/" />}
          nativeButton={false}
          variant="outline-dark"
          className="rounded-full px-8"
        >
          Back to homepage
        </Button>
      </div>
    </div>
  );
}
