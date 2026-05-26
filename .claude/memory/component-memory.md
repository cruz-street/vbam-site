# Component Change Log (newest first)

### 2026-05-23 23:15 — feat: Claude Code + Decap CMS setup guide for content editors
- File: /Users/ashwinchandran/work/vbam-site/docs/claude-code-setup-guide.md
- New non-technical onboarding doc covering Mac + Windows install of Node, Git, pnpm, Claude Code, repo clone, Playwright + GitHub MCPs (user scope), local `pnpm dev`, Decap CMS at localhost/admin, first-edit smoke test, daily workflow, security, troubleshooting, escalation — modeled on the WordPress-Claude-Setup-Guide reference; install commands verified against https://code.claude.com/docs/en/setup and /mcp

### 2026-05-21 22:03 — feat: GitHub Actions daily content refresh workflow
- File: /Users/ashwinchandran/work/vbam-site/.github/workflows/daily-content-refresh.yml
- Created scheduled workflow (06:00 UTC daily + manual dispatch) that POSTs to the CF Pages deploy hook secret `CF_PAGES_DEPLOY_HOOK`; gracefully no-ops if the secret is absent, fails loudly (exit 1) on HTTP ≥ 400

### 2026-05-21 16:36 — feat: SocialFeedSection component
- File: /Users/ashwinchandran/work/vbam-site/app/src/components/home/SocialFeedSection.tsx
- Created SocialFeedSection consuming `SOCIAL_POSTS` (from `@/content/social`) and `SOCIAL_SECTION` headings; renders null when posts array is empty (current default state); includes platform filter (All / Instagram / Facebook), PostCard sub-component with lazy-loaded image and caption truncation, and ScrollReveal-wrapped grid

### 2026-05-20 23:16 — feat: ReviewsSection component
- File: /Users/ashwinchandran/work/vbam-site/app/src/components/home/ReviewsSection.tsx
- Created ReviewsSection consuming `REVIEWS` and `REVIEWS_SECTION` content exports; includes StarRow sub-component with inline hex for conditional coral/atlantic fill, EmptyState with CTA for zero-review state, and full grid layout for populated reviews — AggregateRating-ready for JSON-LD

### 2026-05-20 11:14 — feat(build): scaffold marketing content fetch script
- File: /Users/ashwinchandran/work/vbam-site/app/scripts/fetch-marketing-content.ts
- Created build-time script with `fetchGoogleReviews` and `fetchSocialPosts` stubs (both log "not yet wired — skipping"); includes `writeJson`/`readJsonOrDefault` helpers for Tasks 6/7 API wiring

### 2026-05-19 23:06 — feat(content): scaffold reviews/social/videos data + typed exports
- Files: app/src/content/reviews.json, reviews.ts, social.json, social.ts, videos.json, videos.ts
- Created 3 data + 3 typed export files: ReviewsContent (from Google Places), SocialPost[] (from Meta Graph), Video[] (for future use); all empty defaults; JSON imports cast to pinned types to resolve TypeScript strict mode issues with empty arrays

### 2026-05-14 23:52 — fix: hide Decap footer branding from admin panel
- File: app/public/admin/index.html
- CSS + MutationObserver to hide the "Powered by Decap" footer link once React renders it

### 2026-05-14 23:50 — fix: CMS logo updated to official Cruz Street docs logo
- File: app/public/images/cms-logo.svg
- Replaced CS badge with accurate diamond pinwheel recreation + "CruzStreet / Data Science on Demand" from the official docs logo

### 2026-05-14 23:43 — feat: CodeFoundry/Cruz Street CMS admin logo
- File: app/public/images/cms-logo.svg
- Custom SVG logo replacing Decap CMS default — hex CF mark + CODEFOUNDRY wordmark + "powered by Cruz Street" badge
- Wired via logo_url in admin/config.yml pointing to https://vbam-site.pages.dev/images/cms-logo.svg

### 2026-05-13 16:47 — fix CI deploy workflow
- File: .github/workflows/deploy.yml
- Replaced cloudflare/wrangler-action@v3 with direct `npx wrangler@latest` to fix auth error (wrangler-action was installing 3.x which rejected the API token)
- CLOUDFLARE_API_TOKEN + CLOUDFLARE_ACCOUNT_ID now passed as env vars directly to wrangler

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
