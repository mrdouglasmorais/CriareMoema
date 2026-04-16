"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const faqItems: { id: string; question: string; answer: string }[] = [
  {
    id: "o-que-sao",
    question: "O que são móveis planejados?",
    answer:
      "Móveis feitos sob medida para o ambiente, considerando medidas, circulação e uso diário, diferentes de módulos prontos.",
  },
  {
    id: "por-que-criare",
    question: "Por que escolher a Criare Moema?",
    answer:
      "Você junta projeto com arquiteto, produção na maior fábrica de móveis planejados da América Latina e 5 anos de garantia no mesmo lugar.",
  },
  {
    id: "pagamento",
    question: "Como funcionam as formas de pagamento?",
    answer:
      "Parcelamento em até 36x e possibilidade de primeira parcela em até 90 dias, conforme análise do pedido.",
  },
  {
    id: "acompanhamento",
    question: "Vou conseguir acompanhar o processo?",
    answer:
      "Sim. Você acompanha as principais etapas: projeto, aprovação, fabricação e agendamento da instalação.",
  },
  {
    id: "apartamento",
    question: "Móveis planejados valem a pena para apartamento?",
    answer:
      "Sim. Otimizam espaço, organizam o dia a dia e ajudam a valorizar o imóvel para uso próprio, revenda ou locação.",
  },
  {
    id: "area-atendimento",
    question: "Esta loja atende somente ao bairro Moema?",
    answer:
      "Nossa estrutura nos permite atender todos os bairros de São Paulo além de algumas cidades do Estado.",
  },
];

export interface FaqSectionProps {
  className?: string;
}

export function FaqSection({ className }: FaqSectionProps) {
  return (
    <div className={cn(className)}>
      <h2
        id="faq-heading"
        className="font-heading text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl"
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
