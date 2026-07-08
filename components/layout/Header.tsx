import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import MobileNav from "@/components/layout/MobileNav";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "#" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "Rebates", href: "/rebate-programs" },
  { label: "All Pages", href: "#" },
  { label: "Instant Quote", href: "/instant-quote" },
];

export default function Header() {
  return (
    <header className="relative border-b border-border">
      <div className="hidden border-b border-border bg-navy sm:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-6 py-2 text-[13px] text-footer-foreground">
          <a
            href="mailto:Office@HVAClimate.com"
            className="flex items-center gap-2"
          >
            <Mail className="size-3.5 text-primary-accent" />
            <span className="link-animated">Office@HVAClimate.com</span>
          </a>
          <span className="hidden items-center gap-2 md:flex">
            <MapPin className="size-3.5 text-primary-accent" />
            Vancouver WA &amp; Portland OR
          </span>
          <a
            href="tel:3608882217"
            className="flex items-center gap-2 font-semibold text-white"
          >
            <Phone className="size-3.5 text-primary-accent" />
            <span className="link-animated">(360) 888-2217</span>
          </a>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-3.5">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-[9px] bg-gradient-to-br from-primary-accent to-navy text-base font-extrabold text-white">
            H
          </span>
          <span className="text-lg font-extrabold tracking-tight text-foreground">
            HVA<span className="text-primary-accent">Climate</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7.5 text-sm font-medium text-foreground lg:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.label} href={link.href} className="link-animated">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="tel:3608882217"
            className={buttonVariants({
              variant: "outline",
              className:
                "btn-text-slide hidden rounded-[9px] px-5 sm:inline-flex",
            })}
          >
            Book Online
            <ArrowRight className="btn-text-slide-arrow size-4" />
          </a>
          <Link
            href="/instant-quote"
            className={buttonVariants({
              className: "hidden rounded-[9px] px-5 sm:inline-flex",
            })}
          >
            Get a Quote
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
