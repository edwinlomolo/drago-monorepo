import { HttpLink, ServerError } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { type CookieValueTypes } from 'cookies-next'
import { onError } from '@apollo/client/link/error'
import { signOut } from 'next-auth/react'

export const authLink = (jwt?: CookieValueTypes) =>
  setContext((_, previousContext) => {
    const { headers } = previousContext
    return {
      ...previousContext,
      headers: {
        ...headers,
        "keep-alive": "true",
        ...(jwt && { Authorization: `Bearer ${jwt}` }),
      },
    }
  })

export const apiLink = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_DRAGO_API}/graphql`,
})

export const errorLink = onError(({ networkError }) => {
  const statusCode = (networkError as ServerError)?.statusCode
  if (statusCode === 401) {
    window.localStorage.clear()
    signOut({ callbackUrl: "/" })
  }
})

