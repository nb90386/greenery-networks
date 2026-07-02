import type { Metadata } from "next";
import { FavoritesView } from "@/components/shop/FavoritesView";

export const metadata: Metadata = {
  title: "Saved plants",
  description: "The plants you have saved. Kept on this device.",
};

export default function FavoritesPage() {
  return (
    <section className="relative pt-32 lg:pt-40 pb-24 lg:pb-32 min-h-[80vh]">
      <div className="container-site">
        <FavoritesView />
      </div>
    </section>
  );
}
