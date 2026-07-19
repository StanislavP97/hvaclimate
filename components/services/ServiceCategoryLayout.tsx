import Link from "next/link";
import { Phone } from "lucide-react";
import { ServiceCategoryHeroContent } from "@/components/services/ServiceCategoryHeroContent";
import { ServiceCategoryStatsBar } from "@/components/services/ServiceCategoryStatsBar";
import { ServiceCategoryRevealGrid } from "@/components/services/ServiceCategoryRevealGrid";
import { BookOnlineButton } from "@/components/shared/BookOnlineButton";
import { Button } from "@/components/ui/button";

export interface ServiceCategoryCard {
  title: string;
  description: string;
  href: string;
  thumbnail: string;
  altText?: string;
  imageLabel: string;
}

export interface ServiceCategoryLayoutProps {
  eyebrow: string;
  title: string;
  description: string;
  cards: ServiceCategoryCard[];
  categoryLabel: string;
}

const REVIEWS = [
  {
    initials: "TW",
    name: "Tom W.",
    loc: "Vancouver, WA",
    quote:
      "“Our furnace died on the coldest night of the year. HVA had a tech out first thing and had heat back by noon. Lifesavers.”",
  },
  {
    initials: "AP",
    name: "Angela P.",
    loc: "Portland, OR",
    quote:
      "“New furnace install was spotless. They walked me through the rebates and left the place cleaner than they found it.”",
  },
  {
    initials: "MG",
    name: "Marcus G.",
    loc: "Camas, WA",
    quote:
      "“Honest diagnosis — they fixed a small part instead of pushing a whole new unit. Earned my trust for good.”",
  },
];

export function ServiceCategoryLayout({
  eyebrow,
  title,
  description,
  cards,
  categoryLabel,
}: ServiceCategoryLayoutProps) {
  return (
    <>
      {/* HERO */}
      <div className="relative overflow-hidden bg-[radial-gradient(120%_160%_at_15%_0%,#17304d_0%,#0D1B2A_60%)] px-12 py-24 sm:py-26">
        <div className="pointer-events-none absolute -top-40 -right-25 size-[560px] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.22),transparent_70%)]" />
        <ServiceCategoryHeroContent
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
      </div>

      {/* TRUST BAR */}
      <ServiceCategoryStatsBar />

      {/* SERVICES GRID */}
      <div className="bg-white px-12 py-22">
        <div className="mx-auto mb-13 max-w-3xl text-center">
          <div className="mb-3 font-sans text-[13px] font-bold tracking-[0.14em] text-primary-accent uppercase">
            What We Do
          </div>
          <h2 className="mb-3.5 font-sans text-4xl font-extrabold tracking-[-0.02em] text-foreground">
            Complete {categoryLabel} Services
          </h2>
          <p className="text-[17px] text-[#64748b]">
            Everything from emergency repair to full system installation.
          </p>
        </div>
        <ServiceCategoryRevealGrid cards={cards} />
      </div>

      {/* REVIEWS BAND */}
      <div className="bg-[#0D1B2A] px-12 py-20">
        <div className="mx-auto mb-11 max-w-3xl text-center">
          <div className="mb-3 font-sans text-[13px] font-bold tracking-[0.14em] text-primary-accent uppercase">
            Reviews
          </div>
          <h2 className="mb-3 font-sans text-4xl font-extrabold tracking-[-0.02em] text-white">
            What our clients say
          </h2>
          <p className="text-base text-[#8fa0b3]">
            Real homeowners across Vancouver &amp; Portland.
          </p>
        </div>
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-6.5 sm:grid-cols-3">
          {REVIEWS.map((review) => (
            <div
              key={review.name}
              className="rounded-2xl border border-white/10 bg-white/5 p-6.5"
            >
              <div className="mb-4 text-base tracking-[2px] text-[#F97316]">
                ★★★★★
              </div>
              <p className="mb-6 text-[15px] leading-relaxed text-[#e6ecf4]">
                {review.quote}
              </p>
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-full bg-white/10 font-sans font-bold text-[#8fb8ff]">
                  {review.initials}
                </div>
                <div>
                  <div className="font-sans text-[15px] font-bold text-white">
                    {review.name}
                  </div>
                  <div className="text-[13px] text-[#8fa0b3]">{review.loc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-11 text-center">
          <Button render={<Link href="/contact" />} nativeButton={false} variant="cta-orange">
            Get Your Home Serviced
          </Button>
        </div>
      </div>

      {/* CTA BAND */}
      <div className="bg-white px-12 pt-20 pb-22">
        <div className="relative flex flex-col items-center justify-between gap-10 overflow-hidden rounded-[22px] bg-[radial-gradient(130%_150%_at_12%_0%,#17304d_0%,#0D1B2A_65%)] p-13 sm:flex-row">
          <div className="pointer-events-none absolute -top-30 right-20 size-90 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.22),transparent_70%)]" />
          <div className="relative flex flex-col items-start gap-5.5 md:flex-row md:items-center">
            <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-primary-accent text-white shadow-[0_12px_26px_rgba(37,99,235,0.4)]">
              <Phone className="size-7" />
            </div>
            <div>
              <div className="font-sans text-[28px] font-extrabold text-white">
                Need {categoryLabel.toLowerCase()} help today?
              </div>
              <div className="mt-1.5 text-base text-[#aebccc]">
                Same-day service available across the metro area.
              </div>
            </div>
          </div>
          <div className="relative flex w-full flex-col gap-3.5 sm:w-auto sm:flex-row sm:items-center">
            <Button
              render={<a href="tel:+13608882217" />}
              nativeButton={false}
              variant="cta-phone"
              className="flex-1 justify-center gap-2 sm:flex-none"
            >
              <Phone className="size-4" />
              (360) 888-2217
            </Button>
            <BookOnlineButton variant="cta-orange" className="flex-1 justify-center sm:flex-none">
              Book Online
            </BookOnlineButton>
          </div>
        </div>
      </div>
    </>
  );
}
