# Feature: Commercial sub-pages

**From build-plan:** feature 10
**Status:** complete

## Goal

Dynamic route `/commercial/[slug]` (6 entries), rendering
`data/hvaclimate-cms-data/commercials.json`, with real SEO metadata and real
CDN images. This repeats the exact `ServicePage` pattern locked in by feature
4 (Gas Furnace) and reused through features 5-9 (Ventilation): same type,
same loader shape, same page layout, same `next/image` remote host (already
configured).

## In scope

- `app/commercial/[slug]/page.tsx` dynamic route, one page per JSON entry,
  `generateStaticParams()` from `commercials.json`.
- `generateMetadata()` per slug using `titleTag` / `metaDescription` from the
  JSON.
- Render each entry's `content` (raw HTML string) via
  `dangerouslySetInnerHTML`, same as every prior sub-page feature.
- Real thumbnail/featuredImage rendered via `next/image` (CDN host
  `cdn.prod.website-files.com` already allowed in `next.config.ts`, no
  config change needed).
- `lib/commercials.ts` data loader, mirroring `lib/ductworks.ts`, reusing the
  existing `types/service-page.ts` `ServicePage` type as-is.
- Fix the `/commercial` category page's `SERVICE_CARDS` `href`s in
  `app/commercial/page.tsx` - none of the 4 current hrefs match a real slug
  in `commercials.json`:
  - "Commercial HVAC Maintenance Services" -> `hvac-maintenance` -> should be
    `/commercial/hvac-maintenance-services`.
  - "Hood Repair and Maintenance Services" -> `hood-cooktop` -> should be
    `/commercial/hood-repair-and-maintenance-services`.
  - "Cooktop Repair and Maintenance Services" -> `hood-cooktop` (duplicate,
    shared with Hood card) -> should be its own real slug,
    `/commercial/cooktop-repair-and-maintenance-services`.
  - "Commercial Ovens Repair" -> `ovens-repair` -> already correct
    (`/commercial/ovens-repair` is a real slug) - no change.
  - "Pizza Ovens Service" -> `ovens-repair` (duplicate, shared with Ovens
    Repair card) -> should be its own real slug,
    `/commercial/pizza-ovens-service`.
  - "Refrigeration Systems Maintenance" -> `refrigeration` -> should be
    `/commercial/refrigeration-systems-maintenance`.
- 404 (via `notFound()`) for any slug not present in the JSON file.

## Out of scope

- Any change to `types/service-page.ts` or the render approach established
  in feature 4 - this feature reuses both verbatim.
- Self-hosting images (still Webflow CDN).
- New content not present in the JSON (reviews, cross-links, etc.).
- Rewriting the prose sections on `/commercial/page.tsx` itself - only the 6
  card `href`s change.

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

- [x] **Step 1 - Data loader** - `lib/commercials.ts` exporting
  `getCommercials()` and `getCommercialBySlug(slug)`, typed with the existing
  `ServicePage` interface. *Done when:* a throwaway check confirms all 6
  entries load with correct typing.
- [x] **Step 2 - Commercial route + metadata + content render** -
  `app/commercial/[slug]/page.tsx` with `generateStaticParams()`,
  `generateMetadata()` from `titleTag`/`metaDescription`, `notFound()` for
  unknown slugs, and the same page body pattern as
  `app/ventilation/ductwork/[slug]/page.tsx` (swap the eyebrow copy to
  "Commercial Services"). *Done when:* `npm run build` generates all 6
  static routes; a live check confirms correct title/meta per slug, CDN
  image rendering, and a 404 on an unknown slug.
- [x] **Step 3 - Fix the /commercial category card links** - update the
  `SERVICE_CARDS` entries in `app/commercial/page.tsx` per the 6 href
  mappings listed in Scope above. *Done when:* all 6 card links on
  `/commercial` resolve to real, distinct pages instead of 404ing or
  colliding with each other.

## Files / areas

- `lib/commercials.ts` (new).
- `app/commercial/[slug]/page.tsx` (new).
- `app/commercial/page.tsx` (edit - fix 5 of 6 `href`s).
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

Source file: `data/hvaclimate-cms-data/commercials.json` (6 entries, slugs:
`hvac-maintenance-services`, `hood-repair-and-maintenance-services`,
`cooktop-repair-and-maintenance-services`, `ovens-repair`,
`pizza-ovens-service`, `refrigeration-systems-maintenance`).

## Testing

No test runner declared in `AGENTS.md`; this rode on build + browser
evidence:

- `npm run build` succeeded (validates `generateStaticParams()` and
  `generateMetadata()` for all 6 entries).
- Browser check of all 6 routes plus a 404 case, confirming title/meta
  description in page source and CDN image rendering.
- Visual check confirming all 6 fixed `/commercial` cards resolve to real,
  distinct pages.

## Notes for the AI

- Server components throughout - no `'use client'` needed.
- Match the ductwork/vent-cleaning page layout exactly; only the eyebrow
  label text, loader, and route name change.
- Don't touch `types/service-page.ts` or `next.config.ts` - CDN host and
  interface are already confirmed present/correct.
- `keyword` is `null` for several entries in `commercials.json` - the
  `ServicePage` type already allows `string | null`, so no type change
  needed.
- Two of the current card hrefs are accidental duplicates (`hood-cooktop`
  used by two different cards, `ovens-repair` used by two different cards) -
  give each of the 6 cards its own distinct real slug.
