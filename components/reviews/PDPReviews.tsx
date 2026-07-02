import { REVIEWS, reviewsFor, summary } from "@/lib/reviews";
import { StarRating } from "./StarRating";
import { ReviewCard } from "./ReviewCard";

/**
 * PDP reviews block. If this specific plant has reviews we show them first,
 * then a couple of general customer reviews as social proof.
 */
export function PDPReviews({ plantId }: { plantId: string }) {
  const own = reviewsFor(plantId);
  const others = REVIEWS.filter((r) => r.plantId !== plantId).slice(0, 2);
  const list = [...own, ...others].slice(0, 3);
  if (list.length === 0) return null;
  const { count, average } = summary();

  return (
    <section aria-label="Customer reviews" className="mt-20 lg:mt-28">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <p className="eyebrow text-sage-deep">From the patio</p>
          <h2 className="mt-2 text-3xl sm:text-4xl leading-[1.06] text-balance">
            Real reviews from real growers.
          </h2>
        </div>
        <div className="inline-flex items-center gap-3 rounded-full bg-paper border border-line px-4 py-2 shadow-soft self-start">
          <StarRating value={average} size={16} />
          <p className="text-sm text-forest font-medium tabular-nums">
            {average.toFixed(1)}
          </p>
          <span className="h-3 w-px bg-line" aria-hidden />
          <p className="text-sm text-forest/65">
            {count} {count === 1 ? "review" : "reviews"} total
          </p>
        </div>
      </header>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {list.map((r) => (
          <li key={r.id}>
            <ReviewCard review={r} showPlantLink={r.plantId !== plantId} />
          </li>
        ))}
      </ul>
    </section>
  );
}
