# Fix: Contact page visual redesign

**Type:** Fix
**From build-plan:** ad-hoc (user-requested polish pass, not a build-plan line item)
**Status:** complete

## Goal

Restyle `/contact` to match a reference mockup (`HVA Contact.dc.html`): dark
radial-gradient hero, two-column form + info-panel layout, service chips,
embedded Google Map, and a redesigned single-column FAQ accordion. Keep the
existing Resend-backed Server Action, Zod schema, and URL untouched.

## What changed

- **`components/contact/ContactHero.tsx`** (new) — dark gradient hero with
  "We answer live" badge, headline, subheading; Framer Motion entrance
  animations.
- **`components/contact/ContactForm.tsx`** — rebuilt as a bordered card with
  name/phone/email/city fields, clickable service chips (Heating, Cooling,
  New install, Maintenance, Emergency) wired to a hidden `service` input,
  restyled textarea and submit button. Still uses `submitContactForm` /
  `contactFormSchema` unchanged; the "City" label maps onto the existing
  `address` field to avoid a schema change.
- **`components/contact/ContactInfoPanel.tsx`** (new) — call/text card, email +
  service-area card, business-hours card with "Open now" badge; staggered
  Framer Motion entrance.
- **`components/contact/ContactMap.tsx`** (new) — embedded Google Maps iframe
  in a rounded card with a scale-in animation.
- **`components/contact/FaqAccordion.tsx`** — rewritten from a 2-column card
  grid (which reflowed on open due to uneven card heights) to a single-column
  classic accordion: border-bottom rows, only one item open at a time,
  ChevronDown rotates 180° when active, Framer Motion height/opacity
  transition, active question turns blue. Section now owns its own "FAQ"
  eyebrow + heading and a centered 720px container with a light background.
- **`app/contact/page.tsx`** — reassembled around the new components;
  `generateMetadata()` and the `/contact` URL are unchanged.

## Verification

- `npx tsc --noEmit` — passes.
- `npm run build` — passes, `/contact` prerenders as static.
- `npm run lint` — one pre-existing unrelated error in `app/not-found.tsx`
  (not touched by this change).
- Manual browser verification (headless Playwright, since the project has no
  Playwright script wired into `AGENTS.md` — used ad hoc, not installed as a
  dependency): hero, form, info panel, and map render correctly; service chips
  toggle active state; FAQ accordion opens one item at a time with no layout
  jump and no console errors.

## Notes

- Done directly on `main` with no feature/fix spec written up front and no
  branch created — this history entry was written after the fact to keep the
  project's logging convention intact. No branch to merge/delete this time.
