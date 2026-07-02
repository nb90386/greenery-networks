"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Lenis smooth scroll wired into GSAP ScrollTrigger. Two things matter:
 *
 * 1. Every Lenis scroll tick calls `ScrollTrigger.update` so pinning and
 *    scrubs stay in step with the virtual scroll position.
 * 2. `gsap.ticker` drives Lenis's raf loop and `lagSmoothing(0)` keeps time
 *    monotonic when the browser tab is throttled.
 *
 * We also call `ScrollTrigger.refresh()` after the fonts load and after the
 * window fully loads so pin math is measured against the finished layout.
 * This avoids the classic bug where a pinned section jumps because the
 * initial measurement happened before Fraunces / Inter came in and shifted
 * heights.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCb = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    document.documentElement.classList.add("lenis");

    /* Re-measure after fonts and images are ready. */
    let onLoad: (() => void) | null = null;
    if ("fonts" in document) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }
    if (document.readyState !== "complete") {
      onLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", onLoad, { once: true });
    }

    return () => {
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
      document.documentElement.classList.remove("lenis");
      if (onLoad) window.removeEventListener("load", onLoad);
    };
  }, []);

  return children;
}
