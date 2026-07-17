# Feature: Google Places Autocomplete + RentCast property lookup in instant-quote

**From build-plan:** ad-hoc addition (not a build-plan item — all 17 features are checked off)
**Status:** not started

## Goal

Let a visitor type their address in the instant-quote wizard, pick it from a
Google Places dropdown, then auto-fill home size and current heating system
from RentCast public-record data — skipping straight to the Soft Gate when
confident data is found, and falling back to the existing manual flow
otherwise.

**Context from live testing (this session):** RentCast and ATTOM were both
tested against 8 real Vancouver WA residential addresses. Combined hit rate
was 1/8. This means the "not found" / manual-entry path is the **primary**
experience, not an edge case — it must be at least as polished as the
auto-detected path, and the lookup must never block or visibly stall the quiz.

## In scope

- `AddressAutocomplete.tsx` — client component wrapping Google Places
  `Autocomplete`, biased to the Vancouver WA / Portland OR area, US-only.
- Rewriting `app/api/property-lookup/route.ts` to the simpler shape given
  (drop the ATTOM-flavored mapping added earlier this session — RentCast
  only), with a 3-second timeout and silent fallback.
- Wiring the new autocomplete into `QuizStep2HomeSize.tsx`, replacing the
  current plain `<input>`.
- Green "found" card and gray "not found" card, both specified below.
- Skip-to-Soft-Gate behavior when RentCast data is confirmed by the user.
- `propertyData` (with `source: 'rentcast' | 'manual'`) stored on `QuizState`
  and included in the office lead email.
- A small "data verified from public records" badge + fact row in
  `LivingProposal.tsx` when `source === 'rentcast'`.
- `.pac-container` / `.pac-item` styling in `globals.css`.
- `NEXT_PUBLIC_GOOGLE_PLACES_API_KEY` documented in `.env.local.example`
  (empty placeholder — real key goes only in the gitignored `.env.local`,
  same pattern already used for `RENTCAST_API_KEY`).

## Out of scope

- Server-side Google Places calls (Autocomplete runs client-side by design —
  the key is `NEXT_PUBLIC_`, which is expected and fine since Places
  Autocomplete is meant to be a browser-side key restricted by HTTP referrer
  in the Google Cloud Console, not a secret).
- ATTOM integration — this session's testing showed materially worse
  residential coverage than RentCast (0/8 vs 1/8, and ATTOM's hits were both
  commercial buildings). Not worth maintaining two providers for this hit
  rate. The existing ATTOM-shaped fields in the current `property-lookup`
  route (from the earlier session) get removed as part of simplifying to the
  spec's exact handler.
- Editing `QuizStep3CurrentSystem.tsx` itself — it's reused unchanged when
  the flow doesn't skip past it.
- Retry/backoff logic for RentCast — a single attempt with a 3s timeout,
  silent fallback on any failure, per the spec.

## Build steps

- [x] **Step 1 - Env var + globals.css** — Add `NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=`
  placeholder to `.env.local.example` (with a short comment matching the
  existing `RESEND_API_KEY`/`RENTCAST_API_KEY` style: what it's for, what
  happens if unset), add the real key to the gitignored `.env.local`, and add
  the `.pac-container`/`.pac-item` CSS block to `app/globals.css`.
  *Done when:* `npm run build` still passes; the env example has no real key
  committed.

- [x] **Step 2 - `AddressAutocomplete.tsx`** — New client component per the
  given props (`onAddressSelect`, `value`, `onChange`). Loads the Google Maps
  JS script once (guard against double-injection on remount), initializes
  `google.maps.places.Autocomplete` on the input with US-only
  `componentRestrictions` and a Vancouver WA / Portland OR bounds bias,
  extracts `formatted_address` + `address_components` into `PlaceDetails` on
  `place_changed`, and matches the existing input styling (1.5px
  `#e2e7ee` border, 10px radius, 48px height).
  *Done when:* typing an address in a throwaway test page shows the styled
  Google dropdown and selecting a result logs a populated `PlaceDetails`
  object with no console errors.

- [x] **Step 3 - Rewrite `app/api/property-lookup/route.ts`** — Replace the
  current handler (which has ATTOM-shaped mapping from the earlier session)
  with the RentCast-only version from the spec: `GET`, reads `?address=`,
  3-second timeout via `AbortSignal.timeout(3000)`, `X-Api-Key` +
  `Accept: application/json` headers, returns
  `{found, squareFootage, yearBuilt, bedrooms, bathrooms, heatingType, propertyType}`,
  and `{found: false}` on any missing param, non-OK response, empty result,
  timeout, or thrown error.
  *Done when:* `curl` against a known-matching address (e.g. `11601 NE 117th
  Ave, Vancouver, WA 98662`, confirmed live during this session's testing)
  returns `found: true` with the right fields; an unmatched address returns
  `{found: false}` with a 200, not a 4xx/5xx.

- [x] **Step 4 - Wire autocomplete + lookup into `QuizStep2HomeSize.tsx`** —
  Swap the plain address `<input>` for `AddressAutocomplete`. On
  `onAddressSelect`, kick off the `/api/property-lookup` fetch, show a
  loading spinner ("Looking up your home details..."), and disable/relabel
  the Next button while the lookup is in flight.
  *Done when:* selecting an address from the dropdown visibly triggers the
  loading state before either card renders.

- [x] **Step 5 - Found / not-found cards + skip logic** — Render the green
  "We found your home!" card (sqft, year built, heating type, bed/bath,
  "Looks right →" / "Edit manually") on `found: true`, or the gray
  "couldn't auto-detect" card on `found: false`, exactly as specified.
  "Looks right →" derives `homeSize` from `squareFootage` and
  `currentSystem` from `heatingType` (heat pump → electric; gas/forced air →
  gas; else → unsure), stores `propertyData` with `source: 'rentcast'`, and
  jumps straight to Soft Gate (step 3 in current wizard indexing). "Edit
  manually" (and the not-found path) reveals the existing size/system
  questions unchanged, ending in `propertyData: {source: 'manual', ...}` or
  `null` if the user never got a lookup at all.
  *Done when:* both card states render correctly in the browser for a
  matching and non-matching address; "Looks right" lands directly on the
  Soft Gate step with the correct summary line ("Based on your 1,820 sq ft
  home with heat pump"); "Edit manually" falls through to the normal
  questions.

- [x] **Step 6 - `types.ts` + email + Living Proposal** — Add
  `PropertyData` (`squareFootage`, `yearBuilt`, `bedrooms`, `bathrooms`,
  `heatingType`, `source: 'rentcast' | 'manual'`) and `propertyData` on
  `QuizState`. Thread it through the existing submission payload to
  `app/api/instant-quote/route.ts`, rendering "Property data auto-detected: X
  sqft, built YYYY, [heating type]" or "Property data entered manually by
  user" in the office email. In `LivingProposal.tsx`, show the "📊 Data
  verified from public records" badge plus yearBuilt/squareFootage/heatingType
  in the right-column summary only when `source === 'rentcast'`.
  *Done when:* a full quiz run with an auto-detected address produces an
  office email containing the auto-detected line, and the Living Proposal
  shows the verified-data badge; a manual-entry run shows neither.

## Files / areas

- `components/instant-quote/AddressAutocomplete.tsx` (new)
- `app/api/property-lookup/route.ts` (rewrite)
- `components/instant-quote/QuizStep2HomeSize.tsx` (rework)
- `components/instant-quote/QuizStep4SoftGate.tsx` (pass `propertyData` through, minor)
- `components/instant-quote/InstantQuoteWizard.tsx` (state wiring, minor)
- `components/instant-quote/LivingProposal.tsx` (verified-data badge)
- `components/instant-quote/types.ts` (`PropertyData` shape)
- `lib/validation/instant-quote.ts` (extend schema for `source`)
- `app/api/instant-quote/route.ts` (email copy)
- `app/globals.css` (`.pac-container` / `.pac-item`)
- `.env.local.example`, `.env.local`

## Data / contracts

`PropertyData` (load-bearing — used by Step 4 email copy and Step 5 Living
Proposal badge, so lock it in Step 6 and don't reshape later):

```ts
interface PropertyData {
  squareFootage: number | null;
  yearBuilt: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  heatingType: string | null;
  source: 'rentcast' | 'manual';
}
```

`PlaceDetails` (from `AddressAutocomplete`):

```ts
interface PlaceDetails {
  formattedAddress: string;
  streetNumber: string;
  route: string;
  city: string;
  state: string;
  zip: string;
  lat?: number;
  lng?: number;
}
```

`/api/property-lookup` response:

```ts
{
  found: boolean;
  squareFootage: number | null;
  yearBuilt: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  heatingType: string | null;
  propertyType: string | null;
}
```

## Testing

No test runner is declared in `AGENTS.md` (Commands section only lists dev/
build/start/lint), so the opt-in testing gate is off. Verify via:

- Build: `npm run build` green after every step.
- Browser: run the dev server, walk the quiz end-to-end for both the
  auto-detected path (use `11601 NE 117th Ave, Vancouver, WA 98662`,
  confirmed live in this session to return RentCast data) and a non-matching
  address, screenshot both card states.
- `curl` the `/api/property-lookup` route directly for the found/not-found/
  timeout cases before wiring it into the UI (Step 3's own done-when).

## Notes for the AI

- Google Places script must load once, not once per component mount —
  guard with a module-level flag or check `window.google?.maps?.places`
  before injecting a second `<script>`.
- `NEXT_PUBLIC_GOOGLE_PLACES_API_KEY` is intentionally public-side; don't
  "fix" it into a server-only var — Places Autocomplete requires a
  browser-restricted key by design.
- RentCast key stays server-only, fetched only inside the API route, never
  passed to the client.
- Real-world RentCast coverage in this area is low (confirmed this session:
  1 hit out of 8 real Vancouver WA addresses tried across RentCast + ATTOM
  combined). Do not treat "not found" as a rare/edge path when writing the
  gray card — write it as the expected common case.
- This replaces the ATTOM-shaped `property-lookup` route built earlier this
  session; there's no need to preserve its `ownerOccupied`/
  `estimatedValue`/`lastSoldPrice` fields since the new spec's response
  shape doesn't include them. Check whether `QuizStep4SoftGate.tsx`'s email
  payload or `app/api/instant-quote/route.ts`'s "Property Details" section
  reference those dropped fields and simplify them to match the new shape.
- No em dashes, no unrelated refactors — keep diffs scoped to each step.
