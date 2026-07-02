import type { Metadata } from "next";
import { CartPage } from "@/components/cart/CartPage";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review your live plant cart from Greenery Networks.",
};

export default function CartRoute() {
  return <CartPage />;
}
