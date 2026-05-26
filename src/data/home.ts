/** Dados da home page desacoplados dos componentes. */

export interface BenefitItem {
  id: string;
  text: string;
}

export interface DiferencialItem {
  id: string;
  text: string;
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
  { id: "b2", text: "Maior fábrica de móveis planejados da América Latina combinada com atendimento personalizado para arquitetos." },
  { id: "b4", text: "Design sem concessões — com investimento que cabe no orçamento da reforma." },
  { id: "b5", text: "5 anos de garantia após a instalação — pós-venda com atenção total ao cliente." },
  { id: "b6", text: "O que foi aprovado é o que será entregue — sem substituições de material de última hora." },
];

export const diferenciais: DiferencialItem[] = [
  { id: "d1", text: "Processo organizado do briefing à instalação." },
  { id: "d2", text: "Maior fábrica de móveis planejados da América Latina combinada com atendimento personalizado para arquitetos." },
  { id: "d4", text: "5 anos de garantia após a instalação — pós-venda com atenção total ao cliente." },
  { id: "d5", text: "O que foi aprovado é o que será entregue — sem substituições de material de última hora." },
  { id: "d6", text: "Design sem concessões — com investimento que cabe no orçamento da reforma." },
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
