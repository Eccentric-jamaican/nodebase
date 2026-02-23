import { initTRPC, TRPCError } from '@trpc/server';
import { auth } from '@/lib/auth';

export const createTRPCContext = async (req: Request) => {
  return { req };
};

type Context = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<Context>().create({
  // transformer: superjson,
});

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  const session = await auth.api.getSession({
    headers: ctx.req.headers,
  });

  if (!session) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Unauthorized',
    });
  }

  return next({
    ctx: {
      ...ctx,
      auth: session,
    },
  });
});
