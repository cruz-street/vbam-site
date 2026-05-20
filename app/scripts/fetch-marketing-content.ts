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
