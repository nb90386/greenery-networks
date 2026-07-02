"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDownRight, Sprout } from "lucide-react";
import { HeroParticles } from "./HeroParticles";
import { cn } from "@/lib/utils";

const HeroSeedling3D = dynamic(() => import("./HeroSeedling3D"), {
  ssr: false,
  loading: () => null,
});

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Cinematic full-bleed hero.
 *  · Three parallax planes (bg garden / mid plants / fg leaves) driven by ScrollTrigger.
 *  · Floating leaf + pollen particle canvas, paused offscreen.
 *  · Lightweight R3F seedling-in-a-pot with idle rotation.
 *
 * Honors prefers-reduced-motion via GSAP's matchMedia + CSS guard in globals.
 */
export function HomeHero() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Entrance
        const tl = gsap.timeline({
          defaults: { ease: "power3.out", duration: 1.05 },
        });
        tl.from(".h-eye", { y: 16, opacity: 0, duration: 0.7 })
          .from(".h-line", { y: 36, opacity: 0, stagger: 0.08 }, 0.18)
          .from(".h-sub",  { y: 18, opacity: 0, duration: 0.85 }, 0.6)
          .from(".h-cta",  { y: 14, opacity: 0, duration: 0.75, stagger: 0.07 }, 0.78)
          .from(".h-meta", { y: 10, opacity: 0, duration: 0.7 }, 0.95)
          .from(".h-photo", { y: 60, opacity: 0, scale: 0.96, duration: 1.25, stagger: 0.1, ease: "expo.out" }, 0.32)
          .from(".h-3d",   { opacity: 0, scale: 0.85, duration: 1.2, ease: "expo.out" }, 0.6);

        // Layered parallax. Each plane moves at its own depth speed
        gsap.to(".px-bg", {
          yPercent: 22,
          ease: "none",
          scrollTrigger: {
            trigger: scope.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });
        gsap.to(".px-mid", {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: scope.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });
        gsap.to(".px-fg", {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: scope.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });

        // Slow drift on the floating accent card
        gsap.to(".h-3d-wrap", {
          y: -10,
          duration: 5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      className={cn(
        "relative isolate overflow-hidden grain",
        "pt-32 md:pt-40 pb-24 lg:pb-32",
        "min-h-[92vh] flex items-center",
      )}
    >
      {/* === BG PLANE. Soft sky-to-earth wash, sage-led === */}
      <div className="px-bg absolute inset-0 -z-30">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 55% at 80% 0%, oklch(0.97 0.022 96 / 0.9) 0%, transparent 60%), " +
              "radial-gradient(55% 55% at 10% 110%, oklch(0.94 0.025 138 / 0.95) 0%, transparent 60%), " +
              "radial-gradient(60% 40% at 100% 100%, oklch(0.92 0.022 138 / 0.55) 0%, transparent 60%), " +
              "linear-gradient(180deg, oklch(0.99 0.005 90) 0%, oklch(0.972 0.012 134) 60%, oklch(0.94 0.022 138) 100%)",
          }}
        />
        {/* Bottom edge wash. Earth grounding */}
        <div className="absolute inset-x-0 bottom-0 h-[35%] bg-gradient-to-t from-mist/70 to-transparent" />
      </div>

      {/* === MID PLANE. Botanical sketch === */}
      <div className="px-mid absolute inset-0 -z-20 opacity-[0.10]">
        <svg
          aria-hidden
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1600 900"
          preserveAspectRatio="xMidYMid slice"
        >
          <g
            stroke="oklch(0.32 0.046 154)"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
          >
            <path d="M -120 760 C 240 540, 600 600, 880 460 C 1100 360, 1340 380, 1740 240" />
            <path d="M -120 820 C 280 600, 640 660, 920 520 C 1140 420, 1380 440, 1740 300" />
            <path d="M -120 880 C 320 660, 680 720, 960 580 C 1180 480, 1420 500, 1740 360" />
          </g>
        </svg>
      </div>

      {/* === FG PLANE. Large decorative leaves anchored at the edges === */}
      <FgLeaves />

      {/* === Particle canvas (above bg planes, below content) === */}
      <HeroParticles className="absolute inset-0 -z-10 w-full h-full pointer-events-none" />

      {/* === Content === */}
      <div className="relative container-site grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] items-center gap-14 lg:gap-16">
        <div className="relative max-w-2xl">
          <p className="h-eye inline-flex items-center gap-2 eyebrow text-sage-deep">
            <Sprout className="h-3.5 w-3.5" strokeWidth={1.7} />
            A family run online garden
          </p>

          <h1 className="mt-5 text-5xl sm:text-6xl lg:text-[5.4rem] leading-[1.02] text-balance">
            <span className="h-line block font-light">A garden,</span>
            <span className="h-line block font-normal">delivered in</span>
            <span className="h-line block italic font-light text-sage-deep">
              four inch pots.
            </span>
          </h1>

          <p className="h-sub mt-7 max-w-lg text-[1.08rem] leading-relaxed text-forest/75">
            117 live flowering plants. Regal pelargoniums, Philippine violets,
            and scented geraniums, hand grown by us and shipped USPS across
            the USA. Color you can plant the day it lands on your doorstep.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/shop"
              className={cn(
                "h-cta press group inline-flex items-center gap-2",
                "rounded-full bg-forest text-paper",
                "px-6 py-3.5 text-[0.95rem] font-medium tracking-wide",
                "shadow-soft transition-[background-color,box-shadow,transform] duration-500 ease-[var(--ease-out-strong)]",
                "hover:bg-forest-dark hover:shadow-soft-lg hover:-translate-y-[1px]",
              )}
            >
              Shop the collection
              <ArrowDownRight
                className="h-4 w-4 transition-transform duration-500 ease-[var(--ease-out-strong)] group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                strokeWidth={1.8}
              />
            </Link>
            <Link
              href="/care"
              className={cn(
                "h-cta press inline-flex items-center gap-2",
                "rounded-full bg-paper/65 text-forest border border-forest/15",
                "px-6 py-3.5 text-[0.95rem] font-medium tracking-wide",
                "backdrop-blur-md transition-[background-color,border-color] duration-500 ease-[var(--ease-out-strong)]",
                "hover:bg-paper hover:border-forest/30",
              )}
            >
              How it grows
            </Link>
          </div>

          <ul className="h-meta mt-10 flex flex-wrap gap-x-7 gap-y-2 text-[0.8rem] text-forest/70">
            <li className="flex items-center gap-2"><Dot /> Live starter plants</li>
            <li className="flex items-center gap-2"><Dot /> 4 inch pots, $12 each</li>
            <li className="flex items-center gap-2"><Dot /> Ships from California</li>
            <li className="flex items-center gap-2"><Dot /> Hand packed with care</li>
          </ul>
        </div>

        {/* Right column. Layered photo collage + 3D seedling badge */}
        <div className="relative h-[540px] lg:h-[620px]">
          {/* The collage */}
          <figure
            className="h-photo absolute top-0 right-0 w-[58%] aspect-[4/5] rounded-3xl overflow-hidden shadow-card ring-1 ring-paper/40"
            style={{ zIndex: 14 }}
          >
            <div className="absolute inset-0 scale-[1.22] origin-top">
              <Image
                src="/images/plants/021.jpg"
                alt="Soft Red regal pelargonium"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 80vw"
                className="object-cover object-top"
              />
            </div>
            <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-forest-dark/35 to-transparent pointer-events-none" />
            <figcaption className="absolute top-4 left-4">
              <BrandTag num="021" name="Soft Red" />
            </figcaption>
          </figure>

          <figure
            className="h-photo absolute bottom-10 left-0 w-[52%] aspect-[4/5] rounded-3xl overflow-hidden shadow-card ring-1 ring-paper/40"
            style={{ zIndex: 12 }}
          >
            <div className="absolute inset-0 scale-[1.22] origin-top">
              <Image
                src="/images/plants/074.jpg"
                alt="Pretty Lavender flowering plant"
                fill
                sizes="(min-width: 1024px) 35vw, 75vw"
                className="object-cover object-top"
              />
            </div>
            <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-forest-dark/35 to-transparent pointer-events-none" />
            <figcaption className="absolute top-4 left-4">
              <BrandTag num="074" name="Pretty Lavender" />
            </figcaption>
          </figure>

          <figure
            className="h-photo absolute bottom-0 right-10 w-[38%] aspect-square rounded-2xl overflow-hidden shadow-card ring-1 ring-paper/40"
            style={{ zIndex: 11 }}
          >
            <div className="absolute inset-0 scale-[1.22] origin-top">
              <Image
                src="/images/plants/110.jpg"
                alt="Glowing Fuchsia"
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover object-top"
              />
            </div>
            <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-forest-dark/35 to-transparent pointer-events-none" />
            <figcaption className="absolute top-3 right-3">
              <BrandTag num="110" name="Glowing Fuchsia" />
            </figcaption>
          </figure>

          {/* Floating 3D seedling card */}
          <div
            className="h-3d h-3d-wrap absolute -bottom-4 right-[26%] glass-card rounded-2xl p-2 pl-3 pr-4 text-forest flex items-center gap-3"
            style={{ zIndex: 20 }}
          >
            <div className="relative h-[88px] w-[88px] -m-1">
              <HeroSeedling3D />
            </div>
            <div>
              <span className="eyebrow text-sage-deep">Hand grown</span>
              <p className="mt-1 font-display text-xl leading-none">117 varieties</p>
              <p className="mt-1 text-[0.72rem] text-forest/60">$12 each, 5 in stock</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade into the next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-paper" />
    </section>
  );
}

function Dot() {
  return <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-sage" />;
}

function BrandTag({ num, name }: { num: string; name: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-paper/15 backdrop-blur-md border border-paper/30 px-2.5 py-1 text-paper">
      <span className="font-mono text-[0.66rem] tracking-[0.16em] opacity-90">Nº {num}</span>
      <span className="h-3 w-px bg-paper/40" />
      <span className="font-display italic text-[0.78rem] leading-none">{name}</span>
    </span>
  );
}

function FgLeaves() {
  return (
    <div className="px-fg absolute inset-0 -z-10 pointer-events-none">
      {/* Left frond. Anchored to bottom-left, slightly off-canvas */}
      <svg
        aria-hidden
        viewBox="0 0 480 720"
        className="absolute -left-24 top-1/2 -translate-y-1/2 h-[88%] opacity-[0.18]"
      >
        <defs>
          <linearGradient id="leafL" x1="0" x2="1">
            <stop offset="0" stopColor="oklch(0.62 0.05 144)" />
            <stop offset="1" stopColor="oklch(0.4 0.06 154)" />
          </linearGradient>
        </defs>
        <g fill="url(#leafL)">
          {/* A single sweeping frond made of layered teardrops */}
          {Array.from({ length: 9 }).map((_, i) => {
            const a = -0.7 + i * 0.15;
            const cx = 220 + Math.sin(a) * 90;
            const cy = 80 + i * 70;
            const rx = 130 - i * 6;
            const ry = 28 - i * 0.6;
            return (
              <ellipse
                key={i}
                cx={cx}
                cy={cy}
                rx={rx}
                ry={ry}
                transform={`rotate(${a * 60} ${cx} ${cy})`}
                opacity={0.7 - i * 0.05}
              />
            );
          })}
          {/* Stem */}
          <path
            d="M 240 720 C 230 540, 220 360, 230 80"
            stroke="oklch(0.32 0.06 154)"
            strokeWidth="3"
            fill="none"
          />
        </g>
      </svg>

      {/* Right frond. Mirrored, upper right */}
      <svg
        aria-hidden
        viewBox="0 0 480 720"
        className="absolute -right-24 -top-10 h-[70%] opacity-[0.16] scale-x-[-1]"
      >
        <g fill="oklch(0.55 0.06 144)">
          {Array.from({ length: 7 }).map((_, i) => {
            const a = -0.45 + i * 0.16;
            const cx = 220 + Math.sin(a) * 70;
            const cy = 60 + i * 80;
            const rx = 120 - i * 8;
            const ry = 26 - i * 0.6;
            return (
              <ellipse
                key={i}
                cx={cx}
                cy={cy}
                rx={rx}
                ry={ry}
                transform={`rotate(${a * 55} ${cx} ${cy})`}
                opacity={0.65 - i * 0.06}
              />
            );
          })}
          <path
            d="M 230 720 C 220 540, 220 320, 240 60"
            stroke="oklch(0.32 0.06 154)"
            strokeWidth="3"
            fill="none"
          />
        </g>
      </svg>
    </div>
  );
}
