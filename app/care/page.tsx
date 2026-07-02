import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sprout } from "lucide-react";
import { PlantImage } from "@/components/site/PlantImage";
import { PageHero } from "@/components/content/PageHero";
import { CareAttributeList } from "@/components/content/CareAttributeList";
import { CARE_BY_TYPE, type TypeKey } from "@/data/products";

export const metadata: Metadata = {
  title: "Plant care · Grow confidently",
  description:
    "Plant care guides for the Greenery Networks collection. Regal pelargoniums, Philippine violets (Barleria), and scented geraniums. Hand-written, plain-English, grown-into.",
};

type Guide = {
  type: TypeKey;
  slug: string;
  title: string;
  collection: string;
  eyebrow: string;
  blurb: string;
  cover: string;
  coverAlt: string;
  tips: string[];
  troubleshoot: Array<{ q: string; a: string }>;
};

const GUIDES: Guide[] = [
  {
    type: "pelargonium",
    slug: "pelargoniums",
    title: "Regal & zonal pelargoniums",
    collection: "/shop",
    eyebrow: "Care guide · 01",
    blurb:
      "The colorful workhorses of the collection. They reward a small amount of attention with a long, generous bloom. Three seasons a year in warm climates.",
    cover: "/images/plants/021.jpg",
    coverAlt: "A Soft Red regal pelargonium in full bloom",
    tips: [
      "Pinch off spent flower heads at the base of the stem to push a new flush.",
      "A monthly half-strength bloom fertilizer keeps the color saturated.",
      "If foliage looks tired in midsummer, lightly shape. They bounce back fast.",
    ],
    troubleshoot: [
      {
        q: "Leaves are yellowing.",
        a: "Usually too much water. Let the top inch of soil dry between drinks; pelargoniums prefer a thirsty schedule.",
      },
      {
        q: "Lots of leaves, few flowers.",
        a: "Move to a brighter spot. They need 4 to 6 hours of direct sun. Cut back nitrogen-heavy feed for a few weeks.",
      },
      {
        q: "Stems look leggy.",
        a: "Pinch the growing tips back by a third. They'll branch and refill the silhouette within 3 to 4 weeks.",
      },
    ],
  },
  {
    type: "barleria",
    slug: "barleria",
    title: "Philippine violets (Barleria)",
    collection: "/collections/barleria",
    eyebrow: "Care guide · 02",
    blurb:
      "Tropical, shade-tolerant, and quietly dramatic. Five rare varieties in the collection. Small in a 4-inch pot, generous as a mature shrub.",
    cover: "/images/plants/001.jpg",
    coverAlt: "A Blue Barleria (Philippine violet) in bloom",
    tips: [
      "Happiest in bright shade or filtered morning sun. Harsh midday light bleaches the blooms.",
      "Keep soil consistently moist. Barleria don't like to fully dry out the way pelargoniums do.",
      "Cut back by a third in early spring to encourage a fuller, bushier shape.",
    ],
    troubleshoot: [
      {
        q: "No flowers yet.",
        a: "First-year plants put energy into roots. Most of our Barleria starters bloom in late summer of year one and explode in year two.",
      },
      {
        q: "Leaves look pale.",
        a: "Often a sign of low nutrients. A balanced 10-10-10 monthly fertilizer through the growing season fixes it within a few weeks.",
      },
    ],
  },
  {
    type: "scented",
    slug: "scented",
    title: "Scented geraniums",
    collection: "/collections/scented",
    eyebrow: "Care guide · 03",
    blurb:
      "Grown more for their fragrance than their flowers. Brush past on the way out the door. Citrus, mint, rose, depending on the variety.",
    cover: "/images/plants/039.jpg",
    coverAlt: "A scented geranium with citronella fragrance",
    tips: [
      "Place near a path, doorway, or seating so you'll bump the foliage often. That's what releases the oils.",
      "Drought-tolerant once established. Underwater rather than over.",
      "Pinch frequently. Every snip becomes new growth, which means more scent.",
    ],
    troubleshoot: [
      {
        q: "The scent is faint.",
        a: "Foliage scent strengthens with sun and warmth. A few weeks in 4+ hours of direct light deepens the aromatic oils noticeably.",
      },
      {
        q: "Stems are getting woody.",
        a: "Normal at the base; the plant is maturing. Light pruning each spring keeps the upper growth fresh and lush.",
      },
    ],
  },
];

export default function CarePage() {
  return (
    <>
      <PageHero
        eyebrow="Plant care · 117 varieties"
        title={
          <>
            Grow{" "}
            <span className="italic font-light text-sage-deep">confidently.</span>
          </>
        }
        body="Hand-written care notes for the three plant families in our collection. Written the same way we explain them to friends. Skim the section that fits your plant; deeper care cards ship in every box."
      />

      {/* Sticky nav of guides */}
      <nav
        aria-label="Care guides"
        className="sticky top-16 lg:top-20 z-30 bg-paper/85 backdrop-blur-xl border-y border-line"
      >
        <div className="container-site flex items-center gap-2 overflow-x-auto py-3 scrollbar-hide">
          <span className="font-mono text-[0.66rem] tracking-[0.18em] uppercase text-forest/55 shrink-0">
            Jump to
          </span>
          {GUIDES.map((g, i) => (
            <a
              key={g.slug}
              href={`#${g.slug}`}
              className="press inline-flex items-center gap-1.5 rounded-full bg-paper border border-line px-3.5 py-1.5 text-[0.86rem] font-medium text-forest hover:border-forest/35 transition-colors shrink-0"
            >
              <span className="font-mono text-[0.66rem] text-sage-deep">
                {String(i + 1).padStart(2, "0")}
              </span>
              {g.title}
            </a>
          ))}
        </div>
      </nav>

      {GUIDES.map((g, i) => (
        <article
          key={g.slug}
          id={g.slug}
          className="relative py-20 lg:py-28 scroll-mt-32"
        >
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-start">
              {/* Photo */}
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden ring-1 ring-forest/8 bg-mist">
                <PlantImage
                  src={g.cover}
                  alt={g.coverAlt}
                  fill
                  sizes="(min-width: 1024px) 45vw, 95vw"
                />
              </div>

              {/* Copy */}
              <div className="lg:sticky lg:top-32">
                <p className="eyebrow text-sage-deep">{g.eyebrow}</p>
                <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[3rem] leading-[1.06] text-balance">
                  {g.title}
                </h2>
                <p className="mt-5 text-[1.02rem] leading-relaxed text-forest/75 max-w-prose">
                  {g.blurb}
                </p>

                <div className="mt-8 rounded-3xl bg-paper border border-line shadow-soft p-6 lg:p-7">
                  <p className="eyebrow text-sage-deep">At a glance</p>
                  <div className="mt-5">
                    <CareAttributeList care={CARE_BY_TYPE[g.type]} />
                  </div>
                </div>
              </div>
            </div>

            {/* Tips & troubleshoot. Full-width below */}
            <div className="mt-14 lg:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <section>
                <p className="eyebrow text-sage-deep">Field notes</p>
                <h3 className="mt-2 text-2xl text-forest">A few things that make a difference.</h3>
                <ul className="mt-5 space-y-3">
                  {g.tips.map((t, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 rounded-2xl bg-mist/60 border border-line p-4"
                    >
                      <span className="grid place-items-center h-7 w-7 rounded-full bg-paper text-sage-deep shrink-0">
                        <Sprout className="h-3.5 w-3.5" strokeWidth={1.7} />
                      </span>
                      <p className="text-[0.95rem] leading-relaxed text-forest">{t}</p>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <p className="eyebrow text-sage-deep">If something looks off</p>
                <h3 className="mt-2 text-2xl text-forest">Quick fixes.</h3>
                <dl className="mt-5 divide-y divide-line border-y border-line">
                  {g.troubleshoot.map(({ q, a }, idx) => (
                    <div key={idx} className="py-4">
                      <dt className="font-display text-[1.05rem] text-forest leading-tight">
                        {q}
                      </dt>
                      <dd className="mt-2 text-[0.95rem] text-forest/75 leading-relaxed">
                        {a}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            </div>

            <Link
              href={g.collection}
              className="press group mt-10 inline-flex items-center gap-2 rounded-full bg-forest text-paper px-5 py-3 text-[0.9rem] font-medium hover:bg-forest-dark transition-colors"
            >
              Shop the {g.title.toLowerCase()} collection
              <ArrowRight
                className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5"
                strokeWidth={1.8}
              />
            </Link>
          </div>

          {/* Divider between guides. Botanical sweep */}
          {i < GUIDES.length - 1 && (
            <div className="mt-20 lg:mt-28 container-site">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-line to-transparent" />
            </div>
          )}
        </article>
      ))}

      {/* Final CTA strip */}
      <section className="relative py-20 lg:py-24 bg-forest-dark text-paper isolate overflow-hidden">
        <div className="absolute inset-0 grain pointer-events-none" />
        <div className="container-site relative grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
          <div>
            <p className="eyebrow text-paper/65">Care promise</p>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[2.6rem] leading-[1.06] text-paper text-balance">
              We grew it.{" "}
              <span className="italic font-light text-paper/80">
                We&apos;ll help you keep it.
              </span>
            </h2>
            <p className="mt-5 max-w-md text-[1rem] leading-relaxed text-paper/75">
              If something looks off in the first 14 days, email us. We&apos;ll
              walk through it with you. Most plant questions have a quick,
              non-dramatic answer.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="press inline-flex items-center gap-2 rounded-full bg-paper text-forest px-5 py-3 text-[0.92rem] font-medium hover:bg-mist transition-colors"
            >
              Ask a question
            </Link>
            <Link
              href="/shop"
              className="press inline-flex items-center gap-2 rounded-full border border-paper/40 text-paper px-5 py-3 text-[0.92rem] font-medium hover:bg-paper/10 transition-colors"
            >
              Browse plants
              <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
