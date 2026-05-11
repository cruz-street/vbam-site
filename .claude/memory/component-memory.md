# Component Change Log (newest first)

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

### 2026-05-11 21:03 — feat CtaStrip sunrise gradient CTA section
- File: /Users/ashwinchandran/work/vbam-site/app/src/components/home/CtaStrip.tsx
- "Now welcoming new patients." on sunrise gradient bg; two CTA buttons (Book + Contact); ScrollReveal; server component

### 2026-05-11 21:03 — feat VbpSection lineage cards
- File: /Users/ashwinchandran/work/vbam-site/app/src/components/home/VbpSection.tsx
- VBP → VBAM lineage cards connected by sunrise-gradient bridge arrow; ScrollReveal stagger; sand bg; server component

### 2026-05-11 21:02 — feat ServicesSection 6-card grid
- File: /Users/ashwinchandran/work/vbam-site/app/src/components/home/ServicesSection.tsx
- 3×2 service card grid on foam bg; sunrise gradient top-bar hover accent via CSS scale; ScrollReveal stagger per card; server component

### 2026-05-11 21:02 — feat PhilosophySection 3-col principles grid
- File: /Users/ashwinchandran/work/vbam-site/app/src/components/home/PhilosophySection.tsx
- "Three quiet promises." section with 3 principle cards (sunrise-gradient glyph circles, ScrollReveal scale stagger); server component

### 2026-05-11 21:02 — feat DoctorsSection full-section slider
- File: /Users/ashwinchandran/work/vbam-site/app/src/components/home/DoctorsSection.tsx
- 100vh animated slider with 3 doctor slides, auto-advance (7s), progress bar, prev/next arrows, dot nav, CSS opacity transitions; placeholder photo silhouettes; approved Dr. Stewart bio copy verbatim

### 2026-05-11 21:01 — feat PositioningSection server component
- File: /Users/ashwinchandran/work/vbam-site/app/src/components/home/PositioningSection.tsx
- "A grown-up sibling, on purpose." section with ScrollReveal on heading, 2 body paragraphs, pull quote with em-dashes; matches screens.html §02

### 2026-05-11 21:00 — feat TrustBar server component
- File: /Users/ashwinchandran/work/vbam-site/app/src/components/home/TrustBar.tsx
- Created Sand-bg trust bar with 4 items (coral dot + Archivo uppercase text), separator dots, matches screens.html design
