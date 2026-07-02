import { CheckCircle2 } from "lucide-react";
import { StarRating } from "./StarRating";
import { getProduct } from "@/data/products";
import type { Review } from "@/lib/reviews";

export function ReviewCard({
  review,
  showPlantLink = true,
}: {
  review: Review;
  showPlantLink?: boolean;
}) {
  const plant = review.plantId ? getProduct(review.plantId) : undefined;
  return (
    <article className="relative rounded-3xl bg-paper border border-line p-7 shadow-soft lift">
      <div className="flex items-center justify-between gap-4">
        <StarRating value={review.rating} size={16} />
        {review.verified && (
          <span className="inline-flex items-center gap-1 text-[0.7rem] text-sage-deep bg-mist border border-mist-deep/40 rounded-full px-2 py-1">
            <CheckCircle2 className="h-3 w-3" strokeWidth={2} />
            Verified buyer
          </span>
        )}
      </div>
      <p className="mt-5 text-[1.02rem] leading-relaxed text-forest">
        &ldquo;{review.quote}&rdquo;
      </p>
      <div className="mt-6 pt-5 border-t border-line/80 flex items-center justify-between gap-3">
        <div>
          <p className="text-[0.9rem] font-medium text-forest">{review.name}</p>
          {plant && showPlantLink && (
            <p className="mt-0.5 text-[0.72rem] font-mono tracking-[0.12em] uppercase text-forest/55">
              Nº {plant.id} · {plant.name}
            </p>
          )}
        </div>
        <time
          dateTime={review.date}
          className="text-[0.72rem] text-forest/50"
        >
          {new Date(review.date).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          })}
        </time>
      </div>
    </article>
  );
}
