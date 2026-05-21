"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqItems } from "@/data/faq";
import { cn } from "@/lib/utils";

export interface FaqSectionProps {
  className?: string;
}

export function FaqSection({ className }: FaqSectionProps) {
  return (
    <div className={cn(className)}>
      <h2
        id="faq-heading"
        className="font-heading font-bold"
      >
        Perguntas frequentes sobre móveis planejados
      </h2>
      <Accordion
        defaultValue={[]}
        className="mt-10 w-full max-lg:rounded-2xl max-lg:border max-lg:border-white/12 max-lg:bg-card/50 max-lg:p-2 max-lg:shadow-lg max-lg:shadow-black/25 max-lg:backdrop-blur-sm"
      >
        {faqItems.map((item) => (
          <AccordionItem
            key={item.id}
            value={item.id}
            className="border-border/35 max-lg:rounded-xl max-lg:border-white/10 max-lg:not-last:mb-1 max-lg:not-last:border-b max-lg:not-last:border-b-white/10"
          >
            <AccordionTrigger className="py-4 text-left text-base font-heading font-semibold leading-snug sm:py-5 sm:text-lg md:text-xl max-lg:px-2">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-base leading-relaxed text-foreground/90 sm:text-lg max-lg:px-2">
              <p>{item.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
