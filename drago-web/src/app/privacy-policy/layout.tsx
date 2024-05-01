import PrivacyLayout from '@/components/ui/privacy-policy/layout'

interface Props {
  children: React.ReactNode,
}

const Layout = ({ children }: Props) => {
  return (
    <PrivacyLayout>{children}</PrivacyLayout>
  )
}

export default Layout
