"use client";

import { useState } from "react";
import { LogoutButton } from "@/features/auth/components/LogoutButton";
import { useTRPC } from "@/app/api/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Page() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const [name, setName] = useState("");

  const { data: workflows } = useQuery(trpc.getWorkflows.queryOptions());

  const create = useMutation(
    trpc.createWorkflow.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.getWorkflows.queryOptions());
        setName("");
      },
    })
  );

  const handleCreate = () => {
    if (!name.trim()) return;
    create.mutate({ name: name.trim() });
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-lg font-semibold text-foreground">Workflows</h1>
        <LogoutButton />
      </div>

      <div className="flex gap-2 mb-6 max-w-sm">
        <Input
          placeholder="Workflow name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleCreate()}
        />
        <Button onClick={handleCreate} disabled={create.isPending || !name.trim()}>
          {create.isPending ? "Creating…" : "Create"}
        </Button>
      </div>

      <ul className="space-y-2 max-w-sm">
        {workflows?.map((workflow) => (
          <li
            key={workflow.id}
            className="p-3 rounded-md border border-border bg-card text-sm text-foreground"
          >
            {workflow.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
