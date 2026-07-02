"use client";

import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";

type Props = {
  product: Product;
  qty?: number;
  size?: "icon" | "full";
  className?: string;
  /** Stop card link navigation when icon variant is inside an <a> */
  stopPropagate?: boolean;
};

export function AddToCartButton({
  product,
  qty = 1,
  size = "full",
  className,
  stopPropagate = false,
}: Props) {
  const { add, openDrawer } = useCart();
  const [confirming, setConfirming] = useState(false);

  function handle(e: React.MouseEvent) {
    if (stopPropagate) {
      e.preventDefault();
      e.stopPropagation();
    }
    add({
      id: product.id,
      slug: product.slug,
      name: product.displayName,
      image: product.image,
      unitPrice: product.price,
      maxQty: product.stock,
      qty,
    });
    setConfirming(true);
    window.setTimeout(() => setConfirming(false), 1200);
    if (size === "full") openDrawer();
  }

  if (size === "icon") {
    return (
      <button
        type="button"
        onClick={handle}
        aria-label={`Add ${product.displayName} to cart`}
        className={cn(
          "press grid place-items-center h-10 w-10 rounded-full bg-forest text-paper shadow-soft",
          "transition-[background-color,transform,opacity] duration-300 ease-[var(--ease-out-strong)]",
          "hover:bg-forest-dark",
          confirming && "bg-sage-deep",
          className,
        )}
      >
        {confirming ? (
          <Check className="h-4 w-4" strokeWidth={2.2} />
        ) : (
          <Plus className="h-4 w-4" strokeWidth={2} />
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handle}
      className={cn(
        "press group inline-flex items-center justify-center gap-2 rounded-full",
        "bg-forest text-paper px-6 py-3.5 text-[0.95rem] font-medium tracking-wide",
        "shadow-soft transition-[background-color,box-shadow] duration-500 ease-[var(--ease-out-strong)]",
        "hover:bg-forest-dark hover:shadow-soft-lg",
        confirming && "bg-sage-deep hover:bg-sage-deep",
        className,
      )}
    >
      {confirming ? (
        <>
          <Check className="h-4 w-4" strokeWidth={2.2} />
          Added to cart
        </>
      ) : (
        <>
          <Plus className="h-4 w-4" strokeWidth={2} />
          Add to cart · ${product.price}
        </>
      )}
    </button>
  );
}
