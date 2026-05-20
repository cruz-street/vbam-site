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
