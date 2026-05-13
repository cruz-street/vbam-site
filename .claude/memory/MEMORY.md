# VBAM Site — Session Memory

## Change Log

### 2026-05-11 16:32 — fix screens.html Direction B rendering errors
- File: /Users/ashwinchandran/work/vbam-site/docs/screens.html
- Rewrote hero image panel gradient from warm sky-sea (#F9C784 start) to correct cool coastal teal (`linear-gradient(160deg, #1A6B7E, #5FB3C0, #C8D8E8)`); moved orange circle accent to junction between columns (right edge of left col, `position: absolute; right: -17px`); fixed "reimagined" to use coral gradient italic (not sunrise); removed warm `foam-icon` blue tint; corrected doctor photo placeholder to cool gradient; tightened ticker separator visibility; padding/rule-coral spec-aligned.

---

## Phase Status

- [x] Phase 0: Repo scaffold — CLAUDE.md, memory, decision log, changelogs
- [x] Phase 1: Brand foundation — screens.html (v0.3 approved) + design-system.html (v0.4 complete)
- [x] Phase 2: Next.js scaffold — static export, Tailwind 4 tokens, 4 fonts, all routes, sitemap, robots
- [ ] Phase 2: Next.js app scaffold (tokens, layout, fonts)
- [x] Phase 3: Home page (all 8 sections)
- [x] Phase 4: Inner pages (About, Services, For Patients, Contact)
- [x] Phase 5: SEO (metadata, sitemap, robots, JSON-LD)
- [x] Phase 6: CF Pages deployment — preview live at https://2a0a86eb.vbam-site.pages.dev

## Design Status

- Brand presentation: v0.4 in stakeholder review (May 2026)
- Logo concept in use: Sun & Sea (Concept 01) — pending client lock
- Palette: v0.4 tokens loaded. v0.5 will lock final values — update globals.css only
- **Claude Design session**: COMPLETE — Direction B approved (2026-05-11)
- **Approved direction**: "Quiet care, quietly confident." — Foam/Sand backgrounds, split hero, orange CTA, trust ticker, VBP sibling section, Three Promises, services grid, Atlantic footer
- screens.html: NOT YET CREATED — ready to build from approved Direction B mockup
- **Pre-roll video**: Post-launch enhancement (looping header, like VBP) — not in scope for launch

## Client

- Practice: Vero Beach Adult Medicine
- Domain: vbadultmedicine.com
- Brand sibling of: Vero Beach Pediatrics (verobeachpediatrics.com)
- **Practice has 3 physicians (not just Dr. Stewart):**
  - Dr. Patricia Stewart — board-certified Internal Medicine, 12+ yrs Treasure Coast, Native Floridian. Trained Emory, residency U of Miami.
  - Dr. D'Elia — just joined; announcement email sent to 3,804 patients on 2026-05-07. VBP page: verobeachpediatrics.com/delia/
  - Dr. Wije — announcement being handled with sensitivity (personal/family circumstances). Being announced last, separately.
- **Announcement sequence confirmed by Jesse (2026-05-06):** Dr. D'Elia → Dr. Stewart → Dr. Wije

## Dr. Stewart Bio (Approved — from Amy Yallof, 2026-05-08, tagged Ashwin)

> **Meet Dr. Patricia Stewart.**
> Board-certified in Internal Medicine | 12+ years in the Treasure Coast | Native Floridian
>
> Dr. Stewart brings a thoughtful, patient-first approach to adult primary care — focused on building relationships over time and creating a more personal, unhurried experience.
>
> She trained at Emory, completed her residency at the University of Miami, and chose Vero Beach because she believes great primary care belongs in the places people actually want to live.

**Use this exact copy.** Replace all AI-generated bio placeholder text.

## Key Brand Decisions

- Background rule: Foam (#F5F1E8) and Sand (#E8DCC8) dominate. Atlantic (#0A3D4A) is type/footer/buttons ONLY — never a full hero or section fill.
- Sunrise gradient (#F9C784 → #EE7752) is the energy accent — hero image panels and CTA strips
- Fonts: Fraunces (display) + Cormorant Garamond (italic editorial) + Archivo (UI/labels) + Inter (body)
- Tone: boutique coastal hospitality. Never clinical, never dark.

## Doctor Layout Decisions

- Homepage: full-section animated slider (100vh per slide) for all 3 doctors (D'Elia, Stewart, Wije) with anime.js v4 transitions
- Each doctor gets an individual profile page (pattern: /doctors/stewart, /doctors/delia, /doctors/wije — or VBP-style flat /stewart, etc.)
- Nav: "Dr. Stewart" → "Our Doctors"
- Dr. Wije: placeholder card only at launch — announcement is sensitive, no bio until Jesse clears it

## Content Direction (Directional — Not Final Copy)

8-section flow provided by client (2026-05-11). Maps to Direction B layout without changing structure:
1. Hero — 3 headline options, "Now welcoming patients with Dr. Stewart" subhead, "Book an Appointment" CTA
2. Trust bar — VBP testimonials, community credibility
3. Intro — "Care that feels personal." — VBP roots, adult care next chapter
4. Dr. Stewart — Amy's approved bio, "Schedule Your First Visit" CTA
5. Care philosophy — "Care, designed differently." 4 icon points (longer visits, conversations, prevention, life-centered)
6. Services — "Comprehensive Adult Care" — 6 service cards
7. VBP connection — "A natural next step." — familiar families, seamless transition
8. CTA strip — "Your care should feel this good." — Book + Contact

Design intent: boutique hospitality, not medical. Sun & Sea color system fully expressed. Elevated + calm vs VBP.

## Content Rules (Approved)

- **Dr. Stewart is NOT a founder** — she is an employee. Important physician, but the practice will extend beyond her as more doctors are hired. Never write "founded by" or "Dr. Stewart's practice."
- **VBP connection**: "grown-up sibling" framing approved — same family, same coast, practice for adults who grew up with VBP
- **Sebastian Inlet**: in Sebastian, not Vero. Regional landing page strategy is deferred — do not replicate regional pages at launch.
- **Mockup AI copy flag**: The "Dr. Stewart founded VBAM…" bio block is AI-generated junk. Needs human-written replacement before implementation.

## Open Items

- [x] Address + phone confirmed: Citrus Medical Plaza, 959 37th Place, Vero Beach, FL 32960 · (772) 569-3212 — same location as VBP
- [ ] Client to confirm: email address
- [ ] Client to provide: hero photo, Dr. Stewart portrait, coastal brand image, VBP community image
- [ ] Client to provide: Dr. Stewart bio (replacing the AI-generated founder copy in the mockup)
- [ ] Logo concept: client to pick from 4 concepts (Sun & Sea recommended for web)
- [ ] Palette: v0.5 stakeholder review in progress
- [ ] Post-launch: evaluate regional SEO pages (Sebastian, Fort Pierce, Vero) — decide to keep, consolidate, or rework

## Slack Reference

Channel: #vero-beach-pediatrics-and-adult-medicine (ID: C0B0R4R1BK9, cruzstreet.slack.com)
Read this channel at session start for current project context. Key people: Jesse Cruz, Amy Yallof, Alex Robbins, Peter Milburn.

## Launch Status (as of 2026-05-08)

- Patient email blast sent: 3,804 patients notified of Dr. D'Elia (2026-05-07)
- Google Ads: launched 2026-05-07 by Alec, ramping
- Site: NOT YET BUILT — this is a priority

## Session State

- **Last completed:** vbam-cms-auth Worker deployed (https://vbam-cms-auth.cruzstreet-vbam.workers.dev); config.yml placeholder replaced; GitHub Actions deploy.yml created; CF workers.dev subdomain created (cruzstreet-vbam) (2026-05-12)
- **Next:** (1) User creates GitHub OAuth App at github.com/settings/developers — callback URL: https://vbam-cms-auth.cruzstreet-vbam.workers.dev/callback — then share client_id+secret so I can `wrangler secret put` them; (2) User creates CF API token (Pages:Write) at dash.cloudflare.com/profile/api-tokens and adds as CLOUDFLARE_API_TOKEN + NEXT_PUBLIC_WEB3FORMS_KEY to GitHub Actions secrets; (3) DNS cutover to vbadultmedicine.com
- **Last sync commit:** d9b15bcbe34b4d5782445732556ad26a3fb90c4e (uncommitted changes in working tree)

## Implementation Plan

Full task-by-task plan: `docs/superpowers/plans/2026-05-05-vbam-site.md`
