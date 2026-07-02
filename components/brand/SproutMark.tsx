import { cn } from "@/lib/utils";

type SproutMarkProps = {
  className?: string;
  size?: number;
  /** Stroke color override (defaults to currentColor) */
  color?: string;
  title?: string;
};

/**
 * Minimal sprout / two-leaf glyph for the Greenery Networks brand.
 * Built on a 32×32 grid; stroked so it scales crisply at any size.
 */
export function SproutMark({
  className,
  size = 28,
  color,
  title = "Greenery Networks sprout",
}: SproutMarkProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      role="img"
      aria-label={title}
      className={cn("shrink-0", className)}
      style={color ? { color } : undefined}
    >
      <title>{title}</title>

      {/* Stem */}
      <path
        d="M16 30 V14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Left leaf. Curved teardrop */}
      <path
        d="M16 18
           C 10 18, 5.5 15, 5 9.5
           C 10 9, 14.5 12, 16 18 Z"
        fill="currentColor"
        opacity="0.92"
      />

      {/* Right leaf. Slightly larger, asymmetric balance */}
      <path
        d="M16 15
           C 22.5 15, 27 11.5, 27.5 5
           C 22 5.5, 17.5 8.5, 16 15 Z"
        fill="currentColor"
      />

      {/* Soil dot at base. A small grounding mark */}
      <circle cx="16" cy="30" r="1.1" fill="currentColor" opacity="0.6" />
    </svg>
  );
}
