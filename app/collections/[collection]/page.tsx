import { notFound } from "next/navigation";
import { ShopGrid } from "@/components/shop/ShopGrid";
import {
  COLLECTIONS,
  byColor,
  type ColorKey,
} from "@/data/products";

type Params = { collection: string };

export function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ collection: c.key }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { collection } = await params;
  const c = COLLECTIONS.find((x) => x.key === collection);
  if (!c) return { title: "Collection" };
  return {
    title: `${c.title} · Collection`,
    description: `${c.blurb}. Live ${c.title.toLowerCase()} flowering starter plants from Greenery Networks.`,
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { collection } = await params;
  const c = COLLECTIONS.find((x) => x.key === collection);
  if (!c) notFound();

  const list = byColor(c.key as ColorKey);

  return (
    <ShopGrid
      baseProducts={list}
      initialColor={c.key as ColorKey}
      eyebrow={`Collection · ${list.length} ${list.length === 1 ? "plant" : "plants"}`}
      title={c.title}
      subtitle={`${c.blurb}. Each is a live starter in a 4-inch pot, $${12} and shipped USPS.`}
      showCollectionsNav
    />
  );
}
