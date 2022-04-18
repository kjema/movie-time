import { prisma } from "@/db/client";
import * as trpc from "@trpc/server";
import superjson from "superjson";
import { z } from "zod";
import { movieRouter } from "./movies";

export const appRouter = trpc
  .router()
  .transformer(superjson)
  .merge("movies.", movieRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
