import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { studioCopy } from "@/data/studio";
import type { StudioPost } from "@/types";

interface PostListProps {
  posts: StudioPost[];
}

export function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/12 px-6 py-12 text-center">
        <p className="text-sm text-white/45">{studioCopy.emptyPosts}</p>
        <Link
          href="/studio/posts/novo"
          className="mt-4 inline-flex font-heading text-xs uppercase tracking-[0.16em] text-amber-300"
        >
          {studioCopy.newPost}
        </Link>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-white/8 overflow-hidden rounded-2xl border border-white/8">
      {posts.map((post) => (
        <li key={post.id}>
          <Link
            href={`/studio/posts/${post.id}`}
            className="flex flex-col gap-2 px-5 py-4 transition-colors hover:bg-white/[0.04] sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <p className="truncate font-heading text-sm font-semibold text-white/85">{post.title}</p>
              <p className="mt-1 text-xs text-white/35">/{post.slug}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={post.status === "published" ? "default" : "outline"}>
                {post.status === "published" ? studioCopy.published : studioCopy.draft}
              </Badge>
              <span className="text-xs text-white/30">
                {new Date(post.updatedAt).toLocaleDateString("pt-BR")}
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
