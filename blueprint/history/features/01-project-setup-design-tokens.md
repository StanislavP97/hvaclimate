# Feature: Project setup & design tokens

**From build-plan:** feature 1
**Status:** complete

## Goal

Establish the Tailwind v4 design tokens (colors, fonts, spacing) and global
layout (Header, Footer, phone/contact utility bar) that every later page will
build on. This is the foundation feature — nothing else in the build plan can
look right until these tokens and shell components exist.

## Design reference

Three screenshots of the live hvaclimate.com site, saved to `blueprint/reference/`:

- `Screenshot from 2026-07-07 15-58-28.png` — full home page above the fold
  (utility bar, header/nav, hero section with headline, feature list, CTA
  buttons, and van photo)
- `Screenshot from 2026-07-07 15-59-00.png` — footer (dark navy background,
  4-column link layout, logo, contact details, socials, "Book online" button)
- `Screenshot from 2026-07-07 15-59-33.png` — header/nav close-up (utility bar
  + main nav + "Book Online" pill button)

**Correction to project-overview.md's UI/UX section:** the live site is
**light mode primary**, not dark-navy-first. Header, utility bar, and body
sections are white/light with a blue/indigo accent; only the **footer** uses
the dark navy background. Tokens below follow the screenshots, not the prose
description in `project-overview.md`.

### Tokens observed from screenshots

**Colors**
- `--color-primary` (blue accent — nav links active state, icons, pill button
  fill, "Book online" button, outlined CTA buttons, "Licensed, Bonded &
  Insured" eyebrow text): `#2952E3`-ish blue (sample and confirm exact hex
  against screenshot during implementation — use a color picker on the PNG)
- `--color-navy` (footer background, dark surface): near-black navy, `#0B1220`-ish
- `--color-foreground` (body text on light backgrounds): near-black, `#111827`-ish
- `--color-footer-foreground` (footer body text): light gray/blue, `#9CA3AF`-ish
- `--color-footer-heading` (footer column headings — HEATING, COOLING,
  VENTILATION, COMMERCIAL, COMPANY, REBATE PROGRAMS): white, bold, small-caps
  tracking
- White (`#FFFFFF`) — page background, header background
- Logo is full-color (yellow gear, blue wrench, red text) — treat as a fixed
  image asset, not a token

Exact hex values must be sampled from the reference PNGs (not guessed) during
Step 1 — use whatever color-picking method is available (browser dev tools on
the opened image, or an image color picker) and record the final values as
comments next to each token in `globals.css`.

**Typography**
- Sans-serif, rounded/geometric family (headline "Your HVAC Contractor in
  Vancouver, WA" reads like Poppins/Nunito/similar rounded sans — not Geist,
  which is the current scaffold default). Confirm closest available Google
  Font during Step 1 and swap `layout.tsx` off Geist.
- Headline: bold, large, tight line-height, dark navy/black
- Eyebrow text ("LICENSED, BONDED, & INSURED"): small, bold, uppercase,
  letter-spaced, blue
- Body copy: regular weight, gray

**Spacing / shape**
- Fully rounded ("pill") buttons throughout (nav CTA, hero CTAs, footer CTA)
- Utility bar: thin, icon + text pairs, separated by vertical dividers, light
  gray background tint on icons
- Generous section padding; two-column hero (text left, image right) on
  desktop

## In scope

- Tailwind v4 `@theme` tokens in `app/globals.css`: color palette (primary
  blue, navy, foreground, footer text/heading colors), font family swap
- Global font setup (replace Geist with the closest match to the site's
  rounded sans, loaded via `next/font/google`)
- `components/layout/Header.tsx` — utility bar (email, service area, phone
  with "Click to call" `tel:` link) + main nav (Home, Services, Service Areas,
  Rebates, All Pages, Instant Quote) + "Book Online" pill button + logo
- `components/layout/Footer.tsx` — logo, tagline, Licensed/Bonded/Insured
  badges, contact block, hours, social icons, "Book online" button, 4-column
  link grid (Heating, Cooling, Ventilation, Commercial, Company, Rebate
  Programs), copyright line
- Wiring Header + Footer into `app/layout.tsx` so every page gets them
- Placeholder/dummy `href`s for nav links that don't have a built page yet
  (routes land in later features) — link to `#` or the eventual path per the
  URL map in `build-plan.md`, whichever keeps the header/footer visually
  correct now
- shadcn/ui `init` (named as the UI library in project-overview.md but not
  yet installed) — run it as part of this feature since Header/Footer are the
  first components built

## Out of scope

- Actual page content/hero copy for the home page (feature 2 — Static pages).
  This feature only builds the shell (Header + Footer) that wraps all pages.
- Mobile nav / hamburger menu behavior beyond what's needed for a working
  responsive layout — full mobile polish can iterate in feature 2 if the
  screenshots don't cover mobile breakpoints (they don't; only desktop
  screenshots were provided). Build a reasonable responsive collapse now, but
  don't chase pixel accuracy on mobile without a mobile reference screenshot.
- The real logo asset — screenshots show it but we don't have an exported
  file. Use a placeholder `<Image>` pointing at a temporary asset (or note the
  gap) until the real logo file is provided; don't attempt to recreate it as
  an SVG from the screenshot.
- Google Reviews / testimonials, GTM script — feature 16.
- Any CMS JSON data — no `data/` files exist yet (pre-build step in
  build-plan.md is still unchecked); this feature hard-codes nav labels and
  footer link text directly since there's no data source yet.

## Build loop

Build one step at a time, never the whole feature at once.

1. Plan mode lays out the step before any code.
2. The AI implements just that step.
3. It shows the diff (not full files); you read it and understand it.
4. You approve, then choose whether to commit a checkpoint or roll straight on.
   Checkpoints are optional; `/complete` makes the real feature-level commit at the end.

Never accept a step you haven't read. If a diff is too big to review, the step was too big, so split it.

## Build steps

- [x] **Step 1 - Design tokens in `globals.css`** - sample exact hex values
  from the three reference screenshots, define `@theme` tokens for primary
  blue, navy, foreground, footer text/heading colors in `app/globals.css`;
  swap `layout.tsx`'s font from Geist to the closest rounded sans (e.g.
  Poppins or Nunito) via `next/font/google`. *Done when:* `npm run dev` shows
  the new font applied on the default page and the token values are visible
  in `globals.css` with hex comments noting they were sampled from the
  screenshots.
- [x] **Step 2 - shadcn/ui init** - run `npx shadcn@latest init`, configured
  for Tailwind v4 / the existing `app/` structure (no `src/`). *Done when:*
  `components.json` exists, `npm run build` still passes, and a `Button`
  component can be added via the shadcn CLI without errors.
- [x] **Step 3 - Header component** - build `components/layout/Header.tsx`:
  utility bar (email `mailto:`, service area text, phone `tel:` link with
  "Click to call"), logo placeholder, main nav links, rounded "Book Online"
  button. Server component, no client interactivity yet beyond native
  `<a>`/`tel:`/`mailto:` links. *Done when:* rendered in a temporary test page
  matches the header screenshot's layout/colors at desktop width, and
  `npm run build` passes.
- [x] **Step 4 - Footer component** - build `components/layout/Footer.tsx`:
  dark navy background, logo + tagline + badges, contact/hours block, social
  icon links, "Book online" button, 4-column link grid, copyright line.
  *Done when:* rendered output matches the footer screenshot's layout/colors
  at desktop width, and `npm run build` passes.
- [x] **Step 5 - Wire into root layout** - import Header and Footer into
  `app/layout.tsx` wrapping `{children}`, remove default create-next-app
  boilerplate from `app/page.tsx` so Header/Footer are visible against a
  blank body. *Done when:* `npm run dev` shows Header at top and Footer at
  bottom on `/` with no console errors, `npm run build` passes.
- [x] **Step 6 - Responsive check** - verify Header/Footer collapse
  reasonably at mobile width (no reference screenshot exists for mobile, so
  use judgment: stack utility bar or hide it, collapse nav behind a menu
  button). *Done when:* no horizontal overflow or broken layout at 375px and
  1440px widths, verified via browser resize or dev tools device toolbar.

## Files / areas

- `app/globals.css` — theme tokens, font variables
- `app/layout.tsx` — font import, Header/Footer wiring
- `app/page.tsx` — strip boilerplate
- `components/layout/Header.tsx` — new
- `components/layout/Footer.tsx` — new
- `components.json`, `lib/utils.ts`, `components/ui/` — created by shadcn init

## Data / contracts

- No JSON data contracts yet — nav and footer link labels/hrefs are
  hard-coded per the screenshots and the URL map in `build-plan.md`. When
  later features add `data/*.json`, footer link generation can be revisited,
  but that's out of scope here.

## Testing

- No `test` command is declared in `AGENTS.md` yet, so this feature rides on
  browser/screenshot evidence and `npm run build`, per the Testing section of
  `coding-standards.md`. No pure-logic code (parsers/validators/server
  actions) is introduced in this feature, so there is nothing to unit test
  even if a runner existed.
- Verify each step's done-when via `npm run dev` in the browser, comparing
  against the reference screenshots side by side.
- Final check: `npm run build` and `npm run lint` both pass cleanly.

## Notes for the AI

- This is a **visual replication feature** — build against the three PNGs in
  `blueprint/reference/`, not the prose "dark navy/blue" description in
  `project-overview.md`. That description is now known to be inaccurate (only
  the footer is dark; the rest of the site is light) and should be corrected
  in `project-overview.md` at `/complete` time.
- Header and Footer must be **server components** (no `'use client'`) — no
  interactivity beyond native links is needed yet. If mobile nav needs a
  toggle button in Step 6, that one small piece (the menu button/panel) may
  need to be its own small client component, but keep Header itself a server
  component and isolate the client boundary as narrowly as possible.
- Nav/footer link `href`s should point at the real paths from the URL map in
  `build-plan.md` even though those pages don't exist yet (they'll 404 until
  later features land) — don't use `#` placeholders, since getting the real
  paths right now avoids a later find-and-replace pass.
- Sample exact colors from the PNGs rather than eyeballing approximate hex
  values — precision here avoids rework once more pages are built against
  these tokens.
