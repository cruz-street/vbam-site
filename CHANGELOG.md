# Changelog

All notable changes to this project will be documented in this file.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Changed
- About page `DoctorPhoto` (per Alex Robbins DM 2026-05-27): reverted to a **true circle** at the same crop as the homepage `DoctorsSection`. Aspect ratio 5:7 (ellipse) → 1:1; `objectPosition` `center top` → `center 18%`; added the same soft shadow and 1px atlantic-tinted border the homepage circle uses. Both home and about now render Dr. Stewart in matching circular frames

### Added
- **Reviews section now shows Vero Beach Pediatrics' Google reviews in an on-brand carousel.** The "What patients say" section renders a native scroll-snap carousel (swipeable on mobile, no JS library, no third-party script) of VBP's 5★ reviews, with a "5.0 · 361+ Google reviews" summary and per-card "Vero Beach Pediatrics · Google" attribution. Section copy rewritten for honest sister-practice framing ("real Google reviews for our sister practice, Vero Beach Pediatrics, run by the same family") rather than implying VBAM's own patients. Reviews are refreshed at build time by `scripts/fetch-marketing-content.ts` — now **Featurable** (sister-practice widget API, 34 cached reviews, no API key) as the primary source, **Google Places API** as fallback, committed `reviews.json` snapshot as the final safety net. NOTE: the originally-attempted Featurable client **embed** was abandoned — its loader script URL isn't publicly discoverable and the widget enforces a client-side domain allowlist; rendering our own carousel from the data is more robust, on-brand, and faster. See decision log 2026-05-19
- **Logo V4** recreated from the approved brand PDF (`233701 - Vero Beach Adult Medicine - Logo Concepts + Development V4`). No vector export was provided, so the mark was hand-built as inline SVG to match: **solid amber sun** (was a sunrise gradient), **seven navy rays** (was five), **two waves** — navy + sea glass (was three). New `--color-vbam-sun: #F9A826` token added to `globals.css` (per Brand Token Rule — no ad-hoc hex in components) and used as the sun fill
- `public/images/vbam-mark.svg` — standalone square mark asset. Referenced by the home-page `MedicalOrganization` JSON-LD `logo` field but previously missing (404); now created
- `src/app/icon.svg` — crisp SVG favicon (mark on a rounded foam tile), replacing reliance on the legacy `favicon.ico` for modern browsers

### Changed
- Dr. Stewart portrait: dropped the color-quantized PNG (visible concentric banding in the orb gradient) and shipped the asset as WebP (`dr-stewart-cutout.webp`, 120 KB at quality 88) — 13× smaller than the un-quantized PNG with no visible quality loss. About page + homepage doctor card both reference the WebP now; PNG removed from the repo
- Logo V4 polish (per PDF reference): warmed the sun token from `#F9A826` (read slightly yellow) to `#F49B2C` (warmer amber, closer to the Ironside PDF). Upper navy wave now dips slightly behind the sun base (`Q 50 39.2 63 37` instead of `L 63 37`) — gives the waves a "cradling" feel under the sun instead of running straight through. Sea-glass wave stroke nudged from 1.3 → 1.45 to balance the navy wave visually. Applied across `SunSeaMark`, hero animated mark in `HeroSection`, standalone `vbam-mark.svg`, and favicon `icon.svg`
- Dr. Stewart portrait (per Alex Robbins direction, replacing earlier "no arms" framing): swapped to Alex's "Dr. Stewart Headshot (for Site) - 1600x2000 transparent.png" — figure with arms folded crossed, peach orb gradient baked in. Resized to 975×1300 and color-quantized to 878 KB. Removed the foam fill from the homepage circle container since the orb is now part of the image
- `SunSeaMark` component rebuilt to the V4 mark (solid sun, 7 rays, 2 waves). Backward compatible — `gradId`/`strokeColor` props retained so existing Header/Footer call sites are unaffected; added optional `sunColor`/`waveColor` props
- **Home hero mark** updated to V4. The hero uses its own *animated* inline SVG (`#hero-mark`, separate from `SunSeaMark`), which still showed the old gradient sun / 5 rays / 3 waves. Rebuilt to solid amber sun, 7 rays, 2 waves; removed the now-unused `hg` gradient and the `#hm-w3` wave + its drift animation. All entrance/shimmer/float/wave animation hooks (`#hm-sun`, `#hm-rays line`, `#hm-w1`, `#hm-w2`) preserved
- Dr. Stewart portrait: replaced the original watermarked JPG with a transparent PNG cutout (`dr-stewart-cutout.png`) framed per Dr. Stewart's reference — head, shoulders, dress, and cascading hair down to upper-torso, with the bottom of the oval/circle clipping cleanly before the folded arms become a focal point. About-page `DoctorPhoto` simplified to use `objectFit: cover` on the pre-framed asset (removed foam fill, shadow, and border so the figure floats on the page background). Homepage `DoctorsSection` now uses the same asset
- Home `DoctorsSection`: fixed pre-existing slider height collapse — the inner `relative w-full h-full` wrapper was collapsing to height 0 because the section's `minHeight: 100vh` doesn't establish a resolvable `height` for `h-full`. Switched to `minHeight: inherit` so the wrapper takes the section's full height and the doctor card (including photo) renders inside the section instead of being clipped by `overflow: hidden`
- Practice hours updated to mirror Vero Beach Pediatrics: Mon, Wed–Fri 8 am–12 pm and 1 pm–5 pm (closed for lunch 12–1); Tuesday closed; Sat–Sun closed. Updated in four places: `contact.json` hours array, footer Hours block, home page MedicalOrganization JSON-LD, contact page MedicalOrganization JSON-LD
- About page `DoctorPhoto`: re-tuned the oval composition per Dr. Stewart's feedback. Switched from `object-fit: cover` on the cropped source to **absolute positioning of the original full image** at 125% width, `top: 10%`, horizontally centered. Container is now aspect 5:7 (slightly taller). Head sits in the upper-third (wider part of the ellipse) with hair flowing naturally, shoulders fill the middle, and the bottom of the oval clips most of the arms via overflow. Source is back to `/images/dr-stewart.jpg` (uncropped) — `/images/dr-stewart-oval.jpg` from the earlier attempt is no longer referenced
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
