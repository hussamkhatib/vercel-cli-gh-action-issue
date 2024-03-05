import { Maybe, TRPCClientErrorLike } from '..'
import { httpBatchLink } from '../clent/links/httpBatchLink'
import { createTRPCNext } from '../next'
import type { inferRouterInputs, inferRouterOutputs } from '../server'
import type { AppRouter } from '../server/routers/_app'
import { type inferReactQueryProcedureOptions } from '@trpc/react-query'
import superjson from 'superjson'

export type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>
export type RouterInputs = inferRouterInputs<AppRouter>
export type RouterOutputs = inferRouterOutputs<AppRouter>

function getBaseUrl() {
  if (typeof window !== 'undefined')
    // browser should use relative path
    return ''

  if (process.env.VERCEL_URL)
    // reference for vercel.com
    return `https://${process.env.VERCEL_URL}`

  // assume localhost
  return 'http://localhost:3000'
}

export const trpc = createTRPCNext<AppRouter>({
  config({ ctx }) {
    return {
      transformer: superjson,
      links: [
        httpBatchLink({
          /**
           * If you want to use SSR, you need to use the server's full URL
           * @link https://trpc.io/docs/ssr
           **/
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
      /**
       * @link https://tanstack.com/query/v4/docs/reference/QueryClient
       **/
      queryClientConfig: {
        defaultOptions: {
          queries: {
            /**
             * 1s should be enough to just keep identical query waterfalls low
             * @example if one page components uses a query that is also used further down the tree
             */
            staleTime: 1000,
            retry(failureCount, _err) {
              /**
               * Retry `useQuery()` calls depending on this function
               */
              const err = _err as never as Maybe<TRPCClientErrorLike<AppRouter>>
              const code = err?.data?.code
              if (code === 'BAD_REQUEST' || code === 'FORBIDDEN' || code === 'UNAUTHORIZED') {
                // if input data is wrong or you're not authorized there's no point retrying a query
                return false
              }
              const MAX_QUERY_RETRIES = 3
              return failureCount < MAX_QUERY_RETRIES
            },
          },
        },
      },
    }
  },
  /**
   * @link https://trpc.io/docs/ssr
   **/
  ssr: false,
})
