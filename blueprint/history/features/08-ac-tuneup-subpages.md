# Feature: AC Tune-up sub-pages

**From build-plan:** feature 8
**Status:** complete

## Goal

Dynamic route `/air-conditioner/tune-up/[slug]` rendering the 2 AC Tune-up CMS
entries (`residential`, `air-filter-replacement`) from
`data/hvaclimate-cms-data/ac-tuneups.json`, with real SEO metadata and real
images from the Webflow CDN. This repeats the exact pattern locked in by
feature 4 (Gas Furnace), feature 6 (AC Repair), and feature 7 (AC
Installation): same `ServicePage` shape, same loader pattern, same page
layout, same `next/image` remote host (already configured).

## In scope

- `app/air-conditioner/tune-up/[slug]/page.tsx` dynamic route, one page per
  JSON entry, `generateStaticParams()` from the JSON file.
- `generateMetadata()` per slug using `titleTag` / `metaDescription` from the
  JSON.
- Render the entry's `content` (raw HTML string) via `dangerouslySetInnerHTML`,
  same as the gas/electric furnace, AC repair, and AC installation pages.
- Real thumbnail/featuredImage rendered via `next/image` (CDN host
  `cdn.prod.website-files.com` already allowed in `next.config.ts` - confirmed
  present, no config change needed).
- `lib/ac-tuneups.ts` data loader, mirroring `lib/ac-installations.ts`, reusing
  the existing `types/service-page.ts` `ServicePage` type as-is.
- Fix the `/air-conditioning` category page's AC Tune-up card: it currently
  links to `/air-conditioner/tune-up/tune-up`, a slug that doesn't exist in
  the data (real slugs are `residential`, `air-filter-replacement`). Point the
  card at `residential` (the general tune-up entry), matching how features 6
  and 7 fixed their cards.
- 404 (via `notFound()`) for any slug not present in the JSON.

## Out of scope

- Ventilation, Commercial sub-pages - features 9-10, same pattern, separate
  specs.
- Any change to `types/service-page.ts` or the render approach established in
  feature 4 - this feature reuses both verbatim.
- Self-hosting images (still Webflow CDN).
- New content not present in the JSON (reviews, cross-links, etc.).
- Adding individual links for both AC Tune-up slugs elsewhere on the site
  beyond the one existing card fix above.

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

- [x] **Step 1 - Data loader** - `lib/ac-tuneups.ts` exporting
  `getAcTuneups()` and `getAcTuneupBySlug(slug)`, typed with the existing
  `ServicePage` interface. *Done when:* a throwaway check confirms both
  entries load with correct typing.
- [x] **Step 2 - Route + metadata + content render** -
  `app/air-conditioner/tune-up/[slug]/page.tsx` with
  `generateStaticParams()`, `generateMetadata()` from
  `titleTag`/`metaDescription`, `notFound()` for unknown slugs, and the same
  page body pattern as `app/air-conditioner/installation/[slug]/page.tsx`
  (swap the "Air Conditioner Installation" eyebrow copy for "Air Conditioner
  Tune-up"). *Done when:* `npm run build` generates both static routes; a
  live check confirms correct title/meta per slug, CDN image rendering, and a
  404 on an unknown slug.
- [x] **Step 3 - Fix the /air-conditioning tune-up card link** - update the
  `SERVICE_CARDS` entry in `app/air-conditioning/page.tsx` so "Air
  Conditioner Tune-up" links to `/air-conditioner/tune-up/residential`
  instead of the nonexistent `/air-conditioner/tune-up/tune-up`. *Done when:*
  the card link on `/air-conditioning` resolves to a real page instead of
  404ing.

## Files / areas

- `lib/ac-tuneups.ts` (new).
- `app/air-conditioner/tune-up/[slug]/page.tsx` (new).
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

Source file: `data/hvaclimate-cms-data/ac-tuneups.json` (2 entries, slugs:
`residential`, `air-filter-replacement`).

## Testing

No test runner declared in `AGENTS.md`; this rides on build + browser
evidence:

- `npm run build` must succeed (validates `generateStaticParams()` and
  `generateMetadata()` for both slugs).
- Browser check of both routes plus the 404 case, confirming title/meta
  description in page source and CDN image rendering.
- Visual check confirming the `/air-conditioning` tune-up card resolves to a
  real page.

## Notes for the AI

- Server components throughout - no `'use client'` needed.
- Match the AC installation page layout exactly; only the eyebrow label text
  and loader/route names change.
- Don't touch `types/service-page.ts` or `next.config.ts` - CDN host and
  interface are already confirmed present/correct.
- Only 2 entries in this collection (not 3+ like prior features) - don't
  assume a third slug exists.
