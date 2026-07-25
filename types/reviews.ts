export interface GoogleReview {
  name: string;
  rating: number;
  quote: string;
}

export interface GooglePlaceReview {
  author_name: string;
  rating: number;
  text: string;
  time: number;
  profile_photo_url: string;
}

export interface GoogleReviewsResponse {
  reviews: GooglePlaceReview[];
  rating: number;
  totalReviews: number;
}
