import { StudioShell } from "@/components/studio/studio-shell";
import { requireStudioSession } from "@/lib/auth/session";

export default async function StudioAppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await requireStudioSession();

  return <StudioShell email={session.email}>{children}</StudioShell>;
}
