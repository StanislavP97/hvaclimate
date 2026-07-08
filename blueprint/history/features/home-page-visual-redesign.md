# Feature: Home page visual redesign (reference layout, real content)

**From build-plan:** ad-hoc (user-requested polish pass, not a build-plan line item)
**Status:** complete

## Goal

Restyle the home page to match the structure and visual rhythm of the reference
mockup (trust bar, tabbed-look service cards, "why choose us" split layout,
testimonial-card grid shape, blog teaser cards, denser header/footer) while
keeping every piece of copy and data exactly as it already exists in the real
project. Nothing from the reference's placeholder content (generic "Eugene"
bio, fake testimonial names/quotes, generic service category copy) gets used —
it is a layout/style guide only, never a content source.

## Design reference

- `blueprint/reference/home-reference.html` — annotated structural reference
  (section order, spacing, card shapes, grid columns) with every content slot
  marked `[placeholder]` or `[real ... from ...]` so it can't be mistaken for
  real copy. Open directly in a browser to see the shapes; read the inline
  comments for what maps to real data vs. what to skip entirely.
- Colors (`#2563EB`, `#F97316`, `#0D1B2A`) and fonts (Inter, Plus Jakarta Sans)
  in the reference are generic and must NOT replace the project's locked
  design tokens in `app/globals.css` (`--color-primary-accent: #3d58ff`,
  `--primary: #0061cf`, `--color-navy: #0e1122`, Poppins). Map every reference
  color to the closest existing project token — never introduce a new hex
  value.

## In scope

- **Hero (`HomeHero`)** — rebuild to the reference's two-column shape: eyebrow
  badge pill, larger headline scale, icon-chip feature list (reuse the real
  `FEATURES` array already in the component), dual CTA row. The photo panel's
  overlay info card is **cut** — no real named team-member photo/bio exists,
  so the panel stays a plain `ImagePlaceholder`, no overlay.
- **Trust bar** — add a light stats strip using the real `10+ / 400+ / 7+`
  figures currently rendered inside `ExperienceBanner`. Numbers must live in
  exactly one place; if pulled out into a strip, `ExperienceBanner` stops
  duplicating them (either the banner drops its stat row, or the strip and the
  banner intentionally share the same constant — decide in step 1, described
  in code, not two hand-typed copies of `"10+"` etc.).
- **Service sections (`ServiceCategorySections`, `ServiceCardGrid`)** —
  restyle the pill row and card grid to the reference's card shape (image
  block, title, 2-line description, "View Services →" link), using the real
  `HEATING_SERVICE_CARDS` / `COOLING_SERVICE_CARDS` / `VENTILATION_SERVICE_CARDS`
  / `COMMERCIAL_SERVICE_CARDS` arrays already imported. No copy changes, no
  new categories. **Update (user-requested 2026-07-08):** pills become
  client-side tabs (`'use client'`) — clicking a pill shows only that
  category's cards, active pill styled dark per the reference. All four
  categories' cards, titles, and links must still be present in the initial
  server-rendered HTML (toggle visibility client-side, e.g. `hidden` on
  inactive panels, not conditional unmounting) so every service link stays
  crawlable — this preserves the SEO-driven "always in the DOM" intent behind
  the original no-tabs decision below while giving the tab UX.
- **Why choose us (new section)** — split layout (photo + checklist + CTA)
  using only verifiable claims already present in the codebase: licensed /
  bonded / insured (from hero eyebrow), the three `HomeHero` FEATURES
  descriptions, and same-day/emergency framing already in "Emergency-Ready,
  Anytime Calls". No new claims (e.g. no "rebate paperwork handled",
  "flat-rate pricing guarantee") unless the user confirms they're accurate and
  provides the wording.
- **Reviews (`ReviewsSection`)** — restyle to a 3-card grid matching the
  reference's card shape. **Update (user-provided real data, 2026-07-08):**
  the user supplied 3 real Google review quotes (Yesse Estrada, Nancy
  Pelfrey, Avenir Uzun, all 5-star) — stored in `data/google-reviews.json`
  and rendered in the card grid (star row, quote, initials avatar computed
  from the real name, name). No location/city data was provided, so none is
  invented (the reference's "Vancouver, WA"-style location line is omitted).
- **Blog teaser (`BlogTeaser`)** — restyle to a 3-card grid matching the
  reference's blog card shape, pulling real entries from
  `data/hvaclimate-cms-data/blog-posts.json` (title, category, date already
  used — check the current component for what fields it already reads before
  assuming more exist).
- **Header/footer** — tighten spacing/density to match the reference's
  structure (link columns, bottom bar), using only nav links and routes that
  already exist in the project today. No invented pages, dropdown items, or
  social links that don't have a real destination.

## Out of scope

- ~~Fabricated testimonials. No reviews dataset exists in `data/`...~~
  **Reversed by user request (2026-07-08):** the user provided 3 real Google
  review quotes with real names, added to `data/google-reviews.json` — see
  the Reviews entry in "In scope" above. No quotes/names/ratings are
  invented; only what the user supplied is used, and no location field was
  added since none was given. A live Google Reviews API widget
  (`project-overview.md` build-plan feature 16) is still unbuilt and remains
  future work — this is static real data, not a live integration.
- **New photography or a named team-member overlay card.** No real photo
  assets exist yet (logo is still a text placeholder per open questions in
  `project-overview.md`). All photo slots stay `ImagePlaceholder`, restyled to
  match the reference's placeholder block treatment, not swapped for fake
  stock imagery or a fabricated bio.
- Changing brand colors, fonts, or any token in `app/globals.css`.
- Changing URL slugs or route structure.
- Editing `data/hvaclimate-cms-data/*` content.
- Rebuilding non-home pages (service sub-pages, blog post pages, service area
  pages, etc.).
- ~~Tab-switching JavaScript for the service category pills.~~ **Reversed by
  user request (2026-07-08):** pills are now client-side tabs — see the
  Service sections entry in "In scope" above for the crawlability
  requirement that replaces this restriction.

## Build steps

- [x] **Step 1 — Hero restyle** — Rebuild `HomeHero` to the reference's
      two-column shape (eyebrow badge, headline scale, icon-chip feature list,
      dual CTA row, plain photo panel with no overlay).
- [x] **Step 2 — Trust bar** — Extract the `10+ / 400+ / 7+` stats into a
      single source (shared constant or new small component) and render a
      light stats strip under the hero; update `ExperienceBanner` so the
      numbers aren't duplicated by hand in two places.
- [x] **Step 3 — Service cards restyle + tabs** — Update `ServiceCardGrid` and
      the category section wrapper to the reference's card shape using
      existing real card data. Added a small `'use client'` tab component so
      the pills switch which category's cards are visible, active pill styled
      dark; all four categories' cards/links stay server-rendered in the DOM
      (visibility toggled via `hidden`, not conditionally unmounted).
- [x] **Step 4 — Why choose us section** — Added the split section using only
      verified real differentiators sourced from existing copy.
- [x] **Step 5 — Reviews section restyle** — Restyled `ReviewsSection` to a
      3-card grid using the 3 real Google reviews the user provided (stored
      in `data/google-reviews.json`).
- [x] **Step 6 — Blog teaser restyle** — Updated `BlogTeaser` to a 3-card grid
      matching the reference's blog card shape, using real
      `blog-posts.json` entries.
- [x] **Step 7 — Header/footer polish** — Tightened nav and footer
      spacing/density to match the reference structurally, using only
      existing real links. Per user instruction, the footer's "Book online"
      button and business-hours line stayed as-is. Header rebuilt with a
      logo mark + wordmark and dual CTA row; footer social links (Facebook,
      Instagram, TikTok — pre-existing placeholders) restyled with icon
      chips.

## Files / areas

- `components/home/HomeHero.tsx`
- `components/home/ExperienceBanner.tsx`
- `components/home/TrustBar.tsx` (new)
- `components/home/ServiceCategorySections.tsx`
- `components/home/ServiceCategoryTabs.tsx` (new)
- `components/services/ServiceCardGrid.tsx`
- `components/home/WhyChooseUs.tsx` (new)
- `components/home/ReviewsSection.tsx`
- `components/home/BlogTeaser.tsx`
- `components/layout/Header.tsx`
- `components/layout/Footer.tsx`
- `app/page.tsx` (section ordering)
- `data/google-reviews.json` (new)
- `types/reviews.ts` (new)

## Data / contracts

- Reuses existing exported card arrays (`HEATING_SERVICE_CARDS`,
  `COOLING_SERVICE_CARDS`, `VENTILATION_SERVICE_CARDS`,
  `COMMERCIAL_SERVICE_CARDS`), `data/hvaclimate-cms-data/blog-posts.json`, and
  the stat values now sourced from `HOME_STATS` (exported from
  `ExperienceBanner.tsx`).
- New: `data/google-reviews.json` — 3 real user-provided Google reviews
  (name, rating, quote). New `GoogleReview` type in `types/reviews.ts`.

## Testing

No test runner declared in `AGENTS.md`; verified via `npm run build` after
every step plus server-HTML/browser checks (curl + DOM inspection) confirming
real copy renders exactly once, no fabricated content, and all service/blog
links resolve to real routes.
