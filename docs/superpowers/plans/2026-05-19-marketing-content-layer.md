# Marketing Content Layer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Google Reviews, Instagram + Facebook social feed, YouTube video gallery, hero parallax, and the site-wide Klara floating widget to VBAM — all dynamic content fetched at build time via first-party APIs (no third-party widget JS).

**Architecture:** A Node script (`scripts/fetch-marketing-content.ts`) runs in the `prebuild` lifecycle hook, fetches from Google Places API and Meta Graph API, and writes JSON files into `src/content/`. React components import the JSON at module load and render static HTML. YouTube uses `lite-youtube-embed` (thumbnail only until click). Klara is a single client-side `<Script>` in `layout.tsx`. A GitHub Actions cron triggers a CF Pages deploy daily to refresh content.

**Tech Stack:** Next.js 16 (static export, output: 'export'), React 19, TypeScript 5, Tailwind 4, pnpm, `tsx` (Node TS runner), `lite-youtube-embed`, GitHub Actions for cron.

**Project conventions (read before starting):**
- All work happens inside `app/` (the Next.js project root).
- Content is JSON in `src/content/*.json` with a sibling `*.ts` typed export. Components import from the `.ts`, never the `.json` directly.
- Tailwind brand tokens are `vbam-*` (atlantic, inlet, sea-glass, sunrise, coral, sand, foam). Never use ad-hoc hex.
- Existing animation system uses anime.js v4 with `prefers-reduced-motion` checks. Match this pattern.
- This repo has NO unit test framework. Verification = `pnpm tsc --noEmit`, `pnpm build`, and `pnpm dev` manual browser check. Each task ends with a build + commit.

---

## File Structure

| File | Responsibility |
|---|---|
| `app/scripts/fetch-marketing-content.ts` | Build-time API fetch — writes reviews.json + social.json |
| `app/src/content/reviews.json` | Google Places API output (review array + aggregate rating) |
| `app/src/content/reviews.ts` | Typed re-export + `Review` / `ReviewsContent` type |
| `app/src/content/social.json` | Meta Graph API output (Instagram + Facebook posts merged) |
| `app/src/content/social.ts` | Typed re-export + `SocialPost` type |
| `app/src/content/videos.json` | Manually curated YouTube video list |
| `app/src/content/videos.ts` | Typed re-export + `Video` type |
| `app/src/content/home.json` | Add `reviewsSection`, `videosSection`, `socialSection` heading content |
| `app/src/content/home.ts` | Add exports for the new section heading objects |
| `app/src/components/home/ReviewsSection.tsx` | Reviews carousel UI |
| `app/src/components/home/VideosSection.tsx` | YouTube grid UI (uses `lite-youtube-embed`) |
| `app/src/components/home/SocialFeedSection.tsx` | Social masonry UI + platform filter |
| `app/src/components/home/HeroSection.tsx` | Add scroll-linked parallax via CSS var |
| `app/src/app/layout.tsx` | Add Klara floating-widget `<Script>` tag |
| `app/src/app/page.tsx` | Insert new sections + `aggregateRating` JSON-LD |
| `app/package.json` | Add deps + `prebuild` script |
| `.github/workflows/daily-content-refresh.yml` | Daily cron that pings CF Pages deploy hook |
| `CHANGELOG.md` | `[Unreleased]` entries |

---

## Task 1: Add dependencies

**Files:**
- Modify: `app/package.json`

- [ ] **Step 1: Add dependencies via pnpm**

Run from `/Users/ashwinchandran/work/vbam-site/app/`:

```bash
pnpm add lite-youtube-embed
pnpm add -D tsx
```

This installs `lite-youtube-embed` (CSS + JS for click-to-load YouTube thumbnails) and `tsx` (Node TypeScript runner used for the prebuild script).

- [ ] **Step 2: Verify package.json**

Expected new entries:
- `"dependencies": { ..., "lite-youtube-embed": "^0.3.x" }`
- `"devDependencies": { ..., "tsx": "^4.x" }`

- [ ] **Step 3: Commit**

```bash
git add app/package.json app/pnpm-lock.yaml
git commit -m "feat: add lite-youtube-embed + tsx for build-time content fetch"
```

---

## Task 2: Add new section heading content to home.json

**Files:**
- Modify: `app/src/content/home.json`
- Modify: `app/src/content/home.ts`

- [ ] **Step 1: Add heading objects to home.json**

Insert these three keys at the top level of `home.json` (alongside `vbpSection`, `flowSection`, etc.):

```json
"reviewsSection": {
  "eyebrow": "What patients say",
  "headingLine1": "Trusted by our",
  "headingItalic": "neighbors.",
  "body": "Reviews from real patients of the practice — verified through Google.",
  "emptyTitle": "We're just getting started.",
  "emptyBody": "Be the first to share your experience with Vero Beach Adult Medicine.",
  "emptyCtaLabel": "Leave a Google review",
  "emptyCtaHref": "https://www.google.com/maps"
},
"videosSection": {
  "eyebrow": "See us in action",
  "headingLine1": "A look inside",
  "headingItalic": "the practice.",
  "body": "Short videos covering what to expect, who we are, and how we work."
},
"socialSection": {
  "eyebrow": "Follow along",
  "headingLine1": "From our",
  "headingItalic": "feed.",
  "body": "Updates, patient education, and behind-the-scenes from Instagram and Facebook."
}
```

**Note:** `emptyCtaHref` is a placeholder Google Maps URL — once VBAM has a Google Business Profile, replace it with the direct review link (`https://search.google.com/local/writereview?placeid=<PLACE_ID>`).

- [ ] **Step 2: Add exports to home.ts**

Modify `app/src/content/home.ts` to append three exports after the existing `PRIVIA_SECTION` line:

```ts
import data from './home.json';

export const HERO = data.hero;
export const TRUST_BAR_ITEMS = data.trustBar as string[];
export const POSITIONING = data.positioning;
export const PHILOSOPHY = data.philosophy;
export const PRINCIPLES = data.principles;
export const SERVICES_SECTION = data.servicesSection;
export const HOME_SERVICES = data.homeServices;
export const VBP_SECTION = data.vbpSection;
export const FLOW_SECTION = data.flowSection;
export const PRIVIA_SECTION = data.priviaSection;
export const REVIEWS_SECTION = data.reviewsSection;
export const VIDEOS_SECTION = data.videosSection;
export const SOCIAL_SECTION = data.socialSection;
export const CTA_STRIP = data.ctaStrip;
```

- [ ] **Step 3: Verify type check**

Run from `app/`:
```bash
pnpm tsc --noEmit
```
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add app/src/content/home.json app/src/content/home.ts
git commit -m "feat(content): add reviews/videos/social section heading copy"
```

---

## Task 3: Scaffold empty content files (reviews, social, videos)

**Files:**
- Create: `app/src/content/reviews.json`
- Create: `app/src/content/reviews.ts`
- Create: `app/src/content/social.json`
- Create: `app/src/content/social.ts`
- Create: `app/src/content/videos.json`
- Create: `app/src/content/videos.ts`

- [ ] **Step 1: Create reviews.json (empty default)**

```json
{
  "placeRating": 0,
  "totalRatings": 0,
  "reviews": []
}
```

- [ ] **Step 2: Create reviews.ts**

```ts
import data from './reviews.json';

export interface Review {
  author: string;
  rating: number;
  text: string;
  relativeTime: string;
  profilePhoto: string;
}

export interface ReviewsContent {
  placeRating: number;
  totalRatings: number;
  reviews: Review[];
}

export const REVIEWS = data as ReviewsContent;
```

- [ ] **Step 3: Create social.json (empty array)**

```json
[]
```

- [ ] **Step 4: Create social.ts**

```ts
import data from './social.json';

export interface SocialPost {
  platform: 'instagram' | 'facebook';
  id: string;
  caption: string;
  mediaUrl: string;
  permalink: string;
  timestamp: string;
}

export const SOCIAL_POSTS = data as SocialPost[];
```

- [ ] **Step 5: Create videos.json**

Seed with a placeholder structure (empty array — videos are manually curated, no defaults):

```json
[]
```

- [ ] **Step 6: Create videos.ts**

```ts
import data from './videos.json';

export interface Video {
  id: string;
  title: string;
  description?: string;
}

export const VIDEOS = data as Video[];
```

- [ ] **Step 7: Verify type check**

```bash
cd /Users/ashwinchandran/work/vbam-site/app && pnpm tsc --noEmit
```
Expected: no errors.

- [ ] **Step 8: Commit**

```bash
git add app/src/content/reviews.json app/src/content/reviews.ts app/src/content/social.json app/src/content/social.ts app/src/content/videos.json app/src/content/videos.ts
git commit -m "feat(content): scaffold reviews/social/videos data + typed exports"
```

---

## Task 4: Create build-time fetch script scaffold

**Files:**
- Create: `app/scripts/fetch-marketing-content.ts`

- [ ] **Step 1: Create the script with skeleton + graceful skipping**

```ts
import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const CONTENT_DIR = join(__dirname, '..', 'src', 'content');

function writeJson(filename: string, data: unknown): void {
  const path = join(CONTENT_DIR, filename);
  writeFileSync(path, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

function readJsonOrDefault<T>(filename: string, fallback: T): T {
  const path = join(CONTENT_DIR, filename);
  if (!existsSync(path)) return fallback;
  try {
    return JSON.parse(readFileSync(path, 'utf8')) as T;
  } catch {
    return fallback;
  }
}

async function fetchGoogleReviews(): Promise<void> {
  console.log('[reviews] not yet wired — skipping');
}

async function fetchSocialPosts(): Promise<void> {
  console.log('[social] not yet wired — skipping');
}

async function main(): Promise<void> {
  console.log('[fetch-marketing-content] start');
  await fetchGoogleReviews();
  await fetchSocialPosts();
  console.log('[fetch-marketing-content] done');
}

main().catch((err) => {
  console.error('[fetch-marketing-content] fatal:', err);
  process.exit(1);
});
```

- [ ] **Step 2: Smoke test — run script directly**

```bash
cd /Users/ashwinchandran/work/vbam-site/app && npx tsx scripts/fetch-marketing-content.ts
```

Expected output:
```
[fetch-marketing-content] start
[reviews] not yet wired — skipping
[social] not yet wired — skipping
[fetch-marketing-content] done
```

- [ ] **Step 3: Commit**

```bash
git add app/scripts/fetch-marketing-content.ts
git commit -m "feat(build): scaffold marketing content fetch script"
```

---

## Task 5: Add prebuild hook to package.json

**Files:**
- Modify: `app/package.json`

- [ ] **Step 1: Add prebuild script**

Update the `"scripts"` block in `app/package.json`:

```json
"scripts": {
  "dev": "next dev",
  "prebuild": "tsx scripts/fetch-marketing-content.ts",
  "build": "next build",
  "start": "next start",
  "lint": "eslint",
  "fetch-content": "tsx scripts/fetch-marketing-content.ts"
}
```

`prebuild` runs automatically before `build` (pnpm/npm lifecycle convention). `fetch-content` is a manual alias for local refresh.

- [ ] **Step 2: Smoke test — run pnpm build**

```bash
cd /Users/ashwinchandran/work/vbam-site/app && pnpm build
```

Expected: the fetch script logs ("start ... skipping ... done") appear before Next.js build output, and `pnpm build` completes successfully.

- [ ] **Step 3: Commit**

```bash
git add app/package.json
git commit -m "feat(build): wire prebuild to run marketing content fetch"
```

---

## Task 6: Wire Google Places API into the fetch script

**Files:**
- Modify: `app/scripts/fetch-marketing-content.ts`

- [ ] **Step 1: Replace the `fetchGoogleReviews` stub with the real implementation**

Replace the `fetchGoogleReviews` function in `app/scripts/fetch-marketing-content.ts` with:

```ts
interface PlacesReview {
  authorAttribution?: { displayName?: string; photoUri?: string };
  rating?: number;
  text?: { text?: string };
  relativePublishTimeDescription?: string;
}

interface PlacesApiResponse {
  rating?: number;
  userRatingCount?: number;
  reviews?: PlacesReview[];
}

async function fetchGoogleReviews(): Promise<void> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    console.warn('[reviews] GOOGLE_PLACES_API_KEY or GOOGLE_PLACE_ID missing — keeping existing reviews.json');
    return;
  }

  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'reviews,rating,userRatingCount,displayName',
      },
    });

    if (!res.ok) {
      throw new Error(`Places API ${res.status}: ${await res.text()}`);
    }

    const data = (await res.json()) as PlacesApiResponse;

    const output = {
      placeRating: data.rating ?? 0,
      totalRatings: data.userRatingCount ?? 0,
      reviews: (data.reviews ?? []).map((r) => ({
        author: r.authorAttribution?.displayName ?? 'Anonymous',
        rating: r.rating ?? 0,
        text: r.text?.text ?? '',
        relativeTime: r.relativePublishTimeDescription ?? '',
        profilePhoto: r.authorAttribution?.photoUri ?? '',
      })),
    };

    writeJson('reviews.json', output);
    console.log(`[reviews] wrote ${output.reviews.length} reviews · rating ${output.placeRating} (${output.totalRatings} total)`);
  } catch (err) {
    console.warn(`[reviews] fetch failed: ${(err as Error).message} — keeping existing reviews.json`);
  }
}
```

- [ ] **Step 2: Smoke test without env vars (should skip gracefully)**

```bash
cd /Users/ashwinchandran/work/vbam-site/app && npx tsx scripts/fetch-marketing-content.ts
```

Expected:
```
[reviews] GOOGLE_PLACES_API_KEY or GOOGLE_PLACE_ID missing — keeping existing reviews.json
```

`reviews.json` should be unchanged (still the empty default from Task 3).

- [ ] **Step 3: Commit**

```bash
git add app/scripts/fetch-marketing-content.ts
git commit -m "feat(build): wire Google Places API for reviews"
```

---

## Task 7: Wire Meta Graph API into the fetch script

**Files:**
- Modify: `app/scripts/fetch-marketing-content.ts`

- [ ] **Step 1: Replace the `fetchSocialPosts` stub with the real implementation**

Replace the `fetchSocialPosts` function with:

```ts
interface InstagramMediaItem {
  id: string;
  caption?: string;
  media_type?: string;
  media_url?: string;
  thumbnail_url?: string;
  permalink?: string;
  timestamp?: string;
}

interface FacebookPostItem {
  id: string;
  message?: string;
  full_picture?: string;
  permalink_url?: string;
  created_time?: string;
}

interface SocialPostOut {
  platform: 'instagram' | 'facebook';
  id: string;
  caption: string;
  mediaUrl: string;
  permalink: string;
  timestamp: string;
}

async function fetchInstagram(token: string, userId: string): Promise<SocialPostOut[]> {
  const url = `https://graph.instagram.com/${userId}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&limit=6&access_token=${token}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Instagram ${res.status}: ${await res.text()}`);
  const data = (await res.json()) as { data?: InstagramMediaItem[] };
  return (data.data ?? []).map((p) => ({
    platform: 'instagram' as const,
    id: p.id,
    caption: p.caption ?? '',
    mediaUrl: p.media_type === 'VIDEO' ? (p.thumbnail_url ?? '') : (p.media_url ?? ''),
    permalink: p.permalink ?? '',
    timestamp: p.timestamp ?? '',
  }));
}

async function fetchFacebook(token: string, pageId: string): Promise<SocialPostOut[]> {
  const url = `https://graph.facebook.com/v18.0/${pageId}/posts?fields=id,message,full_picture,permalink_url,created_time&limit=6&access_token=${token}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Facebook ${res.status}: ${await res.text()}`);
  const data = (await res.json()) as { data?: FacebookPostItem[] };
  return (data.data ?? [])
    .filter((p) => p.message || p.full_picture)
    .map((p) => ({
      platform: 'facebook' as const,
      id: p.id,
      caption: p.message ?? '',
      mediaUrl: p.full_picture ?? '',
      permalink: p.permalink_url ?? '',
      timestamp: p.created_time ?? '',
    }));
}

async function fetchSocialPosts(): Promise<void> {
  const token = process.env.META_PAGE_ACCESS_TOKEN;
  const igUserId = process.env.INSTAGRAM_USER_ID;
  const fbPageId = process.env.FACEBOOK_PAGE_ID;

  if (!token) {
    console.warn('[social] META_PAGE_ACCESS_TOKEN missing — keeping existing social.json');
    return;
  }

  const posts: SocialPostOut[] = [];

  if (igUserId) {
    try {
      posts.push(...(await fetchInstagram(token, igUserId)));
    } catch (err) {
      console.warn(`[social/instagram] ${(err as Error).message}`);
    }
  } else {
    console.warn('[social/instagram] INSTAGRAM_USER_ID missing — skipping IG');
  }

  if (fbPageId) {
    try {
      posts.push(...(await fetchFacebook(token, fbPageId)));
    } catch (err) {
      console.warn(`[social/facebook] ${(err as Error).message}`);
    }
  } else {
    console.warn('[social/facebook] FACEBOOK_PAGE_ID missing — skipping FB');
  }

  if (posts.length === 0) {
    console.warn('[social] no posts fetched — keeping existing social.json');
    return;
  }

  posts.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
  const top6 = posts.slice(0, 6);
  writeJson('social.json', top6);
  console.log(`[social] wrote ${top6.length} posts (${posts.filter(p => p.platform === 'instagram').length} IG, ${posts.filter(p => p.platform === 'facebook').length} FB)`);
}
```

- [ ] **Step 2: Smoke test without env vars**

```bash
cd /Users/ashwinchandran/work/vbam-site/app && npx tsx scripts/fetch-marketing-content.ts
```

Expected:
```
[social] META_PAGE_ACCESS_TOKEN missing — keeping existing social.json
```

`social.json` should be unchanged.

- [ ] **Step 3: Commit**

```bash
git add app/scripts/fetch-marketing-content.ts
git commit -m "feat(build): wire Meta Graph API for Instagram + Facebook feed"
```

---

## Task 8: Build ReviewsSection component

**Files:**
- Create: `app/src/components/home/ReviewsSection.tsx`

- [ ] **Step 1: Create the component**

```tsx
import ScrollReveal from '@/components/shared/ScrollReveal';
import { REVIEWS_SECTION } from '@/content/home';
import { REVIEWS } from '@/content/reviews';

function StarRow({ rating }: { rating: number }) {
  const full = Math.round(rating);
  return (
    <div aria-label={`${rating} out of 5 stars`} className="flex items-center gap-0.5" style={{ marginBottom: 12 }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 20 20"
          aria-hidden="true"
          fill={i < full ? '#EE7752' : 'rgba(10,61,74,0.18)'}
        >
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.2 1 5.9L10 15l-5.2 2.8 1-5.9L1.5 7.7l5.9-.9z" />
        </svg>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="mx-auto rounded-lg bg-vbam-foam border border-vbam-atlantic/[.08] text-center" style={{ maxWidth: 540, padding: '36px 32px' }}>
      <p className="font-fraunces font-[400] text-vbam-atlantic" style={{ fontSize: 22, lineHeight: 1.2, marginBottom: 10 }}>
        {REVIEWS_SECTION.emptyTitle}
      </p>
      <p className="font-inter font-[300] text-vbam-atlantic/[.78]" style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 22 }}>
        {REVIEWS_SECTION.emptyBody}
      </p>
      <a
        href={REVIEWS_SECTION.emptyCtaHref}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary inline-block font-archivo font-[600] rounded-full"
        style={{ fontSize: 13, padding: '12px 24px', letterSpacing: '0.01em' }}
      >
        {REVIEWS_SECTION.emptyCtaLabel}
      </a>
    </div>
  );
}

export default function ReviewsSection() {
  const hasReviews = REVIEWS.reviews.length > 0;

  return (
    <section className="bg-vbam-foam" id="reviews" style={{ padding: 'clamp(48px, 8vw, 112px) 0' }}>
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12">

        <ScrollReveal animation="left" as="div" className="text-center">
          <p
            className="font-archivo font-[700] text-vbam-coral"
            style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 24 }}
          >
            {REVIEWS_SECTION.eyebrow}
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <h2
            className="font-fraunces font-[400] text-vbam-atlantic mx-auto text-center"
            style={{ fontSize: 'clamp(34px, 5vw, 56px)', lineHeight: 1.08, letterSpacing: '-0.018em', maxWidth: 640, marginBottom: 20 }}
          >
            {REVIEWS_SECTION.headingLine1}{' '}
            <em className="font-cormorant italic text-grad-sunrise">{REVIEWS_SECTION.headingItalic}</em>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <p
            className="font-inter font-[300] text-vbam-atlantic/[.84] mx-auto text-center"
            style={{ fontSize: 18, lineHeight: 1.72, maxWidth: 680, marginBottom: 56 }}
          >
            {REVIEWS_SECTION.body}
          </p>
        </ScrollReveal>

        {!hasReviews ? (
          <EmptyState />
        ) : (
          <>
            <ScrollReveal delay={120}>
              <p className="font-inter text-vbam-atlantic/[.6] text-center" style={{ fontSize: 14, marginBottom: 36 }}>
                <strong className="font-[500] text-vbam-atlantic">{REVIEWS.placeRating.toFixed(1)}</strong>
                {' '}rating from {REVIEWS.totalRatings} Google reviews
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {REVIEWS.reviews.map((r, i) => (
                <ScrollReveal key={`${r.author}-${i}`} animation="scale" delay={i * 80}>
                  <article
                    className="rounded-lg bg-white border border-vbam-atlantic/[.08] h-full flex flex-col"
                    style={{ padding: '24px 22px' }}
                  >
                    <StarRow rating={r.rating} />
                    <p className="font-inter font-[300] text-vbam-atlantic/[.84] flex-1" style={{ fontSize: 15, lineHeight: 1.65, marginBottom: 18 }}>
                      &ldquo;{r.text}&rdquo;
                    </p>
                    <div className="flex items-center gap-3 pt-3 border-t border-vbam-atlantic/[.06]">
                      <p className="font-archivo font-[600] text-vbam-atlantic" style={{ fontSize: 13 }}>
                        {r.author}
                      </p>
                      <p className="font-inter text-vbam-atlantic/[.5]" style={{ fontSize: 12 }}>
                        · {r.relativeTime}
                      </p>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </>
        )}

      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify type check**

```bash
cd /Users/ashwinchandran/work/vbam-site/app && pnpm tsc --noEmit
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/src/components/home/ReviewsSection.tsx
git commit -m "feat(home): ReviewsSection — Google reviews + AggregateRating-ready empty state"
```

---

## Task 9: Build VideosSection component

**Files:**
- Create: `app/src/components/home/VideosSection.tsx`

- [ ] **Step 1: Create the component**

`lite-youtube-embed` is a custom element — registered globally by importing its module once. We import the package side-effect-style inside a client component.

```tsx
'use client';
import { useEffect } from 'react';
import ScrollReveal from '@/components/shared/ScrollReveal';
import { VIDEOS_SECTION } from '@/content/home';
import { VIDEOS } from '@/content/videos';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'lite-youtube': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { videoid?: string; playlabel?: string },
        HTMLElement
      >;
    }
  }
}

export default function VideosSection() {
  useEffect(() => {
    void import('lite-youtube-embed');
    void import('lite-youtube-embed/src/lite-yt-embed.css');
  }, []);

  if (VIDEOS.length === 0) return null;

  return (
    <section className="bg-vbam-sand" id="videos" style={{ padding: 'clamp(48px, 8vw, 112px) 0' }}>
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12">

        <ScrollReveal animation="left" as="div" className="text-center">
          <p
            className="font-archivo font-[700] text-vbam-coral"
            style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 24 }}
          >
            {VIDEOS_SECTION.eyebrow}
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <h2
            className="font-fraunces font-[400] text-vbam-atlantic mx-auto text-center"
            style={{ fontSize: 'clamp(34px, 5vw, 56px)', lineHeight: 1.08, letterSpacing: '-0.018em', maxWidth: 640, marginBottom: 20 }}
          >
            {VIDEOS_SECTION.headingLine1}{' '}
            <em className="font-cormorant italic text-grad-sunrise">{VIDEOS_SECTION.headingItalic}</em>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <p
            className="font-inter font-[300] text-vbam-atlantic/[.84] mx-auto text-center"
            style={{ fontSize: 18, lineHeight: 1.72, maxWidth: 680, marginBottom: 56 }}
          >
            {VIDEOS_SECTION.body}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {VIDEOS.map((v, i) => (
            <ScrollReveal key={v.id} animation="scale" delay={i * 100}>
              <figure
                className="rounded-lg overflow-hidden bg-vbam-foam border border-vbam-atlantic/[.08]"
              >
                <lite-youtube videoid={v.id} playlabel={`Play: ${v.title}`} />
                <figcaption style={{ padding: '18px 22px' }}>
                  <h3 className="font-fraunces font-[500] text-vbam-atlantic" style={{ fontSize: 18, lineHeight: 1.25, marginBottom: v.description ? 6 : 0 }}>
                    {v.title}
                  </h3>
                  {v.description && (
                    <p className="font-inter font-[300] text-vbam-atlantic/[.7]" style={{ fontSize: 14, lineHeight: 1.55 }}>
                      {v.description}
                    </p>
                  )}
                </figcaption>
              </figure>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify type check**

```bash
cd /Users/ashwinchandran/work/vbam-site/app && pnpm tsc --noEmit
```

If TypeScript complains about importing `.css`, add a module declaration. Create `app/src/types/css-modules.d.ts`:

```ts
declare module '*.css';
```

Re-run `pnpm tsc --noEmit`. Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/src/components/home/VideosSection.tsx app/src/types/css-modules.d.ts
git commit -m "feat(home): VideosSection — lite-youtube-embed thumbnail-first gallery"
```

---

## Task 10: Build SocialFeedSection component

**Files:**
- Create: `app/src/components/home/SocialFeedSection.tsx`

- [ ] **Step 1: Create the component**

```tsx
'use client';
import { useState } from 'react';
import ScrollReveal from '@/components/shared/ScrollReveal';
import { SOCIAL_SECTION } from '@/content/home';
import { SOCIAL_POSTS, type SocialPost } from '@/content/social';

type Filter = 'all' | 'instagram' | 'facebook';

function truncate(text: string, max = 140): string {
  if (text.length <= max) return text;
  return text.slice(0, max).replace(/\s+\S*$/, '') + '…';
}

function PostCard({ post }: { post: SocialPost }) {
  const platformLabel = post.platform === 'instagram' ? 'Instagram' : 'Facebook';
  return (
    <a
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View this ${platformLabel} post — opens in new tab`}
      className="block rounded-lg overflow-hidden bg-white border border-vbam-atlantic/[.08] hover:shadow-md transition-shadow h-full"
    >
      {post.mediaUrl && (
        <div className="relative aspect-square overflow-hidden bg-vbam-sand">
          <img
            src={post.mediaUrl}
            alt={truncate(post.caption, 80) || `${platformLabel} post`}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div style={{ padding: '16px 18px' }}>
        <p className="font-archivo font-[700] text-vbam-coral" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 8 }}>
          {platformLabel}
        </p>
        {post.caption && (
          <p className="font-inter font-[300] text-vbam-atlantic/[.82]" style={{ fontSize: 14, lineHeight: 1.55 }}>
            {truncate(post.caption)}
          </p>
        )}
      </div>
    </a>
  );
}

export default function SocialFeedSection() {
  const [filter, setFilter] = useState<Filter>('all');

  if (SOCIAL_POSTS.length === 0) return null;

  const filtered = filter === 'all' ? SOCIAL_POSTS : SOCIAL_POSTS.filter((p) => p.platform === filter);

  return (
    <section className="bg-vbam-foam" id="social" style={{ padding: 'clamp(48px, 8vw, 112px) 0' }}>
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12">

        <ScrollReveal animation="left" as="div" className="text-center">
          <p
            className="font-archivo font-[700] text-vbam-coral"
            style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 24 }}
          >
            {SOCIAL_SECTION.eyebrow}
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <h2
            className="font-fraunces font-[400] text-vbam-atlantic mx-auto text-center"
            style={{ fontSize: 'clamp(34px, 5vw, 56px)', lineHeight: 1.08, letterSpacing: '-0.018em', maxWidth: 640, marginBottom: 20 }}
          >
            {SOCIAL_SECTION.headingLine1}{' '}
            <em className="font-cormorant italic text-grad-sunrise">{SOCIAL_SECTION.headingItalic}</em>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <p
            className="font-inter font-[300] text-vbam-atlantic/[.84] mx-auto text-center"
            style={{ fontSize: 18, lineHeight: 1.72, maxWidth: 680, marginBottom: 36 }}
          >
            {SOCIAL_SECTION.body}
          </p>
        </ScrollReveal>

        <div className="flex justify-center gap-2 flex-wrap" style={{ marginBottom: 40 }}>
          {(['all', 'instagram', 'facebook'] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`font-archivo font-[600] rounded-full transition-colors ${
                filter === f
                  ? 'bg-vbam-atlantic text-vbam-foam'
                  : 'bg-transparent text-vbam-atlantic/70 border border-vbam-atlantic/20 hover:border-vbam-atlantic/40'
              }`}
              style={{ fontSize: 12, padding: '8px 18px', letterSpacing: '0.05em', textTransform: 'uppercase' }}
            >
              {f === 'all' ? 'All' : f === 'instagram' ? 'Instagram' : 'Facebook'}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <ScrollReveal key={`${p.platform}-${p.id}`} animation="scale" delay={i * 60}>
              <PostCard post={p} />
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify type check**

```bash
cd /Users/ashwinchandran/work/vbam-site/app && pnpm tsc --noEmit
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/src/components/home/SocialFeedSection.tsx
git commit -m "feat(home): SocialFeedSection — Instagram + Facebook grid with platform filter"
```

---

## Task 11: Add scroll-linked parallax to HeroSection

**Files:**
- Modify: `app/src/components/home/HeroSection.tsx`

The hero already runs `'use client'` anime.js animations. The wash element (`washRef`) gets an anime.js `scaleY` loop — we cannot add a CSS transform to that same element. Instead, wrap it in a parallax-only outer div that translates on scroll. This keeps the existing animation untouched.

- [ ] **Step 1: Add a scroll listener that sets a CSS variable on the section root**

In `HeroSection.tsx`, add a new ref for the section root and a new `useEffect` that updates a CSS variable on scroll. Insert ABOVE the existing `useEffect`:

```tsx
const sectionRef = useRef<HTMLElement>(null);

useEffect(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let raf = 0;
  const onScroll = () => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      const el = sectionRef.current;
      if (!el) return;
      const offset = Math.max(0, window.scrollY) * 0.18;
      el.style.setProperty('--hero-parallax', `${offset}px`);
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  return () => {
    window.removeEventListener('scroll', onScroll);
    if (raf) cancelAnimationFrame(raf);
  };
}, []);
```

- [ ] **Step 2: Apply the ref + parallax wrapper to the wash element**

Replace the `<section>` opening tag to use `sectionRef`:

```tsx
<section
  ref={sectionRef}
  className="relative text-center overflow-hidden"
  style={{ paddingTop: 'clamp(110px, 12vw, 160px)', paddingBottom: 'clamp(60px, 8vw, 110px)' }}
>
```

Wrap the existing `washRef` div in a parallax wrapper. Find:

```tsx
{/* Sunrise wash — wave-on-beach animation drives scaleY + opacity */}
<div
  ref={washRef}
  aria-hidden="true"
  className="absolute inset-x-0 top-0 h-4/5 pointer-events-none"
  style={{
    background: 'radial-gradient(ellipse 85% 105% at 50% 0%, #F9C784 0%, #FBCF9A 20%, #F7D8B4 40%, rgba(245,241,232,.88) 70%, #F5F1E8 100%)',
    transformOrigin: 'top center',
    opacity: 0.89,
  }}
/>
```

Replace with:

```tsx
{/* Sunrise wash — parallax wrapper translates on scroll; inner element keeps anime.js scaleY */}
<div
  aria-hidden="true"
  className="absolute inset-x-0 top-0 h-4/5 pointer-events-none"
  style={{ transform: 'translate3d(0, var(--hero-parallax, 0px), 0)', willChange: 'transform' }}
>
  <div
    ref={washRef}
    className="w-full h-full"
    style={{
      background: 'radial-gradient(ellipse 85% 105% at 50% 0%, #F9C784 0%, #FBCF9A 20%, #F7D8B4 40%, rgba(245,241,232,.88) 70%, #F5F1E8 100%)',
      transformOrigin: 'top center',
      opacity: 0.89,
    }}
  />
</div>
```

- [ ] **Step 3: Verify type check + build**

```bash
cd /Users/ashwinchandran/work/vbam-site/app && pnpm tsc --noEmit && pnpm build
```
Expected: clean build.

- [ ] **Step 4: Manual verification**

```bash
cd /Users/ashwinchandran/work/vbam-site/app && pnpm dev
```

Open `http://localhost:3000`. Scroll down — the warm sunrise wash should drift downward more slowly than the rest of the page (about 18% of scroll speed). On a touch device or with `prefers-reduced-motion: reduce`, parallax stops. Existing wave/wash animation continues to play.

- [ ] **Step 5: Commit**

```bash
git add app/src/components/home/HeroSection.tsx
git commit -m "feat(hero): subtle scroll-linked parallax on sunrise wash"
```

---

## Task 12: Add site-wide Klara floating widget to layout.tsx

**Files:**
- Modify: `app/src/app/layout.tsx`

**Note:** VBAM's Klara widget UUID is not yet provisioned (out-of-scope per spec). The `<Script>` is added but the `src` references an env-driven config so it stays inert until VBAM's Klara account is active.

- [ ] **Step 1: Add Script import and tag**

Modify `app/src/app/layout.tsx`:

1. Add the Script import at the top:
```tsx
import Script from 'next/script';
```

2. Inside the `<body>` JSX, after `<Footer />`, add the Klara widget tag:

```tsx
{/* Klara floating "Message us" widget — site-wide. Inert until VBAM Klara widget UUID is set. */}
{process.env.NEXT_PUBLIC_KLARA_WIDGET_ID && (
  <Script
    id="klara-widget"
    src={`https://patient.klara.com/widget.js?id=${process.env.NEXT_PUBLIC_KLARA_WIDGET_ID}`}
    strategy="lazyOnload"
  />
)}
```

The conditional means: when the env var is absent (current state) nothing renders, no network call. Once VBAM provisions Klara, set `NEXT_PUBLIC_KLARA_WIDGET_ID` in Cloudflare Pages env and the floating button appears site-wide on the next deploy.

**If Klara's actual embed snippet differs from `widget.js?id=...`** (some vendors require a custom snippet shape), update the `<Script>` body accordingly when the snippet is received from Klara — the conditional gating and lazy-load strategy stay.

- [ ] **Step 2: Verify build**

```bash
cd /Users/ashwinchandran/work/vbam-site/app && pnpm build
```
Expected: clean build (Script tag is gated, doesn't render).

- [ ] **Step 3: Commit**

```bash
git add app/src/app/layout.tsx
git commit -m "feat(klara): site-wide Klara floating widget — env-gated, lazyOnload"
```

---

## Task 13: Wire new sections into page.tsx + add aggregateRating JSON-LD

**Files:**
- Modify: `app/src/app/page.tsx`

- [ ] **Step 1: Import new sections + reviews data**

At the top of `page.tsx`, add imports next to the existing home component imports:

```tsx
import ReviewsSection from '@/components/home/ReviewsSection';
import VideosSection from '@/components/home/VideosSection';
import SocialFeedSection from '@/components/home/SocialFeedSection';
import { REVIEWS } from '@/content/reviews';
```

- [ ] **Step 2: Add aggregateRating conditionally to the JSON-LD**

Replace the `homeJsonLd` object so it includes `aggregateRating` only when there are reviews. After the existing `sameAs` array, conditionally spread an `aggregateRating` field:

```tsx
const homeJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalOrganization',
  name: 'Vero Beach Adult Medicine',
  url: 'https://vbadultmedicine.com',
  logo: 'https://vbadultmedicine.com/images/vbam-mark.svg',
  description: 'A boutique adult primary care practice in Vero Beach, FL — now welcoming new patients. Sibling of Vero Beach Pediatrics.',
  telephone: '+1-772-569-3212',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '955 37th Place',
    addressLocality: 'Vero Beach',
    addressRegion: 'FL',
    postalCode: '32960',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 27.6648,
    longitude: -80.3781,
  },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '08:00', closes: '17:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Friday'], opens: '08:00', closes: '12:00' },
  ],
  medicalSpecialty: 'Internal Medicine',
  priceRange: 'Accepts most insurance',
  parentOrganization: {
    '@type': 'MedicalOrganization',
    name: 'Privia Medical Group',
    url: 'https://www.priviahealth.com/',
  },
  sameAs: [
    'https://verobeachpediatrics.com',
    'https://www.priviahealth.com/',
  ],
  ...(REVIEWS.totalRatings > 0 && {
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: REVIEWS.placeRating,
      reviewCount: REVIEWS.totalRatings,
      bestRating: 5,
      worstRating: 1,
    },
  }),
};
```

- [ ] **Step 3: Insert the new sections in the JSX**

Replace the `<main>` body so the three new sections appear between `FlowSection` and `CtaStrip`:

```tsx
export default function HomePage() {
  return (
    <main>
      <JsonLd data={homeJsonLd} />
      <HeroSection />
      <TrustBar />
      <PositioningSection />
      <DoctorsSection />
      <PhilosophySection />
      <ServicesSection />
      <VbpSection />
      <PriviaSection />
      <FlowSection />
      <ReviewsSection />
      <VideosSection />
      <SocialFeedSection />
      <CtaStrip />
    </main>
  );
}
```

- [ ] **Step 4: Build + manual verification**

```bash
cd /Users/ashwinchandran/work/vbam-site/app && pnpm build
```
Expected: clean build.

```bash
pnpm dev
```

Open `http://localhost:3000`. Scroll past the Flow section — you should see:
1. ReviewsSection rendering its empty state ("We're just getting started…" CTA)
2. VideosSection hidden (videos.json is empty array → `return null`)
3. SocialFeedSection hidden (social.json is empty array → `return null`)
4. CtaStrip below

View page source — confirm `aggregateRating` is NOT present in the JSON-LD (because totalRatings === 0).

- [ ] **Step 5: Commit**

```bash
git add app/src/app/page.tsx
git commit -m "feat(home): wire ReviewsSection + VideosSection + SocialFeedSection + AggregateRating JSON-LD"
```

---

## Task 14: GitHub Actions daily content refresh

**Files:**
- Create: `.github/workflows/daily-content-refresh.yml`

- [ ] **Step 1: Check the .github/workflows directory exists**

```bash
ls /Users/ashwinchandran/work/vbam-site/.github/workflows/ 2>/dev/null || mkdir -p /Users/ashwinchandran/work/vbam-site/.github/workflows
```

- [ ] **Step 2: Create the workflow file**

```yaml
name: Daily Content Refresh

on:
  schedule:
    - cron: '0 6 * * *'  # 06:00 UTC daily
  workflow_dispatch: {}

jobs:
  trigger-deploy:
    name: Ping Cloudflare Pages deploy hook
    runs-on: ubuntu-latest
    steps:
      - name: Trigger CF Pages rebuild
        env:
          DEPLOY_HOOK: ${{ secrets.CF_PAGES_DEPLOY_HOOK }}
        run: |
          if [ -z "$DEPLOY_HOOK" ]; then
            echo "CF_PAGES_DEPLOY_HOOK secret missing — skipping"
            exit 0
          fi
          response=$(curl -sS -X POST "$DEPLOY_HOOK" -w "\n%{http_code}")
          status=$(echo "$response" | tail -n1)
          body=$(echo "$response" | sed '$d')
          echo "Status: $status"
          echo "Body: $body"
          if [ "$status" -ge 400 ]; then
            echo "Deploy hook failed"
            exit 1
          fi
```

- [ ] **Step 3: Verify YAML syntax**

```bash
cat /Users/ashwinchandran/work/vbam-site/.github/workflows/daily-content-refresh.yml | python3 -c "import sys, yaml; yaml.safe_load(sys.stdin)"
```
Expected: no output (clean parse).

- [ ] **Step 4: Commit**

```bash
git add .github/workflows/daily-content-refresh.yml
git commit -m "feat(ci): daily content refresh via CF Pages deploy hook"
```

---

## Task 15: Update CHANGELOG

**Files:**
- Modify: `CHANGELOG.md`

- [ ] **Step 1: Add Unreleased entries**

Open `CHANGELOG.md`. Under the `[Unreleased]` section's `### Added`, add:

```markdown
- ReviewsSection on homepage — Google Places API reviews fetched at build time, with empty-state CTA and AggregateRating JSON-LD
- VideosSection on homepage — YouTube gallery using lite-youtube-embed (thumbnail-first, click to load iframe)
- SocialFeedSection on homepage — Instagram + Facebook combined feed via Meta Graph API, with platform filter
- Site-wide Klara floating widget in `layout.tsx`, env-gated by `NEXT_PUBLIC_KLARA_WIDGET_ID`
- Scroll-linked parallax on the hero sunrise wash (respects `prefers-reduced-motion`)
- Build-time content fetch script (`app/scripts/fetch-marketing-content.ts`) wired into `prebuild`
- GitHub Actions cron at `.github/workflows/daily-content-refresh.yml` to refresh content daily via CF Pages deploy hook
```

- [ ] **Step 2: Commit**

```bash
git add CHANGELOG.md
git commit -m "docs: changelog — marketing content layer"
```

---

## Post-Implementation Checklist (manual, after merge)

These are operational items, not code tasks — track separately in `DEPLOYMENTS.md` or a deployment ticket:

- [ ] Provision `GOOGLE_PLACES_API_KEY` + `GOOGLE_PLACE_ID` in Cloudflare Pages env (requires live Google Business Profile for VBAM)
- [ ] Provision `META_PAGE_ACCESS_TOKEN` + `INSTAGRAM_USER_ID` + `FACEBOOK_PAGE_ID` in CF Pages env (requires VBAM Facebook + Instagram Business accounts)
- [ ] Provision `CF_PAGES_DEPLOY_HOOK` as a GitHub Actions repo secret
- [ ] Provision `NEXT_PUBLIC_KLARA_WIDGET_ID` in CF Pages env once VBAM's Klara account is active
- [ ] Replace `emptyCtaHref` in `home.json` with the direct `writereview` URL using the actual Place ID
- [ ] Set a 50-day calendar reminder to refresh the Meta long-lived token (and document the refresh procedure in `DEPLOYMENTS.md`)
- [ ] Add 2–3 starter video IDs to `videos.json` when client provides them
