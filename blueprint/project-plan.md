# Project Plan — HVA Climate Control (Webflow → Next.js Migration)

## 1. Problem — What problem are we solving?
Migrating hvaclimate.com from Webflow to Next.js for better performance, developer control, and SEO.
Webflow limits customization and costs scale poorly. Next.js gives full ownership of the stack.

## 2. Users — Who is this for?
Homeowners and businesses in Vancouver WA / Portland OR area looking for HVAC services (repair, installation, maintenance).
Local SEO traffic is the primary acquisition channel — rankings must be fully preserved post-migration.

## 3. Features — What does the MVP need?
- All existing pages with identical URLs (SEO-critical)
- Service pages: Heating, AC, Ventilation, Commercial (with nested sub-pages)
- Service Area pages for 7 cities (local SEO landing pages)
- Rebate Programs pages
- Blog with categories
- Contact form with email delivery
- "Get Instant Quote" CTA (links to external booking tool)
- Google Tag Manager
- Google Reviews section
- Sitemap.xml + robots.txt

## 4. Data — What are we storing?
- **Blog Posts** — title, slug, content (rich text), thumbnail, category, SEO meta, published date
- **Blog Post Categories** — name, slug, description
- **Gas Furnaces** — service name, slug, description, SEO meta, thumbnail (sub-pages under /heating/gas-furnace/)
- **Electric Furnaces** — same structure, under /heating/electric-furnace/
- **Air Conditioner Repairs** — under /air-conditioner/repair/
- **Air Conditioner Installations** — under /air-conditioner/installation/
- **Air Conditioner Tune-ups** — under /air-conditioner/tune-up/
- **Ductworks** — under /ventilation/ductwork/
- **Vent Cleanings** — under /ventilation/vent-cleaning/
- **Commercials** — under /commercial/
- **Rebate Programs** — under /rebate-programs/
- **Service Areas** — 7 cities, under /service-areas/

All CMS data will be stored as JSON files (MDX or static JSON) — no database needed for MVP.

## 5. Tech — What stack are we using?
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS v4 (CSS-first config)
- **UI Components**: shadcn/ui
- **Content**: JSON files exported from Webflow (no CMS for MVP; Sanity optional later)
- **Forms**: Resend (email delivery for contact/quote form)
- **Analytics**: Google Tag Manager (via Next.js Script component)
- **Images**: next/image with Webflow CDN URLs (migration phase), then self-hosted
- **Deployment**: Vercel
- **SEO**: Next.js generateMetadata() per page/route

## 6. Monetize — How will this make money?
Not directly monetized — it's a lead generation site. Revenue comes from booked HVAC service calls.
Goal: maintain/improve Google rankings for local HVAC terms in Vancouver WA / Portland OR.

## 7. UI/UX — How should this look and feel?
Pixel-accurate recreation of the existing hvaclimate.com design.
Color scheme: dark navy/blue + orange/amber accents. Clean, professional, trust-building.
Mobile-first. Phone number and CTA always visible. Fast load times (LCP < 2.5s).
