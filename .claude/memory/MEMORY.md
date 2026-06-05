# VBAM Site — Session Memory

## Change Log

### 2026-06-05 — staging re-homed to Jesse's CF tenant
- New staging target: `vbam-dev` Pages project (Jesse's tenant, production_branch=staging) → https://vbam-dev.pages.dev, custom domain `dev.verobeachadultmedicine.com` attached (pending Jesse's CNAME: `dev` → `vbam-dev.pages.dev`)
- Old `vbam-site` project (vbam-site.pages.dev, Ashwin's account) abandoned in place — never deploy to it
- CMS auth Worker redeployed into Jesse's tenant: `vbam-cms-auth.jesse-037.workers.dev`; Decap `config.yml` base_url/logo_url updated. Pending: Worker secrets (GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, ALLOWED_DOMAINS) + OAuth app callback URL update — CMS login broken until then
- deploy.yml staging step → vbam-dev + Jesse account ID; repo secret CLOUDFLARE_API_TOKEN rotated to Jesse's deploy token
- Rule 15 widened: any cruzstreet.com identity (jesse@ or ashwin@)
- On staging branch, not yet promoted to main

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

## Session State (paused 2026-05-28 ~21:00 IST — terminal rendering glitched, user restarting)

### What's done — pushed and live
- **Prod Pages project `vbam-site-prod`** created in Jesse's CF account (account ID `037aff9f2c67ac6312058b641540ebd5`, project ID `e7d062c6-8d3b-40d0-94c0-15685d8a1ff2`). Direct Upload mode — no CF GitHub App. URL: https://vbam-site-prod.pages.dev (verified HTTP 200)
- **Custom domains attached** to `vbam-site-prod`: `verobeachadultmedicine.com` + `www.verobeachadultmedicine.com`. Status: `initializing` (will activate after nameservers propagate)
- **`.github/workflows/deploy.yml` extended** to dual-environment: push to `main` → wrangler deploy to `vbam-site-prod`; push to `staging` → wrangler deploy to `vbam-site`. Single build step bakes `NEXT_PUBLIC_WEB3FORMS_KEY` + `NEXT_PUBLIC_KLARA_WIDGET_ID` (committed: `3a81b1e`)
- **First prod deploy ran successfully** (run #26584216918) — Klara widget loaded in HTML at `vbam-site-prod.pages.dev`
- **GH Actions secrets added**: `CLOUDFLARE_API_TOKEN_PROD`, `CLOUDFLARE_ACCOUNT_ID_PROD`, `NEXT_PUBLIC_KLARA_WIDGET_ID = 168b842c-9a0d-43dd-bc25-d0dc202289aa`
- **Domain references corrected** site-wide from `vbadultmedicine.com` → `verobeachadultmedicine.com` (commit `cbc6d5e`)
- **Staging branch** created and pushed; Decap CMS retargeted from `main` → `staging` (commit `f0b52f5`)
- **Ironside finalized brand assets** archived at `docs/brand-assets/` (commit `89dc0e8`)
- **Dr. Stewart photo** cropped to remove arms below elbows (commit `e1de488`)

### Open items (resume from here)

1. ~~**Ashwin dashboard task:**~~ DONE 2026-05-28 — `vbam-site` Pages project's production branch flipped from `main` → `staging` via CF dashboard. Verified by task 5 smoke test.
2. **GoDaddy task (Jesse):** Update nameservers at GoDaddy from `ns69.domaincontrol.com`, `ns70.domaincontrol.com` → `adam.ns.cloudflare.com`, `annabel.ns.cloudflare.com`. After propagation (1–24h) the zone will go active and `verobeachadultmedicine.com` will start resolving to `vbam-site-prod.pages.dev`.
3. ~~**Token rotation reminder:**~~ DONE 2026-05-28 — rolled "VBAM site deploy (claude)" token via CF dashboard (per-user API Tokens page; Ashwin is a Member on Jesse's CF account, so no account switcher needed). New value pasted into `CLOUDFLARE_API_TOKEN_PROD` GH secret; verified via re-run of latest main deploy workflow.
4. **Vestigial:** `NEXT_PUBLIC_WEB3FORMS_KEY` is referenced in deploy.yml but no longer used (contact form refactored to Klara CTA). Harmless. Can clean up in a future commit.
5. ~~**Test staging deploy:**~~ DONE 2026-05-28 — fast-forwarded `staging` to `main` (incl. new dual-env workflow), pushed to origin. GH Actions run #26588904871 succeeded in 45s: build ✓, prod step correctly skipped (branch ≠ main), staging step deployed via wrangler to `vbam-site` project. `https://vbam-site.pages.dev` HTTP 200 with fresh content. Dual-environment deploy verified end-to-end.

### Useful IDs (for resume)

| What | Value |
|---|---|
| Jesse's CF account ID | `037aff9f2c67ac6312058b641540ebd5` |
| Ashwin's CF account ID | `5cd6b90ef438de1c66cb99601d48c035` (hardcoded in deploy.yml) |
| `verobeachadultmedicine.com` zone ID | `31e396109293b79d4510b1a8ee36cf6f` |
| `vbam-site-prod` project ID | `e7d062c6-8d3b-40d0-94c0-15685d8a1ff2` |
| Klara widget UUID | `168b842c-9a0d-43dd-bc25-d0dc202289aa` |
| CF nameservers to set at GoDaddy | `adam.ns.cloudflare.com`, `annabel.ns.cloudflare.com` |

### Current git state at pause

- Branch: `main`, HEAD `3a81b1e` ci(deploy): two-environment workflow
- In sync with origin/main
- Local branches: `main`, `staging`, `feat/marketing-content-layer` (old, can delete)
- Untracked (not committed): `docs/claude-code-setup-guide.md`, `docs/claude-code-setup-guide.pdf` (from earlier session — keep or commit when ready), `.wrangler/` (build cache, gitignored)

- **Last sync commit:** 8c3fb99 (memory: session pause checkpoint — terminal restart)
- **Last completed:** Added Rule 16 (Sync-Before-Work — fetch + ff main/staging before any edit) and Rule 17 (Staging-First Deploy — app changes land on staging first, user reviews on `vbam-site.pages.dev`, promotion to main only after explicit satisfaction; larger work needs a `/cf-test`-style manual checklist) to project CLAUDE.md, with matching feedback memories.
- **Next:** Task 2 — Jesse's GoDaddy nameserver swap to `adam.ns.cloudflare.com` / `annabel.ns.cloudflare.com`. This is the last blocker for `verobeachadultmedicine.com` going live on `vbam-site-prod`.

## Implementation Plan

Full task-by-task plan: `docs/superpowers/plans/2026-05-05-vbam-site.md`
