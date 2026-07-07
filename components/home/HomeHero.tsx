import Link from "next/link";
import { Check, Phone, Wrench } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";

const FEATURES = [
  {
    icon: Check,
    title: "Precision-Tuned HVAC Solutions",
    description:
      "We don't offer cookie-cutter installs — every system is sized and configured for maximum comfort and efficiency in your home.",
  },
  {
    icon: Phone,
    title: "Emergency-Ready, Anytime Calls",
    description:
      "We prioritize fast response times and reliable service so you're never left sweating (or freezing) when it matters most.",
  },
  {
    icon: Wrench,
    title: "Energy Savings That Last",
    description:
      "Our installs don't just work — they work smarter, saving you money month after month with optimized performance and airflow.",
  },
];

export function HomeHero() {
  return (
    <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-16 lg:grid-cols-2 lg:gap-16">
      <div>
        <p className="text-sm font-bold tracking-wide text-primary-accent">
          LICENSED, BONDED, &amp; INSURED
        </p>
        <h1 className="mt-3 text-4xl font-extrabold text-foreground sm:text-5xl">
          Your HVAC Contractor in Vancouver, WA
        </h1>

        <ul className="mt-8 space-y-6">
          {FEATURES.map((feature) => (
            <li key={feature.title} className="flex gap-4">
              <feature.icon className="mt-1 size-6 shrink-0 text-foreground" />
              <div>
                <h2 className="font-bold text-foreground">{feature.title}</h2>
                <p className="mt-1 text-body">{feature.description}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="tel:3608882217"
            className={buttonVariants({
              variant: "outline",
              className: "rounded-full px-6",
            })}
          >
            (360) 888-2217
          </a>
          <Link
            href="/heating"
            className={buttonVariants({
              variant: "outline",
              className: "rounded-full px-6",
            })}
          >
            Browse our services
          </Link>
        </div>
      </div>

      <ImagePlaceholder
        label="HVA Climate Control service van"
        className="aspect-4/3 w-full rounded-2xl"
      />
    </section>
  );
}
