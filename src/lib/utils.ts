import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** URL absoluta — Cloudinary e afins já vêm otimizados no CDN. */
export function isRemoteImageSrc(src: string): boolean {
  return src.startsWith("https://") || src.startsWith("http://");
}
