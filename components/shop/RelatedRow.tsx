import Link from "next/link";
import { PlantImage } from "@/components/site/PlantImage";
import type { Product } from "@/data/products";

export function RelatedRow({ items }: { items: Product[] }) {
  if (items.length === 0) return null;
  return (
    <section className="mt-20 lg:mt-28">
      <header className="flex items-end justify-between gap-4 mb-8">
        <div>
          <p className="eyebrow text-sage-deep">From the same collection</p>
          <h2 className="mt-2 text-3xl sm:text-4xl text-balance">
            You may also like.
          </h2>
        </div>
      </header>
      <ul className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 lg:gap-x-5">
        {items.map((p) => (
          <li key={p.id} className="group">
            <Link
              href={`/shop/${p.slug}`}
              className="block focus:outline-none"
              aria-label={`${p.displayName} . $${p.price}`}
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden ring-1 ring-forest/8 bg-paper shadow-soft">
                <div className="absolute inset-0 scale-[1.22] origin-top transition-transform duration-[900ms] ease-[var(--ease-out-strong)] group-hover:scale-[1.32]">
                  <PlantImage src={p.image} alt={p.name} fill sizes="(min-width: 1024px) 22vw, 48vw" cropCaption={false} />
                </div>
              </div>
              <div className="mt-3 flex items-baseline justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-mono text-[0.66rem] tracking-[0.18em] uppercase text-forest/55">
                    Nº {p.id}
                  </p>
                  <p className="mt-1 font-display text-[1.05rem] leading-tight text-forest truncate">
                    {p.name}
                  </p>
                </div>
                <span className="shrink-0 text-forest font-medium text-[0.9rem] tabular-nums">
                  ${p.price}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
