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
  title: "Air Conditioning Services | HVA Climate Control",
  description:
    "AC repair, installation, and tune-up services in Vancouver WA and Portland OR. Fast, reliable air conditioning experts, licensed, bonded, and insured.",
  path: "/air-conditioning",
});

export const COOLING_SERVICE_CARDS: ServiceCardData[] = [
  {
    title: "Air Conditioner Repair",
    description:
      "Fast and reliable AC repair services for residential and commercial systems. We diagnose and fix any issue, same or next-day.",
    href: "/air-conditioner/repair/residential",
    imageLabel: "Air conditioner repair",
    thumbnail: "/images/services/cooling/air-handler-repair.jpg",
  },
  {
    title: "Air Conditioner Installation",
    description:
      "Professional air conditioner installation for homes and businesses in Vancouver WA and Portland OR. Flat-rate pricing, no surprises.",
    href: "/air-conditioner/installation/residential",
    imageLabel: "Air conditioner installation",
    thumbnail: "/images/services/cooling/residential-ac-installation.jpeg",
  },
  {
    title: "Air Conditioner Tune-up",
    description:
      "Keep your AC running efficiently all season. Our tune-up service improves performance, extends equipment life, and lowers energy bills.",
    href: "/air-conditioner/tune-up/residential",
    imageLabel: "Air conditioner tune-up",
    thumbnail: "/images/services/cooling/ac-tune-up.jpg",
  },
];

const AC_HIGHLIGHTS = [
  {
    title: "Lower Energy Bills",
    description:
      "A clean, well-tuned system uses less energy and performs more efficiently.",
  },
  {
    title: "Fewer Repairs",
    description:
      "Preventive maintenance catches issues early before they turn into major (and expensive) problems.",
  },
  {
    title: "Improved Indoor Air Quality",
    description:
      "Clean filters and coils mean cleaner, healthier air for your home or business.",
  },
  {
    title: "Longer System Life",
    description:
      "Just like a car, regular care helps your air conditioner last longer and perform better.",
  },
  {
    title: "More Consistent Comfort",
    description:
      "Enjoy reliable cooling all summer long, with fewer hot spots or airflow issues.",
  },
];

export default function AirConditioningPage() {
  return (
    <>
      <ServiceCategoryLayout
        eyebrow="COOLING SERVICES"
        title="Air Conditioning Services in Vancouver, WA"
        description="From AC repair to new installations — we keep you cool all summer long."
        cards={COOLING_SERVICE_CARDS}
        categoryLabel="Cooling"
      />

      <section className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-12 px-6 py-16 lg:grid-cols-[1fr_360px]">
        <div className="space-y-12">
          <div>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Stay Cool, Comfortable, and Efficient with Expert Air
              Conditioner Services
            </h2>
            <p className="mt-4 text-body">
              When temperatures rise, your air conditioning system plays a
              vital role in maintaining a comfortable and productive
              environment. At HVA Climate Control, we specialize in
              professional air conditioner services for both residential and
              commercial clients throughout Portland and Vancouver. Whether
              you need routine maintenance, fast repairs, or a complete system
              replacement, we deliver high-quality service backed by years of
              experience.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Full-Service Air Conditioning Solutions
            </h2>
            <p className="mt-4 text-body">
              We understand that every home and business has unique cooling
              needs. That&rsquo;s why we offer a comprehensive range of air
              conditioning services designed to keep your system running at
              peak performance year-round.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground">
              AC Maintenance
            </h2>
            <p className="mt-4 text-body">
              Routine maintenance is the key to preventing costly repairs and
              extending the life of your air conditioner. Our technicians
              perform detailed inspections, clean coils and filters, check
              refrigerant levels, and test system performance to ensure
              everything is running smoothly.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground">AC Repairs</h2>
            <p className="mt-4 text-body">
              When your air conditioner isn&rsquo;t cooling like it should
              &mdash; or stops working altogether &mdash; we&rsquo;re just a
              call away. Our team responds quickly to diagnose the problem
              and complete reliable, lasting repairs. Whether it&rsquo;s a
              failing compressor, electrical issue, refrigerant leak, or
              thermostat malfunction, we&rsquo;ve seen it all and fixed it
              all.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground">
              AC Installation &amp; Replacement
            </h2>
            <p className="mt-4 text-body">
              If your system is outdated, inefficient, or no longer repairable,
              we offer expert air conditioner installation and replacement
              services. We&rsquo;ll help you select the best energy-efficient
              model for your space and install it with precision and care.
              Our goal is to ensure you get a reliable system that keeps you
              cool while lowering your monthly energy bills.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Ductless Mini-Split Systems
            </h2>
            <p className="mt-4 text-body">
              Need flexible, zoned cooling without the hassle of ductwork? We
              install and maintain ductless mini-split systems that offer
              efficient climate control with a sleek, low-profile design.
              Perfect for older homes, room additions, or commercial offices,
              mini-splits are a smart, cost-effective option.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Why Air Conditioner Maintenance Matters
            </h2>
            <p className="mt-4 text-body">
              Neglecting your AC system may lead to poor airflow, higher
              utility costs, and frequent breakdowns. On the other hand,
              regular service offers a range of benefits:
            </p>
            <ul className="mt-4 space-y-2">
              {AC_HIGHLIGHTS.map((item) => (
                <li key={item.title} className="flex items-start gap-3 text-body">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary-accent" />
                  <span>
                    <strong className="text-foreground">{item.title}</strong> &mdash;{" "}
                    {item.description}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Your Local AC Experts in Portland &amp; Vancouver
            </h2>
            <p className="mt-4 text-body">
              At HVA Climate Control, we&rsquo;re committed to your comfort
              and satisfaction. Our certified technicians deliver honest
              recommendations, upfront pricing, and top-tier workmanship on
              every job. We treat every home and business like it&rsquo;s our
              own &mdash; because we know how important comfort, safety, and
              reliability are to you.
            </p>
            <p className="mt-4 text-body">
              Whether it&rsquo;s the peak of summer or you&rsquo;re planning
              ahead for next season, don&rsquo;t leave your cooling system to
              chance. Trust HVA Climate Control for dependable air
              conditioning service you can count on.
            </p>
            <p className="mt-4 text-body">
              Ready to stay cool and comfortable? Contact us today to schedule
              your air conditioning service or request a free estimate!
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
