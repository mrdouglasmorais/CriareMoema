export const FIRESTORE_SETUP_MESSAGE =
  "O Firestore ainda não está ativo no projeto criare-moema. No Firebase Console: Build → Firestore Database → Create database (Native). Depois habilite a API em https://console.developers.google.com/apis/api/firestore.googleapis.com/overview?project=criare-moema";

type Availability = "unknown" | "ready" | "unavailable";

const RETRY_AFTER_MS = 15_000;

let availability: Availability = "unknown";
let unavailableAt = 0;
let warnedUnavailable = false;

function asRecord(value: unknown): Record<string, unknown> | null {
  return typeof value === "object" && value !== null ? (value as Record<string, unknown>) : null;
}

export function isFirestoreUnavailableError(error: unknown): boolean {
  const record = asRecord(error);
  if (!record) return false;

  const code = record.code;
  const reason = typeof record.reason === "string" ? record.reason : "";
  const details = typeof record.details === "string" ? record.details : "";
  const message = error instanceof Error ? error.message : "";
  const haystack = `${reason} ${details} ${message}`;

  return (
    code === 7 ||
    reason === "SERVICE_DISABLED" ||
    haystack.includes("SERVICE_DISABLED") ||
    haystack.includes("Cloud Firestore API has not been used") ||
    haystack.includes("NOT_FOUND: ")
  );
}

export function markFirestoreReady(): void {
  availability = "ready";
}

export function markFirestoreUnavailable(): void {
  availability = "unavailable";
  unavailableAt = Date.now();
  if (!warnedUnavailable) {
    warnedUnavailable = true;
    console.warn(FIRESTORE_SETUP_MESSAGE);
  }
}

export function isFirestoreMarkedUnavailable(): boolean {
  if (availability !== "unavailable") return false;
  if (Date.now() - unavailableAt >= RETRY_AFTER_MS) {
    availability = "unknown";
    return false;
  }
  return true;
}

export function getFirestoreHealth(): { ok: boolean; message: string | null } {
  if (availability === "unavailable") {
    return { ok: false, message: FIRESTORE_SETUP_MESSAGE };
  }
  return { ok: true, message: null };
}

export function describeFirestoreError(error: unknown): string {
  if (isFirestoreUnavailableError(error)) {
    markFirestoreUnavailable();
    return FIRESTORE_SETUP_MESSAGE;
  }
  return error instanceof Error ? error.message : "Falha ao acessar o Firestore.";
}
