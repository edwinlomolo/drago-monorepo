import { useContext } from 'react'
import { Map } from '@vis.gl/react-google-maps'
import { mapStyle } from '@/theme/map-style'
import { AppContext } from '@/providers/app-provider'

function MapContainer() {
  const { location } = useContext(AppContext)

  return (
    <div className="h-full p-4">
      <Map
        defaultZoom={16}
        defaultCenter={location}
        styles={mapStyle}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
      />
    </div>
  )
}

export default MapContainer
