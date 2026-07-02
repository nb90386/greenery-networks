"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Flower2, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/plant-care", label: "Plant Care" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "glass border-b border-sage-200/40 shadow-soft-sm"
          : "bg-transparent"
      )}
    >
      <div className="container-site flex h-16 items-center justify-between lg:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group relative z-10">
          <motion.span
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-leaf-400 to-moss text-white shadow-soft-md"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Flower2 className="h-5 w-5" />
          </motion.span>
          <span className="font-serif text-xl tracking-tight">
            <span className="text-charcoal">Greenery</span>{" "}
            <span className="text-moss">Networks</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => {
            const isActive = pathname === l.href || pathname.startsWith(l.href + "/");
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors rounded-full",
                  isActive
                    ? "text-moss"
                    : "text-charcoal-muted hover:text-charcoal"
                )}
              >
                {l.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded-full bg-sage-100 -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <Button asChild size="sm" className="hidden lg:inline-flex gap-2">
            <Link href="/shop">
              <ShoppingBag className="h-4 w-4" />
              Shop Plants
            </Link>
          </Button>

          {/* Mobile menu button */}
          <button
            aria-label="Toggle menu"
            className="lg:hidden relative z-10 p-2 rounded-xl hover:bg-sage-100 text-charcoal transition-colors cursor-pointer"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden border-t border-sage-200/40"
          >
            <nav className="glass py-4 flex flex-col">
              <div className="container-site flex flex-col gap-1">
                {links.map((l, i) => (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={l.href}
                      className={cn(
                        "block px-4 py-3 rounded-xl text-base font-medium transition-colors",
                        pathname === l.href
                          ? "bg-sage-100 text-moss"
                          : "text-charcoal hover:bg-sage-50"
                      )}
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
                <div className="mt-3 pt-3 border-t border-sage-200/40">
                  <Button asChild className="w-full">
                    <Link href="/shop">
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Shop Flowering Plants
                    </Link>
                  </Button>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
