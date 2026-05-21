/**
 * Skeleton de carregamento para artigos individuais do Blog.
 */
export default function BlogPostLoading() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-20 sm:px-6">
      {/* Breadcrumb */}
      <div className="mb-8 flex items-center gap-2">
        <div className="h-3 w-12 animate-pulse rounded-full bg-white/10" />
        <div className="h-2 w-2 animate-pulse rounded-full bg-white/8" />
        <div className="h-3 w-24 animate-pulse rounded-full bg-white/10" />
        <div className="h-2 w-2 animate-pulse rounded-full bg-white/8" />
        <div className="h-3 w-40 animate-pulse rounded-full bg-white/8" />
      </div>

      {/* Hero image */}
      <div className="vitral-card mb-10 aspect-[16/9] animate-pulse overflow-hidden bg-white/5" />

      {/* Meta */}
      <div className="mb-6 flex items-center gap-4">
        <div className="h-3 w-20 animate-pulse rounded-full bg-amber-500/25" />
        <div className="h-3 w-px animate-pulse bg-white/10" />
        <div className="h-3 w-24 animate-pulse rounded-full bg-white/10" />
        <div className="h-3 w-px animate-pulse bg-white/10" />
        <div className="h-3 w-16 animate-pulse rounded-full bg-white/10" />
      </div>

      {/* Title */}
      <div className="mb-4 space-y-3">
        <div className="h-9 w-full animate-pulse rounded-xl bg-white/9" />
        <div className="h-9 w-4/5 animate-pulse rounded-xl bg-white/7" />
      </div>

      {/* Lead paragraph */}
      <div className="mb-10 space-y-2">
        <div className="h-5 w-full animate-pulse rounded-lg bg-white/6" />
        <div className="h-5 w-full animate-pulse rounded-lg bg-white/5" />
        <div className="h-5 w-3/4 animate-pulse rounded-lg bg-white/4" />
      </div>

      {/* Body paragraphs */}
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="mb-8 space-y-2">
          {i % 2 === 0 && (
            <div
              className="mb-3 h-6 w-2/5 animate-pulse rounded-lg bg-white/7"
              style={{ animationDelay: `${i * 60}ms` }}
            />
          )}
          <div className="h-4 w-full animate-pulse rounded-full bg-white/5" style={{ animationDelay: `${i * 60 + 20}ms` }} />
          <div className="h-4 w-full animate-pulse rounded-full bg-white/4" style={{ animationDelay: `${i * 60 + 35}ms` }} />
          <div className="h-4 w-5/6 animate-pulse rounded-full bg-white/4" style={{ animationDelay: `${i * 60 + 50}ms` }} />
          <div className="h-4 w-4/5 animate-pulse rounded-full bg-white/3" style={{ animationDelay: `${i * 60 + 65}ms` }} />
        </div>
      ))}
    </div>
  );
}
