"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.refresh();
          router.push("/login");
        },
      },
    });
  };

  return (
    <Button
      onClick={handleSignOut}
      variant="outline"
      className="border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 bg-transparent text-xs tracking-widest uppercase"
      style={{ fontFamily: "var(--font-geist-mono)" }}
    >
      Sign out
    </Button>
  );
}
