import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";

const STATS = [
  { value: "10+", label: "Year Experience" },
  { value: "400+", label: "Happy clients" },
  { value: "7+", label: "Qualified experts" },
];

export function ExperienceBanner() {
  return (
    <section className="bg-navy">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <ImagePlaceholder
          label="HVA Climate Control technician at work"
          className="aspect-4/3 w-full lg:aspect-auto lg:h-full"
        />

        <div className="px-6 py-16 lg:py-0">
          <p className="text-sm font-bold tracking-wide text-amber-400">
            OUR EXPERIENCE
          </p>
          <h2 className="mt-3 text-4xl font-extrabold text-white">
            We focus on customer satisfaction and quality
          </h2>
          <p className="mt-4 text-footer-foreground">
            We offer 100% satisfaction gurantee, if we make a mistake, we make
            it right!
          </p>

          <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-4xl font-extrabold text-white">
                  {stat.value}
                </dd>
                <dd className="text-sm text-footer-foreground">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>

          <Link
            href="/instant-quote"
            className={buttonVariants({ className: "mt-8 rounded-lg px-6" })}
          >
            Get a quote
          </Link>
        </div>
      </div>
    </section>
  );
}
