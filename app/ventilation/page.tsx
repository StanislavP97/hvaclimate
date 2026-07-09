import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  ServiceCategoryLayout,
  type ServiceCategoryCard,
} from "@/components/services/ServiceCategoryLayout";
import { ServiceEstimateSidebar } from "@/components/services/ServiceEstimateSidebar";

type ServiceCardData = ServiceCategoryCard;

export const metadata: Metadata = {
  title: "Ventilation Services | HVA Climate Control",
  description:
    "Ductwork, vent cleaning, and fresh air system installation in Vancouver WA and Portland OR. Licensed, bonded, and insured ventilation experts.",
};

export const VENTILATION_SERVICE_CARDS: ServiceCardData[] = [
  {
    title: "Ductwork",
    description:
      "Professional installation, repairs, and regular maintenance to keep your ductwork system running efficiently and safely.",
    href: "/ventilation/ductwork/repair",
    imageLabel: "Ductwork",
  },
  {
    title: "Vent Cleaning",
    description:
      "Thorough cleaning and maintenance to remove dust, debris, and buildup, helping your furnace breathe easy and perform its best.",
    href: "/ventilation/vent-cleaning/home",
    imageLabel: "Vent cleaning",
  },
  {
    title: "Fresh Air System Installation",
    description:
      "Boost your indoor air quality with expertly installed fresh air systems tailored to your home.",
    href: "/ventilation/ductwork/fresh-air-system-installation",
    imageLabel: "Fresh air system installation",
  },
];

const DUCTWORK_SERVICES = [
  {
    title: "Duct Installation",
    description:
      "Precision-installed duct systems customized for optimal air distribution.",
  },
  {
    title: "Duct Replacement",
    description:
      "Old, leaky, or inefficient ducts? We'll replace them with high-performance, sealed systems.",
  },
  {
    title: "Duct Repair",
    description:
      "From air leaks to damaged sections, we quickly restore your ductwork to good working condition.",
  },
  {
    title: "Duct Sealing & Insulation",
    description:
      "Improve energy efficiency and air quality with professional sealing and insulation.",
  },
  {
    title: "Duct Maintenance",
    description:
      "Regular inspections and cleaning keep your ductwork running smoothly and free of debris.",
  },
  {
    title: "Emergency Duct Repairs",
    description:
      "Sudden airflow problems? Our team is on call to restore normal ventilation fast.",
  },
];

const VENT_CLEANING_SERVICES = [
  {
    title: "Whole-home vent cleaning",
    description: "for improved airflow and indoor air quality.",
  },
  {
    title: "Dryer vent cleaning",
    description: "to reduce fire hazards and boost appliance efficiency.",
  },
  {
    title: "Bathroom and kitchen vent maintenance",
    description: "to eliminate odors and improve ventilation.",
  },
  {
    title: "Allergen and dust removal",
    description: "to support a healthier living environment.",
  },
  {
    title: "Annual vent system checks",
    description: "for long-term performance and peace of mind.",
  },
  {
    title: "Emergency vent service",
    description: "when you need immediate relief from poor airflow or blockages.",
  },
];

const FRESH_AIR_SERVICES = [
  {
    title: "Fresh air ventilation system installation",
    description: "for continuous clean airflow.",
  },
  {
    title: "System upgrades",
    description: "to integrate with your HVAC and enhance efficiency.",
  },
  {
    title: "Maintenance and filter replacement",
    description: "to keep air quality at its best.",
  },
  {
    title: "Humidity control and odor elimination",
    description: "for a fresher, more comfortable home.",
  },
  {
    title: "Air exchanger services",
    description: "to balance indoor and outdoor air for better ventilation.",
  },
  {
    title: "Emergency service",
    description: "available when ventilation systems stop working unexpectedly.",
  },
];

export default function VentilationPage() {
  return (
    <>
      <ServiceCategoryLayout
        eyebrow="VENTILATION SERVICES"
        title="Ventilation Services in Vancouver, WA"
        description="Ductwork, vent cleaning, and fresh air systems for healthier homes."
        cards={VENTILATION_SERVICE_CARDS}
        categoryLabel="Ventilation"
      />

      <section className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-12 px-6 py-16 lg:grid-cols-[1fr_360px]">
        <div className="space-y-12">
          <div>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Breathe Easier with Reliable Ventilation Services from HVA
              Climate Control
            </h2>
            <p className="mt-4 text-body">
              At HVA Climate Control, we specialize in providing expert
              ventilation solutions that improve indoor air quality, energy
              efficiency, and overall home comfort. Whether you need
              ductwork, vent cleaning, or a fresh air system installation,
              our skilled technicians have the tools, training, and
              experience to have you covered. We&rsquo;re your trusted
              partner in clean, healthy air.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Ductwork Services
            </h2>
            <p className="mt-4 text-body">
              Your ventilation system starts with properly installed and
              maintained ductwork. We offer a full range of duct services to
              ensure clean, efficient airflow throughout your home:
            </p>
            <ul className="mt-4 space-y-2">
              {DUCTWORK_SERVICES.map((item) => (
                <li key={item.title} className="flex items-start gap-3 text-body">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary-accent" />
                  <span>
                    <strong className="text-foreground">{item.title}</strong>:{" "}
                    {item.description}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Vent Cleaning Services
            </h2>
            <p className="mt-4 text-body">
              Over time, vents can accumulate dust, allergens, and debris,
              reducing air quality and system efficiency. Our thorough vent
              cleaning services include:
            </p>
            <ul className="mt-4 space-y-2">
              {VENT_CLEANING_SERVICES.map((item) => (
                <li key={item.title} className="flex items-start gap-3 text-body">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary-accent" />
                  <span>
                    <strong className="text-foreground">{item.title}</strong>{" "}
                    {item.description}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Fresh Air System Installation
            </h2>
            <p className="mt-4 text-body">
              Bring in clean outdoor air and maintain a balanced indoor
              environment with our fresh air system services:
            </p>
            <ul className="mt-4 space-y-2">
              {FRESH_AIR_SERVICES.map((item) => (
                <li key={item.title} className="flex items-start gap-3 text-body">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary-accent" />
                  <span>
                    <strong className="text-foreground">{item.title}</strong>{" "}
                    {item.description}
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
              When it comes to your home&rsquo;s air, you want a team
              that&rsquo;s dependable, knowledgeable, and committed to
              quality. At HVA Climate Control, we&rsquo;re all that and more.
              Our technicians deliver transparent pricing, trusted products,
              and expert workmanship backed by solid warranties.
            </p>
            <p className="mt-4 text-body">
              We don&rsquo;t just install ventilation systems &mdash; we help
              you make informed decisions that lead to healthier indoor
              environments and lower utility bills. From new installations to
              urgent repairs, our ventilation services are designed with your
              long-term comfort in mind.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Schedule Your Ventilation Service Today
            </h2>
            <p className="mt-4 text-body">
              Don&rsquo;t wait for poor air quality or airflow issues to
              disrupt your home. Whether you&rsquo;re planning an upgrade or
              need fast service, HVA Climate Control is here to help. Contact
              us today to schedule your ventilation service or request a free
              quote.
            </p>
            <a
              href="/instant-quote"
              className={buttonVariants({ className: "mt-6 rounded-full px-8" })}
            >
              <ShieldCheck className="size-4" />
              Get a free quote
            </a>
          </div>
        </div>

        <ServiceEstimateSidebar />
      </section>
    </>
  );
}
