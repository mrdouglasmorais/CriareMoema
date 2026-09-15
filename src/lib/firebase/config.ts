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
  const apiKey = readEnv("NEXT_PUBLIC_FIREBASE_API_KEY");
  const authDomain = readEnv("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN");
  const projectId = readEnv("NEXT_PUBLIC_FIREBASE_PROJECT_ID");
  const storageBucket = readEnv("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET");
  const messagingSenderId = readEnv("NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID");
  const appId = readEnv("NEXT_PUBLIC_FIREBASE_APP_ID");

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
  return Boolean(
    readEnv("CLOUDINARY_CLOUD_NAME") &&
      readEnv("CLOUDINARY_API_KEY") &&
      readEnv("CLOUDINARY_API_SECRET"),
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
    allowedEmails: true,
  };
}

export function isStudioReady(status: IntegrationStatus = getIntegrationStatus()): boolean {
  return status.firebaseClient && status.firebaseAdmin && status.sessionSecret;
}
