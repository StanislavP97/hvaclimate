# Feature: Home (below the hero) + Instant Quote wizard

**From build-plan:** feature 2b
**Status:** complete

## Goal

Finish the Static Pages feature by building out the Home page body (everything
below the hero, which feature 1 already handles via the global layout) and the
`/instant-quote` 3-step wizard, so both routes are pixel-accurate and no longer
stub/missing.

## Design reference

- `blueprint/reference/www.hvaclimate.com_ (1).png` - full home page, hero
  through footer. Hero itself is out of scope (already built); everything from
  the Reviews band down is the target: Reviews section, "Our experience" dark
  stats banner, "We offer a wide range of HVAC services" category filter row,
  Heating/Cooling/Ventilation/Commercial service card grids (3-up), blog teaser
  ("Check our lastest articles"), footer (already built).
- `blueprint/reference/hvaclimate.webflow.io_instant-quote.png` - wizard step 1,
  "Address" - headline, description, address input, "Continue" button, "Skip -
  I'll enter details myself" link. Step indicator: 1 active (blue), 2 and 3
  inactive.
- `blueprint/reference/www.hvaclimate.com_instant-quote (2).png` - step 1
  expanded/manual-entry state (after "Skip"): "Your home" section (conditioned
  square footage, ceiling height, people in the home, insulation & windows, sun
  exposure, open-concept checkbox) and the start of "Your system" section (cut
  off - build only the fields visible in the screenshot), plus the right-column
  "Estimated capacity" placeholder card (cooling tons / heating BTU/h, both
  showing "-" until filled).
- `blueprint/reference/www.hvaclimate.com_instant-quote.png` - wizard step 2,
  "Contact" - "Where would you like to receive your quote?" full name + phone
  number inputs, "Send my quote" button.
- `blueprint/reference/www.hvaclimate.com_instant-quote (1).png` - step 2
  verification sub-state - "Did you receive your code?" confirmation with "Yes,
  I got it" and "No - let's try a different way".
- **No screenshot exists for step 3 "Your Price."** Per user decision, design
  this screen from scratch, matching the established card/step-indicator visual
  language: step indicator with 3 active, a headline, an estimated price range
  in a highlighted card, and a primary CTA to book online. Do not treat this as
  a faithful recreation - it's a reasonable placeholder pending a real design.

## In scope

- Home page sections below the hero, matching the reference screenshot.
- `/instant-quote` wizard: step 1 (address entry + skip-to-manual-entry
  expanded form), step 2 (contact form + code verification sub-state), step 3
  (designed price/results screen + CTA to book online).
- Client-side step state (wizard is inherently interactive - `'use client'`
  applies here per coding-standards.md).
- `generateMetadata()` for `/instant-quote` (Home's metadata already exists).

## Out of scope

- Real address lookup / public records integration for step 1 (visual only -
  "Continue" advances the step; no backend lookup).
- Real SMS code sending/verification (visual only - "Send my quote" advances to
  the code-confirmation sub-state; "Yes, I got it" advances to step 3).
- Real price calculation logic (step 3 shows a representative static estimate,
  not a computed one).
- Wiring the wizard to Resend or any backend - that's feature 14 (Contact
  form), which is a separate lead-gen mechanism per the project overview.
- "Get a Quote" hero CTAs elsewhere in the site pointing here - already wired if
  present, not part of this feature.

## Build loop

Build one step at a time, never the whole feature at once.

1. Plan mode lays out the step before any code.
2. The AI implements just that step.
3. It shows the diff (not full files); you read it and understand it.
4. You approve, then choose whether to commit a checkpoint or roll straight on.
   Checkpoints are optional; `/complete` makes the real feature-level commit at the end.

Never accept a step you haven't read. If a diff is too big to review, the step was too big, so split it.

## Build steps

- [x] **Step 1 - Home: Hero + Reviews + Experience stats sections** - `app/page.tsx`
  was found to be a bare stub (`return null`) with no hero built yet, despite
  the spec originally assuming feature 1 covered it (it only covered the global
  layout - Header/Footer/CTA bar). Build the hero (headline "Your HVAC
  Contractor in Vancouver, WA", feature bullets, phone/CTA, van photo) plus the
  "Reviews" band (headline, subcopy, "Get Your Home Serviced" CTA) and the dark
  navy "Our experience" stats banner (image, 3 stat callouts: years, happy
  clients, qualified experts, "Get a quote" CTA) in `app/page.tsx`, as new
  components under `components/home/`, plus `generateMetadata()` for `/`.
  *Done when:* hero, Reviews, and Experience sections all render on `/` matching
  the reference screenshot, and `npm run build` passes.
- [x] **Step 2 - Home: service category grids** - build the "We offer a wide
  range of HVAC services" filter row and the 4 service card grids (Heating,
  Cooling, Ventilation, Commercial), reusing `ServiceCardGrid`/`ServiceCardData`
  where the shape fits, with cards linking to the matching existing sub-service
  routes. *Done when:* all 4 grids render with correct hrefs to existing routes
  (e.g. Heating card grid links into `/heating/gas-furnace/[slug]` etc. or the
  category page, matching the reference), `npm run build` passes.
- [x] **Step 3 - Home: blog teaser section** - build "Check our lastest
  articles" section showing latest blog posts (reuse blog data via
  `lib/blog-posts.ts`) with a "Browse all articles" link to `/blog`. *Done
  when:* section renders with real post data/thumbnails/dates, matches
  reference layout, `npm run build` passes.
- [x] **Step 4 - Instant Quote: route scaffold + step 1 (Address)** - create
  `app/instant-quote/page.tsx` with `generateMetadata()`, a client wizard
  component (`components/instant-quote/InstantQuoteWizard.tsx`) holding step
  state, and the step indicator (1/2/3, Address/Contact/Your Price). Build step
  1's default state: address input, Continue, Skip link. *Done when:*
  `/instant-quote` renders step 1 matching the reference, Continue and Skip
  both advance state (Continue can go straight to step 2 for now - manual entry
  is the next step), `npm run build` passes.
- [x] **Step 5 - Instant Quote: step 1 manual-entry expanded form** - build the
  "Skip - I'll enter details myself" expanded state: "Your home" fields
  (conditioned square footage, ceiling height select, people in the home,
  insulation & windows select, sun exposure select, open-concept checkbox) and
  the "Your system" section header, plus the right-column "Estimated capacity"
  placeholder card. *Done when:* clicking "Skip" reveals the form matching the
  reference screenshot, `npm run build` passes.
- [x] **Step 6 - Instant Quote: step 2 (Contact + verification)** - build the
  Contact step (full name, phone number, "Send my quote") and its
  code-verification sub-state ("Did you receive your code?", "Yes, I got it" /
  "No - let's try a different way"). *Done when:* advancing from step 1 shows
  Contact, submitting shows the verification sub-state, "Yes, I got it"
  advances to step 3, `npm run build` passes.
- [x] **Step 7 - Instant Quote: step 3 (Your Price, designed)** - build the
  step 3 results screen per the Design reference note above (no screenshot -
  designed to match the established visual language): step indicator at 3,
  headline, estimated price range card, primary CTA linking to the external
  booking tool (reuse the "Book Online" href already used in Header/Footer).
  *Done when:* reaching step 3 shows a complete, styled results screen with a
  working booking CTA, `npm run build` passes.

## Files / areas

- `app/page.tsx` - replace stub with full home page body.
- `components/home/` - new: `ReviewsSection.tsx`, `ExperienceBanner.tsx`,
  `ServiceCategoryGrids.tsx` (or similar), `BlogTeaser.tsx`.
- `app/instant-quote/page.tsx` - new route.
- `components/instant-quote/` - new: `InstantQuoteWizard.tsx`, plus per-step
  components (`AddressStep.tsx`, `ContactStep.tsx`, `PriceStep.tsx`, or
  similar).
- Reuses: `components/services/ServiceCardGrid.tsx`, `components/blog/*`,
  `components/ui/button.tsx`, `components/ui/image-placeholder.tsx`,
  `lib/blog-posts.ts`.

## Data / contracts

- No new data files. Home's service grids link to existing routes/data
  (gas-furnaces, electric-furnaces, ac-repairs, ac-installations, ac-tuneups,
  ductworks, vent-cleanings, commercials) and blog teaser reads
  `lib/blog-posts.ts`.
- Instant Quote wizard state is local component state (`useState`), not
  persisted - no contract to lock for later features, since wiring to a real
  backend is explicitly out of scope here.

## Testing

No test runner is configured in this project (no `test` command in AGENTS.md
Commands), so this feature rides on screenshot + build evidence, not unit
tests:

- Visually compare `/` and `/instant-quote` (each step) against the reference
  screenshots.
- `npm run build` must pass after every step.
- Manually click through the full instant-quote flow: Address -> Skip -> manual
  form -> Continue -> Contact -> Send my quote -> verification -> Yes I got it
  -> Your Price -> Book Online CTA.

## Notes for the AI

- `InstantQuoteWizard` needs `'use client'` - it's inherently interactive
  (step state, form inputs); this is the sanctioned exception per
  coding-standards.md, not a default.
- Keep step components server-renderable where possible (e.g., static labels),
  but the wizard shell itself is client.
- Match existing design tokens from `app/globals.css` (primary blue `#0061CF`,
  accent blue `#3D58FF`, navy `#0E1122`) - don't introduce new colors for the
  step indicator or price card.
- Reuse `ImagePlaceholder` for photos that aren't yet real assets (per the open
  question in project-overview.md about the real logo/image assets not being
  exported yet) - don't block this feature on real photography.
- Step 3 "Your Price" is explicitly a placeholder design, not a pixel-accurate
  recreation - say so in the PR/step review so it's not mistaken for verified
  Webflow parity.
- The "Book Online" CTA on step 3 should point to the same external booking
  tool URL already used by the header/footer "Book Online" buttons - grep for
  it in `components/layout/Header.tsx` rather than guessing a new URL.
