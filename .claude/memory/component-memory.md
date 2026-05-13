# Component Change Log (newest first)

### 2026-05-12 19:05 — refactor content layer extraction — all copy moved to src/content/
- Files: src/content/{doctors,home,about,services,for-patients,contact}.ts (new)
- All user-facing strings extracted from 12 components/pages into typed content files; components now import from @/content/*
- DoctorsSection: only Dr. Stewart (removed D'Elia + Wije — they are at VBP, not VBAM); slider nav hidden when DOCTORS.length === 1
- about/page.tsx: removed "Also joining the practice" D'Elia/Wije section entirely; hero subhead corrected to single-physician framing
- Enables Claude Desktop content workflow: client edits content/*.ts files, Claude pushes to main, CF Pages auto-deploys

### 2026-05-12 16:08 — fix mobile nav dropdown animation + on-brand styling; fix doctor slider arrows overlapping content
- File: /Users/ashwinchandran/work/vbam-site/app/src/components/layout/Header.tsx
- Dropdown always in DOM, animates via `max-height`/`opacity`/`translateY` transitions (320ms cubic-bezier); sand bg, sunrise gradient top rule, Fraunces 22px nav links with coral → arrows, sunrise gradient CTA button; hamburger lines animate to × via CSS transform (translateY ±6.5px + rotate ±45deg)
- File: /Users/ashwinchandran/work/vbam-site/app/src/components/home/DoctorsSection.tsx
- Prev/next arrows changed from `flex` to `hidden sm:flex` — arrows are hidden on mobile (<640px) where they overlap credential pill chips; dot nav still works on all sizes

### 2026-05-12 14:17 — fix mobile responsiveness across 9 components
- Files: Header.tsx, Footer.tsx, PhilosophySection.tsx, ServicesSection.tsx, VbpSection.tsx, DoctorsSection.tsx, PositioningSection.tsx, CtaStrip.tsx, TrustBar.tsx
- Header converted to `'use client'` with hamburger menu (SVG, no library), mobile dropdown with stacked nav links + Book CTA; desktop nav unchanged
- All containers: `px-12` → `px-5 sm:px-8 md:px-12`; section padding: fixed px → `clamp()`; grids: added mobile collapse breakpoints (`grid-cols-1 sm:grid-cols-3`, `grid-cols-2 md:grid-cols-4`, etc.); VbpSection lineage row: `flex-col sm:flex-row`, bridge arrow `hidden sm:block`; DoctorsSection arrows pulled in to 12px, photo size clamp; PositioningSection pull-quote font clamp; TrustBar gap reduced on small screens

### 2026-05-12 12:49 — feat wave-on-beach hero animation + createDrawable underline
- File: /Users/ashwinchandran/work/vbam-site/app/src/components/home/HeroSection.tsx
- Added asymmetric wave-on-beach animation to sunrise wash (outSine rush 2600ms → hold 600ms → inSine recede 3200ms) via createTimeline loop; halo orb breathes out-of-phase at 400ms offset; all looping effects gated on prefers-reduced-motion
- Added anime.js v4 createDrawable wave underline (3-arc sunrise gradient path) beneath "Adult Medicine" wordmark, drawing in at 1380ms delay; removed old CSS heroGlowBg keyframe

### 2026-05-12 11:42 — fix primary button text invisible on deployed site
- File: /Users/ashwinchandran/work/vbam-site/app/src/components/home/HeroSection.tsx (+ 6 other files)
- Added .btn-primary CSS class outside any @layer in globals.css — unlayered CSS beats Tailwind base `a{color:inherit}` reset that was swallowing text-vbam-foam on <a> elements

### 2026-05-11 21:53 — feat JsonLd shared component + layout Header/Footer fix
- File: /Users/ashwinchandran/work/vbam-site/app/src/components/shared/JsonLd.tsx
- Thin wrapper for JSON-LD script tags (dangerouslySetInnerHTML); used by home + contact pages
- Also fixed layout.tsx: Header + Footer were missing from RootLayout — added both

### 2026-05-11 21:29 — feat Contact page
- File: /Users/ashwinchandran/work/vbam-site/app/src/app/contact/page.tsx
- 2-col: contact info (address, phone, hours, same-day note) + AppointmentForm on sand card; Atlantic sibling callout footer strip

### 2026-05-11 21:29 — feat AppointmentForm Web3Forms client component
- File: /Users/ashwinchandran/work/vbam-site/app/src/components/contact/AppointmentForm.tsx
- Web3Forms POST with honeypot (botcheck), success/error states, 6 fields + reason dropdown; NEXT_PUBLIC_WEB3FORMS_KEY env var

### 2026-05-11 21:28 — feat For Patients page
- File: /Users/ashwinchandran/work/vbam-site/app/src/app/for-patients/page.tsx
- 2-col new patient checklist + insurance plan pills; FaqAccordion import; sunrise CTA band

### 2026-05-11 21:27 — feat FaqAccordion client component
- File: /Users/ashwinchandran/work/vbam-site/app/src/components/for-patients/FaqAccordion.tsx
- 6-item accordion with sunrise-gradient + icon toggle, useState open/close; no animation library needed

### 2026-05-11 21:27 — feat Services page
- File: /Users/ashwinchandran/work/vbam-site/app/src/app/services/page.tsx
- 6 expanded service cards (body + detail copy), approach/philosophy section with pull quote, sunrise CTA band

### 2026-05-11 21:26 — feat About page (Our Doctors)
- File: /Users/ashwinchandran/work/vbam-site/app/src/app/about/page.tsx
- Stewart featured 2-col (photo + approved bio verbatim); D'Elia + Wije placeholder cards 2-col; sunrise CTA band

### 2026-05-11 21:25 — feat PageHero shared component
- File: /Users/ashwinchandran/work/vbam-site/app/src/components/shared/PageHero.tsx
- Reusable inner-page hero: eyebrow label, Fraunces heading + optional gradient italic, Inter subhead, sand/foam bg prop; used by all 4 inner pages

### 2026-05-11 21:03 — feat page.tsx home page wiring
- File: /Users/ashwinchandran/work/vbam-site/app/src/app/page.tsx
- Replaced placeholder stub with full 8-section home page: HeroSection → TrustBar → PositioningSection → DoctorsSection → PhilosophySection → ServicesSection → VbpSection → CtaStrip
