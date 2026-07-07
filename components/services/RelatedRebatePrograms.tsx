import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { getRebatePrograms } from "@/lib/rebate-programs";

export function RelatedRebatePrograms({
  currentSlug,
}: {
  currentSlug: string;
}) {
  const otherPrograms = getRebatePrograms().filter(
    (entry) => entry.slug !== currentSlug
  );

  return (
    <section className="bg-background py-16">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6">
        <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
          Related services
        </h2>
        <Link
          href="/contact"
          className={buttonVariants({ className: "rounded-full px-6" })}
        >
          Get Rebate
        </Link>
      </div>

      <div className="mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3">
        {otherPrograms.map((entry) => (
          <Link
            key={entry.slug}
            href={`/rebate-programs/${entry.slug}`}
            className="flex flex-col overflow-hidden rounded-2xl bg-muted"
          >
            <Image
              src={entry.thumbnail}
              alt={entry.altText}
              width={640}
              height={480}
              className="h-40 w-full object-cover"
            />
            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-center gap-1 text-primary-accent">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="size-4 fill-current" />
                ))}
              </div>
              <h3 className="mt-3 text-lg font-bold text-foreground">
                {entry.name}
              </h3>
              <span className="mt-2 text-sm font-semibold text-primary-accent">
                View service
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
