"use client";

import { Heart } from "lucide-react";
import { useFavorites } from "./FavoritesContext";
import { cn } from "@/lib/utils";

type Props = {
  productId: string;
  className?: string;
  stopPropagate?: boolean;
  /** compact = small circle for grid cards. large = medium pill for PDPs. */
  size?: "compact" | "large";
};

export function FavoriteButton({
  productId,
  className,
  stopPropagate,
  size = "compact",
}: Props) {
  const { has, toggle, ready } = useFavorites();
  if (!ready) return null;
  const active = has(productId);

  function onClick(e: React.MouseEvent) {
    if (stopPropagate) {
      e.preventDefault();
      e.stopPropagation();
    }
    toggle(productId);
  }

  if (size === "large") {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-pressed={active}
        aria-label={active ? "Remove from favorites" : "Save to favorites"}
        className={cn(
          "press inline-flex items-center gap-2 rounded-full px-4 py-2.5",
          "text-[0.9rem] font-medium border transition-[background-color,color,border-color] duration-300 ease-[var(--ease-out-strong)]",
          active
            ? "bg-blush border-blush-deep/25 text-blush-deep"
            : "bg-paper border-forest/15 text-forest hover:border-forest/35",
          className,
        )}
      >
        <Heart
          className={cn("h-4 w-4", active && "fill-blush-deep")}
          strokeWidth={1.7}
        />
        {active ? "Saved" : "Save"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={active ? "Remove from favorites" : "Save to favorites"}
      className={cn(
        "press grid place-items-center h-9 w-9 rounded-full",
        "backdrop-blur-md transition-[background-color,color] duration-300",
        active
          ? "bg-blush text-blush-deep"
          : "bg-paper/70 text-forest hover:bg-paper",
        className,
      )}
    >
      <Heart
        className={cn("h-4 w-4", active && "fill-blush-deep")}
        strokeWidth={1.7}
      />
    </button>
  );
}
