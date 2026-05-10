/**
 * Skeleton de carregamento para a listagem de Ambientes.
 */
export default function AmbientesLoading() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
      {/* Hero */}
      <div className="mb-14 space-y-4 text-center">
        <div className="mx-auto h-3 w-28 animate-pulse rounded-full bg-amber-500/25" />
        <div className="mx-auto h-12 w-3/5 animate-pulse rounded-xl bg-white/8" />
        <div className="mx-auto h-5 w-2/5 animate-pulse rounded-lg bg-white/5" />
      </div>

      {/* Grid de ambientes — editorial tall cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="vitral-card overflow-hidden"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            {/* Tall image area */}
            <div
              className="aspect-[3/4] animate-pulse bg-white/5"
              style={{ animationDelay: `${i * 60}ms` }}
            />
            {/* Bottom strip */}
            <div className="space-y-2 p-4">
              <div
                className="h-5 w-3/4 animate-pulse rounded-lg bg-white/8"
                style={{ animationDelay: `${i * 60 + 60}ms` }}
              />
              <div
                className="h-4 w-1/2 animate-pulse rounded-full bg-white/5"
                style={{ animationDelay: `${i * 60 + 80}ms` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
