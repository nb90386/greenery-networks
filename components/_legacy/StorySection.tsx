"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function StorySection() {
  return (
    <section className="section-padding bg-gradient-to-b from-sage-50/30 to-garden-white overflow-hidden">
      <div className="container-site grid gap-10 lg:grid-cols-2 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="relative order-2 lg:order-1"
        >
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-3xl shadow-soft-xl">
              {/* Decorative botanical background */}
              <div className="absolute inset-0 bg-gradient-to-br from-sage-200/60 via-petal-100/40 to-sky-100/60" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center px-8">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/60 backdrop-blur-sm shadow-soft-md">
                    <svg className="h-10 w-10 text-moss" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 7.5a4.5 4.5 0 1 1 4.5 4.5M12 7.5A4.5 4.5 0 1 0 7.5 12M12 7.5V9m-4.5 3a4.5 4.5 0 1 1 4.5 4.5M7.5 12H9m3 4.5a4.5 4.5 0 1 1 4.5-4.5M12 16.5V15m4.5-3a4.5 4.5 0 1 0-4.5-4.5M16.5 12H15" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </div>
                  <p className="font-serif text-2xl text-charcoal">
                    Rooted in a love for flowers
                  </p>
                  <p className="mt-2 text-charcoal-muted text-sm">
                    From our nursery to your garden
                  </p>
                </div>
              </div>
            </div>
            {/* Decorative accent */}
            <div className="absolute -bottom-3 -right-3 h-24 w-24 rounded-2xl bg-petal-200/40 -z-10" />
            <div className="absolute -top-3 -left-3 h-16 w-16 rounded-2xl bg-sage-200/40 -z-10" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="order-1 lg:order-2"
        >
          <p className="text-sm font-medium uppercase tracking-widest text-petal-400">
            Our story
          </p>
          <h2 className="mt-3 text-4xl font-semibold text-charcoal md:text-5xl text-balance">
            Rooted in a love for flowers
          </h2>
          <p className="mt-5 text-charcoal-muted leading-relaxed text-lg">
            Greenery Networks started from a passion for gardening and a desire
            to share the beauty of colorful flowering plants with gardeners
            everywhere. We believe every garden deserves more color, and every
            gardener deserves plants that arrive healthy and ready to grow.
          </p>
          <p className="mt-4 text-charcoal-muted leading-relaxed">
            From our nursery to your garden, we pack each order with care so
            your new plants arrive in great shape, ready to bloom.
          </p>
          <div className="mt-8">
            <Button asChild className="gap-2">
              <Link href="/about">
                Learn More About Us
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
