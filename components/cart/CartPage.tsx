"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Minus, Plus, ShoppingBag, ShieldCheck, Truck, Leaf } from "lucide-react";
import { PlantImage } from "@/components/site/PlantImage";
import { useCart } from "./CartContext";
import { isCheckoutEnabled, startCheckout } from "@/lib/checkout";
import { cn } from "@/lib/utils";

export function CartPage() {
  const { items, ready, subtotal, setQty, remove } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onCheckout() {
    setError(null);
    setSubmitting(true);
    const r = await startCheckout(items);
    setSubmitting(false);
    if (!r.ok) setError(r.message);
    else window.location.assign(r.url);
  }

  return (
    <section className="relative pt-32 lg:pt-40 pb-24 lg:pb-32">
      <div className="container-site">
        <header className="max-w-2xl">
          <p className="eyebrow text-sage-deep">Cart</p>
          <h1 className="mt-3 text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.04] text-balance">
            Review your{" "}
            <span className="italic font-light text-sage-deep">cart.</span>
          </h1>
        </header>

        {!ready ? (
          <p className="mt-12 text-forest/60">Loading…</p>
        ) : items.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 items-start">
            <ul className="divide-y divide-line border-y border-line">
              {items.map((it) => (
                <li key={it.id} className="flex gap-5 py-6">
                  <Link
                    href={`/shop/${it.slug}`}
                    className="relative h-32 w-28 shrink-0 overflow-hidden rounded-xl bg-mist ring-1 ring-forest/8"
                  >
                    <PlantImage src={it.image} alt={it.name} fill sizes="120px" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/shop/${it.slug}`}
                      className="block font-display text-[1.2rem] leading-tight text-forest hover:text-forest-dark"
                    >
                      {it.name}
                    </Link>
                    <p className="mt-1 text-sm text-forest/55">
                      4 inch starter
                    </p>
                    <div className="mt-4 flex items-center justify-between gap-4">
                      <div className="inline-flex items-center rounded-full border border-line bg-paper">
                        <button
                          type="button"
                          onClick={() => setQty(it.id, it.qty - 1)}
                          aria-label="Decrease quantity"
                          className="press grid place-items-center h-9 w-9 text-forest hover:bg-mist rounded-l-full transition-colors"
                        >
                          <Minus className="h-3.5 w-3.5" strokeWidth={2} />
                        </button>
                        <span className="px-4 text-sm font-medium tabular-nums">{it.qty}</span>
                        <button
                          type="button"
                          onClick={() => setQty(it.id, it.qty + 1)}
                          disabled={it.qty >= it.maxQty}
                          aria-label="Increase quantity"
                          className="press grid place-items-center h-9 w-9 text-forest hover:bg-mist rounded-r-full transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                        >
                          <Plus className="h-3.5 w-3.5" strokeWidth={2} />
                        </button>
                      </div>
                      <p className="text-forest font-medium tabular-nums">
                        ${(it.qty * it.unitPrice).toFixed(2)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(it.id)}
                      className="mt-3 text-[0.8rem] text-forest/55 underline-offset-2 hover:text-forest hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="rounded-3xl border border-line bg-paper p-7 shadow-soft sticky top-28">
              <p className="eyebrow text-sage-deep">Summary</p>
              <dl className="mt-5 space-y-3 text-forest">
                <div className="flex items-center justify-between">
                  <dt>Subtotal</dt>
                  <dd className="tabular-nums">${subtotal.toFixed(2)}</dd>
                </div>
                <div className="flex items-center justify-between text-forest/65 text-sm">
                  <dt>Shipping</dt>
                  <dd>Calculated at checkout</dd>
                </div>
              </dl>
              <div className="mt-5 pt-5 border-t border-line flex items-center justify-between">
                <p className="text-forest font-medium">Estimated total</p>
                <p className="font-display text-2xl tabular-nums">${subtotal.toFixed(2)}</p>
              </div>

              {!isCheckoutEnabled && (
                <div className="mt-5 rounded-xl bg-blush/55 border border-blush-deep/15 px-4 py-3">
                  <p className="text-[0.86rem] text-forest leading-snug">
                    <span className="font-medium">Checkout coming online soon.</span>{" "}
                    We are finishing the Shopify hook up. Your cart will still
                    be here when it is ready.
                  </p>
                </div>
              )}

              <button
                type="button"
                onClick={onCheckout}
                disabled={!isCheckoutEnabled || submitting}
                className={cn(
                  "press mt-5 w-full inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5",
                  "font-medium tracking-wide transition-[background-color,opacity] duration-300",
                  isCheckoutEnabled
                    ? "bg-forest text-paper hover:bg-forest-dark"
                    : "bg-forest/35 text-paper cursor-not-allowed",
                )}
              >
                {submitting ? "Connecting…" : "Checkout"}
                <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
              </button>

              {error && (
                <p className="mt-3 text-[0.82rem] text-blush-deep">{error}</p>
              )}

              <ul className="mt-7 space-y-2.5 text-[0.82rem] text-forest/70">
                <Reassurance icon={ShieldCheck}>
                  Secure checkout.
                </Reassurance>
                <Reassurance icon={Truck}>
                  Ships from California via USPS. USA only, actual postage.
                </Reassurance>
                <Reassurance icon={Leaf}>
                  Every plant is hand packed with care before it ships.
                </Reassurance>
              </ul>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}

function Reassurance({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-2">
      <Icon className="h-4 w-4 text-sage-deep mt-0.5 shrink-0" strokeWidth={1.6} />
      <span>{children}</span>
    </li>
  );
}

function EmptyState() {
  return (
    <div className="mt-12 rounded-3xl bg-mist/60 border border-line p-12 text-center">
      <div className="mx-auto grid place-items-center h-14 w-14 rounded-full bg-paper text-forest">
        <ShoppingBag className="h-6 w-6" strokeWidth={1.6} />
      </div>
      <p className="mt-5 font-display text-2xl text-forest">Your cart is empty.</p>
      <p className="mt-2 text-forest/65 max-w-md mx-auto">
        Nothing here yet. Add a plant or two and we will grow them on for you
        until they are ready to ship.
      </p>
      <Link
        href="/shop"
        className="press mt-8 inline-flex items-center gap-2 rounded-full bg-forest text-paper px-5 py-3 text-sm font-medium hover:bg-forest-dark transition-colors"
      >
        Browse plants
      </Link>
    </div>
  );
}
