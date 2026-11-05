import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mergeReviews, type Snapshot, type SnapshotReview } from './merge-reviews';

const rev = (author: string, text: string): SnapshotReview => ({
  author, rating: 5, text, relativeTime: 'recently', profilePhoto: '',
});
const base: Snapshot = {
  placeRating: 5,
  totalRatings: 28,
  reviews: [rev('Ann A', 'Great doctor, very thorough and kind.'), rev('Bob B', 'Best primary care visit I have had.')],
};

test('keeps all existing, adds only new, new first', () => {
  const out = mergeReviews(base, [rev('ann a', 'Great doctor,  very thorough and kind.'), rev('Cy C', 'Wonderful staff and quick scheduling.')], { totalRatings: 29 });
  assert.deepEqual(out.reviews.map((r) => r.author), ['Cy C', 'Ann A', 'Bob B']);
  assert.equal(out.totalRatings, 29);
});

test('empty or all-duplicate incoming leaves reviews unchanged and never shrinks counts', () => {
  const out = mergeReviews(base, [rev('Bob B', 'Best primary care visit I have had.')], { totalRatings: 5 });
  assert.deepEqual(out.reviews, base.reviews);
  assert.equal(out.totalRatings, 28);
});
