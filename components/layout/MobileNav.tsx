"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "#" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "Rebates", href: "/rebate-programs" },
  { label: "All Pages", href: "#" },
  { label: "Instant Quote", href: "/instant-quote" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

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
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="py-2"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}
