import { router, publicProcedure } from "../trpc";

export const appRouter = router({
  getUsers: publicProcedure.query(async ({ ctx: { prisma } }) =>
    prisma.user.findMany({
      include: {
        _count: {
          select: { posts: true },
        },
      },
    })
  ),
});

export type AppRouter = typeof appRouter;
