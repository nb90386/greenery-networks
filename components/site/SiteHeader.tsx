"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart, Menu, ShoppingBag, X } from "lucide-react";
import { Wordmark } from "@/components/brand/Wordmark";
import { useCart } from "@/components/cart/CartContext";
import { useFavorites } from "@/components/shop/FavoritesContext";
import { useEscape } from "@/lib/use-escape";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const NAV = [
  { href: "/shop", label: "Shop" },
  { href: "/care", label: "Plant Care" },
  { href: "/about", label: "Our Garden" },
  { href: "/blog", label: "Journal" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const headerRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count, openDrawer } = useCart();
  const { count: favCount } = useFavorites();

  useGSAP(
    () => {
      if (!headerRef.current) return;

      // Entrance reveal
      gsap.from(headerRef.current, {
        y: -24,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.15,
      });

      // Transparent over hero, solid after a short scroll
      ScrollTrigger.create({
        start: 64,
        end: 99999,
        toggleClass: { className: "is-scrolled", targets: headerRef.current },
      });
    },
    { scope: headerRef },
  );

  return (
    <>
      <header
        ref={headerRef}
        style={{ top: "var(--gn-ann-h, 0px)" }}
        className={cn(
          "site-header group/header",
          "fixed inset-x-0 z-50",
          "transition-[background-color,backdrop-filter,border-color,padding] duration-500",
          "border-b border-transparent",
          // initial (over hero): airy and transparent
          "bg-transparent py-4",
          // when scrolled: solid glass, sharper rhythm
          "[&.is-scrolled]:bg-[oklch(1_0_0/0.86)] [&.is-scrolled]:backdrop-blur-xl [&.is-scrolled]:backdrop-saturate-150",
          "[&.is-scrolled]:border-line/80 [&.is-scrolled]:py-2.5",
          "[&.is-scrolled]:shadow-[0_1px_0_0_oklch(0.92_0.012_134),0_8px_24px_-18px_oklch(0.32_0.046_154/0.25)]",
        )}
      >
        <div className="container-site flex items-center justify-between gap-6">
          <Wordmark size="sm" />

          <nav
            aria-label="Primary"
            className="hidden lg:flex items-center gap-9"
          >
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative text-[0.92rem] tracking-[0.01em] text-forest/85 hover:text-forest",
                  "transition-colors duration-300",
                  "after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-forest",
                  "after:transition-[width] after:duration-500 after:ease-[var(--ease-botanical)]",
                  "hover:after:w-full",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <Link
              href="/shop"
              className={cn(
                "hidden md:inline-flex items-center gap-2 rounded-full",
                "px-5 py-2.5 text-[0.86rem] font-medium tracking-wide",
                "bg-forest text-paper",
                "shadow-soft transition-all duration-500",
                "hover:bg-forest-dark hover:shadow-soft-lg hover:-translate-y-[1px]",
              )}
            >
              Browse Plants
            </Link>

            <Link
              href="/favorites"
              aria-label={`Saved plants, ${favCount} ${favCount === 1 ? "item" : "items"}`}
              className={cn(
                "press relative hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-full",
                "text-forest border border-line/0 hover:border-line/80 hover:bg-mist/60",
                "transition-all duration-300",
              )}
            >
              <Heart className="h-[18px] w-[18px]" strokeWidth={1.6} />
              {favCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 grid place-items-center h-4 min-w-4 px-1 rounded-full bg-blush-deep text-[10px] font-medium text-paper tabular-nums">
                  {favCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={openDrawer}
              aria-label={`Cart, ${count} ${count === 1 ? "item" : "items"}`}
              className={cn(
                "press relative inline-flex h-10 w-10 items-center justify-center rounded-full",
                "text-forest border border-line/0 hover:border-line/80 hover:bg-mist/60",
                "transition-all duration-300",
              )}
            >
              <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.6} />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 grid place-items-center h-4 min-w-4 px-1 rounded-full bg-blush-deep text-[10px] font-medium text-paper tabular-nums">
                  {count}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className={cn(
                "lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full",
                "text-forest border border-line/0 hover:border-line/80 hover:bg-mist/60",
                "transition-all duration-300",
              )}
              aria-label="Open navigation"
            >
              <Menu className="h-5 w-5" strokeWidth={1.6} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

function MobileDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEscape(open, onClose);
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
      className={cn(
        "fixed inset-0 z-[60] lg:hidden",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
    >
      <button
        type="button"
        aria-label="Close navigation"
        tabIndex={open ? 0 : -1}
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-forest-dark/40 backdrop-blur-sm transition-opacity duration-500 cursor-default",
          open ? "opacity-100" : "opacity-0",
        )}
      />
      <aside
        className={cn(
          "absolute right-0 top-0 h-dvh w-[88%] max-w-sm bg-paper",
          "border-l border-line shadow-soft-lg",
          "transition-transform duration-500 ease-[var(--ease-botanical)]",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-line">
          <Wordmark size="sm" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-forest hover:bg-mist transition-colors"
          >
            <X className="h-5 w-5" strokeWidth={1.6} />
          </button>
        </div>
        <nav className="flex flex-col px-6 py-6" aria-label="Mobile">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="py-4 text-2xl font-display text-forest hover:text-forest-dark border-b border-line/60 last:border-0"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/shop"
            onClick={onClose}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-forest text-paper px-5 py-3.5 font-medium tracking-wide shadow-soft"
          >
            Browse Plants
          </Link>
        </nav>
      </aside>
    </div>
  );
}
