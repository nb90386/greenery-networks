"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Droplets, Sun, Wind } from "lucide-react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const PILLARS = [
  {
    icon: Droplets,
    title: "Water with intent",
    body: "Keep soil moist; let the top inch dry before the next pour.",
  },
  {
    icon: Sun,
    title: "Bright, indirect light",
    body: "Most varieties thrive in 4 to 6 hours of soft morning sun.",
  },
  {
    icon: Wind,
    title: "Air & airflow",
    body: "Good circulation keeps foliage clean and disease-free.",
  },
] as const;

export function CarePromise() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".care-anim", {
        y: 24,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.07,
        scrollTrigger: { trigger: scope.current, start: "top 78%" },
      });

      // Soft parallax on the photo
      gsap.to(".care-photo", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: scope.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    },
    { scope },
  );

  return (
    <section ref={scope} className="relative py-24 lg:py-32 bg-paper">
      <div className="container-site grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-14 lg:gap-20 items-center">
        {/* Photo column */}
        <div className="relative aspect-[5/6] rounded-3xl overflow-hidden shadow-card ring-1 ring-forest/8">
          <div className="care-photo absolute inset-0 scale-[1.2] origin-top">
            <Image
              src="/images/plants/032.jpg"
              alt="Hands holding a healthy 4-inch starter plant"
              fill
              sizes="(min-width: 1024px) 50vw, 90vw"
              className="object-cover object-top"
            />
          </div>
          {/* Editorial caption tag */}
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-paper/15 backdrop-blur-md border border-paper/30 px-2.5 py-1 text-paper">
              <span className="font-mono text-[0.66rem] tracking-[0.16em] opacity-90">
                Nº 032
              </span>
              <span className="h-3 w-px bg-paper/40" />
              <span className="font-display italic text-[0.78rem] leading-none">
                Pretty Pink Cosmic
              </span>
            </span>
          </div>
          {/* Floating quote card */}
          <div className="care-anim absolute -bottom-4 -right-4 lg:bottom-6 lg:right-6 glass-card rounded-2xl p-5 max-w-[280px]">
            <p className="font-display italic text-[1.05rem] leading-snug text-forest">
              &ldquo;If it has roots and buds, it&apos;s ready to bloom.&rdquo;
            </p>
            <p className="mt-2 eyebrow text-sage-deep">Our care promise</p>
          </div>
        </div>

        {/* Text column */}
        <div>
          <p className="care-anim eyebrow text-sage-deep">Care promise</p>
          <h2 className="care-anim mt-3 text-4xl sm:text-5xl lg:text-[3.2rem] leading-[1.05] text-balance">
            Grow{" "}
            <span className="italic font-light text-sage-deep">
              confidently.
            </span>
          </h2>
          <p className="care-anim mt-5 text-[1.05rem] leading-relaxed text-forest/75 max-w-lg">
            Every plant ships with a hand-written care card. Light, water,
            food. If something looks off in the first 14 days, email us. We
            grew it; we&apos;ll help you keep it.
          </p>

          <ul className="care-anim mt-10 grid grid-cols-1 sm:grid-cols-3 gap-5">
            {PILLARS.map((p) => (
              <li
                key={p.title}
                className="group flex flex-col gap-2"
              >
                <span className="grid place-items-center h-10 w-10 rounded-full bg-mist text-forest transition-colors duration-300 group-hover:bg-forest group-hover:text-paper">
                  <p.icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
                </span>
                <p className="mt-1 font-display text-[1.15rem] text-forest leading-tight">
                  {p.title}
                </p>
                <p className="text-[0.86rem] text-forest/65 leading-snug">
                  {p.body}
                </p>
              </li>
            ))}
          </ul>

          <Link
            href="/care"
            className={cn(
              "care-anim press group mt-10 inline-flex items-center gap-2",
              "rounded-full bg-paper text-forest border border-forest/15",
              "px-5 py-3 text-[0.9rem] font-medium",
              "transition-[background-color,border-color] duration-500 ease-[var(--ease-out-strong)]",
              "hover:bg-forest hover:text-paper hover:border-forest",
            )}
          >
            Read the full care guide
            <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5" strokeWidth={1.8} />
          </Link>
        </div>
      </div>
    </section>
  );
}
