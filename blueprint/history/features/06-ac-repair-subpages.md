# Feature: AC Repair sub-pages

**From build-plan:** feature 6
**Status:** complete

## Goal

Dynamic route `/air-conditioner/repair/[slug]` rendering the 5 AC Repair CMS
entries (`if-the-air-conditioner-is-frozen`, `air-handler`, `emergency`,
`commercial`, `residential`) from `data/hvaclimate-cms-data/ac-repairs.json`,
with real SEO metadata and real images from the Webflow CDN. This repeats the
exact pattern locked in by feature 4 (Gas Furnace) and feature 5 (Electric
Furnace): same `ServicePage` shape, same loader pattern, same page layout,
same `next/image` remote host (already configured).

## In scope

- `app/air-conditioner/repair/[slug]/page.tsx` dynamic route, one page per
  JSON entry, `generateStaticParams()` from the JSON file.
- `generateMetadata()` per slug using `titleTag` / `metaDescription` from the
  JSON.
- Render the entry's `content` (raw HTML string) via `dangerouslySetInnerHTML`,
  same as the gas/electric furnace pages.
- Real thumbnail/featuredImage rendered via `next/image` (CDN host already
  allowed in `next.config.ts` — no config change expected, confirm during
  Step 1).
- `lib/ac-repairs.ts` data loader, mirroring `lib/gas-furnaces.ts` /
  `lib/electric-furnaces.ts`, reusing the existing `types/service-page.ts`
  `ServicePage` type as-is.
- Fix the `/air-conditioning` category page's AC Repair card: it currently
  links to `/air-conditioner/repair/repair`, a slug that doesn't exist in the
  data (real slugs are `if-the-air-conditioner-is-frozen`, `air-handler`,
  `emergency`, `commercial`, `residential`). Point the card at a real slug
  (`residential`, the general repair-services entry) so the link resolves.
- 404 (via `notFound()`) for any slug not present in the JSON.

## Out of scope

- AC Installation, AC Tune-up, Ventilation, Commercial sub-pages — features
  7-10, same pattern, separate specs.
- Any change to `types/service-page.ts` or the render approach established in
  feature 4 — this feature reuses both verbatim.
- Self-hosting images (still Webflow CDN).
- New content not present in the JSON (reviews, cross-links, etc.).
- Adding individual links for all 5 AC Repair slugs elsewhere on the site
  beyond the one existing card fix above — no other page currently references
  AC Repair sub-slugs.

## Build loop

Build one step at a time, never the whole feature at once.

1. Plan mode lays out the step before any code.
2. The AI implements just that step.
3. It shows the diff (not full files); you read it and understand it.
4. You approve, then choose whether to commit a checkpoint or roll straight on.
   Checkpoints are optional; `/complete` makes the real feature-level commit at the end.

Never accept a step you haven't read. If a diff is too big to review, the step was too big, so split it.

## Build steps

- [x] **Step 1 - Data loader** - `lib/ac-repairs.ts` exporting
  `getAcRepairs()` and `getAcRepairBySlug(slug)`, typed with the existing
  `ServicePage` interface. *Done when:* a throwaway check confirms all 5
  entries load with correct typing, and `cdn.prod.website-files.com` is
  confirmed present in `next.config.ts`'s `images.remotePatterns`.
- [x] **Step 2 - Route + metadata + content render** -
  `app/air-conditioner/repair/[slug]/page.tsx` with
  `generateStaticParams()`, `generateMetadata()` from
  `titleTag`/`metaDescription`, `notFound()` for unknown slugs, and the same
  page body pattern as `app/heating/gas-furnace/[slug]/page.tsx` (swap
  "Gas Furnace Services" eyebrow copy for "Air Conditioner Repair"). *Done
  when:* `npm run build` generates all 5 static routes; a live check
  confirms correct title/meta per slug, CDN image rendering, and a 404 on an
  unknown slug.
- [x] **Step 3 - Fix the /air-conditioning repair card link** - update the
  `SERVICE_CARDS` entry in `app/air-conditioning/page.tsx` so "Air
  Conditioner Repair" links to `/air-conditioner/repair/residential` instead
  of the nonexistent `/air-conditioner/repair/repair`. *Done when:* the card
  link on `/air-conditioning` resolves to a real page instead of 404ing.

## Files / areas

- `lib/ac-repairs.ts` (new).
- `app/air-conditioner/repair/[slug]/page.tsx` (new).
- `app/air-conditioning/page.tsx` (edit - fix one `href`).
- Reused `types/service-page.ts`, `components/services/ServiceContentSidebar.tsx`
  unchanged.
- `next.config.ts` - unchanged (CDN host already allowed).

## Data / contracts

Reuses the `ServicePage` interface locked in feature 4, unchanged:

```ts
interface ServicePage {
  id: string;
  slug: string;
  name: string;
  titleTag: string;
  metaDescription: string;
  keyword: string | null;
  thumbnail: string;
  featuredImage: string;
  altText: string;
  content: string;
}
```

Source file: `data/hvaclimate-cms-data/ac-repairs.json` (5 entries, slugs:
`if-the-air-conditioner-is-frozen`, `air-handler`, `emergency`, `commercial`,
`residential`).

## Testing

No test runner declared in `AGENTS.md`; this rides on build + browser
evidence:

- `npm run build` must succeed (validates `generateStaticParams()` and
  `generateMetadata()` for all 5 slugs).
- Browser check of 2+ routes plus the 404 case, confirming title/meta
  description in page source and CDN image rendering.
- Visual check confirming the `/air-conditioning` repair card resolves to a
  real page.

## Notes for the AI

- Server components throughout — no `'use client'` needed.
- Match the gas/electric furnace page layout exactly; only the eyebrow label
  text and loader/route names change.
- Don't touch `types/service-page.ts` or `next.config.ts` unless Step 1
  reveals something genuinely missing (unexpected — confirm before editing).
