"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * From your doorstep to full bloom.
 *
 * A three-stage scroll story of a live 4 inch starter turning into a full patio
 * bloom over a few weeks. We ship starters, not seeds, so this replaces the
 * older seed to bloom concept.
 *
 * Debugging notes:
 * - Lenis is wired into ScrollTrigger in `SmoothScrollProvider` with a
 *   scroll listener plus a `gsap.ticker` raf pump, so ScrollTrigger stays in
 *   sync with Lenis's virtual scroll.
 * - We call `ScrollTrigger.refresh()` when Next/Image `onLoad` fires for each
 *   stage image, and after the fonts are ready, so the pin math is measured
 *   against the final rendered layout.
 * - Under `prefers-reduced-motion` we skip the pin and scrub entirely and
 *   render the three stages stacked vertically. The mobile layout stacks the
 *   same way.
 * - useGSAP scopes selectors and handles revert on unmount, so re-render or
 *   route change never leaves a stale pin behind.
 */

type Stage = {
  id: 1 | 2 | 3;
  label: string;
  title: string;
  body: string;
  photo: string;
  alt: string;
  tag: string;
};

const STAGES: Stage[] = [
  {
    id: 1,
    label: "It arrives",
    title: "A healthy 4 inch starter, hand packed.",
    body: "Your plant lands on your doorstep in a box marked live plants, roots snug in hydrated soil and foliage supported with tissue. Open it upright, water lightly, and let it breathe for a day.",
    photo: "/images/plants/032.jpg",
    alt: "A young 4 inch starter plant, freshly unpacked",
    tag: "Day 1 · unboxing",
  },
  {
    id: 2,
    label: "It settles in",
    title: "Over a few weeks it roots in and fills out.",
    body: "Set it in bright morning sun, water when the top inch is dry, and give it a light monthly feed. New leaves push, the stems firm up, and the plant hits its stride.",
    photo: "/images/plants/074.jpg",
    alt: "A settled starter plant beginning to fill in with new leaves",
    tag: "Week 4 · rooted",
  },
  {
    id: 3,
    label: "It blooms",
    title: "Full, colorful blooms on your patio.",
    body: "Buds swell, then open. From here it keeps flowering through the warm season. Regal pelargoniums often bloom for months at a time in a good spot.",
    photo: "/images/plants/021.jpg",
    alt: "A pelargonium in full bloom on a sunny patio",
    tag: "Week 8+ · bloom",
  },
];

export function DoorstepToBloom() {
  const scope = useRef<HTMLElement>(null);
  const loadedCount = useRef(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: scope.current,
            start: "top top",
            end: "+=280%",
            scrub: 0.6,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.addLabel("a")
          .to(".stage-1", { opacity: 0, scale: 0.96, filter: "blur(8px)", duration: 1 }, "a")
          .to(".stage-2", { opacity: 1, scale: 1.0,  filter: "blur(0px)", duration: 1 }, "a")
          .fromTo(".bar", { scaleX: 0 }, { scaleX: 0.5, duration: 1 }, "a")
          .to(".story-1", { opacity: 0, y: -16, duration: 0.5 }, "a")
          .to(".story-2", { opacity: 1, y: 0,   duration: 0.5 }, "a+=0.3")
          .to(".dot-1",   { backgroundColor: "oklch(0.32 0.046 154 / 0.35)", duration: 0.4 }, "a")
          .to(".dot-2",   { backgroundColor: "oklch(0.94 0.05 138 / 1)",    duration: 0.4 }, "a");

        tl.to({}, { duration: 0.4 });

        tl.addLabel("b")
          .to(".stage-2", { opacity: 0, scale: 0.96, filter: "blur(8px)", duration: 1 }, "b")
          .to(".stage-3", { opacity: 1, scale: 1.0,  filter: "blur(0px)", duration: 1 }, "b")
          .to(".bar",     { scaleX: 1, duration: 1 }, "b")
          .to(".story-2", { opacity: 0, y: -16, duration: 0.5 }, "b")
          .to(".story-3", { opacity: 1, y: 0,   duration: 0.5 }, "b+=0.3")
          .to(".dot-2",   { backgroundColor: "oklch(0.32 0.046 154 / 0.35)", duration: 0.4 }, "b")
          .to(".dot-3",   { backgroundColor: "oklch(0.94 0.05 138 / 1)",    duration: 0.4 }, "b");

        // Wait for fonts, then let ScrollTrigger measure again. Prevents the
        // pin from being calculated before Fraunces has loaded.
        if (typeof document !== "undefined" && "fonts" in document) {
          document.fonts.ready.then(() => ScrollTrigger.refresh());
        }
      });

      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      aria-label="From your doorstep to full bloom"
      className="relative bg-forest-dark text-paper md:h-[100vh] md:overflow-hidden"
    >
      <div className="absolute inset-0 grain pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 50% at 90% 10%, oklch(0.45 0.08 138 / 0.45) 0%, transparent 60%), radial-gradient(50% 60% at 10% 100%, oklch(0.4 0.08 154 / 0.4) 0%, transparent 60%)",
        }}
      />

      {/* Mobile stacked layout. No pin. */}
      <div className="relative md:hidden container-site py-20 space-y-16">
        <header>
          <p className="eyebrow text-paper/75">From your doorstep to full bloom</p>
          <h2 className="mt-3 text-3xl text-paper text-balance leading-[1.06]">
            The first few weeks with your plant.
          </h2>
        </header>

        {STAGES.map((s) => (
          <article key={`m-${s.id}`} className="grid grid-cols-1 gap-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[0.7rem] tracking-[0.18em] uppercase text-paper/70">
                {String(s.id).padStart(2, "0")} · {s.label}
              </span>
              <span className="h-px flex-1 bg-paper/15" />
            </div>
            <StageImage src={s.photo} alt={s.alt} tag={s.tag} />
            <div>
              <h3 className="text-2xl text-paper leading-[1.1] text-balance">{s.title}</h3>
              <p className="mt-4 text-[1rem] leading-relaxed text-paper/75">{s.body}</p>
            </div>
          </article>
        ))}
      </div>

      {/* Desktop pinned + scrubbed. */}
      <div className="hidden md:grid relative container-site h-full grid-cols-1 md:grid-cols-[1fr_1.1fr] gap-10 items-center py-20 lg:py-24">
        <div className="relative">
          <p className="eyebrow text-paper/75">From your doorstep to full bloom</p>
          <div className="relative mt-5 h-px w-40 bg-paper/15 overflow-hidden">
            <span
              className="bar absolute inset-y-0 left-0 right-0 origin-left bg-paper/85"
              style={{ transform: "scaleX(0)" }}
            />
          </div>

          <div className="mt-6 flex items-center gap-3">
            {STAGES.map((s, i) => (
              <div key={s.id} className="flex items-center gap-2">
                <span
                  className={cn(
                    `dot-${s.id} h-2 w-2 rounded-full`,
                    i === 0 ? "bg-paper" : "bg-paper/30",
                  )}
                />
                <span
                  className={cn(
                    "font-mono text-[0.7rem] tracking-[0.18em] uppercase",
                    i === 0 ? "text-paper" : "text-paper/45",
                  )}
                >
                  {String(s.id).padStart(2, "0")} · {s.label}
                </span>
              </div>
            ))}
          </div>

          <div className="relative mt-10 lg:mt-12 min-h-[260px]">
            {STAGES.map((s, i) => (
              <article
                key={s.id}
                className={cn(
                  `story-${s.id} absolute inset-0 will-change-[opacity,transform]`,
                  i === 0 ? "opacity-100" : "opacity-0",
                )}
              >
                <h2 className="text-3xl sm:text-4xl lg:text-[3rem] leading-[1.05] text-paper text-balance">
                  {s.title}
                </h2>
                <p className="mt-5 max-w-md text-[1.02rem] leading-relaxed text-paper/75">
                  {s.body}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="relative aspect-[4/5] sm:aspect-[5/6] lg:aspect-square w-full max-w-[640px] justify-self-end">
          {STAGES.map((s, i) => (
            <div
              key={s.id}
              className={cn(
                `stage-${s.id} absolute inset-0 will-change-[opacity,transform,filter]`,
                i === 0 ? "opacity-100" : "opacity-0",
              )}
            >
              <StageImage
                src={s.photo}
                alt={s.alt}
                tag={s.tag}
                onImageLoad={() => {
                  loadedCount.current += 1;
                  // After all three photos are decoded, re-measure the pin.
                  if (loadedCount.current >= STAGES.length) {
                    ScrollTrigger.refresh();
                  }
                }}
              />
            </div>
          ))}
          <div className="absolute inset-0 rounded-3xl ring-1 ring-paper/15 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}

function StageImage({
  src,
  alt,
  tag,
  onImageLoad,
}: {
  src: string;
  alt: string;
  tag: string;
  onImageLoad?: () => void;
}) {
  return (
    <div className="relative h-full w-full rounded-3xl overflow-hidden">
      <div className="absolute inset-0 scale-[1.22] origin-top">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 50vw, 90vw"
          className="object-cover object-top"
          onLoad={onImageLoad}
        />
      </div>
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-forest-dark/55 to-transparent pointer-events-none" />
      <span className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-paper/15 backdrop-blur-md border border-paper/30 px-2.5 py-1 text-paper text-[0.78rem] font-mono tracking-[0.14em] uppercase">
        {tag}
      </span>
    </div>
  );
}
