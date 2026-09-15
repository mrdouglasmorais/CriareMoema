import Link from "next/link";
import { notFound } from "next/navigation";
import { PostForm } from "@/components/studio/post-form";
import { studioCopy } from "@/data/studio";
import { isCloudinaryConfigured } from "@/lib/firebase/config";
import { getStudioPostById } from "@/lib/posts/repository";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditStudioPostPage({ params }: Props) {
  const { id } = await params;
  const post = await getStudioPostById(id);
  if (!post) notFound();

  return (
    <div className="mx-auto w-full max-w-4xl space-y-8">
      <div>
        <Link href="/studio/posts" className="text-sm text-white/40 hover:text-amber-300">
          {studioCopy.backToPosts}
        </Link>
        <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight">Editar postagem</h1>
        <p className="mt-2 text-sm text-white/35">/{post.slug}</p>
      </div>
      <PostForm post={post} cloudinaryReady={isCloudinaryConfigured()} />
    </div>
  );
}
