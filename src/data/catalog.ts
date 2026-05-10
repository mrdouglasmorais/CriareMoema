export type CatalogCategory = "Cozinha" | "Sala" | "Dormitório" | "Closet" | "Lavabo" | "Detalhes";

export interface CatalogImage {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  category: CatalogCategory;
}

export const catalogCategories: CatalogCategory[] = [
  "Cozinha",
  "Sala",
  "Dormitório",
  "Closet",
  "Lavabo",
  "Detalhes",
];

export const catalogImages: CatalogImage[] = [
  {
    id: "04003",
    src: "/catalog/cat-04003.jpg",
    width: 7008,
    height: 4104,
    alt: "Cozinha planejada em madeirado natural com ilha central e bancada branca — Criare Moema",
    category: "Cozinha",
  },
  {
    id: "04428",
    src: "/catalog/cat-04428.jpg",
    width: 6883,
    height: 4636,
    alt: "Cozinha com ilha acanalada azul, forro ripado e iluminação spot — Criare Moema",
    category: "Cozinha",
  },
  {
    id: "04404",
    src: "/catalog/cat-04404.jpg",
    width: 6426,
    height: 3974,
    alt: "Cozinha e sala de jantar integradas com ilha azul, mesa de madeira e cortinas longas — Criare Moema",
    category: "Cozinha",
  },
  {
    id: "05161",
    src: "/catalog/cat-05161.jpg",
    width: 6816,
    height: 4439,
    alt: "Cozinha escura de alto padrão com ilha em granito preto e armários em madeirado com vidro iluminado — Criare Moema",
    category: "Cozinha",
  },
  {
    id: "04260",
    src: "/catalog/cat-04260.jpg",
    width: 7008,
    height: 4266,
    alt: "Sala de estar ampla com painel de TV em laccato bege e estante ripada — Criare Moema",
    category: "Sala",
  },
  {
    id: "04247",
    src: "/catalog/cat-04247.jpg",
    width: 6562,
    height: 4417,
    alt: "Sala de estar com painel de TV e estante aberta em nude fosco — Criare Moema",
    category: "Sala",
  },
  {
    id: "03726",
    src: "/catalog/cat-03726.jpg",
    width: 6830,
    height: 4670,
    alt: "Sala integrada com parede de pedra, painel em madeira, adega e poltrona orgânica em madeira maciça — Criare Moema",
    category: "Sala",
  },
  {
    id: "04301",
    src: "/catalog/cat-04301.jpg",
    width: 6514,
    height: 4117,
    alt: "Lounge contemporâneo com painéis texturizados em verde, vegetação integrada e sofá off-white — Criare Moema",
    category: "Sala",
  },
  {
    id: "04974",
    src: "/catalog/cat-04974.jpg",
    width: 7008,
    height: 4504,
    alt: "Dormitório master com roupeiro de vidro iluminado em LED dourado e cama de casal — Criare Moema",
    category: "Dormitório",
  },
  {
    id: "05004",
    src: "/catalog/cat-05004.jpg",
    width: 7008,
    height: 4429,
    alt: "Dormitório com roupeiro de vidro canelado fumê e painéis ripados em madeira clara — Criare Moema",
    category: "Dormitório",
  },
  {
    id: "04581",
    src: "/catalog/cat-04581.jpg",
    width: 7008,
    height: 4672,
    alt: "Penteadeira com espelho arqueado em dourado, tampo em pedra e painéis ripados em madeira — Criare Moema",
    category: "Dormitório",
  },
  {
    id: "04532",
    src: "/catalog/cat-04532.jpg",
    width: 7008,
    height: 4672,
    alt: "Closet com portas deslizantes em nude fosco, sapateira e cabideiro sob iluminação natural — Criare Moema",
    category: "Closet",
  },
  {
    id: "05018",
    src: "/catalog/cat-05018.jpg",
    width: 4549,
    height: 6706,
    alt: "Lavabo com dupla cuba, espelho orgânico e arandelas douradas sobre painel ripado em madeira — Criare Moema",
    category: "Lavabo",
  },
  {
    id: "05037",
    src: "/catalog/cat-05037.jpg",
    width: 4659,
    height: 6977,
    alt: "Lavabo com cuba única, espelho redondo dourado e bancada aberta em pedra — Criare Moema",
    category: "Lavabo",
  },
  {
    id: "03731",
    src: "/catalog/cat-03731.jpg",
    width: 4672,
    height: 7008,
    alt: "Detalhe de adega em metal preto com divisórias para garrafas e base em pedra — Criare Moema",
    category: "Detalhes",
  },
  {
    id: "04546",
    src: "/catalog/cat-04546.jpg",
    width: 4672,
    height: 7008,
    alt: "Detalhe de gaveteiro em verde sage com puxadores redondos em metal rosê dourado — Criare Moema",
    category: "Detalhes",
  },
  {
    id: "05051",
    src: "/catalog/cat-05051.jpg",
    width: 4577,
    height: 6865,
    alt: "Detalhe de gaveta em laccato nude com corrediça de precisão e acabamento perfil dourado — Criare Moema",
    category: "Detalhes",
  },
];
