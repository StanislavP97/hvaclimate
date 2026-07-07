import { buttonVariants } from "@/components/ui/button";

export function ServiceReviewsBand() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20 text-center">
      <p className="text-sm font-semibold tracking-wide text-primary-accent uppercase">
        Reviews
      </p>
      <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
        What our clients say
      </h2>
      <p className="mt-4 text-body">
        We treat every project with the care that deserves a 5 star rating, we
        hope to serve you with the same service quality.
      </p>
      <a
        href="/instant-quote"
        className={buttonVariants({ className: "mt-8 rounded-full px-8" })}
      >
        Get Your Home Serviced
      </a>
    </section>
  );
}
