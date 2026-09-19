import { ChangePasswordForm } from "@/components/studio/change-password-form";
import { studioCopy } from "@/data/studio";
import { requireStudioSession } from "@/lib/auth/session";

export const metadata = {
  title: "Conta",
};

export default async function StudioAccountPage() {
  const session = await requireStudioSession();

  return (
    <div className="mx-auto w-full max-w-lg space-y-8">
      <header>
        <p className="font-heading text-[11px] uppercase tracking-[0.18em] text-amber-300/75">
          {studioCopy.accountEyebrow}
        </p>
        <h1 className="mt-2 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          {studioCopy.accountTitle}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-white/45">{studioCopy.accountDescription}</p>
        <p className="mt-2 text-sm text-white/60">{session.email}</p>
      </header>

      <div className="rounded-3xl border border-white/8 bg-white/[0.03] p-6">
        <ChangePasswordForm
          defaultEmail={session.email}
          lockEmail
          successMessage={studioCopy.changePasswordUpdated}
        />
      </div>
    </div>
  );
}
