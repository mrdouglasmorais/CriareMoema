import Link from "next/link";
import { FirestoreBanner } from "@/components/studio/firestore-banner";
import { PostList } from "@/components/studio/post-list";
import { buttonVariants } from "@/components/ui/button";
import { studioCopy } from "@/data/studio";
import { isFirebaseAdminConfigured } from "@/lib/firebase/config";
import { listStudioPosts } from "@/lib/posts/repository";

export default async function StudioPostsPage() {
  const posts = isFirebaseAdminConfigured() ? await listStudioPosts() : [];

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight">{studioCopy.posts}</h1>
          <p className="mt-2 text-sm text-white/40">
            Rascunhos ficam só no Studio. Publicadas entram em /blog.
          </p>
        </div>
        <Link href="/studio/posts/novo" className={buttonVariants({ variant: "amber", size: "lg" })}>
          {studioCopy.newPost}
        </Link>
      </header>
      <FirestoreBanner />
      <PostList posts={posts} />
    </div>
  );
}
