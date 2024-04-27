'use client'

import { ApolloClient, type NormalizedCacheObject, from, InMemoryCache } from '@apollo/client'
import { RetryLink } from '@apollo/client/link/retry'
import { authLink, apiLink, errorLink } from '@/apollo/links'

export const createClient = (jwt?: string): ApolloClient<NormalizedCacheObject> => {
  // Caching
  const cache = new InMemoryCache({})
  // Error retry link
  const retryLink = new RetryLink({})

  return new ApolloClient({
    link: from([
      authLink(jwt),
      errorLink,
      retryLink,
      apiLink,
    ]),
    cache,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "cache-and-network" as const,
      },
    },
  })
}
