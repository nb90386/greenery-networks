import Link from "next/link";
import { cn } from "@/lib/utils";
import { SproutMark } from "./SproutMark";

type WordmarkProps = {
  className?: string;
  /** sm = nav, md = footer/inline, lg = hero / brand moments */
  size?: "sm" | "md" | "lg";
  /** Inverted variant for use over dark backgrounds */
  tone?: "forest" | "paper";
  /** Wrap the mark + word in a link to /. Default true. */
  asLink?: boolean;
};

const sizeMap = {
  sm: { mark: 22, text: "text-[1.05rem]", gap: "gap-2", track: "tracking-[0.005em]" },
  md: { mark: 30, text: "text-2xl",       gap: "gap-2.5", track: "tracking-[-0.005em]" },
  lg: { mark: 46, text: "text-[2.6rem]",  gap: "gap-3.5", track: "tracking-[-0.015em]" },
} as const;

export function Wordmark({
  className,
  size = "sm",
  tone = "forest",
  asLink = true,
}: WordmarkProps) {
  const s = sizeMap[size];
  const toneCls =
    tone === "paper" ? "text-cream" : "text-forest";

  const inner = (
    <span
      className={cn(
        "inline-flex items-baseline group",
        s.gap,
        toneCls,
        className,
      )}
    >
      <SproutMark size={s.mark} className="-mb-0.5 self-end transition-transform duration-700 ease-[var(--ease-botanical)] group-hover:-translate-y-0.5 group-hover:rotate-[-4deg]" />
      <span
        className={cn(
          "font-display font-normal leading-none",
          s.text,
          s.track,
        )}
      >
        Greenery
        <span className="font-display italic font-light"> Networks</span>
      </span>
    </span>
  );

  if (!asLink) return inner;
  return (
    <Link
      href="/"
      aria-label="Greenery Networks. Home"
      className="inline-flex items-center"
    >
      {inner}
    </Link>
  );
}
