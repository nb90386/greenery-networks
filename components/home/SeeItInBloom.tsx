"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { PlantImage } from "@/components/site/PlantImage";
import { getProductsByIds } from "@/data/products";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Interactive "see it in bloom" preview. Since we ship a small 4 inch starter
 * we want the visitor to picture the mature plant in a real setting. We frame
 * each featured plant inside a soft styled patio scene, then let the visitor
 * swap plants with a click.
 */

const FEATURED_IDS = ["021", "074", "032", "110", "047", "001"] as const;

const SETTINGS = [
  {
    id: "patio",
    label: "Sunny patio",
    gradient:
      "radial-gradient(80% 60% at 50% 20%, oklch(0.94 0.03 90 / 0.9) 0%, transparent 60%), linear-gradient(180deg, oklch(0.93 0.03 90) 0%, oklch(0.88 0.03 60) 60%, oklch(0.7 0.04 40) 100%)",
    floor: "oklch(0.62 0.05 50)",
  },
  {
    id: "garden",
    label: "Garden bed",
    gradient:
      "radial-gradient(70% 60% at 50% 10%, oklch(0.9 0.03 130 / 0.9) 0%, transparent 60%), linear-gradient(180deg, oklch(0.9 0.03 130) 0%, oklch(0.72 0.06 140) 65%, oklch(0.42 0.05 40) 100%)",
    floor: "oklch(0.35 0.04 40)",
  },
  {
    id: "balcony",
    label: "Cozy balcony",
    gradient:
      "radial-gradient(70% 60% at 50% 10%, oklch(0.92 0.02 240 / 0.9) 0%, transparent 60%), linear-gradient(180deg, oklch(0.92 0.02 240) 0%, oklch(0.82 0.03 220) 60%, oklch(0.55 0.04 60) 100%)",
    floor: "oklch(0.5 0.02 60)",
  },
] as const;

type SettingKey = (typeof SETTINGS)[number]["id"];

export function SeeItInBloom() {
  const scope = useRef<HTMLElement>(null);
  const [selectedId, setSelectedId] = useState<string>(FEATURED_IDS[0]);
  const [setting, setSetting] = useState<SettingKey>("patio");

  const featured = getProductsByIds(FEATURED_IDS);
  const selected = featured.find((p) => p.id === selectedId) ?? featured[0];
  const activeSetting = SETTINGS.find((s) => s.id === setting)!;

  useGSAP(
    () => {
      gsap.from(".sib-anim", {
        y: 22,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.07,
        scrollTrigger: { trigger: scope.current, start: "top 80%" },
      });
    },
    { scope },
  );

  return (
    <section ref={scope} className="relative py-24 lg:py-32 bg-paper">
      <div className="container-site">
        <header className="max-w-2xl">
          <p className="sib-anim eyebrow text-sage-deep">See it in bloom</p>
          <h2 className="sib-anim mt-3 text-4xl sm:text-5xl lg:text-[3.2rem] leading-[1.05] text-balance">
            Picture the plant{" "}
            <span className="italic font-light text-sage-deep">
              in your own space.
            </span>
          </h2>
          <p className="sib-anim mt-5 text-[1rem] leading-relaxed text-forest/75 max-w-xl">
            Your plant arrives as a small starter and grows into blooms like
            these. Click a color to swap the flower, or change the setting.
          </p>
        </header>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 items-start">
          {/* Styled setting preview */}
          <div className="sib-anim relative aspect-[5/4] rounded-3xl overflow-hidden ring-1 ring-forest/8 shadow-card">
            {/* Sky gradient */}
            <div
              className="absolute inset-0"
              style={{ background: activeSetting.gradient }}
              aria-hidden
            />
            {/* Floor / ground plane */}
            <div
              className="absolute inset-x-0 bottom-0 h-[42%]"
              style={{ background: activeSetting.floor, opacity: 0.75 }}
              aria-hidden
            />
            {/* Pot */}
            <PotSilhouette />
            {/* The plant bloom inside the pot */}
            <div className="absolute inset-x-0 bottom-[26%] flex items-end justify-center pointer-events-none">
              <div
                key={selected!.id}
                className="relative w-[52%] aspect-square animate-in fade-in zoom-in-95 duration-500"
              >
                <div className="absolute inset-0 rounded-full overflow-hidden ring-4 ring-paper/60 shadow-soft-lg">
                  <PlantImage
                    src={selected!.image}
                    alt={selected!.name}
                    fill
                    sizes="(min-width: 1024px) 30vw, 50vw"
                    cropCaption={false}
                  />
                </div>
              </div>
            </div>
            {/* Setting badge */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
              {SETTINGS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSetting(s.id)}
                  aria-pressed={setting === s.id}
                  className={cn(
                    "press inline-flex items-center rounded-full px-3 py-1 text-[0.72rem] font-medium border",
                    "backdrop-blur-md transition-[background-color,color,border-color] duration-300",
                    setting === s.id
                      ? "bg-forest text-paper border-forest"
                      : "bg-paper/70 text-forest border-paper/40 hover:bg-paper",
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
            {/* Plant label */}
            <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-paper/85 backdrop-blur-md border border-paper/30 px-2.5 py-1.5 text-forest">
              <span className="font-mono text-[0.66rem] tracking-[0.16em] uppercase">
                Nº {selected!.id}
              </span>
              <span className="h-3 w-px bg-forest/20" />
              <span className="font-display italic text-[0.9rem] leading-none">
                {selected!.name}
              </span>
            </div>
          </div>

          {/* Plant picker */}
          <div className="sib-anim">
            <p className="eyebrow text-sage-deep">Try a color</p>
            <p className="mt-2 text-[0.86rem] text-forest/60">
              Tap a plant to see it in your setting.
            </p>
            <ul className="mt-5 grid grid-cols-3 gap-2">
              {featured.map((p) => {
                const active = selectedId === p.id;
                return (
                  <li key={p.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedId(p.id)}
                      aria-pressed={active}
                      aria-label={`Show ${p.displayName}`}
                      className={cn(
                        "press relative block w-full aspect-square rounded-2xl overflow-hidden ring-1",
                        "transition-[transform,box-shadow,outline] duration-300 ease-[var(--ease-out-strong)]",
                        active
                          ? "ring-forest ring-2 scale-[1.02]"
                          : "ring-forest/10 hover:ring-forest/40",
                      )}
                    >
                      <PlantImage
                        src={p.image}
                        alt={p.name}
                        fill
                        sizes="100px"
                        cropCaption={false}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 rounded-2xl bg-mist/60 border border-line p-5">
              <p className="text-[0.9rem] leading-relaxed text-forest">
                <span className="font-medium">A note:</span> your plant arrives
                as a small starter in a 4 inch pot and grows into full blooms
                like these over a few weeks.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`/shop/${selected!.slug}`}
                className="press inline-flex items-center gap-2 rounded-full bg-forest text-paper px-5 py-3 text-[0.92rem] font-medium hover:bg-forest-dark transition-colors"
              >
                Shop this plant
                <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
              </Link>
              <Link
                href="/shop"
                className="press inline-flex items-center gap-2 rounded-full bg-paper text-forest border border-forest/15 px-5 py-3 text-[0.92rem] font-medium hover:border-forest/35 transition-colors"
              >
                See more colors
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Simple terracotta pot silhouette placed centered along the bottom. */
function PotSilhouette() {
  return (
    <svg
      viewBox="0 0 480 220"
      className="absolute inset-x-0 bottom-0 w-full h-[36%] pointer-events-none"
      preserveAspectRatio="xMidYMax meet"
      aria-hidden
    >
      <defs>
        <linearGradient id="pot-body" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#c07a5a" />
          <stop offset="100%" stopColor="#8f5236" />
        </linearGradient>
        <radialGradient id="pot-highlight" cx="30%" cy="20%" r="50%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>
      {/* Rim */}
      <ellipse cx="240" cy="40" rx="150" ry="14" fill="#a26649" />
      <ellipse cx="240" cy="34" rx="150" ry="14" fill="#c07a5a" />
      {/* Body */}
      <path
        d="M 90 40 L 130 200 L 350 200 L 390 40 Z"
        fill="url(#pot-body)"
      />
      <path
        d="M 90 40 L 130 200 L 350 200 L 390 40 Z"
        fill="url(#pot-highlight)"
      />
      {/* Ground shadow */}
      <ellipse cx="240" cy="205" rx="180" ry="12" fill="rgba(0,0,0,0.28)" />
    </svg>
  );
}
