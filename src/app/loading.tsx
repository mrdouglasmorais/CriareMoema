/**
 * Global loading skeleton — exibido pelo Next.js App Router durante o carregamento
 * de qualquer segmento de rota que não tenha seu próprio loading.tsx.
 */
export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
      {/* Hero skeleton */}
      <div className="mb-16 space-y-5">
        <div className="h-3 w-28 animate-pulse rounded-full bg-amber-500/20" />
        <div className="h-10 w-3/4 animate-pulse rounded-xl bg-white/6" />
        <div className="h-10 w-1/2 animate-pulse rounded-xl bg-white/4" />
        <div className="mt-3 h-4 w-2/3 animate-pulse rounded-full bg-white/5" />
      </div>

      {/* Grid skeleton */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="vitral-card overflow-hidden"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div
              className="aspect-[4/3] animate-pulse bg-white/5"
              style={{ animationDelay: `${i * 80}ms` }}
            />
            <div className="space-y-3 p-5">
              <div
                className="h-3 w-1/3 animate-pulse rounded-full bg-amber-500/20"
                style={{ animationDelay: `${i * 80 + 50}ms` }}
              />
              <div
                className="h-5 w-5/6 animate-pulse rounded-lg bg-white/8"
                style={{ animationDelay: `${i * 80 + 80}ms` }}
              />
              <div
                className="h-4 w-full animate-pulse rounded-lg bg-white/5"
                style={{ animationDelay: `${i * 80 + 100}ms` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
