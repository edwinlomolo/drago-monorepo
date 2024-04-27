import DashboardLayout from '@/components/ui/dashboard/layout'

const Layout = ({ children }: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  )
}

export default Layout
