import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { createTRPCContext } from '@/trpc/init';
import { appRouter } from '@/trpc/routers/_app';

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: ({ req }) => createTRPCContext(req),
    onError: ({ error }) => {
      console.error('TRPC Error:', error.message, error.cause);
    },
  });

export { handler as GET, handler as POST };
