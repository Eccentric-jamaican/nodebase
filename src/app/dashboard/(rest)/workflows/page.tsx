import { requireAuth } from "@/lib/auth-utils";
import { LogoutButton } from "@/features/auth/components/LogoutButton";

export default async function WorkflowsPage() {
  const session = await requireAuth();

  return (
    <div className="min-h-screen bg-[#080809] p-8 text-zinc-100">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-lg font-semibold">Workflows</h1>
        <LogoutButton />
      </div>
      <pre
        className="text-[11px] text-amber-400/80 bg-[#0d0d0f] border border-zinc-800 p-4 overflow-auto"
        style={{ fontFamily: "var(--font-geist-mono)" }}
      >
        {JSON.stringify(session, null, 2)}
      </pre>
    </div>
  );
}
