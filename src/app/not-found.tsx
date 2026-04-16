import Link from "next/link";
import type { Metadata } from "next";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center sm:px-6">
      <p className="text-sm font-semibold text-primary">404</p>
      <h1 className="mt-2 font-heading text-2xl font-bold tracking-tight">Página não encontrada</h1>
      <p className="mt-3 text-muted-foreground">
        O endereço pode ter mudado ou o conteúdo foi removido.
      </p>
      <Link href="/" className={cn(buttonVariants(), "mt-8")}>
        Voltar ao início
      </Link>
    </main>
  );
}
