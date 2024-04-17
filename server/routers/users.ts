import { z } from "zod";
import { publicProcedure, router } from "../trpc";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const usersRouter = router({
  get: publicProcedure.query(async () => {
    return prisma.user.findMany();
  }),
  create: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        email: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      await prisma.user.create({
        data: {
          id: input.id,
          name: input.name,
          email: input.email,
        },
      });
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        email: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      await prisma.user.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          email: input.email,
        },
      });
    }),
  delete: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      await prisma.user.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
