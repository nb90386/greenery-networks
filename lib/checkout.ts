/**
 * Checkout placeholder.
 *
 * TODO(next prompt): wire this up to Shopify Storefront. The intended flow is:
 *   1. POST cart items to a server action that creates a Shopify cart.
 *   2. Receive the Shopify `checkoutUrl`.
 *   3. window.location.assign(checkoutUrl).
 *
 * Until that happens, `startCheckout` is intentionally disabled. The UI must
 * gray itself out using `isCheckoutEnabled` so we never accidentally accept an
 * "order" we can't fulfil.
 */

import type { CartItem } from "@/components/cart/CartContext";

export const isCheckoutEnabled = false;

export type CheckoutResult =
  | { ok: true; url: string }
  | { ok: false; reason: "disabled" | "empty"; message: string };

export async function startCheckout(items: CartItem[]): Promise<CheckoutResult> {
  if (items.length === 0) {
    return {
      ok: false,
      reason: "empty",
      message: "Your cart is empty.",
    };
  }
  // Shopify integration lands in the next prompt.
  return {
    ok: false,
    reason: "disabled",
    message: "Checkout connects to Shopify in the next phase.",
  };
}
