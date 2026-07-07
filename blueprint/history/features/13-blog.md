# Feature: Blog

**From build-plan:** feature 13
**Status:** complete

## Goal

Add the blog to the site: a `/blog` listing page, individual `/blog/[slug]`
post pages, and `/blog-post-categories/[slug]` category filter pages, all
driven by `data/hvaclimate-cms-data/blog-posts.json` and `blog-categories.json`.
This is the last content-collection feature before the site-wide SEO layer
(feature 15), so its routing and metadata pattern must match the other
sub-page collections already built (commercial, rebate programs, etc.).

## Design reference

No Webflow screenshots provided for blog pages. Build using the same visual
language already established by `ServiceHero`, `ServiceCardGrid`,
`ServiceContentSidebar`, and the commercial/rebate sub-page layout
(`app/commercial/[slug]/page.tsx`) — two-column content + sidebar, prose
styling via `dangerouslySetInnerHTML` for rich-text `content`. If the result
looks materially off once built, get real screenshots before polishing further.

## In scope

- `/blog` — listing page: all posts, newest first (`publishedDate` desc), card
  grid with thumbnail, name, excerpt, category badge/link, and a link to each
  post.
- `/blog/[slug]` — individual post page: featured image, title, category
  badge/link back to its category page, rendered `content` (rich text), SEO
  metadata from `titleTag`/`metaDescription`.
- `/blog-post-categories/[slug]` — category page: same card-grid listing as
  `/blog`, filtered to posts where `categorySlug` matches, using the
  category's own `titleTag`/`metaDescription` for SEO.
- `generateStaticParams` + `generateMetadata` on both dynamic routes, matching
  the pattern in `app/commercial/[slug]/page.tsx`.
- `lib/blog-posts.ts` and `lib/blog-categories.ts` data-access modules, plus
  `types/blog.ts` for the two shapes (they differ from the shared
  `ServicePage` shape used by other sub-pages — see Data/contracts).

## Out of scope

- Pagination (only 4 posts exist; add later if the collection grows).
- Related-posts / "read next" widget.
- Comments, tags beyond category, author bios, reading-time estimates.
- RSS feed / sitemap wiring (feature 15).
- Any change to `ServiceContentSidebar` or global nav — Footer already links
  `/blog`; no other nav entry point is defined for categories, so category
  pages are only reachable from a post's category badge for now.

## Build loop

Build one step at a time, never the whole feature at once.

1. Plan mode lays out the step before any code.
2. The AI implements just that step.
3. It shows the diff (not full files); you read it and understand it.
4. You approve, then choose whether to commit a checkpoint or roll straight on.
   Checkpoints are optional; `/complete` makes the real feature-level commit at the end.

Never accept a step you haven't read. If a diff is too big to review, the step was too big, so split it.

## Build steps

- [x] **Step 1 - Types and data-access layer** - Add `types/blog.ts` with
  `BlogPost` and `BlogCategory` interfaces matching the actual JSON shape
  (see Data/contracts). Add `lib/blog-posts.ts` (`getBlogPosts`,
  `getBlogPostBySlug`, `getBlogPostsByCategorySlug`, sorted by
  `publishedDate` descending) and `lib/blog-categories.ts`
  (`getBlogCategories`, `getBlogCategoryBySlug`). *Done when:* TypeScript
  compiles with no `any`, and a quick manual check (e.g. a temporary log or
  the Node REPL) confirms `getBlogPosts()` returns 4 posts sorted newest
  first and `getBlogPostsByCategorySlug("tips")` returns the 2 tips posts.

- [x] **Step 2 - Shared blog card grid component** - Add
  `components/blog/BlogCard.tsx` (thumbnail via `next/image`, name, excerpt,
  category badge linking to `/blog-post-categories/[categorySlug]`, link to
  `/blog/[slug]`) and `components/blog/BlogCardGrid.tsx` (renders a list of
  `BlogCard`s in a responsive grid, plus an empty state for zero posts).
  *Done when:* component compiles and renders correctly in isolation via the
  listing page built in Step 3.

- [x] **Step 3 - `/blog` listing page** - `app/blog/page.tsx` using
  `generateMetadata`/static `metadata`, `ServiceHero`-style header, and
  `BlogCardGrid` fed by `getBlogPosts()`. *Done when:* visiting `/blog` in
  the browser shows all 4 posts with working thumbnails, newest first, and
  each card links to its post.

- [x] **Step 4 - `/blog/[slug]` post page** - `app/blog/[slug]/page.tsx`
  with `generateStaticParams`, `generateMetadata` (from `titleTag`/
  `metaDescription`), featured image, title, category badge, and rendered
  `content` via the same prose classes used in
  `app/commercial/[slug]/page.tsx`, plus `ServiceContentSidebar`. Call
  `notFound()` for an unknown slug. *Done when:* visiting each of the 4 post
  URLs renders full content and image; an invalid slug (e.g.
  `/blog/does-not-exist`) 404s; view-source shows the correct `<title>` and
  meta description per post.

- [x] **Step 5 - `/blog-post-categories/[slug]` category page** -
  `app/blog-post-categories/[slug]/page.tsx` with `generateStaticParams`
  (from `getBlogCategories()`), `generateMetadata` (from the category's own
  `titleTag`/`metaDescription`), a header using the category `name`, and
  `BlogCardGrid` filtered to that category. Call `notFound()` for an unknown
  category slug. *Done when:* `/blog-post-categories/tips` shows only the 2
  tips posts, `/blog-post-categories/articles` shows only the 2 articles
  posts, `/blog-post-categories/resource` shows the empty state (0 posts),
  and an invalid category slug 404s.

## Files / areas

- `types/blog.ts` (new)
- `lib/blog-posts.ts` (new)
- `lib/blog-categories.ts` (new)
- `components/blog/BlogCard.tsx` (new)
- `components/blog/BlogCardGrid.tsx` (new)
- `app/blog/page.tsx` (new)
- `app/blog/[slug]/page.tsx` (new)
- `app/blog-post-categories/[slug]/page.tsx` (new)
- Reuses: `components/services/ServiceHero.tsx`,
  `components/services/ServiceContentSidebar.tsx`

## Data / contracts

Blog data does **not** match the shared `ServicePage` shape used by every
other sub-page collection — it has its own fields. Lock these now:

```ts
// types/blog.ts
export interface BlogCategory {
  id: string;
  slug: string;
  name: string;
  titleTag: string;
  metaDescription: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  name: string;
  titleTag: string;
  metaDescription: string;
  excerpt: string;
  content: string;
  thumbnail: string;
  featuredImage: string;
  altText: string;
  categoryId: string;
  categorySlug: string;
  publishedDate: string; // ISO 8601
  featured: boolean;
}
```

`categorySlug` on `BlogPost` is the join key to `BlogCategory.slug` — use it
directly rather than `categoryId`, since routing is slug-based throughout the
rest of the app. `featured` is not used by any step in this spec (no
"featured post" UI is in scope) but is locked here since it's already in the
data and a later feature may use it.

## Testing

No test runner is declared in `AGENTS.md` yet, so this feature rides on
browser/build evidence, matching every other sub-page collection already
shipped. If a `test` command gets added later, `getBlogPostsByCategorySlug`
and the `publishedDate` sort in `lib/blog-posts.ts` would be the first
candidates (pure logic with real edge cases: unknown category slug, empty
result).

- `npm run build` must succeed with no type errors after each step.
- Step 3-5: manually click through `/blog`, each post, and each category page
  per the done-whens above.

## Notes for the AI

- Server components throughout; no `'use client'` needed anywhere in this
  feature.
- Follow the `app/commercial/[slug]/page.tsx` pattern exactly for
  `generateStaticParams`/`generateMetadata`/`notFound()` — don't invent a new
  shape.
- `content` is trusted rich text from the CMS export (same pattern as
  existing sub-pages' `dangerouslySetInnerHTML` usage) — no sanitization
  library is used elsewhere in this codebase, stay consistent.
- Image domain `cdn.prod.website-files.com` is already whitelisted in
  `next.config.ts` — no config change needed.
- Category badge on `BlogCard`/post page links to
  `/blog-post-categories/[categorySlug]`, per the URL map in
  `build-plan.md`.
- Don't add a header/nav entry for blog categories — out of scope; only the
  existing Footer "Blog" link and in-page category badges are needed.
