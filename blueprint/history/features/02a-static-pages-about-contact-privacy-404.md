# Feature: Static pages (2a — About, Contact, Privacy Policy, 404)

**From build-plan:** feature 2a (split from feature 2)
**Status:** complete

## Goal

Build four of the six static pages from feature 2 — About, Contact, Privacy
Policy, and 404 — pixel-accurate to their Webflow reference screenshots. Home
(below the hero) and Instant Quote are deferred to 2b pending additional
screenshots (see Out of scope).

## Design reference

- `blueprint/reference/hvaclimate.webflow.io_about.png` — About page, full length
- `blueprint/reference/hvaclimate.webflow.io_contact.png` — Contact page, full length
- `blueprint/reference/hvaclimate.webflow.io_privacy-policy.png` — Privacy Policy page (mostly placeholder/blank body content in the original — build the sections shown, don't invent copy for the empty space)
- `blueprint/reference/hvaclimate.webflow.io_instant-quote_404.png` — 404 page (standalone, full-bleed, no header/footer)

Build each page directly against its screenshot: same section order, spacing,
copy, and icon usage. Use the locked tokens in `app/globals.css` for color/type
rather than eyeballing new values.

## In scope

- `/about` — hero (eyebrow, headline, subhead, "Get a quote" CTA), full-width
  photo band, "Our Values" 4-column icon grid (Trust, Integrity, Security,
  Commitment), "Our Mission" split section (photo + copy + checklist + CTA) on
  navy background, "Our Goals" split section (copy + CTA + photo) on navy
  background
- `/contact` — two-column layout: contact details card (address, mail, phone,
  embedded map image or static map placeholder) + contact form (Name, Email,
  Phone, Service, Address, message textarea, SMS consent checkbox copy, Send
  Message button). Form is presentational only in this feature — no submit
  handler, no Resend integration (that's feature 14); button can be a
  non-submitting placeholder or a client component with local-only state
  showing a "Coming soon" disabled state
- `/privacy-policy` — hero (title + intro copy + "Get a quote" CTA + photo),
  "top-rated service provider" stat/review strip, contact-details card,
  testimonials/reviews section per the reference (build only the sections the
  screenshot actually shows content for)
- 404 page (`app/not-found.tsx`) — centered layout on navy background: "404"
  graphic treatment (can reuse a simple styled text/SVG, not necessarily the
  exact liquid-fill illustration), "Page not found" headline, subtext, "Back to
  homepage" and "Contact us" buttons
- `generateMetadata()` with title + description for About, Contact, and Privacy
  Policy (404 doesn't use generateMetadata — Next.js handles its own metadata
  via the `not-found.tsx` convention)

## Out of scope

- Home page content below the hero, and Instant Quote's 3-step wizard — moved
  to feature 2b, pending screenshots of the full Home page and Instant Quote
  steps 2 ("Contact") and 3 ("Your Price")
- Contact form submission logic / Resend email delivery (feature 14)
- Google Maps embed wiring (use a static image or styled placeholder matching
  the reference's map card; real embed can follow later if desired)
- Testimonials/reviews sourced from a live Google Reviews feed (feature 16) —
  static placeholder copy matching the reference is fine here
- Any change to `Header`/`Footer` beyond what's needed to confirm the 404 page
  visually diverges from them (see Notes for the AI)

## Build loop

Build one step at a time, never the whole feature at once.

1. Plan mode lays out the step before any code.
2. The AI implements just that step.
3. It shows the diff (not full files); you read it and understand it.
4. You approve, then choose whether to commit a checkpoint or roll straight on.
   Checkpoints are optional; `/complete` makes the real feature-level commit at
   the end.

Never accept a step you haven't read. If a diff is too big to review, the step
was too big, so split it.

## Build steps

- [x] **Step 1 - About page** - build `app/about/page.tsx` with hero, photo
      band, values grid, mission split, goals split, and `generateMetadata()`.
      *Done when:* `/about` renders all five sections matching the reference
      screenshot's layout, copy, and spacing at desktop and mobile widths.
- [x] **Step 2 - Contact page (presentational)** - build `app/contact/page.tsx`
      with the contact-details card and the form fields laid out per the
      reference; form has no working submit action yet. *Done when:* `/contact`
      renders the two-column layout matching the reference, all fields are
      present and typeable, and the submit button is visibly non-functional
      (disabled or no-op) rather than silently failing.
- [x] **Step 3 - Privacy Policy page** - build `app/privacy-policy/page.tsx`
      with the hero, stat/review strip, and contact-details card sections shown
      in the reference. *Done when:* `/privacy-policy` renders matching the
      reference's visible sections at desktop and mobile widths.
- [x] **Step 4 - 404 page** - build `app/not-found.tsx` with the centered navy
      layout, headline, subtext, and two CTA buttons. *Done when:* navigating to
      a nonexistent route (e.g. `/does-not-exist`) renders this page, and the
      "Back to homepage" / "Contact us" buttons link to `/` and `/contact`.

## Files / areas

- `app/about/page.tsx` (new)
- `app/contact/page.tsx` (new)
- `app/privacy-policy/page.tsx` (new)
- `app/not-found.tsx` (new)
- Shared section components if reuse emerges across pages (e.g. a CTA button
  pair, a contact-details card) — extract only if a second page needs the exact
  same block, not preemptively

## Data / contracts

- None yet. These pages are static copy/markup, no JSON data source. (Contact
  form field shape will matter once feature 14 wires up Resend + Zod
  validation — not locked here.)

## Testing

- No test runner is configured in this project (no `test` command in
  `AGENTS.md`), so this feature is verified with build output and browser/
  screenshot evidence per step, not unit tests.
- Run `npm run build` after each step to confirm no type errors.
- For each page, compare a browser screenshot (desktop ~1440px and mobile
  ~390px) against its reference image in `blueprint/reference/`.
- For the 404 page specifically: confirm it triggers on an actual unmatched
  route, not just when visited directly.

## Delivered (post-build notes)

Two sections expanded beyond the original spec once fuller reference
screenshots arrived mid-build:

- `/contact` also got a decorative blue side panel behind the contact-details
  card and an FAQ accordion section on navy background (6 questions, first
  expanded by default) - not in the original spec's scope, added to match a
  corrected reference screenshot.
- `/privacy-policy` ships the full SMS/Text Messaging Privacy Policy legal
  text (Introduction through Contact Us, 15 sections) in a two-column layout
  with a sticky contact/quote card - the original reference appeared to have
  a blank body; a corrected screenshot showed the real content.

## Notes for the AI

- Server components by default; the contact form only needs `'use client'` if
  it tracks local input state — keep it as small a client boundary as possible
  (e.g. just the form, not the whole page).
- **404 vs. global layout conflict:** `app/layout.tsx` renders `Header` and
  `Footer` around every page, including `not-found.tsx`, but the reference
  screenshot shows a standalone full-bleed page with no header or footer. Next.js's
  root layout always wraps `not-found.tsx` — there's no built-in escape hatch
  short of a route-group layout override. Default to accepting the global
  header/footer wrapping the 404 content (simplest, consistent with the rest of
  the site) rather than restructuring the layout tree for one page. Flag this
  visible deviation from the reference when presenting the diff for Step 4, and
  let the user decide if it's worth a bigger restructure.
- Reuse `buttonVariants` from `components/ui/button.tsx` for CTA buttons (`Get a
  quote`, `Back to homepage`, `Contact us`) instead of hand-rolled button
  markup.
- Match existing route conventions: no `src/` directory, routes directly under
  `app/`.
- All images through `next/image` with explicit width/height (per AGENTS.md) —
  use the photos as referenced (van/technician, ductwork, AC unit) as generic
  stock-style placeholders if the exact source images aren't available yet;
  don't block the step on sourcing exact photography.
- No em dashes, en dashes, or ellipses in any written copy or comments (see
  coding-standards.md Writing section).
