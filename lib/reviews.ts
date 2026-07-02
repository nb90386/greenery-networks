/**
 * Customer reviews for Greenery Networks.
 *
 * This is the single source of truth. Add new reviews here by appending a
 * new entry to the `REVIEWS` array. Every field is required.
 *
 * Conventions:
 * - `name`      first name followed by a single last initial and a period.
 * - `rating`    1 to 5. We only publish 5 star reviews at the moment.
 * - `plantId`   optional. If set, the review will show under that plant's PDP
 *               and the home reviews section will show the plant name.
 * - `verified`  true if we have confirmed the reviewer is a real customer.
 * - `date`      ISO date the review was received.
 * - `location`  optional US state abbreviation.
 */

export type Review = {
  id: string;
  name: string;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  plantId?: string;
  verified: boolean;
  date: string;
  location?: string;
};

export const REVIEWS: ReadonlyArray<Review> = [
  {
    id: "r-001",
    name: "Anu S.",
    rating: 5,
    quote:
      "I was nervous about ordering plants online but mine showed up carefully wrapped and already budding. A few weeks later my patio has these gorgeous ruffled blooms and I have barely done anything. Perfect for someone like me who usually forgets to water.",
    plantId: "112",
    verified: true,
    date: "2026-04-18",
  },
  {
    id: "r-002",
    name: "Deepa A.",
    rating: 5,
    quote:
      "I ordered five different colors for my container garden and they are all thriving. The plants were fuller than I expected for the price, and that deep purple one is my favorite. I will definitely be back for more.",
    plantId: "032",
    verified: true,
    date: "2026-05-02",
  },
  {
    id: "r-003",
    name: "Vicki S.",
    rating: 5,
    quote:
      "This is my second order. The color selection is beautiful and the plants come healthy and full, not the sad little starts you sometimes get. I sent a couple to my sister as a gift and she loved them too.",
    plantId: "021",
    verified: true,
    date: "2026-05-20",
  },
];

/**
 * Reviews across the whole site. Used for the home reviews summary.
 */
export function summary(reviews: ReadonlyArray<Review> = REVIEWS) {
  const count = reviews.length;
  const avg =
    count === 0
      ? 0
      : reviews.reduce((n, r) => n + r.rating, 0) / count;
  return {
    count,
    /** Rounded to one decimal place. */
    average: Math.round(avg * 10) / 10,
  };
}

/**
 * Reviews for a specific product. If none exist we return an empty list.
 */
export function reviewsFor(plantId: string): Review[] {
  return REVIEWS.filter((r) => r.plantId === plantId);
}
