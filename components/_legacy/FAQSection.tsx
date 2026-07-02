"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What USDA zones do the plants grow in?",
    a: "Our flowering starter plants are best suited for USDA Zone 9 and above. In cooler zones, many varieties can be grown as annuals or overwintered indoors.",
  },
  {
    q: "Is there free shipping?",
    a: "There is no free shipping right now. Actual USPS shipping cost is added to each shipment based on destination. We always show the cost before checkout.",
  },
  {
    q: "Are the plants perennials?",
    a: "Most plants are perennials in Zone 9 and above, depending on microclimate. In cooler zones, many are grown as annuals.",
  },
  {
    q: "Do I need to fertilize plants often?",
    a: "For better plant health, fertilize once a month during the growing season with a balanced fertilizer.",
  },
  {
    q: "How often should I water?",
    a: "Keep soil moist and water when the top inch feels dry. Most flowering plants prefer consistent moisture without sitting in soggy soil.",
  },
];

export function FAQSection() {
  return (
    <section className="section-padding bg-garden-white">
      <div className="container-site grid gap-10 lg:grid-cols-2 items-start">
        <div className="lg:sticky lg:top-28">
          <p className="text-sm font-medium uppercase tracking-widest text-leaf-400">
            FAQ
          </p>
          <h2 className="mt-3 text-4xl font-semibold text-charcoal md:text-5xl text-balance">
            Questions? We&apos;ve got answers.
          </h2>
          <p className="mt-4 text-charcoal-muted max-w-md text-lg">
            If you don&apos;t see your question here, reach out to us at{" "}
            <span className="text-moss font-medium">greenerynetworks@gmail.com</span>.
          </p>
          <div className="mt-6">
            <Button asChild variant="outline" className="gap-2">
              <Link href="/faq">
                See All FAQs
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-sage-200/50 p-4 sm:p-6 shadow-soft-sm">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-base sm:text-lg">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-charcoal-muted">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
