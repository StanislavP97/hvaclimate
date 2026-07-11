import { Button } from "@/components/ui/button";

export function PriceStep() {
  return (
    <div className="text-center">
      <h2 className="text-xl font-bold text-foreground">
        Your estimated price
      </h2>
      <p className="mt-2 text-sm text-body">
        Based on your home details, here&apos;s what to expect. A technician
        will confirm exact pricing on-site.
      </p>

      <div className="mt-6 rounded-2xl bg-navy p-8">
        <p className="text-3xl font-extrabold text-white">$4,200 - $6,800</p>
        <p className="mt-2 text-sm text-footer-foreground">
          Estimated installation cost
        </p>
      </div>

      <Button
        render={<a href="tel:+13608882217" />}
        nativeButton={false}
        className="mt-8 h-12 w-full rounded-full"
      >
        Book a free in-home estimate →
      </Button>
      <p className="mt-3 text-xs text-body">
        This is a preliminary estimate, not a final quote.
      </p>
    </div>
  );
}
