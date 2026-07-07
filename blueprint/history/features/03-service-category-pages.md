# Feature: Service category pages

**From build-plan:** feature 3
**Status:** not started

## Goal

Build the four service category landing pages — `/heating`, `/air-conditioning`,
`/ventilation`, `/commercial` — pixel-accurate to the live hvaclimate.com design,
each linking out to its sub-service pages (which are built in later features).
These are the pages the header/footer nav and homepage CTAs point to, and they
carry a lot of on-page SEO copy for local search terms.

## Design reference

All four pages share one structural pattern, confirmed across:

- `blueprint/reference/www.hvaclimate.com_heating.png`
- `blueprint/reference/www.hvaclimate.com_air-conditioning.png`
- `blueprint/reference/www.hvaclimate.com_ventilation.png`
- `blueprint/reference/www.hvaclimate.com_commercial.png`

Shared layout (top to bottom):

1. **Hero** — eyebrow ("LICENSED, BONDED, & INSURED IN WASHINGTON & OREGON"), H1
   (e.g. "Heating Services For Your Home"), short description paragraph, two
   pill CTAs ("Learn More" outline + "Get a _ Quote Today" filled), photo on the
   right (`ImagePlaceholder` for now).
2. **Trust bar** — full-width primary-blue band: "Our company is a top-rated
   service provider" + Facebook/Google/Thumbtack rating badges.
3. **Sub-service cards** — navy background band containing a 3-column grid
   (2 rows for Heating/Ventilation with 6 cards, 1 row for AC/Commercial with
   3 cards) of white cards: photo, title, one-line description, "View
   services" link/button. Card counts and labels vary per page (see Data
   section).
4. **Long-form content** — two-column: left column is repeating
   `<h2>` + paragraph + bullet list subsections (one per sub-service, e.g. "Gas
   Furnace Services", "Electric Furnace Services" for Heating), plus a closing
   "Why Choose HVA Climate Control?" and "Schedule Your Service Today" block;
   right column is a sticky contact card with icon header + the existing
   `QuoteMiniForm`.
5. **Reviews CTA band** — "REVIEWS" eyebrow, "What our clients say" heading,
   one-line blurb, "Get Your Home Serviced" pill button. (No testimonial cards
   yet — that's feature 16.)
6. Shared `Footer` (already built).

Match `blueprint/reference/` colors/spacing already locked in `app/globals.css`
(primary blue `#0061CF`, accent blue `#3D58FF`, navy `#0E1122`). Do not
reinvent tokens.

## In scope

- Four pages: `app/heating/page.tsx`, `app/air-conditioning/page.tsx`,
  `app/ventilation/page.tsx`, `app/commercial/page.tsx`.
- A shared, reusable layout for the common structure (hero, trust bar, card
  grid, content + sidebar, reviews band), parameterized per page with each
  page's own content data.
- Static content only, hardcoded per page (see Data section) — no CMS JSON
  read, since `data/` doesn't exist yet and the sub-service detail model is
  still being finalized in feature 4.
- `generateMetadata()` per page (title + description).
- Sub-service card links point to their future detail routes per the URL map
  in `build-plan.md` (e.g. `/heating/gas-furnace/repair`), even though those
  routes don't exist until features 4-10. Linking to the correct future path
  now avoids a rework pass later.
- Reuse existing `ImagePlaceholder`, `Button`/`buttonVariants`, and
  `QuoteMiniForm` components; don't fork new versions of them.

## Out of scope

- Sub-service detail pages themselves (`/heating/gas-furnace/[slug]`, etc.) —
  features 4-10.
- Real photos (Webflow CDN image export hasn't happened yet) — keep
  `ImagePlaceholder`.
- Real testimonial/review cards — feature 16.
- Wiring the "Learn More" / "Get a Quote" CTAs to a working quote flow beyond
  linking to `/instant-quote` — that page's full build is feature 2b (deferred).
- Making `QuoteMiniForm` actually submit — feature 14 (contact form + Resend).
- Updating Header's "Services" nav link (currently `href="#"`) to point
  somewhere — out of scope here since there's no single "all services" page
  yet; leave as-is.

## Build loop

Build one step at a time, never the whole feature at once.

1. Plan mode lays out the step before any code.
2. The AI implements just that step.
3. It shows the diff (not full files); you read it and understand it.
4. You approve, then choose whether to commit a checkpoint or roll straight on.

Never accept a step you haven't read. If a diff is too big to review, the step was too big, so split it.

## Build steps

- [x] **Step 1 - shared category-page components** - build
  `components/services/ServiceHero.tsx`, `ServiceTrustBar.tsx`,
  `ServiceCardGrid.tsx` (+ `ServiceCard`), and `ServiceContentSidebar.tsx`
  (wraps `QuoteMiniForm`), all server components taking typed props (no data
  fetching inside them). *Done when:* components compile, accept props, and
  render with placeholder sample data on a scratch page without errors.
- [x] **Step 2 - Heating page** - create `app/heating/page.tsx` using the
  shared components, with real Heating copy and its 6 sub-service cards (Gas
  Furnace, Electric Furnace, Repair, Installation, Upgrade and Tune-up,
  Maintenance & Replacement of Parts) and long-form sections (Gas Furnace
  Services, Electric Furnace Services, Why Choose, Schedule) per the
  screenshot. Add `generateMetadata()`. *Done when:* `/heating` renders in the
  browser matching the screenshot's structure and content, `npm run build`
  passes.
- [x] **Step 3 - Air Conditioning page** - create
  `app/air-conditioning/page.tsx` with real AC copy, 3 sub-service cards (AC
  Repair, AC Installation, AC Tune-up), and long-form sections (AC
  Maintenance, AC Repairs, AC Installation & Replacement, Ductless Mini-Split
  Systems, Why Air Conditioner Maintenance Matters, Your Local AC Experts).
  *Done when:* `/air-conditioning` renders matching the screenshot, build
  passes.
- [x] **Step 4 - Ventilation page** - create `app/ventilation/page.tsx` with
  real Ventilation copy, 3 sub-service cards (Ductwork, Vent Cleaning, Fresh
  Air System Installation), and long-form sections (Ductwork Services, Vent
  Cleaning Services, Fresh Air System Installation, Why Choose, Schedule).
  *Done when:* `/ventilation` renders matching the screenshot, build passes.
- [x] **Step 5 - Commercial page** - create `app/commercial/page.tsx` with
  real Commercial copy, 6 sub-service cards (Commercial HVAC Maintenance, Hood
  & Cooktop, Cooktop Repair and Maintenance, Commercial Ovens Repair, Pizza
  Oven Service, Refrigeration Systems Maintenance), and long-form sections
  (Commercial Refrigeration Maintenance, Pizza Oven Services, Commercial Oven
  Repair, Cooktop Repair and Maintenance, Hood Repair and Maintenance,
  Commercial HVAC Maintenance, Why Choose). *Done when:* `/commercial` renders
  matching the screenshot, build passes.
- [x] **Step 6 - nav wiring check** - confirm `Header`'s existing links to
  `/heating` etc. (from footer's HEATING/COOLING/VENTILATION/COMMERCIAL
  columns) point at these new pages' category root where a footer link is a
  category itself, and confirm all 4 new pages appear reachable from the
  footer. No footer/header code changes expected unless a link is actually
  broken. *Done when:* clicking through footer links from any existing page
  reaches all 4 new category pages with no 404s.

## Files / areas

- `app/heating/page.tsx`, `app/air-conditioning/page.tsx`,
  `app/ventilation/page.tsx`, `app/commercial/page.tsx` (new)
- `components/services/ServiceHero.tsx`, `ServiceTrustBar.tsx`,
  `ServiceCardGrid.tsx`, `ServiceContentSidebar.tsx` (new)
- No changes expected to `components/layout/Header.tsx` or `Footer.tsx` (verify
  only, in Step 6)

## Data / contracts

- No CMS JSON yet — all copy is hardcoded per page in this feature, as plain
  TS objects/arrays local to each page file (not shared data files), since the
  shared sub-service data shape is locked in feature 4, not here.
- Sub-service card `href`s use the final URL map paths from `build-plan.md`
  (e.g. `/heating/gas-furnace/repair`) even though those routes 404 until
  features 4-10 ship. This is a known, temporary dead link during the build —
  acceptable since it avoids relinking every card later. Flag this in the PR
  notes so it's not mistaken for a bug before feature 10 completes.

## Testing

- No test runner is configured in this project (no `test` command in
  `AGENTS.md`), and this feature is entirely UI/integration surface (page
  layout, static content, links) — no pure logic (parsers, validators,
  formatters) is introduced. Per the Testing gate in `coding-standards.md`,
  this rides entirely on browser/screenshot evidence and `npm run build`,
  no unit tests to write.
- Per step: load the page in the browser, visually compare against its
  screenshot in `blueprint/reference/`, click every sub-service card link and
  both hero CTAs to confirm they point where expected (even if some 404 for
  now per Data/contracts above), and run `npm run build`.

## Notes for the AI

- Server components throughout — no `'use client'` needed (no interactivity
  beyond links/anchors and the existing client-marked `QuoteMiniForm`).
- Reuse `buttonVariants` for all pill buttons/links, `ImagePlaceholder` for all
  photos, `QuoteMiniForm` for the sidebar form — don't fork copies.
- Match the About page's existing conventions (`app/about/page.tsx`) for
  section spacing/typography classes rather than inventing new ones.
- Each page's `generateMetadata()` needs a distinct title/description — pull
  the SEO angle from the page's own hero copy, don't reuse one across pages.
- Keep hardcoded content arrays at the top of each page file (mirrors the
  `VALUES`/`MISSION_POINTS` pattern already used in `app/about/page.tsx`).
