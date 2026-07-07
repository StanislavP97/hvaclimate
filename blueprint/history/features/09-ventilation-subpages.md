# Feature: Ventilation sub-pages

**From build-plan:** feature 9
**Status:** complete

## Goal

Two dynamic routes, `/ventilation/ductwork/[slug]` (4 entries) and
`/ventilation/vent-cleaning/[slug]` (3 entries), rendering
`data/hvaclimate-cms-data/ductworks.json` and
`data/hvaclimate-cms-data/vent-cleanings.json`, with real SEO metadata and
real CDN images. This repeats the exact `ServicePage` pattern locked in by
feature 4 (Gas Furnace) and reused through features 5-8: same type, same
loader shape, same page layout, same `next/image` remote host (already
configured).

## In scope

- `app/ventilation/ductwork/[slug]/page.tsx` dynamic route, one page per JSON
  entry, `generateStaticParams()` from the JSON file.
- `app/ventilation/vent-cleaning/[slug]/page.tsx` dynamic route, same pattern.
- `generateMetadata()` per slug using `titleTag` / `metaDescription` from the
  JSON, for both routes.
- Render each entry's `content` (raw HTML string) via
  `dangerouslySetInnerHTML`, same as every prior sub-page feature.
- Real thumbnail/featuredImage rendered via `next/image` (CDN host
  `cdn.prod.website-files.com` already allowed in `next.config.ts`, no config
  change needed).
- `lib/ductworks.ts` and `lib/vent-cleanings.ts` data loaders, mirroring
  `lib/ac-tuneups.ts`, reusing the existing `types/service-page.ts`
  `ServicePage` type as-is.
- Fix two broken links on the `/ventilation` category page's
  `SERVICE_CARDS`:
  - "Home Vent Cleaning" card currently links to
    `/ventilation/vent-cleaning/dryer-vent-cleaning`, a slug that doesn't
    exist (real slugs are `when-dryer-vent-not-blowing`, `dryer`, `home`).
    Point it at `home`.
  - "Fresh Air System" card currently links to
    `/ventilation/ductwork/fresh-air-systems`, a slug that doesn't exist
    (real slugs are `fresh-air-system-installation`, `repair`, `installation`,
    `replacement`). Point it at `fresh-air-system-installation`.
  - The third card (`/ventilation/ductwork/repair`) already points at a real
    slug - no change needed there.
- 404 (via `notFound()`) for any slug not present in either JSON file.

## Out of scope

- Commercial sub-pages - feature 10, same pattern, separate spec.
- Any change to `types/service-page.ts` or the render approach established in
  feature 4 - this feature reuses both verbatim.
- Self-hosting images (still Webflow CDN).
- New content not present in the JSON (reviews, cross-links, etc.).
- Adding individual links for every ductwork/vent-cleaning slug elsewhere on
  the site beyond the two card fixes above.

## Build loop

Build one step at a time, never the whole feature at once.

1. Plan mode lays out the step before any code.
2. The AI implements just that step.
3. It shows the diff (not full files); you read it and understand it.
4. You approve, then choose whether to commit a checkpoint or roll straight
   on. Checkpoints are optional; `/complete` makes the real feature-level
   commit at the end.

Never accept a step you haven't read. If a diff is too big to review, the
step was too big, so split it.

## Build steps

- [x] **Step 1 - Data loaders** - `lib/ductworks.ts` exporting
  `getDuctworks()` and `getDuctworkBySlug(slug)`, and `lib/vent-cleanings.ts`
  exporting `getVentCleanings()` and `getVentCleaningBySlug(slug)`, both
  typed with the existing `ServicePage` interface. *Done when:* a throwaway
  check confirms all 4 ductwork entries and all 3 vent-cleaning entries load
  with correct typing.
- [x] **Step 2 - Ductwork route + metadata + content render** -
  `app/ventilation/ductwork/[slug]/page.tsx` with `generateStaticParams()`,
  `generateMetadata()` from `titleTag`/`metaDescription`, `notFound()` for
  unknown slugs, and the same page body pattern as
  `app/air-conditioner/tune-up/[slug]/page.tsx` (swap the eyebrow copy to
  "Ductwork"). *Done when:* `npm run build` generates all 4 static routes; a
  live check confirms correct title/meta per slug, CDN image rendering, and a
  404 on an unknown slug.
- [x] **Step 3 - Vent-cleaning route + metadata + content render** -
  `app/ventilation/vent-cleaning/[slug]/page.tsx`, same pattern as Step 2
  (eyebrow copy "Vent Cleaning"). *Done when:* `npm run build` generates all
  3 static routes; a live check confirms correct title/meta per slug, CDN
  image rendering, and a 404 on an unknown slug.
- [x] **Step 4 - Fix the /ventilation category card links** - update the
  `SERVICE_CARDS` entries in `app/ventilation/page.tsx`: point "Home Vent
  Cleaning" at `/ventilation/vent-cleaning/home` and "Fresh Air System" at
  `/ventilation/ductwork/fresh-air-system-installation`. *Done when:* both
  card links on `/ventilation` resolve to real pages instead of 404ing.

## Files / areas

- `lib/ductworks.ts` (new).
- `lib/vent-cleanings.ts` (new).
- `app/ventilation/ductwork/[slug]/page.tsx` (new).
- `app/ventilation/vent-cleaning/[slug]/page.tsx` (new).
- `app/ventilation/page.tsx` (edit - fix two `href`s).
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

Source files:
- `data/hvaclimate-cms-data/ductworks.json` (4 entries, slugs:
  `fresh-air-system-installation`, `repair`, `installation`, `replacement`).
- `data/hvaclimate-cms-data/vent-cleanings.json` (3 entries, slugs:
  `when-dryer-vent-not-blowing`, `dryer`, `home`).

## Testing

No test runner declared in `AGENTS.md`; this rides on build + browser
evidence:

- `npm run build` must succeed (validates `generateStaticParams()` and
  `generateMetadata()` for all 7 combined entries across both routes).
- Browser check of all 7 routes plus a 404 case on each route, confirming
  title/meta description in page source and CDN image rendering.
- Visual check confirming both fixed `/ventilation` cards resolve to real
  pages.

## Notes for the AI

- Server components throughout - no `'use client'` needed.
- Match the AC tune-up page layout exactly; only the eyebrow label text,
  loader, and route names change per route.
- Don't touch `types/service-page.ts` or `next.config.ts` - CDN host and
  interface are already confirmed present/correct.
- Two separate collections in this feature (not one) - build and verify each
  route independently; don't assume they share a loader file.
- The `/ventilation/ductwork/repair` card link is already correct - don't
  "fix" it, only the other two.
