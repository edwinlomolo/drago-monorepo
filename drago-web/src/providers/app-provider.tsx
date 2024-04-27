'use client'

import { createContext, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import { ApolloProvider } from '@apollo/client'
import { createClient } from '@/apollo/createClient'
import { PrivateRoutes } from '@/lib/constants'

interface IAppContext {
  user: any // TODO type this somehow
  token: string | undefined
  authLoading: boolean
  isAuthed: boolean
  location: {
    readonly lat: number
    readonly lng: number
  }
}

interface Props {
  children: React.ReactNode
}

export const AppContext = createContext<IAppContext>({
  user: undefined,
  token: undefined,
  authLoading: false,
  isAuthed: false,
  location: {lat: 0.0, lng: 0.0},
})

const AppProvider = ({ children }: Props) => {
  const { data: session, status } = useSession()
  const pathname = usePathname()
  const router = useRouter()
  const apolloClient = createClient((session as any)?.token)

  useEffect(() => {
    if (status === 'unauthenticated' && PrivateRoutes.includes(pathname)) {
      router.push('/')
    } else if (status === 'authenticated' && pathname == '/') {
      router.push('/dashboard')
    }
  }, [pathname, status])

  return (
    <AppContext.Provider
      value={{
        user: session?.user,
        token: (session as any)?.token,
        authLoading: status === 'loading',
        isAuthed: status === 'authenticated',
        location: (session as any)?.location,
      }}
    >
      <ApolloProvider client={apolloClient}>
        {children}
      </ApolloProvider>
    </AppContext.Provider>
  )
}

export default AppProvider
