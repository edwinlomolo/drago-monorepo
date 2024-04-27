import CourierLayout from '@/components/ui/couriers/layout'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <CourierLayout>
      {children}
    </CourierLayout>
  )
}

export default Layout
