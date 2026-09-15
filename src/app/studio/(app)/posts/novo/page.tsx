import Link from "next/link";
import { PostForm } from "@/components/studio/post-form";
import { studioCopy } from "@/data/studio";
import { isCloudinaryConfigured } from "@/lib/firebase/config";

export default function NewStudioPostPage() {
  return (
    <div className="mx-auto w-full max-w-4xl space-y-8">
      <div>
        <Link href="/studio/posts" className="text-sm text-white/40 hover:text-amber-300">
          {studioCopy.backToPosts}
        </Link>
        <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight">{studioCopy.newPost}</h1>
      </div>
      <PostForm cloudinaryReady={isCloudinaryConfigured()} />
    </div>
  );
}
