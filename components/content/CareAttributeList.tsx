import {
  Sun, Droplets, Flower2, Thermometer, Ruler, Sparkles, Bug, FlowerIcon,
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

/** Two-column icon-labeled care card, reused on /care and /shop/[slug]. */
export function CareAttributeList({ care }: { care: CareAttributes }) {
  return (
    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
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
  );
}
