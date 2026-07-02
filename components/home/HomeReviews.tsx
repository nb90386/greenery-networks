"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { REVIEWS, summary } from "@/lib/reviews";
import { StarRating } from "@/components/reviews/StarRating";
import { ReviewCard } from "@/components/reviews/ReviewCard";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function HomeReviews() {
  const scope = useRef<HTMLElement>(null);
  const { count, average } = summary();

  useGSAP(
    () => {
      gsap.from(".r-anim", {
        y: 24,
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
    <section ref={scope} className="relative py-24 lg:py-32 bg-mist/50">
      <div className="container-site">
        <header className="max-w-3xl">
          <p className="r-anim eyebrow text-sage-deep">Loved on patios and porches</p>
          <div className="mt-3 flex flex-wrap items-end gap-6">
            <h2 className="r-anim text-4xl sm:text-5xl lg:text-[3.2rem] leading-[1.05] text-balance">
              What growers are saying.
            </h2>
            <div className="r-anim inline-flex items-center gap-3 rounded-full bg-paper border border-line px-4 py-2 shadow-soft">
              <StarRating value={average} size={16} />
              <p className="text-sm text-forest font-medium tabular-nums">
                {average.toFixed(1)}
              </p>
              <span className="h-3 w-px bg-line" aria-hidden />
              <p className="text-sm text-forest/65">
                {count} verified {count === 1 ? "review" : "reviews"}
              </p>
            </div>
          </div>
        </header>

        <ul className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          {REVIEWS.map((r) => (
            <li key={r.id} className="r-anim">
              <ReviewCard review={r} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
