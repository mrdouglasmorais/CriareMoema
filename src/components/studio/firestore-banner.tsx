import { studioCopy } from "@/data/studio";
import { getFirestoreHealth } from "@/lib/firebase/firestore-status";

export function FirestoreBanner() {
  const health = getFirestoreHealth();
  if (health.ok) return null;

  return (
    <p
      className="rounded-2xl border border-amber-500/20 bg-amber-500/5 px-4 py-3 text-sm leading-relaxed text-amber-100/85"
      role="status"
    >
      {studioCopy.firestoreDisabled}
    </p>
  );
}
