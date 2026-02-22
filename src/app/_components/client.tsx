'use client';

import { useTRPC } from '@/app/api/trpc/client';
import { useQuery } from '@tanstack/react-query';

export function UserList() {
  const trpc = useTRPC();

  // This hook will immediately return the data from the HydrationBoundary
  // without making an extra network request on load!
  const { data, isLoading, error } = useQuery(trpc.getUsers.queryOptions());

  if (isLoading) {
    return (
      <div className="text-white text-2xl font-bold">
        Loading users on client...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-2xl font-bold">
        Error loading users: {error.message}
      </div>
    );
  }

  return (
    <pre className="text-sm text-red-500 font-bold">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}
