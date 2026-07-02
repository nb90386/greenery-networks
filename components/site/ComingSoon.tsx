import Link from "next/link";
import { ArrowDownRight } from "lucide-react";
import { SproutMark } from "@/components/brand/SproutMark";

export function ComingSoon({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <section className="relative pt-44 pb-32 bg-botanical-veil grain isolate overflow-hidden">
      <div className="container-site max-w-3xl">
        <SproutMark size={42} className="text-sage-deep" />
        <p className="mt-6 eyebrow text-sage-deep">{eyebrow}</p>
        <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl text-balance">
          {title}
        </h1>
        <p className="mt-6 text-[1.05rem] leading-relaxed text-forest/75 max-w-xl">
          {body}
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-forest text-paper px-5 py-3 text-sm font-medium shadow-soft hover:bg-forest-dark transition-all"
        >
          Back to the garden
          <ArrowDownRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
