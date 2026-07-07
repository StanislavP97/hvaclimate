import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { ContactForm } from "@/components/contact/ContactForm";
import { FaqAccordion } from "@/components/contact/FaqAccordion";

export const metadata: Metadata = {
  title: "Contact Us | HVA Climate Control",
  description:
    "Get in touch with HVA Climate Control for HVAC repair, installation, and maintenance in Vancouver WA and Portland OR.",
};

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-secondary">
        <div className="absolute inset-y-0 left-0 hidden w-[35%] bg-primary lg:block" />

        <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-16 lg:grid-cols-[1fr_1.4fr]">
          <div className="rounded-2xl border border-border bg-background p-8 shadow-sm">
            <h2 className="text-xl font-bold text-foreground">
              Contact details
            </h2>

            <div className="mt-6 space-y-6 text-sm">
              <div className="flex gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent">
                  <MapPin className="size-5 text-primary-accent" />
                </span>
                <div>
                  <p className="font-semibold text-foreground">
                    Visit our office
                  </p>
                  <a href="#" className="text-primary-accent">
                    7933 NE St Johns Rd
                    <br />
                    Vancouver WA
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent">
                  <Mail className="size-5 text-primary-accent" />
                </span>
                <div>
                  <p className="font-semibold text-foreground">Mail:</p>
                  <a
                    href="mailto:Office@HVAClimate.com"
                    className="text-primary-accent"
                  >
                    Office@HVAClimate.com
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent">
                  <Phone className="size-5 text-primary-accent" />
                </span>
                <div>
                  <p className="font-semibold text-foreground">Phone:</p>
                  <a href="tel:3608882217" className="text-primary-accent">
                    (360) 888-2217
                  </a>
                </div>
              </div>
            </div>

            <ImagePlaceholder
              label="Map"
              className="mt-6 h-48 w-full rounded-lg"
            />
          </div>

          <div>
            <p className="text-sm font-semibold tracking-wide text-primary-accent uppercase">
              Contact us
            </p>
            <h1 className="mt-2 text-3xl font-bold text-foreground">
              Get in touch today
            </h1>
            <p className="mt-2 text-body">We will reach out asap, thank you!</p>

            <ContactForm />
          </div>
        </div>
      </section>

      <section className="bg-navy py-20">
        <div className="mx-auto max-w-6xl px-6">
          <FaqAccordion />
        </div>
      </section>
    </>
  );
}
