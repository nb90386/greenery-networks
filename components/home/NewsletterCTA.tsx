"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function NewsletterCTA() {
  const scope = useRef<HTMLElement>(null);
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      gsap.from(".n-anim", {
        y: 22,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.07,
        scrollTrigger: { trigger: scope.current, start: "top 82%" },
      });
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      className="relative py-24 lg:py-28 isolate overflow-hidden bg-forest-dark text-paper"
    >
      <div className="absolute inset-0 grain pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(50% 50% at 80% 0%, oklch(0.5 0.1 138 / 0.55) 0%, transparent 65%), radial-gradient(40% 50% at 0% 100%, oklch(0.45 0.08 154 / 0.55) 0%, transparent 65%)",
        }}
      />
      <PetalsBg />

      <div className="relative container-site grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-center">
        <div className="max-w-xl">
          <p className="n-anim eyebrow text-paper/65">Garden letters</p>
          <h2 className="n-anim mt-3 text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.05] text-balance text-paper">
            Notes from the{" "}
            <span className="italic font-light text-paper/85">greenhouse,</span>{" "}
            in your inbox.
          </h2>
          <p className="n-anim mt-5 text-[1.02rem] leading-relaxed text-paper/75 max-w-md">
            Seasonal plant care, new arrivals, and the occasional behind-the-bench note.
            One letter a month. No spam, ever.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!email.includes("@")) return;
            setDone(true);
          }}
          className="n-anim glass-card rounded-3xl p-5 lg:p-6 text-forest"
        >
          {done ? (
            <div className="flex items-start gap-3">
              <span className="grid place-items-center h-10 w-10 rounded-full bg-mist text-forest shrink-0">
                <Check className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <div>
                <p className="font-display text-xl leading-tight">Welcome to the garden.</p>
                <p className="mt-2 text-[0.92rem] text-forest/70 leading-relaxed">
                  We&apos;ll be in touch with the next garden letter.
                </p>
              </div>
            </div>
          ) : (
            <>
              <label
                htmlFor="cta-newsletter"
                className="font-display text-xl leading-tight"
              >
                Join the letter list
              </label>
              <p className="mt-2 text-[0.86rem] text-forest/70 leading-relaxed">
                One letter a month, unsubscribe in a click.
              </p>
              <div className="mt-4 flex items-stretch gap-2 rounded-full bg-paper border border-line p-1.5 shadow-soft">
                <span className="grid place-items-center px-3 text-forest/55">
                  <Mail className="h-4 w-4" strokeWidth={1.6} />
                </span>
                <input
                  id="cta-newsletter"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@garden.com"
                  className="flex-1 bg-transparent text-[0.92rem] text-forest placeholder:text-forest/40 focus:outline-none"
                />
                <button
                  type="submit"
                  className={cn(
                    "press inline-flex items-center gap-1.5 rounded-full",
                    "bg-forest text-paper px-4 py-2 text-sm font-medium",
                    "hover:bg-forest-dark transition-colors",
                  )}
                >
                  Subscribe
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </section>
  );
}

function PetalsBg() {
  return (
    <svg
      aria-hidden
      className="absolute inset-0 -z-10 w-full h-full opacity-[0.10]"
      viewBox="0 0 1600 600"
      preserveAspectRatio="xMidYMid slice"
    >
      <g stroke="oklch(0.85 0.05 134)" strokeWidth="1.2" fill="none">
        <path d="M 0 480 C 240 360, 600 380, 880 320 C 1100 270, 1340 280, 1700 200" />
        <path d="M 0 520 C 240 400, 600 420, 880 360 C 1100 310, 1340 320, 1700 240" />
        <path d="M 0 560 C 240 440, 600 460, 880 400 C 1100 350, 1340 360, 1700 280" />
      </g>
    </svg>
  );
}
