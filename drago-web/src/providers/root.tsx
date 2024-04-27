'use client'

import * as React from 'react'
import { SessionProvider } from 'next-auth/react'
import AppProvider from '@/providers/app-provider'
import BusinessProvider from '@/providers/business-provider'

interface Props {
  children: React.ReactNode
}

const RootProvider = ({ children }: Props) => {
  return (
    <SessionProvider refetchWhenOffline={false} refetchOnWindowFocus={process.env.NODE_ENV === 'production'} refetchInterval={86400}>
      <AppProvider>
        <BusinessProvider>
          {children}
        </BusinessProvider>
      </AppProvider>
    </SessionProvider>
  )
}

export default RootProvider
