import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

const BADGES = ["Licensed", "Bonded", "Insured · WA & OR"];

const FOOTER_COLUMNS = [
  [
    {
      heading: "Heating",
      links: [
        { label: "Gas Furnace", href: "/heating" },
        { label: "Electric Furnace", href: "/heating" },
        { label: "Repair", href: "/heating" },
        { label: "Installation", href: "/heating" },
        { label: "Tune-up", href: "/heating" },
        { label: "Maintenance", href: "/heating" },
      ],
    },
    {
      heading: "Cooling",
      links: [
        { label: "AC Repair", href: "/air-conditioning" },
        { label: "AC Installation", href: "/air-conditioning" },
        { label: "Minisplit", href: "/air-conditioning" },
        { label: "AC Tune-up", href: "/air-conditioning" },
      ],
    },
  ],
  [
    {
      heading: "Ventilation",
      links: [
        { label: "Ductwork Repair", href: "/ventilation" },
        { label: "Ductwork Installation", href: "/ventilation" },
        { label: "Dryer Vent Cleaning", href: "/ventilation" },
        { label: "Fresh Air Systems", href: "/ventilation" },
      ],
    },
    {
      heading: "Commercial",
      links: [
        { label: "HVAC Maintenance", href: "/commercial" },
        { label: "Hood & Cooktop", href: "/commercial" },
        { label: "Ovens Repair", href: "/commercial" },
        { label: "Refrigeration", href: "/commercial" },
      ],
    },
  ],
] as const;

const COMPANY_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

const REBATE_LINKS = [
  { label: "Heat Pump", href: "/rebate-programs" },
  { label: "Smart Thermostat", href: "/rebate-programs" },
  { label: "Ductless Heat Pump", href: "/rebate-programs" },
  { label: "Water Heater", href: "/rebate-programs" },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-footer-foreground">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="text-lg font-bold text-footer-heading">
              Climate Control LLC
            </Link>
            <p className="mt-4 text-sm">
              Vancouver&rsquo;s Go-To HVAC Company for Comfort &amp; Care
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {BADGES.map((badge) => (
                <span
                  key={badge}
                  className="rounded-md border border-white/10 bg-white/5 px-3 py-1 text-xs text-footer-heading"
                >
                  {badge}
                </span>
              ))}
            </div>

            <div className="mt-6 space-y-3 text-sm">
              <a href="tel:3608882217" className="flex items-center gap-3">
                <Phone className="size-4" />
                (360) 888-2217
              </a>
              <a
                href="mailto:Office@HVAClimate.com"
                className="flex items-center gap-3"
              >
                <Mail className="size-4" />
                Office@HVAClimate.com
              </a>
              <span className="flex items-center gap-3">
                <MapPin className="size-4" />
                7933 NE St Johns Rd, Vancouver, WA
              </span>
              <span className="flex items-center gap-3">
                <Clock className="size-4" />
                Mon&ndash;Sun &middot; 8:00 AM &ndash; 9:00 PM
              </span>
            </div>

            <div className="mt-6 flex items-center gap-4 text-sm font-medium">
              <a href="#" aria-label="Facebook">
                Facebook
              </a>
              <a href="#" aria-label="Instagram">
                Instagram
              </a>
              <a href="#" aria-label="TikTok">
                TikTok
              </a>
            </div>

            <a
              href="tel:3608882217"
              className={buttonVariants({
                className: "mt-6 w-full",
              })}
            >
              Book online
            </a>
          </div>

          {FOOTER_COLUMNS.map((group, i) => (
            <div key={i} className="space-y-8">
              {group.map((column) => (
                <div key={column.heading}>
                  <h3 className="border-b border-white/10 pb-2 text-sm font-bold tracking-wide text-footer-heading uppercase">
                    {column.heading}
                  </h3>
                  <ul className="mt-4 space-y-3 text-sm">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <Link href={link.href}>{link.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}

          <div className="space-y-8">
            <div>
              <h3 className="border-b border-white/10 pb-2 text-sm font-bold tracking-wide text-footer-heading uppercase">
                Company
              </h3>
              <ul className="mt-4 space-y-3 text-sm">
                {COMPANY_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="border-b border-white/10 pb-2 text-sm font-bold tracking-wide text-footer-heading uppercase">
                Rebate Programs
              </h3>
              <ul className="mt-4 space-y-3 text-sm">
                {REBATE_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-sm">
        Copyright &copy; HVA Climate Control LLC
      </div>
    </footer>
  );
}
