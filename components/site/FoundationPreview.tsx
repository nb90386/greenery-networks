"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { SproutMark } from "@/components/brand/SproutMark";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Foundation Preview. The design system at a glance.
 * Not a final marketing section; lives here while the rest of the site is built
 * so the brand foundation is visible, testable, and approved end-to-end.
 */
export function FoundationPreview() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".reveal", {
        y: 32,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: scope.current,
          start: "top 75%",
        },
      });
    },
    { scope },
  );

  return (
    <section ref={scope} className="relative py-28 lg:py-36">
      <div className="container-site">
        <header className="max-w-3xl">
          <p className="reveal eyebrow">Brand foundation · phase 1</p>
          <h2 className="reveal mt-4 text-4xl sm:text-5xl lg:text-6xl text-balance">
            A quiet system that lets the{" "}
            <span className="italic font-light text-sage-deep">
              plants do the talking.
            </span>
          </h2>
          <p className="reveal mt-6 text-[1.05rem] leading-relaxed text-forest/75">
            Editorial type. Botanical color. Soft motion. Built on Tailwind v4
            tokens in oklch so every shade stays true across screens. And
            stays out of the way of the photography.
          </p>
        </header>

        {/* Token swatches */}
        <div className="reveal mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {SWATCHES.map((s) => (
            <Swatch key={s.name} {...s} />
          ))}
        </div>

        {/* System breakdown */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <SystemCard
            title="Editorial type"
            kicker="Fraunces · Inter"
          >
            <p className="font-display text-3xl text-forest leading-tight">
              Spreading the joy
              <br />
              <span className="italic font-light">with colorful flowers.</span>
            </p>
            <p className="mt-4 text-sm text-forest/70 leading-relaxed">
              Variable serif for headlines, opsz for editorial gravity. Inter
              for body and commerce UI.
            </p>
          </SystemCard>

          <SystemCard
            title="Mark + wordmark"
            kicker="Placeholder brand system"
          >
            <div className="flex flex-col items-start gap-5 text-forest">
              <SproutMark size={56} />
              <div className="font-display text-2xl leading-none">
                Greenery{" "}
                <span className="italic font-light">Networks</span>
              </div>
            </div>
            <p className="mt-5 text-sm text-forest/70 leading-relaxed">
              A minimal two-leaf sprout. Soft asymmetry to feel hand-grown,
              not corporate.
            </p>
          </SystemCard>

          <SystemCard
            title="Motion & scroll"
            kicker="Lenis · GSAP"
          >
            <div className="relative h-32 rounded-xl overflow-hidden bg-forest/[0.04] border border-forest/10">
              <MotionLines />
            </div>
            <p className="mt-5 text-sm text-forest/70 leading-relaxed">
              Lenis drives the page; GSAP ScrollTrigger handles reveals,
              parallax, and the nav transition.
            </p>
          </SystemCard>
        </div>

        {/* Section spacer to demo the scrolled nav state */}
        <div className="mt-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="reveal eyebrow">Next up</p>
            <h3 className="reveal mt-3 text-3xl sm:text-4xl">
              Hero, shop grid, plant profile, and the journal .
              <span className="italic font-light text-sage-deep"> coming in phase 2.</span>
            </h3>
            <p className="reveal mt-5 text-forest/75 leading-relaxed max-w-md">
              This phase locks the visual language. Scroll up and down to see
              the navigation lift from transparent to glass. That&apos;s the
              foundation working.
            </p>
          </div>
          <ScrollGauge />
        </div>
      </div>
    </section>
  );
}

const SWATCHES = [
  { name: "Paper",  hex: "#FFFFFF", bg: "bg-paper",  ring: "border" },
  { name: "Mist",   hex: "#E8F0E3", bg: "bg-mist",   ring: "border" },
  { name: "Sage",   hex: "#A8BBA0", bg: "bg-sage" },
  { name: "Forest", hex: "#1E3A2B", bg: "bg-forest", textLight: true },
  { name: "Blush",  hex: "#F3D7DA", bg: "bg-blush" },
  { name: "Sky",    hex: "#CFE0E8", bg: "bg-sky"   },
] as const;

function Swatch({
  name,
  hex,
  bg,
  ring,
  textLight,
}: {
  name: string;
  hex: string;
  bg: string;
  ring?: string;
  textLight?: boolean;
}) {
  return (
    <div
      className={cn(
        "reveal rounded-2xl p-5 aspect-[5/4]",
        bg,
        ring && "border-forest/10",
        "flex flex-col justify-between",
      )}
    >
      <span
        className={cn(
          "eyebrow",
          textLight ? "text-paper/80" : "text-forest/70",
        )}
      >
        {name}
      </span>
      <span
        className={cn(
          "font-mono text-xs tracking-tight",
          textLight ? "text-paper/70" : "text-forest/60",
        )}
      >
        {hex}
      </span>
    </div>
  );
}

function SystemCard({
  title,
  kicker,
  children,
}: {
  title: string;
  kicker: string;
  children: React.ReactNode;
}) {
  return (
    <article className="reveal relative rounded-3xl bg-paper border border-line p-7 shadow-soft lift overflow-hidden">
      <header className="flex items-baseline justify-between gap-4 mb-6">
        <h3 className="text-lg text-forest">{title}</h3>
        <span className="eyebrow text-sage-deep">{kicker}</span>
      </header>
      {children}
    </article>
  );
}

function MotionLines() {
  return (
    <svg
      viewBox="0 0 400 128"
      preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full"
      aria-hidden
    >
      <defs>
        <linearGradient id="line" x1="0" x2="1">
          <stop offset="0" stopColor="oklch(0.32 0.046 154)" stopOpacity="0" />
          <stop offset="0.5" stopColor="oklch(0.32 0.046 154)" stopOpacity="0.45" />
          <stop offset="1" stopColor="oklch(0.32 0.046 154)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {Array.from({ length: 7 }).map((_, i) => (
        <path
          key={i}
          d={`M 0 ${20 + i * 14} C 120 ${10 + i * 14}, 280 ${30 + i * 14}, 400 ${20 + i * 14}`}
          stroke="url(#line)"
          fill="none"
          strokeWidth="1"
        />
      ))}
    </svg>
  );
}

function ScrollGauge() {
  return (
    <div className="reveal relative rounded-3xl border border-line bg-paper p-8 shadow-soft overflow-hidden">
      <div className="grid grid-cols-3 gap-6 text-forest">
        <Stat label="Plants" value="117" />
        <Stat label="In stock" value="5 ea" />
        <Stat label="Per plant" value="$12" />
      </div>
      <div className="mt-8 h-px bg-line" />
      <div className="mt-6 flex items-center justify-between text-sm text-forest/70">
        <span>Shipped USPS · USA</span>
        <span className="font-mono">v0.1 · foundation</span>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="eyebrow text-sage-deep">{label}</p>
      <p className="mt-2 font-display text-4xl leading-none">{value}</p>
    </div>
  );
}
