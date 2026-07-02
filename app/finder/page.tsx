import type { Metadata } from "next";
import { FinderFlow } from "@/components/finder/FinderFlow";

export const metadata: Metadata = {
  title: "Find your plant",
  description:
    "A friendly seven step guide to pick the flowering plants that will actually work in your space, sun, and vibe.",
};

export default function FinderPage() {
  return (
    <section className="relative pt-32 lg:pt-40 pb-24 lg:pb-32 min-h-[80vh] bg-botanical-veil grain isolate overflow-hidden">
      <div className="container-site">
        <FinderFlow />
      </div>
    </section>
  );
}
