export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
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
