# Changelog

All notable changes to this project will be documented in this file.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Changed
- Practice hours updated to mirror Vero Beach Pediatrics: Mon, Wed–Fri 8 am–12 pm and 1 pm–5 pm (closed for lunch 12–1); Tuesday closed; Sat–Sun closed. Updated in four places: `contact.json` hours array, footer Hours block, home page MedicalOrganization JSON-LD, contact page MedicalOrganization JSON-LD
- About page `DoctorPhoto`: cropped Dr. Stewart's source image to top 65% (647×700, removing the lower arms area) and saved as `/images/dr-stewart-oval.jpg`; switched the container from a rounded rectangle to a true ellipse (`border-radius: 50%`) at aspect 7:10 — a clearly tall oval whose bottom edge just barely shows the top of her arms, per feedback that the crossed-arms framing was awkward
- About page `DoctorPhoto`: switched from a 280px circle to a 380px-max portrait rectangle (aspect 3:5, rounded corners) so Dr. Stewart's photo displays uncropped at its native ratio
- For Patients `VisitFlow` (Modern tools section): replaced the prominent coral italic step numbers with on-brand single-stroke SVG icons inside soft coral-tinted circular badges. Icons: phone-with-check (Before), clipboard (In the room), speech-bubble-with-check (After), overlapping chat bubbles (Between visits). Adds visual meaning to each step without dominating the editorial layout
- Home `PositioningSection` body2: softened further — removed the "physician guides your annual care / stays engaged over time" framing in favor of "a practice where the staff knows your name, your physician knows you, and your story follows you between visits." Less promise of physician interaction frequency
- Home `PositioningSection` (01): rewrote body copy to remove Dr. Wije / 1976 lineage and instead reinforce VBAM's deep local roots and positioning as an alternative to call-center-style medicine (know who answers the phone, know the front desk, know your doctor)
- Home `VbpSection` (05): rewrote body copy in the same voice — VBP framed as an intentional alternative for Vero families who wanted a practice they'd recognize, with VBAM carrying that conviction forward
- Home copy: toned down "same physician every visit" promises across hero lede, trust bar, positioning body, philosophy principle i, flow section stage 02, and same-day sick visits service blurb. New theme leans on knowing-the-people: staff knows your name, your physician guides annual/wellness care, your story follows you across the team — leaving room to add a PA or NP as the practice grows without breaking promises
- Footer: added Privia-required compliance links (`Press Room`, `Prospective Doctors`) to the existing compliance row at the same low-opacity small-caps treatment so they remain visually subordinate to VBAM brand
- Footer: added improvised white Privia logo (`shared/PriviaLogo.tsx`) inline beside the "Proud to be part of Privia Medical Group" attribution. ⚠️ **Placeholder** — replace with official Privia asset when delivered by the performance consultant
- Home `PriviaSection`: added prescribed verbatim Privia Medical Group paragraph as a caption-style secondary block (small Inter, 55% opacity, Cormorant italic "From Privia Medical Group:" lead-in). Our editorial "Locally owned. Collectively committed." remains the dominant voice (per Privia guideline Part 2.2 + VBAM brand-hierarchy principle: care center brand supersedes Privia visually)
- About page `DoctorPhoto`: embedded Dr. Patricia Stewart photo (`/images/dr-stewart.jpg`) in the left column of her bio block; gradient placeholder retained as fallback when no `src` is passed
- Home `DoctorsSection`: embedded Dr. Patricia Stewart photo at `/images/dr-stewart.jpg` (replaces gradient placeholder). ⚠️ **Current file is a watermarked photographer proof** — replace with licensed/final image before production deploy
- Home `DoctorsSection`: changed `height: 100vh` to `minHeight: 100vh` and added desktop-only vertical padding (`md:py-12 lg:py-20`) to give the doctor photo and "Meet Dr. Stewart" button more breathing room on computer (per Alex Robbins comment on Home — Copy)
- Home: reduced gap between `PhilosophySection` (03 · Care Philosophy) and `ServicesSection` (04 · Services) by lowering the adjoining vertical paddings (per Alex Robbins comment on Home — Copy)
- Services page: added mobile-only "Book an Appointment" + "New Patient Info" CTA row directly below the page hero so primary actions are above the fold on mobile (per Alex Robbins comment on Services — Copy)
- For Patients page: added `id="insurance"` anchor on the Insurance column; updated Footer "Insurance" link to `/for-patients/#insurance` so it deep-links to the section (per Alex Robbins comment on For Patients — Copy)
- For Patients insurance list updates: added "CIGNA HealthSpring" alongside CIGNA (CIGNA's Medicare Advantage line); added "Railroad Medicare" under Medicare & Other Plans (administered by Palmetto GBA, relevant for railroad retirees); appended "(UHC)" to United Healthcare for clarity
- For Patients page: restructured insurance display from flat pill grid to two **grouped bullet lists** that reflect what the plans actually are:
  - "National Carriers" (Florida Blue, United Healthcare, CIGNA, Aetna/Coventry/First Health)
  - "Medicare & Other Plans" (Medicare, Health First, FHCP, MultiPlan/PHCS)
  - "Self-Pay Welcome" pulled out as a separate band with its own treatment — it's a payment option, not insurance, so it gets a distinct callout. Copy reframed to position self-pay as a sensible choice for several common scenarios (high-deductible plans, no insurance, preference for direct payment) rather than a fallback for the uninsured. Removed duplicate "cash-pay / self-pay" wording.
  - Switched chips → coral-bullet list to match the New Patients checklist (internal consistency) and improve plan-name scannability

### Added
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
