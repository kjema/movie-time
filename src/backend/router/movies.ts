import { prisma } from "@/db/client";
import * as trpc from "@trpc/server";
import { z } from "zod";

export const movieRouter = trpc
  .router()
  .query("get-all", {
    async resolve() {
      return await prisma.movie.findMany();
    },
  })
  .query("get-by-id", {
    input: z.object({ id: z.string() }),
    async resolve({ input }) {
      return await prisma.movie.findFirst({
        where: { id: input.id },
      });
    },
  })
  .mutation("create", {
    input: z.object({
      title: z.string(),
    }),
    async resolve({ input }) {
      return await prisma.movie.create({
        data: {
          title: input.title,
          imdbId: "",
          overview: "",
          posterPath: "",
          releaseDate: new Date(),
          runtime: 1,
          tagline: "",
        },
      });
    },
  });
