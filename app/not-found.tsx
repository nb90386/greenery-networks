import Link from "next/link";
import { ArrowRight, Sprout } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative pt-32 lg:pt-40 pb-32 min-h-[80vh] bg-botanical-veil grain isolate overflow-hidden">
      <div className="container-site max-w-2xl">
        <Sprout className="h-10 w-10 text-sage-deep" strokeWidth={1.7} />
        <p className="eyebrow text-sage-deep mt-6">404 . page not found</p>
        <h1 className="mt-3 text-5xl sm:text-6xl lg:text-[4.5rem] leading-[1.02] text-balance">
          This plant{" "}
          <span className="italic font-light text-sage-deep">
            has not sprouted yet.
          </span>
        </h1>
        <p className="mt-6 text-[1.05rem] leading-relaxed text-forest/75 max-w-lg">
          We could not find the page you were looking for. Take a peek at the
          collection, ask us anything, or head back to the garden.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link
            href="/"
            className="press inline-flex items-center gap-2 rounded-full bg-forest text-paper px-5 py-3 text-[0.92rem] font-medium hover:bg-forest-dark transition-colors"
          >
            Back to the garden
            <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
          </Link>
          <Link
            href="/shop"
            className="press inline-flex items-center gap-2 rounded-full bg-paper text-forest border border-forest/15 px-5 py-3 text-[0.92rem] font-medium hover:border-forest/35 transition-colors"
          >
            Browse the collection
          </Link>
          <Link
            href="/contact"
            className="press inline-flex items-center gap-2 rounded-full bg-paper text-forest border border-forest/15 px-5 py-3 text-[0.92rem] font-medium hover:border-forest/35 transition-colors"
          >
            Ask us
          </Link>
        </div>
      </div>
    </section>
  );
}
