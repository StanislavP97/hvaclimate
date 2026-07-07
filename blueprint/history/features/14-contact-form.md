# Feature: Contact form

**From build-plan:** feature 14
**Status:** not started

## Goal

Wire the existing `/contact` page form to actually submit: validate input,
send it via a Resend-backed Server Action, and show success/error feedback to
the user. Currently the form (`components/contact/ContactForm.tsx`) is fully
built visually but its submit button is `disabled` and the form has no
`action` wired up.

Note on scope: the build-plan line for this feature also mentions "Get
Instant Quote CTA linking to external booking tool." That's stale - feature 2b
already built `/instant-quote` as a full internal 3-step wizard, and all
"Get Instant Quote" CTAs site-wide (`Header.tsx`, `ExperienceBanner.tsx`,
`ReviewsSection.tsx`) already link to it internally. No external tool exists
or is planned. This is dropped from scope; this feature is the contact form
only.

## In scope

- Zod schema for the contact form fields (name, email, phone, service,
  address, message, sms consent).
- Server Action (`actions/contact.ts`) that validates input with Zod and
  sends an email via Resend, returning `{ success, data, error }`.
- Wire `ContactForm` (client component) to call the action via `useActionState`
  (or equivalent), show field-level validation errors, a pending state, and a
  success/error message. Enable the submit button.
- `RESEND_API_KEY` read from env via `process.env`, with `.env.local` (not
  committed) holding the real key locally.
- Since no Resend API key is available yet, the send call is stubbed behind an
  env check: if `RESEND_API_KEY` is unset, log the payload server-side and
  return success rather than calling Resend. This keeps the full flow (schema,
  action, UI states) buildable and testable now, with a one-line swap to go
  live once a key exists.

## Out of scope

- Actually obtaining/configuring a real Resend API key or verified sending
  domain (user will provide the key later; swap-in is a documented follow-up,
  not a build step here).
- Any changes to Instant Quote CTAs (already correct, see Goal note).
- Rate limiting / spam protection (e.g. captcha) - not required for MVP.
- Email templates beyond a simple plain-text/HTML summary of the submission.

## Build loop

Build one step at a time, never the whole feature at once.

1. Plan mode lays out the step before any code.
2. The AI implements just that step.
3. It shows the diff (not full files); you read it and understand it.
4. You approve, then choose whether to commit a checkpoint or roll straight on.
   Checkpoints are optional; `/complete` makes the real feature-level commit at the end.

Never accept a step you haven't read. If a diff is too big to review, the step was too big, so split it.

## Build steps

- [x] **Step 1 - Install deps and define the schema/types** - add `resend`
  and `zod` to `package.json`; create `types/contact.ts` with the
  `ContactFormData` type inferred from a Zod schema in the same file or
  `lib/validation/contact.ts` (name required, email valid, phone required,
  service optional, address required, message optional, smsConsent boolean).
  *Done when:* `npm install` succeeds, `npm run build` passes with the new
  schema/type file compiling and no usages yet.

- [x] **Step 2 - Server Action with stubbed send** - create
  `actions/contact.ts` with a `submitContactForm` Server Action: parses
  `FormData`, validates with the Zod schema, returns
  `{ success: false, error }` with field errors on invalid input. On valid
  input, if `process.env.RESEND_API_KEY` is set, send via Resend
  (`from`/`to` = `Office@HVAClimate.com`, subject includes the submitter's
  name/service); if unset, `console.log` the parsed payload and return
  `{ success: true, data }`. Wrapped in try/catch, returns
  `{ success: false, error }` on thrown errors. *Done when:* calling the
  action directly (or via a temporary test invocation) with valid data logs
  the payload and returns success; invalid data returns field errors.

- [x] **Step 3 - Wire ContactForm to the action** - convert
  `components/contact/ContactForm.tsx` to use `useActionState` with
  `submitContactForm`, show per-field error text under each input when
  present, disable the submit button only while pending (remove the permanent
  `disabled`/`aria-disabled`), and show a success message (e.g. "Thanks, we'll
  be in touch shortly") replacing or above the form on success. *Done when:*
  submitting the form in the browser with valid data shows the success
  message and the server logs the payload (no `RESEND_API_KEY` set yet);
  submitting with an empty required field shows inline validation errors and
  does not log/succeed.

- [x] **Step 4 - .env documentation** - add `.env.local.example` (or a note in
  `AGENTS.md`/README) documenting the required `RESEND_API_KEY` env var and
  that its absence falls back to console-logging submissions. *Done when:*
  the file/doc exists and lists the variable name and its purpose.

## Files / areas

- `actions/contact.ts` (new) - Server Action
- `lib/validation/contact.ts` or `types/contact.ts` (new) - Zod schema + type
- `components/contact/ContactForm.tsx` (edit) - wire to action, add error/success UI
- `package.json` (edit) - add `resend`, `zod`
- `.env.local.example` (new) - document `RESEND_API_KEY`

## Data / contracts

```ts
type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  service?: string;
  address: string;
  message?: string;
  smsConsent: boolean;
};

type ContactFormResult =
  | { success: true; data: ContactFormData }
  | { success: false; error: string; fieldErrors?: Partial<Record<keyof ContactFormData, string>> };
```

## Testing

No test runner is configured in `AGENTS.md` yet, so this rides on build +
browser evidence per the Testing gate in `coding-standards.md`:

- `npm run build` passes after each step.
- Browser check (Step 3's done-when): valid submission succeeds and logs
  server-side; invalid submission shows inline errors and does not submit.
- If a test runner gets added later, the Zod schema and the Server Action's
  parsing/validation logic (pure-ish, assertable inputs/outputs) would be the
  first candidates for unit tests - not required to add a runner for this
  feature.

## Notes for the AI

- Server Action per `coding-standards.md` - use try/catch, return
  `{ success, data, error }`.
- `ContactForm` stays a client component (`'use client'`, already is) since
  it needs `useActionState` and interactivity; the action itself runs server-side.
- Don't add a Resend account or attempt to send real email - the stub path is
  the deliverable until the user supplies `RESEND_API_KEY`.
- Keep the existing visual design of `ContactForm.tsx` untouched aside from
  adding error/success states and enabling the button - it's already
  pixel-matched to the Webflow reference.
