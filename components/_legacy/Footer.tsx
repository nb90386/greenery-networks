"use client";

import Link from "next/link";
import { Flower2, Mail } from "lucide-react";

const columns = [
  {
    title: "Shop",
    links: [
      { href: "/shop", label: "Flowering Plants" },
      { href: "/about", label: "About" },
      { href: "/plant-care", label: "Plant Care" },
    ],
  },
  {
    title: "Help",
    links: [
      { href: "/faq", label: "FAQ" },
      { href: "/contact", label: "Contact" },
      { href: "/shipping", label: "Shipping Policy" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-sage-200/40 bg-white">
      <div className="container-site py-14 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-leaf-400 to-moss text-white shadow-soft-sm">
                <Flower2 className="h-5 w-5" />
              </span>
              <span className="font-serif text-xl tracking-tight">
                <span className="text-charcoal">Greenery</span>{" "}
                <span className="text-moss">Networks</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-charcoal-muted max-w-xs leading-relaxed">
              Live flowering starter plants in 4-inch pots, shipped with care
              across the USA.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <Mail className="h-4 w-4 text-leaf-400" />
              <Link
                href="mailto:greenerynetworks@gmail.com"
                className="text-sm text-charcoal-muted hover:text-moss transition-colors"
              >
                greenerynetworks@gmail.com
              </Link>
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <p className="font-serif text-base text-charcoal">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-charcoal-muted hover:text-moss transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-sage-200/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-charcoal-muted">
            &copy; {new Date().getFullYear()} Greenery Networks. All rights reserved.
          </p>
          <p className="text-sm text-charcoal-muted italic">
            Spreading the joy with colorful flowers.
          </p>
        </div>
      </div>
    </footer>
  );
}
