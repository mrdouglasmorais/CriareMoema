import Image from "next/image";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { IntegrationChecklist } from "@/components/studio/integration-checklist";
import { LoginForm } from "@/components/studio/login-form";
import { studioCopy } from "@/data/studio";
import { getStudioSession } from "@/lib/auth/session";
import { brandImages } from "@/lib/brand-assets";
import { getIntegrationStatus } from "@/lib/firebase/config";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: "Entrar",
};

export default async function StudioLoginPage() {
  const session = await getStudioSession();
  if (session) {
    redirect("/studio");
  }

  const status = getIntegrationStatus();

  return (
    <div className="flex min-h-dvh items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Image
            src={brandImages.logo.src}
            alt={siteConfig.name}
            width={brandImages.logo.width}
            height={brandImages.logo.height}
            className="mx-auto h-9 w-auto"
            priority
            loading="eager"
          />
          <p className="mt-6 font-heading text-[11px] uppercase tracking-[0.2em] text-amber-300/80">
            {studioCopy.productName}
          </p>
          <h1 className="mt-2 font-heading text-3xl font-bold tracking-tight">{studioCopy.loginTitle}</h1>
          <p className="mt-2 text-sm leading-relaxed text-white/45">{studioCopy.loginSubtitle}</p>
        </div>

        <div className="rounded-3xl border border-white/8 bg-white/[0.03] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
          <Suspense
            fallback={
              <div className="space-y-4" aria-busy="true" aria-label="Carregando formulário">
                <div className="h-12 animate-pulse rounded-xl bg-white/6" />
                <div className="h-12 animate-pulse rounded-xl bg-white/6" />
                <div className="h-12 animate-pulse rounded-xl bg-amber-400/10" />
              </div>
            }
          >
            <LoginForm firebaseReady={status.firebaseClient} />
          </Suspense>
        </div>

        <IntegrationChecklist status={status} />
      </div>
    </div>
  );
}
