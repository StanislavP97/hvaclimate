"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Mail,
  MapPin,
  Phone,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import MobileNav from "@/components/layout/MobileNav";
import { BookOnlineButton } from "@/components/shared/BookOnlineButton";

export const SERVICE_AREAS_MENU = [
  { label: "Vancouver WA", slug: "hvac-contractor-vancouver-wa" },
  { label: "Portland OR", slug: "hvac-contractor-portland-or" },
  { label: "Camas", slug: "hvac-camas-wa" },
  { label: "Longview", slug: "hvac-contractor-longview-wa" },
  { label: "Ridgefield", slug: "hvac-contractor-ridgefield-wa" },
  { label: "Battleground", slug: "hvac-contractor-battleground-wa" },
  { label: "Lake Oswego", slug: "lake-oswego-or" },
];

export const REBATE_PROGRAMS_MENU = [
  { label: "Heat Pump Program", slug: "heat-pump-program" },
  { label: "Ductless Heat Pump Program", slug: "ductless-heat-pump-program" },
  { label: "Heat Pump Water Heater Program", slug: "heat-pump-water-heater-program" },
  { label: "Smart Thermostat Program", slug: "smart-thermostat-program" },
];

export const SERVICES_MENU = [
  {
    title: "Heating",
    href: "/heating",
    links: [
      { label: "Gas Furnace", href: "/heating/gas-furnace/installation" },
      { label: "Electric Furnace", href: "/heating/electric-furnace/installation" },
      { label: "Furnace Repair", href: "/heating/gas-furnace/repair" },
      { label: "Installation", href: "/heating/gas-furnace/installation" },
      { label: "Tune-Up", href: "/heating/gas-furnace/tune-up" },
      { label: "Maintenance", href: "/heating/gas-furnace/maintenance" },
    ],
  },
  {
    title: "Cooling",
    href: "/air-conditioning",
    links: [
      { label: "AC Repair", href: "/air-conditioner/repair/residential" },
      { label: "AC Installation", href: "/air-conditioner/installation/residential" },
      { label: "AC Tune-up", href: "/air-conditioner/tune-up/residential" },
      { label: "Minisplit", href: "/air-conditioner/installation/minisplit-installation" },
    ],
  },
  {
    title: "Ventilation",
    href: "/ventilation",
    links: [
      { label: "Ductwork Repair", href: "/ventilation/ductwork/repair" },
      { label: "Ductwork Installation", href: "/ventilation/ductwork/installation" },
      { label: "Dryer Vent Cleaning", href: "/ventilation/vent-cleaning/dryer" },
      { label: "Fresh Air Systems", href: "/ventilation/ductwork/fresh-air-system-installation" },
    ],
  },
  {
    title: "Commercial",
    href: "/commercial",
    links: [
      { label: "HVAC Maintenance", href: "/commercial/hvac-maintenance-services" },
      { label: "Hood & Cooktop", href: "/commercial/hood-repair-and-maintenance-services" },
      { label: "Ovens Repair", href: "/commercial/ovens-repair" },
      { label: "Refrigeration", href: "/commercial/refrigeration-systems-maintenance" },
    ],
  },
];

function useScrollPosition() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrolled;
}

function ServicesMegaMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        className="link-animated flex items-center gap-1"
        aria-expanded={isOpen}
      >
        Services
        <ChevronDown
          className="size-4 transition-transform duration-200"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-1/2 z-50 min-w-[680px] -translate-x-1/2 rounded-2xl border bg-white p-8 shadow-[0_20px_60px_rgba(13,27,42,0.12)]"
            style={{ borderColor: "#eef1f5" }}
          >
            <div className="grid grid-cols-4 gap-8">
              {SERVICES_MENU.map((column) => (
                <div key={column.title}>
                  <Link href={column.href}>
                    <h3
                      className="mb-3 border-b pb-2 text-[13px] font-bold tracking-[0.1em] uppercase transition-colors duration-150 hover:text-[#2563EB]"
                      style={{ color: "#0D1B2A", borderColor: "#eef1f5" }}
                    >
                      {column.title}
                    </h3>
                  </Link>
                  <ul className="flex flex-col">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="group flex items-center gap-1.5 py-1.5 text-sm text-[#475569] transition-all duration-150 hover:translate-x-1 hover:text-[#2563EB]"
                        >
                          <ChevronRight className="size-3.5 text-slate-400 transition-colors duration-150 group-hover:text-[#2563EB]" />
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ServiceAreasDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        className="link-animated flex items-center gap-1"
        aria-expanded={isOpen}
      >
        Service Areas
        <ChevronDown
          className="size-4 transition-transform duration-200"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-1/2 z-50 min-w-[220px] -translate-x-1/2 rounded-xl border bg-white p-2 shadow-[0_20px_60px_rgba(13,27,42,0.12)]"
            style={{ borderColor: "#eef1f5" }}
          >
            <ul className="flex flex-col">
              {SERVICE_AREAS_MENU.map((area) => (
                <li key={area.slug}>
                  <Link
                    href={`/service-areas/${area.slug}`}
                    className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm text-[#475569] transition-colors duration-150 hover:bg-slate-50 hover:text-[#0D1B2A]"
                  >
                    <MapPin className="size-4 text-[#2563EB]" />
                    {area.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function RebatesDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        className="link-animated flex items-center gap-1"
        aria-expanded={isOpen}
      >
        Rebates
        <ChevronDown
          className="size-4 transition-transform duration-200"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-1/2 z-50 min-w-[220px] -translate-x-1/2 rounded-xl border bg-white p-2 shadow-[0_20px_60px_rgba(13,27,42,0.12)]"
            style={{ borderColor: "#eef1f5" }}
          >
            <ul className="flex flex-col">
              {REBATE_PROGRAMS_MENU.map((program) => (
                <li key={program.slug}>
                  <Link
                    href={`/rebate-programs/${program.slug}`}
                    className="flex items-start gap-2 rounded-lg px-4 py-2.5 text-sm text-[#475569] transition-colors duration-150 hover:bg-slate-50 hover:text-[#0D1B2A]"
                  >
                    <Tag className="mt-0.5 size-4 shrink-0 text-[#2563EB]" />
                    {program.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Header() {
  const scrolled = useScrollPosition();

  return (
    <header
      className="sticky top-0 z-40"
      style={{
        background: scrolled ? "rgba(255,255,255,0.92)" : "white",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.06)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,0.06)" : "none",
        transition: "background 0.4s ease, backdrop-filter 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease",
      }}
    >
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
            href="tel:+13608882217"
            className="flex items-center gap-2 font-semibold text-white"
          >
            <Phone className="size-3.5 text-primary-accent" />
            <span className="link-animated">(360) 888-2217</span>
          </a>
        </div>
      </div>

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-6">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Climate Control LLC"
            width={145}
            height={100}
            className="h-[80px] w-auto max-w-none shrink-0"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-7.5 text-[15px] font-medium text-[#0D1B2A] lg:flex">
          <Link href="/" className="link-animated">
            Home
          </Link>
          <ServicesMegaMenu />
          <ServiceAreasDropdown />
          <RebatesDropdown />
          <Link href="/about" className="link-animated">
            About
          </Link>
          <Link href="/blog" className="link-animated">
            Blog
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <BookOnlineButton
            variant="outline"
            className="btn-text-slide hidden rounded-[9px] px-5 lg:inline-flex"
          >
            Book Online
            <ArrowRight className="btn-text-slide-arrow size-4" />
          </BookOnlineButton>
          <Button
            render={<Link href="/instant-quote" />}
            nativeButton={false}
            className="hidden rounded-[9px] px-5 lg:inline-flex"
          >
            Get a Quote
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
