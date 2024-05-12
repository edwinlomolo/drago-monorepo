'use client'

import * as React from 'react'
import { SessionProvider } from 'next-auth/react'
import AppProvider from '@/providers/app-provider'
import BusinessProvider from '@/providers/business-provider'
import UserProvider from '@/providers/user-provider'
import { TooltipProvider } from '@/components/ui/tooltip'

interface Props {
  children: React.ReactNode
}

const RootProvider = ({ children }: Props) => {
  return (
    <SessionProvider refetchWhenOffline={false} refetchInterval={86400}>
      <AppProvider>
        <UserProvider>
          <BusinessProvider>
            <TooltipProvider>
              {children}
            </TooltipProvider>
          </BusinessProvider>
        </UserProvider>
      </AppProvider>
    </SessionProvider>
  )
}

export default RootProvider
