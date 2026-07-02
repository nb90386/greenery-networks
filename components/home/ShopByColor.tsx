"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { COLLECTIONS } from "@/data/products";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function ShopByColor() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".tile", {
        y: 32,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.05,
        scrollTrigger: { trigger: scope.current, start: "top 75%" },
      });
      gsap.from(".s-eye, .s-head, .s-sub", {
        y: 18,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: scope.current, start: "top 80%" },
      });
    },
    { scope },
  );

  return (
    <section ref={scope} className="relative py-24 lg:py-32">
      <div className="container-site">
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 lg:mb-14">
          <div className="max-w-2xl">
            <p className="s-eye eyebrow text-sage-deep">Shop by color</p>
            <h2 className="s-head mt-3 text-4xl sm:text-5xl lg:text-[3.5rem] text-balance leading-[1.05]">
              Pick a palette,{" "}
              <span className="italic font-light text-sage-deep">
                plant the season.
              </span>
            </h2>
          </div>
          <p className="s-sub max-w-md text-[0.98rem] leading-relaxed text-forest/70">
            Eight curated color stories. From velvet burgundy to soft lavender
           . Drawn from our 117-plant flowering collection.
          </p>
        </header>

        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {COLLECTIONS.map((c) => (
            <li key={c.key} className="tile">
              <Link
                href={`/shop?color=${c.key}`}
                className={cn(
                  "group relative block aspect-[4/5] rounded-2xl overflow-hidden",
                  "leaf-shimmer lift shadow-soft",
                  "ring-1 ring-forest/8",
                )}
              >
                {/* Photo */}
                <div
                  className={cn(
                    "absolute inset-0 transition-transform duration-[1100ms] ease-[var(--ease-out-strong)]",
                    "scale-[1.18] origin-top",
                    "group-hover:scale-[1.3]",
                  )}
                >
                  <Image
                    src={`/images/plants/${c.cover}.jpg`}
                    alt={c.title}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover object-top"
                  />
                </div>

                {/* Color-keyed gradient veil */}
                <div
                  aria-hidden
                  className="absolute inset-0 mix-blend-multiply opacity-25 group-hover:opacity-10 transition-opacity duration-700"
                  style={{
                    background: `linear-gradient(180deg, transparent 35%, ${c.swatch} 100%)`,
                  }}
                />
                {/* Top gradient for tag */}
                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-forest-dark/45 to-transparent pointer-events-none" />

                {/* Tag. Color dot + key */}
                <div className="absolute top-3.5 left-3.5 flex items-center gap-2 text-paper">
                  <span
                    aria-hidden
                    className="inline-block h-2.5 w-2.5 rounded-full ring-2 ring-paper/40"
                    style={{ backgroundColor: c.swatch }}
                  />
                  <span className="font-mono text-[0.68rem] tracking-[0.18em] uppercase opacity-90">
                    {c.key}
                  </span>
                </div>

                {/* Foot */}
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <div className="flex items-end justify-between gap-2">
                    <div>
                      <p className="font-display text-paper text-[1.4rem] leading-[1.05]">
                        {c.title}
                      </p>
                      <p className="mt-1 text-paper/80 text-[0.78rem] leading-snug max-w-[14ch]">
                        {c.blurb}
                      </p>
                    </div>
                    <span
                      aria-hidden
                      className="grid place-items-center h-8 w-8 rounded-full bg-paper/15 backdrop-blur-md border border-paper/30 text-paper opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-[var(--ease-out-strong)]"
                    >
                      <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
