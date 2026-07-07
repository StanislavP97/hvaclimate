import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export function ReviewsSection() {
  return (
    <section className="bg-background py-24 text-center">
      <div className="mx-auto max-w-2xl px-6">
        <p className="text-sm font-bold tracking-wide text-primary-accent">
          REVIEWS
        </p>
        <h2 className="mt-3 text-4xl font-extrabold text-foreground">
          What our clients say
        </h2>
        <p className="mt-4 text-body">
          We treat every project with the care that deserves a 5 star rating,
          we hope to serve you with the same service quality.
        </p>
        <Link
          href="/instant-quote"
          className={buttonVariants({ className: "mt-8 rounded-lg px-6" })}
        >
          Get Your Home Serviced
        </Link>
      </div>
    </section>
  );
}
