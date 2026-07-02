import { ShopGrid } from "@/components/shop/ShopGrid";
import type { ColorKey } from "@/data/products";

export const metadata = {
  title: "Shop · All flowering plants",
  description:
    "Browse 117 live flowering starter plants. Regal pelargoniums, Philippine violets, scented geraniums. 4-inch pots, $12 each, shipped USPS within the USA.",
};

type SP = { color?: string };

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  const sp = await searchParams;
  const valid: ColorKey[] = [
    "red", "burgundy", "pink", "salmon", "lavender",
    "purple", "white", "barleria", "scented",
  ];
  const initialColor =
    sp?.color && (valid as string[]).includes(sp.color)
      ? (sp.color as ColorKey)
      : undefined;

  return <ShopGrid initialColor={initialColor} />;
}
