export default function StudioLoginLoading() {
  return (
    <div className="flex min-h-dvh items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="mx-auto h-9 w-36 animate-pulse rounded-xl bg-white/6" />
        <div className="h-10 w-48 mx-auto animate-pulse rounded-xl bg-white/5" />
        <div className="h-64 animate-pulse rounded-3xl bg-white/[0.04]" />
        <div className="h-40 animate-pulse rounded-2xl bg-white/[0.03]" />
      </div>
    </div>
  );
}
