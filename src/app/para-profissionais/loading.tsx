/**
 * Skeleton de carregamento para a página Para Profissionais.
 */
export default function ParaProfissionaisLoading() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
      {/* Page hero */}
      <div className="mb-16 space-y-4 text-center">
        <div className="mx-auto h-3 w-40 animate-pulse rounded-full bg-amber-500/25" />
        <div className="mx-auto h-12 w-2/3 animate-pulse rounded-xl bg-white/8" />
        <div className="mx-auto h-5 w-1/2 animate-pulse rounded-lg bg-white/5" />
        <div className="mx-auto mt-4 flex justify-center gap-3">
          <div className="h-12 w-40 animate-pulse rounded-xl bg-amber-500/25" />
          <div className="h-12 w-36 animate-pulse rounded-xl bg-white/8" />
        </div>
      </div>

      {/* Benefits grid */}
      <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="vitral-card space-y-3 p-6"
            style={{ animationDelay: `${i * 70}ms` }}
          >
            <div
              className="h-11 w-11 animate-pulse rounded-xl bg-amber-500/15"
              style={{ animationDelay: `${i * 70 + 40}ms` }}
            />
            <div
              className="h-5 w-3/4 animate-pulse rounded-lg bg-white/8"
              style={{ animationDelay: `${i * 70 + 60}ms` }}
            />
            <div
              className="h-4 w-full animate-pulse rounded-full bg-white/5"
              style={{ animationDelay: `${i * 70 + 80}ms` }}
            />
            <div
              className="h-4 w-4/5 animate-pulse rounded-full bg-white/4"
              style={{ animationDelay: `${i * 70 + 100}ms` }}
            />
          </div>
        ))}
      </div>

      {/* Form section */}
      <div className="vitral-card mx-auto max-w-2xl p-8">
        <div className="mb-6 space-y-3">
          <div className="h-3 w-28 animate-pulse rounded-full bg-amber-500/25" />
          <div className="h-7 w-3/4 animate-pulse rounded-xl bg-white/8" />
        </div>
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="h-12 animate-pulse rounded-xl bg-white/6" />
            <div className="h-12 animate-pulse rounded-xl bg-white/6" />
          </div>
          <div className="h-12 animate-pulse rounded-xl bg-white/6" />
          <div className="h-28 animate-pulse rounded-xl bg-white/5" />
          <div className="h-13 animate-pulse rounded-xl bg-amber-500/25" />
        </div>
      </div>
    </div>
  );
}
