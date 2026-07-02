"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Real plant images for the gallery grid
const galleryImages = [
  { src: "/images/plants/products/plant-12.jpg", alt: "Colorful flowering plant" },
  { src: "/images/plants/products/plant-18.jpg", alt: "Vibrant garden blooms" },
  { src: "/images/plants/products/plant-24.jpg", alt: "Flowering starter plant" },
  { src: "/images/plants/products/plant-30.jpg", alt: "Colorful garden flowers" },
  { src: "/images/plants/products/plant-36.jpg", alt: "Blooming garden plant" },
  { src: "/images/plants/products/plant-42.jpg", alt: "Flowering plant variety" },
];

export function FlowerGallery() {
  return (
    <section className="section-padding bg-gradient-to-b from-garden-white via-sage-50/30 to-garden-white">
      <div className="container-site">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm font-medium uppercase tracking-widest text-petal-400">
            A garden of color
          </p>
          <h2 className="mt-3 text-4xl font-semibold text-charcoal md:text-5xl text-balance">
            Grown to brighten your days
          </h2>
          <p className="mt-4 text-charcoal-muted text-lg">
            Every plant is selected for vibrant color, healthy roots, and the
            joy it brings when it arrives at your door.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative aspect-square overflow-hidden rounded-2xl shadow-soft-sm hover:shadow-soft-lg transition-shadow"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
