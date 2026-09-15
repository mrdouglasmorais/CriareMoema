import { createRemoteJWKSet, jwtVerify } from "jose";

/**
 * Firebase Admin (`verifyIdToken`) puxa `jwks-rsa`, que faz `require('jose')`.
 * O `jose` v6 é ESM-only; no runtime CJS da Vercel + Turbopack isso vira 500.
 * Validamos o ID token com `jose` direto (JWKS oficial do Secure Token).
 */
const secureTokenJwks = createRemoteJWKSet(
  new URL(
    "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com",
  ),
);

export interface VerifiedFirebaseUser {
  uid: string;
  email: string | null;
}

function getFirebaseProjectId(): string {
  return (
    process.env.FIREBASE_ADMIN_PROJECT_ID?.trim() ||
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID?.trim() ||
    ""
  );
}

function readStringClaim(value: unknown): string | null {
  return typeof value === "string" && value.length > 0 ? value : null;
}

export async function verifyFirebaseIdToken(idToken: string): Promise<VerifiedFirebaseUser> {
  const projectId = getFirebaseProjectId();
  if (!projectId) {
    throw new Error("Firebase projectId ausente no servidor.");
  }

  const { payload } = await jwtVerify(idToken, secureTokenJwks, {
    issuer: `https://securetoken.google.com/${projectId}`,
    audience: projectId,
  });

  const uid = readStringClaim(payload.user_id) ?? readStringClaim(payload.sub);
  if (!uid) {
    throw new Error("Token Firebase sem uid.");
  }

  return {
    uid,
    email: readStringClaim(payload.email),
  };
}
