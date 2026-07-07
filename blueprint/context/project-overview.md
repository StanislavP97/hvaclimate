# HVA Climate Control - Project Overview

> Webflow → Next.js migration of hvaclimate.com, an HVAC contractor site serving Vancouver WA / Portland OR. SEO preservation is the top priority.

## Problem

hvaclimate.com is built on Webflow, which limits customization and gets expensive as it scales. Migrating to Next.js gives full ownership of the stack while preserving the local SEO rankings the business depends on for lead generation.

## Users

- **Homeowners and businesses** in Vancouver WA / Portland OR searching for HVAC repair, installation, or maintenance. Arrive mostly via local SEO search traffic, so page-for-page URL parity with the old Webflow site is non-negotiable.

There are no access tiers - the entire site is public/anonymous.

## Features

1. **Project setup & design tokens** - Tailwind v4 theme matching Webflow's colors/fonts/spacing; global layout with Header, Footer, and phone CTA bar.
2. **Static pages** - Home, About, Contact, Privacy Policy, Instant Quote, 404, pixel-accurate to the Webflow design.
3. **Service category pages** - Heating, Air Conditioning, Ventilation, Commercial landing pages linking to their sub-service pages.
4. **Gas Furnace sub-pages** - `/heating/gas-furnace/[slug]` (repair, maintenance, installation, emergency) from CMS JSON.
5. **Electric Furnace sub-pages** - `/heating/electric-furnace/[slug]`.
6. **AC Repair sub-pages** - `/air-conditioner/repair/[slug]`.
7. **AC Installation sub-pages** - `/air-conditioner/installation/[slug]`.
8. **AC Tune-up sub-pages** - `/air-conditioner/tune-up/[slug]`.
9. **Ventilation sub-pages** - `/ventilation/ductwork/[slug]` and `/ventilation/vent-cleaning/[slug]`.
10. **Commercial sub-pages** - `/commercial/[slug]`.
11. **Service Areas** - 7 city landing pages at `/service-areas/[slug]` for local SEO.
12. **Rebate Programs** - 3 program pages at `/rebate-programs/[slug]`.
13. **Blog** - `/blog` listing, `/blog/[slug]` posts, `/blog-post-categories/[slug]` category pages.
14. **Contact form** (headline feature - only lead-gen mechanism besides the external quote tool) - `/contact` form with Resend email delivery; "Get Instant Quote" CTA links to an external booking tool.
15. **SEO layer** - `generateMetadata()` on every route from CMS JSON; sitemap.xml; robots.txt; JSON-LD (LocalBusiness, Service) schema.
16. **Google Tag Manager + Reviews** - GTM via Next.js `Script`; Google Reviews widget or static testimonials.
17. **Performance & QA** - `next/image` optimization, LCP < 2.5s, 1:1 URL verification against Webflow, 301 redirects for any slug that changes.

## Data model

All content is static JSON under `data/`, no database. Fields below are derived from project-plan.md section 4; exact field names/types are still to be finalized against the real Webflow export.

### BlogPost (`data/blog-posts.json`)
- `title` (string)
- `slug` (string) - drives `/blog/[slug]`
- `content` (rich text)
- `thumbnail` (image ref)
- `category` (relation to BlogCategory)
- `seoMeta` (object: title, description)
- `publishedDate` (date)

### BlogCategory (`data/blog-categories.json`)
- `name` (string)
- `slug` (string) - drives `/blog-post-categories/[slug]`
- `description` (string)

### Service sub-page models (shared shape)
Applies to GasFurnace, ElectricFurnace, ACRepair, ACInstallation, ACTuneUp, Ductwork, VentCleaning, Commercial - each its own JSON file, same fields:
- `serviceName` (string)
- `slug` (string) - drives the collection's `[slug]` route (see URL map in build-plan.md)
- `description` (string)
- `seoMeta` (object: title, description)
- `thumbnail` (image ref)

| Model | File |
|---|---|
| GasFurnace | `data/gas-furnaces.json` |
| ElectricFurnace | `data/electric-furnaces.json` |
| ACRepair | `data/ac-repairs.json` |
| ACInstallation | `data/ac-installations.json` |
| ACTuneUp | `data/ac-tuneups.json` |
| Ductwork | `data/ductworks.json` |
| VentCleaning | `data/vent-cleanings.json` |
| Commercial | `data/commercials.json` |

### RebateProgram (`data/rebate-programs.json`)
- same shared shape as above - drives `/rebate-programs/[slug]` (3 entries)

### ServiceArea (`data/service-areas.json`)
- same shared shape as above - drives `/service-areas/[slug]` (7 city entries: Vancouver WA, Portland, Camas, Longview, Ridgefield, Battleground, Lake Oswego)

> Lock the shared service sub-page shape (`serviceName`, `slug`, `description`, `seoMeta`, `thumbnail`) before building feature 4 (Gas Furnace sub-pages) - features 5-12 all depend on it matching.

## Tech stack

- **Next.js** (App Router) - framework and routing. Plan specifies 15; the scaffolded project has 16.2.10 installed (see Open questions).
- **TypeScript** (strict) - language.
- **Tailwind CSS v4** (CSS-first config) - styling.
- **shadcn/ui** - UI components (initialized in feature 1; `components.json` uses the `base-nova` style on `@base-ui/react`).
- **Static JSON** (exported from Webflow) - content source, no CMS/database for MVP.
- **Resend** - email delivery for the contact/quote form.
- **Google Tag Manager** - analytics, via Next.js `Script`.
- **next/image** - image optimization; Webflow CDN URLs during migration, self-hosted later.
- **Vercel** - deployment.
- **`generateMetadata()`** - per-route SEO.

## Monetization

Not directly monetized - a lead generation site. Revenue comes from booked HVAC service calls. Success is measured by maintaining/improving Google rankings for local HVAC search terms in Vancouver WA / Portland OR.

## UI/UX

Pixel-accurate recreation of the existing hvaclimate.com design: **light mode primary** (white/light backgrounds, blue accent) with a dark navy footer, clean and professional. Confirmed against reference screenshots in `blueprint/reference/` during feature 1 - corrects the earlier "dark navy/blue" assumption below, which only holds true for the footer. Mobile-first, with phone number and CTA always visible. Performance target: LCP < 2.5s.

Design tokens (colors, font) are locked in `app/globals.css`, sampled directly from the reference screenshots: primary blue `#0061CF`, accent blue `#3D58FF`, navy footer `#0E1122`, Poppins font family.

Full route list (must match Webflow `publishedPath` exactly) is tracked in the URL map in `blueprint/build-plan.md` - 22 routes spanning static pages, service category/sub-service pages, service areas, rebate programs, and blog.

## Open questions

> TODOs and contradictions found between the two plans. Resolve in the plans, then re-run /overview.

- project-plan.md specifies Next.js 15; the scaffolded app actually has 16.2.10 installed. Confirm whether to pin down to 15 or proceed on 16.
- Service sub-page data fields (GasFurnace, ACRepair, etc.) are inferred from the plan's shared description, not an actual Webflow export yet. Confirm field names once the CMS JSON is exported (pre-build step in build-plan.md).
- The real logo asset (yellow gear, blue wrench, red "Climate Control LLC" text) hasn't been exported from Webflow yet. Header/Footer currently use a text placeholder. Swap in the real logo file once available.
- Header nav has "Services" and "All Pages" links with no matching route in the URL map (only category pages like /heating exist). Currently stubbed to "#" - resolve when those pages/routes are defined.
