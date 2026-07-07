# Feature: AC Installation sub-pages

**From build-plan:** feature 7
**Status:** complete

## Goal

Dynamic route `/air-conditioner/installation/[slug]` rendering the 3 AC
Installation CMS entries (`minisplit-installation`, `commercial`,
`residential`) from `data/hvaclimate-cms-data/ac-installations.json`, with
real SEO metadata and real images from the Webflow CDN. This repeats the exact
pattern locked in by feature 4 (Gas Furnace), feature 5 (Electric Furnace),
and feature 6 (AC Repair): same `ServicePage` shape, same loader pattern, same
page layout, same `next/image` remote host (already configured).

## In scope

- `app/air-conditioner/installation/[slug]/page.tsx` dynamic route, one page
  per JSON entry, `generateStaticParams()` from the JSON file.
- `generateMetadata()` per slug using `titleTag` / `metaDescription` from the
  JSON.
- Render the entry's `content` (raw HTML string) via `dangerouslySetInnerHTML`,
  same as the gas/electric furnace and AC repair pages.
- Real thumbnail/featuredImage rendered via `next/image` (CDN host
  `cdn.prod.website-files.com` already allowed in `next.config.ts` - no config
  change expected, confirm during Step 1).
- `lib/ac-installations.ts` data loader, mirroring `lib/ac-repairs.ts`,
  reusing the existing `types/service-page.ts` `ServicePage` type as-is.
- Fix the `/air-conditioning` category page's AC Installation card: it
  currently links to `/air-conditioner/installation/installation`, a slug
  that doesn't exist in the data (real slugs are `minisplit-installation`,
  `commercial`, `residential`). Point the card at `residential` (the general
  installation-services entry), matching how feature 6 fixed the repair
  card.
- 404 (via `notFound()`) for any slug not present in the JSON.

## Out of scope

- AC Tune-up, Ventilation, Commercial sub-pages - features 8-10, same
  pattern, separate specs.
- Any change to `types/service-page.ts` or the render approach established
  in feature 4 - this feature reuses both verbatim.
- Self-hosting images (still Webflow CDN).
- New content not present in the JSON (reviews, cross-links, etc.).
- Adding individual links for all 3 AC Installation slugs elsewhere on the
  site beyond the one existing card fix above.

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

- [x] **Step 1 - Data loader** - `lib/ac-installations.ts` exporting
  `getAcInstallations()` and `getAcInstallationBySlug(slug)`, typed with the
  existing `ServicePage` interface. *Done when:* a throwaway check confirms
  all 3 entries load with correct typing, and `cdn.prod.website-files.com`
  is confirmed present in `next.config.ts`'s `images.remotePatterns`.
- [x] **Step 2 - Route + metadata + content render** -
  `app/air-conditioner/installation/[slug]/page.tsx` with
  `generateStaticParams()`, `generateMetadata()` from
  `titleTag`/`metaDescription`, `notFound()` for unknown slugs, and the same
  page body pattern as `app/air-conditioner/repair/[slug]/page.tsx` (swap the
  "Air Conditioner Repair" eyebrow copy for "Air Conditioner Installation").
  *Done when:* `npm run build` generates all 3 static routes; a live check
  confirms correct title/meta per slug, CDN image rendering, and a 404 on an
  unknown slug.
- [x] **Step 3 - Fix the /air-conditioning installation card link** - update
  the `SERVICE_CARDS` entry in `app/air-conditioning/page.tsx` so "Air
  Conditioner Installation" links to `/air-conditioner/installation/residential`
  instead of the nonexistent `/air-conditioner/installation/installation`.
  *Done when:* the card link on `/air-conditioning` resolves to a real page
  instead of 404ing.

## Files / areas

- `lib/ac-installations.ts` (new).
- `app/air-conditioner/installation/[slug]/page.tsx` (new).
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

Source file: `data/hvaclimate-cms-data/ac-installations.json` (3 entries,
slugs: `minisplit-installation`, `commercial`, `residential`).

## Testing

No test runner declared in `AGENTS.md`; this rides on build + browser
evidence:

- `npm run build` must succeed (validates `generateStaticParams()` and
  `generateMetadata()` for all 3 slugs).
- Browser check of 2+ routes plus the 404 case, confirming title/meta
  description in page source and CDN image rendering.
- Visual check confirming the `/air-conditioning` installation card resolves
  to a real page.

## Notes for the AI

- Server components throughout - no `'use client'` needed.
- Match the AC repair page layout exactly; only the eyebrow label text and
  loader/route names change.
- Don't touch `types/service-page.ts` or `next.config.ts` unless Step 1
  reveals something genuinely missing (unexpected - confirm before editing).
