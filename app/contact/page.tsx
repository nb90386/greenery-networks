import type { Metadata } from "next";
import Link from "next/link";
import {
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { PageHero } from "@/components/content/PageHero";
import { ContactForm } from "@/components/content/ContactForm";

export const metadata: Metadata = {
  title: "Contact · Greenery Networks",
  description:
    "Email greenerynetworks@gmail.com. Plant care questions, order help, or anything else. USA service area, one-business-day reply.",
};

const EMAIL = "greenerynetworks@gmail.com";

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Talk to us about{" "}
            <span className="italic font-light text-sage-deep">
              your plant.
            </span>
          </>
        }
        body="Plant care questions, an order that needs attention, or just hello. We read every note. Most replies land within one business day."
      />

      <section className="relative py-16 lg:py-24">
        <div className="container-site grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-start">
          {/* Left. Contact card stack */}
          <div className="space-y-5">
            <a
              href={`mailto:${EMAIL}`}
              className="group block rounded-3xl bg-paper border border-line shadow-soft p-7 lift"
            >
              <span className="grid place-items-center h-10 w-10 rounded-full bg-mist text-forest">
                <Mail className="h-[18px] w-[18px]" strokeWidth={1.6} />
              </span>
              <p className="eyebrow text-sage-deep mt-5">Email</p>
              <p className="mt-2 font-display text-2xl text-forest leading-tight break-words">
                {EMAIL}
              </p>
              <p className="mt-3 text-[0.86rem] text-forest/65 leading-relaxed">
                The fastest way to reach us. Include your order number if it&apos;s about a shipment.
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[0.82rem] font-medium text-forest group-hover:text-forest-dark transition-colors">
                Open in mail
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5" strokeWidth={1.8} />
              </span>
            </a>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <InfoCard
                icon={MapPin}
                label="Service area"
                title="USA only"
                body="Continental USA, Hawaii, and Alaska. Shipped USPS."
              />
              <InfoCard
                icon={Clock}
                label="Hours"
                title="One business day"
                body="We answer notes Monday-Friday, mornings first."
              />
              <InfoCard
                icon={ShieldCheck}
                label="Order help"
                title="Hand packed with care"
                body="If something looks off when you open the box, send us a photo and we will help sort it out."
              />
              <InfoCard
                icon={Mail}
                label="Wholesale"
                title="Get in touch"
                body="Small-batch wholesale inquiries welcome. Drop us a line."
              />
            </div>

            <p className="text-[0.78rem] text-forest/55 leading-snug pt-2">
              We&apos;re online-only. No physical retail location and no
              third-party marketplaces.
            </p>
          </div>

          {/* Right. Form */}
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow text-sage-deep">Or send a note here</p>
            <h2 className="mt-3 text-3xl sm:text-4xl text-balance leading-[1.06]">
              Write us directly.
            </h2>
            <p className="mt-5 max-w-md text-forest/70 leading-relaxed">
              Goes to the same inbox. Pick the topic that fits and we&apos;ll
              route it accordingly.
            </p>
            <div className="mt-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Quick links band */}
      <section className="relative py-16 lg:py-20 bg-mist/45 border-t border-line">
        <div className="container-site grid grid-cols-1 md:grid-cols-3 gap-5">
          <QuickLink
            href="/care"
            eyebrow="Before you write"
            title="Plant care guides"
            body="Three editorial guides covering pelargoniums, Barleria, and scented geraniums."
          />
          <QuickLink
            href="/shipping"
            eyebrow="About your order"
            title="Shipping & arrival"
            body="USPS shipping at actual cost, how orders are packed, and how to reach us."
          />
          <QuickLink
            href="/shop"
            eyebrow="Looking around"
            title="Browse the collection"
            body="117 live flowering starter plants, hand-grown, $12 each."
          />
        </div>
      </section>
    </>
  );
}

function InfoCard({
  icon: Icon,
  label,
  title,
  body,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-3xl bg-paper border border-line p-6 lift">
      <span className="grid place-items-center h-9 w-9 rounded-full bg-mist text-forest">
        <Icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
      </span>
      <p className="eyebrow text-sage-deep mt-4">{label}</p>
      <p className="mt-1 font-display text-[1.2rem] text-forest leading-tight">{title}</p>
      <p className="mt-2 text-[0.86rem] text-forest/65 leading-snug">{body}</p>
    </div>
  );
}

function QuickLink({
  href,
  eyebrow,
  title,
  body,
}: {
  href: string;
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <Link
      href={href}
      className="group block rounded-3xl bg-paper border border-line p-6 lift"
    >
      <p className="eyebrow text-sage-deep">{eyebrow}</p>
      <p className="mt-2 font-display text-[1.4rem] text-forest leading-tight group-hover:text-forest-dark transition-colors">
        {title}
      </p>
      <p className="mt-2 text-[0.92rem] text-forest/70 leading-relaxed">{body}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-[0.82rem] font-medium text-forest">
        Open
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5" strokeWidth={1.8} />
      </span>
    </Link>
  );
}
