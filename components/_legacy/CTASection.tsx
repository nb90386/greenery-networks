"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Flower2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Rich gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-moss via-moss-light to-deep-moss dark:from-moss-dark dark:via-moss dark:to-charcoal" />
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -left-20 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-petal-300/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-leaf-400/5 blur-3xl" />
      </div>

      {/* Floating botanical accents */}
      <div className="absolute top-8 left-8 opacity-10">
        <svg className="h-24 w-24 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 7.5a4.5 4.5 0 1 1 4.5 4.5M12 7.5A4.5 4.5 0 1 0 7.5 12M12 7.5V9m-4.5 3a4.5 4.5 0 1 1 4.5 4.5M7.5 12H9m3 4.5a4.5 4.5 0 1 1 4.5-4.5M12 16.5V15m4.5-3a4.5 4.5 0 1 0-4.5-4.5M16.5 12H15" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </div>
      <div className="absolute bottom-8 right-8 opacity-10">
        <svg className="h-20 w-20 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 7.5a4.5 4.5 0 1 1 4.5 4.5M12 7.5A4.5 4.5 0 1 0 7.5 12M12 7.5V9m-4.5 3a4.5 4.5 0 1 1 4.5 4.5M7.5 12H9m3 4.5a4.5 4.5 0 1 1 4.5-4.5M12 16.5V15m4.5-3a4.5 4.5 0 1 0-4.5-4.5M16.5 12H15" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="container-site relative text-center"
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm mb-8">
          <Flower2 className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-4xl font-semibold text-white md:text-5xl lg:text-6xl text-balance">
          Ready to add color to your garden?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/80">
          Browse our live flowering starter plants and bring home blooms
          you&apos;ll love. Each ships in a 4-inch pot, ready to grow.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="bg-white text-moss hover:bg-white/90 gap-2 shadow-soft-lg"
          >
            <Link href="/shop">
              Shop Flowering Plants Now
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-white/40 text-white hover:bg-white/10"
          >
            <Link href="/faq">Read the FAQ</Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
