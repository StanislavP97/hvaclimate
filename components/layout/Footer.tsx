import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Music2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M13.5 21v-7.5h2.5l.5-3h-3V8.5c0-.9.25-1.5 1.5-1.5H16.5V4.35C16.13 4.3 15.05 4.2 13.8 4.2c-2.6 0-4.3 1.6-4.3 4.5V10.5H7v3h2.5V21h4Z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="17" cy="7" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { label: "Facebook", href: "#", Icon: FacebookIcon, background: "#3B5998" },
  {
    label: "Instagram",
    href: "#",
    Icon: InstagramIcon,
    background:
      "linear-gradient(45deg, #F5CB57 0%, #E1306C 45%, #833AB4 100%)",
  },
  { label: "TikTok", href: "#", Icon: Music2, background: "#000000" },
] as const;

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
  { label: "Heat Pump", href: "/rebate-programs/heat-pump-program" },
  {
    label: "Smart Thermostat",
    href: "/rebate-programs/smart-thermostat-program",
  },
  {
    label: "Ductless Heat Pump",
    href: "/rebate-programs/ductless-heat-pump-program",
  },
  {
    label: "Water Heater",
    href: "/rebate-programs/heat-pump-water-heater-program",
  },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-footer-foreground">
      <div className="mx-auto max-w-7xl px-6 pt-15 pb-11">
        <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-11 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="text-lg font-bold text-footer-heading">
              Climate Control LLC
            </Link>
            <p className="mt-3.5 text-sm">
              Vancouver&rsquo;s Go-To HVAC Company for Comfort &amp; Care
            </p>

            <div className="mt-3.5 flex flex-wrap gap-2">
              {BADGES.map((badge) => (
                <span
                  key={badge}
                  className="rounded-md border border-white/10 bg-white/5 px-3 py-1 text-xs text-footer-heading"
                >
                  {badge}
                </span>
              ))}
            </div>

            <div className="mt-5 space-y-2.5 text-sm">
              <a href="tel:3608882217" className="flex items-center gap-3">
                <Phone className="size-4" />
                <span className="link-animated">(360) 888-2217</span>
              </a>
              <a
                href="mailto:Office@HVAClimate.com"
                className="flex items-center gap-3"
              >
                <Mail className="size-4" />
                <span className="link-animated">Office@HVAClimate.com</span>
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

            <div className="mt-5 flex items-center gap-2.5">
              {SOCIAL_LINKS.map(({ label, href, Icon, background }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="social-btn group relative flex size-9 items-center justify-center bg-white text-navy"
                  style={{
                    "--social-bg": background,
                    clipPath: "inset(0 round 28%)",
                  } as React.CSSProperties}
                >
                  <Icon className="social-btn-icon size-4" />
                </a>
              ))}
            </div>

            <a
              href="tel:3608882217"
              className={buttonVariants({
                className: "mt-5 w-full",
              })}
            >
              Book online
            </a>
          </div>

          {FOOTER_COLUMNS.map((group, i) => (
            <div key={i} className="space-y-7">
              {group.map((column) => (
                <div key={column.heading}>
                  <h3 className="text-[15px] font-bold text-footer-heading">
                    {column.heading}
                  </h3>
                  <ul className="mt-3.5 space-y-2.5 text-sm">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <Link href={link.href} className="link-animated">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}

          <div className="space-y-7">
            <div>
              <h3 className="text-[15px] font-bold text-footer-heading">
                Company
              </h3>
              <ul className="mt-3.5 space-y-2.5 text-sm">
                {COMPANY_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="link-animated">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[15px] font-bold text-footer-heading">
                Rebate Programs
              </h3>
              <ul className="mt-3.5 space-y-2.5 text-sm">
                {REBATE_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="link-animated">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 pt-6 text-[13px] sm:flex-row">
          <p>Copyright &copy; HVA Climate Control LLC</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="link-animated">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
