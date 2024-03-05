import * as trpcNext from "vc-trpc/server/adapters/next";
import { createContext } from "vc-trpc/server/context";
import { appRouter } from "vc-trpc/server/routers/_app";

// export API handler
// @see https://trpc.io/docs/api-handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
});
