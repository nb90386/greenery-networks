"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Flower2, Truck, Heart, Leaf } from "lucide-react";

const reasons = [
  {
    icon: Flower2,
    title: "Curated colorful flowering plants",
    desc: "We select varieties for vivid color, healthy growth, and reliable performance in warm gardens.",
    color: "text-petal-500",
    bg: "bg-blush",
  },
  {
    icon: Leaf,
    title: "Starter plants in 4-inch pots",
    desc: "Easy to plant, easy to grow. Each arrives at the perfect stage for transplanting into your garden.",
    color: "text-leaf-500",
    bg: "bg-sage-100",
  },
  {
    icon: Truck,
    title: "Carefully packed and shipped via USPS",
    desc: "Every order is packed to arrive healthy, then shipped within the USA with tracking.",
    color: "text-sky-500",
    bg: "bg-sky-100",
  },
  {
    icon: Heart,
    title: "Grown and packed with real care",
    desc: "This is a real nursery, not a dropshipper. Our team tends, inspects, and packs every plant.",
    color: "text-soil",
    bg: "bg-soil/10",
  },
];

export function WhyChooseUs() {
  return (
    <section className="section-padding bg-white">
      <div className="container-site grid gap-12 lg:grid-cols-2 items-center">
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-leaf-400">
            Why gardeners choose us
          </p>
          <h2 className="mt-3 text-4xl font-semibold text-charcoal md:text-5xl text-balance">
            Why Greenery Networks?
          </h2>
          <p className="mt-4 text-charcoal-muted max-w-xl text-lg">
            We are a small, focused nursery that ships colorful live plants
            across the USA. No dropshipping, no fake reviews, no shortcuts.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {reasons.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl border border-sage-200/50 bg-garden-white p-5 card-hover"
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${r.bg} ${r.color}`}
                >
                  <r.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-3 font-serif text-lg text-charcoal">
                  {r.title}
                </h3>
                <p className="mt-1.5 text-sm text-charcoal-muted leading-relaxed">
                  {r.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="aspect-[4/5] overflow-hidden rounded-3xl shadow-soft-xl">
            <Image
              src="/images/about/about-plant-01.jpg"
              alt="Beautiful flowering plants in a garden"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="font-serif text-2xl text-white drop-shadow-lg">
                A curated nursery for colorful gardens
              </p>
              <p className="mt-2 text-white/80 text-sm">
                Every plant is chosen with care and shipped with love.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
