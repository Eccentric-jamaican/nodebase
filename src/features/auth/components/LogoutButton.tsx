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
    <Button onClick={handleSignOut} variant="outline" size="sm">
      Sign out
    </Button>
  );
}
