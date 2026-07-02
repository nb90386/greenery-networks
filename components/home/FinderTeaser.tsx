"use client";

import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Home, Sun, Palette, Sprout } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Short entry point to the full /finder flow. Not the finder itself. Shows
 * the four prompts you will answer inside, so the user knows what they are
 * getting into before clicking through.
 */
export function FinderTeaser() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".ft-anim", {
        y: 20,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.06,
        scrollTrigger: { trigger: scope.current, start: "top 82%" },
      });
    },
    { scope },
  );

  const prompts = [
    { icon: Home,    label: "Where it lives" },
    { icon: Sun,     label: "How much sun" },
    { icon: Palette, label: "Colors you love" },
    { icon: Sprout,  label: "How much experience" },
  ];

  return (
    <section ref={scope} className="relative py-24 lg:py-28">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(50% 50% at 90% 0%, oklch(0.886 0.029 12 / 0.4) 0%, transparent 60%), radial-gradient(40% 40% at 0% 100%, oklch(0.948 0.013 134 / 0.65) 0%, transparent 60%), oklch(0.992 0.007 92)",
        }}
      />
      <div className="container-site grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-10 items-center">
        <div className="max-w-lg">
          <p className="ft-anim eyebrow text-sage-deep">Not sure where to start?</p>
          <h2 className="ft-anim mt-3 text-4xl sm:text-5xl lg:text-[3rem] leading-[1.05] text-balance">
            Tell us about your spot.{" "}
            <span className="italic font-light text-sage-deep">
              We will pick plants that fit.
            </span>
          </h2>
          <p className="ft-anim mt-5 text-[1.02rem] leading-relaxed text-forest/75">
            A friendly seven question walk through. Sun, colors, size, and how
            much time you want to spend fussing. Takes about a minute.
          </p>
          <Link
            href="/finder"
            className="ft-anim press group mt-8 inline-flex items-center gap-2 rounded-full bg-forest text-paper px-6 py-3.5 text-[0.95rem] font-medium tracking-wide shadow-soft hover:bg-forest-dark transition-colors"
          >
            Start the plant finder
            <ArrowRight
              className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5"
              strokeWidth={1.8}
            />
          </Link>
        </div>

        <ul className="ft-anim glass-card rounded-3xl p-6 lg:p-8 grid grid-cols-2 gap-4">
          {prompts.map((p) => (
            <li
              key={p.label}
              className="flex items-center gap-3 rounded-2xl bg-paper/60 border border-forest/8 p-4"
            >
              <span className="grid place-items-center h-10 w-10 rounded-full bg-mist text-forest">
                <p.icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
              </span>
              <p className="font-display text-[1.05rem] leading-tight text-forest">
                {p.label}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
