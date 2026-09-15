import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirebaseClientConfig } from "@/lib/firebase/config";

export function getFirebaseAuth(): Auth | null {
  const config = getFirebaseClientConfig();
  if (!config) return null;

  try {
    const app = getApps().length > 0 ? getApp() : initializeApp(config);
    return getAuth(app);
  } catch {
    return null;
  }
}
