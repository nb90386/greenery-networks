"use client";

import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import { useFavorites } from "./FavoritesContext";
import { getProductsByIds } from "@/data/products";
import { ProductCard } from "./ProductCard";

export function FavoritesView() {
  const { ready, ids, clear } = useFavorites();
  const list = getProductsByIds(ids);

  if (!ready) return null;

  return (
    <div>
      <header className="max-w-2xl">
        <p className="eyebrow text-sage-deep">Your saved plants</p>
        <h1 className="mt-3 text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.04] text-balance">
          {list.length === 0 ? (
            "Nothing saved yet."
          ) : (
            <>
              {list.length}{" "}
              <span className="italic font-light text-sage-deep">
                {list.length === 1 ? "keeper" : "keepers"}.
              </span>
            </>
          )}
        </h1>
        {list.length > 0 && (
          <p className="mt-4 text-forest/70 leading-relaxed">
            Saved plants live on this device. To move them across devices, add
            them to your cart or subscribe to Garden Letters.
          </p>
        )}
      </header>

      {list.length === 0 ? (
        <div className="mt-12 rounded-3xl bg-mist/60 border border-line p-12 text-center">
          <span className="mx-auto grid place-items-center h-14 w-14 rounded-full bg-paper text-forest">
            <Heart className="h-6 w-6" strokeWidth={1.6} />
          </span>
          <p className="mt-5 font-display text-2xl text-forest">
            Tap the heart on any plant.
          </p>
          <p className="mt-2 text-forest/65 max-w-md mx-auto">
            We will keep them here so you can come back and finish deciding.
          </p>
          <Link
            href="/shop"
            className="press mt-8 inline-flex items-center gap-2 rounded-full bg-forest text-paper px-5 py-3 text-sm font-medium hover:bg-forest-dark transition-colors"
          >
            Browse plants
            <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
          </Link>
        </div>
      ) : (
        <>
          <ul className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 lg:gap-x-5">
            {list.map((p) => (
              <li key={p.id}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="press inline-flex items-center gap-2 rounded-full bg-forest text-paper px-5 py-3 text-sm font-medium hover:bg-forest-dark transition-colors"
            >
              Keep browsing
            </Link>
            <button
              type="button"
              onClick={clear}
              className="press text-sm text-forest/60 underline-offset-4 hover:text-forest hover:underline"
            >
              Clear favorites
            </button>
          </div>
        </>
      )}
    </div>
  );
}
