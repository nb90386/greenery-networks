"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import type { Product } from "@/data/products";
import { stockCopy } from "./ProductCard";
import { cn } from "@/lib/utils";

/**
 * Sticky Add to Cart bar. Appears at the bottom of a PDP once the user has
 * scrolled past the main hero, so buying is always one tap away, especially
 * on mobile.
 */
export function StickyAddToCartBar({ product }: { product: Product }) {
  const { add, openDrawer } = useCart();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 500);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function onAdd() {
    add({
      id: product.id,
      slug: product.slug,
      name: product.displayName,
      image: product.image,
      unitPrice: product.price,
      maxQty: product.stock,
    });
    openDrawer();
  }

  const stock = stockCopy(product.stock);

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40",
        "transition-transform duration-500 ease-[var(--ease-out-strong)]",
        visible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="bg-paper/90 backdrop-blur-xl border-t border-line shadow-soft-lg">
        <div className="container-site flex items-center gap-4 py-3">
          <div className="min-w-0 flex-1">
            <p className="font-display text-[1.05rem] leading-tight text-forest truncate">
              {product.displayName}
            </p>
            <p
              className={cn(
                "text-[0.78rem] mt-0.5",
                stock.tone === "urgent"
                  ? "text-blush-deep font-medium"
                  : "text-forest/60",
              )}
            >
              ${product.price} · {stock.label}
            </p>
          </div>
          <button
            type="button"
            onClick={onAdd}
            className="press inline-flex items-center gap-2 rounded-full bg-forest text-paper px-5 py-3 text-[0.9rem] font-medium tracking-wide hover:bg-forest-dark transition-colors shrink-0"
          >
            <Plus className="h-4 w-4" strokeWidth={2} />
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
