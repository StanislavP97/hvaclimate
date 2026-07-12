# Feature: Google Tag Manager + Reviews

**From build-plan:** feature 16
**Status:** complete

## Goal

Wire up Google Tag Manager site-wide for analytics/conversion tracking. The
Reviews half of this build-plan line is already shipped (`ReviewsSection`,
`ServiceReviewsBand`, `data/google-reviews.json`, live on the home page and
every service category page) — no work needed there. This spec covers only
GTM.

## In scope

- GTM container snippet (`<script>` in `<head>` + `<noscript><iframe>` right
  after `<body>`) added to the root layout, following Google's standard
  installation pattern.
- Container ID `GTM-M7948CN9` stored as `NEXT_PUBLIC_GTM_ID` in
  `.env.local.example` (documented, not committed as a secret — GTM IDs are
  public/client-side by design) and referenced from code via
  `process.env.NEXT_PUBLIC_GTM_ID`.
- Loads on every route (root layout is shared by the whole app).

## Out of scope

- Reviews/testimonials work — already complete, not touched.
- Custom GTM tags, triggers, or dataLayer events (e.g. form-submit tracking)
  — just the base container install. Event wiring is a future feature if
  needed.
- Google Reviews live API widget — the existing static `google-reviews.json`
  approach stands; project-overview.md already frames this as an accepted
  "static testimonials" alternative to a live widget.
- Cookie consent / consent mode — not part of this pass.

## Build loop

Build one step at a time, never the whole feature at once.

1. Plan mode lays out the step before any code.
2. The AI implements just that step.
3. It shows the diff (not full files); you read it and understand it.
4. You approve, then choose whether to commit a checkpoint or roll straight on.
   Checkpoints are optional; `/complete` makes the real feature-level commit at the end.

Never accept a step you haven't read. If a diff is too big to review, the step was too big, so split it.

## Build steps

- [x] **Step 1 - Add `NEXT_PUBLIC_GTM_ID` env var** - add the variable (set to
      `GTM-M7948CN9`) to `.env.local` (untracked, local dev) and document it
      with a comment in `.env.local.example`, matching the existing
      `RESEND_API_KEY` documentation style. *Done when:* `.env.local.example`
      documents `NEXT_PUBLIC_GTM_ID`, and `process.env.NEXT_PUBLIC_GTM_ID`
      resolves to `GTM-M7948CN9` in local dev.
- [x] **Step 2 - Add GTM script + noscript to root layout** - in
      `app/layout.tsx`, add the GTM `<script>` snippet via `next/script`
      (`strategy="afterInteractive"`, placed alongside the existing Housecall
      Pro `Script`) and the `<noscript><iframe>` fallback immediately after
      the opening `<body>` tag, both reading the container ID from
      `process.env.NEXT_PUBLIC_GTM_ID`. Guard so nothing renders if the env
      var is unset (keeps other environments/forks clean). *Done when:*
      loading any page in the browser with `NEXT_PUBLIC_GTM_ID` set shows the
      GTM script tag and noscript iframe in the rendered HTML (view source),
      and the GTM container fires in Google Tag Assistant / browser network
      tab (a request to `googletagmanager.com/gtm.js?id=GTM-M7948CN9`).

## Files / areas

- `app/layout.tsx` - add GTM script + noscript.
- `.env.local` - add `NEXT_PUBLIC_GTM_ID=GTM-M7948CN9` (untracked).
- `.env.local.example` - document the new var.

## Data / contracts

- None. `NEXT_PUBLIC_GTM_ID` is a plain string env var, no schema.

## Testing

- No test runner declared in `AGENTS.md` Commands section, so this rides on
  browser + build evidence per the coding-standards.md gate.
- Verify: `npm run build` passes; `npm run dev`, load `/`, view page source to
  confirm both the `<script>` snippet (in `<head>`) and `<noscript><iframe>`
  (right after `<body>`) are present with `GTM-M7948CN9` in the URL; check the
  Network tab for the `gtm.js` request.

## Notes for the AI

- Root layout (`app/layout.tsx`) already has one `Script` for Housecall Pro
  using `strategy="lazyOnload"` — GTM should use `afterInteractive` per
  Google's own guidance (it wants to fire early for accurate tracking), so
  don't just copy the existing strategy.
- Keep this a server component change — no `'use client'` needed; `next/script`
  and a plain `<noscript>` both work in server components.
- `NEXT_PUBLIC_` prefix is required for the ID to reach the client bundle
  (the noscript iframe is unavoidably a client-rendered/static HTML element,
  and Next.js only inlines `NEXT_PUBLIC_*` vars into client-visible output).
