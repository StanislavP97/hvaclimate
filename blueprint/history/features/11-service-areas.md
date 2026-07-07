# Feature: Service Areas

**From build-plan:** feature 11
**Status:** complete

## Goal

Dynamic route `/service-areas/[slug]` (7 city pages: Vancouver WA, Portland OR,
Camas WA, Longview WA, Ridgefield WA, Battle Ground WA, Lake Oswego OR),
rendering `data/hvaclimate-cms-data/service-areas.json`, with real SEO
metadata and real CDN images. This repeats the exact `ServicePage` pattern
locked in by feature 4 (Gas Furnace) and reused through features 5-10
(Electric Furnace, AC Repair, AC Installation, AC Tune-up, Ventilation,
Commercial): same type, same loader shape, same page layout, same
`next/image` remote host (already configured).

## In scope

- `app/service-areas/[slug]/page.tsx` dynamic route, one page per JSON
  entry, `generateStaticParams()` from `service-areas.json`.
- `generateMetadata()` per slug using `titleTag` / `metaDescription` from
  the JSON.
- Render each entry's `content` (raw HTML string) via
  `dangerouslySetInnerHTML`, same as every prior sub-page feature.
- Real thumbnail/featuredImage rendered via `next/image` (CDN host
  `cdn.prod.website-files.com` already allowed in `next.config.ts`, no
  config change needed).
- `lib/service-areas.ts` data loader, mirroring `lib/commercials.ts`,
  reusing the existing `types/service-page.ts` `ServicePage` type as-is.
- 404 (via `notFound()`) for any slug not present in the JSON file.

## Out of scope

- Any change to `types/service-page.ts` or the render approach established
  in feature 4 - this feature reuses both verbatim.
- A `/service-areas` category/index page - the URL map
  (`blueprint/build-plan.md`) only lists `/service-areas/[slug]`, no bare
  `/service-areas` route, unlike Heating/Air Conditioning/Ventilation/
  Commercial which have category landing pages. `Header.tsx` and
  `MobileNav.tsx` already link to `/service-areas` (bare path) - that link
  will 404 until a future feature adds an index page or the link is
  changed; flagging it here, not fixing it now since it's not in this
  feature's scope per the URL map.
- Self-hosting images (still Webflow CDN).
- New content not present in the JSON.

> **Amended after Step 2**: the live Webflow site's city pages include an
> "Other Service Areas" cross-link grid (dark navy band, real city photos,
> links to the other 6 cities) - confirmed against a reference screenshot.
> This was wrongly excluded above ("cross-links, etc.") since it's a real
> part of the design, not new content. Added as Step 3.

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

- [x] **Step 1 - Data loader** - `lib/service-areas.ts` exporting
  `getServiceAreas()` and `getServiceAreaBySlug(slug)`, typed with the
  existing `ServicePage` interface. *Done when:* a throwaway check confirms
  all 7 entries load with correct typing.
- [x] **Step 2 - Service area route + metadata + content render** -
  `app/service-areas/[slug]/page.tsx` with `generateStaticParams()`,
  `generateMetadata()` from `titleTag`/`metaDescription`, `notFound()` for
  unknown slugs, and the same page body pattern as
  `app/commercial/[slug]/page.tsx` (swap the eyebrow copy to "Service
  Area"). *Done when:* `npm run build` generates all 7 static routes; a
  live check confirms correct title/meta per slug, CDN image rendering,
  and a 404 on an unknown slug.
- [x] **Step 3 - "Other Service Areas" cross-link grid** - new
  `OtherServiceAreas` component rendered at the bottom of each city page,
  dark navy band matching `ServiceCardGrid`'s styling, listing the other 6
  cities (excluding the current page's own city) as cards with real
  `thumbnail` image, city `name`, and a one-line description pulled from
  the entry, linking to `/service-areas/[slug]`. *Done when:* every one of
  the 7 pages shows exactly 6 other-city cards (never itself), each
  card's image and link are correct, and `npm run build` still passes.

## Files / areas

- `lib/service-areas.ts` (new).
- `app/service-areas/[slug]/page.tsx` (new/edit for Step 3).
- `components/services/OtherServiceAreas.tsx` (new, Step 3).
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

Source file: `data/hvaclimate-cms-data/service-areas.json` (7 entries,
slugs: `hvac-contractor-vancouver-wa`, `hvac-contractor-portland-or`,
`hvac-camas-wa`, `hvac-contractor-longview-wa`,
`hvac-contractor-ridgefield-wa`, `hvac-contractor-battleground-wa`,
`lake-oswego-or`).

## Testing

No test runner declared in `AGENTS.md`; this rides on build + browser
evidence:

- `npm run build` succeeds (validates `generateStaticParams()` and
  `generateMetadata()` for all 7 entries).
- Browser check of all 7 routes plus a 404 case, confirming title/meta
  description in page source and CDN image rendering.

## Notes for the AI

- Server components throughout - no `'use client'` needed.
- Match the commercial/ductwork/vent-cleaning page layout exactly; only the
  eyebrow label text, loader, and route name change.
- Don't touch `types/service-page.ts` or `next.config.ts` - CDN host and
  interface are already confirmed present/correct.
- All 7 `service-areas.json` entries have a non-null `keyword` (checked),
  but the type still allows `string | null` for consistency with the
  shared interface.
- Header/MobileNav already point to bare `/service-areas`, which has no
  route in this feature or the URL map - don't add one; it's flagged as
  out of scope, not silently fixed.
