"use client";

import Link from "next/link";
import { PlantImage } from "@/components/site/PlantImage";
import { AddToCartButton } from "./AddToCartButton";
import { FavoriteButton } from "./FavoriteButton";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";

/**
 * Stock urgency copy. We start every variety at 5. As stock drops we swap
 * language and color so it feels honest and gently urgent, not spammy.
 */
export function stockCopy(stock: number) {
  if (stock <= 0) return { label: "Sold out", tone: "sold" as const };
  if (stock <= 2) return { label: `Selling out. Only ${stock} left.`, tone: "urgent" as const };
  return { label: `Only ${stock} available`, tone: "quiet" as const };
}

export function ProductCard({ product }: { product: Product }) {
  const stock = stockCopy(product.stock);
  return (
    <article className="pcard group relative" data-id={product.id}>
      <Link
        href={`/shop/${product.slug}`}
        className="block focus:outline-none"
        aria-label={`${product.displayName}, $${product.price}`}
      >
        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden ring-1 ring-forest/8 bg-paper shadow-soft">
          <div
            className={cn(
              "absolute inset-0 transition-transform duration-[900ms] ease-[var(--ease-out-strong)]",
              "scale-[1.22] origin-top group-hover:scale-[1.32]",
            )}
          >
            <PlantImage
              src={product.image}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 22vw, 48vw"
              cropCaption={false}
            />
          </div>

          {/* Badge row: 4-in starter + stock chip */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <span className="inline-flex items-center rounded-full bg-paper/85 backdrop-blur-md text-forest text-[0.66rem] font-medium px-2 py-1 tracking-wide">
              4 in starter
            </span>
            {stock.tone === "urgent" && (
              <span className="inline-flex items-center rounded-full bg-blush/85 backdrop-blur-md text-blush-deep text-[0.66rem] font-medium px-2 py-1 tracking-wide">
                Selling out
              </span>
            )}
            {stock.tone === "sold" && (
              <span className="inline-flex items-center rounded-full bg-forest/85 backdrop-blur-md text-paper text-[0.66rem] font-medium px-2 py-1 tracking-wide">
                Sold out
              </span>
            )}
          </div>

          {/* Favorite toggle */}
          <FavoriteButton
            productId={product.id}
            className="absolute top-3 right-3"
            stopPropagate
          />

          {/* Quick add. On desktop it hides until hover. On mobile it stays visible. */}
          <AddToCartButton
            product={product}
            size="icon"
            stopPropagate
            className={cn(
              "absolute bottom-3 right-3",
              "opacity-100 md:opacity-0 md:translate-y-1.5",
              "md:group-hover:opacity-100 md:group-hover:translate-y-0",
              "transition-[opacity,transform] duration-500 ease-[var(--ease-out-strong)]",
            )}
          />
        </div>

        <div className="mt-4 flex items-baseline justify-between gap-3">
          <div className="min-w-0">
            <p className="font-mono text-[0.66rem] tracking-[0.18em] uppercase text-forest/65">
              Nº {product.id}
            </p>
            <p className="mt-1 font-display text-[1.1rem] leading-tight text-forest truncate">
              {product.name}
            </p>
          </div>
          <span className="shrink-0 text-forest font-medium text-[0.95rem] tabular-nums">
            ${product.price}
          </span>
        </div>
        <p className={cn(
          "mt-1 text-[0.78rem]",
          stock.tone === "urgent" && "text-blush-deep font-medium",
          stock.tone === "quiet" && "text-forest/65",
          stock.tone === "sold" && "text-forest/55",
        )}>
          {stock.label}
        </p>
      </Link>
    </article>
  );
}
