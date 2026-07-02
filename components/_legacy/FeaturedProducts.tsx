"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "./ProductCard";
import { products } from "@/data/products";

export function FeaturedProducts() {
  const featured = products.slice(0, 6);

  return (
    <section className="section-padding bg-garden-white">
      <div className="container-site">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm font-medium uppercase tracking-widest text-leaf-400">
            Our Collection
          </p>
          <h2 className="mt-3 text-4xl font-semibold text-charcoal md:text-5xl text-balance">
            Flowering favorites
          </h2>
          <p className="mt-4 text-charcoal-muted text-lg">
            Choose from our most-loved live flowering starter plants. Each
            arrives in a 4-inch pot, ready to grow.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>

        <div className="mt-14 text-center">
          <Button asChild size="lg" variant="outline" className="gap-2">
            <Link href="/shop">
              View All Flowering Plants
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
