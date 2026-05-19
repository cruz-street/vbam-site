# VBAM Marketing Content Layer — Design Spec

**Date:** 2026-05-19
**Status:** Approved (revised after pull — 2026-05-19 17:00)
**Author:** Ashwin Chandran / Cruz Street

---

## Overview

Add a marketing content layer to the VBAM homepage covering: Google Reviews, Instagram + Facebook social feed, YouTube video gallery, CSS parallax on the hero, and a Klara floating chat widget. All dynamic content is fetched at build time via first-party APIs — no third-party widget JS (no Elfsight or equivalent).

## Already In Production (Out of Scope for This Spec)

A `git pull` on 2026-05-19 revealed these items have already shipped — they are no longer part of this spec:

- ✅ Privia attribution band + compliance link row in `Footer.tsx` (links go directly to Privia's hosted Notice of Nondiscrimination and HIPAA Privacy Notice pages, not local stubs)
- ✅ Footer Patient Portal (MyPrivia) + Bill Pay (AthenaHealth) links in the Patients column
- ✅ `PriviaSection` on the homepage (dedicated section explaining Privia ACO membership)
- ✅ `parentOrganization` Schema.org JSON-LD adding Privia Medical Group as parent org
- ✅ Klara **contact-page CTA panel** at `/contact/` — "Schedule a Visit" button linking to the Klara widget URL

What's **still pending** is everything else in this spec: Reviews, Videos, Social Feed, hero parallax, and the **site-wide Klara floating "Message us" button** (distinct from the contact-page CTA panel — the floating widget appears on every page, bottom-right, identical to VBP).

---

## Goals

- Surface social proof (reviews, social posts, video) without adding third-party JS
- Match VBP's compliance footer (Privia banner, HIPAA, Nondiscrimination links)
- Add Klara patient messaging widget (floating button, identical to VBP)
- Keep PageSpeed mobile ≥ 90
- All review and social content fully indexable by Googlebot (static HTML)

---

## Architecture

### Build-Time Content Fetching

A single script `scripts/fetch-marketing-content.ts` runs as part of `pnpm build`. It fetches from three first-party APIs and writes three JSON content files consumed by React components at build time. API keys are stored as Cloudflare Pages environment variables — never exposed to the browser.

```
pnpm build
  └── scripts/fetch-marketing-content.ts
        ├── Google Places API  →  src/content/reviews.json
        ├── Meta Graph API     →  src/content/social.json
        └── (YouTube)          →  src/content/videos.json  (manual curation, no API)
```

### Content Freshness

A GitHub Actions cron job (`0 6 * * *`) hits a Cloudflare Pages deploy hook URL daily at 6am. This triggers a full rebuild, re-running the fetch script and refreshing all API-sourced content without manual intervention.

### Static Export Constraint

`output: 'export'` is unchanged. No API routes, no server. All data is baked into JSON at build time and rendered as static HTML.

---

## Environment Variables (Cloudflare Pages)

| Variable | Purpose |
|---|---|
| `GOOGLE_PLACES_API_KEY` | Places API (New) — server-side only |
| `GOOGLE_PLACE_ID` | VBAM's Google Business Profile Place ID |
| `META_PAGE_ACCESS_TOKEN` | Long-lived Facebook Page Access Token (60-day expiry) |
| `FACEBOOK_PAGE_ID` | VBAM Facebook Page ID |
| `INSTAGRAM_USER_ID` | VBAM Instagram Business Account User ID |
| `CF_PAGES_DEPLOY_HOOK` | Used by GitHub Actions cron to trigger daily rebuild |

---

## New Homepage Sections

Three new sections grouped together as "social proof / engagement" content, inserted between the existing `FlowSection` and `CtaStrip`. CSS parallax is added to `HeroSection`. All other existing sections remain in place and unchanged.

Final section order:

```
HeroSection          ← CSS parallax added to image panel
TrustBar
PositioningSection
DoctorsSection
PhilosophySection
ServicesSection
VbpSection
PriviaSection        (already in production)
FlowSection          (already in production)
ReviewsSection       ← NEW
VideosSection        ← NEW
SocialFeedSection    ← NEW
CtaStrip
```

---

## Section Designs

### ReviewsSection

**Data source:** `src/content/reviews.json` — populated by Google Places API (New).

**Schema:**
```ts
interface Review {
  author: string;
  rating: number;        // 1–5
  text: string;
  relativeTime: string;  // e.g. "2 months ago"
  profilePhoto: string;  // URL from Google
}

interface ReviewsContent {
  placeRating: number;
  totalRatings: number;
  reviews: Review[];
}
```

**Empty state:** When VBAM has no reviews yet (new practice), show a CTA card: "We're just getting started — leave us a review on Google" with a link to the Google Business Profile listing.

**Component:** `src/components/home/ReviewsSection.tsx`
- Horizontal scroll carousel on mobile, 3-column grid on desktop
- Star rating display using inline SVG (no icon lib)
- Section heading: *"What patients are saying."*
- Google attribution logo per Places API terms of service

**SEO:** Add `AggregateRating` to homepage JSON-LD in `page.tsx` using `placeRating` and `totalRatings` values from `reviews.json`.

---

### VideosSection

**Data source:** `src/content/videos.json` — manually curated, no API.

**Schema:**
```ts
interface Video {
  id: string;       // YouTube video ID
  title: string;
  description?: string;
}
```

**Component:** `src/components/home/VideosSection.tsx`
- Uses `lite-youtube-embed` — renders thumbnail only, loads iframe on click
- 2-column grid desktop, 1-column mobile
- Section heading: *"See us in action."* (editable via CMS)
- Empty state: section hidden entirely when `videos.json` array is empty

**New dependency:** `lite-youtube-embed` — add to `package.json`.

---

### SocialFeedSection

**Data source:** `src/content/social.json` — populated by Meta Graph API.

**Schema:**
```ts
interface SocialPost {
  platform: 'instagram' | 'facebook';
  id: string;
  caption: string;
  mediaUrl: string;    // image/video thumbnail URL
  permalink: string;
  timestamp: string;
}
```

**Component:** `src/components/home/SocialFeedSection.tsx`
- Masonry-style grid, max 6 posts (3 Instagram + 3 Facebook or whatever mix is available)
- Each card: image, truncated caption (2 lines), platform badge, link to original post
- Section heading: *"Follow along."*
- Platform filter tabs: All / Instagram / Facebook
- Empty state: section hidden when `social.json` array is empty

**Token note:** Meta long-lived tokens expire in 60 days. A token expiry produces an empty `social.json` gracefully (fetch script catches the error, writes `[]`). The daily deploy will surface this via a failed fetch log in CF Pages build output. Manual token refresh required every ~50 days — document in `DEPLOYMENTS.md`.

---

### CSS Parallax (HeroSection)

**Approach:** `background-attachment: fixed` on the hero image panel gradient element.

**iOS fallback:** `@media (pointer: coarse) { background-attachment: scroll }` — mobile Safari does not support fixed backgrounds; this disables parallax on touch devices without JS.

**No library added.** Pure CSS change to `HeroSection.tsx`.

---

## Klara Floating Widget (Site-Wide)

This is a separate integration from the existing contact-page CTA panel. The contact-page CTA opens Klara via a button click; this floating widget renders an always-visible "Message us" button on **every page**, bottom-right corner, identical to VBP.

**Integration:** Single `<Script>` tag in `src/app/layout.tsx` using `strategy="lazyOnload"`.

```tsx
<Script
  src="https://patient.klara.com/widget.js"
  data-widget-id="<VBAM_WIDGET_UUID>"
  strategy="lazyOnload"
/>
```

VBAM gets its own Klara widget UUID from their Klara account (separate from VBP's `168b842c-9a0d-43dd-bc25-d0dc202289aa`). Renders an identical floating "Message us" button bottom-right.

**Prerequisite:** VBAM Klara account must be active before this UUID is available. If the widget UUID is not yet provisioned at implementation time, the `<Script>` tag is added but commented out with a TODO referencing the spec — the surrounding code is ready to drop the UUID in.

---

## `scripts/fetch-marketing-content.ts` — Behaviour Spec

- Runs via `"prebuild": "tsx scripts/fetch-marketing-content.ts"` in `package.json`
- Each API section is independently try/caught — one failure does not block the others
- On failure: retains the previous JSON file contents if it exists, logs a warning
- On missing env vars: skips that section, logs which var is missing
- Writes pretty-printed JSON for CMS readability

### Google Places fetch
- Endpoint: `GET https://places.googleapis.com/v1/places/{GOOGLE_PLACE_ID}`
- Headers: `X-Goog-Api-Key`, `X-Goog-FieldMask: reviews,rating,userRatingCount,displayName`
- Maps response to `ReviewsContent` schema

### Meta Graph fetch
- Instagram: `GET https://graph.instagram.com/{INSTAGRAM_USER_ID}/media?fields=id,caption,media_type,media_url,permalink,timestamp&limit=6`
- Facebook: `GET https://graph.facebook.com/{FACEBOOK_PAGE_ID}/posts?fields=message,full_picture,permalink_url,created_time&limit=6`
- Merges and sorts by timestamp descending, caps at 6 total posts

---

## Performance Contract

| Metric | Target |
|---|---|
| PageSpeed mobile | ≥ 90 |
| Extra client-side JS | `lite-youtube-embed` (~10KB) + Klara widget (~60KB, lazyOnload) |
| CLS | 0 — no injected widgets; all content is static HTML |
| LCP | Unaffected — new sections are below the fold |
| Googlebot indexable | Yes — all review text, captions, video titles in static HTML |

---

## Files Created / Modified

| File | Change |
|---|---|
| `scripts/fetch-marketing-content.ts` | New — build-time API fetch script |
| `src/content/reviews.json` | New — Google reviews data |
| `src/content/social.json` | New — Instagram + Facebook posts |
| `src/content/videos.json` | New — YouTube video IDs (manual) |
| `src/content/home.ts` | Add exports for new section content |
| `src/content/home.json` | Add headings/eyebrows for new sections |
| `src/components/home/ReviewsSection.tsx` | New |
| `src/components/home/VideosSection.tsx` | New |
| `src/components/home/SocialFeedSection.tsx` | New |
| `src/components/home/HeroSection.tsx` | Add CSS parallax |
| `src/app/page.tsx` | Add 3 new sections, update JSON-LD with `aggregateRating` |
| `src/app/layout.tsx` | Add Klara floating-widget `<Script>` tag |
| `package.json` | Add `lite-youtube-embed`, `tsx` (dev), prebuild script |
| `.github/workflows/daily-content-refresh.yml` | New — cron deploy hook |
| `CHANGELOG.md` | Update `[Unreleased]` |

---

## Out of Scope

- VBAM Klara widget UUID (requires active Klara account — `<Script>` tag stays commented until provisioned)
- VBAM Google Place ID (requires live Google Business Profile)
- Meta token auto-refresh (manual every ~50 days, documented in DEPLOYMENTS.md)
- Regional SEO pages (deferred per prior decision)
- Footer Privia attribution band, compliance links, MyPrivia/AthenaHealth links — already in production
- PriviaSection homepage component — already in production
- Klara contact-page CTA panel — already in production
- Local compliance stub pages — not needed, footer links go directly to Privia's hosted pages
