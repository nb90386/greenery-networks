"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Leaf, Truck, Package, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ITEMS = [
  {
    icon: Package,
    title: "Hand packed with care",
    body: "Every plant is boxed by the people who grew it.",
  },
  {
    icon: Truck,
    title: "Ships from California",
    body: "USPS across the USA, actual postage, no surprises.",
  },
  {
    icon: Leaf,
    title: "Picked fresh",
    body: "Pulled from the greenhouse the day it ships.",
  },
  {
    icon: Sparkles,
    title: "Beginner friendly",
    body: "A little care card ships in every box.",
  },
] as const;

export function TrustBar() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".trust-item", {
        y: 16,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.06,
        scrollTrigger: { trigger: scope.current, start: "top 85%" },
      });
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      aria-label="Why gardeners choose Greenery Networks"
      className="relative py-10 lg:py-14 border-y border-line/80 bg-paper"
    >
      <div className="container-site">
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8">
          {ITEMS.map(({ icon: Icon, title, body }) => (
            <li
              key={title}
              className={cn(
                "trust-item group flex items-start gap-3",
                "transition-colors duration-300",
              )}
            >
              <span className="grid place-items-center h-10 w-10 rounded-full bg-mist text-forest shrink-0">
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
              </span>
              <div>
                <p className="text-[0.92rem] font-medium text-forest leading-snug">
                  {title}
                </p>
                <p className="mt-1 text-[0.82rem] text-forest/65 leading-snug">
                  {body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
