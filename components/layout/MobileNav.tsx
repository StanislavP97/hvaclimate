"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { SERVICES_MENU } from "@/components/layout/Header";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "Rebates", href: "/rebate-programs" },
  { label: "All Pages", href: "#" },
  { label: "Instant Quote", href: "/instant-quote" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const closeMenu = () => {
    setOpen(false);
    setServicesOpen(false);
  };

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex size-9 items-center justify-center rounded-md border border-border"
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {open && (
        <nav className="absolute inset-x-0 top-full flex flex-col gap-1 border-b border-border bg-background px-6 py-4 text-sm font-medium text-foreground">
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

          {NAV_LINKS.filter((link) => link.label !== "Home").map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="py-2"
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}
