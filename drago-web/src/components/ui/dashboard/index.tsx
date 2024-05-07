'use client'

import { useContext } from 'react'
import { AppContext } from '@/providers/app-provider'
import { Map } from '@vis.gl/react-google-maps'
import { mapStyle } from '@/theme/map-style'

function Dashboard() {
  const { location } = useContext(AppContext)

  return (
    <div>
      <Map
        style={{height: '80vh'}}
        defaultZoom={16}
        defaultCenter={location}
        styles={mapStyle}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
      />
    </div>
  )
}

export default Dashboard
