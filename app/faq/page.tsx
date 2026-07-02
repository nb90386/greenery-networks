import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { PageHero } from "@/components/content/PageHero";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "How our plants ship, when to expect them, what to do when they arrive, and how to reach us.",
};

const FAQ: ReadonlyArray<{ q: string; a: string }> = [
  {
    q: "How do the plants ship?",
    a: "We hand pack each plant into a sturdy shipping box with the soil hydrated and the foliage supported. The box is labeled as live plants and we mostly use USPS Priority.",
  },
  {
    q: "How long does delivery take?",
    a: "Most orders ship within five business days from California. Once dropped off, USPS Priority typically takes two to three days across the USA. We hold shipping when the weather is too cold or too hot for the destination.",
  },
  {
    q: "What will my plant look like when it arrives?",
    a: "You will get a healthy starter plant in a 4 inch pot. It will not be the size of the full bloom photos on our site. Give it a few weeks in a good spot and it will settle in, root, and start to fill out.",
  },
  {
    q: "How do I care for it the day it arrives?",
    a: "Open the box upright, unwrap the plant gently, and water it lightly if the soil feels dry. Let it rest in bright indirect light for about a day before moving it into full sun.",
  },
  {
    q: "How do I water and feed it?",
    a: "Water when the top inch of soil feels dry. A balanced fertilizer once a month during the growing season keeps color and foliage lively.",
  },
  {
    q: "Do you ship internationally?",
    a: "Not yet. We ship within the USA only, including Hawaii and Alaska via USPS.",
  },
  {
    q: "How do I reach you?",
    a: "Email greenerynetworks@gmail.com. We answer most notes within one business day.",
  },
];

const JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FAQPage() {
  return (
    <>
      <PageHero
        eyebrow="Frequently asked"
        title={
          <>
            Real answers,{" "}
            <span className="italic font-light text-sage-deep">
              plain and honest.
            </span>
          </>
        }
        body="If you cannot find your answer here, email us. We read every note."
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }}
      />

      <section className="relative py-16 lg:py-24">
        <div className="container-site grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-16 items-start">
          <div>
            <p className="eyebrow text-sage-deep">Common questions</p>
            <h2 className="mt-3 text-3xl sm:text-4xl leading-[1.06] text-balance">
              Everything you might want to know before buying.
            </h2>
            <p className="mt-5 text-forest/70 leading-relaxed">
              Ordering live plants online can feel like a leap. We wrote these
              answers the same way we would if we were standing next to you at
              the greenhouse.
            </p>
            <Link
              href="/contact"
              className="press mt-8 inline-flex items-center gap-2 rounded-full bg-forest text-paper px-5 py-3 text-[0.9rem] font-medium hover:bg-forest-dark transition-colors"
            >
              <Mail className="h-4 w-4" strokeWidth={1.7} />
              Ask a different question
              <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
            </Link>
          </div>

          <dl className="divide-y divide-line border-y border-line">
            {FAQ.map((f, i) => (
              <div key={i} className="py-5">
                <dt className="font-display text-xl leading-tight text-forest">
                  {f.q}
                </dt>
                <dd className="mt-2 text-[0.98rem] leading-relaxed text-forest/75">
                  {f.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
