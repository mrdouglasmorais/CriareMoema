import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";
import { isFirebaseAdminConfigured, readAdminPrivateKey } from "@/lib/firebase/config";

function getAdminApp(): App {
  const existing = getApps()[0];
  if (existing) return existing;

  if (!isFirebaseAdminConfigured()) {
    throw new Error("Firebase Admin não configurado.");
  }

  const projectId =
    process.env.FIREBASE_ADMIN_PROJECT_ID?.trim() ||
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID?.trim() ||
    "";

  return initializeApp({
    credential: cert({
      projectId,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL?.trim() ?? "",
      privateKey: readAdminPrivateKey(),
    }),
  });
}

export function getAdminDb(): Firestore {
  return getFirestore(getAdminApp());
}

export const POSTS_COLLECTION = "posts";
