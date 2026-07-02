"use client";

import { motion } from "framer-motion";
import { Truck, Package, MapPin, DollarSign } from "lucide-react";

const items = [
  {
    icon: MapPin,
    title: "USA shipping only",
    desc: "We currently ship within the United States only.",
    color: "text-leaf-500",
    bg: "bg-sage-100",
  },
  {
    icon: Truck,
    title: "Shipped via USPS",
    desc: "Every order is carefully packed and shipped with tracking.",
    color: "text-sky-500",
    bg: "bg-sky-100",
  },
  {
    icon: Package,
    title: "Packed with care",
    desc: "Starter plants in 4-inch pots, protected for safe transit.",
    color: "text-petal-500",
    bg: "bg-blush",
  },
  {
    icon: DollarSign,
    title: "Transparent shipping cost",
    desc: "Actual USPS rate added at checkout. No hidden fees.",
    color: "text-soil",
    bg: "bg-soil/10",
  },
];

export function ShippingClarity() {
  return (
    <section className="section-padding bg-white">
      <div className="container-site">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-sm font-medium uppercase tracking-widest text-sky-500">
            Shipping clarity
          </p>
          <h2 className="mt-3 text-4xl font-semibold text-charcoal md:text-5xl text-balance">
            Straightforward shipping, no surprises
          </h2>
          <p className="mt-4 text-charcoal-muted text-lg">
            We believe in transparency. Here is exactly how shipping works when you
            order from Greenery Networks.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-sage-200/50 bg-garden-white p-6 text-center card-hover"
            >
              <div
                className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl ${item.bg} ${item.color}`}
              >
                <item.icon className="h-7 w-7" />
              </div>
              <h3 className="mt-4 font-serif text-lg text-charcoal">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-charcoal-muted leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-charcoal-muted">
            Shipping cost is calculated at checkout based on your destination.{" "}
            <a href="/shipping" className="text-moss hover:underline">
              Read full shipping policy
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
