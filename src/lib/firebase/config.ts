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
    readEnv("FIREBASE_ADMIN_PROJECT_ID") || readEnv("NEXT_PUBLIC_FIREBASE_PROJECT_ID");
  return Boolean(
    projectId &&
      readEnv("FIREBASE_ADMIN_CLIENT_EMAIL") &&
      readEnv("FIREBASE_ADMIN_PRIVATE_KEY"),
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

export function getAllowedStudioEmails(): string[] {
  return readEnv("STUDIO_ALLOWED_EMAILS")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function getIntegrationStatus(): IntegrationStatus {
  const client = getFirebaseClientConfig();
  return {
    firebaseClient: client !== null,
    firebaseAdmin: isFirebaseAdminConfigured(),
    cloudinary: isCloudinaryConfigured(),
    sessionSecret: Boolean(readEnv("STUDIO_SESSION_SECRET")),
    allowedEmails: getAllowedStudioEmails().length > 0,
  };
}

export function isStudioReady(status: IntegrationStatus = getIntegrationStatus()): boolean {
  return status.firebaseClient && status.firebaseAdmin && status.sessionSecret;
}
