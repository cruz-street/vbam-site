# Site Decisions

Newest entry first.

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
