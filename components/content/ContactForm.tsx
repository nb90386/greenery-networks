"use client";

import { useState } from "react";
import { Check, Send } from "lucide-react";
import { cn } from "@/lib/utils";

type Topic = "plant care" | "an order" | "wholesale" | "something else";

const TOPICS: Topic[] = ["plant care", "an order", "wholesale", "something else"];

export function ContactForm() {
  const [topic, setTopic] = useState<Topic>("plant care");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [done, setDone] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@") || message.trim().length < 5) return;
    /* Placeholder. Wire to a real handler when the backend lands. */
    setDone(true);
  }

  if (done) {
    return (
      <div
        className="rounded-3xl bg-paper border border-line shadow-soft p-8 text-center"
        role="status"
      >
        <span className="mx-auto grid place-items-center h-12 w-12 rounded-full bg-mist text-forest">
          <Check className="h-5 w-5" strokeWidth={1.8} />
        </span>
        <p className="mt-5 font-display text-2xl text-forest">Thanks. We&apos;ll write back.</p>
        <p className="mt-2 text-forest/70 leading-relaxed max-w-sm mx-auto">
          We answer most notes within one business day. You&apos;ll hear from
          <span className="font-mono text-[0.9rem]"> greenerynetworks@gmail.com</span>.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl bg-paper border border-line shadow-soft p-6 lg:p-8 space-y-6"
    >
      <fieldset>
        <legend className="eyebrow text-sage-deep mb-3">What&apos;s it about</legend>
        <div className="flex flex-wrap gap-2">
          {TOPICS.map((t) => {
            const active = topic === t;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setTopic(t)}
                aria-pressed={active}
                className={cn(
                  "press inline-flex items-center rounded-full px-3.5 py-1.5 text-[0.86rem] font-medium border",
                  "transition-[background-color,color,border-color] duration-300 ease-[var(--ease-out-strong)]",
                  active
                    ? "bg-forest text-paper border-forest"
                    : "bg-paper text-forest border-line hover:border-forest/35",
                )}
              >
                {t}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div>
        <label htmlFor="email" className="eyebrow text-sage-deep">
          Your email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@garden.com"
          className="mt-2 w-full rounded-2xl bg-paper border border-line px-4 py-3 text-[0.95rem] text-forest placeholder:text-forest/40 focus:outline-none focus:border-forest/40 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="message" className="eyebrow text-sage-deep">
          Your note
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={`A line or two about ${topic}…`}
          className="mt-2 w-full rounded-2xl bg-paper border border-line px-4 py-3 text-[0.95rem] text-forest placeholder:text-forest/40 focus:outline-none focus:border-forest/40 transition-colors resize-none"
        />
      </div>

      <div className="flex items-center justify-between gap-4">
        <p className="text-[0.78rem] text-forest/55 leading-snug">
          We answer most notes within one business day.
        </p>
        <button
          type="submit"
          className="press inline-flex items-center gap-2 rounded-full bg-forest text-paper px-5 py-3 text-[0.92rem] font-medium hover:bg-forest-dark transition-colors"
        >
          Send note
          <Send className="h-4 w-4" strokeWidth={1.8} />
        </button>
      </div>
    </form>
  );
}
