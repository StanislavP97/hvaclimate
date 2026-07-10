import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Phone, ShieldCheck, Star } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { ServiceEstimateSidebar } from "@/components/services/ServiceEstimateSidebar";
import { ServiceDetailStats } from "@/components/services/ServiceDetailStats";
import { BookOnlineButton } from "@/components/shared/BookOnlineButton";
import type { ServicePage } from "@/types/service-page";

interface RelatedService {
  icon: string;
  title: string;
  desc: string;
  href: string;
}

interface ServiceDetailLayoutProps {
  entry: ServicePage;
  eyebrow: string;
  breadcrumb: { label: string; href: string }[];
  relatedServices: RelatedService[];
  serviceAreas?: string[];
  extraSection?: ReactNode;
}

const DEFAULT_SERVICE_AREAS = [
  "Vancouver, WA",
  "Portland, OR",
  "Camas",
  "Longview",
  "Ridgefield",
  "Battle Ground",
  "Lake Oswego",
];

export function ServiceDetailLayout({
  entry,
  eyebrow,
  breadcrumb,
  relatedServices,
  serviceAreas = DEFAULT_SERVICE_AREAS,
  extraSection,
}: ServiceDetailLayoutProps) {
  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden bg-navy"
        style={{
          backgroundImage:
            "radial-gradient(120% 160% at 15% 0%, color-mix(in srgb, var(--color-navy) 55%, var(--primary)) 0%, var(--color-navy) 60%)",
        }}
      >
        <div className="pointer-events-none absolute -top-35 -right-22.5 size-130 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,.22),transparent_70%)]" />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 py-13 sm:py-17 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
          <div>
            <nav className="mb-5.5 flex flex-wrap items-center gap-2.5 font-sans text-[13.5px] font-medium text-[#8fa0b3]">
              {breadcrumb.map((crumb, index) => (
                <span key={crumb.href} className="flex items-center gap-2.5">
                  {index > 0 && (
                    <ChevronRight className="size-3.5 text-[#4a688c]" />
                  )}
                  <Link
                    href={crumb.href}
                    className={
                      index === breadcrumb.length - 1
                        ? "text-[#7fb0ff]"
                        : "link-animated"
                    }
                  >
                    {crumb.label}
                  </Link>
                </span>
              ))}
            </nav>

            <span className="mb-5 inline-block rounded-full border border-[#7fb0ff40] bg-[#2563eb2e] px-3.75 py-1.75 font-sans text-xs font-bold tracking-[0.12em] text-[#9cc2ff]">
              {eyebrow}
            </span>

            <h1 className="mb-4 font-sans text-[48px] leading-[1.08] font-extrabold tracking-[-0.025em] text-white">
              {entry.name}
            </h1>

            <p className="mb-6.5 max-w-130 text-[17px] leading-[1.6] text-[#aebccc]">
              {entry.metaDescription}
            </p>

            <div className="mb-8 flex flex-wrap items-center gap-5">
              <span className="flex items-center gap-2 text-[14.5px] text-[#dbe4ee]">
                <ShieldCheck className="size-4 text-primary-accent" />
                Licensed
              </span>
              <span className="size-1 rounded-full bg-[#4a688c]" />
              <span className="flex items-center gap-2 text-[14.5px] text-[#dbe4ee]">
                <ShieldCheck className="size-4 text-primary-accent" />
                Bonded
              </span>
              <span className="size-1 rounded-full bg-[#4a688c]" />
              <span className="flex items-center gap-2 text-[14.5px] text-[#dbe4ee]">
                <ShieldCheck className="size-4 text-primary-accent" />
                Insured
              </span>
              <span className="size-1 rounded-full bg-[#4a688c]" />
              <span className="flex items-center gap-2 text-[14.5px] text-[#dbe4ee]">
                <Star className="size-3.5 fill-[#F97316] text-[#F97316]" />
                4.9 Rated
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3.5">
              <a
                href="tel:3608882217"
                className={buttonVariants({
                  className: "rounded-[11px] px-6.5 py-3.75 text-base",
                })}
              >
                <Phone className="size-4" />
                (360) 888-2217
              </a>
              <Link
                href="/contact"
                className={buttonVariants({
                  className:
                    "rounded-[11px] bg-[#F97316] px-6.5 py-3.75 text-base text-white shadow-[0_10px_26px_rgba(249,115,22,.35)] hover:bg-[#F97316]/90",
                })}
              >
                Get Free Estimate
              </Link>
            </div>
          </div>

          <div className="rounded-[20px] border border-white/10 bg-white/5 p-4">
            <div className="relative aspect-4/3 overflow-hidden rounded-[13px]">
              <Image
                src={entry.featuredImage}
                alt={entry.altText}
                fill
                sizes="(min-width: 1024px) 33vw, 90vw"
                className="object-cover"
              />
            </div>
            <div className="flex items-center gap-3 px-2 pt-4 pb-1.5">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-[11px] bg-primary-accent/20 text-[#7fb0ff]">
                <Phone className="size-5" />
              </span>
              <div>
                <div className="font-sans text-[15px] font-bold text-white">
                  Same-day service
                </div>
                <div className="text-[13px] text-[#8fa0b3]">
                  Response within 2 hours
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <ServiceDetailStats />

      {/* Main content */}
      <section className="bg-background px-6 py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_360px]">
          <div
            className="max-w-none text-[16.5px] leading-[1.7] text-body [&_a]:text-primary-accent [&_a]:underline [&_h2]:mt-8 [&_h2]:font-sans [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:tracking-[-0.02em] [&_h2]:text-foreground [&_h3]:mt-6 [&_h3]:font-sans [&_h3]:text-xl [&_h3]:font-extrabold [&_h3]:tracking-[-0.01em] [&_h3]:text-foreground [&_li]:ml-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_p]:mb-4.5 [&_strong]:font-semibold [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:space-y-2"
            dangerouslySetInnerHTML={{ __html: entry.content }}
          />

          <ServiceEstimateSidebar />
        </div>
      </section>

      {/* Related services */}
      <section className="bg-muted px-6 py-18">
        <div className="mx-auto mb-11 max-w-7xl text-center">
          <p className="mb-3 font-sans text-[13px] font-bold tracking-[0.14em] text-primary-accent uppercase">
            Related Services
          </p>
          <h2 className="font-sans text-[34px] font-extrabold tracking-[-0.02em] text-foreground">
            Other {eyebrow.charAt(0) + eyebrow.slice(1).toLowerCase()}
          </h2>
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6.5 sm:grid-cols-2 lg:grid-cols-3">
          {relatedServices.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className="group rounded-[18px] border border-border bg-background p-7.5 shadow-[0_2px_10px_rgba(13,27,42,.04)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_44px_rgba(13,27,42,.14)]"
            >
              <span className="mb-5 flex size-14 items-center justify-center rounded-[14px] bg-primary-accent/10 text-[26px] text-primary-accent">
                {service.icon}
              </span>
              <h3 className="mb-2 font-sans text-[19px] font-bold text-foreground">
                {service.title}
              </h3>
              <p className="mb-5 text-[14.5px] leading-[1.6] text-muted-foreground">
                {service.desc}
              </p>
              <span className="inline-flex items-center gap-1.75 font-sans text-[14.5px] font-semibold text-primary-accent">
                View Service
                <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Service areas band */}
      <section className="bg-background px-6 py-14 text-center">
        <h3 className="mb-7 font-sans text-[26px] font-extrabold tracking-[-0.02em] text-foreground">
          Serving the Greater Vancouver &amp; Portland Area
        </h3>
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3">
          {serviceAreas.map((area) => (
            <span
              key={area}
              className="rounded-full border border-border px-4.5 py-2.25 font-sans text-[14.5px] font-medium text-foreground/80"
            >
              {area}
            </span>
          ))}
        </div>
      </section>

      {extraSection}

      {/* CTA band */}
      <section className="bg-background px-6 pt-4 pb-16">
        <div
          className="relative mx-auto flex max-w-7xl flex-col items-start gap-8 overflow-hidden rounded-[22px] bg-navy px-8 py-11 sm:flex-row sm:items-center sm:justify-between sm:px-12"
          style={{
            backgroundImage:
              "radial-gradient(120% 180% at 15% 0%, color-mix(in srgb, var(--color-navy) 55%, var(--primary)) 0%, var(--color-navy) 60%)",
          }}
        >
          <div className="pointer-events-none absolute -top-30 right-30 size-90 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,.18),transparent_70%)]" />

          <div className="relative flex items-center gap-5.5">
            <span className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-primary-accent text-white shadow-[0_10px_24px_rgba(37,99,235,.4)]">
              <Phone className="size-7" />
            </span>
            <div>
              <div className="font-sans text-[28px] font-extrabold tracking-[-0.02em] text-white">
                Ready for same-day service?
              </div>
              <div className="mt-1 text-[15.5px] text-[#aebccc]">
                Talk to a real technician now — no phone trees, no waiting.
              </div>
            </div>
          </div>

          <div className="relative flex flex-wrap items-center gap-3.5">
            <a
              href="tel:3608882217"
              className={buttonVariants({
                className: "rounded-[11px] px-6.5 py-3.75 text-base",
              })}
            >
              <Phone className="size-4" />
              (360) 888-2217
            </a>
            <BookOnlineButton
              className={buttonVariants({
                className:
                  "rounded-[11px] bg-[#F97316] px-6.5 py-3.75 text-base text-white shadow-[0_10px_26px_rgba(249,115,22,.35)] hover:bg-[#F97316]/90",
              })}
            >
              Book Online
            </BookOnlineButton>
          </div>
        </div>
      </section>
    </>
  );
}
