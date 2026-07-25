# AGENTS.md — HVA Climate Control

HVAClimate is a local HVAC contractor website for Vancouver WA / Portland OR.
This project is a **Webflow → Next.js migration** of hvaclimate.com.
SEO preservation is the #1 priority — all URLs must remain identical to Webflow.

## Read these for full context
- `blueprint/context/project-overview.md` — generated project overview
- `blueprint/context/coding-standards.md` — conventions to follow
- `blueprint/context/ai-interaction.md` — how to work with the user
- `blueprint/context/current-feature.md` — the feature being built right now

## Commands
- Dev server: `npm run dev` (http://localhost:3000)
- Build: `npm run build`
- Production: `npm run start`
- Lint: `npm run lint`
- Test: `npm run test`
- Test (watch): `npm run test:watch`

## Workflow
Build one feature at a time using the Blueprint skill loop:
`/feature` → `/implement` → `/check` → `/complete`

## Critical rules
- NEVER change URL slugs — they must match Webflow publishedPath exactly
- ALWAYS use `generateMetadata()` for SEO — every page needs title + description
- NEVER use client components unless interactivity requires it (`'use client'`)
- ALL images through `next/image` with explicit width/height
- Tailwind v4: CSS-first config in `globals.css`, no `tailwind.config.js`
