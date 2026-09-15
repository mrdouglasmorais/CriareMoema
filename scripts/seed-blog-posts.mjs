/**
 * Replica as postagens estáticas no Firestore e sobe as capas no Cloudinary.
 * Execute: node scripts/seed-blog-posts.mjs
 */
import { execFileSync } from "node:child_process";
import { readFileSync, unlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { v2 as cloudinary } from "cloudinary";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function loadEnvLocal() {
  const lines = readFileSync(join(root, ".env.local"), "utf8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
    const index = trimmed.indexOf("=");
    const key = trimmed.slice(0, index).trim();
    let value = trimmed.slice(index + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    process.env[key] = value;
  }
}

function optimizeJpeg(inputPath) {
  const outputPath = join(tmpdir(), `criare-cover-${Date.now()}.jpg`);
  execFileSync("sips", [
    "-Z",
    "2400",
    "-s",
    "format",
    "jpeg",
    "-s",
    "formatOptions",
    "82",
    inputPath,
    "--out",
    outputPath,
  ]);
  return outputPath;
}

async function uploadCover(localPath, publicId) {
  const optimized = optimizeJpeg(localPath);
  try {
    const result = await cloudinary.uploader.upload(optimized, {
      folder: "criare-moema/blog",
      public_id: publicId,
      overwrite: true,
      unique_filename: false,
      resource_type: "image",
    });
    return {
      url: result.secure_url,
      width: result.width,
      height: result.height,
      publicId: result.public_id,
    };
  } finally {
    unlinkSync(optimized);
  }
}

loadEnvLocal();

const { blogPosts } = await import("../src/data/blog.ts");

const cloudName = process.env.CLOUDINARY_CLOUD_NAME?.trim();
const apiKey = process.env.CLOUDINARY_API_KEY?.trim();
const apiSecret = process.env.CLOUDINARY_API_SECRET?.trim();
if (!cloudName || !apiKey || !apiSecret) {
  throw new Error("Cloudinary incompleto no .env.local.");
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true,
});

const projectId =
  process.env.FIREBASE_ADMIN_PROJECT_ID?.trim() ||
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID?.trim();
const app =
  getApps()[0] ??
  initializeApp({
    credential: cert({
      projectId,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL?.trim(),
      privateKey: (process.env.FIREBASE_ADMIN_PRIVATE_KEY ?? "").replace(/\\n/g, "\n"),
    }),
  });

const db = getFirestore(app);
const authorEmail =
  process.env.STUDIO_ALLOWED_EMAILS?.split(",")[0]?.trim().toLowerCase() ||
  "studio@criaremoema.com.br";
const now = new Date().toISOString();

console.log(`Seed de ${blogPosts.length} postagens…`);

for (const post of blogPosts) {
  const localImage = join(root, "public", post.coverImage.replace(/^\//, ""));
  const cover = await uploadCover(localImage, post.slug);
  const createdAt = `${post.publishedAt}T12:00:00.000Z`;
  const payload = {
    slug: post.slug,
    title: post.title,
    subtitle: post.subtitle,
    excerpt: post.excerpt,
    content: post.content,
    publishedAt: post.publishedAt,
    updatedAt: now,
    createdAt,
    readingMinutes: post.readingMinutes,
    category: post.category,
    seoTitle: post.seoTitle,
    seoDescription: post.seoDescription,
    keywords: post.keywords,
    coverImage: cover.url,
    coverImageWidth: cover.width,
    coverImageHeight: cover.height,
    coverImageAlt: post.coverImageAlt,
    status: "published",
    authorEmail,
  };

  await db.collection("posts").doc(post.slug).set(payload, { merge: true });
  console.log(`ok  ${post.slug}`);
  console.log(`    ${cover.publicId}  ${cover.width}×${cover.height}`);
}

const snap = await db.collection("posts").get();
console.log(`Firestore posts: ${snap.size}`);
