"use client";

import { useMemo, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { X, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import {
  products,
  COLOR_LABEL,
  COLOR_SWATCH,
  PATTERN_LABEL,
  SIZE_LABEL,
  TYPE_LABEL,
  FLAG_LABEL,
  type ColorKey,
  type PatternKey,
  type SizeKey,
  type TypeKey,
  type Flag,
  type Product,
} from "@/data/products";
import { ProductCard } from "./ProductCard";
import { useEscape } from "@/lib/use-escape";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

type SortKey = "number" | "name" | "color";

export type ShopGridProps = {
  /** Pre-filter the catalog (used by /collections/[collection]) */
  baseProducts?: Product[];
  /** Color seed read from query string (used by /shop?color=...) */
  initialColor?: ColorKey;
  /** Heading + subhead */
  title?: string;
  eyebrow?: string;
  subtitle?: string;
  /** Show the collection switcher chips at the top */
  showCollectionsNav?: boolean;
};

const COLORS: ColorKey[] = [
  "red", "burgundy", "pink", "salmon",
  "lavender", "purple", "white", "barleria", "scented",
];
const PATTERNS: PatternKey[] = [
  "solid", "blotched", "striped", "edged", "gradient", "ruffled", "dotted",
];
const SIZES: SizeKey[] = ["standard", "mini"];
const TYPES: TypeKey[] = ["pelargonium", "barleria", "scented"];
const FLAGS: Flag[] = [
  "beginnerFriendly",
  "pollinatorFriendly",
  "patioFriendly",
  "lowMaintenance",
];

export function ShopGrid({
  baseProducts = products,
  initialColor,
  title = "All flowering plants",
  eyebrow = "Shop · 117 varieties",
  subtitle = "Live starter plants in 4-inch pots. $12 each, 5 of each in stock, shipped USPS.",
  showCollectionsNav = true,
}: ShopGridProps) {
  const [colorSel, setColorSel] = useState<Set<ColorKey>>(
    () => new Set(initialColor ? [initialColor] : []),
  );
  const [patternSel, setPatternSel] = useState<Set<PatternKey>>(new Set());
  const [sizeSel, setSizeSel] = useState<Set<SizeKey>>(new Set());
  const [typeSel, setTypeSel] = useState<Set<TypeKey>>(new Set());
  const [flagSel, setFlagSel] = useState<Set<Flag>>(new Set());
  const [sort, setSort] = useState<SortKey>("number");
  const [mobileOpen, setMobileOpen] = useState(false);
  const gridRef = useRef<HTMLUListElement>(null);

  const filtered = useMemo(() => {
    let list = baseProducts.filter((p) => {
      if (colorSel.size && !colorSel.has(p.color)) return false;
      if (patternSel.size && !patternSel.has(p.pattern)) return false;
      if (sizeSel.size && !sizeSel.has(p.size)) return false;
      if (typeSel.size && !typeSel.has(p.type)) return false;
      if (flagSel.size) {
        for (const f of flagSel) if (!p.flags.includes(f)) return false;
      }
      return true;
    });
    const colorOrder = COLORS.reduce<Record<string, number>>((m, c, i) => {
      m[c] = i;
      return m;
    }, {});
    if (sort === "number")  list = [...list].sort((a, b) => a.id.localeCompare(b.id));
    if (sort === "name")    list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "color")   list = [...list].sort(
      (a, b) => (colorOrder[a.color]! - colorOrder[b.color]!) || a.id.localeCompare(b.id),
    );
    return list;
  }, [baseProducts, colorSel, patternSel, sizeSel, typeSel, flagSel, sort]);

  /* Smooth motion on filter changes. Re-fire on every change of `filtered` */
  useGSAP(
    () => {
      const cards = gridRef.current?.querySelectorAll(".pcard");
      if (!cards) return;
      gsap.fromTo(
        cards,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: { each: 0.025, from: "start" },
          overwrite: "auto",
        },
      );
    },
    { dependencies: [filtered.length, sort, [...colorSel].join("|"), [...patternSel].join("|"), [...sizeSel].join("|"), [...typeSel].join("|"), [...flagSel].join("|")] },
  );

  const totalActive =
    colorSel.size + patternSel.size + sizeSel.size + typeSel.size + flagSel.size;

  function clearAll() {
    setColorSel(new Set());
    setPatternSel(new Set());
    setSizeSel(new Set());
    setTypeSel(new Set());
    setFlagSel(new Set());
  }

  return (
    <section className="relative pt-32 lg:pt-40 pb-24 lg:pb-32">
      <div className="container-site">
        <header className="max-w-3xl">
          <p className="eyebrow text-sage-deep">{eyebrow}</p>
          <h1 className="mt-3 text-4xl sm:text-5xl lg:text-[3.6rem] leading-[1.04] text-balance">
            {title}
          </h1>
          <p className="mt-5 text-[1.02rem] leading-relaxed text-forest/70 max-w-xl">
            {subtitle}
          </p>
        </header>

        {showCollectionsNav && (
          <CollectionsNav active={[...colorSel][0]} onSelect={(c) => {
            setColorSel(c ? new Set([c]) : new Set());
          }} />
        )}

        {/* Visual color swatch filter, complementing the text chips */}
        <div className="mt-6">
          <p className="eyebrow text-sage-deep mb-3">Shop by swatch</p>
          <ul className="flex flex-wrap items-center gap-3">
            {COLORS.map((c) => {
              const active = colorSel.has(c);
              return (
                <li key={`swatch-${c}`}>
                  <button
                    type="button"
                    onClick={() => setColorSel((s) => toggle(s, c))}
                    aria-pressed={active}
                    aria-label={`Toggle ${COLOR_LABEL[c]} filter`}
                    className={cn(
                      "press group inline-flex items-center gap-2 rounded-full pl-1 pr-3 py-1",
                      "border text-[0.82rem] font-medium",
                      "transition-[background-color,border-color,color] duration-300 ease-[var(--ease-out-strong)]",
                      active
                        ? "bg-forest text-paper border-forest"
                        : "bg-paper text-forest border-line hover:border-forest/35",
                    )}
                  >
                    <span
                      className="h-6 w-6 rounded-full ring-2 ring-paper/70"
                      style={{ backgroundColor: COLOR_SWATCH[c] }}
                    />
                    {COLOR_LABEL[c]}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Toolbar */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-line">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="press lg:hidden inline-flex items-center gap-2 rounded-full border border-line bg-paper text-forest px-3.5 py-2 text-sm hover:border-forest/30 transition-colors"
            >
              <SlidersHorizontal className="h-4 w-4" strokeWidth={1.6} />
              Filter
              {totalActive > 0 && (
                <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-forest text-paper px-1.5 text-[0.7rem] font-mono">
                  {totalActive}
                </span>
              )}
            </button>
            <p className="text-sm text-forest/65">
              <span className="font-medium text-forest tabular-nums">{filtered.length}</span>{" "}
              {filtered.length === 1 ? "plant" : "plants"}
            </p>
            {totalActive > 0 && (
              <button
                onClick={clearAll}
                className="text-[0.78rem] text-forest/55 underline-offset-2 hover:text-forest hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>

          <div className="relative inline-flex items-center gap-2">
            <ArrowUpDown className="h-3.5 w-3.5 text-forest/55" strokeWidth={1.7} />
            <label htmlFor="sort" className="text-sm text-forest/65">Sort</label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-full bg-paper border border-line text-forest text-sm px-3 py-1.5 focus:outline-none focus:border-forest/40"
            >
              <option value="number">Number</option>
              <option value="name">Name</option>
              <option value="color">Color</option>
            </select>
          </div>
        </div>

        {/* Active chips */}
        {totalActive > 0 && (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {chip([...colorSel], (k) => COLOR_LABEL[k], "color", (k) => setColorSel((s) => toggle(s, k)))}
            {chip([...patternSel], (k) => PATTERN_LABEL[k], "pattern", (k) => setPatternSel((s) => toggle(s, k)))}
            {chip([...sizeSel], (k) => SIZE_LABEL[k], "size", (k) => setSizeSel((s) => toggle(s, k)))}
            {chip([...typeSel], (k) => TYPE_LABEL[k], "type", (k) => setTypeSel((s) => toggle(s, k)))}
            {chip([...flagSel], (k) => FLAG_LABEL[k], "flag", (k) => setFlagSel((s) => toggle(s, k)))}
          </div>
        )}

        {/* Body */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block">
            <Sidebar
              colorSel={colorSel} setColorSel={setColorSel}
              patternSel={patternSel} setPatternSel={setPatternSel}
              sizeSel={sizeSel} setSizeSel={setSizeSel}
              typeSel={typeSel} setTypeSel={setTypeSel}
              flagSel={flagSel} setFlagSel={setFlagSel}
            />
          </aside>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="rounded-3xl border border-line bg-paper p-10 text-center">
              <p className="font-display text-2xl text-forest">No matches yet.</p>
              <p className="mt-2 text-forest/65">Loosen a filter and try again.</p>
              <button
                onClick={clearAll}
                className="press mt-6 inline-flex items-center gap-2 rounded-full bg-forest text-paper px-5 py-3 text-sm font-medium hover:bg-forest-dark transition-colors"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <ul
              ref={gridRef}
              className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 lg:gap-x-5 gap-y-10 lg:gap-y-12"
            >
              {filtered.map((p) => (
                <li key={p.id}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Mobile filter sheet */}
      <MobileSheet
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        colorSel={colorSel} setColorSel={setColorSel}
        patternSel={patternSel} setPatternSel={setPatternSel}
        sizeSel={sizeSel} setSizeSel={setSizeSel}
        typeSel={typeSel} setTypeSel={setTypeSel}
        flagSel={flagSel} setFlagSel={setFlagSel}
      />
    </section>
  );
}

/* ---------- helpers ---------- */

function toggle<T>(s: Set<T>, v: T): Set<T> {
  const n = new Set(s);
  if (n.has(v)) n.delete(v);
  else n.add(v);
  return n;
}

function chip<K extends string>(
  keys: K[],
  label: (k: K) => string,
  group: string,
  onRemove: (k: K) => void,
) {
  return keys.map((k) => (
    <button
      key={`${group}-${k}`}
      onClick={() => onRemove(k)}
      className={cn(
        "press inline-flex items-center gap-1.5 rounded-full",
        "bg-forest text-paper text-[0.78rem] font-medium px-3 py-1.5",
        "hover:bg-forest-dark transition-colors",
      )}
    >
      <span className="font-mono text-[0.62rem] tracking-[0.18em] uppercase opacity-70">{group}</span>
      {label(k)}
      <X className="h-3 w-3" strokeWidth={2.2} />
    </button>
  ));
}

/* ---------- sub-components ---------- */

type FilterStateProps = {
  colorSel:   Set<ColorKey>;   setColorSel:   React.Dispatch<React.SetStateAction<Set<ColorKey>>>;
  patternSel: Set<PatternKey>; setPatternSel: React.Dispatch<React.SetStateAction<Set<PatternKey>>>;
  sizeSel:    Set<SizeKey>;    setSizeSel:    React.Dispatch<React.SetStateAction<Set<SizeKey>>>;
  typeSel:    Set<TypeKey>;    setTypeSel:    React.Dispatch<React.SetStateAction<Set<TypeKey>>>;
  flagSel:    Set<Flag>;       setFlagSel:    React.Dispatch<React.SetStateAction<Set<Flag>>>;
};

function Sidebar(p: FilterStateProps) {
  return (
    <div className="space-y-7 sticky top-28">
      <FilterGroup label="Color">
        {COLORS.map((c) => (
          <FilterCheck
            key={c}
            checked={p.colorSel.has(c)}
            onChange={() => p.setColorSel((s) => toggle(s, c))}
            label={COLOR_LABEL[c]}
            count={products.filter((x) => x.color === c).length}
          />
        ))}
      </FilterGroup>

      <FilterGroup label="Pattern">
        {PATTERNS.map((c) => (
          <FilterCheck
            key={c}
            checked={p.patternSel.has(c)}
            onChange={() => p.setPatternSel((s) => toggle(s, c))}
            label={PATTERN_LABEL[c]}
            count={products.filter((x) => x.pattern === c).length}
          />
        ))}
      </FilterGroup>

      <FilterGroup label="Size">
        {SIZES.map((c) => (
          <FilterCheck
            key={c}
            checked={p.sizeSel.has(c)}
            onChange={() => p.setSizeSel((s) => toggle(s, c))}
            label={SIZE_LABEL[c]}
            count={products.filter((x) => x.size === c).length}
          />
        ))}
      </FilterGroup>

      <FilterGroup label="Type">
        {TYPES.map((c) => (
          <FilterCheck
            key={c}
            checked={p.typeSel.has(c)}
            onChange={() => p.setTypeSel((s) => toggle(s, c))}
            label={TYPE_LABEL[c]}
            count={products.filter((x) => x.type === c).length}
          />
        ))}
      </FilterGroup>

      <FilterGroup label="Good for">
        {FLAGS.map((c) => (
          <FilterCheck
            key={c}
            checked={p.flagSel.has(c)}
            onChange={() => p.setFlagSel((s) => toggle(s, c))}
            label={FLAG_LABEL[c]}
            count={products.filter((x) => x.flags.includes(c)).length}
          />
        ))}
      </FilterGroup>
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="eyebrow text-sage-deep mb-3">{label}</legend>
      <div className="space-y-1.5">{children}</div>
    </fieldset>
  );
}

function FilterCheck({
  checked,
  onChange,
  label,
  count,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
  count: number;
}) {
  return (
    <label className="group flex items-center gap-2.5 py-1 cursor-pointer">
      <span
        className={cn(
          "grid place-items-center h-4 w-4 rounded-[5px] border transition-all duration-200 ease-[var(--ease-out-strong)]",
          checked
            ? "bg-forest border-forest"
            : "border-forest/25 group-hover:border-forest/50",
        )}
      >
        {checked && (
          <svg viewBox="0 0 12 12" className="h-3 w-3 text-paper">
            <path
              d="M2 6.5l2.5 2.5L10 3"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={onChange}
      />
      <span className="flex-1 text-[0.92rem] text-forest leading-none">{label}</span>
      <span className="text-[0.72rem] text-forest/45 tabular-nums">{count}</span>
    </label>
  );
}

function CollectionsNav({
  active,
  onSelect,
}: {
  active: ColorKey | undefined;
  onSelect: (c: ColorKey | null) => void;
}) {
  return (
    <nav
      aria-label="Collections"
      className="mt-10 flex flex-wrap gap-2"
    >
      <CollectionChip active={!active} label="All" onClick={() => onSelect(null)} />
      {COLORS.map((c) => (
        <CollectionChip
          key={c}
          active={active === c}
          label={COLOR_LABEL[c]}
          onClick={() => onSelect(active === c ? null : c)}
        />
      ))}
    </nav>
  );
}

function CollectionChip({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "press inline-flex items-center rounded-full border px-3.5 py-1.5 text-[0.86rem] font-medium",
        "transition-[background-color,color,border-color] duration-300 ease-[var(--ease-out-strong)]",
        active
          ? "bg-forest text-paper border-forest"
          : "bg-paper text-forest border-line hover:border-forest/35",
      )}
    >
      {label}
    </button>
  );
}

function MobileSheet({ open, onClose, ...filters }: FilterStateProps & { open: boolean; onClose: () => void }) {
  useEscape(open, onClose);
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
      aria-label="Filters"
      className={cn(
        "fixed inset-0 z-[70] lg:hidden",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
    >
      <button
        type="button"
        aria-label="Close filters"
        tabIndex={open ? 0 : -1}
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-forest-dark/40 backdrop-blur-sm transition-opacity duration-500 cursor-default",
          open ? "opacity-100" : "opacity-0",
        )}
      />
      <aside
        className={cn(
          "absolute right-0 top-0 h-dvh w-[94%] max-w-md bg-paper border-l border-line shadow-soft-lg flex flex-col",
          "transition-transform duration-500 ease-[var(--ease-drawer)]",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <header className="flex items-center justify-between px-6 py-4 border-b border-line">
          <p className="font-display text-xl text-forest">Filter</p>
          <button
            onClick={onClose}
            aria-label="Close filters"
            className="press grid place-items-center h-10 w-10 rounded-full text-forest hover:bg-mist transition-colors"
          >
            <X className="h-5 w-5" strokeWidth={1.6} />
          </button>
        </header>
        <div className="flex-1 overflow-y-auto p-6">
          <Sidebar {...filters} />
        </div>
        <footer className="border-t border-line px-6 py-4 bg-mist/40">
          <button
            type="button"
            onClick={onClose}
            className="press w-full rounded-full bg-forest text-paper px-5 py-3.5 font-medium hover:bg-forest-dark transition-colors"
          >
            Show plants
          </button>
        </footer>
      </aside>
    </div>
  );
}
