# Changelog

All notable changes to this project will be documented in this file.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added
- ReviewsSection on homepage — Google Places API reviews fetched at build time, with empty-state CTA and conditional AggregateRating JSON-LD
- VideosSection on homepage — YouTube gallery using lite-youtube-embed (thumbnail-first, click to load iframe)
- SocialFeedSection on homepage — Instagram + Facebook combined feed via Meta Graph API, with platform filter
- Site-wide Klara floating widget in `layout.tsx`, env-gated by `NEXT_PUBLIC_KLARA_WIDGET_ID`
- Scroll-linked parallax on the hero sunrise wash (respects `prefers-reduced-motion`)
- Build-time content fetch script (`app/scripts/fetch-marketing-content.ts`) wired into `prebuild`
- GitHub Actions cron at `.github/workflows/daily-content-refresh.yml` to refresh content daily via CF Pages deploy hook
- Phase 6: Cloudflare Pages deployment — preview URL https://2a0a86eb.vbam-site.pages.dev
  - CF Pages project `vbam-site` created under ashwin@cruzstreet.com account
  - 99 files uploaded; `_redirects` and static assets confirmed live
  - Deployment logged in DEPLOYMENTS.md
- Phase 5: SEO gate — all 5 checklist items pass
  - `layout.tsx` — Header + Footer added to RootLayout (was missing)
  - `shared/JsonLd.tsx` — JSON-LD script tag component
  - Home page: `MedicalOrganization` JSON-LD (name, address, phone, hours, geo, specialty)
  - Contact page: `MedicalOrganization` JSON-LD (address, phone, hours)
  - Metadata verified on all 5 pages: title template, description, canonical URL
  - `sitemap.xml` verified: 5 URLs, correct priorities, `vbadultmedicine.com` domain
  - `robots.txt` verified: Allow /, sitemap pointer correct
  - `_redirects`: placeholder in place; no existing site DNS to audit
- Phase 4: All 4 inner pages built and verified in browser
  - `about/page.tsx` — Our Doctors: Dr. Stewart featured 2-col (approved bio verbatim) + D'Elia/Wije placeholder cards + CTA
  - `services/page.tsx` — Expanded 6-card grid with detail copy, approach/philosophy section, dual CTA
  - `for-patients/page.tsx` — New patient checklist + insurance pills + FAQ accordion + CTA
  - `contact/page.tsx` — Contact info/hours + Web3Forms appointment form (honeypot, success/error states)
  - `shared/PageHero.tsx` — Reusable inner-page hero (eyebrow, Fraunces heading + gradient italic, subhead)
  - `for-patients/FaqAccordion.tsx` — Client accordion, 6 FAQs, sunrise gradient toggle icon
  - `contact/AppointmentForm.tsx` — Client form: Web3Forms POST, honeypot, 6 fields, reason dropdown
- Phase 3: Full home page — all 8 sections as React components, wired into `page.tsx`
  - `HeroSection.tsx` — anime.js v4 entrance timeline, glow orb, logo float, wave/sun/ray idle animations
  - `TrustBar.tsx` — Sand bg trust bar, 4 items with coral dot separators
  - `PositioningSection.tsx` — "A grown-up sibling, on purpose." with pull quote + ScrollReveal
  - `DoctorsSection.tsx` — Full-section 100vh slider, auto-advance (7s), progress bar, prev/next arrows, dot nav
  - `PhilosophySection.tsx` — "Three quiet promises." sunrise-gradient glyph circles + 3-col grid
  - `ServicesSection.tsx` — 6 service cards with hover top-bar accent, staggered ScrollReveal
  - `VbpSection.tsx` — VBP → VBAM lineage cards with sunrise-gradient bridge arrow
  - `CtaStrip.tsx` — Sunrise gradient CTA strip, "Now welcoming new patients."
- `ScrollReveal.tsx` — fixed `ElementType` import replacing removed `JSX` namespace (React 19 compat)
- Phase 2: Next.js 16.2.6 app scaffold in `app/` — static export, Tailwind CSS 4.3, TypeScript strict
- `globals.css` — Tailwind 4 `@theme` with all 7 vbam- color tokens + 4 font family tokens
- `layout.tsx` — Fraunces, Cormorant Garamond, Archivo, Inter via `next/font/google`; full site metadata
- Route stubs with metadata + canonical URLs: `/`, `/about/`, `/services/`, `/for-patients/`, `/contact/`
- `sitemap.ts` + `robots.ts` — static export compatible (`force-static`)
- `public/_redirects` — Cloudflare Pages redirect file (redirect audit deferred to Phase 5)
- `src/components/layout/Header.tsx` + `Footer.tsx` — skeletons ready for Phase 3
- `docs/screens.html` v0.3 — Direction B full-section doctor slider with anime.js v4 animations
- `docs/design-system.html` v0.4 — 16-section token + component reference
- Initial project scaffold — CLAUDE.md, memory system, decision log, changelogs
- Implementation plan at `docs/superpowers/plans/2026-05-05-vbam-site.md`
