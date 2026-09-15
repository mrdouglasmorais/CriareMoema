import type { BlogPost } from "@/data/blog";
import {
  countContentWords,
  flattenBlogContent,
  imageMimeType,
  toIsoDateTime,
} from "@/lib/posts/content-text";
import { siteConfig } from "@/lib/site-config";
import type { JsonLdNode } from "@/components/seo/json-ld";

const orgId = `${siteConfig.url}#organization`;
const blogId = `${siteConfig.url}/blog#blog`;
const logoUrl = new URL(siteConfig.organization.logoPath, siteConfig.url).toString();

function absoluteUrl(pathOrUrl: string): string {
  return new URL(pathOrUrl, siteConfig.url).toString();
}

function organizationNode(): JsonLdNode {
  return {
    "@type": "Organization",
    "@id": orgId,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      url: logoUrl,
      width: 200,
      height: 200,
    },
  };
}

export function buildBlogCollectionJsonLd(posts: BlogPost[]): JsonLdNode[] {
  const blogUrl = `${siteConfig.url}/blog`;

  return [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: siteConfig.url },
        { "@type": "ListItem", position: 2, name: "Blog", item: blogUrl },
      ],
    },
    {
      "@type": "Blog",
      "@id": blogId,
      name: `Blog ${siteConfig.name}`,
      description:
        "Trend Reports, guias técnicos e tendências em móveis planejados de alto padrão em São Paulo.",
      url: blogUrl,
      inLanguage: siteConfig.language,
      publisher: { "@id": orgId },
      blogPost: posts.map((post) => ({
        "@type": "BlogPosting",
        "@id": `${absoluteUrl(`/blog/${post.slug}`)}#article`,
        headline: post.title,
        url: absoluteUrl(`/blog/${post.slug}`),
        datePublished: toIsoDateTime(post.publishedAt),
      })),
    },
    {
      "@type": "ItemList",
      name: `Artigos do blog ${siteConfig.name}`,
      itemListOrder: "https://schema.org/ItemListOrderDescending",
      numberOfItems: posts.length,
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(`/blog/${post.slug}`),
        name: post.title,
      })),
    },
  ];
}

export function buildBlogPostJsonLd(post: BlogPost): JsonLdNode[] {
  const postUrl = absoluteUrl(`/blog/${post.slug}`);
  const imageUrl = absoluteUrl(post.coverImage);
  const published = toIsoDateTime(post.publishedAt);
  const modified = toIsoDateTime(post.updatedAt ?? post.publishedAt);
  const articleBody = flattenBlogContent(post.content);
  const wordCount = countContentWords(post.content);

  return [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: siteConfig.url },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${siteConfig.url}/blog` },
        { "@type": "ListItem", position: 3, name: post.title, item: postUrl },
      ],
    },
    {
      "@type": "BlogPosting",
      "@id": `${postUrl}#article`,
      headline: post.title.slice(0, 110),
      alternativeHeadline: post.subtitle || undefined,
      name: post.title,
      description: post.seoDescription || post.excerpt,
      url: postUrl,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": postUrl,
      },
      inLanguage: siteConfig.language,
      datePublished: published,
      dateModified: modified,
      articleSection: post.category,
      keywords: post.keywords.join(", "),
      wordCount,
      timeRequired: `PT${Math.max(1, post.readingMinutes)}M`,
      articleBody: articleBody || post.excerpt,
      thumbnailUrl: imageUrl,
      image: {
        "@type": "ImageObject",
        url: imageUrl,
        contentUrl: imageUrl,
        width: post.coverImageWidth,
        height: post.coverImageHeight,
        caption: post.coverImageAlt,
        encodingFormat: imageMimeType(post.coverImage),
      },
      author: organizationNode(),
      publisher: organizationNode(),
      copyrightHolder: { "@id": orgId },
      isPartOf: {
        "@type": "Blog",
        "@id": blogId,
        name: `Blog ${siteConfig.name}`,
        url: `${siteConfig.url}/blog`,
      },
      about: {
        "@type": "Thing",
        name: post.category,
      },
      mentions: {
        "@type": "Place",
        name: "Moema, São Paulo",
        address: {
          "@type": "PostalAddress",
          addressLocality: siteConfig.address.addressLocality,
          addressRegion: siteConfig.address.addressRegion,
          addressCountry: siteConfig.address.addressCountry,
        },
      },
    },
  ];
}
