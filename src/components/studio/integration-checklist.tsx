import { studioCopy } from "@/data/studio";
import type { IntegrationStatus } from "@/types";
import { cn } from "@/lib/utils";

const items: { key: keyof IntegrationStatus; label: string }[] = [
  { key: "firebaseClient", label: "Firebase Auth (cliente)" },
  { key: "firebaseAdmin", label: "Firebase Admin + Firestore" },
  { key: "sessionSecret", label: "Segredo da sessão do Studio" },
  { key: "allowedEmails", label: "Authentication (e-mail/senha)" },
  { key: "cloudinary", label: "Cloudinary (upload de capas)" },
];

interface IntegrationChecklistProps {
  status: IntegrationStatus;
}

export function IntegrationChecklist({ status }: IntegrationChecklistProps) {
  const ready = items.filter((item) => status[item.key]).length;
  const requiredReady = status.firebaseClient && status.firebaseAdmin && status.sessionSecret;

  return (
    <div
      className={cn(
        "rounded-2xl border px-4 py-4",
        requiredReady ? "border-white/8 bg-white/[0.03]" : "border-amber-500/20 bg-amber-500/5",
      )}
    >
      <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">
        Integrações · {ready}/{items.length}
      </p>
      {!requiredReady && (
        <p className="mt-2 text-sm leading-relaxed text-amber-200/80">{studioCopy.missingConfig}</p>
      )}
      <ul className="mt-3 space-y-1.5">
        {items.map((item) => {
          const ok = status[item.key];
          return (
            <li key={item.key} className="flex items-center gap-2 text-sm text-white/55">
              <span
                className={cn(
                  "size-1.5 rounded-full",
                  ok ? "bg-emerald-400" : "bg-white/20",
                )}
                aria-hidden
              />
              {item.label}
              <span className="sr-only">{ok ? "configurado" : "pendente"}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
