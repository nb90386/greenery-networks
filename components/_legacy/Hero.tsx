"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Truck, Flower2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero pt-28 pb-16 lg:pt-36 lg:pb-28">
      {/* Background decorative blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-petal-200/30 blur-[100px]" />
        <div className="absolute top-1/3 -left-32 h-[400px] w-[400px] rounded-full bg-sage-200/40 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 h-[300px] w-[300px] rounded-full bg-sky-200/30 blur-[80px]" />
      </div>

      <div className="container-site relative">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left: Text content */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-sage-200 bg-white/70 px-4 py-2 text-sm text-moss backdrop-blur-sm mb-8 shadow-soft-sm"
            >
              <Sparkles className="h-4 w-4 text-petal-400" />
              Live flowering starter plants, shipped with care
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-5xl font-semibold leading-[1.1] tracking-tight text-charcoal md:text-6xl lg:text-7xl text-balance"
            >
              Live flowering plants,{" "}
              <span className="text-gradient-brand">ready to brighten</span>{" "}
              your garden.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-xl text-lg leading-relaxed text-charcoal-muted mx-auto lg:mx-0"
            >
              Hand-selected starter plants in 4-inch pots, grown with care and
              shipped via USPS across the USA. Colorful, healthy, and ready to
              bloom.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <Button asChild size="lg" className="gap-2">
                <Link href="/shop">
                  Browse Flowering Plants
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/plant-care">Learn Plant Care</Link>
              </Button>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap items-center gap-4 justify-center lg:justify-start text-sm text-charcoal-muted"
            >
              <span className="flex items-center gap-1.5">
                <Flower2 className="h-4 w-4 text-leaf-400" />
                Live starter plants
              </span>
              <span className="text-sage-300">·</span>
              <span>4-inch pots</span>
              <span className="text-sage-300">·</span>
              <span className="flex items-center gap-1.5">
                <Truck className="h-4 w-4 text-sky-400" />
                USA shipping
              </span>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="mt-3 text-xs text-charcoal-muted/70"
            >
              USPS shipping calculated based on destination
            </motion.p>
          </motion.div>

          {/* Right: Image collage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="relative"
          >
            {/* Main hero image */}
            <div className="relative mx-auto w-full max-w-lg">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-soft-xl">
                <Image
                  src="/images/hero/hero-plant-01.jpg"
                  alt="Colorful live flowering starter plants"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Subtle overlay gradient at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-charcoal/20 to-transparent" />
              </div>

              {/* Floating card 1 */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 sm:-left-8 rounded-2xl bg-white/90 backdrop-blur-sm p-4 shadow-soft-lg border border-sage-100"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blush">
                    <Flower2 className="h-5 w-5 text-petal-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-charcoal">Starter plants</p>
                    <p className="text-xs text-charcoal-muted">4-inch pots · $12 each</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating card 2 */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 sm:-right-8 rounded-2xl bg-white/90 backdrop-blur-sm p-4 shadow-soft-lg border border-sage-100"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100">
                    <Truck className="h-5 w-5 text-sky-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-charcoal">Ships USPS</p>
                    <p className="text-xs text-charcoal-muted">USA only</p>
                  </div>
                </div>
              </motion.div>

              {/* Small accent image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="absolute top-1/2 -right-6 sm:-right-12 hidden sm:block"
              >
                <div className="h-24 w-24 overflow-hidden rounded-2xl shadow-soft-lg border-4 border-white">
                  <Image
                    src="/images/hero/hero-plant-02.jpg"
                    alt="Flowering plant detail"
                    width={96}
                    height={96}
                    className="h-full w-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
