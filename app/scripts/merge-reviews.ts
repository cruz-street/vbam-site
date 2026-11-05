export interface SnapshotReview {
  author: string;
  rating: number;
  text: string;
  relativeTime: string;
  profilePhoto: string;
}

export interface Snapshot {
  placeRating: number;
  totalRatings: number;
  profileUrl?: string;
  reviews: SnapshotReview[];
}

const norm = (s: string): string => s.toLowerCase().replace(/\s+/g, ' ').trim();

// Same review = same author and same text (or one text is a prefix of the other,
// which covers GBP vs Places trimming differences).
export function isSameReview(a: SnapshotReview, b: SnapshotReview): boolean {
  if (norm(a.author) !== norm(b.author)) return false;
  const ta = norm(a.text);
  const tb = norm(b.text);
  return ta === tb || ta.startsWith(tb.slice(0, 60)) || tb.startsWith(ta.slice(0, 60));
}

// Adds only genuinely new reviews (put first: Places returns the newest) and never
// removes or edits an existing entry. Rating/count only move up from the snapshot.
export function mergeReviews(
  existing: Snapshot,
  incoming: SnapshotReview[],
  meta: { placeRating?: number; totalRatings?: number },
): Snapshot {
  const added: SnapshotReview[] = [];
  for (const r of incoming) {
    if (existing.reviews.some((e) => isSameReview(e, r))) continue;
    if (added.some((e) => isSameReview(e, r))) continue;
    added.push(r);
  }
  return {
    ...existing,
    placeRating: meta.placeRating ?? existing.placeRating,
    totalRatings: Math.max(existing.totalRatings, meta.totalRatings ?? 0),
    reviews: [...added, ...existing.reviews],
  };
}
