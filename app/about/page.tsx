import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Leaf, ShieldCheck, Truck } from "lucide-react";
import { PageHero } from "@/components/content/PageHero";
import { PlantImage } from "@/components/site/PlantImage";
import { SproutMark } from "@/components/brand/SproutMark";

export const metadata: Metadata = {
  title: "Our garden · Greenery Networks",
  description:
    "Greenery Networks is a small, family-run online garden. 117 live flowering starter plants, hand-grown in 4-inch pots and shipped USPS across the USA.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our garden"
        title={
          <>
            A small, family-run garden{" "}
            <span className="italic font-light text-sage-deep">
              shipping color across the country.
            </span>
          </>
        }
        body="Greenery Networks started as a backyard collection. Flowering starter plants we kept selecting, dividing, and gifting until friends asked how to get their own. Now we grow 117 varieties, hand-picked into 4-inch pots, and ship them USPS across the USA."
      />

      {/* Layered photo + story block */}
      <section className="relative py-20 lg:py-28">
        <div className="container-site grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
          <div className="relative">
            <div className="relative aspect-[5/6] rounded-3xl overflow-hidden ring-1 ring-forest/8 shadow-card">
              <PlantImage
                src="/images/plants/074.jpg"
                alt="A hand-grown Pretty Lavender starter"
                fill
                sizes="(min-width: 1024px) 45vw, 95vw"
              />
            </div>
            <figure className="absolute -bottom-6 -right-4 lg:-right-8 w-40 h-40 lg:w-52 lg:h-52 rounded-3xl overflow-hidden ring-1 ring-paper shadow-soft-lg">
              <PlantImage
                src="/images/plants/021.jpg"
                alt="A Soft Red pelargonium"
                fill
                sizes="200px"
              />
            </figure>
            <div className="absolute -top-6 -left-4 lg:-left-8 glass-card rounded-2xl px-4 py-3 max-w-[210px]">
              <p className="eyebrow text-sage-deep">Year-round</p>
              <p className="mt-1 font-display text-xl leading-tight text-forest">
                117 flowering varieties
              </p>
            </div>
          </div>

          <div>
            <p className="eyebrow text-sage-deep">Spreading the joy with colorful flowers</p>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[3rem] leading-[1.06] text-balance">
              We didn&apos;t set out to start a nursery .
              {" "}
              <span className="italic font-light text-sage-deep">
                the garden made it for us.
              </span>
            </h2>
            <div className="mt-6 space-y-5 text-[1.02rem] leading-relaxed text-forest/80 max-w-prose">
              <p>
                What began as a hobby. Collecting rare pelargonium cultivars,
                Philippine violets, and scented geraniums. Quietly turned into
                a 117-variety living catalog over the years. Each plant was
                selected because of how generously it blooms in a home garden,
                not just under a greenhouse roof.
              </p>
              <p>
                Today, every plant we sell is hand-grown into a 4-inch starter,
                picked the morning it ships, and packed by the same people who
                grew it. No middlemen, no oversized inventory, no inflated
                shipping math.
              </p>
              <p>
                We&apos;re small on purpose. Five of each variety, $12 each, USPS
                shipping at actual cost. That&apos;s the boutique.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Three values */}
      <section className="relative py-20 lg:py-24 bg-mist/45">
        <div className="container-site">
          <div className="max-w-2xl">
            <p className="eyebrow text-sage-deep">What we believe</p>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[2.6rem] leading-[1.06] text-balance">
              Three quiet rules{" "}
              <span className="italic font-light text-sage-deep">
                we won&apos;t bend.
              </span>
            </h2>
          </div>

          <ul className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-5">
            {VALUES.map((v) => (
              <li
                key={v.title}
                className="rounded-3xl bg-paper border border-line shadow-soft p-7 lift"
              >
                <span className="grid place-items-center h-10 w-10 rounded-full bg-mist text-forest">
                  <v.icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
                </span>
                <h3 className="mt-5 font-display text-2xl leading-tight text-forest">
                  {v.title}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-forest/70">
                  {v.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Wide pull-quote */}
      <section className="relative py-20 lg:py-28">
        <div className="container-site">
          <figure className="relative max-w-4xl mx-auto text-center">
            <SproutMark size={36} className="mx-auto text-sage-deep" />
            <blockquote className="mt-6 font-display text-3xl sm:text-4xl lg:text-[2.6rem] leading-[1.12] text-forest text-balance">
              <span className="italic font-light text-sage-deep">&ldquo;</span>
              If it has roots and buds, it&apos;s ready to bloom.
              <span className="italic font-light text-sage-deep">&rdquo;</span>
            </blockquote>
            <figcaption className="mt-6 eyebrow text-sage-deep">
              Greenery Networks · our care promise
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-20 lg:py-24 bg-forest-dark text-paper isolate overflow-hidden">
        <div className="absolute inset-0 grain pointer-events-none" />
        <div className="container-site relative grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
          <div>
            <p className="eyebrow text-paper/65">Come visit</p>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[2.6rem] leading-[1.06] text-paper text-balance">
              The collection is open.{" "}
              <span className="italic font-light text-paper/80">
                Browse 117 plants.
              </span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="press inline-flex items-center gap-2 rounded-full bg-paper text-forest px-5 py-3 text-[0.92rem] font-medium hover:bg-mist transition-colors"
            >
              Browse plants
              <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
            </Link>
            <Link
              href="/care"
              className="press inline-flex items-center gap-2 rounded-full border border-paper/40 text-paper px-5 py-3 text-[0.92rem] font-medium hover:bg-paper/10 transition-colors"
            >
              Plant care guides
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

const VALUES = [
  {
    icon: Leaf,
    title: "Hand-grown, not flipped.",
    body: "Every plant we sell was potted, grown, and watered by us. Not bought-in from a wholesaler and rebadged. You see what we see.",
  },
  {
    icon: Truck,
    title: "Shipping at actual cost.",
    body: "USPS within the USA. We charge what the post office charges. No inflated handling fees, no rounding up.",
  },
  {
    icon: ShieldCheck,
    title: "Lively or replaced.",
    body: "If a plant arrives unwell. Wilted that won't recover, broken in transit. We make it right. No long forms, no fight.",
  },
] as const;
