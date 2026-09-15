"use server";

import { requireStudioSession } from "@/lib/auth/session";
import { isCloudinaryConfigured } from "@/lib/firebase/config";
import { uploadBlogCover } from "@/lib/cloudinary";
import type { CoverImageAsset } from "@/types";

export async function uploadStudioCover(
  formData: FormData,
): Promise<{ ok: true; asset: CoverImageAsset } | { ok: false; message: string }> {
  await requireStudioSession();

  if (!isCloudinaryConfigured()) {
    return { ok: false, message: "Cloudinary não configurado." };
  }

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, message: "Selecione um arquivo de imagem." };
  }

  try {
    const uploaded = await uploadBlogCover(file);
    return {
      ok: true,
      asset: {
        url: uploaded.url,
        width: uploaded.width,
        height: uploaded.height,
      },
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Falha no upload.";
    return { ok: false, message };
  }
}
