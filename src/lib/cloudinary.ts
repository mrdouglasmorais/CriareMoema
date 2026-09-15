import { v2 as cloudinary } from "cloudinary";
import { isCloudinaryConfigured } from "@/lib/firebase/config";

const MAX_BYTES = 8 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

function configureCloudinary(): void {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
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

  configureCloudinary();

  const buffer = Buffer.from(await file.arrayBuffer());
  const dataUri = `data:${file.type};base64,${buffer.toString("base64")}`;

  const result = await cloudinary.uploader.upload(dataUri, {
    folder: "criare-moema/blog",
    resource_type: "image",
    overwrite: false,
  });

  return {
    url: result.secure_url,
    width: result.width,
    height: result.height,
    publicId: result.public_id,
  };
}
