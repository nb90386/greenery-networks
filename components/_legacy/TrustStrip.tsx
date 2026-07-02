"use client";

import { motion } from "framer-motion";
import { Truck, ShieldCheck, DollarSign, Flower2 } from "lucide-react";

const items = [
  {
    icon: Flower2,
    title: "Live plants shipped with care",
    desc: "Healthy starter plants in 4-inch pots",
    color: "text-petal-500",
    bg: "bg-blush",
  },
  {
    icon: Truck,
    title: "USPS shipping across the USA",
    desc: "Carefully packed and delivered to your door",
    color: "text-sky-500",
    bg: "bg-sky-100",
  },
  {
    icon: DollarSign,
    title: "Transparent pricing",
    desc: "$12 per plant, no hidden fees",
    color: "text-leaf-500",
    bg: "bg-sage-100",
  },
  {
    icon: ShieldCheck,
    title: "Secure checkout",
    desc: "Your order is protected from click to delivery",
    color: "text-soil",
    bg: "bg-soil/10",
  },
];

export function TrustStrip() {
  return (
    <section className="border-y border-sage-200/40 bg-white/60 backdrop-blur-sm">
      <div className="container-site py-12 lg:py-16">
        <div className="grid grid-cols-2 gap-6 lg:gap-8 lg:grid-cols-4">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex items-start gap-3 sm:gap-4"
            >
              <div
                className={`flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl ${item.bg} ${item.color}`}
              >
                <item.icon className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div>
                <p className="font-medium text-charcoal text-sm sm:text-base">
                  {item.title}
                </p>
                <p className="text-xs sm:text-sm text-charcoal-muted mt-0.5">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
