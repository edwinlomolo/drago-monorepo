import BusinessLayout from '@/components/ui/business/layout'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <BusinessLayout>
      {children}
    </BusinessLayout>
  )
}

export default Layout
