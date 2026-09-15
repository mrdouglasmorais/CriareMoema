"use server";

import { requireStudioSession } from "@/lib/auth/session";
import { isCloudinaryConfigured } from "@/lib/firebase/config";
import { uploadBlogCover } from "@/lib/cloudinary";
import { enforceLoadLimit } from "@/lib/integrations/load-gate";
import type { CoverImageAsset } from "@/types";

export type UploadCoverState =
  | { status: "idle" }
  | { status: "success"; asset: CoverImageAsset }
  | { status: "error"; message: string };

export async function uploadStudioCover(
  _prev: UploadCoverState,
  formData: FormData,
): Promise<UploadCoverState> {
  const session = await requireStudioSession();
  const load = enforceLoadLimit("studio.upload", session.email);
  if (!load.ok) {
    return { status: "error", message: load.message };
  }

  if (!isCloudinaryConfigured()) {
    return { status: "error", message: "Cloudinary não configurado." };
  }

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { status: "error", message: "Selecione um arquivo de imagem." };
  }

  try {
    const uploaded = await uploadBlogCover(file);
    return {
      status: "success",
      asset: {
        url: uploaded.url,
        width: uploaded.width,
        height: uploaded.height,
      },
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Falha no upload.";
    return { status: "error", message };
  }
}
