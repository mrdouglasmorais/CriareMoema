/** Dados da home page desacoplados dos componentes. */

export interface BenefitItem {
  id: string;
  text: string;
}

export interface DiferencialItem {
  id: string;
  text: string;
}

export interface PaymentCard {
  id: string;
  title: string;
  description: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  neighborhood: string;
  stars: number;
  text: string;
}

export const benefits: BenefitItem[] = [
  { id: "b1", text: "Processo organizado do briefing à instalação" },
  { id: "b2", text: "Maior fábrica de móveis da América Latina" },
  { id: "b3", text: "Flexibilidade financeira, até 36x" },
  { id: "b4", text: "Personalização de alto padrão com ótimo custo-benefício" },
  { id: "b5", text: "5 anos de garantia após instalação" },
  { id: "b6", text: "Projeto personalizado junto ao arquiteto" },
];

export const diferenciais: DiferencialItem[] = [
  { id: "d1", text: "Processo organizado do briefing à instalação." },
  { id: "d2", text: "Maior fábrica de móveis planejados da América Latina." },
  {
    id: "d3",
    text: "Flexibilidade financeira, com parcelamento em até 36x e possibilidade de 90 dias para o primeiro pagamento.",
  },
  { id: "d4", text: "5 anos de garantia após a instalação." },
  { id: "d5", text: "Projeto personalizado junto ao arquiteto." },
  { id: "d6", text: "Personalização de alto padrão com ótimo custo-benefício." },
];

export const paymentCards: PaymentCard[] = [
  {
    id: "p1",
    title: "Parcelamento em até 36x",
    description:
      "Flexibilidade para adequar o investimento ao seu fluxo e ao projeto.",
  },
  {
    id: "p2",
    title: "Primeira parcela em até 90 dias",
    description:
      "Possibilidade de alongar o início das parcelas, conforme análise.",
  },
  {
    id: "p3",
    title: "5 anos de garantia",
    description:
      "Tranquilidade após a instalação, alinhada às políticas da loja.",
  },
];

export const testimonials: TestimonialItem[] = [
  {
    id: "t1",
    name: "Fernanda Oliveira",
    neighborhood: "Moema, SP",
    stars: 5,
    text: "O processo foi muito tranquilo do início ao fim. O arquiteto entendeu exatamente o que eu queria, e o resultado ficou incrível. Cozinha e home office planejados com perfeição.",
  },
  {
    id: "t2",
    name: "Ricardo e Camila",
    neighborhood: "Ibirapuera, SP",
    stars: 5,
    text: "Nossa reforma estava emperrada por meses. A Criare Moema resolveu tudo com organização e prazo cumprido. O dormitório e o closet ficaram ainda melhores do que esperávamos.",
  },
  {
    id: "t3",
    name: "Marcelo Tavares",
    neighborhood: "Vila Olímpia, SP",
    stars: 5,
    text: "Primeira vez que faço um projeto planejado e não me arrependo. A qualidade dos materiais e o acabamento são de altíssimo padrão. Atendimento diferenciado do começo ao fim.",
  },
];

export const trustBadges = [
  { id: "tb1", value: "15+", label: "anos no mercado" },
  { id: "tb2", value: "5.000+", label: "projetos entregues" },
  { id: "tb3", value: "5 anos", label: "de garantia" },
  { id: "tb4", value: "36x", label: "sem juros" },
] as const;
