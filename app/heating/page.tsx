import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ServiceCategoryLayout,
  type ServiceCategoryCard,
} from "@/components/services/ServiceCategoryLayout";
import { ServiceEstimateSidebar } from "@/components/services/ServiceEstimateSidebar";
import { pageMetadata } from "@/lib/metadata";

type ServiceCardData = ServiceCategoryCard;

export const metadata: Metadata = pageMetadata({
  title: "Heating Services | HVA Climate Control",
  description:
    "Expert gas and electric furnace repair, installation, tune-up, and maintenance in Vancouver WA and Portland OR. Licensed, bonded, and insured.",
  path: "/heating",
});

export const HEATING_SERVICE_CARDS: ServiceCardData[] = [
  {
    title: "Gas Furnace",
    description:
      "Expert repair, installation, and maintenance services for gas furnaces.",
    href: "/heating/gas-furnace/repair",
    imageLabel: "Gas furnace",
    thumbnail: "/images/services/heating/gas-furnace-installation.jpeg",
  },
  {
    title: "Electric Furnace",
    description:
      "Pro electric furnace services including installation, repair, maintenance.",
    href: "/heating/electric-furnace/repair",
    imageLabel: "Electric furnace",
    thumbnail: "/images/services/heating/electric-furnace-installation.jpeg",
  },
  {
    title: "Repair Services",
    description:
      "Professional repair services for gas and electric furnaces. Swift solutions to keep your home comfortable and warm.",
    href: "/heating/gas-furnace/repair",
    imageLabel: "Furnace repair",
    thumbnail: "/images/services/heating/electric-furnace-repair.jpg",
  },
  {
    title: "Installation",
    description:
      "Efficient installation services for gas and electric furnaces. Expertly installed systems for consistent comfort and warmth in your home or business.",
    href: "/heating/gas-furnace/installation",
    imageLabel: "Furnace installation",
    thumbnail: "/images/services/heating/gas-furnace-upgrade.jpg",
  },
  {
    title: "Upgrade and Tune-up",
    description:
      "Enhance efficiency with our gas and electric furnace upgrade and tune-up services.",
    href: "/heating/gas-furnace/maintenance",
    imageLabel: "Furnace tune-up",
    thumbnail: "/images/services/heating/electric-furnace-upgrade.jpg",
  },
  {
    title: "Maintenance & Replacement of Parts",
    description:
      "Comprehensive furnace maintenance and part replacement services for gas and electric systems.",
    href: "/heating/gas-furnace/maintenance",
    imageLabel: "Furnace maintenance",
    thumbnail: "/images/services/heating/gas-furnace-maintenance.jpg",
  },
];

const GAS_FURNACE_SERVICES = [
  {
    title: "Gas furnace installation",
    description:
      "We install high-efficiency gas furnaces tailored to your home's size and heating needs.",
    href: "/heating/gas-furnace/installation",
  },
  {
    title: "Gas furnace replacement",
    description:
      "If your old furnace is beyond repair or inefficient, we'll guide you through the replacement process with top-rated units.",
    href: "/heating/gas-furnace/replacement",
  },
  {
    title: "Gas furnace repair",
    description:
      "From faulty ignitions to airflow issues, we troubleshoot and fix all types of gas furnace problems quickly.",
    href: "/heating/gas-furnace/repair",
  },
  {
    title: "Gas furnace maintenance",
    description:
      "Scheduled maintenance keeps your gas furnace efficient and helps avoid breakdowns during cold weather.",
    href: "/heating/gas-furnace/maintenance",
  },
  {
    title: "Gas furnace tune-up",
    description:
      "Preventative maintenance and seasonal tune-ups ensure your furnace runs smoothly and reliably when you need it most.",
    href: "/heating/gas-furnace/tune-up",
  },
  {
    title: "Gas furnace upgrade",
    description:
      "Ready to improve your heating performance? Our upgrade services help boost energy efficiency and lower your bills.",
    href: "/heating/gas-furnace/upgrade",
  },
  {
    title: "Emergency gas furnace repair",
    description:
      "When the heat goes out unexpectedly, our emergency team is available to restore warmth to your home fast.",
    href: "/heating/gas-furnace/emergency-repair",
  },
];

const ELECTRIC_FURNACE_SERVICES = [
  {
    title: "Electric furnace installation",
    description:
      "We install modern, high-performance electric furnaces for long-lasting indoor comfort.",
    href: "/heating/electric-furnace/installation",
  },
  {
    title: "Electric furnace replacement",
    description:
      "Outdated or failing electric systems can be replaced quickly and affordably with our expert guidance.",
    href: "/heating/electric-furnace/replacement",
  },
  {
    title: "Electric furnace repair",
    description:
      "No heat? Unusual noises? We'll diagnose and fix the issue promptly with minimal disruption.",
    href: "/heating/electric-furnace/repair",
  },
  {
    title: "Electric furnace tune-up",
    description:
      "Seasonal tune-ups help improve airflow, safety, and heating efficiency.",
    href: "/heating/electric-furnace/tune-up",
  },
  {
    title: "Electric furnace upgrade",
    description:
      "Upgrade to a new model for better performance and consistent warmth.",
    href: "/heating/electric-furnace/upgrade",
  },
  {
    title: "Electric furnace maintenance",
    description:
      "Scheduled maintenance keeps your system efficient and avoids breakdowns during cold weather.",
    href: "/heating/electric-furnace/maintenance",
  },
  {
    title: "Emergency electric furnace repair",
    description:
      "When your electric heat fails, you can count on our emergency services 24/7 to restore comfort fast.",
    href: "/heating/electric-furnace/emergency-repair",
  },
];

export default function HeatingPage() {
  return (
    <>
      <ServiceCategoryLayout
        eyebrow="HEATING SERVICES"
        title="Heating Services in Vancouver, WA"
        description="From furnace repair to heat pump installation — we keep your home warm through every Pacific Northwest winter."
        cards={HEATING_SERVICE_CARDS}
        categoryLabel="Heating"
      />

      <section className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-12 px-6 py-16 lg:grid-cols-[1fr_360px]">
        <div className="space-y-12">
          <div>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Reliable Heating Services to Keep Your Home Comfortable
              Year-Round
            </h2>
            <p className="mt-4 text-body">
              At HVA Climate Control, we specialize in delivering dependable,
              energy-efficient heating solutions for homeowners in need of
              comfort and reliability. Whether you rely on a gas or an
              electric furnace, our expert technicians are equipped with the
              tools, training, and experience to handle installation, repair,
              maintenance, upgrades, and emergency service with ease.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Gas Furnace Services
            </h2>
            <p className="mt-4 text-body">
              Gas furnaces remain a popular choice among homeowners for their
              efficiency and cost-effective performance. Our team offers
              comprehensive gas furnace services, including:
            </p>
            <ul className="mt-4 space-y-2">
              {GAS_FURNACE_SERVICES.map((item) => (
                <li key={item.title} className="flex items-start gap-3 text-body">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary-accent" />
                  <span>
                    <Link
                      href={item.href}
                      className="font-bold text-foreground hover:text-primary-accent hover:underline"
                    >
                      {item.title}
                    </Link>
                    : {item.description}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Electric Furnace Services
            </h2>
            <p className="mt-4 text-body">
              Electric furnaces offer clean, quiet, and safe heating &mdash;
              perfect for homes without access to natural gas. Our certified
              technicians are trained to service all brands and models,
              providing:
            </p>
            <ul className="mt-4 space-y-2">
              {ELECTRIC_FURNACE_SERVICES.map((item) => (
                <li key={item.title} className="flex items-start gap-3 text-body">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary-accent" />
                  <span>
                    <Link
                      href={item.href}
                      className="font-bold text-foreground hover:text-primary-accent hover:underline"
                    >
                      {item.title}
                    </Link>
                    : {item.description}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Why Choose HVA Climate Control?
            </h2>
            <p className="mt-4 text-body">
              When it comes to heating, you want a team that&rsquo;s fast,
              friendly, and focused on quality. That&rsquo;s exactly what we
              deliver. At HVA Climate Control, we take pride in offering
              transparent pricing, trusted brands, and expert craftsmanship
              backed by warranties you can count on.
            </p>
            <p className="mt-4 text-body">
              We don&rsquo;t just fix heating systems &mdash; we help
              homeowners make smart decisions that improve comfort and
              efficiency over the long term. From minor installations to
              urgent repairs, our heating services are designed with your
              convenience and peace of mind in mind.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Schedule Your Heating Service Today
            </h2>
            <p className="mt-4 text-body">
              Don&rsquo;t wait for a cold front to discover your heating
              system needs attention. Whether you&rsquo;re upgrading,
              maintaining, or in need of emergency furnace repair, we&rsquo;re
              here to help. Contact HVA Climate Control today to schedule your
              heating service or request a free quote.
            </p>
            <Button
              render={<Link href="/contact" />}
              nativeButton={false}
              className="mt-6 gap-2 rounded-full px-8"
            >
              <ShieldCheck className="size-4" />
              Get a free quote
            </Button>
          </div>
        </div>

        <ServiceEstimateSidebar />
      </section>
    </>
  );
}
