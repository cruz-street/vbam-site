# Vero Beach Adult Medicine — Rules

New Next.js marketing site for VBAM, deployed on Cloudflare Pages.
Client: Dr. Patricia Stewart · Domain: verobeachadultmedicine.com

---

## Rules

### 1. Brand Token Rule (Non-Negotiable)
All colors come from `app/src/app/globals.css` `@theme {}` Tailwind tokens (prefix `vbam-`).
Never use ad-hoc hex values in components. When v0.5 palette is approved, update
`globals.css` only — no component files need changing.

### 2. Plan Before Code
Every phase starts with a plan in `docs/superpowers/plans/`. No components, no
routes until the plan is reviewed.

### 3. SEO Gate (Non-Negotiable)
Five-point checklist must pass before DNS cutover:
- [ ] Every URL mapped in `app/public/_redirects`
- [ ] `metadata` export on every page (title, description, canonical)
- [ ] `app/sitemap.ts` generated and verified
- [ ] `app/robots.ts` correct
- [ ] JSON-LD on home + contact pages

### 4. Forms
Use Web3Forms for the contact/appointment form. Honeypot field required.
Env var: `NEXT_PUBLIC_WEB3FORMS_KEY`. No server required.

### 5. Context7 Rule
Before any library or infrastructure work, fetch current docs via Context7 MCP.
Do not rely on training data for Next.js, Cloudflare Pages, or Tailwind CSS 4.

### 6. Memory Rule
`.claude/memory/` files are committed. Update `MEMORY.md` after every session.

### 7. Changelog Rule
Update `[Unreleased]` in `CHANGELOG.md` after every feature. Keep a Changelog format.
Do not batch — write as work is done.

### 8. Deployment Log Rule
Record every CF Pages deployment in `DEPLOYMENTS.md` with date, URL, commit, notes.

### 9. Decision Log Rule
Every architecture or design decision goes in `docs/decisions/site-decisions.md`
(newest entry first). Include what was decided, why, and alternatives considered.

### 10. Design Memory Rule (Non-Negotiable)
- `docs/design-system.html` — visual token + component reference
- `docs/screens.html` — canonical page wireframes
Before any UI work: open `docs/screens.html`. After any design change: update both files.
Both files are updated from the approved Claude Design output before implementation starts.

### 11. screens.html is Canonical (Non-Negotiable)
`docs/screens.html` is the single source of truth for layouts. Before adding any UI,
verify layout exists there. Never introduce a new layout without adding it first.

### 12. Design Commandments Gate (Non-Negotiable)
Before implementing any component, check all 7:
1. Clarity First — visitor understands the practice in 5 seconds
2. Performance — PageSpeed ≥ 90 mobile
3. SEO Baked In — semantic HTML, no div-soup headings
4. Image Intentionality — meaningful alt text on every image
5. Mobile Responsive — every component verified on mobile
6. YAGNI — no features beyond the 5 planned pages
7. Brand Consistency — only locked vbam- tokens

### 13. Refactor After It Works
No refactoring during feature work. Build it, make it work, then refactor.

### 14. CodeFoundry Confidentiality Rule
Nothing identifying the internal development toolchain may be committed to this repo
in any file, comment, or commit message.

### 15. Git Identity Rule (Non-Negotiable)
All work on this project must be committed under the `ashwin@cruzstreet.com` identity,
not the `ashwin_eviocld` / iCD account or any personal Gmail. Local repo config
(`.git/config`) must be set to:
- `user.name = Ashwin Chandran`
- `user.email = ashwin@cruzstreet.com`

Before pushing, confirm `git config --local user.email` returns the cruzstreet
address. Push credentials (keychain PAT) must also map to a GitHub account with
write access to `cruz-street/vbam-site` — the iCD account does not.

### 16. Sync-Before-Work Rule (Non-Negotiable)
Before starting any change in this repo — whether a one-line tweak or a multi-file
feature — Claude (and any human collaborator) must pull the latest from the relevant
remote branches. Stale branches cause merge conflicts, accidental reverts of
collaborator work, and broken staging/prod parity.

**Required steps before the first edit of a session, or any time work resumes:**

1. `git fetch --all --prune`
2. Pull `main`:
   - `git checkout main && git pull --ff-only`
3. Pull `staging` (because most changes land there first per Rule 17):
   - `git checkout staging && git pull --ff-only`
4. Confirm both branches are at their respective `origin/<branch>`:
   - `git log --oneline -1 main` matches `origin/main`
   - `git log --oneline -1 staging` matches `origin/staging`
5. If `staging` is behind `main` (because a hotfix landed directly on main):
   - Fast-forward staging up to main before starting new work: `git merge --ff-only main`
6. Only then create the working branch or start editing.

**If a fast-forward isn't clean** (the branches have diverged), stop and surface
this to the user before doing anything else. Do NOT resolve divergence with
destructive operations (`git reset --hard`, `git push --force`) without explicit
user instruction.

**Skip-able only when:** the session is clearly resuming work already in flight
in the same calendar day with no commits from anyone else since (e.g., the user
just paused and came back). When in doubt, sync anyway — it's cheap.

### 17. Staging-First Deploy Rule (Non-Negotiable)
Whenever any change is made to the application — anything under `app/` (components,
pages, content files, public assets, styles, config), `.github/workflows/`, or anything
else that affects the built/deployed site — Claude must follow this flow:

1. **Push to `staging` first.** Never push application changes directly to `main`.
   Commit on `staging` (or merge a feature branch into `staging`).
2. **After the push, wait for the GH Actions deploy to finish**, then print the
   staging URL in the terminal: `https://vbam-site.pages.dev`. Include the run
   number/link from `gh run list` so the user can inspect logs if needed.
3. **Ask the user to review the changes on the live staging URL** before doing
   anything else. Do not assume satisfaction — wait for explicit confirmation.
4. **Only after the user confirms satisfaction**, offer to promote to production
   by merging `staging` → `main` (fast-forward where possible). State clearly that
   this will deploy to `verobeachadultmedicine.com`.

**For larger feature/fix work** (anything beyond a trivial copy/style tweak — new
sections, new pages, refactors, animation work, form changes, accessibility passes,
SEO changes, anything touching 3+ files, or anything where regressions are plausible):

- Before asking the user to review the staging URL, **generate a manual test
  checklist** modeled on the CodeFoundry `/cf-test` pattern: enumerate the golden
  path, the edge cases, and any browsers/viewports/states that need verification
  (mobile, desktop, dark/light if applicable, keyboard nav, empty/loaded states,
  form validation, etc.).
- Print the checklist to the terminal and have the user walk through it on the
  staging URL.
- Only promote to `main` after the user reports the checklist passes.

**Exemptions** — the staging-first flow does NOT apply to repo-meta changes that
don't affect the built site:
- `.claude/memory/*` updates
- `CHANGELOG.md`, `DEPLOYMENTS.md`, `docs/decisions/*` updates
- Untracked-doc additions under `docs/` that aren't published (the site doesn't
  serve `docs/`)
- Pure README / CLAUDE.md edits

These can be committed directly to `main` as session-end checkpoints.

**Hotfix carve-out:** If a hotfix to production is genuinely time-critical (broken
prod, security issue), it may go directly to `main` — but Claude must (a) flag it
explicitly as a hotfix and get user confirmation before pushing, and (b) immediately
rebase `staging` onto `main` afterward so the branches don't diverge.

---

## Staging / Production Workflow

Two Cloudflare Pages projects deploy from this one repo on different branches.

| Environment | Branch | URL | CF Account |
|---|---|---|---|
| **Production** | `main` | `verobeachadultmedicine.com` (+ `vbam-site-prod.pages.dev`) | Jesse's Cruz Street CF |
| **Staging / dev** | `staging` | `vbam-site.pages.dev` | ashwin@cruzstreet.com |

### Decap CMS

`app/public/admin/config.yml` is set to commit to **`staging`**. Content edits made
in the Decap UI at `https://vbam-site.pages.dev/admin/` (or future
`verobeachadultmedicine.com/admin/`) land on the staging branch first, deploy to
`vbam-site.pages.dev`, and stay there until promoted.

### Promotion flow (staging → prod)

1. Verify the change on `vbam-site.pages.dev`
2. Merge `staging` → `main` on GitHub (PR or fast-forward)
3. CF Pages builds `main` and the prod URL `verobeachadultmedicine.com` updates in ~2 min

### Code changes

Land on `staging` first (same flow as CMS edits). Merge to `main` to release.
Hotfixes can go directly to `main` if needed — but you must then rebase `staging`
on top so the branches don't diverge.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router, `output: 'export'`) |
| Hosting | Cloudflare Pages |
| Forms | Web3Forms (`NEXT_PUBLIC_WEB3FORMS_KEY`) |
| DNS/CDN | Cloudflare |
| SEO | Next.js metadata API + sitemap.ts + robots.ts + JSON-LD |
| Redirects | `app/public/_redirects` (CF Pages native) |
| Package manager | pnpm |
| Styling | Tailwind CSS 4 |
| TypeScript | Strict mode |

Do not introduce new libraries without a Decision Log entry.

---

## Brand System

**Status:** v0.4 in stakeholder review. v0.5 will lock final values.
When v0.5 is approved, update `globals.css @theme {}` hex values only.

### Color Tokens (v0.4)
| Token | Name | Hex | Role |
|---|---|---|---|
| `vbam-atlantic` | Atlantic | `#0A3D4A` | Anchor — type, nav, footer, CTA buttons |
| `vbam-inlet` | Inlet | `#1A6B7E` | Mid teal — gradients, hover states |
| `vbam-sea-glass` | Sea Glass | `#5FB3C0` | Light teal — wave accents, icon fills |
| `vbam-sunrise` | Sunrise | `#F9C784` | Warm gold — gradient start, accents |
| `vbam-coral` | Coral | `#EE7752` | Energy — gradient end, CTA accents |
| `vbam-sand` | Sand | `#E8DCC8` | Warm neutral — section backgrounds |
| `vbam-foam` | Foam | `#F5F1E8` | Paper — primary page background |

**Gradient usage:**
- Sunrise gradient: `#F9C784 → #EE7752` — hero image panels, CTA strips
- Atlantic gradient: `#1A6B7E → #0A3D4A` — footer, deep accent sections
- Sky-to-sea: `#F9C784 → #C8D8E8 → #5FB3C0` — hero image stand-ins

**Background rule:** Foam and Sand are the dominant page backgrounds.
Atlantic is NEVER used as a full hero or section fill — only text, footer, and small buttons.

### Typography
| Role | Font | Weight |
|---|---|---|
| Display headings | Fraunces | 600–700 |
| Italic editorial moments | Cormorant Garamond | 400–600 italic |
| Body text | Inter | 400–500 |
| UI labels, nav, CTAs | Archivo | 500–700 |

### Wordmark
- "Vero Beach" — upright Fraunces 600
- "Adult Medicine" — italic Cormorant Garamond, sunrise gradient fill
- Tagline — "SUNRISE TO SHORELINE CARE" in Archivo 700, small caps, spaced

### Logo
Sun & Sea mark (Concept 01 from brand presentation):
- Sunrise-gradient circle sun (radial: `#F9C784` → `#EE7752`)
- 5 geometric rays in `#F9C784`
- 3 wave lines: Inlet `#1A6B7E`, Sea Glass `#5FB3C0`, Sea Glass 50%
- SVG inline — no external CDN

---

## Site Map

| Route | Page |
|---|---|
| `/` | Home (8 sections) |
| `/about/` | About — Dr. Patricia Stewart |
| `/services/` | Services listing |
| `/for-patients/` | New patient info, insurance, FAQs |
| `/contact/` | Contact + Appointment Request form |

---

## Design Workflow

1. **Claude Design** (claude.ai) → generate approved homepage direction
2. **screens.html** → updated to match approved design before any code
3. **design-system.html** → tokens and components extracted from approved design
4. **Implementation** → components built to match screens.html exactly

---

## Project Structure

```
vbam-site/
├── CLAUDE.md                         ← this file
├── CHANGELOG.md
├── DEPLOYMENTS.md
├── .claude/
│   └── memory/
│       ├── MEMORY.md                 ← phase tracker (update every session)
│       └── seo-map.md                ← URL inventory
├── docs/
│   ├── design-system.html            ← visual token + component reference
│   ├── screens.html                  ← canonical page wireframes (FROM CLAUDE DESIGN)
│   ├── arch/
│   │   └── design-system.md          ← written design spec
│   ├── decisions/
│   │   └── site-decisions.md         ← all architecture + design decisions
│   └── superpowers/
│       └── plans/
│           └── 2026-05-05-vbam-site.md
└── app/                              ← Next.js project (created in Phase 2)
    ├── next.config.ts
    ├── package.json
    ├── tsconfig.json
    ├── public/
    │   ├── _redirects
    │   └── images/
    └── src/app/
        ├── globals.css               ← Tailwind @theme with vbam- tokens
        ├── layout.tsx
        ├── page.tsx
        ├── sitemap.ts
        ├── robots.ts
        ├── about/page.tsx
        ├── services/page.tsx
        ├── for-patients/page.tsx
        ├── contact/page.tsx
        └── components/
            ├── layout/Header.tsx
            ├── layout/Footer.tsx
            ├── home/
            └── shared/
```
