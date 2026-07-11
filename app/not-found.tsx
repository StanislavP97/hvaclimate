import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center bg-navy px-6 py-24 text-center text-footer-heading">
      <p className="text-8xl font-extrabold text-primary-accent sm:text-9xl">
        404
      </p>
      <h1 className="mt-8 text-4xl font-bold sm:text-5xl">Page not found</h1>
      <p className="mt-4 text-footer-foreground">
        We apologize for any inconvenience.
      </p>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Button render={<Link href="/" />} nativeButton={false} className="rounded-full px-8">
          Back to homepage
        </Button>
        <Button
          render={<Link href="/contact" />}
          nativeButton={false}
          variant="outline-dark"
          className="rounded-full px-8"
        >
          Contact us
        </Button>
      </div>
    </div>
  );
}
