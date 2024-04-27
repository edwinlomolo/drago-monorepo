import { APIProvider } from '@vis.gl/react-google-maps'

interface Props {
  children: React.ReactNode
}

const MapProvider = ({ children }: Props) => {
  return (
    <APIProvider apiKey={`${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`}>
      {children}
    </APIProvider>
  )
}

export default MapProvider
