import { cache } from "react";
import type { BlogPost } from "@/data/blog";
import { blogPosts } from "@/data/blog";
import { getAdminDb, POSTS_COLLECTION } from "@/lib/firebase/admin";
import { isFirebaseAdminConfigured } from "@/lib/firebase/config";
import {
  describeFirestoreError,
  isFirestoreMarkedUnavailable,
  markFirestoreReady,
} from "@/lib/firebase/firestore-status";
import { parseStudioPost } from "@/lib/posts/parse";
import { hasStructuredHeadings } from "@/lib/posts/content-text";
import { estimateReadingMinutes } from "@/lib/posts/reading-time";
import { isValidSlug } from "@/lib/posts/slug";
import type { PostInput, StudioPost } from "@/types";

function toBlogPost(post: StudioPost): BlogPost {
  return {
    slug: post.slug,
    title: post.title,
    subtitle: post.subtitle,
    excerpt: post.excerpt,
    content: post.content,
    publishedAt: post.publishedAt ?? post.createdAt.slice(0, 10),
    updatedAt: post.updatedAt.slice(0, 10),
    readingMinutes: post.readingMinutes,
    category: post.category,
    seoTitle: post.seoTitle || post.title,
    seoDescription: post.seoDescription || post.excerpt,
    keywords: post.keywords,
    coverImage: post.coverImage,
    coverImageWidth: post.coverImageWidth || 1600,
    coverImageHeight: post.coverImageHeight || 900,
    coverImageAlt: post.coverImageAlt || post.title,
  };
}

const FIRESTORE_TIMEOUT_MS = 8_000;
const POSTS_CACHE_MS = 15_000;

let postsCache: { at: number; posts: StudioPost[] } | null = null;

export function clearPostsCache(): void {
  postsCache = null;
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Firestore timeout")), ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error: unknown) => {
        clearTimeout(timer);
        reject(error);
      },
    );
  });
}

async function fetchFirestorePosts(): Promise<StudioPost[]> {
  if (!isFirebaseAdminConfigured() || isFirestoreMarkedUnavailable()) return [];
  if (postsCache && Date.now() - postsCache.at < POSTS_CACHE_MS) {
    return postsCache.posts;
  }

  try {
    const snap = await withTimeout(
      getAdminDb().collection(POSTS_COLLECTION).get(),
      FIRESTORE_TIMEOUT_MS,
    );
    markFirestoreReady();
    const posts = snap.docs
      .map((doc) => parseStudioPost(doc.id, doc.data()))
      .filter((post): post is StudioPost => post !== null);
    postsCache = { at: Date.now(), posts };
    return posts;
  } catch (error) {
    describeFirestoreError(error);
    return postsCache?.posts ?? [];
  }
}

export async function listStudioPosts(): Promise<StudioPost[]> {
  const posts = await fetchFirestorePosts();
  return posts.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function getStudioPostById(id: string): Promise<StudioPost | null> {
  if (!isFirebaseAdminConfigured() || isFirestoreMarkedUnavailable()) return null;

  try {
    const doc = await getAdminDb().collection(POSTS_COLLECTION).doc(id).get();
    markFirestoreReady();
    if (!doc.exists) return null;
    return parseStudioPost(doc.id, doc.data());
  } catch (error) {
    describeFirestoreError(error);
    return null;
  }
}

export async function findStudioPostBySlug(
  slug: string,
  excludeId?: string,
): Promise<StudioPost | null> {
  if (!isFirebaseAdminConfigured() || isFirestoreMarkedUnavailable()) return null;

  try {
    const snap = await getAdminDb()
      .collection(POSTS_COLLECTION)
      .where("slug", "==", slug)
      .limit(5)
      .get();

    markFirestoreReady();
    const match = snap.docs
      .map((doc) => parseStudioPost(doc.id, doc.data()))
      .find((post) => post && post.id !== excludeId);

    return match ?? null;
  } catch (error) {
    describeFirestoreError(error);
    return null;
  }
}

export async function getPublishedFirestorePosts(): Promise<StudioPost[]> {
  const posts = await fetchFirestorePosts();
  return posts
    .filter((post) => post.status === "published")
    .sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""));
}

export const getPublishedPosts = cache(async function getPublishedPosts(): Promise<BlogPost[]> {
  const firestorePosts = await getPublishedFirestorePosts();
  const firestoreSlugs = new Set(firestorePosts.map((post) => post.slug));
  const staticRemaining = blogPosts.filter((post) => !firestoreSlugs.has(post.slug));

  return [...firestorePosts.map(toBlogPost), ...staticRemaining].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );
});

export async function getPublishedPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const posts = await getPublishedPosts();
  return posts.find((post) => post.slug === slug);
}

export async function getAllPublishedSlugs(): Promise<{ slug: string }[]> {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export function validatePostForSave(input: PostInput): string | null {
  if (!input.title.trim()) return "Informe o título.";
  if (!isValidSlug(input.slug)) {
    return "O slug deve ter apenas letras minúsculas, números e hífens.";
  }
  return null;
}

export function validatePostForPublish(input: PostInput): string | null {
  const saveError = validatePostForSave(input);
  if (saveError) return saveError;
  if (!input.excerpt.trim() || input.excerpt.trim().length < 70) {
    return "O resumo precisa ter pelo menos 70 caracteres para o Google.";
  }
  if (!input.coverImage.trim()) return "Envie ou informe a imagem de capa para publicar.";
  if (!input.coverImageAlt.trim()) {
    return "Informe o texto alternativo da capa (Google e acessibilidade).";
  }
  const seoTitle = (input.seoTitle || input.title).trim();
  if (seoTitle.length < 30 || seoTitle.length > 70) {
    return "O título SEO deve ter entre 30 e 70 caracteres.";
  }
  const seoDescription = (input.seoDescription || input.excerpt).trim();
  if (seoDescription.length < 70 || seoDescription.length > 170) {
    return "A descrição SEO deve ter entre 70 e 170 caracteres.";
  }
  if (input.keywords.length < 2) {
    return "Informe pelo menos duas palavras-chave.";
  }
  const hasBody = input.content.some((block) => {
    if (block.type === "list") return block.items.some((item) => item.trim().length > 0);
    return block.text.trim().length > 0;
  });
  if (!hasBody) return "Escreva o conteúdo da postagem antes de publicar.";
  if (!hasStructuredHeadings(input.content)) {
    return "Inclua pelo menos um título H2/H3 no conteúdo — o Google usa essa hierarquia.";
  }
  return null;
}

export async function upsertStudioPost(
  input: PostInput,
  authorEmail: string,
): Promise<StudioPost> {
  const saveError = validatePostForSave(input);
  if (saveError) throw new Error(saveError);
  if (input.status === "published") {
    const publishError = validatePostForPublish(input);
    if (publishError) throw new Error(publishError);
  }

  const existingBySlug = await findStudioPostBySlug(input.slug, input.id);
  if (existingBySlug) {
    throw new Error("Já existe uma postagem com este slug.");
  }

  const now = new Date().toISOString();
  const db = getAdminDb();
  const ref = input.id
    ? db.collection(POSTS_COLLECTION).doc(input.id)
    : db.collection(POSTS_COLLECTION).doc();

  let createdAt = now;
  let publishedAt: string | null = input.status === "published" ? now.slice(0, 10) : null;

  if (input.id) {
    const current = await getStudioPostById(input.id);
    if (!current) throw new Error("Postagem não encontrada.");
    createdAt = current.createdAt;
    publishedAt =
      input.status === "published"
        ? current.publishedAt ?? now.slice(0, 10)
        : current.publishedAt;
  }

  const payload: Omit<StudioPost, "id"> = {
    slug: input.slug,
    title: input.title,
    subtitle: input.subtitle,
    excerpt: input.excerpt,
    content: input.content,
    publishedAt,
    updatedAt: now,
    createdAt,
    readingMinutes: estimateReadingMinutes(input.content),
    category: input.category,
    seoTitle: input.seoTitle || input.title,
    seoDescription: input.seoDescription || input.excerpt,
    keywords: input.keywords,
    coverImage: input.coverImage,
    coverImageWidth: input.coverImageWidth,
    coverImageHeight: input.coverImageHeight,
    coverImageAlt: input.coverImageAlt || input.title,
    status: input.status,
    authorEmail,
  };

  try {
    await ref.set(payload, { merge: true });
    markFirestoreReady();
    clearPostsCache();
  } catch (error) {
    throw new Error(describeFirestoreError(error));
  }

  return { id: ref.id, ...payload };
}

export async function deleteStudioPost(id: string): Promise<void> {
  if (!isFirebaseAdminConfigured()) {
    throw new Error("Firebase Admin não configurado.");
  }
  try {
    await getAdminDb().collection(POSTS_COLLECTION).doc(id).delete();
    markFirestoreReady();
    clearPostsCache();
  } catch (error) {
    throw new Error(describeFirestoreError(error));
  }
}
