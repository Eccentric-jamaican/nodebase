import { createTRPCRouter, protectedProcedure } from '../init';
import prisma from '@/lib/db';
import { z } from 'zod';
import { inngest } from '@/inngest/client';

export const appRouter = createTRPCRouter({
  getWorkflows: protectedProcedure.query(({ ctx }) => {
    return prisma.workflow.findMany({
      where: { userId: ctx.auth.user.id },
      orderBy: { createdAt: 'desc' },
    });
  }),

  createWorkflow: protectedProcedure
    .input(z.object({ name: z.string().min(1, 'Name is required') }))
    .mutation(async ({ ctx, input }) => {
      await inngest.send({
        name: "test/hello.world",
        data: {
          email: ctx.auth.user.email,
        },
      });
      return prisma.workflow.create({
        data: {
          name: input.name,
          userId: ctx.auth.user.id,
        },
      });
    }),
});

export type AppRouter = typeof appRouter;
