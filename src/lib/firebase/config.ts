import type { IntegrationStatus } from "@/types";

export interface FirebaseClientConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

function readEnv(name: string): string {
  return process.env[name]?.trim() ?? "";
}

/** Vercel/UI costuma colar a PEM entre aspas ou com `\n` literal. */
export function readAdminPrivateKey(): string {
  let key = process.env.FIREBASE_ADMIN_PRIVATE_KEY ?? "";
  key = key.trim();
  if (
    (key.startsWith('"') && key.endsWith('"')) ||
    (key.startsWith("'") && key.endsWith("'"))
  ) {
    key = key.slice(1, -1).trim();
  }
  return key.replace(/\\n/g, "\n").replace(/\r\n/g, "\n").trim();
}

export function isSessionSecretConfigured(): boolean {
  return readEnv("STUDIO_SESSION_SECRET").length >= 16;
}

export function getFirebaseClientConfig(): FirebaseClientConfig | null {
  // Next só injeta NEXT_PUBLIC_* no browser com acesso estático.
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY?.trim() ?? "";
  const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN?.trim() ?? "";
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID?.trim() ?? "";
  const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET?.trim() ?? "";
  const messagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID?.trim() ?? "";
  const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID?.trim() ?? "";

  if (!apiKey || !authDomain || !projectId || !appId) {
    return null;
  }

  return {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
  };
}

export function isFirebaseAdminConfigured(): boolean {
  const projectId =
    process.env.FIREBASE_ADMIN_PROJECT_ID?.trim() ||
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID?.trim() ||
    "";
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL?.trim() ?? "";
  const privateKey = readAdminPrivateKey();
  return Boolean(
    projectId && clientEmail && privateKey.includes("BEGIN PRIVATE KEY"),
  );
}

export function isCloudinaryConfigured(): boolean {
  const url = process.env.CLOUDINARY_URL?.trim() ?? "";
  if (url.startsWith("cloudinary://")) return true;
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME?.trim() &&
      process.env.CLOUDINARY_API_KEY?.trim() &&
      process.env.CLOUDINARY_API_SECRET?.trim(),
  );
}

export function getIntegrationStatus(): IntegrationStatus {
  const client = getFirebaseClientConfig();
  return {
    firebaseClient: client !== null,
    firebaseAdmin: isFirebaseAdminConfigured(),
    cloudinary: isCloudinaryConfigured(),
    sessionSecret: isSessionSecretConfigured(),
  };
}

export function isStudioReady(status: IntegrationStatus = getIntegrationStatus()): boolean {
  return status.firebaseClient && status.firebaseAdmin && status.sessionSecret;
}
