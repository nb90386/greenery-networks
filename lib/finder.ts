/**
 * Plant finder scoring logic.
 *
 * The finder asks seven questions and then scores every product against
 * those answers. The signal strengths (color and size and pollinator and
 * placement) are weighted higher than the softer signals (mood, experience).
 *
 * The score is unitless. The finder simply sorts descending and takes the
 * top N. Every match also carries a one line human reason so the UI can
 * explain why we picked it.
 */

import { products, type ColorKey, type Product } from "@/data/products";

export type { ColorKey };

export type PlaceKey = "patio" | "garden" | "balcony" | "indoor";
export type SunKey = "full" | "part" | "shade";
export type MoodKey = "bold" | "pastel" | "moody";
export type SizeAnswer = "mini" | "standard";
export type XpKey = "beginner" | "some";
export type PollAnswer = "yes" | "meh";

export type FinderAnswers = {
  place?: PlaceKey;
  sun?: SunKey;
  colors?: ColorKey[];
  mood?: MoodKey;
  size?: SizeAnswer;
  xp?: XpKey;
  pollinator?: PollAnswer;
};

export type FinderMatch = {
  product: Product;
  score: number;
  reason: string;
};

/* Which product colors count as "bold and bright" vs "soft and pastel" vs
 * "deep and moody" so the mood signal has meaning without adding data. */
const BOLD_COLORS: ColorKey[] = ["red", "pink", "salmon", "scented"];
const PASTEL_COLORS: ColorKey[] = ["lavender", "white", "salmon"];
const MOODY_COLORS: ColorKey[] = ["burgundy", "purple", "barleria"];

const PLACE_LABEL: Record<PlaceKey, string> = {
  patio: "your patio",
  garden: "your garden bed",
  balcony: "your balcony",
  indoor: "a bright indoor spot",
};

const COLOR_LABEL: Record<ColorKey, string> = {
  red: "red",
  burgundy: "burgundy",
  pink: "pink",
  salmon: "salmon",
  lavender: "lavender",
  purple: "purple",
  white: "white",
  barleria: "Barleria",
  scented: "scented",
  other: "unusual",
};

/**
 * Score a single product against the answers. Returns the score and a short
 * reason string that reads like a friendly plant person recommending it.
 */
export function scoreProduct(p: Product, a: FinderAnswers): { score: number; reason: string } {
  let score = 0;
  const reasons: string[] = [];

  // Color match, weight 5
  if (a.colors && a.colors.length > 0) {
    if (a.colors.includes(p.color)) {
      score += 5;
      reasons.push(`the ${COLOR_LABEL[p.color]} you picked`);
    } else if (p.color === "other") {
      score += 1;
    }
  }

  // Size match, weight 3
  if (a.size) {
    if (a.size === p.size) score += 3;
    if (a.size === "mini" && p.size === "mini") {
      reasons.push("nice and compact");
    }
  }

  // Pollinator, weight 3
  if (a.pollinator === "yes" && p.flags.includes("pollinatorFriendly")) {
    score += 3;
    reasons.push("brings pollinators");
  }

  // Placement, weight 3
  if (a.place === "patio" && p.flags.includes("patioFriendly")) {
    score += 3;
    reasons.push("great on a patio");
  }
  if (a.place === "balcony" && p.flags.includes("patioFriendly")) {
    score += 2;
    reasons.push("happy in a container");
  }
  if (a.place === "indoor" && p.type === "pelargonium") {
    score += 1;
  }
  if (a.place === "garden" && p.type === "barleria") {
    score += 2;
    reasons.push("a great garden shrub");
  }
  if (a.place === "garden" && p.type === "pelargonium") {
    score += 1;
  }

  // Sun, weight 2
  if (a.sun === "full" && p.type !== "barleria") score += 2;
  if (a.sun === "part") score += 1;
  if (a.sun === "shade" && p.type === "barleria") {
    score += 3;
    reasons.push("loves bright shade");
  }
  if (a.sun === "shade" && p.type !== "barleria") score -= 1;

  // Mood, weight 2
  if (a.mood === "bold" && BOLD_COLORS.includes(p.color)) score += 2;
  if (a.mood === "pastel" && PASTEL_COLORS.includes(p.color)) score += 2;
  if (a.mood === "moody" && MOODY_COLORS.includes(p.color)) score += 2;
  if (
    a.mood &&
    ((a.mood === "bold" && MOODY_COLORS.includes(p.color)) ||
      (a.mood === "moody" && BOLD_COLORS.includes(p.color)))
  ) {
    score -= 1;
  }

  // Experience, weight 1
  if (a.xp === "beginner" && p.flags.includes("beginnerFriendly")) score += 1;

  // Build the reason sentence
  const place = a.place ? PLACE_LABEL[a.place] : null;
  let reason = "";
  if (place && reasons.length > 0) {
    reason = `Loves ${place}. ` + capitalize(reasons.slice(0, 2).join(" and ")) + ".";
  } else if (reasons.length > 0) {
    reason = capitalize(reasons.slice(0, 2).join(" and ")) + ".";
  } else if (place) {
    reason = `A quiet win for ${place}.`;
  } else {
    reason = "A calm all rounder from the collection.";
  }

  return { score, reason };
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * Return the top N product matches for the given answers.
 */
export function findMatches(a: FinderAnswers, count = 8): FinderMatch[] {
  const scored = products
    .map((p) => {
      const { score, reason } = scoreProduct(p, a);
      return { product: p, score, reason };
    })
    .sort((a2, b2) => b2.score - a2.score);
  return scored.slice(0, count);
}

/**
 * Compose the shop query string that deep links into a filtered shop grid
 * with the finder's colors selected. If no color was picked we send the user
 * to the general shop.
 */
export function shopQueryFor(a: FinderAnswers): string {
  if (!a.colors || a.colors.length === 0) return "/shop";
  // Shop currently supports a single color param. Use the first pick.
  return `/shop?color=${a.colors[0]}`;
}
