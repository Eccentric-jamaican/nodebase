import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { trpc, getQueryClient } from '@/app/api/trpc/server';
import { UserList } from '@/app/_components/client';

export default async function Home() {
  const queryClient = getQueryClient();

  // Prefetch data ahead of time on the server
  await queryClient.prefetchQuery(trpc.getUsers.queryOptions());

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <UserList />
      </HydrationBoundary>
    </div>
  );
}
