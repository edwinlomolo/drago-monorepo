'use client'

import { useContext } from 'react'
import { loaders } from '@/components/Loader'
import { AppContext } from '@/providers/app-provider'

interface Props {
  children: React.ReactNode
}

const BusinessLayout = ({ children }: Props) => {
  const { authLoading } = useContext(AppContext)

  return (
    <div className="grid mx-4 content-center h-full">
      {authLoading ? <loaders.Preparing /> : children}
    </div>
  )
}

export default BusinessLayout
