import {
  Sun,
  Droplets,
  Flower2,
  Thermometer,
  Ruler,
  Sparkles,
  Bug,
  FlowerIcon,
} from "lucide-react";
import type { CareAttributes } from "@/data/products";

const ROWS: Array<{
  key: keyof CareAttributes;
  label: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}> = [
  { key: "sun",         label: "Sun",          icon: Sun },
  { key: "water",       label: "Water",        icon: Droplets },
  { key: "bloomSeason", label: "Bloom season", icon: Flower2 },
  { key: "hardiness",   label: "Climate",      icon: Thermometer },
  { key: "matureSize",  label: "Mature size",  icon: Ruler },
  { key: "difficulty",  label: "Difficulty",   icon: Sparkles },
  { key: "pollinator",  label: "Pollinator",   icon: Bug },
  { key: "container",   label: "Container",    icon: FlowerIcon },
];

export function CareBlock({ care }: { care: CareAttributes }) {
  return (
    <section
      aria-label="Plant care"
      className="rounded-3xl bg-paper border border-line shadow-soft p-6 lg:p-8"
    >
      <header className="flex items-baseline justify-between gap-4">
        <p className="eyebrow text-sage-deep">Care card</p>
        <p className="font-mono text-[0.7rem] tracking-[0.16em] uppercase text-forest/40">
          Ships in every box
        </p>
      </header>
      <h2 className="mt-3 text-2xl sm:text-3xl text-forest leading-tight">
        Grow it confidently.
      </h2>

      <dl className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
        {ROWS.map(({ key, label, icon: Icon }) => (
          <div key={key} className="flex items-start gap-3">
            <span className="grid place-items-center h-9 w-9 rounded-full bg-mist text-forest shrink-0">
              <Icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
            </span>
            <div className="min-w-0">
              <dt className="eyebrow text-sage-deep mb-1">{label}</dt>
              <dd className="text-[0.95rem] text-forest leading-snug">
                {care[key]}
              </dd>
            </div>
          </div>
        ))}
      </dl>
    </section>
  );
}
