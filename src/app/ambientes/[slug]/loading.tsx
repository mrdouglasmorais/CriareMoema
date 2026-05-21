/**
 * Skeleton de carregamento para páginas de Ambiente individuais.
 */
export default function AmbienteSlugLoading() {
  return (
    <div className="w-full">
      {/* Hero image full-width */}
      <div className="relative h-[50svh] min-h-[320px] w-full animate-pulse bg-white/5">
        <div className="absolute inset-x-0 bottom-8 mx-auto max-w-6xl px-4 sm:px-6">
          <div className="space-y-3">
            <div className="h-3 w-20 animate-pulse rounded-full bg-amber-500/30" />
            <div className="h-10 w-1/2 animate-pulse rounded-xl bg-white/10" />
            <div className="h-4 w-1/3 animate-pulse rounded-full bg-white/7" />
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_360px]">
          {/* Main content */}
          <div className="space-y-6">
            <div className="h-6 w-2/3 animate-pulse rounded-xl bg-white/8" />
            <div className="space-y-2">
              <div className="h-4 w-full animate-pulse rounded-full bg-white/5" />
              <div className="h-4 w-full animate-pulse rounded-full bg-white/5" />
              <div className="h-4 w-4/5 animate-pulse rounded-full bg-white/4" />
            </div>

            {/* Image gallery strip */}
            <div className="mt-8 grid grid-cols-3 gap-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="vitral-card aspect-[4/3] animate-pulse bg-white/5"
                  style={{ animationDelay: `${i * 60}ms` }}
                />
              ))}
            </div>
          </div>

          {/* Sidebar CTA */}
          <div className="vitral-card animate-pulse space-y-4 p-6">
            <div className="h-5 w-3/4 animate-pulse rounded-lg bg-white/8" />
            <div className="h-4 w-full animate-pulse rounded-full bg-white/5" />
            <div className="h-4 w-2/3 animate-pulse rounded-full bg-white/4" />
            <div className="mt-4 h-12 w-full animate-pulse rounded-xl bg-amber-500/20" />
          </div>
        </div>
      </div>
    </div>
  );
}
