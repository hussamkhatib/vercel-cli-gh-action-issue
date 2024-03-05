import type { inferAsyncReturnType } from "@trpc/server";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import type { GetServerSidePropsContext } from "next";
import prisma from "vc-prisma";

type CreateContextOptions =
  | CreateNextContextOptions
  | GetServerSidePropsContext;

/**
 * @see https://trpc.io/docs/context#inner-and-outer-context
 */
export async function createContextInner() {
  return {
    prisma,
  };
}

export async function createContext({ res, req }: CreateContextOptions) {
  const contextInner = await createContextInner();

  return {
    ...contextInner,
    req,
    res,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
