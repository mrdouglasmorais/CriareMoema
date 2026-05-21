/**
 * Imagens da marca em `public/brand/`.
 * Slots marcados com "placeholder" usam a imagem genérica mais próxima —
 * substitua o `src` quando a imagem específica estiver disponível.
 */
export const brandImages = {
  hero: { src: "/brand/hero.jpg", width: 3500, height: 2049 },
  logo: { src: "/brand/logo.png", width: 209, height: 70 },
  icon: { src: "/brand/icon.png", width: 200, height: 200 },
  ambientes: { src: "/brand/ambientes.jpg", width: 3499, height: 2191 },
  showcase1: { src: "/brand/showcase-1.jpg", width: 2333, height: 3499 },
  showcase2: { src: "/brand/showcase-2.jpg", width: 2393, height: 3500 },
  depoimentos: { src: "/brand/depoimentos.jpg", width: 2400, height: 1600 },
  /** Projetos assinados */
  projetoAssinado1: { src: "/catalog/cat-04428.jpg", width: 6883, height: 4636 },
  projetoAssinado2: { src: "/catalog/cat-04404.jpg", width: 6426, height: 3974 },
  projetoAssinado3: { src: "/catalog/cat-05004.jpg", width: 7008, height: 4429 },
  /** Para Profissionais hero */
  paraProfissionais: { src: "/catalog/cat-05161.jpg", width: 6816, height: 4439 },
  /** Detalhe de acabamento */
  acabamentoDetalhe: { src: "/catalog/cat-05051.jpg", width: 4577, height: 6865 },
} as const;
