"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, MapPin, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BookOnlineButton } from "@/components/shared/BookOnlineButton";
import {
  SERVICES_MENU,
  SERVICE_AREAS_MENU,
  REBATE_PROGRAMS_MENU,
} from "@/components/layout/Header";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [serviceAreasOpen, setServiceAreasOpen] = useState(false);
  const [rebatesOpen, setRebatesOpen] = useState(false);

  const closeMenu = () => {
    setOpen(false);
    setServicesOpen(false);
    setServiceAreasOpen(false);
    setRebatesOpen(false);
  };

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="relative flex size-9 items-center justify-center rounded-md border border-border"
      >
        <span className="relative flex h-4 w-5 flex-col justify-between">
          <span
            className={cn(
              "h-0.5 w-full rounded-full bg-current transition-all duration-300 ease-in-out",
              open && "translate-y-[7px] rotate-45",
            )}
          />
          <span
            className={cn(
              "h-0.5 w-full rounded-full bg-current transition-opacity duration-100 ease-in-out",
              open && "opacity-0",
            )}
          />
          <span
            className={cn(
              "h-0.5 w-full rounded-full bg-current transition-all duration-300 ease-in-out",
              open && "-translate-y-[7px] -rotate-45",
            )}
          />
        </span>
      </button>

      {open && (
        <nav className="absolute inset-x-0 top-full flex max-h-[85dvh] flex-col gap-1 overflow-y-auto overscroll-contain border-b border-border bg-background px-6 py-4 text-sm font-medium text-foreground">
          <Link href="/" className="py-2" onClick={closeMenu}>
            Home
          </Link>

          <button
            type="button"
            className="flex items-center justify-between py-2 text-left"
            aria-expanded={servicesOpen}
            onClick={() => setServicesOpen((v) => !v)}
          >
            Services
            <ChevronDown
              className="size-4 transition-transform duration-200"
              style={{
                transform: servicesOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </button>

          {servicesOpen && (
            <div className="flex flex-col gap-4 py-2 pl-3">
              {SERVICES_MENU.map((column) => (
                <div key={column.title}>
                  <p
                    className="mb-2 text-[13px] font-bold tracking-[0.1em] uppercase"
                    style={{ color: "#0D1B2A" }}
                  >
                    {column.title}
                  </p>
                  <ul className="flex flex-col gap-1">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="block py-1 text-sm text-[#475569]"
                          onClick={closeMenu}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          <button
            type="button"
            className="flex items-center justify-between py-2 text-left"
            aria-expanded={serviceAreasOpen}
            onClick={() => setServiceAreasOpen((v) => !v)}
          >
            Service Areas
            <ChevronDown
              className="size-4 transition-transform duration-200"
              style={{
                transform: serviceAreasOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </button>

          {serviceAreasOpen && (
            <ul className="flex flex-col gap-1 py-2 pl-3">
              {SERVICE_AREAS_MENU.map((area) => (
                <li key={area.slug}>
                  <Link
                    href={`/service-areas/${area.slug}`}
                    className="flex items-center gap-2 py-1 text-sm text-[#475569]"
                    onClick={closeMenu}
                  >
                    <MapPin className="size-4 text-[#2563EB]" />
                    {area.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <button
            type="button"
            className="flex items-center justify-between py-2 text-left"
            aria-expanded={rebatesOpen}
            onClick={() => setRebatesOpen((v) => !v)}
          >
            Rebates
            <ChevronDown
              className="size-4 transition-transform duration-200"
              style={{
                transform: rebatesOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </button>

          {rebatesOpen && (
            <ul className="flex flex-col gap-1 py-2 pl-3">
              {REBATE_PROGRAMS_MENU.map((program) => (
                <li key={program.slug}>
                  <Link
                    href={`/rebate-programs/${program.slug}`}
                    className="flex items-start gap-2 py-1 text-sm text-[#475569]"
                    onClick={closeMenu}
                  >
                    <Tag className="mt-0.5 size-4 shrink-0 text-[#2563EB]" />
                    {program.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <Link href="/about" className="py-2" onClick={closeMenu}>
            About
          </Link>
          <Link href="/blog" className="py-2" onClick={closeMenu}>
            Blog
          </Link>

          <div className="mt-2 flex flex-col gap-2 border-t border-border pt-4">
            <BookOnlineButton
              variant="outline"
              className="btn-text-slide justify-center rounded-[9px]"
              onClick={closeMenu}
            >
              Book Online
              <ArrowRight className="btn-text-slide-arrow size-4" />
            </BookOnlineButton>
            <Button
              render={<Link href="/instant-quote" />}
              nativeButton={false}
              className="justify-center rounded-[9px]"
              onClick={closeMenu}
            >
              Get a Quote
            </Button>
          </div>
        </nav>
      )}
    </div>
  );
}
