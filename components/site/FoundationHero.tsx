"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowDownRight, Sprout } from "lucide-react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

export function FoundationHero() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 1.05 },
      });
      tl.from(".hero-eyebrow", { y: 14, opacity: 0, duration: 0.7 }, 0.05)
        .from(".hero-line", { y: 26, opacity: 0, stagger: 0.08 }, 0.18)
        .from(".hero-sub",   { y: 14, opacity: 0, duration: 0.8 }, 0.55)
        .from(".hero-cta",   { y: 14, opacity: 0, duration: 0.7, stagger: 0.07 }, 0.7)
        .from(".hero-meta",  { y: 10, opacity: 0, duration: 0.7 }, 0.85)
        .from(".hero-photo", { y: 40, opacity: 0, scale: 0.96, duration: 1.2, stagger: 0.1, ease: "expo.out" }, 0.35);

      // Gentle floating motion on hero photos
      gsap.to(".hero-photo", {
        y: "+=10",
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: { each: 0.8, from: "random" },
      });
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      className={cn(
        "relative isolate overflow-hidden",
        "pt-[8.5rem] lg:pt-44 pb-28",
        "bg-botanical-veil grain",
      )}
    >
      {/* Faint botanical sketch behind everything */}
      <BotanicalBackdrop />

      <div className="relative container-site grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] items-center gap-14 lg:gap-20">
        {/* Copy */}
        <div className="relative z-10 max-w-2xl">
          <p className="hero-eyebrow inline-flex items-center gap-2 eyebrow text-sage-deep">
            <Sprout className="h-3.5 w-3.5" strokeWidth={1.7} />
            A curated online garden
          </p>

          <h1 className="mt-5 text-5xl sm:text-6xl lg:text-[5.25rem] leading-[1.02] text-balance">
            <span className="hero-line block font-light">Flowering plants,</span>
            <span className="hero-line block font-normal">grown for the way</span>
            <span className="hero-line block italic font-light text-sage-deep">
              your garden lives.
            </span>
          </h1>

          <p className="hero-sub mt-7 max-w-lg text-[1.08rem] leading-relaxed text-forest/75">
            117 live flowering starter plants in 4-inch pots, hand-grown and
            shipped USPS across the USA. Regal pelargoniums, scented
            geraniums, Philippine violets. Color you can plant the day it
            arrives.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/shop"
              className={cn(
                "hero-cta group inline-flex items-center gap-2",
                "rounded-full bg-forest text-paper",
                "px-6 py-3.5 text-[0.95rem] font-medium tracking-wide",
                "shadow-soft transition-all duration-500",
                "hover:bg-forest-dark hover:shadow-soft-lg hover:-translate-y-[1px]",
              )}
            >
              Browse Flowering Plants
              <ArrowDownRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </Link>
            <Link
              href="/care"
              className={cn(
                "hero-cta inline-flex items-center gap-2",
                "rounded-full bg-paper/70 text-forest border border-forest/15",
                "px-6 py-3.5 text-[0.95rem] font-medium tracking-wide",
                "backdrop-blur-md transition-all duration-500",
                "hover:bg-paper hover:border-forest/30",
              )}
            >
              Learn Plant Care
            </Link>
          </div>

          <ul className="hero-meta mt-9 flex flex-wrap gap-x-7 gap-y-2 text-[0.8rem] text-forest/70">
            <li className="flex items-center gap-2">
              <Dot /> Live starter plants
            </li>
            <li className="flex items-center gap-2">
              <Dot /> 4-inch pots · $12 each
            </li>
            <li className="flex items-center gap-2">
              <Dot /> USPS shipping nationwide
            </li>
          </ul>
        </div>

        {/* Layered plant collage */}
        <PlantCollage />
      </div>
    </section>
  );
}

function Dot() {
  return (
    <span
      aria-hidden
      className="inline-block h-1.5 w-1.5 rounded-full bg-sage"
    />
  );
}

function PlantCollage() {
  // The owner's photos have the "NNN - Name" caption baked into the bottom of the JPG.
  // We crop it out by scaling the image taller than the container and anchoring to top.
  const shots = [
    {
      src: "/images/plants/021.jpg",
      alt: "Soft Red flowering geranium",
      cap: "Soft Red",
      num: "021",
      cls: "hero-photo absolute top-0 right-0 w-[60%] aspect-[4/5] rounded-3xl overflow-hidden shadow-card ring-1 ring-paper/40",
      tag: "absolute top-4 left-4",
    },
    {
      src: "/images/plants/074.jpg",
      alt: "Pretty Lavender flowering plant",
      cap: "Pretty Lavender",
      num: "074",
      cls: "hero-photo absolute bottom-10 left-0 w-[52%] aspect-[4/5] rounded-3xl overflow-hidden shadow-card ring-1 ring-paper/40",
      tag: "absolute bottom-4 left-4",
    },
    {
      src: "/images/plants/110.jpg",
      alt: "Glowing Fuchsia flowering plant",
      cap: "Glowing Fuchsia",
      num: "110",
      cls: "hero-photo absolute bottom-2 right-12 w-[38%] aspect-square rounded-2xl overflow-hidden shadow-card ring-1 ring-paper/40",
      tag: "absolute top-3 right-3",
    },
  ];

  return (
    <div className="relative h-[520px] lg:h-[640px]">
      {shots.map((s, i) => (
        <figure key={s.src} className={s.cls} style={{ zIndex: 10 - i }}>
          {/* The crop frame: image scaled to 122% and anchored to top so the baked
              caption strip falls below the visible window */}
          <div className="absolute inset-0 scale-[1.22] origin-top">
            <Image
              src={s.src}
              alt={s.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 80vw"
              className="object-cover object-top"
              priority={i === 0}
            />
          </div>

          {/* Soft top vignette for legibility of the floating tag */}
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-forest-dark/35 to-transparent pointer-events-none" />

          <figcaption className={s.tag}>
            <span className="inline-flex items-center gap-2 rounded-full bg-paper/15 backdrop-blur-md border border-paper/30 px-2.5 py-1 text-paper">
              <span className="font-mono text-[0.66rem] tracking-[0.16em] opacity-90">
                Nº {s.num}
              </span>
              <span className="h-3 w-px bg-paper/40" />
              <span className="font-display italic text-[0.78rem] leading-none">
                {s.cap}
              </span>
            </span>
          </figcaption>
        </figure>
      ))}

      {/* Floating accent card */}
      <div
        className="hero-photo absolute -bottom-4 right-[28%] glass-card rounded-2xl px-4 py-3 text-forest"
        style={{ zIndex: 20 }}
      >
        <span className="eyebrow text-sage-deep">Plants in stock</span>
        <p className="mt-1 font-display text-2xl leading-none">117 varieties</p>
      </div>
    </div>
  );
}

function BotanicalBackdrop() {
  return (
    <svg
      aria-hidden
      className="absolute inset-0 -z-10 w-full h-full opacity-[0.07]"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
    >
      <g stroke="oklch(0.32 0.046 154)" strokeWidth="1.2" fill="none">
        <path d="M -100 700 C 200 460, 520 520, 760 400 C 980 290, 1240 320, 1700 200" />
        <path d="M -100 760 C 240 540, 580 600, 820 480 C 1040 380, 1280 400, 1700 280" />
        <path d="M -100 820 C 260 620, 620 680, 880 560 C 1100 460, 1320 480, 1700 360" />
      </g>
      <g fill="oklch(0.745 0.033 134)">
        <circle cx="220" cy="320" r="2.4" />
        <circle cx="540" cy="180" r="1.8" />
        <circle cx="980" cy="120" r="2.1" />
        <circle cx="1380" cy="240" r="2.6" />
        <circle cx="1180" cy="600" r="1.8" />
      </g>
    </svg>
  );
}
