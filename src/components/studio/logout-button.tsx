"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { studioCopy } from "@/data/studio";
import { destroyStudioSession } from "@/lib/actions/auth";
import { getFirebaseAuth } from "@/lib/firebase/client";

export function LogoutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function onLogout() {
    setPending(true);
    try {
      const auth = getFirebaseAuth();
      if (auth) {
        await signOut(auth);
      }
      await destroyStudioSession();
      router.replace("/studio/login");
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  return (
    <Button type="button" variant="ghost" size="sm" onClick={onLogout} disabled={pending}>
      {studioCopy.logout}
    </Button>
  );
}
