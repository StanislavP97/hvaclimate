# Feature: Performance & QA

**From build-plan:** feature 17
**Status:** complete

## Goal

Close out the Webflow → Next.js migration with a performance and correctness
pass: confirm images are optimized, measure LCP against the 2.5s target, verify
every route in the URL map resolves 1:1 against Webflow, and add 301 redirects
for any slug that doesn't match. This is the last gate before the site is
considered migration-complete.

## In scope

- Audit every `next/image` usage for correct sizing (explicit `width`/`height`
  or `fill` + sized container) and confirm no raw `<img>` tags exist.
- Confirm `priority` is set on above-the-fold LCP images per route template
  (hero images, category page headers), not just the homepage.
- Run a production build and measure LCP on the homepage and one representative
  page from each route family (service sub-page, service area, blog post) using
  Lighthouse/PageSpeed against the local production server.
- Walk the full URL map in `build-plan.md` and confirm every listed route
  resolves with a 200 and correct content in the running app (no 404s, no
  placeholder content).
- Confirm all dynamic `[slug]` routes render for every entry in their backing
  JSON file (no orphaned CMS entries with no matching page).
- Add a `redirects()` block to `next.config.ts` for any slug found to differ
  from the original Webflow `publishedPath` during this audit.
- Fix any image sizing, missing metadata, or broken link found during the
  audit as part of this feature (small, targeted fixes only).

## Out of scope

- Any new pages, sections, or content — this feature only verifies and tunes
  what already exists.
- CDN migration of images off `cdn.prod.website-files.com` to self-hosted
  assets (flagged as a later concern in `project-overview.md`, not this pass).
- Broader Lighthouse categories (accessibility, best practices, SEO score) —
  only LCP/performance is in scope; SEO tags were already covered in feature 15.
- Real device / field performance monitoring (Vercel Analytics, CrUX) — this
  pass is a local, pre-deploy check only.

## Build loop

Build one step at a time, never the whole feature at once.

1. Plan mode lays out the step before any code.
2. The AI implements just that step.
3. It shows the diff (not full files); you read it and understand it.
4. You approve, then choose whether to commit a checkpoint or roll straight on.
   Checkpoints are optional; `/complete` makes the real feature-level commit at the end.

Never accept a step you haven't read. If a diff is too big to review, the step was too big, so split it.

## Build steps

- [x] **Step 1 - Image audit** - Grep every `next/image` usage across `app/`
      and `components/`, confirm each has explicit `width`/`height` or `fill`
      with a sized/relative parent, and confirm `priority` is set on the LCP
      image for each route template (home hero, service category header,
      service sub-page header, blog post header, service area header). Fix any
      missing sizing or priority found. *Done when:* no raw `<img>` tags exist,
      every `next/image` call has explicit sizing, and `priority` is set on the
      one largest above-the-fold image per route template — confirmed by grep
      output and a code read-through.

- [x] **Step 2 - Production LCP measurement** - Run `npm run build && npm run
      start`, then run Lighthouse (CLI or Chrome DevTools) against the
      homepage and one page from each of: a service sub-page
      (`/heating/gas-furnace/[slug]`), a service area page
      (`/service-areas/[slug]`), and a blog post (`/blog/[slug]`). Record LCP
      for each. If any exceed 2.5s, diagnose (usually image size/format or
      missing `priority`) and fix. *Done when:* all four sampled pages report
      LCP < 2.5s in the Lighthouse output, pasted into the step notes.

- [x] **Step 3 - URL map verification** - With the production server running,
      request every route listed in the URL map table in `build-plan.md`
      (static routes directly; for each dynamic route, at least one real slug
      from its backing JSON file) and confirm a 200 status and non-placeholder
      content. Cross-check every entry in each CMS JSON file
      (`data/hvaclimate-cms-data/*.json`) has a rendering page — no orphaned
      slugs. *Done when:* every URL map route returns 200, and a spot-check
      table (route → status) is recorded in the step notes with zero
      mismatches.

- [x] **Step 4 - Redirects for any changed slugs** - Based on Step 3's
      findings, if any route's actual slug differs from the Webflow
      `publishedPath`, add a `redirects()` entry in `next.config.ts` mapping
      old path → new path with `permanent: true`. If Step 3 found zero
      mismatches, state that explicitly and skip the code change. *Done when:*
      either `next.config.ts` has a redirect per confirmed mismatch and each
      redirect is verified with a manual request (302/308 to the right
      target), or the step notes confirm no mismatches exist so no redirects
      are needed.

      **Result:** Step 3 found zero slug mismatches against the URL map — all
      21 routes resolved exactly as specified in `build-plan.md`, and every
      CMS JSON entry's slug matched a rendered route. No redirects are needed;
      `next.config.ts` is unchanged.

## Files / areas

- `next.config.ts` - possible `redirects()` addition.
- `app/**/page.tsx`, `components/**/*.tsx` - image sizing/priority fixes only,
  no structural changes.
- No new files expected unless a genuine bug surfaces during the audit.

## Data / contracts

- None new. Reads existing `data/hvaclimate-cms-data/*.json` files to
  cross-check slug coverage.

## Testing

- No `test` command is declared in `AGENTS.md`, so this feature rides on
  build output, Lighthouse readings, and manual route verification evidence
  per coding-standards.md - not unit tests. This matches the feature's nature
  (integration/performance verification, not new logic).
- Each step's "done when" is the evidence: grep/read-through for Step 1,
  Lighthouse LCP numbers for Step 2, a route-by-route status table for Step 3,
  and a verified redirect (or explicit no-op) for Step 4.

## Notes for the AI

- This is a verification-and-fix feature, not a build-new-things feature —
  keep any code changes small and targeted to what the audit actually finds.
  Don't refactor image components beyond adding missing sizing/priority.
- Webflow CDN images (`cdn.prod.website-files.com`) are external and already
  allow-listed in `next.config.ts` `images.remotePatterns` — don't change that
  unless a new host shows up.
- If Step 3 finds a genuinely broken route (not just a slug mismatch), stop
  and flag it rather than silently patching around it — that may indicate a
  gap in an earlier feature, not a Step 4 redirect case.
- Use the running dev/prod server and real browser output as evidence per
  `ai-interaction.md`'s Browser Verification guidance; Playwright is not
  installed and should not be added for this feature.
