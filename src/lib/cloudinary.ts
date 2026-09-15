import { v2 as cloudinary } from "cloudinary";
import { isCloudinaryConfigured } from "@/lib/firebase/config";

const MAX_BYTES = 8 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

function configureCloudinary(): void {
  const url = process.env.CLOUDINARY_URL?.trim() ?? "";
  if (url.startsWith("cloudinary://")) {
    cloudinary.config({ url, secure: true });
    return;
  }

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME?.trim(),
    api_key: process.env.CLOUDINARY_API_KEY?.trim(),
    api_secret: process.env.CLOUDINARY_API_SECRET?.trim(),
    secure: true,
  });
}

export function assertAllowedImage(file: File): string | null {
  if (!ALLOWED_TYPES.has(file.type)) {
    return "Use uma imagem JPG, PNG ou WebP.";
  }
  if (file.size > MAX_BYTES) {
    return "A imagem deve ter no máximo 8 MB.";
  }
  return null;
}

function uploadBuffer(
  buffer: Buffer,
): Promise<{ url: string; width: number; height: number; publicId: string }> {
  configureCloudinary();

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "criare-moema/blog",
        resource_type: "image",
        overwrite: false,
        unique_filename: true,
      },
      (error, result) => {
        if (error || !result?.secure_url) {
          reject(error ?? new Error("Cloudinary retornou upload vazio."));
          return;
        }
        resolve({
          url: result.secure_url,
          width: result.width,
          height: result.height,
          publicId: result.public_id,
        });
      },
    );
    stream.end(buffer);
  });
}

export async function uploadBlogCover(file: File): Promise<{
  url: string;
  width: number;
  height: number;
  publicId: string;
}> {
  if (!isCloudinaryConfigured()) {
    throw new Error("Cloudinary não configurado.");
  }

  const invalid = assertAllowedImage(file);
  if (invalid) {
    throw new Error(invalid);
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  return uploadBuffer(buffer);
}
