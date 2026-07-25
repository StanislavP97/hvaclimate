import { fetchGoogleReviews } from "@/lib/google-reviews";
import { ReviewsSlider } from "@/components/ReviewsSlider";

export async function GoogleReviews() {
  const { reviews, rating, totalReviews } = await fetchGoogleReviews();

  if (reviews.length === 0) return null;

  return (
    <section className="bg-background py-19">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <p className="text-[13px] font-bold tracking-[0.14em] text-primary-accent uppercase">
          Reviews
        </p>
        <h2 className="mt-3 text-4xl font-extrabold text-foreground">
          What Our Customers Say
        </h2>
        <p className="mt-4 text-body">
          <span className="text-primary-accent">&#9733;</span> {rating} out of 5 &middot;{" "}
          Based on {totalReviews} Google reviews
        </p>
      </div>

      <ReviewsSlider reviews={reviews} />
    </section>
  );
}
