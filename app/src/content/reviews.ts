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
