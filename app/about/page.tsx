import type { Metadata } from "next";
import { Handshake, ShieldCheck, HeartHandshake, Star } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";

export const metadata: Metadata = {
  title: "About Us | HVA Climate Control",
  description:
    "Over 10+ years of HVAC experience serving Vancouver WA and Portland OR. Licensed, bonded, and insured heating and cooling experts.",
};

const VALUES = [
  {
    icon: Handshake,
    title: "Trust",
    description:
      "We build lasting relationships with our customers through honest service and dependable results.",
  },
  {
    icon: Star,
    title: "Integrity",
    description:
      "We do what's right, even when no one's looking. Our word is backed by quality workmanship.",
  },
  {
    icon: ShieldCheck,
    title: "Security",
    description:
      "Your home's comfort and safety matter. We install and maintain HVAC systems you can count on.",
  },
  {
    icon: HeartHandshake,
    title: "Commitment",
    description:
      "From first call to final install, we stay dedicated to your comfort, satisfaction, and long-term support.",
  },
];

const MISSION_POINTS = [
  "Skilled in servicing all major HVAC brands and models",
  "Trained in diagnosing heating and cooling issues quickly and accurately",
  "Trusted for fast, reliable repairs and full system installations",
];

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <p className="text-sm font-semibold tracking-wide text-primary-accent uppercase">
          About Us
        </p>
        <h1 className="mt-4 text-4xl font-bold text-foreground sm:text-5xl">
          Over 10+ Years Experience In HVAC Service
        </h1>
        <p className="mt-4 text-lg font-semibold text-primary-accent">
          Licensed, Bonded, &amp; Insured in Washington &amp; Oregon
        </p>
        <p className="mt-4 text-body">
          Proudly serving Vancouver and Portland with reliable HVAC repairs,
          installations, and maintenance for homes and businesses.
        </p>
        <a
          href="/instant-quote"
          className={buttonVariants({ className: "mt-8 rounded-full px-8" })}
        >
          Get a quote
        </a>
      </section>

      <ImagePlaceholder label="Ductwork installation" className="h-96 w-full" />

      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <p className="text-sm font-semibold tracking-wide text-primary-accent uppercase">
          Our Values
        </p>
        <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
          The values that drive us
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex flex-col items-center">
              <span className="flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Icon className="size-7" />
              </span>
              <h3 className="mt-4 text-lg font-bold text-foreground">
                {title}
              </h3>
              <p className="mt-2 text-sm text-body">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-navy py-20 text-footer-foreground">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2">
          <ImagePlaceholder
            label="Technician with service van"
            className="h-80 w-full rounded-2xl"
          />
          <div>
            <p className="text-sm font-semibold tracking-wide text-primary-accent uppercase">
              Our Mission
            </p>
            <h2 className="mt-4 text-3xl font-bold text-footer-heading sm:text-4xl">
              Deliver reliable HVAC solutions for all types of heating and
              cooling systems
            </h2>
            <p className="mt-4">
              We provide expert heating, ventilation, and air conditioning
              services designed to ensure comfort and efficiency in your home
              or business. From seasonal tune-ups to full system
              installations, we&rsquo;re committed to quality and reliability.
            </p>
            <ul className="mt-6 space-y-3">
              {MISSION_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary-accent" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <a
              href="/instant-quote"
              className={buttonVariants({ className: "mt-6 rounded-full px-8" })}
            >
              Get a quote
            </a>
          </div>
        </div>
      </section>

      <section className="bg-navy pb-20 text-footer-foreground">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold tracking-wide text-primary-accent uppercase">
              Our Goals
            </p>
            <h2 className="mt-4 text-3xl font-bold text-footer-heading sm:text-4xl">
              Provide exceptional HVAC services that exceed customer
              expectations
            </h2>
            <p className="mt-4">
              Our goal is to deliver consistent, high-quality service that
              ensures your HVAC systems operate at peak performance
              year-round.
            </p>
            <a
              href="/instant-quote"
              className={buttonVariants({ className: "mt-6 rounded-full px-8" })}
            >
              Get a quote
            </a>
          </div>
          <ImagePlaceholder
            label="AC condenser unit"
            className="h-80 w-full rounded-2xl"
          />
        </div>
      </section>
    </>
  );
}
