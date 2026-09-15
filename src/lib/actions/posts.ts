"use server";

import { revalidatePath } from "next/cache";
import { requireStudioSession } from "@/lib/auth/session";
import { isFirebaseAdminConfigured } from "@/lib/firebase/config";
import { parsePostInput } from "@/lib/posts/parse";
import { deleteStudioPost, upsertStudioPost } from "@/lib/posts/repository";
import type { ActionResult, StudioPost } from "@/types";

function revalidateBlog(slug?: string): void {
  revalidatePath("/blog");
  revalidatePath("/sitemap.xml");
  if (slug) {
    revalidatePath(`/blog/${slug}`);
  }
  revalidatePath("/studio");
  revalidatePath("/studio/posts");
}

export async function saveStudioPost(
  raw: unknown,
): Promise<{ ok: true; post: StudioPost } | { ok: false; message: string }> {
  const session = await requireStudioSession();

  if (!isFirebaseAdminConfigured()) {
    return { ok: false, message: "Firebase Admin não configurado." };
  }

  const input = parsePostInput(raw);
  if (!input) {
    return { ok: false, message: "Dados da postagem inválidos." };
  }

  try {
    const post = await upsertStudioPost(input, session.email);
    revalidateBlog(post.slug);
    return { ok: true, post };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Não foi possível salvar.";
    return { ok: false, message };
  }
}

export async function removeStudioPost(id: string, slug?: string): Promise<ActionResult> {
  await requireStudioSession();

  if (!id.trim()) {
    return { ok: false, message: "Identificador ausente." };
  }

  try {
    await deleteStudioPost(id);
    revalidateBlog(slug);
    return { ok: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Não foi possível excluir.";
    return { ok: false, message };
  }
}
