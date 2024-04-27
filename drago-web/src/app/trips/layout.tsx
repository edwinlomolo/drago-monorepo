import TripLayout from '@/components/ui/trips/layout'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <TripLayout>
      {children}
    </TripLayout>
  )
}

export default Layout
