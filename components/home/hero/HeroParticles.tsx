"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rot: number;
  vr: number;
  kind: 0 | 1; // 0 = pollen, 1 = leaf
  hue: number;
  alpha: number;
  swayPhase: number;
  swayAmp: number;
};

const COUNT_DESKTOP = 38;
const COUNT_MOBILE = 18;

/**
 * Floating leaf + pollen canvas overlay. Paused when the canvas is offscreen
 * (IntersectionObserver) and disabled entirely under prefers-reduced-motion.
 */
export function HeroParticles({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const playing = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    const particles: Particle[] = [];

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const count = isMobile ? COUNT_MOBILE : COUNT_DESKTOP;

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas!.width = Math.floor(w * dpr);
      canvas!.height = Math.floor(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function spawn(initial = false): Particle {
      const isLeaf = Math.random() < 0.32;
      return {
        x: Math.random() * w,
        y: initial ? Math.random() * h : -20 - Math.random() * 80,
        vx: (Math.random() - 0.5) * 0.18,
        vy: 0.18 + Math.random() * 0.45,
        size: isLeaf ? 5 + Math.random() * 8 : 1 + Math.random() * 1.8,
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.012,
        kind: isLeaf ? 1 : 0,
        hue: isLeaf ? 140 + Math.random() * 20 : 80 + Math.random() * 30,
        alpha: isLeaf ? 0.42 + Math.random() * 0.25 : 0.35 + Math.random() * 0.35,
        swayPhase: Math.random() * Math.PI * 2,
        swayAmp: 18 + Math.random() * 24,
      };
    }

    resize();
    for (let i = 0; i < count; i++) particles.push(spawn(true));

    let prev = performance.now();

    function frame(now: number) {
      if (!playing.current) {
        rafRef.current = requestAnimationFrame(frame);
        return;
      }
      const dt = Math.min(50, now - prev);
      prev = now;

      ctx!.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.swayPhase += dt * 0.0014;
        p.x += p.vx + Math.sin(p.swayPhase) * p.swayAmp * 0.0008;
        p.y += p.vy;
        p.rot += p.vr;

        if (p.y > h + 30 || p.x < -40 || p.x > w + 40) {
          Object.assign(p, spawn(false));
        }

        ctx!.save();
        ctx!.translate(p.x, p.y);
        ctx!.rotate(p.rot);
        ctx!.globalAlpha = p.alpha;

        if (p.kind === 1) {
          // Leaf. Soft teardrop
          ctx!.beginPath();
          ctx!.fillStyle = `oklch(0.6 0.08 ${p.hue})`;
          ctx!.ellipse(0, 0, p.size * 1.6, p.size * 0.78, 0, 0, Math.PI * 2);
          ctx!.fill();
          ctx!.strokeStyle = `oklch(0.42 0.05 ${p.hue})`;
          ctx!.lineWidth = 0.6;
          ctx!.beginPath();
          ctx!.moveTo(-p.size * 1.5, 0);
          ctx!.lineTo(p.size * 1.5, 0);
          ctx!.stroke();
        } else {
          // Pollen. Small luminous dot
          const grad = ctx!.createRadialGradient(0, 0, 0, 0, 0, p.size * 3);
          grad.addColorStop(0, `oklch(0.95 0.08 ${p.hue})`);
          grad.addColorStop(1, `oklch(0.95 0.08 ${p.hue} / 0)`);
          ctx!.fillStyle = grad;
          ctx!.beginPath();
          ctx!.arc(0, 0, p.size * 3, 0, Math.PI * 2);
          ctx!.fill();
        }

        ctx!.restore();
      }

      rafRef.current = requestAnimationFrame(frame);
    }

    rafRef.current = requestAnimationFrame(frame);

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) playing.current = entry.isIntersecting;
      },
      { threshold: 0.01 },
    );
    io.observe(canvas);

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    return () => {
      io.disconnect();
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className ?? "absolute inset-0 w-full h-full pointer-events-none"}
    />
  );
}
