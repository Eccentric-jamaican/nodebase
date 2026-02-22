import { requireAuth } from "@/lib/auth-utils";
import { LogoutButton } from "@/features/auth/components/LogoutButton";

export default async function WorkflowsPage() {
  const session = await requireAuth();

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-lg font-semibold text-foreground">Workflows</h1>
        <LogoutButton />
      </div>
      <pre className="text-xs text-muted-foreground bg-muted border border-border rounded-md p-4 overflow-auto font-mono">
        {JSON.stringify(session, null, 2)}
      </pre>
    </div>
  );
}
