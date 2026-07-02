/**
 * Greenery Networks live plant catalog.
 *
 * 117 flowering starter plants. 4 inch pots. $12 each. 5 in stock per variety.
 * Shipped USPS within the USA. Field values are derived from each variety's
 * caption (for example "021 - Soft Red" becomes color red, pattern solid).
 */

import catalog from "./plant-catalog.json";

export type ColorKey =
  | "red"
  | "burgundy"
  | "pink"
  | "salmon"
  | "lavender"
  | "purple"
  | "white"
  | "barleria"
  | "scented"
  | "other";

export type PatternKey =
  | "solid"
  | "blotched"
  | "striped"
  | "edged"
  | "gradient"
  | "ruffled"
  | "dotted";

export type SizeKey = "standard" | "mini";

export type TypeKey = "pelargonium" | "barleria" | "scented";

export type Flag =
  | "beginnerFriendly"
  | "pollinatorFriendly"
  | "patioFriendly"
  | "lowMaintenance";

/**
 * Care fields shown on plant care pages and PDPs. The `hardiness` field is
 * kept as an internal key so existing code compiles, but the label shown to
 * customers is "Climate" and the copy never cites a hardiness zone.
 */
export type CareAttributes = {
  sun: string;
  water: string;
  bloomSeason: string;
  hardiness: string;
  matureSize: string;
  difficulty: string;
  pollinator: string;
  container: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  displayName: string;
  color: ColorKey;
  pattern: PatternKey;
  size: SizeKey;
  type: TypeKey;
  price: 12;
  stock: 5;
  image: string;
  gallery: string[];
  flags: Flag[];
  care: CareAttributes;
  description: string;
};

/* ---------- helpers ---------- */

type Raw = { id: string; name: string };

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function colorize(name: string): ColorKey {
  const n = name.toLowerCase();
  if (n.includes("barleria") || n.includes("barcleria")) return "barleria";
  if (n.includes("citronella") || n.includes("scented")) return "scented";
  if (/(burgundy|garnet|wine|dark red|maroon)/.test(n)) return "burgundy";
  if (/(salmon|coral|apricot|peach)/.test(n)) return "salmon";
  if (/(lavender|violet|orchid)/.test(n)) return "lavender";
  if (/(purple|plum|mauve)/.test(n)) return "purple";
  if (/(pink|blush|rose|candy|magenta|fuschia|fuchsia)/.test(n)) return "pink";
  if (/(white|pale|cream)/.test(n)) return "white";
  if (/red/.test(n)) return "red";
  return "other";
}

function patternize(name: string): PatternKey {
  const n = name.toLowerCase();
  if (/ruffled/.test(n)) return "ruffled";
  if (/(stripes|stripe|streaks|streak)/.test(n)) return "striped";
  if (/(blotch|blotches|blot)/.test(n)) return "blotched";
  if (/(edge|edges|rim)/.test(n)) return "edged";
  if (/(gradient|fade|ombre)/.test(n)) return "gradient";
  if (/(dot|dots|spot|spots)/.test(n)) return "dotted";
  return "solid";
}

function sizeFor(name: string): SizeKey {
  return /\bmini\b/i.test(name) ? "mini" : "standard";
}

function typeFor(name: string): TypeKey {
  const n = name.toLowerCase();
  if (n.includes("barleria") || n.includes("barcleria")) return "barleria";
  if (n.includes("citronella") || n.includes("scented")) return "scented";
  return "pelargonium";
}

function flagsFor(type: TypeKey, size: SizeKey): Flag[] {
  const f: Flag[] = ["beginnerFriendly"];
  if (type === "pelargonium") {
    f.push("pollinatorFriendly", "patioFriendly", "lowMaintenance");
  }
  if (type === "barleria") {
    f.push("pollinatorFriendly", "patioFriendly");
  }
  if (type === "scented") {
    f.push("patioFriendly", "lowMaintenance");
  }
  if (size === "mini") {
    if (!f.includes("patioFriendly")) f.push("patioFriendly");
  }
  return f;
}

/**
 * Care copy by plant type. Kept honest and specific. No hardiness zones.
 * The `hardiness` field is now climate-first guidance, not a zone number.
 */
export const CARE_BY_TYPE: Record<TypeKey, CareAttributes> = {
  pelargonium: {
    sun: "Full to part sun. Aim for four to six hours a day.",
    water: "Water when the top inch of soil feels dry.",
    bloomSeason: "Blooms spring through fall in warm weather.",
    hardiness:
      "Happiest in warm weather and easy to keep. Grow it outside when it is mild, or pot it up and bring it indoors when the cold sets in.",
    matureSize: "About 12 to 18 inches tall and 12 to 18 inches wide.",
    difficulty: "Beginner friendly.",
    pollinator: "Butterflies and hummingbirds love the blooms.",
    container: "Yes. Happy in 6 to 10 inch pots and patio planters.",
  },
  barleria: {
    sun: "Bright shade to part sun.",
    water: "Keep the soil consistently moist.",
    bloomSeason: "Blooms late summer through fall, and repeats often.",
    hardiness:
      "A warm-climate shrub. Grow it outdoors where it stays mild, or keep it in a container you can move inside when it gets cold.",
    matureSize: "About 24 to 36 inches tall and 18 to 30 inches wide.",
    difficulty: "Beginner friendly.",
    pollinator: "A great nectar source for butterflies.",
    container: "Yes. Best in 8 to 12 inch pots.",
  },
  scented: {
    sun: "Full to part sun. Aim for four to six hours a day.",
    water: "Drought tolerant once established. Underwater is better than over.",
    bloomSeason: "Grown for the fragrant foliage more than the blooms.",
    hardiness:
      "Loves warm weather. Keep it on a sunny patio and bring it indoors before the first frost.",
    matureSize: "About 18 to 36 inches tall and 18 to 24 inches wide.",
    difficulty: "Beginner friendly and low fuss.",
    pollinator: "The lemony scent naturally deters mosquitoes.",
    container: "Yes. Happy in 8 to 12 inch pots near seating.",
  },
};

function describe(name: string, type: TypeKey, color: ColorKey, pattern: PatternKey): string {
  const colorWord =
    color === "barleria"
      ? "richly colored"
      : color === "scented"
      ? "fragrant"
      : color;

  const patternWord =
    pattern === "solid"
      ? ""
      : pattern === "edged"
      ? " with delicately edged petals"
      : pattern === "striped"
      ? " streaked with contrast"
      : pattern === "blotched"
      ? " painted with deep blotches"
      : pattern === "ruffled"
      ? " with ruffled, frilly petals"
      : pattern === "gradient"
      ? " with a soft gradient through the bloom"
      : pattern === "dotted"
      ? " peppered with delicate dots"
      : "";

  if (type === "barleria") {
    return `A Philippine violet (Barleria) with ${colorWord} blooms${patternWord}. Hand grown into a 4 inch starter and ready to settle into a bright shade corner or a container.`;
  }
  if (type === "scented") {
    return `A fragrant pelargonium with aromatic foliage. Brush past it and the scent lifts. Hand grown into a 4 inch starter and ready for a sunny patio or a kitchen door.`;
  }
  return `A ${colorWord} regal or zonal pelargonium${patternWord}. Hand grown into a 4 inch starter, shipped with healthy roots and a flush of buds, and ready to plant the day it arrives.`;
}

/* ---------- catalog ---------- */

type RawList = Raw[];

export const products: Product[] = (catalog as RawList).map((p) => {
  const color = colorize(p.name);
  const pattern = patternize(p.name);
  const size = sizeFor(p.name);
  const type = typeFor(p.name);
  const displayName = `Nº ${p.id} · ${p.name}`;
  return {
    id: p.id,
    slug: slugify(`${p.id}-${p.name}`),
    name: p.name,
    displayName,
    color,
    pattern,
    size,
    type,
    price: 12 as const,
    stock: 5 as const,
    image: `/images/plants/${p.id}.jpg`,
    gallery: [],
    flags: flagsFor(type, size),
    care: CARE_BY_TYPE[type],
    description: describe(p.name, type, color, pattern),
  };
});

const byId = new Map(products.map((p) => [p.id, p]));
const bySlug = new Map(products.map((p) => [p.slug, p]));

export function getProduct(idOrSlug: string): Product | undefined {
  return byId.get(idOrSlug) ?? bySlug.get(idOrSlug);
}

export function byColor(color: ColorKey) {
  return products.filter((p) => p.color === color);
}

export function getProductsByIds(ids: readonly string[]) {
  return ids
    .map((id) => byId.get(id))
    .filter((p): p is Product => Boolean(p));
}

/* Hand curated collections shown on the home Shop by color tiles. */
export const COLLECTIONS: ReadonlyArray<{
  key: ColorKey;
  title: string;
  blurb: string;
  cover: string;
  swatch: string;
}> = [
  { key: "red",       title: "Reds",                blurb: "Fire red signature blooms.",       cover: "010", swatch: "oklch(0.55 0.20 25)" },
  { key: "burgundy",  title: "Burgundy and Garnet", blurb: "Moody, deep, romantic.",           cover: "111", swatch: "oklch(0.36 0.12 18)" },
  { key: "pink",      title: "Pinks",               blurb: "Soft to vivid, the warmest hue.",  cover: "021", swatch: "oklch(0.72 0.16 10)" },
  { key: "salmon",    title: "Salmon and Coral",    blurb: "Sunlit, warm, hand painted.",      cover: "047", swatch: "oklch(0.78 0.12 28)" },
  { key: "lavender",  title: "Lavender",            blurb: "Cool, calm, comes back yearly.",   cover: "074", swatch: "oklch(0.66 0.10 305)" },
  { key: "purple",    title: "Purples",             blurb: "Velvet drama for shaded patios.",  cover: "032", swatch: "oklch(0.48 0.13 295)" },
  { key: "barleria",  title: "Philippine Violets",  blurb: "Five rare Barleria varieties.",    cover: "001", swatch: "oklch(0.62 0.14 280)" },
  { key: "scented",   title: "Scented",             blurb: "Citronella and fragrant foliage.", cover: "039", swatch: "oklch(0.7 0.13 110)" },
];

/* 12 standout plants for the Featured section. */
export const FEATURED_IDS = [
  "117", "021", "074", "110", "047", "032",
  "001", "010", "111", "008", "065", "094",
] as const;

/* ---------- filter facets ---------- */

export const COLOR_LABEL: Record<ColorKey, string> = {
  red: "Red", burgundy: "Burgundy", pink: "Pink", salmon: "Salmon",
  lavender: "Lavender", purple: "Purple", white: "White", barleria: "Barleria",
  scented: "Scented", other: "Other",
};

/* Hex swatch colors for the visual color-swatch filter. */
export const COLOR_SWATCH: Record<ColorKey, string> = {
  red: "oklch(0.55 0.20 25)",
  burgundy: "oklch(0.36 0.12 18)",
  pink: "oklch(0.72 0.16 10)",
  salmon: "oklch(0.78 0.12 28)",
  lavender: "oklch(0.66 0.10 305)",
  purple: "oklch(0.48 0.13 295)",
  white: "oklch(0.94 0.01 90)",
  barleria: "oklch(0.62 0.14 280)",
  scented: "oklch(0.7 0.13 110)",
  other: "oklch(0.55 0.03 140)",
};

export const PATTERN_LABEL: Record<PatternKey, string> = {
  solid: "Solid", blotched: "Blotched", striped: "Striped", edged: "Edged",
  gradient: "Gradient", ruffled: "Ruffled", dotted: "Dotted",
};

export const SIZE_LABEL: Record<SizeKey, string> = {
  standard: "Standard", mini: "Mini",
};

export const TYPE_LABEL: Record<TypeKey, string> = {
  pelargonium: "Pelargonium / Geranium",
  barleria: "Philippine Violet",
  scented: "Scented",
};

export const FLAG_LABEL: Record<Flag, string> = {
  beginnerFriendly: "Beginner friendly",
  pollinatorFriendly: "Pollinator friendly",
  patioFriendly: "Patio friendly",
  lowMaintenance: "Low maintenance",
};
