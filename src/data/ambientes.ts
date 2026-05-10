export interface AmbienteData {
  slug: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  longDescription: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  /** Atualizar com o caminho da imagem específica quando disponível */
  image: string;
  imageWidth: number;
  imageHeight: number;
  features: string[];
  ctaLabel: string;
  /** @deprecated Removido — não usar emojis em HTML */
  icon?: never;
}

export const ambientes: AmbienteData[] = [
  {
    slug: "cozinha",
    title: "Cozinha Planejada",
    subtitle: "Funcionalidade e design em cada centímetro",
    shortDescription:
      "Cozinhas planejadas sob medida com acabamento de alto padrão — do briefing à instalação.",
    longDescription:
      "A cozinha é o coração da casa. Na Criare Moema, cada projeto de cozinha começa pelo seu modo de viver: rotina, circulação, armazenamento e estética. Trabalhamos com marcenaria de precisão fabril, gaveteiros Blum com fechamento suave, painéis em Laccato ou madeirado e iluminação LED integrada — para uma cozinha que não apenas impressiona, mas funciona com excelência no dia a dia.",
    seoTitle: "Cozinha Planejada de Alto Padrão em Moema | Criare Moema",
    seoDescription:
      "Cozinhas planejadas sob medida em Moema, São Paulo. Projeto executivo personalizado, acabamento premium e instalação impecável. Solicite um diagnóstico gratuito.",
    keywords: [
      "cozinha planejada Moema",
      "cozinha sob medida São Paulo",
      "cozinha alto padrão",
      "cozinha planejada São Paulo",
      "projeto de cozinha",
      "marcenaria cozinha Moema",
    ],
    image: "/catalog/cat-04003.jpg",
    imageWidth: 7008,
    imageHeight: 4104,
    features: [
      "Aproveitamento inteligente de cada centímetro",
      "Gaveteiros com corrediças Blum (soft-close)",
      "Acabamentos em Laccato, Lacca fosco ou madeirado",
      "Iluminação LED integrada sob gabinetes",
      "Projeto executivo com aprovação prévia",
      "Instalação fiel ao que foi aprovado",
    ],
    ctaLabel: "Projetar minha cozinha",

  },
  {
    slug: "dormitorio",
    title: "Dormitório Planejado",
    subtitle: "Descanso e organização com sofisticação",
    shortDescription:
      "Dormitórios planejados sob medida que equilibram estética sofisticada e funcionalidade real.",
    longDescription:
      "Um dormitório planejado deve refletir sua personalidade e atender à sua rotina. Na Criare Moema, projetamos desde a cabeceira até o painel de TV, passando por roupeiros com divisórias internas personalizadas, cômodas integradas e iluminação de atmosfera. Alto padrão de execução com materiais que envelhecem bem.",
    seoTitle: "Dormitório Planejado de Alto Padrão em Moema | Criare Moema",
    seoDescription:
      "Dormitórios planejados sob medida em Moema, São Paulo. Roupeiros, painéis e ambientes completos com acabamento sofisticado. Solicite seu projeto.",
    keywords: [
      "dormitório planejado Moema",
      "quarto planejado São Paulo",
      "roupeiro planejado",
      "dormitório sob medida",
      "quarto casal planejado",
      "suite planejada",
    ],
    image: "/catalog/cat-04974.jpg",
    imageWidth: 7008,
    imageHeight: 4504,
    features: [
      "Roupeiros com divisórias internas sob medida",
      "Painéis de cabeceira e TV integrados",
      "Iluminação de atmosfera embutida",
      "Penteadeira ou escrivaninha integrada",
      "Materiais com alta durabilidade",
      "Projeto do ambiente completo",
    ],
    ctaLabel: "Projetar meu dormitório",

  },
  {
    slug: "closet",
    title: "Closet Sob Medida",
    subtitle: "Organização de alto padrão para seu acervo",
    shortDescription:
      "Closets planejados que transformam espaço em luxo funcional — com acabamento impecável.",
    longDescription:
      "O closet é o ambiente onde organização e sofisticação se encontram. Na Criare Moema, desenvolvemos closets com sapateiras, cabideiros ajustáveis, gaveteiros com divisórias para acessórios, iluminação LED dedicada e acabamentos que variam do Laccato branco ao madeirado escuro. Cada divisória e cada espaço são pensados para o seu acervo específico.",
    seoTitle: "Closet Planejado de Luxo em Moema | Criare Moema",
    seoDescription:
      "Closets planejados e sob medida em Moema, São Paulo. Alto padrão de acabamento, organização inteligente e execução impecável. Conheça nossos projetos.",
    keywords: [
      "closet planejado Moema",
      "closet sob medida São Paulo",
      "closet de luxo",
      "closet planejado alto padrão",
      "walk-in closet São Paulo",
      "closet personalizado",
    ],
    image: "/catalog/cat-04532.jpg",
    imageWidth: 7008,
    imageHeight: 4672,
    features: [
      "Cabideiros simples e duplos ajustáveis",
      "Sapateiras em diferentes configurações",
      "Gaveteiros com divisórias para acessórios",
      "Iluminação LED dedicada por zona",
      "Acabamentos premium (Laccato, madeirado, espelho)",
      "Projeto 3D com aprovação prévia",
    ],
    ctaLabel: "Projetar meu closet",

  },
  {
    slug: "home-office",
    title: "Home Office Planejado",
    subtitle: "Produtividade e identidade no seu espaço de trabalho",
    shortDescription:
      "Home offices planejados que unem ergonomia, organização e identidade visual ao seu trabalho.",
    longDescription:
      "O home office deixou de ser improvisado. Na Criare Moema, projetamos espaços de trabalho que refletem sua identidade profissional, com bancadas ergonômicas, painéis de organização, gestão de cabos integrada e iluminação adequada para videoconferências. Do escritório compacto ao ambiente completo.",
    seoTitle: "Home Office Planejado em Moema | Criare Moema",
    seoDescription:
      "Home office planejado sob medida em Moema, São Paulo. Bancadas, painéis e ambientes completos para trabalhar de casa com ergonomia e estilo.",
    keywords: [
      "home office planejado Moema",
      "escritório sob medida São Paulo",
      "home office alto padrão",
      "móveis para home office",
      "escritório planejado",
      "bancada home office",
    ],
    image: "/catalog/cat-04247.jpg",
    imageWidth: 6562,
    imageHeight: 4417,
    features: [
      "Bancadas com profundidade ergonômica",
      "Painéis de organização integrados",
      "Gestão de cabos embutida",
      "Prateleiras e racks para equipamentos",
      "Iluminação adequada para videoconferências",
      "Projeto que reflete sua identidade profissional",
    ],
    ctaLabel: "Projetar meu home office",

  },
  {
    slug: "lavabo",
    title: "Lavabo e Banheiro Planejado",
    subtitle: "Detalhes que elevam cada centímetro",
    shortDescription:
      "Lavabos e banheiros planejados com precisão nos acabamentos e máximo aproveitamento de espaço.",
    longDescription:
      "Em espaços pequenos, cada detalhe é decisivo. Na Criare Moema, desenvolvemos armários de banheiro e lavabo com acabamentos que resistem à umidade, espelhos com iluminação integrada, nichos e gaveteiros precisamente dimensionados. Alto padrão de execução mesmo nos ambientes mais compactos.",
    seoTitle: "Banheiro e Lavabo Planejado em Moema | Criare Moema",
    seoDescription:
      "Banheiros e lavabos planejados sob medida em Moema, São Paulo. Armários, espelhos com iluminação e acabamento premium. Solicite seu projeto.",
    keywords: [
      "banheiro planejado Moema",
      "lavabo sob medida São Paulo",
      "armário banheiro planejado",
      "banheiro alto padrão",
      "móveis banheiro",
      "espelho iluminado",
    ],
    image: "/catalog/cat-05018.jpg",
    imageWidth: 4549,
    imageHeight: 6706,
    features: [
      "Armários com acabamento anti-umidade",
      "Espelhos com iluminação LED integrada",
      "Nichos e prateleiras sob medida",
      "Gaveteiros precisamente dimensionados",
      "Cubas e torneiras integradas ao projeto",
      "Máximo aproveitamento em espaços compactos",
    ],
    ctaLabel: "Projetar meu banheiro",

  },
  {
    slug: "sala",
    title: "Sala de Estar e Jantar",
    subtitle: "Ambientes integrados com identidade e sofisticação",
    shortDescription:
      "Salas planejadas com painéis de TV, estantes, aparadores e ambientes integrados de alto padrão.",
    longDescription:
      "A sala é o principal cartão de visitas do apartamento ou da casa. Na Criare Moema, projetamos painéis de TV com nichos e gaveteiros, estantes de livros e objetos, aparadores e buffets integrados, sempre com acabamento consistente e iluminação que valoriza o ambiente. Sala de estar e jantar com unidade visual e funcionalidade real.",
    seoTitle: "Sala Planejada de Alto Padrão em Moema | Criare Moema",
    seoDescription:
      "Salas de estar e jantar planejadas em Moema, São Paulo. Painéis de TV, estantes e ambientes integrados com acabamento sofisticado.",
    keywords: [
      "sala planejada Moema",
      "painel TV sob medida",
      "sala de estar planejada São Paulo",
      "estante planejada",
      "sala de jantar planejada",
      "ambientes integrados",
    ],
    image: "/catalog/cat-04260.jpg",
    imageWidth: 7008,
    imageHeight: 4266,
    features: [
      "Painéis de TV com nichos e gaveteiros",
      "Estantes para livros e objetos decorativos",
      "Aparadores e buffets integrados",
      "Iluminação que valoriza o espaço",
      "Acabamento consistente em todo o ambiente",
      "Projeto de sala e jantar integrado",
    ],
    ctaLabel: "Projetar minha sala",

  },
  {
    slug: "lavanderia",
    title: "Lavanderia Planejada",
    subtitle: "Organização inteligente para o dia a dia",
    shortDescription:
      "Lavanderias planejadas que transformam o ambiente mais funcional da casa em espaço organizado.",
    longDescription:
      "A lavanderia planejada é sinônimo de praticidade. Na Criare Moema, otimizamos cada centímetro com armários para produtos de limpeza, tanques integrados, bancadas de passadoria, cestos retráteis e ganchos organizadores. Um ambiente que trabalha tanto quanto você.",
    seoTitle: "Lavanderia Planejada em Moema | Criare Moema",
    seoDescription:
      "Lavanderias planejadas sob medida em Moema, São Paulo. Organização inteligente com armários, bancadas e aproveitamento de espaço.",
    keywords: [
      "lavanderia planejada Moema",
      "lavanderia sob medida São Paulo",
      "armário lavanderia",
      "lavanderia organizada",
      "móveis lavanderia",
    ],
    image: "/catalog/cat-04532.jpg",
    imageWidth: 7008,
    imageHeight: 4672,
    features: [
      "Armários para produtos de limpeza e utensílios",
      "Bancada de passadoria integrada",
      "Cestos retráteis para roupas",
      "Tanque e área de serviço integrados",
      "Maximização de espaço vertical",
      "Acabamento fácil de higienizar",
    ],
    ctaLabel: "Projetar minha lavanderia",

  },
];

export function getAmbienteBySlug(slug: string): AmbienteData | undefined {
  return ambientes.find((a) => a.slug === slug);
}

export function getAllAmbienteSlugs(): { slug: string }[] {
  return ambientes.map((a) => ({ slug: a.slug }));
}
