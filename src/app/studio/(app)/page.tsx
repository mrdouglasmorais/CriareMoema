import Link from "next/link";
import { FirestoreBanner } from "@/components/studio/firestore-banner";
import { PostList } from "@/components/studio/post-list";
import { buttonVariants } from "@/components/ui/button";
import { studioCopy } from "@/data/studio";
import { listStudioPosts } from "@/lib/posts/repository";
import { isFirebaseAdminConfigured } from "@/lib/firebase/config";

export default async function StudioDashboardPage() {
  const configured = isFirebaseAdminConfigured();
  const posts = configured ? await listStudioPosts() : [];
  const published = posts.filter((post) => post.status === "published").length;
  const drafts = posts.length - published;

  return (
    <div className="mx-auto w-full max-w-5xl space-y-10">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-heading text-[11px] uppercase tracking-[0.18em] text-amber-300/75">
            {studioCopy.dashboardEyebrow}
          </p>
          <h1 className="mt-2 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            {studioCopy.dashboardTitle}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/45">
            {studioCopy.dashboardDescription}
          </p>
        </div>
        <Link href="/studio/posts/novo" className={buttonVariants({ variant: "amber", size: "lg" })}>
          {studioCopy.newPost}
        </Link>
      </header>

      {!configured && (
        <p className="rounded-2xl border border-amber-500/20 bg-amber-500/5 px-4 py-3 text-sm text-amber-100/80">
          {studioCopy.missingConfig}
        </p>
      )}
      <FirestoreBanner />

      <section className="grid gap-4 sm:grid-cols-3" aria-label="Indicadores">
        <StatCard label="Postagens" value={String(posts.length)} />
        <StatCard label="Publicadas" value={String(published)} />
        <StatCard label="Rascunhos" value={String(drafts)} />
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-xl font-bold">Recentes</h2>
          <Link href="/studio/posts" className="text-sm text-white/40 hover:text-amber-300">
            Ver todas
          </Link>
        </div>
        <PostList posts={posts.slice(0, 6)} />
      </section>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-5 py-5">
      <p className="text-xs uppercase tracking-[0.14em] text-white/35">{label}</p>
      <p className="mt-2 font-heading text-3xl font-bold text-white/90">{value}</p>
    </div>
  );
}
