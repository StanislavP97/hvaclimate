import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { ServiceHero } from "@/components/services/ServiceHero";
import { ServiceTrustBar } from "@/components/services/ServiceTrustBar";
import { ServiceCardGrid, type ServiceCardData } from "@/components/services/ServiceCardGrid";
import { ServiceContentSidebar } from "@/components/services/ServiceContentSidebar";
import { ServiceReviewsBand } from "@/components/services/ServiceReviewsBand";

export const metadata: Metadata = {
  title: "Commercial HVAC Services | HVA Climate Control",
  description:
    "Commercial HVAC maintenance, hood, oven, and refrigeration repair for businesses in Vancouver WA and Portland OR. Licensed, bonded, and insured.",
};

const SERVICE_CARDS: ServiceCardData[] = [
  {
    title: "Commercial HVAC Maintenance Services",
    description:
      "Prevent breakdowns and boost efficiency with professional HVAC maintenance by HVA Climate Control.",
    href: "/commercial/hvac-maintenance",
    imageLabel: "Commercial HVAC maintenance",
  },
  {
    title: "Hood Repair and Maintenance Services",
    description:
      "Ensure proper ventilation and fire safety with hood maintenance and repair from HVA Climate Control.",
    href: "/commercial/hood-cooktop",
    imageLabel: "Hood repair and maintenance",
  },
  {
    title: "Cooktop Repair and Maintenance Services",
    description:
      "Keep your cooktops in peak condition with expert maintenance and repair services from HVA Climate Control.",
    href: "/commercial/hood-cooktop",
    imageLabel: "Cooktop repair and maintenance",
  },
  {
    title: "Commercial Ovens Repair",
    description:
      "Expert commercial oven repairs to reduce downtime and restore cooking quality.",
    href: "/commercial/ovens-repair",
    imageLabel: "Commercial ovens repair",
  },
  {
    title: "Pizza Ovens Service",
    description:
      "Professional pizza oven repair and maintenance to keep your kitchen running at full capacity.",
    href: "/commercial/ovens-repair",
    imageLabel: "Pizza ovens service",
  },
  {
    title: "Refrigeration Systems Maintenance",
    description:
      "Extend the life of your refrigeration systems with routine maintenance and repair from HVA Climate Control.",
    href: "/commercial/refrigeration",
    imageLabel: "Refrigeration systems maintenance",
  },
];

export default function CommercialPage() {
  return (
    <>
      <ServiceHero
        title="Commercial Services"
        description="Keep your business running smoothly with expert commercial services from HVA Climate Control. From refrigeration to HVAC, we provide reliable maintenance and repairs to help you stay efficient, safe, and compliant."
        primaryCtaLabel="Get a Quote Today"
        imageLabel="Commercial refrigeration and HVAC equipment"
      />
      <ServiceTrustBar />
      <ServiceCardGrid cards={SERVICE_CARDS} />

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-16 lg:grid-cols-[1fr_360px]">
        <div className="space-y-12">
          <div>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Expert Commercial HVAC for Reliable Performance
            </h2>
            <p className="mt-4 text-body">
              At HVA Climate Control, we specialize in keeping kitchens and
              commercial equipment running with professional maintenance and
              repair services. Whether you manage a restaurant, grocery store,
              cafeteria, or food production facility, maintaining your
              critical equipment isn&rsquo;t optional &mdash; it&rsquo;s
              essential. That&rsquo;s why we offer a full range of commercial
              services designed to keep your business operating safely and
              efficiently.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Commercial Refrigeration Maintenance
            </h2>
            <p className="mt-4 text-body">
              Your refrigeration systems are among the most vital components
              of your commercial operation. If they fail, it can lead to
              product loss, increased energy bills, and even equipment
              damage. Our comprehensive refrigeration maintenance services are
              designed to catch issues early and ensure optimal performance.
              We inspect for leaks, clean coils and filters, and calibrate
              settings to keep your system running efficiently while
              extending its lifespan.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Pizza Oven Services
            </h2>
            <p className="mt-4 text-body">
              Pizza ovens need proper heat control and even cooking
              performance to deliver consistent results. Our team offers
              expert maintenance and repair services for all types of pizza
              ovens, including deck, conveyor, and wood-fired models. We
              inspect burners, calibrate temperatures, replace faulty parts,
              and clean internal components to help your oven perform at high
              capacity during peak hours.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Commercial Oven Repair
            </h2>
            <p className="mt-4 text-body">
              A malfunctioning commercial oven can quickly throw off your
              kitchen schedule and impact food quality. Our technicians are
              equipped to handle diagnostics and repairs for a wide range of
              commercial ovens. Whether it&rsquo;s an issue with the
              thermostat, heating element, or electrical components,
              we&rsquo;ll get your equipment back in working order quickly and
              reliably.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Cooktop Repair and Maintenance
            </h2>
            <p className="mt-4 text-body">
              Daily use in high-demand kitchens can take a toll on commercial
              cooktops. Our repair and maintenance services ensure your
              cooktops remain efficient, safe, and fully functional. We
              handle everything from cleaning and part replacements to
              inspection and safety checks, helping prevent hazards and
              unnecessary downtime.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Hood Repair and Maintenance
            </h2>
            <p className="mt-4 text-body">
              Kitchen hoods play a critical role in ventilation and fire
              safety. Regular hood maintenance helps maintain indoor air
              quality, reduce grease buildup, and ensure compliance with fire
              codes. At HVA Climate Control, we inspect ductwork, fans, and
              filters, and provide thorough cleaning and repairs to keep your
              kitchen safe and compliant.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Commercial HVAC Maintenance
            </h2>
            <p className="mt-4 text-body">
              Comfort and air quality are essential to any commercial space.
              Our commercial HVAC maintenance services help ensure your
              system delivers consistent temperatures, efficient airflow, and
              dependable performance year-round. We perform system
              inspections, clean coils and filters, and make minor repairs to
              avoid larger, costly issues down the line.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Why Choose HVA Climate Control?
            </h2>
            <p className="mt-4 text-body">
              When it comes to servicing your commercial equipment,
              experience and responsiveness matter. At HVA Climate Control, we
              pride ourselves on fast turnaround times, transparent
              communication, and quality workmanship.
            </p>
            <p className="mt-4 text-body">
              Our technicians are trained, licensed, and committed to helping
              your business stay operational and compliant.
            </p>
            <p className="mt-4 text-body">
              From kitchen equipment to climate control systems, we&rsquo;re
              your trusted partner for commercial service and support in
              Portland and Vancouver. Contact us today to schedule service or
              request a custom maintenance plan that fits your business
              needs.
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

        <ServiceContentSidebar />
      </section>

      <ServiceReviewsBand />
    </>
  );
}
