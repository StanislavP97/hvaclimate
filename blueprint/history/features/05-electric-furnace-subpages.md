# Feature: Electric Furnace sub-pages

**From build-plan:** feature 5
**Status:** complete

## Goal

Dynamic route `/heating/electric-furnace/[slug]` rendering the 7 Electric
Furnace CMS entries (repair, installation, maintenance, tune-up, upgrade,
replacement, emergency-repair) from
`data/hvaclimate-cms-data/electric-furnaces.json`, with real SEO metadata and
real images from the Webflow CDN. This repeats the exact pattern feature 4
(Gas Furnace) already locked in: same `ServicePage` shape, same loader
pattern, same page layout, same `next/image` remote host (already configured).

## In scope

- `app/heating/electric-furnace/[slug]/page.tsx` dynamic route, one page per
  JSON entry, `generateStaticParams()` from the JSON file.
- `generateMetadata()` per slug using `titleTag` / `metaDescription` from the
  JSON.
- Render the entry's `content` (raw HTML string) via `dangerouslySetInnerHTML`,
  same as the gas furnace page.
- Real thumbnail/featuredImage rendered via `next/image` (CDN host already
  allowed in `next.config.ts` from feature 4 — no config change expected,
  confirm during Step 1).
- `lib/electric-furnaces.ts` data loader, mirroring `lib/gas-furnaces.ts`,
  reusing the existing `types/service-page.ts` `ServicePage` type as-is.
- Update `/heating` page's Electric Furnace service list so all 7 slugs are
  reachable — today the electric furnace prose list (`ELECTRIC_FURNACE_SERVICES`)
  has no links at all, and the "Electric Furnace" service card links to
  `/heating/electric-furnace/repair`, a route that doesn't exist until this
  feature ships.
- 404 (via `notFound()`) for any slug not present in the JSON.

## Out of scope

- AC, Ventilation, Commercial sub-pages — features 6-12, same pattern,
  separate specs.
- Any change to `types/service-page.ts` or the render approach established in
  feature 4 — this feature reuses both verbatim.
- Self-hosting images (still Webflow CDN).
- New content not present in the JSON (reviews, cross-links, etc.).

## Build steps

- [x] **Step 1 - Data loader** - `lib/electric-furnaces.ts` exporting
  `getElectricFurnaces()` and `getElectricFurnaceBySlug(slug)`, typed with the
  existing `ServicePage` interface. Verified: throwaway script loaded all 7
  entries with correct typing; `cdn.prod.website-files.com` already present in
  `next.config.ts`'s `images.remotePatterns` from feature 4.
- [x] **Step 2 - Route + metadata + content render** -
  `app/heating/electric-furnace/[slug]/page.tsx` with `generateStaticParams()`,
  `generateMetadata()` from `titleTag`/`metaDescription`, `notFound()` for
  unknown slugs, and the same page body pattern as
  `app/heating/gas-furnace/[slug]/page.tsx`. Verified: `npm run build`
  generated all 7 static routes; live check confirmed correct title/meta per
  slug, CDN image rendering, and 404 on an unknown slug.
- [x] **Step 3 - Wire up all 7 links from /heating** - added `href` to each
  `ELECTRIC_FURNACE_SERVICES` item and linkified the list, matching
  `GAS_FURNACE_SERVICES`. Verified: all 7 links present with correct hrefs on
  `/heating`.

## Files / areas

- `lib/electric-furnaces.ts` (new).
- `app/heating/electric-furnace/[slug]/page.tsx` (new).
- `app/heating/page.tsx` (edit - linked all 7 `ELECTRIC_FURNACE_SERVICES` items).
- Reused `types/service-page.ts`, `components/services/ServiceContentSidebar.tsx`
  unchanged.
- `next.config.ts` - unchanged (CDN host already allowed).

## Data / contracts

Reused the `ServicePage` interface locked in feature 4, unchanged:

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

Source file: `data/hvaclimate-cms-data/electric-furnaces.json` (7 entries,
slugs: `repair`, `installation`, `maintenance`, `tune-up`, `upgrade`,
`replacement`, `emergency-repair`).

## Testing

No test runner declared in `AGENTS.md`; this rode on build + browser evidence:

- `npm run build` succeeded (validated `generateStaticParams()` and
  `generateMetadata()` for all 7 slugs).
- Browser check of 2+ routes plus the 404 case confirmed title/meta
  description in page source and CDN image rendering.
- Visual check confirmed `/heating` links to all 7 electric furnace slugs and
  each resolves.
