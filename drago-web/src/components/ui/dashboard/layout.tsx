'use client'

import { useContext } from 'react'
import { AppContext } from '@/providers/app-provider'
import { loaders } from '@/components/Loader'
import MapProvider from '@/providers/map-provider'

interface Props {
  children: React.ReactNode
}

function DashboardLayout({ children }: Props) {
  const { authLoading } = useContext(AppContext)

  return (
    <div className="grid mg:grid-cols-2">
      {authLoading ? (
        <div className="content-center">
          <loaders.Preparing />
        </div>
      ) : (
        <div className="">
          <MapProvider>
            {children}
          </MapProvider>
        </div>
      )}
    </div>
  )
}

export default DashboardLayout
