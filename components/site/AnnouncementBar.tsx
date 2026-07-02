"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Link from "next/link";

/**
 * Slim seasonal announcement bar at the very top of the site.
 * Edit `MESSAGE` and `CTA` in one place. Set `MESSAGE` to null to hide.
 * Dismissal is remembered in localStorage per message so repeat visitors are
 * not nagged.
 */
const MESSAGE = "Summer batch just potted up. New colors ship every Tuesday.";
const CTA: { label: string; href: string } | null = {
  label: "Shop new colors",
  href: "/shop",
};

const STORAGE_KEY = "gn:announcement:v2";

export function AnnouncementBar() {
  // Start hidden so SSR and initial hydration agree, then decide once mounted.
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    if (!MESSAGE) return;
    try {
      const dismissed = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (dismissed !== MESSAGE) setVisible(true);
    } catch {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
    }
  }, []);

  // Publish a CSS variable so the fixed SiteHeader can offset by our height.
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--gn-ann-h", visible ? "36px" : "0px");
    return () => {
      root.style.setProperty("--gn-ann-h", "0px");
    };
  }, [visible]);

  if (!MESSAGE || !visible) return null;

  function dismiss() {
    try {
      window.localStorage.setItem(STORAGE_KEY, MESSAGE);
    } catch {
      /* noop */
    }
    setVisible(false);
  }

  return (
    <div
      role="region"
      aria-label="Seasonal announcement"
      className="fixed top-0 inset-x-0 z-[55] bg-forest text-paper"
    >
      <div className="container-site flex items-center justify-center gap-4 py-2 text-[0.82rem]">
        <p className="text-center">
          {MESSAGE}
          {CTA && (
            <>
              {" "}
              <Link
                href={CTA.href}
                className="underline underline-offset-4 hover:text-mist transition-colors"
              >
                {CTA.label}
              </Link>
            </>
          )}
        </p>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss announcement"
          className="press ml-2 grid place-items-center h-6 w-6 rounded-full text-paper/70 hover:text-paper hover:bg-paper/10 transition-colors"
        >
          <X className="h-3.5 w-3.5" strokeWidth={1.8} />
        </button>
      </div>
    </div>
  );
}
