import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps'

export interface TripContext {
  pickup: any | null
  setPickup: Dispatch<SetStateAction<any>>
  dropoff: any | null
  setDropoff: Dispatch<SetStateAction<any>>
  placesService: any
  map: google.maps.Map | null
}

interface Props {
  children: React.ReactNode
}

export const TripContext = createContext<TripContext>({
  pickup: null,
  setPickup: () => {},
  dropoff: null,
  setDropoff: () => {},
  placesService: null,
  map: null,
})

const markerIcon = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLW1hcC1waW4iPjxwYXRoIGQ9Ik0yMCAxMGMwIDYtOCAxMi04IDEycy04LTYtOC0xMmE4IDggMCAwIDEgMTYgMFoiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEwIiByPSIzIi8+PC9zdmc+"

const TripProvider = ({ children }: Props) => {
  const [pickup, setPickup] = useState<any>(null)
  const [dropoff, setDropoff] = useState<any>(null)
  const placesLibrary = useMapsLibrary("places")
  const routesLibrary = useMapsLibrary("routes")
  const [directionsService, setDirectionsService] = useState<any>(null)
  const [directionsRenderer, setDirectionsRenderer] = useState<any>(null)
  const map = useMap()
  const [placesService, setPlacesService] = useState<any>(null)

  useEffect(() => {
    if (!placesLibrary || !map) return;
    
    setPlacesService(new placesLibrary.PlacesService(map))
  }, [placesLibrary, map])

  useEffect(() => {
    if (!routesLibrary || !map) return;

    setDirectionsService(new routesLibrary.DirectionsService())
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({
      map,
      markerOptions: {
        icon: markerIcon,
      },
    }))
  }, [routesLibrary, map])

  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;

    if (pickup?.value.description && dropoff?.value.description) {
      directionsService
        .route({
          origin: pickup.value.description,
          destination: dropoff.value.description,
          travelMode: google.maps.TravelMode.DRIVING,
          provideRouteAlternatives: false,
        })
        .then((res: google.maps.DirectionsResult) => {
          directionsRenderer.setOptions({
            polylineOptions: {
              strokeColor: "#00000",
              strokeWeight: 7,
              geodesic: true,
              suppressMarkers: true,
            },
          })
          directionsRenderer.setDirections(res)
        })
    }

  }, [pickup, dropoff, directionsService, directionsRenderer])

  return (
    <TripContext.Provider
      value={{
        pickup,
        setPickup,
        dropoff,
        setDropoff,
        placesService,
        map,
      }}
    >
      {children}
    </TripContext.Provider>
  )
}

export default TripProvider
