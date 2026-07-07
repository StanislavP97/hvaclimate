# Build Plan — HVA Climate Control (Webflow → Next.js)

## Pre-build (do before /feature)
- [ ] Scaffold: `npx create-next-app@latest hvaclimate --typescript --tailwind --app`
- [ ] Overlay ai-blueprint files on top
- [ ] Run `/onboard` to tune the stack
- [ ] Export all Webflow CMS data to JSON (via Webflow API or manually)
- [ ] Download all images from Webflow CDN

---

## Features

- [x] 1. **Project setup & design tokens** — configure Tailwind v4 with exact colors, fonts, spacing from Webflow design; add global layout (Header + Footer + phone CTA bar)

- [ ] 2. **Static pages** — Home, About, Contact, Privacy Policy, Instant Quote, 404 — pixel-accurate content and layout
  - [x] 2a. About, Contact, Privacy Policy, 404 — fully referenced from Webflow screenshots
  - [ ] 2b. Home (below the hero) + Instant Quote (3-step wizard) — deferred until remaining screenshots (full Home page, Instant Quote steps 2 "Contact" and 3 "Your Price") are provided

- [x] 3. **Service category pages** — Heating (/heating), Air Conditioning (/air-conditioning), Ventilation (/ventilation), Commercial (/commercial) — category landing pages with sub-service links

- [x] 4. **Gas Furnace sub-pages** — dynamic route /heating/gas-furnace/[slug] — repair, maintenance, installation, emergency pages from CMS JSON

- [ ] 5. **Electric Furnace sub-pages** — dynamic route /heating/electric-furnace/[slug]

- [ ] 6. **AC Repair sub-pages** — dynamic route /air-conditioner/repair/[slug]

- [ ] 7. **AC Installation sub-pages** — dynamic route /air-conditioner/installation/[slug]

- [ ] 8. **AC Tune-up sub-pages** — dynamic route /air-conditioner/tune-up/[slug]

- [ ] 9. **Ventilation sub-pages** — /ventilation/ductwork/[slug] + /ventilation/vent-cleaning/[slug]

- [ ] 10. **Commercial sub-pages** — dynamic route /commercial/[slug]

- [ ] 11. **Service Areas** — 7 city pages at /service-areas/[city] — Vancouver WA, Portland, Camas, Longview, Ridgefield, Battleground, Lake Oswego

- [ ] 12. **Rebate Programs** — /rebate-programs/[slug] — 3 program pages

- [ ] 13. **Blog** — /blog listing page + /blog/[slug] individual posts + /blog-post-categories/[slug]

- [ ] 14. **Contact form** — form at /contact with Resend email delivery; "Get Instant Quote" CTA linking to external booking tool

- [ ] 15. **SEO layer** — generateMetadata() for every page/route pulling from CMS JSON; sitemap.xml; robots.txt; JSON-LD schema (LocalBusiness, Service)

- [ ] 16. **Google Tag Manager + Reviews** — GTM Script component; Google Reviews widget or static testimonials section

- [ ] 17. **Performance & QA** — next/image optimization; LCP < 2.5s; all URLs verified 1:1 with Webflow; 301 redirects for any changed slugs

---

## URL map (Webflow → Next.js, must be identical)

| Webflow published path | Next.js route |
|---|---|
| / | app/page.tsx |
| /about | app/about/page.tsx |
| /contact | app/contact/page.tsx |
| /blog | app/blog/page.tsx |
| /blog/[slug] | app/blog/[slug]/page.tsx |
| /blog-post-categories/[slug] | app/blog-post-categories/[slug]/page.tsx |
| /heating | app/heating/page.tsx |
| /heating/gas-furnace/[slug] | app/heating/gas-furnace/[slug]/page.tsx |
| /heating/electric-furnace/[slug] | app/heating/electric-furnace/[slug]/page.tsx |
| /air-conditioning | app/air-conditioning/page.tsx |
| /air-conditioner/repair/[slug] | app/air-conditioner/repair/[slug]/page.tsx |
| /air-conditioner/installation/[slug] | app/air-conditioner/installation/[slug]/page.tsx |
| /air-conditioner/tune-up/[slug] | app/air-conditioner/tune-up/[slug]/page.tsx |
| /ventilation | app/ventilation/page.tsx |
| /ventilation/ductwork/[slug] | app/ventilation/ductwork/[slug]/page.tsx |
| /ventilation/vent-cleaning/[slug] | app/ventilation/vent-cleaning/[slug]/page.tsx |
| /commercial | app/commercial/page.tsx |
| /commercial/[slug] | app/commercial/[slug]/page.tsx |
| /service-areas/[slug] | app/service-areas/[slug]/page.tsx |
| /rebate-programs/[slug] | app/rebate-programs/[slug]/page.tsx |
| /instant-quote | app/instant-quote/page.tsx |
| /privacy-policy | app/privacy-policy/page.tsx |

## CMS Collections → JSON files map

| Webflow Collection | JSON file |
|---|---|
| Blog Posts | data/hvaclimate-cms-data/blog-posts.json |
| Blog Post Categories | data/hvaclimate-cms-data/blog-categories.json |
| Gas Furnaces | data/hvaclimate-cms-data/gas-furnaces.json |
| Electric Furnaces | data/hvaclimate-cms-data/electric-furnaces.json |
| Air Conditioner Repairs | data/hvaclimate-cms-data/ac-repairs.json |
| Air Conditioner Installations | data/hvaclimate-cms-data/ac-installations.json |
| Air Conditioner Tune-ups | data/hvaclimate-cms-data/ac-tuneups.json |
| Ductworks | data/hvaclimate-cms-data/ductworks.json |
| Vent Cleanings | data/hvaclimate-cms-data/vent-cleanings.json |
| Commercials | data/hvaclimate-cms-data/commercials.json |
| Rebate Programs | data/hvaclimate-cms-data/rebate-programs.json |
| Service Areas | data/hvaclimate-cms-data/service-areas.json |
