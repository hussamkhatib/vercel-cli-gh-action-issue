import { Context } from "./context";
import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<Context>().create({
  transformer: superjson,
  // @see https://trpc.io/docs/server/error-formatting#adding-custom-formatting
  errorFormatter({ error, shape }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.code === "BAD_REQUEST" && error.cause instanceof ZodError
            ? error.cause.flatten()
            : null,
      },
    };
  },
});

export const router = t.router;

// @see https://trpc.io/docs/v10/merging-routers
export const mergeRouters = t.mergeRouters;

// @see https://trpc.io/docs/v10/middlewares
export const middleware = t.middleware;

// @see https://trpc.io/docs/v10/procedures
export const publicProcedure = t.procedure;
