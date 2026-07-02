"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type PlantImageProps = Omit<ImageProps, "src"> & {
  src: string;
  alt: string;
  /** When true, crop the bottom 18% of the source so a baked-in caption stays
   *  hidden but a sub-200px (mini-card) crop still feels balanced. */
  cropCaption?: boolean;
  wrapperClassName?: string;
};

/**
 * next/image with a botanical fallback. If the source 404s, we swap in a
 * sage-on-paper SVG with the sprout glyph so the layout never breaks.
 */
export function PlantImage({
  src,
  alt,
  cropCaption = true,
  className,
  wrapperClassName,
  ...rest
}: PlantImageProps) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        className={cn(
          "absolute inset-0 grid place-items-center bg-mist text-sage-deep",
          wrapperClassName,
        )}
        aria-label={alt}
      >
        <FallbackGlyph />
      </div>
    );
  }

  if (cropCaption) {
    return (
      <div className={cn("absolute inset-0", wrapperClassName)}>
        <div className="absolute inset-0 scale-[1.22] origin-top">
          <Image
            src={src}
            alt={alt}
            className={cn("object-cover object-top", className)}
            onError={() => setErrored(true)}
            {...rest}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={cn("absolute inset-0", wrapperClassName)}>
      <Image
        src={src}
        alt={alt}
        className={cn("object-cover", className)}
        onError={() => setErrored(true)}
        {...rest}
      />
    </div>
  );
}

function FallbackGlyph() {
  return (
    <svg
      width="44%"
      viewBox="0 0 120 120"
      role="img"
      aria-hidden
      className="opacity-60"
    >
      <g fill="currentColor">
        <path
          d="M60 110 V52"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <path d="M60 70 C 36 70, 18 58, 16 32 C 36 30, 54 42, 60 70 Z" opacity="0.88" />
        <path d="M60 56 C 84 56, 102 42, 104 18 C 84 18, 66 32, 60 56 Z" />
        <circle cx="60" cy="110" r="3" opacity="0.55" />
      </g>
    </svg>
  );
}
