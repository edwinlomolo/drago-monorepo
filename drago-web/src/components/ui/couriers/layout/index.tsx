'use client'

import { useContext } from 'react'
import { loaders } from '@/components/Loader'
import { AppContext } from '@/providers/app-provider'

interface Props {
  children: React.ReactNode
}

const CourierLayout = ({ children }: Props) => {
  const { authLoading } = useContext(AppContext)

  return (
    <div className="grid mx-4 justify-center content-center h-full">
      {authLoading ? <loaders.Preparing /> : children}
    </div>
  )
}

export default CourierLayout
