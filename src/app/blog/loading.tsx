/**
 * Skeleton de carregamento para a listagem do Blog.
 */
export default function BlogLoading() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
      {/* Page hero skeleton */}
      <div className="mb-14 space-y-4 text-center">
        <div className="mx-auto h-3 w-32 animate-pulse rounded-full bg-amber-500/25" />
        <div className="mx-auto h-12 w-2/3 animate-pulse rounded-xl bg-white/7" />
        <div className="mx-auto h-4 w-1/2 animate-pulse rounded-full bg-white/4" />
      </div>

      {/* Post cards grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="vitral-card overflow-hidden"
            style={{ animationDelay: `${i * 70}ms` }}
          >
            {/* Thumbnail */}
            <div
              className="aspect-[16/10] animate-pulse bg-white/5"
              style={{ animationDelay: `${i * 70}ms` }}
            />
            {/* Content */}
            <div className="space-y-3 p-5">
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-20 animate-pulse rounded-full bg-amber-500/20"
                  style={{ animationDelay: `${i * 70 + 40}ms` }}
                />
                <div
                  className="h-2 w-2 animate-pulse rounded-full bg-white/10"
                  style={{ animationDelay: `${i * 70 + 50}ms` }}
                />
                <div
                  className="h-3 w-16 animate-pulse rounded-full bg-white/8"
                  style={{ animationDelay: `${i * 70 + 60}ms` }}
                />
              </div>
              <div
                className="h-6 w-5/6 animate-pulse rounded-lg bg-white/9"
                style={{ animationDelay: `${i * 70 + 80}ms` }}
              />
              <div
                className="h-4 w-full animate-pulse rounded-lg bg-white/5"
                style={{ animationDelay: `${i * 70 + 100}ms` }}
              />
              <div
                className="h-4 w-3/4 animate-pulse rounded-lg bg-white/4"
                style={{ animationDelay: `${i * 70 + 120}ms` }}
              />
              <div className="mt-2 border-t border-amber-500/10 pt-3">
                <div
                  className="h-4 w-20 animate-pulse rounded-full bg-amber-500/20"
                  style={{ animationDelay: `${i * 70 + 140}ms` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
