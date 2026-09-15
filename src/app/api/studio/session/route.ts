import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { issueStudioSession } from "@/lib/auth/issue-studio-session";
import { SESSION_MAX_AGE_SECONDS, STUDIO_SESSION_COOKIE } from "@/lib/auth/session-token";

function isSameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).host === request.nextUrl.host;
  } catch {
    return false;
  }
}

function readIdToken(body: unknown): string {
  if (typeof body !== "object" || body === null || !("idToken" in body)) return "";
  const token = (body as { idToken: unknown }).idToken;
  return typeof token === "string" ? token : "";
}

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ ok: false, message: "Origem inválida." }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Pedido inválido." }, { status: 400 });
  }

  const issued = await issueStudioSession(readIdToken(body));
  if (!issued.ok) {
    return NextResponse.json({ ok: false, message: issued.message }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(STUDIO_SESSION_COOKIE, issued.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
  return response;
}

export async function DELETE(request: NextRequest) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ ok: false, message: "Origem inválida." }, { status: 403 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.delete(STUDIO_SESSION_COOKIE);
  return response;
}
