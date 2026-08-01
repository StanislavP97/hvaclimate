import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfoPanel } from "@/components/contact/ContactInfoPanel";
import { ContactMap } from "@/components/contact/ContactMap";
import { FaqAccordion } from "@/components/contact/FaqAccordion";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us | HVA Climate Control",
  description:
    "Get in touch with HVA Climate Control for HVAC repair, installation, and maintenance in Vancouver WA and Portland OR.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <ContactHero />

      <section className="bg-background px-6 py-18 lg:px-12 lg:py-19">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-14 lg:grid-cols-[1.35fr_1fr]">
          <ContactForm />
          <ContactInfoPanel />
        </div>
      </section>

      <ContactMap />

      <section className="bg-[#f8fafc]">
        <FaqAccordion />
      </section>
    </>
  );
}
