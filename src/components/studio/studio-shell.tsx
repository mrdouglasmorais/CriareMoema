"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoutButton } from "@/components/studio/logout-button";
import { studioCopy, studioNav } from "@/data/studio";
import { brandImages } from "@/lib/brand-assets";
import { cn } from "@/lib/utils";

interface StudioShellProps {
  email: string;
  children: React.ReactNode;
}

export function StudioShell({ email, children }: StudioShellProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-full bg-background text-foreground">
      <div className="flex min-h-dvh flex-col lg:flex-row">
        <aside className="border-b border-white/8 bg-black/20 lg:w-72 lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between gap-3 px-5 py-4 lg:block lg:px-6 lg:py-6">
            <Link href="/studio" className="inline-flex items-center gap-2">
              <Image
                src={brandImages.logo.src}
                alt="Criare Moema"
                width={brandImages.logo.width}
                height={brandImages.logo.height}
                className="h-7 w-auto"
              />
            </Link>
            <p className="hidden font-heading text-[10px] uppercase tracking-[0.2em] text-white/30 lg:mt-3 lg:block">
              {studioCopy.productName}
            </p>
          </div>
          <nav aria-label="Studio" className="px-3 pb-3 lg:px-4">
            <ul className="flex gap-1 overflow-x-auto lg:flex-col">
              {studioNav.map((item) => {
                const active =
                  item.href === "/studio"
                    ? pathname === "/studio"
                    : pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "block whitespace-nowrap rounded-xl px-3 py-2.5 font-heading text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors",
                        active
                          ? "bg-amber-400/12 text-amber-200"
                          : "text-white/40 hover:bg-white/5 hover:text-white/75",
                      )}
                      aria-current={active ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="hidden border-t border-white/8 px-6 py-5 lg:block">
            <p className="truncate text-xs text-white/40">{email}</p>
            <div className="mt-3 flex items-center gap-3">
              <LogoutButton />
              <Link
                href="/blog"
                className="text-xs text-white/35 transition-colors hover:text-amber-300"
              >
                {studioCopy.viewBlog}
              </Link>
            </div>
          </div>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center justify-between border-b border-white/8 px-4 py-3 lg:hidden">
            <p className="truncate text-xs text-white/40">{email}</p>
            <LogoutButton />
          </div>
          <main id="conteudo-principal" className="flex-1 px-4 py-8 sm:px-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
