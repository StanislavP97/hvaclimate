import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
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
      <div className="hidden border-b border-border sm:block">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-8 px-6 py-2.5 text-sm text-foreground">
          <a
            href="mailto:Office@HVAClimate.com"
            className="flex items-center gap-2"
          >
            <span className="flex size-6 items-center justify-center rounded-full bg-accent">
              <Mail className="size-3.5 text-primary-accent" />
            </span>
            Office@HVAClimate.com
          </a>
          <span className="hidden items-center gap-2 md:flex">
            <span className="flex size-6 items-center justify-center rounded-full bg-accent">
              <MapPin className="size-3.5 text-primary-accent" />
            </span>
            Vancouver WA &amp; Portland OR
          </span>
          <a href="tel:3608882217" className="flex items-center gap-2">
            <span className="flex size-6 items-center justify-center rounded-full bg-accent">
              <Phone className="size-3.5 text-primary-accent" />
            </span>
            (360) 888-2217{" "}
            <span className="hidden font-semibold sm:inline">
              Click to call
            </span>
          </a>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-3">
        <Link href="/" className="text-lg font-bold text-foreground">
          Climate Control LLC
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-foreground lg:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.label} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="tel:3608882217"
            className={buttonVariants({
              className: "hidden rounded-full px-6 sm:inline-flex",
            })}
          >
            BOOK ONLINE
          </a>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
