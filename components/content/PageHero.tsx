"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  body?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
};

/** Consistent editorial hero used at the top of content pages. */
export function PageHero({
  eyebrow,
  title,
  body,
  align = "left",
  className,
}: Props) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".ph-anim", {
        y: 22,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
      });
    },
    { scope },
  );

  return (
    <div
      ref={scope}
      className={cn(
        "relative pt-32 lg:pt-40 pb-16 lg:pb-20 isolate overflow-hidden grain bg-botanical-veil",
        className,
      )}
    >
      <div
        className={cn(
          "container-site",
          align === "center" && "text-center",
        )}
      >
        <p
          className={cn(
            "ph-anim eyebrow text-sage-deep",
            align === "center" && "mx-auto",
          )}
        >
          {eyebrow}
        </p>
        <h1
          className={cn(
            "ph-anim mt-3 text-balance text-4xl sm:text-5xl lg:text-[4rem] leading-[1.04]",
            align === "left" ? "max-w-4xl" : "max-w-3xl mx-auto",
          )}
        >
          {title}
        </h1>
        {body && (
          <p
            className={cn(
              "ph-anim mt-6 text-[1.05rem] leading-relaxed text-forest/75",
              align === "left" ? "max-w-2xl" : "max-w-xl mx-auto",
            )}
          >
            {body}
          </p>
        )}
      </div>
    </div>
  );
}
