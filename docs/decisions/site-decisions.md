# Site Decisions

Newest entry first.

---

## 2026-05-19 — Reviews: render our own carousel from build-time data (supersedes the embed plan)

**Decision:** Abandon the Featurable client-side **embed** and instead render VBP's reviews in our own on-brand scroll-snap carousel, fed by `reviews.json`, which is refreshed at build time by `scripts/fetch-marketing-content.ts`. Source priority: **Featurable widget API** (`/api/v1/widgets/{id}`, ~34 cached reviews, no API key) → **Google Places API** (fallback, 5-review cap, needs key) → committed snapshot.

**Why the embed was dropped:** Featurable's loader `<script>` URL is not publicly documented and wasn't discoverable (every guessed path 404'd; their own site bundles it), and the widget enforces a **client-side domain allowlist**. Rendering the data ourselves removes both problems, drops a third-party runtime script (better mobile PageSpeed), and gives full `vbam-` brand control. The Featurable **API** itself returns the full payload server-side with no key or domain gate, so it's an ideal build-time source.

**Honest attribution:** Each card is tagged "Vero Beach Pediatrics · Google" and the section says these are the sister practice's reviews — not VBAM's own (VBAM opens Sept 1 with none yet).

**Trade-offs / flags:** Reviews refresh per deploy, not live (acceptable — a 5.0/361 profile is stable; a scheduled rebuild can be added later). Featurable's `/api/v1/widgets/{id}` is undocumented and could change; the Google Places fallback + committed snapshot keep the section resilient. Widget ID defaults in-script but is overridable via `FEATURABLE_WIDGET_ID`. The carousel uses native CSS scroll-snap — no new dependency.

---

## 2026-05-19 — Reviews section: Featurable embed pulling Vero Beach Pediatrics' Google reviews

**Decision:** Populate the home "What patients say" section with a third-party **Featurable** widget that auto-pulls Google reviews for **Vero Beach Pediatrics** (the sister practice), rather than VBAM's own (VBAM has no reviews yet — opens Sept 1). Gated behind `reviewsSection.featurableWidgetId` in `home.json`; empty string falls back to the manual grid / "just getting started" empty state.

**Why:** VBP runs the "Widget for Google Reviews" (Richplugins) WordPress plugin — not portable to VBAM's static Next.js export. Featurable is a free, script-embed equivalent that works on static sites, has no 5-review cap (it caches on its own servers, unlike the raw Google Places API which returns max 5 and bars >30-day storage), and renders its own carousel. Pointing it at VBP's listing means each card is natively labeled as a Vero Beach Pediatrics review — honest attribution is built in.

**Honest-attribution guard:** Section copy was rewritten from "Reviews from real patients of the practice" to explicitly state these are **Vero Beach Pediatrics** reviews from the same family/team. Showing them as VBAM's own would be deceptive; framed as the sister practice's track record, it's truthful.

**Alternatives considered:** (A) Google Places API at build time into our own Swiper carousel — fully on-brand but capped at ~5 rotating reviews + API key plumbing; deferred. (B) Elfsight/Trustindex — paid tiers; Featurable's free tier suffices. (C) Leave empty until VBAM has its own reviews — rejected; loses the sister-practice social proof at launch.

**Trade-offs / flags:** Third-party client script (`featurable.com/assets/js/widget.js`, loaded `lazyOnload` to protect the PageSpeed ≥ 90 mobile gate — verify after go-live). External dependency + vendor account. Styling control is limited vs. `vbam-` tokens. Widget ID must be added to `home.json` before it renders.

---

## 2026-05-19 — Logo V4 hand-rebuilt as SVG; new `vbam-sun` token

**Decision:** Recreate the approved V4 logo mark directly as inline SVG (`SunSeaMark.tsx`) plus standalone `public/images/vbam-mark.svg` and `src/app/icon.svg`, rather than embedding a raster export. Added `--color-vbam-sun: #F9A826` to `globals.css`.

**Why:** The brand deliverable was provided only as a PDF (`233701 … V4`) — no SVG/EPS/PNG export, and no PDF-to-SVG tooling was available locally. The mark is simple line-art (sun, rays, two waves) that reproduces faithfully as hand-authored SVG, which stays crisp at every size, themes via props, and adds zero asset weight. The V4 sun is a flat amber distinct from both `sunrise` (#F9C784) and `coral` (#EE7752), so it needed its own token to honor the Brand Token Rule.

**Alternatives considered:** (1) Embed a PNG of the logo — rejected: blurry at retina/large sizes, heavier, not themeable. (2) Hardcode the sun hex in the component — rejected: violates Brand Token Rule. (3) Wait for the designer's vector files — viable for a pixel-perfect lockup, but blocks the requested update; the hand-built mark is faithful to the V4 geometry.

**Follow-ups / flags:**
- Visual fidelity should be eyeballed on the live deploy; if the designer later provides official vector files, swap them in (the token + component structure make this a drop-in).
- The full **wordmark lockup** ("Vero Beach Adult Medicine" + tagline) remains live HTML text (Fraunces/Cormorant/Archivo) in Header/Footer — not converted to a single SVG, since text-to-path can't be hand-traced reliably. A single-file logo lockup still needs the designer's vector.
- `docs/design-system.html` / `docs/screens.html` should be refreshed to show the V4 mark (Design Memory Rule) — not done in this change.

---

## 2026-05-11 — Dr. Stewart positioning: employee, not founder

**Decision:** All copy must describe Dr. Stewart as a key physician and important member of the practice — not as founder or owner. The practice is structured to grow beyond any single doctor; additional physicians will be hired over time.

**Why:** Accurate. She did not found the practice and the practice will extend beyond her. Framing her as founder misrepresents the business and creates messaging problems when new doctors join.

**Alternatives considered:** "Founded by Dr. Stewart" language (AI-generated in mockup — rejected). "Dr. Stewart leads the practice" framing is acceptable as long as it doesn't imply sole-founder status.

**Content flag:** The mockup bio block reads "Dr. Stewart founded VBAM to practice medicine the way she always wished she could…" — this must be rewritten before implementation.

---

## 2026-05-11 — Multi-doctor layout: scrollable homepage section + individual profile pages

**Decision:** Homepage "Meet the Doctors" section uses a horizontal scroll (carousel) to show all three physicians — Dr. D'Elia, Dr. Patricia Stewart, Dr. Wije. Each doctor also gets their own individual profile page (pattern mirrors VBP's /delia/ page).

**Why:** Practice has three physicians at launch, not just Dr. Stewart. Scroll pattern keeps the homepage layout intact (Direction B structure) while accommodating growth. Individual pages give each doctor SEO presence and a dedicated canonical URL.

**Nav impact:** "Dr. Stewart" nav item becomes "Our Doctors" (or equivalent) linking to the multi-doctor section or a doctors index page.

**Alternatives considered:** Single-doctor homepage with others on an inner page (rejected — undersells the practice depth at launch).

---

## 2026-05-11 — Homepage content direction brief (8-section flow)

**Decision:** The following directional copy maps to Direction B's layout structure. Not final copy — intended to guide screens.html with intentional content instead of placeholder text. Structure must not change.

**Section mapping (Direction B layout → content brief):**

| Section | Content direction |
|---|---|
| Hero | Headline: "Primary care, reimagined for Vero Beach" / "Modern care. Coastal calm." / "A more thoughtful approach to adult medicine" — Subhead: "Now welcoming patients with Dr. Patricia Stewart…" — CTA: "Book an Appointment" / "Become a Patient" |
| Trust bar | "Trusted by the Vero Beach community" + "From the families who know and trust VBP" + 3 patient testimonials |
| VBP sibling / Intro | "Care that feels personal." — rooted in VBP, next chapter for adults who value thoughtful personalized care |
| Dr. Stewart | "Meet Dr. Patricia Stewart" — patient-first, long-term relationships, unhurried. Use Amy's approved bio. CTA: "Learn More" / "Schedule Your First Visit" |
| Three quiet promises → Care philosophy | "Care, designed differently." — 4 icon-based points: longer visits, thoughtful conversations, prevention focus, care around your life |
| Services grid | "Comprehensive Adult Care" — 6 services: Preventative Care & Physicals, Chronic Condition Management, Women's & Men's Health, Same-Day Sick Visits, Ongoing Wellness & Lifestyle, (6th TBD) |
| Same family / Same coastline | "A natural next step." — families who trusted VBP, seamless transition to adult care |
| CTA strip | "Your care should feel this good." — "Book an Appointment" + "Contact Us" |

**Design notes from brief:** Fully incorporate Sun & Sea color system (not just logo). Gradients and coastal tones used with intention. Whitespace-driven. Boutique hospitality feel, not traditional medical. Mirror VBP structure but more elevated, calm, refined.

**Why:** Enough direction to build screens.html with real content instead of lorem ipsum. Stakeholder-approved structure + tone.

---

## 2026-05-11 — Homepage direction: Direction B confirmed

**Decision:** Direction B (the "Quiet care, quietly confident." layout) is the approved homepage direction. Foam/Sand backgrounds throughout, split hero with coastal image right, orange CTA, trust ticker bar, VBP sibling section, Dr. Stewart section, Three Promises, Services grid, Same Family / Same Coastline section, Atlantic footer.

**Why:** Selected after review of all three directions by the Brewer International project team. Direction B best matches the boutique coastal brand tone — warm, not clinical. Design B also confirmed as the winner.

**Alternatives considered:** Other directions reviewed and passed on. Pre-roll looping video header is a post-launch enhancement (modeled on the VBP approach) — not in scope for launch.

**Content note:** Some AI-generated placeholder copy made it into the mockup and must be audited before implementation. The Dr. Stewart bio is the known instance.

---

## 2026-05-11 — Sebastian Inlet regional landing pages: decision deferred to post-launch

**Decision:** The existing vbadultmedicine.com site has three regional landing pages (Sebastian, Fort Pierce, Vero) served geographically — an SEO play built by the original agency to signal local relevance to surrounding communities. We are not replicating this pattern in the new site at launch.

**Why:** Sebastian Inlet is in Sebastian, not Vero Beach — the geographic framing is inaccurate and could undermine the Vero-first brand identity we're building. The strategy decision (keep regional pages, consolidate around Vero, or rework) requires deliberate input from client and SEO review, not a rushed call before launch.

**Post-launch action needed:** Evaluate the regional pages' traffic contribution, decide on consolidation vs. rework, then implement a redirects strategy in `app/public/_redirects`.

---

## 2026-05-05 — Design workflow: Claude Design before implementation

**Decision:** Use Claude Design (claude.ai) to generate and approve homepage direction before any Next.js components are built. Approved output becomes the source of truth for screens.html and design-system.html.

**Why:** Claude Design produces production-quality visual mockups with correct font rendering and gradient fidelity. Building screens.html from approved Claude Design output ensures implementation matches what stakeholders approved.

**Alternatives considered:** Building HTML mockups directly in browser companion (done as exploration, but quality insufficient for stakeholder approval). Figma (available but Claude Design faster for this scope).

---

## 2026-05-05 — Background color rule: Foam/Sand dominant, Atlantic never a hero fill

**Decision:** Foam (#F5F1E8) and Sand (#E8DCC8) are the dominant page backgrounds. Atlantic (#0A3D4A) is reserved for body text, nav links, footer, and CTA buttons only — never used as a full hero or section background fill.

**Why:** Brand presentation explicitly calls for "warm, not clinical" and "bright, not loud." Dark Atlantic backgrounds read as clinical/hospital. The presentation itself uses Foam as its own background throughout. Stakeholder feedback during mockup review confirmed darker directions were off-brand.

**Alternatives considered:** Atlantic-led hero (Direction B in mockup session — rejected as off-brand).

---

## 2026-05-05 — Tech stack selection

**Decision:** Next.js 15 static export on Cloudflare Pages, Tailwind CSS 4, TypeScript strict, pnpm, Web3Forms.

**Why:** Identical to brewer-international — proven stack, zero hosting cost on CF Pages free tier, fast build, no server required for contact form.

**Alternatives considered:** WordPress (rejected — no developer control, slow, requires hosting), Astro (rejected — team preference for Next.js continuity).

---

## 2026-05-05 — Logo concept: Sun & Sea (Concept 01) recommended for web

**Decision:** Sun & Sea (Concept 01 from brand presentation) is the recommended mark for the website hero and nav. Client has not locked a concept yet — implementation will use a faithful SVG approximation until the final mark is delivered.

**Why:** Brand presentation explicitly notes Sun & Sea "photographs beautifully on a website hero." The full sun + 3 waves composition carries the most narrative weight and works at web scale. Daybreak (Concept 02) is better for favicon/monogram use.

**Alternatives considered:** Daybreak (too minimal for hero), Coastline Disc (better as standalone social avatar), Inlet Block (most professional but designed for print/signage).

---

## 2026-05-05 — Typography: Fraunces + Cormorant Garamond + Archivo + Inter

**Decision:** Fraunces for display headings, Cormorant Garamond italic for editorial/name moments, Archivo for all UI labels/nav/CTAs, Inter for body text.

**Why:** Directly specified in brand presentation (page 03). "A refined serif (Fraunces or Cormorant) carries the practice name with quiet authority. A modern sans (Archivo) handles the architectural moments."

**Alternatives considered:** Playfair Display (used in early mockups before presentation was reviewed — replaced).
