import type { GooglePlaceReview, GoogleReviewsResponse } from "@/types/reviews";

export const GOOGLE_REVIEWS_REVALIDATE = 86400;

const PLACE_ID = "ChIJgd9KI2CwlVQR_FOgxcMnApY";

interface PlaceDetailsResponse {
  status: string;
  result?: {
    reviews?: GooglePlaceReview[];
    rating?: number;
    user_ratings_total?: number;
  };
}

export async function fetchGoogleReviews(): Promise<GoogleReviewsResponse> {
  const empty: GoogleReviewsResponse = { reviews: [], rating: 0, totalReviews: 0 };

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
  if (!apiKey) return empty;

  const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
  url.searchParams.set("place_id", PLACE_ID);
  url.searchParams.set("fields", "reviews,rating,user_ratings_total");
  url.searchParams.set("key", apiKey);

  try {
    const res = await fetch(url.toString(), {
      next: { revalidate: GOOGLE_REVIEWS_REVALIDATE },
    });
    const data: PlaceDetailsResponse = await res.json();

    if (data.status !== "OK" || !data.result) return empty;

    const reviews = (data.result.reviews ?? [])
      .filter((review) => review.rating >= 4)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 6);

    return {
      reviews,
      rating: data.result.rating ?? 0,
      totalReviews: data.result.user_ratings_total ?? 0,
    };
  } catch {
    return empty;
  }
}
