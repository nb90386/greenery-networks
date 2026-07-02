"use client";

import { useState } from "react";
import { PlantImage } from "@/components/site/PlantImage";
import { cn } from "@/lib/utils";

export function PDPGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [index, setIndex] = useState(0);
  const list = images.length > 0 ? images : [images[0]!];

  return (
    <div className="flex flex-col gap-4">
      {/* Main */}
      <div className="relative aspect-[4/5] rounded-3xl overflow-hidden ring-1 ring-forest/8 bg-mist">
        <PlantImage
          src={list[index]!}
          alt={alt}
          fill
          priority
          sizes="(min-width: 1024px) 45vw, 95vw"
        />
      </div>

      {/* Thumbs (only if more than one image) */}
      {list.length > 1 && (
        <ul className="grid grid-cols-5 gap-2">
          {list.map((src, i) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show image ${i + 1}`}
                aria-pressed={i === index}
                className={cn(
                  "press relative block aspect-square w-full rounded-xl overflow-hidden",
                  "ring-1 transition-[box-shadow,outline,ring] duration-200",
                  i === index
                    ? "ring-forest"
                    : "ring-forest/10 hover:ring-forest/30",
                )}
              >
                <PlantImage src={src} alt="" fill sizes="100px" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
