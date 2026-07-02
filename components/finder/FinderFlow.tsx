"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Sun,
  Cloud,
  CloudSun,
  Sprout,
  Home,
  Fence,
  Wind,
  DoorOpen,
  ChevronsRight,
  Sparkles,
} from "lucide-react";
import {
  findMatches,
  shopQueryFor,
  type ColorKey,
  type FinderAnswers,
  type MoodKey,
  type PlaceKey,
  type PollAnswer,
  type SizeAnswer,
  type SunKey,
  type XpKey,
} from "@/lib/finder";
import { COLOR_SWATCH } from "@/data/products";
import { PlantImage } from "@/components/site/PlantImage";
import { AddToCartButton } from "@/components/shop/AddToCartButton";
import { cn } from "@/lib/utils";

type StepKey =
  | "place" | "sun" | "colors" | "mood" | "size" | "xp" | "pollinator" | "results";

const STEP_ORDER: StepKey[] = ["place", "sun", "colors", "mood", "size", "xp", "pollinator", "results"];

const COLOR_OPTIONS: { key: ColorKey; label: string }[] = [
  { key: "red",       label: "Reds" },
  { key: "pink",      label: "Pinks" },
  { key: "purple",    label: "Purples and lilacs" },
  { key: "lavender",  label: "Lavender" },
  { key: "white",     label: "Whites" },
  { key: "salmon",    label: "Peach and coral" },
  { key: "burgundy",  label: "Burgundy and berry" },
  { key: "barleria",  label: "Blue" },
];

export function FinderFlow() {
  const [answers, setAnswers] = useState<FinderAnswers>({});
  const [stepIdx, setStepIdx] = useState(0);

  const step = STEP_ORDER[stepIdx]!;
  const progress = Math.round((stepIdx / (STEP_ORDER.length - 1)) * 100);

  function goNext() {
    setStepIdx((i) => Math.min(STEP_ORDER.length - 1, i + 1));
  }
  function goBack() {
    setStepIdx((i) => Math.max(0, i - 1));
  }

  const canProceed = useMemo(() => {
    if (step === "place") return !!answers.place;
    if (step === "sun") return !!answers.sun;
    if (step === "colors") return (answers.colors?.length ?? 0) > 0;
    if (step === "mood") return !!answers.mood;
    if (step === "size") return !!answers.size;
    if (step === "xp") return !!answers.xp;
    if (step === "pollinator") return !!answers.pollinator;
    return true;
  }, [answers, step]);

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress bar */}
      {step !== "results" && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2 text-[0.72rem] tracking-[0.16em] uppercase text-forest/60 font-mono">
            <span>
              Step {stepIdx + 1} of {STEP_ORDER.length - 1}
            </span>
            <span>{progress}%</span>
          </div>
          <div className="h-1 bg-mist rounded-full overflow-hidden">
            <div
              className="h-full bg-forest transition-[width] duration-500 ease-[var(--ease-out-strong)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Step */}
      <div
        key={step}
        className="animate-in fade-in slide-in-from-bottom-2 duration-500"
      >
        {step === "place" && (
          <StepPlace value={answers.place} onSelect={(v) => setAnswers((a) => ({ ...a, place: v }))} />
        )}
        {step === "sun" && (
          <StepSun value={answers.sun} onSelect={(v) => setAnswers((a) => ({ ...a, sun: v }))} />
        )}
        {step === "colors" && (
          <StepColors
            value={answers.colors ?? []}
            onSelect={(next) => setAnswers((a) => ({ ...a, colors: next }))}
          />
        )}
        {step === "mood" && (
          <StepMood value={answers.mood} onSelect={(v) => setAnswers((a) => ({ ...a, mood: v }))} />
        )}
        {step === "size" && (
          <StepSize value={answers.size} onSelect={(v) => setAnswers((a) => ({ ...a, size: v }))} />
        )}
        {step === "xp" && (
          <StepXp value={answers.xp} onSelect={(v) => setAnswers((a) => ({ ...a, xp: v }))} />
        )}
        {step === "pollinator" && (
          <StepPollinator
            value={answers.pollinator}
            onSelect={(v) => setAnswers((a) => ({ ...a, pollinator: v }))}
          />
        )}
        {step === "results" && <StepResults answers={answers} />}
      </div>

      {/* Nav */}
      {step !== "results" && (
        <div className="mt-10 flex items-center justify-between">
          <button
            type="button"
            onClick={goBack}
            disabled={stepIdx === 0}
            className={cn(
              "press inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium",
              "transition-colors",
              stepIdx === 0
                ? "text-forest/30 cursor-not-allowed"
                : "text-forest hover:bg-mist",
            )}
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.7} />
            Back
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={!canProceed}
            className={cn(
              "press inline-flex items-center gap-2 rounded-full px-6 py-3 text-[0.9rem] font-medium",
              "transition-colors",
              canProceed
                ? "bg-forest text-paper hover:bg-forest-dark"
                : "bg-forest/25 text-paper cursor-not-allowed",
            )}
          >
            {stepIdx === STEP_ORDER.length - 2 ? "See my matches" : "Next"}
            <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
          </button>
        </div>
      )}
    </div>
  );
}

/* ---------- steps ---------- */

function StepShell({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="eyebrow text-sage-deep">{eyebrow}</p>
      <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[2.6rem] leading-[1.06] text-balance">
        {title}
      </h2>
      <div className="mt-8">{children}</div>
    </div>
  );
}

function OptionButton({
  active,
  onClick,
  icon: Icon,
  label,
  hint,
}: {
  active: boolean;
  onClick: () => void;
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  hint?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "press flex items-start gap-4 text-left rounded-3xl p-5 border w-full",
        "transition-[background-color,border-color,color] duration-300 ease-[var(--ease-out-strong)]",
        active
          ? "bg-forest text-paper border-forest"
          : "bg-paper text-forest border-line hover:border-forest/40",
      )}
    >
      {Icon && (
        <span
          className={cn(
            "grid place-items-center h-10 w-10 rounded-full shrink-0",
            active ? "bg-paper/15 text-paper" : "bg-mist text-forest",
          )}
        >
          <Icon className="h-5 w-5" strokeWidth={1.7} />
        </span>
      )}
      <div>
        <p className="font-display text-[1.15rem] leading-tight">{label}</p>
        {hint && (
          <p
            className={cn(
              "mt-1 text-[0.86rem] leading-snug",
              active ? "text-paper/80" : "text-forest/65",
            )}
          >
            {hint}
          </p>
        )}
      </div>
    </button>
  );
}

function StepPlace({ value, onSelect }: { value?: PlaceKey; onSelect: (v: PlaceKey) => void }) {
  const options: { key: PlaceKey; label: string; hint: string; icon: typeof Home }[] = [
    { key: "patio",   label: "Patio or containers", hint: "Pots on a deck, patio, or porch.",     icon: Home },
    { key: "garden",  label: "Garden bed",          hint: "Right into the ground.",                icon: Fence },
    { key: "balcony", label: "Balcony",             hint: "Small space, containers.",              icon: Wind },
    { key: "indoor",  label: "Bright indoor spot",  hint: "A sunny window ledge.",                 icon: DoorOpen },
  ];
  return (
    <StepShell eyebrow="Question 1 of 7" title="Where will your plant live?">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((o) => (
          <OptionButton
            key={o.key}
            active={value === o.key}
            onClick={() => onSelect(o.key)}
            icon={o.icon}
            label={o.label}
            hint={o.hint}
          />
        ))}
      </div>
    </StepShell>
  );
}

function StepSun({ value, onSelect }: { value?: SunKey; onSelect: (v: SunKey) => void }) {
  const options: { key: SunKey; label: string; hint: string; icon: typeof Sun }[] = [
    { key: "full",  label: "Full sun",     hint: "Six or more hours a day.", icon: Sun },
    { key: "part",  label: "Part sun",     hint: "About four hours a day.",  icon: CloudSun },
    { key: "shade", label: "Mostly shade", hint: "Bright but rarely direct.", icon: Cloud },
  ];
  return (
    <StepShell eyebrow="Question 2 of 7" title="How much sun does that spot get?">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {options.map((o) => (
          <OptionButton
            key={o.key}
            active={value === o.key}
            onClick={() => onSelect(o.key)}
            icon={o.icon}
            label={o.label}
            hint={o.hint}
          />
        ))}
      </div>
    </StepShell>
  );
}

function StepColors({ value, onSelect }: { value: ColorKey[]; onSelect: (v: ColorKey[]) => void }) {
  return (
    <StepShell eyebrow="Question 3 of 7" title="Which colors do you love? Pick as many as you like.">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {COLOR_OPTIONS.map((o) => {
          const active = value.includes(o.key);
          return (
            <button
              key={o.key}
              type="button"
              onClick={() =>
                onSelect(active ? value.filter((k) => k !== o.key) : [...value, o.key])
              }
              aria-pressed={active}
              className={cn(
                "press flex flex-col items-start gap-3 rounded-3xl p-4 border text-left",
                "transition-[background-color,border-color,color] duration-300 ease-[var(--ease-out-strong)]",
                active
                  ? "bg-forest text-paper border-forest"
                  : "bg-paper text-forest border-line hover:border-forest/40",
              )}
            >
              <span
                className="h-10 w-10 rounded-full ring-2 ring-paper/40"
                style={{ backgroundColor: COLOR_SWATCH[o.key] as string }}
                aria-hidden
              />
              <span className="text-[0.95rem] font-medium leading-tight">{o.label}</span>
            </button>
          );
        })}
      </div>
      <p className="mt-4 text-[0.86rem] text-forest/60">
        Selected {value.length} {value.length === 1 ? "color" : "colors"}.
      </p>
    </StepShell>
  );
}

function StepMood({ value, onSelect }: { value?: MoodKey; onSelect: (v: MoodKey) => void }) {
  const options: { key: MoodKey; label: string; hint: string }[] = [
    { key: "bold",   label: "Bold and bright",  hint: "Vivid reds, hot pinks, warm salmons." },
    { key: "pastel", label: "Soft and pastel",  hint: "Lavender, blush, cool whites." },
    { key: "moody",  label: "Deep and moody",   hint: "Burgundy, purple, velvety blooms." },
  ];
  return (
    <StepShell eyebrow="Question 4 of 7" title="What mood are you going for?">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {options.map((o) => (
          <OptionButton
            key={o.key}
            active={value === o.key}
            onClick={() => onSelect(o.key)}
            icon={Sparkles}
            label={o.label}
            hint={o.hint}
          />
        ))}
      </div>
    </StepShell>
  );
}

function StepSize({ value, onSelect }: { value?: SizeAnswer; onSelect: (v: SizeAnswer) => void }) {
  const options: { key: SizeAnswer; label: string; hint: string }[] = [
    { key: "mini",     label: "Compact and mini", hint: "Small plants for a small spot." },
    { key: "standard", label: "Standard",         hint: "Full sized garden and patio plants." },
  ];
  return (
    <StepShell eyebrow="Question 5 of 7" title="What size works for you?">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((o) => (
          <OptionButton
            key={o.key}
            active={value === o.key}
            onClick={() => onSelect(o.key)}
            icon={Sprout}
            label={o.label}
            hint={o.hint}
          />
        ))}
      </div>
    </StepShell>
  );
}

function StepXp({ value, onSelect }: { value?: XpKey; onSelect: (v: XpKey) => void }) {
  const options: { key: XpKey; label: string; hint: string }[] = [
    { key: "beginner", label: "Total beginner",           hint: "I would rather not think about it." },
    { key: "some",     label: "I have grown a few things", hint: "I like fussing with plants a bit." },
  ];
  return (
    <StepShell eyebrow="Question 6 of 7" title="How much plant experience do you have?">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((o) => (
          <OptionButton
            key={o.key}
            active={value === o.key}
            onClick={() => onSelect(o.key)}
            label={o.label}
            hint={o.hint}
          />
        ))}
      </div>
    </StepShell>
  );
}

function StepPollinator({
  value,
  onSelect,
}: {
  value?: PollAnswer;
  onSelect: (v: PollAnswer) => void;
}) {
  const options: { key: PollAnswer; label: string; hint: string }[] = [
    { key: "yes", label: "Yes please",     hint: "I want bees, butterflies, and hummingbirds." },
    { key: "meh", label: "Not important",  hint: "The bloom itself is what I am after." },
  ];
  return (
    <StepShell eyebrow="Question 7 of 7" title="Do you want to attract pollinators?">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((o) => (
          <OptionButton
            key={o.key}
            active={value === o.key}
            onClick={() => onSelect(o.key)}
            label={o.label}
            hint={o.hint}
          />
        ))}
      </div>
    </StepShell>
  );
}

function StepResults({ answers }: { answers: FinderAnswers }) {
  const matches = useMemo(() => findMatches(answers, 9), [answers]);
  const shopHref = shopQueryFor(answers);
  return (
    <div>
      <p className="eyebrow text-sage-deep">Your matches</p>
      <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[2.6rem] leading-[1.06] text-balance">
        Nine plants that fit your answers.
      </h2>
      <p className="mt-4 text-[1rem] leading-relaxed text-forest/70 max-w-xl">
        Sorted by how closely they match. If you love a few, save them or add
        them to your cart. You can also send this straight into the shop.
      </p>

      <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {matches.map((m) => (
          <li key={m.product.id} className="rounded-3xl bg-paper border border-line p-4 shadow-soft flex flex-col gap-4">
            <Link
              href={`/shop/${m.product.slug}`}
              className="relative block aspect-[4/5] rounded-2xl overflow-hidden ring-1 ring-forest/8 bg-mist"
              aria-label={`Open ${m.product.displayName}`}
            >
              <PlantImage
                src={m.product.image}
                alt={m.product.name}
                fill
                sizes="(min-width: 1024px) 25vw, 45vw"
                cropCaption={false}
              />
            </Link>
            <div className="flex items-baseline justify-between gap-3">
              <div className="min-w-0">
                <p className="font-mono text-[0.66rem] tracking-[0.18em] uppercase text-forest/65">
                  Nº {m.product.id}
                </p>
                <p className="mt-1 font-display text-[1.05rem] leading-tight text-forest truncate">
                  {m.product.name}
                </p>
              </div>
              <span className="shrink-0 text-forest font-medium text-[0.9rem]">${m.product.price}</span>
            </div>
            <p className="text-[0.85rem] leading-snug text-forest/75">
              {m.reason}
            </p>
            <div className="mt-auto flex gap-2">
              <AddToCartButton product={m.product} size="icon" />
              <Link
                href={`/shop/${m.product.slug}`}
                className="press flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-paper text-forest border border-forest/15 px-4 py-2 text-[0.82rem] font-medium hover:border-forest/35 transition-colors"
              >
                Learn more
                <ChevronsRight className="h-3.5 w-3.5" strokeWidth={1.8} />
              </Link>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <Link
          href={shopHref}
          className="press inline-flex items-center gap-2 rounded-full bg-forest text-paper px-5 py-3 text-[0.92rem] font-medium hover:bg-forest-dark transition-colors"
        >
          See all matches in the shop
          <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
        </Link>
        <Link
          href="/finder"
          className="press inline-flex items-center gap-2 rounded-full bg-paper text-forest border border-forest/15 px-5 py-3 text-[0.92rem] font-medium hover:bg-mist transition-colors"
        >
          Start over
        </Link>
      </div>
    </div>
  );
}
