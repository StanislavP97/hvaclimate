# Feature: Rebate Programs

**From build-plan:** feature 12
**Status:** complete

## Goal

Dynamic route `/rebate-programs/[slug]` rendering the 4 entries in
`data/hvaclimate-cms-data/rebate-programs.json` (heat pump water heater,
smart thermostat, ductless heat pump, heat pump). This repeats the exact
`ServicePage` pattern locked in by feature 4 (Gas Furnace) and reused
through features 5-11 (Electric Furnace, AC Repair, AC Installation, AC
Tune-up, Ventilation, Commercial, Service Areas): same type, same loader
shape, same page layout, same `next/image` remote host (already
configured).

Note: `project-overview.md` and `build-plan.md` both say "3 program
pages," but the actual JSON has 4 entries. Build all 4 - the JSON file is
the source of truth, and the doc's count is stale, not a scope boundary.

## In scope

- `app/rebate-programs/[slug]/page.tsx` dynamic route, one page per JSON
  entry, `generateStaticParams()` from `rebate-programs.json`.
- `generateMetadata()` per slug using `titleTag` / `metaDescription` from
  the JSON.
- Render each entry's `content` (raw HTML string) via
  `dangerouslySetInnerHTML`, same as every prior sub-page feature.
- Real thumbnail/featuredImage rendered via `next/image` (CDN host
  `cdn.prod.website-files.com` already allowed in `next.config.ts`, no
  config change needed).
- `lib/rebate-programs.ts` data loader, mirroring `lib/service-areas.ts`,
  reusing the existing `types/service-page.ts` `ServicePage` type as-is.
- 404 (via `notFound()`) for any slug not present in the JSON file.
- Fix `Footer.tsx`'s `REBATE_LINKS`: all 4 currently point to the bare
  `/rebate-programs` path even though each has a distinct label. Point
  each to its real slug (`heat-pump-water-heater-program`,
  `smart-thermostat-program`, `ductless-heat-pump-program`,
  `heat-pump-program`) now that the destination pages exist. Small,
  in-scope fix - the data needed to do it correctly didn't exist until
  this feature builds the pages.

## Out of scope

- Any change to `types/service-page.ts` or the render approach established
  in feature 4 - this feature reuses both verbatim.
- A `/rebate-programs` category/index page - the URL map
  (`blueprint/build-plan.md`) only lists `/rebate-programs/[slug]`, no bare
  `/rebate-programs` route, same situation as `/service-areas` in feature
  11. `Header.tsx` ("Rebates" link) and `MobileNav.tsx` already link to
  the bare `/rebate-programs` path - that link will 404 until a future
  feature adds an index page or the link is changed; flagging it here, not
  fixing it now since it's not in this feature's scope per the URL map.
  (Footer is different - see In scope - it has 4 distinct labels that map
  cleanly to the 4 real slugs, so fixing it is a same-shape, low-risk
  correction rather than a new route.)
- Self-hosting images (still Webflow CDN).
- New content not present in the JSON.
- Correcting the "3 program pages" count in `project-overview.md` /
  `build-plan.md` - out of scope for a build feature; flagged above so
  it's not silently ignored.

> **Amended after Step 3**: a reference screenshot of the live
> `/rebate-programs/heat-pump-program` page shows a "Related services"
> section below the content (white background, "Get Rebate" CTA button in
> the section header, 3 cards for the other rebate programs with a rating
> badge, name, and "View service" link) that wasn't in the original scope.
> This mirrors the "Other Service Areas" cross-link grid added to feature
> 11 for the same reason - it's a real part of the design revealed by the
> screenshot, not new content. Added as Step 4.

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

- [x] **Step 1 - Data loader** - `lib/rebate-programs.ts` exporting
  `getRebatePrograms()` and `getRebateProgramBySlug(slug)`, typed with the
  existing `ServicePage` interface. *Done when:* a throwaway check confirms
  all 4 entries load with correct typing.
- [x] **Step 2 - Rebate program route + metadata + content render** -
  `app/rebate-programs/[slug]/page.tsx` with `generateStaticParams()`,
  `generateMetadata()` from `titleTag`/`metaDescription`, `notFound()` for
  unknown slugs, and the same page body pattern as
  `app/commercial/[slug]/page.tsx` (swap the eyebrow copy to "Rebate
  Program"). *Done when:* `npm run build` generates all 4 static routes; a
  live check confirms correct title/meta per slug, CDN image rendering,
  and a 404 on an unknown slug.
- [x] **Step 3 - Fix Footer rebate links** - update `REBATE_LINKS` in
  `components/layout/Footer.tsx` so each of the 4 labels links to its real
  slug under `/rebate-programs/[slug]` instead of the bare path. *Done
  when:* each footer rebate link navigates to its correct, distinct page.
- [x] **Step 4 - "Related services" cross-link section** - new
  `RelatedRebatePrograms` component rendered at the bottom of each rebate
  program page, matching the reference screenshot: white background band,
  "Related services" heading with a "Get Rebate" button linking to
  `/contact`, and a card grid of the other rebate programs (excluding the
  current page's own program) showing each entry's `thumbnail` image, a
  static 5-star rating badge (no real rating data exists in the JSON), the
  program `name`, and a "View service" link to `/rebate-programs/[slug]`.
  *Done when:* every one of the 4 pages shows exactly 3 other-program
  cards (never itself), each card's image and link are correct, and
  `npm run build` still passes.

## Files / areas

- `lib/rebate-programs.ts` (new).
- `app/rebate-programs/[slug]/page.tsx` (new/edit for Step 4).
- `components/layout/Footer.tsx` (edit, Step 3).
- `components/services/RelatedRebatePrograms.tsx` (new, Step 4).
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

Source file: `data/hvaclimate-cms-data/rebate-programs.json` (4 entries,
slugs: `heat-pump-water-heater-program`, `smart-thermostat-program`,
`ductless-heat-pump-program`, `heat-pump-program`).

## Testing

No test runner declared in `AGENTS.md`; this rides on build + browser
evidence:

- `npm run build` succeeds (validates `generateStaticParams()` and
  `generateMetadata()` for all 4 entries).
- Browser check of all 4 routes plus a 404 case, confirming title/meta
  description in page source and CDN image rendering.
- Browser check that all 4 Footer rebate links land on distinct, correct
  pages.

## Notes for the AI

- Server components throughout - no `'use client'` needed.
- Match the commercial/service-areas page layout exactly; only the eyebrow
  label text, loader, and route name change.
- Don't touch `types/service-page.ts` or `next.config.ts` - CDN host and
  interface are already confirmed present/correct.
- Build all 4 JSON entries, not the "3" mentioned in
  `project-overview.md`/`build-plan.md` - the JSON file is the source of
  truth.
- Header/MobileNav already point to bare `/rebate-programs`, which has no
  route in this feature or the URL map - don't add one; it's flagged as
  out of scope, not silently fixed. Only Footer gets fixed (see In scope).
