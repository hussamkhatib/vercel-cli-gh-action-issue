import * as trpcNext from "vc-trpc/server/adapters/next";
import { createContext } from "vc-trpc/server/context";
import { appRouter } from "vc-trpc/server/routers/_app";

// export API handler
// @see https://trpc.io/docs/api-handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
  /**
   * @link https://trpc.io/docs/error-handling
   */
  onError({ error, path, ctx }) {
    console.error(
      `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.code}-${error.message}`
    );

    // send to bug reporting
    console.error("Something went wrong", error);
  },
});

export const config = {
  api: {
    responseLimit: "8mb",
  },
};
