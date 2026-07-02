"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useCart } from "./CartContext";
import { PlantImage } from "@/components/site/PlantImage";
import { useEscape } from "@/lib/use-escape";
import { cn } from "@/lib/utils";

export function CartDrawer() {
  const { drawerOpen, closeDrawer, items, subtotal, setQty, remove } = useCart();
  const count = items.reduce((n, it) => n + it.qty, 0);
  useEscape(drawerOpen, closeDrawer);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-hidden={!drawerOpen}
      aria-label="Cart"
      className={cn(
        "fixed inset-0 z-[80]",
        drawerOpen ? "pointer-events-auto" : "pointer-events-none",
      )}
    >
      <button
        type="button"
        aria-label="Close cart"
        tabIndex={drawerOpen ? 0 : -1}
        onClick={closeDrawer}
        className={cn(
          "absolute inset-0 bg-forest-dark/40 backdrop-blur-sm transition-opacity duration-500 cursor-default",
          drawerOpen ? "opacity-100" : "opacity-0",
        )}
      />

      <aside
        className={cn(
          "absolute right-0 top-0 h-dvh w-[94%] max-w-md bg-paper border-l border-line",
          "shadow-soft-lg flex flex-col",
          "transition-transform duration-500 ease-[var(--ease-drawer)]",
          drawerOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <header className="flex items-center justify-between px-6 py-4 border-b border-line">
          <div className="inline-flex items-center gap-2 text-forest">
            <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.6} />
            <p className="font-display text-xl">Cart</p>
            <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-mist px-1.5 text-[0.7rem] font-mono text-forest">
              {count}
            </span>
          </div>
          <button
            onClick={closeDrawer}
            aria-label="Close cart"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-forest hover:bg-mist transition-colors"
          >
            <X className="h-5 w-5" strokeWidth={1.6} />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
            <p className="font-display text-2xl text-forest">Your cart is empty.</p>
            <p className="mt-3 text-forest/65 leading-relaxed max-w-xs">
              Add a plant or two and we&apos;ll grow them on for you until
              they&apos;re ready to ship.
            </p>
            <Link
              href="/shop"
              onClick={closeDrawer}
              className="press mt-7 inline-flex items-center gap-2 rounded-full bg-forest text-paper px-5 py-3 text-sm font-medium hover:bg-forest-dark transition-colors"
            >
              Browse plants
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto divide-y divide-line">
              {items.map((it) => (
                <li key={it.id} className="flex gap-4 px-6 py-5">
                  <Link
                    href={`/shop/${it.slug}`}
                    onClick={closeDrawer}
                    className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-mist ring-1 ring-forest/8"
                  >
                    <PlantImage
                      src={it.image}
                      alt={it.name}
                      fill
                      sizes="80px"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/shop/${it.slug}`}
                      onClick={closeDrawer}
                      className="block font-display text-[1.05rem] leading-tight text-forest hover:text-forest-dark"
                    >
                      {it.name}
                    </Link>
                    <p className="mt-1 text-xs text-forest/55">
                      4 inch starter
                    </p>
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <div className="inline-flex items-center rounded-full border border-line bg-paper">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          className="press grid place-items-center h-8 w-8 text-forest hover:bg-mist rounded-l-full transition-colors"
                          onClick={() => setQty(it.id, it.qty - 1)}
                        >
                          <Minus className="h-3.5 w-3.5" strokeWidth={2} />
                        </button>
                        <span className="px-3 text-sm font-medium tabular-nums">
                          {it.qty}
                        </span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          disabled={it.qty >= it.maxQty}
                          className="press grid place-items-center h-8 w-8 text-forest hover:bg-mist rounded-r-full transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                          onClick={() => setQty(it.id, it.qty + 1)}
                        >
                          <Plus className="h-3.5 w-3.5" strokeWidth={2} />
                        </button>
                      </div>
                      <p className="text-sm text-forest font-medium tabular-nums">
                        ${(it.qty * it.unitPrice).toFixed(2)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(it.id)}
                      className="mt-2 text-[0.78rem] text-forest/50 hover:text-forest underline-offset-2 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="border-t border-line px-6 py-5 bg-mist/40 space-y-3">
              <div className="flex items-center justify-between text-forest">
                <span className="text-sm">Subtotal</span>
                <span className="font-display text-xl tabular-nums">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <p className="text-[0.78rem] text-forest/55 leading-snug">
                USPS shipping calculated at checkout · USA only · no inflated handling.
              </p>
              <Link
                href="/cart"
                onClick={closeDrawer}
                className="press w-full inline-flex items-center justify-center gap-2 rounded-full bg-forest text-paper px-5 py-3.5 font-medium tracking-wide hover:bg-forest-dark transition-colors"
              >
                Review cart
              </Link>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
