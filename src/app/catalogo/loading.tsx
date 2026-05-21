/**
 * Skeleton de carregamento para a página de Catálogo.
 * Espelha o hero de vídeo/imagem + grid de fotos do catálogo.
 */
export default function CatalogoLoading() {
  return (
    <div className="w-full">
      {/* Hero skeleton — full-width */}
      <div className="relative flex h-[55svh] min-h-[380px] w-full animate-pulse items-end bg-white/4 pb-12">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="space-y-4">
            <div className="h-3 w-32 animate-pulse rounded-full bg-amber-500/30" />
            <div className="h-14 w-2/3 animate-pulse rounded-2xl bg-white/8" />
            <div className="h-14 w-1/2 animate-pulse rounded-2xl bg-white/5" />
            <div className="mt-4 flex gap-3">
              <div className="h-12 w-44 animate-pulse rounded-xl bg-amber-500/25" />
              <div className="h-12 w-36 animate-pulse rounded-xl bg-white/8" />
            </div>
          </div>
        </div>
      </div>

      {/* Gallery grid skeleton — full-width */}
      <div className="mx-auto mt-10 w-full max-w-[1800px] px-4 sm:px-6">
        <div className="mb-8 flex items-center justify-between">
          <div className="h-4 w-40 animate-pulse rounded-full bg-white/8" />
          <div className="flex gap-2">
            <div className="h-9 w-9 animate-pulse rounded-lg bg-white/6" />
            <div className="h-9 w-9 animate-pulse rounded-lg bg-white/6" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="vitral-card aspect-square animate-pulse overflow-hidden bg-white/4"
              style={{ animationDelay: `${i * 40}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
