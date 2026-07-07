# Feature: Gas Furnace sub-pages

**From build-plan:** feature 4
**Status:** complete

## Goal

Dynamic route `/heating/gas-furnace/[slug]` rendering the 7 Gas Furnace CMS
entries (repair, installation, maintenance, tune-up, upgrade, replacement,
emergency-repair) from `data/hvaclimate-cms-data/gas-furnaces.json`, with real
SEO metadata and real images from the Webflow CDN. This is the first CMS-backed
dynamic route in the app, so it also locks the data-loading pattern, the shared
service sub-page shape, and the `next/image` remote-host config that every
later sub-page feature (5-12) will reuse.

## In scope

- `app/heating/gas-furnace/[slug]/page.tsx` dynamic route, one page per JSON
  entry, `generateStaticParams()` from the JSON file.
- `generateMetadata()` per slug using `titleTag` / `metaDescription` from the
  JSON (falls back to a sane default only if a field is genuinely empty).
- Render the entry's `content` (a raw HTML string) safely into the page body.
- Real thumbnail/featuredImage rendered via `next/image`, which requires adding
  `images.remotePatterns` for `cdn.prod.website-files.com` to `next.config.ts`.
- A small shared data-loading helper (`lib/gas-furnaces.ts` or similar) that
  reads and types the JSON - this is the pattern features 5-12 will copy for
  their own collections.
- Update `/heating` page's service links so all 7 slugs are reachable (today
  only `repair`, `installation`, `maintenance` are linked; `tune-up`, `upgrade`,
  `replacement`, `emergency-repair` have no entry point yet).
- 404 (via `notFound()`) for any slug not present in the JSON.

## Out of scope

- Electric Furnace, AC, Ventilation, Commercial sub-pages - features 5-12,
  same pattern, separate specs.
- Rich text / markdown rendering beyond the raw HTML Webflow already exported
  (no migration to a structured rich-text format).
- Self-hosting images (still pointing at the Webflow CDN for now, per
  project-overview.md's open questions).
- Reviews band content, related-services cross-links, or any content not
  present in the JSON today.

## Build loop

Build one step at a time, never the whole feature at once.

1. Plan mode lays out the step before any code.
2. The AI implements just that step.
3. It shows the diff (not full files); you read it and understand it.
4. You approve, then choose whether to commit a checkpoint or roll straight on.
   Checkpoints are optional; `/complete` makes the real feature-level commit at the end.

Never accept a step you haven't read. If a diff is too big to review, the step was too big, so split it.

## Build steps

- [x] **Step 1 - Data types + loader** - add `types/service-page.ts` (shared
  `ServicePage` interface matching the real JSON shape: `id`, `slug`, `name`,
  `titleTag`, `metaDescription`, `keyword`, `thumbnail`, `featuredImage`,
  `altText`, `content`) and `lib/gas-furnaces.ts` exporting `getGasFurnaces()`
  and `getGasFurnaceBySlug(slug)`. *Done when:* a throwaway script or the
  Next.js build can import and log all 7 entries with correct typing.
- [x] **Step 2 - Allow the Webflow CDN in next/image** - add
  `images.remotePatterns` to `next.config.ts` for `cdn.prod.website-files.com`.
  *Done when:* `npm run build` succeeds and a test `<Image>` pointed at one of
  the real thumbnail URLs renders without a Next.js image-host error.
- [x] **Step 3 - Route + metadata + content render** -
  `app/heating/gas-furnace/[slug]/page.tsx` with `generateStaticParams()`,
  `generateMetadata()` from `titleTag`/`metaDescription`, `notFound()` for
  unknown slugs, and the page body: hero (name, featuredImage via
  `next/image`), the CMS `content` HTML, and the existing
  `ServiceContentSidebar`. *Done when:* all 7 routes
  (`/heating/gas-furnace/repair`, `/installation`, `/maintenance`, `/tune-up`,
  `/upgrade`, `/replacement`, `/emergency-repair`) return 200 with correct
  title/description in page source, and an unknown slug
  (`/heating/gas-furnace/nope`) 404s.
- [x] **Step 4 - Wire up all 7 links from /heating** - update
  `SERVICE_CARDS` / inline content links on `app/heating/page.tsx` so
  `tune-up`, `upgrade`, `replacement`, and `emergency-repair` are reachable,
  not just the 3 slugs already linked. *Done when:* every one of the 7 sub-page
  URLs is clickable from `/heating` in the browser.

## Files / areas

- `types/service-page.ts` (new) - shared shape for this and features 5-12.
- `lib/gas-furnaces.ts` (new).
- `app/heating/gas-furnace/[slug]/page.tsx` (new).
- `next.config.ts` (edit - add remotePatterns).
- `app/heating/page.tsx` (edit - link all 7 slugs).
- Reuses existing `components/services/ServiceContentSidebar.tsx` and
  `components/services/ServiceTrustBar.tsx` if it fits the layout; no new
  shared components expected.

## Data / contracts

`ServicePage` (locked here, reused verbatim by features 5-12 against their own
JSON files):

```ts
interface ServicePage {
  id: string;
  slug: string;
  name: string;
  titleTag: string;
  metaDescription: string;
  keyword: string | null;
  thumbnail: string;   // Webflow CDN URL
  featuredImage: string; // Webflow CDN URL
  altText: string;
  content: string;     // raw HTML string from Webflow rich text
}
```

Source file: `data/hvaclimate-cms-data/gas-furnaces.json` (note: nested one
level deeper than the `data/gas-furnaces.json` path in
`blueprint/build-plan.md`'s CMS map - the loader should point at the actual
path; update the build-plan's map to match once this step lands).

## Testing

No test runner is declared in `AGENTS.md` yet, so this rides on build + browser
evidence, not unit tests:

- `npm run build` succeeds (validates `generateStaticParams()` and
  `generateMetadata()` for all 7 slugs).
- Browser check of at least 2 of the 7 routes plus the 404 case (unknown
  slug), confirming title/meta description in page source and that the image
  loads from the Webflow CDN without a Next.js image config error.
- Visual check that `/heating` links to all 7 slugs and each resolves.

If `content` HTML rendering introduces any slug/formatting parsing logic
(rather than a direct `dangerouslySetInnerHTML`), flag it during /implement -
that would be in-scope logic and should get a unit test per coding-standards.md.

## Notes for the AI

- `content` is trusted CMS data authored by the business, not user input, but
  confirm the render approach (raw HTML injection) explicitly during
  implementation rather than defaulting to it silently - note any XSS
  implications given this content originates from an external export.
- Keep this a server component; no interactivity needed.
- Match the visual pattern already established by `app/heating/page.tsx` and
  the `ServiceHero` / `ServiceContentSidebar` components rather than
  inventing new layout.
- `keyword` is `null` on 2 of the 7 entries - don't assume it's always present.
- This is the template for features 5-12: once this lands, later specs should
  point back to this pattern instead of re-deriving it.
