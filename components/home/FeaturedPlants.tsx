"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Plus } from "lucide-react";
import { FEATURED_IDS, getProductsByIds } from "@/data/products";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function FeaturedPlants() {
  const scope = useRef<HTMLElement>(null);
  const featured = getProductsByIds(FEATURED_IDS);

  useGSAP(
    () => {
      gsap.from(".pcard", {
        y: 28,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.06,
        scrollTrigger: { trigger: scope.current, start: "top 78%" },
      });
      gsap.from(".f-eye, .f-head, .f-link", {
        y: 18,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: scope.current, start: "top 82%" },
      });
    },
    { scope },
  );

  return (
    <section ref={scope} className="relative py-24 lg:py-32 bg-mist/40">
      <div className="container-site">
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 lg:mb-14">
          <div className="max-w-2xl">
            <p className="f-eye eyebrow text-sage-deep">In bloom now</p>
            <h2 className="f-head mt-3 text-4xl sm:text-5xl lg:text-[3.5rem] text-balance leading-[1.05]">
              Twelve plants{" "}
              <span className="italic font-light text-sage-deep">
                worth a second look.
              </span>
            </h2>
          </div>
          <Link
            href="/shop"
            className={cn(
              "f-link press inline-flex items-center gap-2 self-start lg:self-end",
              "rounded-full bg-paper text-forest border border-forest/15",
              "px-5 py-3 text-[0.9rem] font-medium",
              "transition-[background-color,border-color] duration-500 ease-[var(--ease-out-strong)]",
              "hover:bg-forest hover:text-paper hover:border-forest",
            )}
          >
            See all 117 plants
            <ArrowRight className="h-4 w-4" strokeWidth={1.7} />
          </Link>
        </header>

        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 lg:gap-x-5 lg:gap-y-12">
          {featured.map((p) => (
            <li key={p.id} className="pcard group">
              <Link
                href={`/shop/${p.slug}`}
                className="block focus:outline-none"
                aria-label={`${p.name} . $${p.price}`}
              >
                {/* Image */}
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden ring-1 ring-forest/8 bg-paper shadow-soft">
                  <div
                    className="absolute inset-0 scale-[1.22] origin-top transition-transform duration-[1000ms] ease-[var(--ease-out-strong)] group-hover:scale-[1.32]"
                  >
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(min-width: 1024px) 22vw, 48vw"
                      className="object-cover object-top"
                    />
                  </div>

                  {/* Top corner badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="inline-flex items-center rounded-full bg-paper/85 backdrop-blur-md text-forest text-[0.66rem] font-medium px-2 py-1 tracking-wide">
                      4-in starter
                    </span>
                  </div>

                  {/* Add button. Appears on hover */}
                  <button
                    type="button"
                    aria-label={`Add ${p.name} to cart`}
                    className={cn(
                      "absolute bottom-3 right-3 grid place-items-center h-10 w-10 rounded-full",
                      "bg-forest text-paper shadow-soft",
                      "opacity-0 translate-y-1.5 group-hover:opacity-100 group-hover:translate-y-0",
                      "transition-[opacity,transform,background-color] duration-500 ease-[var(--ease-out-strong)]",
                      "hover:bg-forest-dark press",
                    )}
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <Plus className="h-4 w-4" strokeWidth={2} />
                  </button>
                </div>

                {/* Caption */}
                <div className="mt-4 flex items-baseline justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-mono text-[0.66rem] tracking-[0.18em] uppercase text-forest/55">
                      Nº {p.id}
                    </p>
                    <p className="mt-1 font-display text-[1.15rem] leading-tight text-forest truncate">
                      {p.name}
                    </p>
                  </div>
                  <span className="shrink-0 text-forest font-medium text-[0.95rem]">
                    ${p.price}
                  </span>
                </div>
                <p className="mt-1 text-[0.78rem] text-forest/55">
                  Only {p.stock} available
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
