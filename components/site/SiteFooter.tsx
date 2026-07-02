"use client";

import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";
import { Mail, ArrowRight } from "lucide-react";

const SHOP_NAV = [
  { href: "/shop", label: "All Plants" },
  { href: "/shop?type=geranium", label: "Regal Pelargoniums" },
  { href: "/shop?type=barleria", label: "Barleria Collection" },
  { href: "/shop?type=scented", label: "Scented Citronella" },
] as const;

const CARE_NAV = [
  { href: "/care", label: "Plant Care Guides" },
  { href: "/care#watering", label: "Watering" },
  { href: "/care#climate", label: "Where they grow" },
  { href: "/care#shipping-care", label: "Arrival Care" },
] as const;

const BRAND_NAV = [
  { href: "/about", label: "Our Garden" },
  { href: "/blog", label: "Journal" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden mt-32">
      {/* Botanical layered background */}
      <div className="absolute inset-0 bg-mist" aria-hidden />
      <DecorativeFronds />

      <div className="relative container-site pt-20 pb-10">
        {/* Top band. Wordmark + newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 pb-14 border-b border-forest/10">
          <div className="max-w-xl">
            <Wordmark size="lg" />
            <p className="mt-6 text-[1.05rem] leading-relaxed text-forest/80 max-w-md">
              A curated online garden. We grow live flowering starter plants
              with care and ship them USPS across the USA. So your garden can
              keep blooming, season after season.
            </p>
            <p className="mt-5 eyebrow text-sage-deep">
              Spreading the joy with colorful flowers.
            </p>
          </div>

          <form
            className="flex flex-col gap-3 self-start lg:self-end"
            onSubmit={(e) => e.preventDefault()}
          >
            <label
              htmlFor="newsletter"
              className="eyebrow text-forest/80"
            >
              Garden Letters
            </label>
            <p className="text-sm text-forest/70 leading-relaxed -mt-1">
              Seasonal plant care, new releases, and the occasional
              behind-the-greenhouse note.
            </p>
            <div className="mt-1 flex items-stretch gap-2 rounded-full bg-paper border border-line p-1.5 shadow-soft">
              <span className="grid place-items-center px-3 text-forest/60">
                <Mail className="h-4 w-4" strokeWidth={1.6} />
              </span>
              <input
                id="newsletter"
                type="email"
                placeholder="you@garden.com"
                className="flex-1 bg-transparent text-sm text-forest placeholder:text-forest/40 focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-full bg-forest text-paper px-4 py-2 text-sm font-medium hover:bg-forest-dark transition-colors"
              >
                Join
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
              </button>
            </div>
            <p className="text-xs text-forest/50 mt-1">
              No spam. Unsubscribe any time.
            </p>
          </form>
        </div>

        {/* Nav columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-14">
          <FooterColumn label="Shop" items={SHOP_NAV} />
          <FooterColumn label="Plant Care" items={CARE_NAV} />
          <FooterColumn label="Greenery Networks" items={BRAND_NAV} />
          <div className="flex flex-col gap-3">
            <h4 className="eyebrow text-forest/80">Shipping</h4>
            <p className="text-[0.92rem] text-forest/85 leading-relaxed">
              Self-fulfilled and shipped USPS within the USA. Actual postage is
              added at checkout. No inflated handling.
            </p>
            <ul className="text-sm text-forest/70 space-y-1.5 mt-1">
              <li>· 4 inch starter pots</li>
              <li>· $12 per plant, 5 in stock each</li>
              <li>· Ships from California</li>
            </ul>
          </div>
        </div>

        {/* Fine print */}
        <div className="flex flex-col-reverse md:flex-row md:items-center justify-between gap-4 pt-8 border-t border-forest/10 text-xs text-forest/60">
          <p>© {new Date().getFullYear()} Greenery Networks · All rights reserved.</p>
          <nav aria-label="Legal" className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/privacy" className="hover:text-forest">Privacy</Link>
            <Link href="/terms" className="hover:text-forest">Terms</Link>
            <Link href="/shipping" className="hover:text-forest">Shipping & Returns</Link>
            <Link href="/contact" className="hover:text-forest">Contact</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  label,
  items,
}: {
  label: string;
  items: ReadonlyArray<{ href: string; label: string }>;
}) {
  return (
    <div className="flex flex-col gap-3">
      <h4 className="eyebrow text-forest/80">{label}</h4>
      <ul className="space-y-2.5">
        {items.map((it) => (
          <li key={it.href}>
            <Link
              href={it.href}
              className="text-[0.92rem] text-forest/85 hover:text-forest transition-colors"
            >
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Soft layered SVG fronds. Large, faded, decorative */
function DecorativeFronds() {
  return (
    <svg
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1440 720"
    >
      <defs>
        <radialGradient id="frondGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="oklch(0.95 0.022 134)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="oklch(0.948 0.013 134)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Big soft glow upper left */}
      <ellipse cx="-40" cy="180" rx="420" ry="240" fill="url(#frondGlow)" />

      {/* Botanical sweep. Abstract leaf arcs */}
      <g
        stroke="oklch(0.32 0.046 154)"
        strokeOpacity="0.08"
        fill="none"
        strokeWidth="1.2"
      >
        <path d="M -80 540 C 200 360, 380 360, 560 540" />
        <path d="M -20 600 C 240 440, 420 440, 620 600" />
        <path d="M 60 660 C 280 500, 460 500, 680 660" />
      </g>

      <g
        stroke="oklch(0.32 0.046 154)"
        strokeOpacity="0.07"
        fill="none"
        strokeWidth="1.2"
      >
        <path d="M 880 80 C 1040 220, 1180 240, 1480 140" />
        <path d="M 880 130 C 1040 270, 1180 290, 1480 190" />
        <path d="M 880 180 C 1040 320, 1180 340, 1480 240" />
      </g>

      {/* Soft veil over top to ensure text legibility near edges */}
      <linearGradient id="veil" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="oklch(0.948 0.013 134)" stopOpacity="0.55" />
        <stop offset="100%" stopColor="oklch(0.948 0.013 134)" stopOpacity="0" />
      </linearGradient>
      <rect x="0" y="0" width="1440" height="160" fill="url(#veil)" />
    </svg>
  );
}
