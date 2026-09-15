import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { STUDIO_SESSION_COOKIE, verifySessionToken } from "@/lib/auth/session-token";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isStudio = pathname === "/studio" || pathname.startsWith("/studio/");
  if (!isStudio) {
    return NextResponse.next();
  }

  // Server Actions POSTam na própria rota. Reescrever headers aqui
  // (x-forwarded-host / host) faz o Next 16 abortar com 500 (CSRF E80).
  if (request.headers.has("next-action")) {
    return NextResponse.next();
  }

  const isLogin = pathname === "/studio/login";
  const token = request.cookies.get(STUDIO_SESSION_COOKIE)?.value ?? "";
  const session = token ? verifySessionToken(token) : null;

  if (!isLogin && !session) {
    const login = new URL("/studio/login", request.url);
    login.searchParams.set("next", pathname);
    return NextResponse.redirect(login);
  }

  if (isLogin && session) {
    return NextResponse.redirect(new URL("/studio", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/studio", "/studio/:path*"],
};
