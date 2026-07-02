"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Product } from "@/data/products";

const colorMap: Record<string, { overlay: string; accent: string }> = {
  pink: { overlay: "from-petal-200/20", accent: "text-petal-500" },
  sky: { overlay: "from-sky-200/20", accent: "text-sky-500" },
  amber: { overlay: "from-amber-200/20", accent: "text-amber-600" },
  violet: { overlay: "from-purple-200/20", accent: "text-purple-500" },
  magenta: { overlay: "from-fuchsia-200/20", accent: "text-fuchsia-500" },
  peach: { overlay: "from-orange-200/20", accent: "text-orange-500" },
  white: { overlay: "from-gray-200/20", accent: "text-gray-500" },
};

export function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const colors = colorMap[product.color] ?? colorMap.pink;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group"
    >
      <Link
        href={`/products/${product.slug}`}
        className="block rounded-2xl border border-sage-200/50 bg-white shadow-soft-sm transition-all duration-300 hover:shadow-soft-xl hover:-translate-y-1.5 overflow-hidden"
      >
        {/* Image container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-sage-50 to-blush">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Quick view button on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-sm px-4 py-2 text-sm font-medium text-charcoal shadow-soft-md">
              <Eye className="h-4 w-4" />
              View Plant
            </span>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            <Badge variant="default" className="shadow-soft-sm">
              Zone {product.zone}
            </Badge>
          </div>
          <div className="absolute top-3 right-3">
            <Badge variant="pink" className="shadow-soft-sm font-semibold">
              ${product.price}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-serif text-lg font-semibold text-charcoal group-hover:text-moss transition-colors">
            {product.name}
          </h3>
          <p className="mt-1.5 text-sm text-charcoal-muted line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                4-inch pot
              </Badge>
              <span className="text-xs text-charcoal-muted">
                {product.stock} available
              </span>
            </div>
          </div>

          {/* CTA — always visible on mobile, enhanced on hover for desktop */}
          <div className="mt-4">
            <Button
              size="sm"
              className="w-full gap-2 transition-all duration-300"
            >
              <ShoppingBag className="h-4 w-4" />
              Add to Cart
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
