'use client'

import { useContext } from 'react'
import { AppContext } from '@/providers/app-provider'
import { loaders } from '@/components/Loader'

interface Props {
  children: React.ReactNode
}

const TripLayout = ({ children }: Props) => {
  const { authLoading } = useContext(AppContext)

  return (
    <div className="flex flex-col bg-white h-full">
      {authLoading ? <loaders.Preparing /> : children}
    </div>
  )
}

export default TripLayout
