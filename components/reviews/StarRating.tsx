import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function StarRating({
  value,
  className,
  size = 14,
}: {
  value: number;
  className?: string;
  size?: number;
}) {
  const filled = Math.round(value);
  return (
    <span
      className={cn("inline-flex items-center gap-0.5", className)}
      aria-label={`${value} out of 5 stars`}
      role="img"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          width={size}
          height={size}
          strokeWidth={1.4}
          className={cn(
            i < filled ? "text-citrus fill-citrus" : "text-forest/25",
          )}
        />
      ))}
    </span>
  );
}
