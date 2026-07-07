const RATINGS = [
  { label: "Facebook", score: "5.0" },
  { label: "Google", score: "4.9" },
  { label: "Thumbtack", score: "5.0" },
];

export function ServiceTrustBar() {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-6 sm:flex-row">
        <p className="text-lg font-semibold">
          Our company is a top-rated service provider
        </p>
        <div className="flex items-center gap-6">
          {RATINGS.map((rating) => (
            <div key={rating.label} className="text-center text-sm">
              <p className="font-bold">{rating.score}</p>
              <p>on {rating.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
