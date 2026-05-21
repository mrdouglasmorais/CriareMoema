export interface BlogPost {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  content: BlogBlock[];
  publishedAt: string;
  updatedAt?: string;
  readingMinutes: number;
  category: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  coverImage: string;
  coverImageWidth: number;
  coverImageHeight: number;
  coverImageAlt: string;
}

export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "list"; items: string[] }
  | { type: "callout"; text: string };

export const blogPosts: BlogPost[] = [
  {
    slug: "cozinha-planejada-alto-padrao-tendencias-2025",
    title: "Cozinha Planejada de Alto Padrão: 5 Tendências para 2025",
    subtitle: "Do Laccato matte ao open concept — o que os melhores projetos têm em comum",
    excerpt:
      "O mercado de alto padrão em São Paulo nunca esteve tão sofisticado. Entenda as tendências que estão moldando os projetos de cozinha planejada em 2025 — e como aplicá-las no seu espaço.",
    publishedAt: "2025-04-10",
    readingMinutes: 6,
    category: "Trend Report",
    seoTitle: "Cozinha Planejada de Alto Padrão: 5 Tendências para 2025 | Criare Moema",
    seoDescription:
      "Descubra as principais tendências em cozinha planejada de alto padrão para 2025: acabamentos, materiais e conceitos que estão transformando os melhores projetos em São Paulo.",
    keywords: [
      "cozinha planejada 2025",
      "tendências cozinha alto padrão",
      "cozinha planejada Moema",
      "móveis planejados tendências",
      "design de cozinha 2025",
    ],
    coverImage: "/catalog/cat-04003.jpg",
    coverImageWidth: 7008,
    coverImageHeight: 4104,
    coverImageAlt: "Cozinha planejada de alto padrão em madeirado com ilha e bancada em branco — Criare Moema",
    content: [
      {
        type: "paragraph",
        text: "O ano de 2025 consolida uma virada que começou a ganhar força após a pandemia: o ambiente doméstico — especialmente a cozinha — passou a ser tratado com a mesma seriedade de uma área social. E essa mudança de postura reflete diretamente nos projetos de móveis planejados de alto padrão.",
      },
      {
        type: "heading",
        level: 2,
        text: "1. Laccato matte como protagonista",
      },
      {
        type: "paragraph",
        text: "Se o laccato brilhante dominou a última década, 2025 é o ano do matte. Acabamentos foscos em tons de branco neve, cinza chumbo e verde musgo aparecem em projetos de cozinha como escolha principal — não apenas como complemento. O acabamento matte tem uma vantagem prática importante: dissimula impressões digitais e micro-riscos com muito mais eficiência que o brilhante.",
      },
      {
        type: "heading",
        level: 2,
        text: "2. Open concept inteligente — com zonas definidas",
      },
      {
        type: "paragraph",
        text: "O open concept continua, mas com uma evolução importante: a definição clara de zonas funcionais. Balcões de granito ou Silestone que funcionam como ilha de trabalho, painéis de marcenaria que separam visualmente o espaço de preparo da área social, e iluminação direcionada que reforça cada zona. A integração existe, mas o projeto não abre mão da organização.",
      },
      {
        type: "heading",
        level: 2,
        text: "3. Marcenaria que esconde a marcenaria",
      },
      {
        type: "paragraph",
        text: "Frigoríficos de embutir, coifas integradas ao forro, e eletrodomésticos escondidos atrás de painéis de Laccato ou madeirado — a tendência é criar uma cozinha que parece um ambiente contínuo, onde a funcionalidade fica oculta atrás da estética. Esse resultado exige precisão milimétrica na execução, algo que só a marcenaria de processo fabril consegue entregar de forma consistente.",
      },
      {
        type: "heading",
        level: 2,
        text: "4. Iluminação LED integrada em camadas",
      },
      {
        type: "paragraph",
        text: "A iluminação deixou de ser um item de elétrica e passou a ser parte integrante do projeto de marcenaria. Fita LED sob gabinetes aéreos para iluminação de trabalho, perfis embutidos no teto falso para luz indireta e spots direcionáveis para a ilha — as melhores cozinhas de 2025 têm pelo menos três camadas de iluminação, todas controladas por dimmer ou automação.",
      },
      {
        type: "heading",
        level: 2,
        text: "5. Gavetas no lugar de portas",
      },
      {
        type: "paragraph",
        text: "Os gaveteiros sob a bancada — com divisórias internas e corrediças de amortecimento Blum — substituem as portas convencionais na parte inferior dos gabinetes. O ganho de praticidade é imenso: menos agachamentos, acesso visual imediato a tudo, e melhor aproveitamento do espaço interno. É uma das tendências mais funcionais e que mais impacta o uso cotidiano da cozinha.",
      },
      {
        type: "callout",
        text: "Na Criare Moema, todos esses recursos já fazem parte do nosso portfólio de projetos. Se você quer uma cozinha planejada que incorpore essas tendências com execução impecável, nossa equipe está pronta para transformar seu espaço.",
      },
    ],
  },
  {
    slug: "closet-planejado-luxo-como-especificar",
    title: "Como Especificar um Closet Planejado de Luxo",
    subtitle: "Guia técnico para arquitetos e proprietários que exigem o melhor",
    excerpt:
      "Do dimensionamento ao acabamento: tudo o que você precisa saber para especificar um closet planejado de alto padrão que funcione de verdade.",
    publishedAt: "2025-03-18",
    readingMinutes: 5,
    category: "Para Arquitetos",
    seoTitle: "Como Especificar um Closet Planejado de Luxo | Criare Moema",
    seoDescription:
      "Guia completo para especificar closets planejados de luxo: dimensionamento, acabamentos, iluminação e os erros mais comuns. Para arquitetos e proprietários exigentes.",
    keywords: [
      "closet planejado luxo",
      "especificação closet arquiteto",
      "closet alto padrão",
      "walk-in closet",
      "closet sob medida Moema",
    ],
    coverImage: "/catalog/cat-04532.jpg",
    coverImageWidth: 7008,
    coverImageHeight: 4672,
    coverImageAlt: "Closet planejado de alto padrão com portas deslizantes em nude — Criare Moema",
    content: [
      {
        type: "paragraph",
        text: "Um closet de luxo não é apenas um roupeiro grande. É um ambiente projetado a partir do acervo — quantidade e tipologia de peças, acessórios, calçados — e das rotinas de quem vai usar. Essa distinção é fundamental para quem especifica ou contrata um projeto dessa natureza.",
      },
      {
        type: "heading",
        level: 2,
        text: "Começar pelo acervo, não pelo espaço",
      },
      {
        type: "paragraph",
        text: "O erro mais comum em projetos de closet é dimensionar o espaço sem levantar o acervo. Quantas calças, quantos ternos, quantos pares de sapato? Essa análise define se o projeto precisa de mais cabideiros simples ou duplos, se a sapateira deve ser exposta ou fechada, e se gaveteiros para acessórios são prioritários.",
      },
      {
        type: "heading",
        level: 2,
        text: "Iluminação: a variável negligenciada",
      },
      {
        type: "paragraph",
        text: "Closets mal iluminados são funcionalmente ineficazes — você não consegue distinguir cores corretamente e acaba usando iluminação suplementar improvisada. O padrão em projetos de luxo é: perfis LED lineares na parte superior de cada seção de cabideiro, spots focados na sapateira e, quando o espaço permite, uma luminária de teto com IRC acima de 90 para fidelidade de cores.",
      },
      {
        type: "callout",
        text: "Arquiteto, a Criare Moema tem catálogo técnico completo e blocos 3D para facilitar a especificação dos seus projetos. Acesse nossa área para profissionais.",
      },
    ],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllBlogSlugs(): { slug: string }[] {
  return blogPosts.map((p) => ({ slug: p.slug }));
}
