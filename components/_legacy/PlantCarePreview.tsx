"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Droplets, Sun, Scissors, Flower2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const tips = [
  {
    icon: Droplets,
    title: "Watering",
    desc: "Keep soil moist and water when the top inch feels dry.",
    color: "text-sky-500",
    bg: "bg-sky-100",
  },
  {
    icon: Sun,
    title: "Sunlight",
    desc: "Most flowering plants love full sun. 6+ hours of direct light is ideal.",
    color: "text-amber-600",
    bg: "bg-amber-100",
  },
  {
    icon: Scissors,
    title: "Deadheading",
    desc: "Remove spent blooms to encourage more flowers through the season.",
    color: "text-petal-500",
    bg: "bg-blush",
  },
  {
    icon: Flower2,
    title: "Fertilizer",
    desc: "Fertilize once a month during the growing season for best color.",
    color: "text-leaf-500",
    bg: "bg-sage-100",
  },
];

export function PlantCarePreview() {
  return (
    <section className="section-padding bg-white">
      <div className="container-site">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm font-medium uppercase tracking-widest text-sky-500">
            Plant care
          </p>
          <h2 className="mt-3 text-4xl font-semibold text-charcoal md:text-5xl text-balance">
            Simple care for colorful blooms
          </h2>
          <p className="mt-4 text-charcoal-muted text-lg">
            A few easy habits will keep your flowering plants thriving all
            season long.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {tips.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-sage-200/50 bg-garden-white p-6 card-hover"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${t.bg} ${t.color}`}
              >
                <t.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-serif text-xl text-charcoal">{t.title}</h3>
              <p className="mt-2 text-sm text-charcoal-muted leading-relaxed">{t.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild variant="outline" className="gap-2">
            <Link href="/plant-care">
              More Plant Care Tips
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
