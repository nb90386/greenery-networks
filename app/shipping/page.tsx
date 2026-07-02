import type { Metadata } from "next";
import Link from "next/link";
import {
  Truck,
  ShieldCheck,
  CalendarClock,
  PackageOpen,
  Mail,
  ArrowRight,
} from "lucide-react";
import { PageHero } from "@/components/content/PageHero";

export const metadata: Metadata = {
  title: "Shipping & arrival · USPS within the USA",
  description:
    "How Greenery Networks ships live flowering starter plants. USPS within the USA, actual postage, and how each plant is packed.",
};

const STEPS = [
  {
    n: "01",
    title: "You order",
    body:
      "We hold your plants in the greenhouse and prepare a shipping window. Most orders ship within 5 business days, weather permitting.",
  },
  {
    n: "02",
    title: "We pick & pack",
    body:
      "Plants are picked the morning they ship. Never staged in a warehouse. Soil is hydrated, foliage is supported, and the box is labeled live plants.",
  },
  {
    n: "03",
    title: "USPS picks up",
    body:
      "We use USPS Priority for most of the USA. Typically 2 to 3 days in transit. You'll get tracking the moment the label is scanned.",
  },
  {
    n: "04",
    title: "Plant the day it arrives",
    body:
      "Open the box upright, water lightly, and let it acclimate for 24 hours in indirect light. Most plants are ready to pot up the same day.",
  },
] as const;

const COSTS = [
  { row: "Order subtotal", value: "Plants only . $12 each" },
  { row: "Shipping", value: "USPS actual postage, calculated at checkout" },
  { row: "Handling fee", value: "None. We don't add one" },
  { row: "Insurance", value: "Included on every package" },
  { row: "Service area", value: "Continental USA + Hawaii + Alaska via USPS" },
] as const;

const FAQ = [
  {
    q: "How fast will it ship?",
    a: "Most orders ship within 5 business days. We hold for unusually cold or hot weather at the destination. It's safer for the plant.",
  },
  {
    q: "Do you ship to APO/FPO or PO boxes?",
    a: "Yes. USPS reaches both. Transit can take a few extra days; we pack accordingly.",
  },
  {
    q: "Do you ship to Hawaii or Alaska?",
    a: "Yes, via USPS. Note that Hawaii has agricultural inspection requirements; bare-root shipping may be required and we'll reach out if so.",
  },
  {
    q: "What if my plant arrives unwell?",
    a: "Send us a photo within 7 days. We'll replace the plant or refund the cost. No long forms, no fight.",
  },
  {
    q: "Can I combine multiple plants in one box?",
    a: "Yes. We batch up to 6 plants per box. The shipping calculator at checkout already does the math.",
  },
] as const;

export default function ShippingPage() {
  return (
    <>
      <PageHero
        eyebrow="Shipping & arrival"
        title={
          <>
            USPS shipping,{" "}
            <span className="italic font-light text-sage-deep">
              actual postage, USA-wide.
            </span>
          </>
        }
        body="No inflated handling fees, no surprise upcharges. The shipping line at checkout is whatever the post office charges us. Passed straight through."
      />

      {/* Quick reassurance row */}
      <section className="relative py-10 lg:py-14 border-y border-line/80 bg-paper">
        <div className="container-site">
          <ul className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8">
            {[
              { icon: Truck,         title: "USPS Priority",          body: "2 to 3 days for most of the USA." },
              { icon: ShieldCheck,   title: "Hand packed with care",  body: "Boxed by the people who grew it." },
              { icon: CalendarClock, title: "Hold for weather",       body: "We wait out freezes and heat waves." },
              { icon: PackageOpen,   title: "Ready to open upright",  body: "Soil hydrated, foliage supported." },
            ].map(({ icon: Icon, title, body }) => (
              <li key={title} className="flex items-start gap-3">
                <span className="grid place-items-center h-10 w-10 rounded-full bg-mist text-forest shrink-0">
                  <Icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
                </span>
                <div>
                  <p className="text-[0.92rem] font-medium text-forest leading-snug">{title}</p>
                  <p className="mt-1 text-[0.82rem] text-forest/65 leading-snug">{body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section className="relative py-20 lg:py-28">
        <div className="container-site">
          <div className="max-w-2xl">
            <p className="eyebrow text-sage-deep">How it ships</p>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[2.6rem] leading-[1.06] text-balance">
              Four steps,{" "}
              <span className="italic font-light text-sage-deep">no drama.</span>
            </h2>
          </div>
          <ol className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {STEPS.map((s) => (
              <li
                key={s.n}
                className="rounded-3xl bg-paper border border-line shadow-soft p-6 relative overflow-hidden lift"
              >
                <p className="font-mono text-[0.66rem] tracking-[0.18em] uppercase text-sage-deep">
                  Step {s.n}
                </p>
                <h3 className="mt-3 font-display text-2xl text-forest leading-tight">
                  {s.title}
                </h3>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-forest/70">
                  {s.body}
                </p>
                <span
                  aria-hidden
                  className="absolute -right-4 -bottom-4 font-display text-[6rem] leading-none text-mist/80"
                >
                  {s.n}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Cost breakdown table + Healthy arrival */}
      <section className="relative py-20 lg:py-28 bg-mist/45">
        <div className="container-site grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-start">
          <div>
            <p className="eyebrow text-sage-deep">What it costs</p>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[2.6rem] leading-[1.06] text-balance">
              What you see at checkout .{" "}
              <span className="italic font-light text-sage-deep">
                and what you won&apos;t.
              </span>
            </h2>
            <p className="mt-5 text-forest/75 leading-relaxed">
              We don&apos;t do hidden handling charges. The receipt is small,
              flat, and exactly what the post office quoted us.
            </p>
            <dl className="mt-8 divide-y divide-line border-y border-line">
              {COSTS.map((c) => (
                <div
                  key={c.row}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-4"
                >
                  <dt className="font-mono text-[0.72rem] tracking-[0.18em] uppercase text-forest/55">
                    {c.row}
                  </dt>
                  <dd className="text-forest text-[0.95rem] sm:text-right">
                    {c.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <aside className="rounded-3xl bg-forest-dark text-paper p-7 lg:p-9 shadow-soft-lg relative isolate overflow-hidden grain">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(60% 50% at 90% 0%, oklch(0.5 0.1 138 / 0.45) 0%, transparent 65%)",
              }}
            />
            <div className="relative">
              <p className="eyebrow text-paper/70">How we pack</p>
              <h3 className="mt-3 font-display text-3xl leading-tight text-paper">
                Every plant is packed{" "}
                <span className="italic font-light text-paper/80">
                  the way we would send it to a friend.
                </span>
              </h3>
              <ul className="mt-7 space-y-4">
                {[
                  {
                    title: "Hydrated soil",
                    body: "We water the pot the morning it ships so the roots stay happy in transit.",
                  },
                  {
                    title: "Foliage supported",
                    body: "The plant is snugged upright with tissue and craft paper so the leaves and stems keep their shape.",
                  },
                  {
                    title: "Live plants label",
                    body: "The box is clearly marked as live plants so USPS handles it gently.",
                  },
                ].map((g) => (
                  <li key={g.title} className="flex items-start gap-3">
                    <span className="grid place-items-center h-7 w-7 rounded-full bg-paper/15 border border-paper/25 text-paper shrink-0">
                      <ShieldCheck className="h-3.5 w-3.5" strokeWidth={1.6} />
                    </span>
                    <div>
                      <p className="text-paper font-medium text-[0.95rem] leading-snug">
                        {g.title}
                      </p>
                      <p className="mt-1 text-paper/70 text-[0.86rem] leading-snug">
                        {g.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="press mt-7 inline-flex items-center gap-2 rounded-full bg-paper text-forest px-5 py-3 text-[0.9rem] font-medium hover:bg-mist transition-colors"
              >
                <Mail className="h-4 w-4" strokeWidth={1.7} />
                Contact about an order
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-20 lg:py-28">
        <div className="container-site grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-16 items-start">
          <div>
            <p className="eyebrow text-sage-deep">Common questions</p>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[2.6rem] leading-[1.06] text-balance">
              The shipping questions{" "}
              <span className="italic font-light text-sage-deep">
                we hear most.
              </span>
            </h2>
            <p className="mt-5 text-forest/70 leading-relaxed">
              Don&apos;t see yours? Email us and we&apos;ll answer it personally.
            </p>
          </div>
          <dl className="divide-y divide-line border-y border-line">
            {FAQ.map(({ q, a }, i) => (
              <div key={i} className="py-5">
                <dt className="font-display text-xl text-forest leading-tight">
                  {q}
                </dt>
                <dd className="mt-2 text-[0.95rem] text-forest/75 leading-relaxed">
                  {a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 lg:py-20 bg-mist/45">
        <div className="container-site flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <h2 className="text-2xl sm:text-3xl text-forest text-balance max-w-xl">
            Ready when you are.{" "}
            <span className="italic font-light text-sage-deep">
              Browse the collection.
            </span>
          </h2>
          <Link
            href="/shop"
            className="press inline-flex items-center gap-2 rounded-full bg-forest text-paper px-5 py-3 text-[0.92rem] font-medium hover:bg-forest-dark transition-colors shrink-0"
          >
            Shop the collection
            <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
          </Link>
        </div>
      </section>
    </>
  );
}
